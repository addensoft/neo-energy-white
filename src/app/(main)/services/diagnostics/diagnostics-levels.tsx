import { BatteryCharging, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * DiagnosticsLevels — the same "cell-level and pack-level testing" line the
 * homepage's Repair section and `services/component-repair` already state,
 * expanded into what each level actually means — no new claims, the same
 * two-tier testing scope stated elsewhere on this site, explained in more
 * depth than a one-line capability card allows.
 */
const LEVELS: {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}[] = [
  {
    icon: BatteryCharging,
    title: "Cell-Level Testing",
    description: "Individual cells checked against the manufacturer's own tolerances.",
    detail:
      "The same 1P116S CIR architecture and 214Ah cells every pack is built from, tested individually rather than assumed healthy because the pack as a whole still powers on.",
  },
  {
    icon: Layers,
    title: "Pack-Level Testing",
    description: "The full assembly checked as the system it actually is.",
    detail:
      "Busbar connections, BMS readings, and cooling performance verified together — a fault that only shows up under load, not in a single cell reading, still gets caught.",
  },
];

export function DiagnosticsLevels() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Two Levels</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Not Just A Dashboard Light
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              A pack that looks fine at a glance can still be hiding a fault
              — testing at both levels is how that gap gets closed.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {LEVELS.map((level, index) => (
            <RevealWrapper key={level.title} variant="blur" delay={index * 0.12} duration={0.8}>
              <div className="border-border bg-graphite/60 flex h-full flex-col items-center gap-4 rounded-md border p-8 text-center lg:items-start lg:p-10 lg:text-left">
                <div className="ring-ion/20 flex h-14 w-14 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <level.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <Heading as="h3" size="h3" className="uppercase">
                    {level.title}
                  </Heading>
                  <Paragraph size="body" className="text-foreground/90 font-semibold">
                    {level.description}
                  </Paragraph>
                </div>
                <p className="font-body text-muted text-sm leading-relaxed">{level.detail}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
