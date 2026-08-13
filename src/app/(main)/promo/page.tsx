import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { PromoHero } from "./promo-hero";
import { PromoOffers } from "./promo-offers";
import { PromoSubscribe } from "./promo-subscribe";

export const metadata: Metadata = {
  title: "Promotions",
  description: `Current promotions from ${siteConfig.name} — a 10-Year Engine Protection Plan bundle, plus Premier, Prestige, and Prestige+ membership.`,
};

/**
 * /promo — the site's sixth real page, following the same pattern Contact/
 * About/App/Career established: `PageBanner` for the cinematic banner, plain
 * content sections below, global Navbar/Footer from the `(main)` layout.
 *
 * `PromoOffers` holds the featured bundle and the membership tiers — see
 * that file's own comment for where this content actually comes from
 * (TEAM AUTOPRO's live promotion page, adapted).
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
