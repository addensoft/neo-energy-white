import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { AboutAudience } from "./about-audience";
import { AboutCta } from "./about-cta";
import { AboutHero } from "./about-hero";
import { AboutMission } from "./about-mission";
import { AboutPartners } from "./about-partners";
import { AboutPrinciples } from "./about-principles";
import { AboutStory } from "./about-story";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.description} Learn what NEO ENERGY does, the principles behind every repair, and who we power across Singapore.`,
};

/**
 * /about — the site's third real page, following the same pattern the
 * Contact page established: `PageBanner` for the cinematic banner, plain
 * content sections below, global Navbar/Footer from the `(main)` layout.
 *
 * Two chapters here (`AboutMission`, `AboutAudience`) carry over Creative
 * Direction copy that was written and approved for the homepage but never
 * actually shipped — the on-hold `sections/manifesto.tsx` and
 * `sections/industries.tsx` shells. Reused here rather than left to rot
 * unused; see each component's own comment for which chapter it continues.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutPrinciples />
      <AboutAudience />
      <AboutPartners />
      <AboutCta />
    </>
  );
}
