import type { MetadataRoute } from "next";
import { SITE_URL, TECHNICAL_PATHS } from "@/lib/services";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Технические пути закрыты от обхода
        disallow: [...TECHNICAL_PATHS],
      },
      // Next.js image-оптимизатор нужен Google для рендеринга страниц —
      // разрешаем его роботу явно, несмотря на общий запрет /_next/
      {
        userAgent: "Googlebot",
        allow: "/_next/image",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
