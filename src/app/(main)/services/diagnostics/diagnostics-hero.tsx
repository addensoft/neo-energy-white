import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * DiagnosticsHero — same `PageBanner` shell as the other Services pages, on
 * the same flagship pack footage.
 */
export function DiagnosticsHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Services · Diagnostics
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="max-w-3xl text-white uppercase">
          Cell-Level &amp; Pack-Level Diagnostics
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Testing against the same standards as the original manufacturer —
          so you know exactly what&apos;s failed before anything gets
          repaired.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
