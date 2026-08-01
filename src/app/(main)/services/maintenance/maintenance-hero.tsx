import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * MaintenanceHero — same `PageBanner` shell as Battery Systems/Component
 * Repair, on the same flagship pack footage.
 */
export function MaintenanceHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Services · Maintenance
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="max-w-3xl text-white uppercase">
          Preventive &amp; Corrective Maintenance
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          Scheduled servicing that catches issues before they become
          failures — and diagnostics-led repair when one already has.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
