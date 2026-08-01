import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * RepairHero — same `PageBanner` shell as Battery Systems, on the same
 * flagship pack footage: this page is about servicing that exact object,
 * not a different one.
 */
export function RepairHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Services · Component Repair
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="max-w-3xl text-white uppercase">
          Engineering Beyond The Battery Pack
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          From cell to busbar to BMS — Singapore&apos;s only authorised team
          certified to go this deep.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
