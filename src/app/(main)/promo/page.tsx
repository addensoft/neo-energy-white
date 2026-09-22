import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

import { PromoHero } from "./promo-hero";

export const metadata: Metadata = {
  title: "Promotions",
  description: `Current promotions from ${siteConfig.name} — coming soon.`,
  robots: { index: false, follow: true },
};

/**
 * /promo — temporarily hidden per direct instruction: only the `PageBanner`
 * hero renders; everything after it (`PromoOffers`' featured bundle and
 * membership tiers, `PromoSubscribe`'s closing CTA) is switched off, not
 * deleted, so the real content comes straight back by re-adding those two
 * lines below once this is ready to go live again. `robots: noindex` while
 * it's in this half-built state, same reasoning `/under-construction` uses.
 */
export default function PromoPage() {
  return (
    <>
      <PromoHero />
      {/* <PromoOffers /> */}
      {/* <PromoSubscribe /> */}
    </>
  );
}
