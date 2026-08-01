import { Gauge, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * RepairProcess — the same three capabilities `repair-capabilities.tsx`
 * already lists (Diagnostics & Testing, Component-Level Repair, Safety &
 * Quality Assurance), reframed here as a sequence rather than a flat list —
 * no new claims, no invented turnaround times or SLAs this project has no
 * confirmed source for.
 */
const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Gauge,
    title: "Diagnose",
    description:
      "Cell-level and pack-level testing identifies exactly which component has failed — not just that the pack has.",
  },
  {
    icon: Wrench,
    title: "Repair",
    description:
      "Component-level work down to the cell, busbar, or BMS board, restoring the pack to factory specification.",
  },
  {
    icon: ShieldCheck,
    title: "Verify",
    description:
      "Every repair checked against GB 38031-2020 and the manufacturer's own tolerances before it goes back out.",
  },
];

export function RepairProcess() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">How It Works</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Diagnose. Repair. Verify.
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
          {STEPS.map((step, index) => (
            <RevealWrapper key={step.title} variant="blur" delay={index * 0.12} duration={0.7}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="ring-ion/20 flex h-14 w-14 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <step.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="font-display text-ion/40 text-3xl font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h4 text-foreground">{step.title}</h3>
                <p className="font-body text-muted max-w-xs text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
