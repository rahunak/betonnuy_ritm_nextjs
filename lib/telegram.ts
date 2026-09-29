/**
 * Отправка уведомления о новой заявке в Telegram (Bot API).
 * Используется только на сервере (route handler / server action).
 *
 * Переменные окружения:
 *   TELEGRAM_BOT_TOKEN — токен бота (получить у @BotFather)
 *   TELEGRAM_CHAT_ID   — куда слать заявки: один ID или несколько через запятую
 *                        (группа/канал и/или личные чаты исполнителей)
 *
 * Получить chat_id: добавьте бота в чат/канал (или напишите ему в личку),
 * затем откройте https://api.telegram.org/bot<TOKEN>/getUpdates и найдите "chat":{"id":...}
 * Для канала ID отрицательный (например -1001234567890).
 *
 * ВАЖНО: бот не может первым написать человеку. Исполнитель должен один раз
 * открыть бота в Telegram и нажать Start (/start), иначе Telegram вернёт
 * 403 Forbidden (bot can't initiate conversation with a user).
 * Бота также нужно добавить в группу/канал и дать ему право писать туда.
 */

const TELEGRAM_API = "https://api.telegram.org";

export type LeadNotification = {
  name: string;
  phone: string;
  /** Виды работ (HeroSection) или сообщение (Footer) */
  detail?: string;
  /** Название формы: "Расчёт стоимости (главная)" | "Написать нам (футер)" */
  source: string;
};

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Список получателей из TELEGRAM_CHAT_ID (через запятую), без дублей и пустых значений */
function getRecipientChatIds(): string[] {
  return [...new Set(
    (process.env.TELEGRAM_CHAT_ID ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  )];
}

export async function sendLeadToTelegram(lead: LeadNotification): Promise<void> {
  if (!isTelegramConfigured()) {
    throw new Error(
      "Telegram не настроен: задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID"
    );
  }

  const text = buildLeadMessage(lead);
  const uniqueChatIds = getRecipientChatIds();

  if (uniqueChatIds.length === 0) {
    throw new Error("Telegram не настроен: TELEGRAM_CHAT_ID пуст");
  }

  // Шлём всем получателям параллельно; падение одной доставки
  // (например, исполнитель не нажал Start) не ломает остальные.
  const results = await Promise.allSettled(
    uniqueChatIds.map((chatId) => sendTelegramMessage(chatId, text))
  );

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length === uniqueChatIds.length) {
    // Не доставлено никому — считаем заявку неотправленной
    throw new Error(
      failures
        .map((r) => (r as PromiseRejectedResult).reason?.message ?? "unknown")
        .join("; ")
    );
  }
  for (const f of failures) {
    // Частичный сбой: в группу ушло, в личку нет — логируем и не валим запрос
    console.error(
      "Telegram: не доставлено одному из получателей:",
      (f as PromiseRejectedResult).reason?.message
    );
  }
}

function buildLeadMessage(lead: LeadNotification): string {
  const lines = [
    "🧱 <b>Новая заявка</b>",
    "",
    `👤 Имя: ${escapeHtml(lead.name)}`,
    `📞 Телефон: ${escapeHtml(lead.phone)}`,
  ];
  if (lead.detail) {
    lines.push(`📋 ${escapeHtml(lead.detail)}`);
  }
  lines.push(
    "",
    `📍 Источник: ${escapeHtml(lead.source)}`,
    `🕒 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`
  );
  return lines.join("\n");
}

async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
  const res = await fetch(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      // Отключаем предпросмотр ссылок — в заявке бывает телефон/текст
      link_preview_options: { is_disabled: true },
    }),
    // Уведомление не должно зависеть от долгих ответов Telegram
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status} (chat ${chatId}): ${body.slice(0, 300)}`);
  }
}

/** Экранирование пользовательского текста для parse_mode=HTML */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
