import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * AboutHero — same `PageBanner` shell Contact uses, but on the flagship
 * battery's own studio footage (`/videos/flagship-battery.mp4`) rather than
 * the Hero film. Creative Direction §14 ("one battery, one identity") is
 * about the homepage's chaptered story specifically, but the spirit still
 * applies here: this is the same canonical pack the rest of the site
 * already built its credibility on, not a fresh, unrelated shot standing in
 * for "about us."
 */
export function AboutHero() {
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
          About {siteConfig.name}
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          {siteConfig.description}
        </Paragraph>
      </RevealWrapper>
    </PageBanner>
  );
}
