import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading } from "@/components/ui";

/**
 * PromoHero — same `PageBanner` shell as Contact/App, on the Hero film. The
 * offers themselves (copy, terms, countdown) live in `promo-offers.tsx`
 * below — this banner stays a general section announcement rather than
 * duplicating their specifics, so the two never drift out of sync as offers
 * change. No subline under the title — removed per direct instruction.
 */
export function PromoHero() {
  return (
    <PageBanner
      videoSrc="/videos/hero.mp4"
      poster="/videos/hero-poster.webp"
      alt="NEO ENERGY battery engineering footage"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Offers
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Promotions
        </Heading>
      </RevealWrapper>
    </PageBanner>
  );
}
