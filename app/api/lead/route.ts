import { NextResponse } from "next/server";
import { isTelegramConfigured, sendLeadToTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  detail?: unknown;
  source?: unknown;
};

function str(value: unknown, maxLen: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLen) : "";
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const name = str(body.name, 100);
  const phone = str(body.phone, 32);
  const detail = str(body.detail, 2000);
  const source = str(body.source, 100) || "Форма на сайте";

  // Телефон — единственное обязательное поле для связи
  if (!phone) {
    return NextResponse.json(
      { error: "Укажите номер телефона" },
      { status: 400 }
    );
  }

  if (!isTelegramConfigured()) {
    // Не 500: клиент покажет общую ошибку, а в логах сервера будет причина
    console.error("ENV TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы");
    return NextResponse.json(
      { error: "Сервис уведомлений не настроен" },
      { status: 503 }
    );
  }

  try {
    await sendLeadToTelegram({ name, phone, detail, source });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Ошибка отправки в Telegram:", err);
    return NextResponse.json(
      { error: "Не удалось отправить заявку, позвоните нам: +375 29 240-64-50" },
      { status: 502 }
    );
  }
}
