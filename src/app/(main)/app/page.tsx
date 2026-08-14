import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { AppDownload } from "./app-download";
import { AppHero } from "./app-hero";
import { AppShowcase } from "./app-showcase";

export const metadata: Metadata = {
  title: "App",
  description: `The ${siteConfig.name} app is live on iOS and Android — book appointments, track discounts, warranty, and road tax renewal.`,
};

/**
 * /app — rebuilt from TEAM AUTOPRO's own "Our App" page (NEO Energy's
 * parent business, client-confirmed) per direct instruction: real app,
 * real store links, real screenshot, real feature list — see
 * `app-download.tsx` and `app-showcase.tsx` for exactly what's real vs.
 * still adapted. No longer the "coming soon" placeholder this page used to
 * be, since the app it's describing genuinely exists and ships today.
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
