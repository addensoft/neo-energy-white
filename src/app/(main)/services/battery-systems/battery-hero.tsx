import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * BatteryHero — same `PageBanner` shell as About/Career, but on the flagship
 * pack's own studio footage (`flagship-battery.mp4`) rather than the Hero
 * film — this page is about that exact physical object, so it opens on it
 * directly instead of the more abstract corridor footage.
 */
export function BatteryHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship 77.94kWh EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Services · Battery Systems
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Battery Systems
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          The same flagship 77.94kWh pack we supply, engineer, and service —
          authorised across CATL, CALB, and BYD battery technologies.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
