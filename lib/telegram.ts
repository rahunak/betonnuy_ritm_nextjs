/**
 * Отправка уведомления о новой заявке в Telegram (Bot API).
 * Используется только на сервере (route handler / server action).
 *
 * Переменные окружения:
 *   TELEGRAM_BOT_TOKEN — токен бота (получить у @BotFather)
 *   TELEGRAM_CHAT_ID   — ID чата/канала, куда слать уведомления
 *
 * Получить chat_id: добавьте бота в чат/канал (или напишите ему в личку),
 * затем откройте https://api.telegram.org/bot<TOKEN>/getUpdates и найдите "chat":{"id":...}
 */

const TELEGRAM_API = "https://api.telegram.org";

export type LeadNotification = {
  name: string;
  phone: string;
  /** Вид работ (HeroSection) или сообщение (Footer) */
  detail?: string;
  /** Название формы: "Расчёт стоимости (Hero)" | "Написать нам (Footer)" */
  source: string;
};

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendLeadToTelegram(lead: LeadNotification): Promise<void> {
  if (!isTelegramConfigured()) {
    throw new Error(
      "Telegram не настроен: задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID"
    );
  }

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

  const res = await fetch(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: lines.join("\n"),
      parse_mode: "HTML",
      // Отключаем предпросмотр ссылок — в заявке бывает телефон/текст
      link_preview_options: { is_disabled: true },
    }),
    // Уведомление не должно зависеть от долгих ответов Telegram
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status}: ${body.slice(0, 300)}`);
  }
}

/** Экранирование пользовательского текста для parse_mode=HTML */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
