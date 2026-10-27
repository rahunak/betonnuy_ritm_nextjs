import type { MetadataRoute } from "next";
import { services, SITE_URL, isTechnicalPath } from "@/lib/services";
import { posts } from "@/lib/blog";

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
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/uslugi/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Статьи блога: дата публикации — как lastModified
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Защита: технические пути никогда не попадают в sitemap
  return [...staticPages, ...servicePages, ...blogPages].filter(
    (entry) => !isTechnicalPath(new URL(entry.url).pathname)
  );
}
