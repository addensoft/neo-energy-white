import { ClipboardCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * MaintenanceTypes — the same two maintenance disciplines the homepage's
 * Repair section and `about-story.tsx` already state (client brief's own
 * "Preventive and corrective maintain[ance]"), presented here as a direct
 * side-by-side comparison rather than two items in a five-card grid — this
 * page's whole job is explaining the difference in more depth than a
 * homepage capability card can.
 */
const TYPES: {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}[] = [
  {
    icon: ClipboardCheck,
    title: "Preventive Maintenance",
    description: "Scheduled inspection and servicing that catches issues before they become failures.",
    detail:
      "Regular cell, busbar, and BMS checks against the same tolerances the pack was built to — so a stressed connection or a drifting cell group gets caught while it's still a minor fix, not a breakdown.",
  },
  {
    icon: Wrench,
    title: "Corrective Maintenance",
    description: "Diagnostics-led repair that restores packs to factory specification.",
    detail:
      "When a fault has already happened, cell-level and pack-level diagnostics identify exactly what failed, and component-level repair restores it — not a full pack swap for a single bad connection.",
  },
];

export function MaintenanceTypes() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Two Disciplines</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Before A Fault, And After One
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {TYPES.map((type, index) => (
            <RevealWrapper key={type.title} variant="blur" delay={index * 0.12} duration={0.8}>
              <div className="border-border bg-graphite/60 flex h-full flex-col items-center gap-4 rounded-md border p-8 text-center lg:items-start lg:p-10 lg:text-left">
                <div className="ring-ion/20 flex h-14 w-14 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <type.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <Heading as="h3" size="h3" className="uppercase">
                    {type.title}
                  </Heading>
                  <Paragraph size="body" className="text-foreground/90 font-semibold">
                    {type.description}
                  </Paragraph>
                </div>
                <p className="font-body text-muted text-sm leading-relaxed">{type.detail}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
