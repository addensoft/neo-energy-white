import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { RepairCapabilities } from "./repair-capabilities";
import { RepairCertification } from "./repair-certification";
import { RepairCta } from "./repair-cta";
import { RepairExplainer } from "./repair-explainer";
import { RepairHero } from "./repair-hero";
import { RepairProcess } from "./repair-process";

export const metadata: Metadata = {
  title: "Component Repair",
  description: `Component-level EV battery repair from ${siteConfig.name} — down to the cell, busbar, and BMS board, Singapore's only authorised team certified to go this deep.`,
};

/**
 * /services/component-repair — the second Services sub-page (after
 * `/services/battery-systems`). Same pattern: `PageBanner` hero, plain
 * content sections, global Navbar/Footer.
 *
 * Every claim here is real content already established elsewhere in this
 * project — the homepage's Repair section (`sections/repair/index.tsx`,
 * capabilities + `CapabilityCard` reused directly) and the News article
 * `/news/why-component-level-repair-outperforms-pack-swapping` (its two
 * core paragraphs, condensed, with a link to the full piece). `RepairProcess`
 * reframes the same three capabilities as a sequence rather than stating a
 * new one — no invented turnaround times or SLAs.
 */
export default function ComponentRepairPage() {
  return (
    <>
      <RepairHero />
      <RepairCapabilities />
      <RepairExplainer />
      <RepairProcess />
      <RepairCertification />
      <RepairCta />
    </>
  );
}
