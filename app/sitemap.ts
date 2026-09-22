import type { MetadataRoute } from "next";
import { services, SITE_URL, isTechnicalPath } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/uslugi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/uslugi/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Защита: технические пути никогда не попадают в sitemap
  return [...staticPages, ...servicePages].filter(
    (entry) => !isTechnicalPath(new URL(entry.url).pathname)
  );
}
