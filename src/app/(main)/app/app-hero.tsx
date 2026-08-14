import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * AppHero — same `PageBanner` shell as Contact/About, on the Hero film.
 * No longer "Coming Soon": the app is a real, live product (TEAM AUTOPRO's
 * own — NEO Energy's parent business, client-confirmed) available today on
 * both stores — see `app-download.tsx` for the real listing links.
 */
export function AppHero() {
  return (
    <PageBanner
      videoSrc="/videos/hero.mp4"
      poster="/videos/hero-poster.webp"
      alt="NEO ENERGY battery engineering footage"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Available Now
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          The {siteConfig.name} App
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Book your appointment, track discounts and warranty, and keep on
          top of your road tax — all from your phone.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
