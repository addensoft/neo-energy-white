import { CheckCircle2, Wrench, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageBanner } from "@/components/page-banner";
import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Heading, Paragraph } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

/**
 * CareerHero — content matches TEAM AUTOPRO's own "Join Us" page verbatim
 * (NEO Energy's parent business, client-confirmed): the heading, intro
 * paragraph, and the three badge pills below it are their exact text, per
 * direct instruction to pull this page's content from theirs. The one
 * unavoidable change: "At Team Auto, we're more than a workshop" names the
 * company speaking in first person, so it reads as `${siteConfig.name}`
 * here rather than a different company's own name appearing as if it were
 * NEO's — everything else in the sentence is untouched. The `PageBanner`
 * video shell itself stays NEO's own sitewide pattern (every inner page
 * uses it) — that's this site's chrome, not page content being duplicated.
 */
const BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Wrench, label: "Diagnose and repair vehicles with precision?" },
  { icon: CheckCircle2, label: "Outstanding Customer Service" },
  { icon: Zap, label: "Dynamic, Fast-Paced Environment" },
];

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
        <Heading as="h1" size="h2" className="max-w-2xl text-white uppercase">
          Join Our Growing Team
        </Heading>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.2}>
        <Paragraph size="body" className="max-w-xl text-balance text-white/80">
          At {siteConfig.name}, we&apos;re more than a workshop —
          we&apos;re a crew that takes pride in precision, performance, and
          people. Come build your career with us.
        </Paragraph>
      </RevealWrapper>

      <RevealWrapper variant="fade" delay={0.3}>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="border-ion/40 text-ion flex w-fit items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.04em] uppercase backdrop-blur-sm"
            >
              <badge.icon className="h-3.5 w-3.5" strokeWidth={2} />
              {badge.label}
            </span>
          ))}
        </div>
      </RevealWrapper>
    </PageBanner>
  );
}
