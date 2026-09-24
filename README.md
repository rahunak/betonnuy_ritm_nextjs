Это сайт на [Next.js](https://nextjs.org), созданный с помощью [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## SEO

- **Метаданные и OG** — задаются через Metadata API Next.js (`app/layout.tsx`, `app/uslugi/page.tsx`, `app/uslugi/[slug]/page.tsx`): title, description, canonical, Open Graph, Twitter-карточки.
- **OG-картинка** — генерируется динамически (`app/opengraph-image.tsx`) и автоматически подставляется во все страницы через `og:image` / `twitter:image`.
- **JSON-LD** — Service + FAQPage + BreadcrumbList на страницах услуг,ItemListOfServices на `/uslugi`.
- **robots.txt и sitemap.xml** — генерируются из `app/robots.ts` и `app/sitemap.ts`; технические пути (`/api/`, `/_next/` и т.д.) закрыты в robots и не попадают в sitemap.
- **IndexNow** — мгновенный пинг Яндекс/ Bing при обновлении страниц: ключ лежит в `app/indexnow-key.txt`, отправка — скриптом:
  ```bash
  ./scripts/ping-indexnow.sh                        # все URL из sitemap
  ./scripts/ping-indexnow.sh /uslugi/podem-domov    # конкретные страницы
  ```
  Ключ хранится в скрипте; после деплоя убедитесь, что `https://betonniy-ritm.by/indexnow-key.txt` открывается.

## Уведомления о заявках в Telegram

Заявки из форм на сайте («Расчёт стоимости» в шапке и «Написать нам» в футере)
отправляются POST-запросом на `/api/lead`, а сервер пересылает их боту Telegram.

Настройка:

1. Скопируйте `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Создайте бота у [@BotFather](https://t.me/BotFather) (команда `/newbot`) и вставьте токен в `TELEGRAM_BOT_TOKEN`.
3. Добавьте бота в нужный чат/канал (или напишите ему `/start`), затем откройте
   `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и возьмите `chat.id` → `TELEGRAM_CHAT_ID`.
4. *(Необязательно)* Дубль заявки в личку исполнителю — `TELEGRAM_DM_CHAT_IDS`:
   - исполнитель один раз открывает бота и нажимает **Start** (без этого бот не сможет ему писать — Telegram вернёт 403);
   - исполнитель пишет боту любое сообщение, откройте `getUpdates` и возьмите его личный `chat.id` (положительный номер);
   - впишите ID в `TELEGRAM_DM_CHAT_IDS` (несколько — через запятую).
5. Перезапустите dev-сервер. Для продакшена задайте переменные в окружении хостинга.

Заявка отправляется всем получателям параллельно: если личная доставка не прошла
(например, исполнитель не нажал Start), заявка в группу всё равно уйдёт, а причина
сбоя будет в логах сервера.

Без настроенных переменных формы покажут ошибку, а сервер залогирует причину.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
