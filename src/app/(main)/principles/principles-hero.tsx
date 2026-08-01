import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";

/**
 * PrinciplesHero — same `PageBanner` shell as About/Career, on the flagship
 * battery's own studio footage.
 *
 * This page's numbered-section format (01, 02, 03…, stat tiles, a fact
 * table) was modelled on a CATL corporate profile document the client
 * shared as a design reference — the layout and formatting only. Every fact
 * on this page is NEO ENERGY's own, already established elsewhere on this
 * site (About/Repair/Trust Bar/Contact); nothing about CATL's own business
 * — revenue, headcount, patents, executives — appears here. See each
 * section's own comment for where its content actually comes from.
 */
export function PrinciplesHero() {
  return (
    <PageBanner
      videoSrc="/videos/flagship-battery.mp4"
      poster="/videos/flagship-battery-poster.webp"
      alt="NEO ENERGY's flagship EV battery pack"
    >
      <RevealWrapper variant="fade">
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.32em] text-white/70 uppercase">
          Company Profile
        </span>
      </RevealWrapper>

      <RevealWrapper variant="blur" delay={0.1} duration={1}>
        <Heading as="h1" size="h2" className="text-white uppercase">
          Our Principles
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          What NEO ENERGY is, what it&apos;s authorised to do, and the
          standards every repair is held to.
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
