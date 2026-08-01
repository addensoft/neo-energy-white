import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { PrinciplesAudience } from "./principles-audience";
import { PrinciplesAuthority } from "./principles-authority";
import { PrinciplesCta } from "./principles-cta";
import { PrinciplesHero } from "./principles-hero";
import { PrinciplesOverview } from "./principles-overview";
import { PrinciplesServices } from "./principles-services";
import { PrinciplesStandards } from "./principles-standards";
import { PrinciplesWorking } from "./principles-working";

export const metadata: Metadata = {
  title: "Our Principles",
  description: `A full profile of ${siteConfig.name}: positioning, authorised partners, certification standards, and how every engagement is run.`,
};

/**
 * /principles — the site's tenth real page. Formatted as a numbered
 * corporate-profile document (01 Company Overview → 07 Contact, stat tiles,
 * a fact table) at the client's direction, using a CATL investor-relations
 * PDF they shared as the *structural* reference — see `principles-hero.tsx`'s
 * comment for why none of CATL's own content (revenue, headcount, patents,
 * executives) appears anywhere on this page. Every fact here is NEO
 * ENERGY's own, already established on About/Repair/Trust Bar/Contact —
 * this page just gives it a dedicated, denser presentation than those pages
 * do individually.
 *
 * Deliberately has no Financial Performance, R&D, Zero-Carbon Strategy, or
 * Milestones section, unlike the CATL reference — this project has no
 * confirmed source for NEO ENERGY financials, a patent portfolio, a
 * sustainability programme, or a company history with real dates, and
 * inventing any of those would be the same problem borrowing CATL's own
 * numbers would have been.
 */
export default function PrinciplesPage() {
  return (
    <>
      <PrinciplesHero />
      <PrinciplesOverview />
      <PrinciplesServices />
      <PrinciplesAuthority />
      <PrinciplesStandards />
      <PrinciplesWorking />
      <PrinciplesAudience />
      <PrinciplesCta />
    </>
  );
}
