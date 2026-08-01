import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { MaintenanceAudience } from "./maintenance-audience";
import { MaintenanceCta } from "./maintenance-cta";
import { MaintenanceHero } from "./maintenance-hero";
import { MaintenanceIncluded } from "./maintenance-included";
import { MaintenanceTypes } from "./maintenance-types";
import { MaintenanceValue } from "./maintenance-value";

export const metadata: Metadata = {
  title: "Maintenance",
  description: `Preventive and corrective EV battery maintenance from ${siteConfig.name} — scheduled servicing that catches issues before they become failures.`,
};

/**
 * /services/maintenance — the third Services sub-page, after Battery
 * Systems and Component Repair. Same pattern: `PageBanner` hero, plain
 * content sections, global Navbar/Footer.
 *
 * Every claim is real content already established elsewhere in this
 * project (the homepage's Repair section, the client brief's own
 * "Preventive and corrective maintain[ance]" line, and the same
 * performance/certification facts `services/battery-systems` states) —
 * reframed around maintenance specifically, not new claims. No invented
 * service intervals, turnaround times, or SLAs — none are confirmed
 * anywhere in this project.
 */
export default function MaintenancePage() {
  return (
    <>
      <MaintenanceHero />
      <MaintenanceTypes />
      <MaintenanceValue />
      <MaintenanceIncluded />
      <MaintenanceAudience />
      <MaintenanceCta />
    </>
  );
}
