import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { DiagnosticsAudience } from "./diagnostics-audience";
import { DiagnosticsChecklist } from "./diagnostics-checklist";
import { DiagnosticsCta } from "./diagnostics-cta";
import { DiagnosticsHero } from "./diagnostics-hero";
import { DiagnosticsLevels } from "./diagnostics-levels";
import { DiagnosticsStandard } from "./diagnostics-standard";

export const metadata: Metadata = {
  title: "Diagnostics",
  description: `Cell-level and pack-level EV battery diagnostics from ${siteConfig.name} — tested against GB 38031-2020 and the original manufacturer's own tolerances.`,
};

/**
 * /services/diagnostics — the fourth Services sub-page, after Battery
 * Systems, Component Repair, and Maintenance. Same pattern: `PageBanner`
 * hero, plain content sections, global Navbar/Footer.
 *
 * Every claim is real content already established elsewhere in this
 * project (the homepage's Repair section, `services/battery-systems`'s
 * performance facts, the News article on GB 38031-2020) reframed around
 * diagnostics specifically — no invented equipment, turnaround times, or
 * report formats this project has no confirmed source for.
 */
export default function DiagnosticsPage() {
  return (
    <>
      <DiagnosticsHero />
      <DiagnosticsLevels />
      <DiagnosticsChecklist />
      <DiagnosticsStandard />
      <DiagnosticsAudience />
      <DiagnosticsCta />
    </>
  );
}
