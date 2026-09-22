import type { MetadataRoute } from "next";
import { SITE_URL, TECHNICAL_PATHS } from "@/lib/services";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Технические пути закрыты от обхода.
        // Googlebot и YandexImages наследуют эти правила,
        // т.к. для них нет собственных групп.
        disallow: [...TECHNICAL_PATHS],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
