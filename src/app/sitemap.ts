import type { MetadataRoute } from "next";

import { newsArticles } from "@/lib/news";
import { siteConfig } from "@/lib/site-config";
import { workshopServices } from "@/lib/workshop-services";

/** Every real, resolvable route on the site — kept in one place so a new
 * page (like `/privacy` and `/terms` above) shows up here the same day it's
 * built, instead of silently missing from search-engine discovery. News
 * articles and the 13 workshop-service pages are appended from their own
 * data files rather than hand-listed, so a new one is picked up
 * automatically. */
const STATIC_ROUTES = [
  "",
  "/about",
  "/app",
  "/career",
  "/contact",
  "/faq",
  "/gallery",
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

  const workshopServiceEntries: MetadataRoute.Sitemap = workshopServices.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...workshopServiceEntries, ...articleEntries];
}
