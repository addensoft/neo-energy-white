import type { Metadata } from "next";

import { promoBrochures } from "@/lib/promo-brochures";
import { siteConfig } from "@/lib/site-config";

import { PromoBrochures } from "./promo-brochures";
import { PromoHero } from "./promo-hero";

export const metadata: Metadata = {
  title: "Promotions",
  description: `Current promotions from ${siteConfig.name} — Pre-Purchase Inspection at $138, and an EV Battery Maintenance package.`,
};

/**
 * /promo — the bundle/membership content (`PromoOffers`) and the subscribe
 * CTA (`PromoSubscribe`) are still switched off per earlier direct
 * instruction (see git history), not deleted — the real content comes back
 * by re-adding those two lines here once that's ready to go live again.
 *
 * `PromoBrochures` is real, live content though (two actual posters, see
 * that file's own comment), so this page is no longer just the bare banner
 * it briefly was, and `noindex` comes off accordingly.
 */
export default function PromoPage() {
  return (
    <>
      <PromoHero />
      <PromoBrochures brochures={promoBrochures} />
      {/* <PromoOffers /> */}
      {/* <PromoSubscribe /> */}
    </>
  );
}
