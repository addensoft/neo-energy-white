import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { BatteryArchitecture } from "./battery-architecture";
import { BatteryCta } from "./battery-cta";
import { BatteryHero } from "./battery-hero";
import { BatteryPartners } from "./battery-partners";
import { BatteryPerformance } from "./battery-performance";
import { BatterySpecs } from "./battery-specs";

export const metadata: Metadata = {
  title: "Battery Systems",
  description: `${siteConfig.name}'s flagship 77.94kWh EV battery pack — supply and engineering authorised across CATL, CALB, and BYD battery technologies.`,
};

/**
 * /services/battery-systems — the site's first dedicated Services sub-page
 * (Component Repair, Maintenance, Diagnostics, Upgrades are the same nav
 * dropdown's remaining siblings, not yet built). Same pattern every other
 * inner page uses: `PageBanner` hero, plain content sections, global
 * Navbar/Footer.
 *
 * Every spec on this page — the stat row, the six architecture layers, the
 * three performance facts, GB 38031-2020 — is real engineering-dossier data
 * already written into this project's on-hold Exploded View chapter
 * (`sections/exploded-view/*`) and Creative Direction Chapter 4, never
 * fabricated for this page. That chapter's own scroll-driven set-piece
 * stays on hold; this page reuses its content in a simpler static layout
 * appropriate for a reference page rather than a homepage chapter.
 */
export default function BatterySystemsPage() {
  return (
    <>
      <BatteryHero />
      <BatterySpecs />
      <BatteryArchitecture />
      <BatteryPerformance />
      <BatteryPartners />
      <BatteryCta />
    </>
  );
}
