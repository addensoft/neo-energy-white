import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * ContactHero — reuses the homepage Hero's own footage (`/videos/hero.mp4`)
 * via the shared `PageBanner` shell, so this page reads as the same film
 * continuing rather than a plain content page bolted on. See
 * `components/page-banner` for why this is deliberately lighter than the
 * homepage's Chapter 0 (no title card, no scroll-gated timeline).
 */
export function ContactHero() {
  return (
    <PageBanner
      videoSrc="/videos/hero.mp4"
      poster="/videos/hero-poster.webp"
      alt="NEO ENERGY battery engineering footage"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Get In Touch
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Contact {siteConfig.name}
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Whether it&apos;s a battery diagnostic, a supply enquiry, or a
          partnership conversation — our engineering team responds directly,
          not through a call centre.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
