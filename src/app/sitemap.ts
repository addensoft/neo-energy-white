import type { MetadataRoute } from "next";

import { newsArticles } from "@/lib/news";
import { siteConfig } from "@/lib/site-config";

/** Every real, resolvable route on the site — kept in one place so a new
 * page (like `/privacy` and `/terms` above) shows up here the same day it's
 * built, instead of silently missing from search-engine discovery. News
 * articles are appended from `@/lib/news.ts` rather than hand-listed, so a
 * new article is picked up automatically. */
const STATIC_ROUTES = [
  "",
  "/about",
  "/app",
  "/career",
  "/contact",
  "/news",
  "/principles",
  "/privacy",
  "/promo",
  "/services/battery-systems",
  "/services/component-repair",
  "/services/diagnostics",
  "/services/maintenance",
  "/team",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
