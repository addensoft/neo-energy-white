import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * AppHero — same `PageBanner` shell as Contact/About, on the Hero film
 * again. Unlike those two pages, there's no confirmed-real fact to state as
 * a subline yet (no launch date, no store links) — "Coming Soon" is the
 * honest eyebrow, not a claim that the app already exists.
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
          Coming Soon
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          The {siteConfig.name} App
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          One app for every battery interaction — book an assessment, track
          your service history, and reach the engineers working on your fleet
          directly.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
