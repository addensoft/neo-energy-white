import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * PromoHero — same `PageBanner` shell as Contact/App, on the Hero film. The
 * offers themselves (copy, terms, countdown) live in `promo-offers.tsx`
 * below — this banner stays a general section announcement rather than
 * duplicating their specifics, so the two never drift out of sync as offers
 * change.
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

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Exclusive limited-time offers for fleet, dealership, private, and
          service accounts — several live right now.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
