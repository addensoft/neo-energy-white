import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * IconHeader — the plain, no-video header shared by pages with no real
 * NEO footage to put behind a `PageBanner` video: the 13 workshop-service
 * pages (Accident Repairs, Tyres, Brakes, etc. — the flagship battery-pack
 * footage `PageBanner` usually shows would be visibly wrong background for
 * a tyre-repair page) and Gallery/FAQ (same reasoning `LegalHeader` gives —
 * there's no real footage of "FAQ" either). Icon-led instead.
 */
export function IconHeader({
  icon: Icon,
  eyebrow,
  title,
  summary,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <section className="bg-foreground relative flex w-full items-center justify-center overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-5 text-center">
        <RevealWrapper variant="fade">
          <div className="ring-ion/30 flex h-14 w-14 items-center justify-center rounded-full bg-ion/10 ring-1">
            <Icon className="text-ion h-6 w-6" strokeWidth={1.5} />
          </div>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.05}>
          <span className="text-ion font-mono text-xs font-semibold tracking-[0.14em] uppercase">
            {eyebrow}
          </span>
        </RevealWrapper>

        <RevealWrapper variant="blur" delay={0.1} duration={1}>
          <Heading as="h1" size="h2" className="max-w-2xl text-balance text-white uppercase">
            {title}
          </Heading>
        </RevealWrapper>

        <RevealWrapper variant="fade" delay={0.25}>
          <Paragraph size="body" className="max-w-xl text-balance text-white/80">
            {summary}
          </Paragraph>
        </RevealWrapper>
      </Container>
    </section>
  );
}
