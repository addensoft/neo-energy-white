import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * CareerHero — same `PageBanner` shell as About/Contact, on the flagship
 * battery's own studio footage: this page is about the people who work on
 * the real, physical pack, so it stays grounded in the same footage About
 * uses rather than the more abstract Hero film Contact/App reuse.
 */
export function CareerHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Join The Team
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Careers At {siteConfig.name}
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Build your career with Singapore&apos;s authorised EV battery
          engineering specialist — real component-level work, not just parts
          swapping.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
