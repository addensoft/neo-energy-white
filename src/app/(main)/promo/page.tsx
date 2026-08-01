import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { PromoHero } from "./promo-hero";
import { PromoOffers } from "./promo-offers";
import { PromoSubscribe } from "./promo-subscribe";

export const metadata: Metadata = {
  title: "Promotions",
  description: `Current promotions and offers from ${siteConfig.name} — filter by fleet, dealership, private owner, or service offers, including a live complimentary battery health assessment.`,
};

/**
 * /promo — the site's sixth real page, following the same pattern Contact/
 * About/App/Career established: `PageBanner` for the cinematic banner, plain
 * content sections below, global Navbar/Footer from the `(main)` layout.
 *
 * `PromoOffers` holds the featured offer, the filterable grid, and the
 * filter tabs together in one client component, since all three share one
 * piece of state (see that file's own comment for why they couldn't stay
 * split the way `promo-offer.tsx`/`promo-grid.tsx` originally were).
 */
export default function PromoPage() {
  return (
    <>
      <PromoHero />
      <PromoOffers />
      <PromoSubscribe />
    </>
  );
}
