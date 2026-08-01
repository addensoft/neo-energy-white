import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { NewsGrid } from "./news-grid";
import { NewsHero } from "./news-hero";

export const metadata: Metadata = {
  title: "News & Insights",
  description: `Company updates and engineering explainers from ${siteConfig.name} — the team working on the batteries themselves.`,
};

/**
 * /news — the site's seventh real page, following the same pattern Contact/
 * About/Career/App/Promo established: `PageBanner` for the cinematic
 * banner, plain content sections below, global Navbar/Footer from the
 * `(main)` layout.
 *
 * Article content lives in `@/lib/news.ts`, not here — this page and
 * `/news/[slug]` are both just views over that one data source.
 */
export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsGrid />
    </>
  );
}
