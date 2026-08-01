import { Repeat, ShieldCheck, Thermometer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * MaintenanceValue — why scheduled maintenance matters, grounded in the
 * same real performance facts `services/battery-systems/battery-
 * performance.tsx` already states (thermal management, cycle life, GB
 * 38031-2020) — reframed around what regular servicing protects, not
 * restated as new claims.
 */
const REASONS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Thermometer,
    title: "Protects Thermal Performance",
    description:
      "Cooling-plate and busbar checks keep temperatures under the same 55°C ceiling the pack was designed to hold at peak fast-charge load.",
  },
  {
    icon: Repeat,
    title: "Protects Cycle Life",
    description:
      "Catching a drifting cell group early is what keeps a pack tracking toward its full rated cycle life, not falling short of it.",
  },
  {
    icon: ShieldCheck,
    title: "Keeps Certification Valid",
    description:
      "Every check is run against GB 38031-2020 and manufacturer tolerances — the same standard the pack was originally certified to.",
  },
];

export function MaintenanceValue() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Why It Matters</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              What Regular Servicing Protects
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              A pack degrades on its own timeline regardless — maintenance is
              what keeps it on the timeline it was engineered for.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
          {REASONS.map((reason, index) => (
            <RevealWrapper key={reason.title} variant="blur" delay={index * 0.1} duration={0.7}>
              <div className="border-border bg-background flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center lg:gap-4 lg:p-8">
                <reason.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{reason.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
