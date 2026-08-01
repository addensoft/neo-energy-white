import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { TeamCta } from "./team-cta";
import { TeamGrid } from "./team-grid";
import { TeamHero } from "./team-hero";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the engineers and specialists behind ${siteConfig.name}'s battery diagnostics, repair, and fleet servicing work.`,
};

/**
 * /team — the site's ninth real page, following the same pattern Contact/
 * About/Career/App/Promo/News established: `PageBanner` for the cinematic
 * banner, plain content sections below, global Navbar/Footer from the
 * `(main)` layout.
 *
 * The roster in `team-grid.tsx` is placeholder data (names, titles, no
 * photos) built at the client's explicit direction pending the real team's
 * details — see that file's own comment before treating any of it as real.
 */
export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <TeamGrid />
      <TeamCta />
    </>
  );
}
