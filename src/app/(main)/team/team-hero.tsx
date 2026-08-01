import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * TeamHero — same `PageBanner` shell as About/Career, on the flagship
 * battery's own studio footage.
 */
export function TeamHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Who We Are
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Meet The Team
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          The engineers and specialists behind every diagnostic, repair, and
          fleet contract.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
