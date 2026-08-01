import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { CareerAreas } from "./career-areas";
import { CareerCta } from "./career-cta";
import { CareerHero } from "./career-hero";
import { CareerProcess } from "./career-process";
import { CareerWhyJoin } from "./career-why-join";

export const metadata: Metadata = {
  title: "Careers",
  description: `Build your career with ${siteConfig.name}, Singapore's authorised EV battery engineering specialist — real component-level engineering work, not just parts swapping.`,
};

/**
 * /career — the site's fifth real page, following the same pattern Contact/
 * About/App established: `PageBanner` for the cinematic banner, plain
 * content sections below, global Navbar/Footer from the `(main)` layout.
 *
 * No specific job openings are listed anywhere on this page — there's no
 * confirmed live requisition data in this project (see `career-areas.tsx`),
 * so it stays at the level of "what areas we hire for" and "how to reach
 * us," with a `mailto:` hand-off as the one real action, same as Contact and
 * App's own "no backend yet" CTAs.
 */
export default function CareerPage() {
  return (
    <>
      <CareerHero />
      <CareerWhyJoin />
      <CareerAreas />
      <CareerProcess />
      <CareerCta />
    </>
  );
}
