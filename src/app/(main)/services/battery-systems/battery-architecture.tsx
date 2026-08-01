import { BatteryCharging, Box, Cpu, ShieldCheck, Snowflake, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * BatteryArchitecture — the same six layers `sections/exploded-view/index.tsx`
 * already names (that chapter's own scroll-driven exploded diagram is
 * on-hold/unshipped, but the layer callouts are real engineering labels from
 * the dossier, not new copy), presented here as a static card grid instead
 * of a pinned scroll-scrub — appropriate for a reference/service page that's
 * read once, not a homepage set-piece.
 */
const LAYERS: { icon: LucideIcon; title: string; spec: string }[] = [
  {
    icon: Box,
    title: "Extruded Frame",
    spec: "AL6061-T6 · 22 Mounting Points",
  },
  {
    icon: Snowflake,
    title: "Liquid Cooling Plate",
    spec: "AL3003 · Dual-Layer",
  },
  {
    icon: Cpu,
    title: "BDU + BMS-L1.1",
    spec: "One Master, One Slave",
  },
  {
    icon: BatteryCharging,
    title: "Cell Architecture",
    spec: "1P116S CIR · 214Ah LFP Cells",
  },
  {
    icon: Zap,
    title: "CCS + Busbars",
    spec: "AL1060 · Laser-Welded",
  },
  {
    icon: ShieldCheck,
    title: "Top Cover",
    spec: "DC06 Steel · Electrophoretic Coating",
  },
];

export function BatteryArchitecture() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">What&apos;s Inside</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Six Layers, One Pack
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              From the extruded frame up to the top cover — every layer built
              and repaired to the same original spec.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {LAYERS.map((layer, index) => (
            <RevealWrapper key={layer.title} variant="blur" delay={index * 0.08} duration={0.7}>
              <div className="border-border bg-background hover:border-ion/50 ease-engineered flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center transition-colors duration-300 lg:items-start lg:text-left">
                <layer.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{layer.title}</h3>
                <span className="text-label-sm font-mono">{layer.spec}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
