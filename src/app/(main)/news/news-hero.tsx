import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * NewsHero — same `PageBanner` shell as About/Career, on the flagship
 * battery's own studio footage: this page carries the team's own updates
 * and engineering explainers, so it stays on the same grounded footage
 * About/Career use rather than the more abstract Hero film.
 */
export function NewsHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Updates
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          News &amp; Insights
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Company updates and engineering explainers from the team working on
          the batteries themselves.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
