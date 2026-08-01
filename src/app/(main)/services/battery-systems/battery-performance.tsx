import { Award, Repeat, Thermometer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Badge, Container, Heading } from "@/components/ui";

/**
 * BatteryPerformance — the same three hotspot facts
 * `sections/exploded-view/index.tsx`'s `HOTSPOTS` array already states
 * (thermal management, cycle life, safety rating), plus the GB 38031-2020
 * proof points already used on `/principles` — reused verbatim rather than
 * re-measured for this page.
 */
const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Thermometer,
    title: "Thermal Management",
    description:
      "Dual-layer liquid cooling keeps busbar temperature under 55°C even at peak 30–80% fast-charge load.",
  },
  {
    icon: Repeat,
    title: "Cycle Life",
    description:
      "93.8% capacity retention after 500 cycles at 25°C — measured on the same 214Ah cell used in every pack.",
  },
  {
    icon: Award,
    title: "Safety Rating",
    description:
      "Certified to GB 38031-2020 — nail penetration, 1m water immersion, and mechanical shock, all without fire or explosion.",
  },
];

const PROOF_POINTS = [
  "Nail Penetration",
  "1m Water Immersion",
  "Vibration & Mechanical Shock",
] as const;

export function BatteryPerformance() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-3/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Performance &amp; Safety</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Built To Outlast The Car
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <RevealWrapper
              key={feature.title}
              variant="blur"
              delay={index * 0.1}
              duration={0.7}
            >
              <div className="border-border bg-graphite/60 flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center lg:gap-4 lg:p-8">
                <feature.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{feature.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper variant="fade" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROOF_POINTS.map((point) => (
              <Badge key={point} variant="ion" className="px-4 py-2 text-[0.7rem]">
                {point}
              </Badge>
            ))}
          </div>
        </RevealWrapper>
      </Container>
    </section>
  );
}
