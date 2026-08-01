import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { AppDownload } from "./app-download";
import { AppHero } from "./app-hero";
import { AppShowcase } from "./app-showcase";

export const metadata: Metadata = {
  title: "App",
  description: `The ${siteConfig.name} app is coming soon to iOS and Android — book battery assessments, track service history, and message your engineer directly.`,
};

/**
 * /app — the site's fourth real page. No app has actually shipped yet (no
 * store listing, no confirmed launch date — see `app-download.tsx`), so
 * this is deliberately a "coming soon" page: real, honest "what's ahead"
 * content, styled to the same standard as Contact/About, rather than
 * claiming a live product that doesn't exist.
 */
export default function AppPage() {
  return (
    <>
      <AppHero />
      <AppShowcase />
      <AppDownload />
    </>
  );
}
