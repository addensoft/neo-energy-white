import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { CareerAreas } from "./career-areas";
import { CareerCta } from "./career-cta";
import { CareerHero } from "./career-hero";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${siteConfig.name}'s growing team — open positions and how to apply.`,
};

/**
 * /career — rebuilt to match TEAM AUTOPRO's own "Join Us" page (NEO
 * Energy's parent business, client-confirmed) per direct instruction: same
 * three-section structure as the source (intro + badges, open positions,
 * ready-to-apply CTA), not the previous five-section version, which had two
 * whole sections ("Why Join Us", "A Straightforward Process") the source
 * page doesn't have — dropped rather than kept alongside the real content.
 */
export default function CareerPage() {
  return (
    <>
      <CareerHero />
      <CareerAreas />
      <CareerCta />
    </>
  );
}
