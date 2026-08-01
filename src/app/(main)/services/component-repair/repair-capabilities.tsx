"use client";

import { CircuitBoard, ClipboardCheck, Gauge, ShieldCheck, Wrench } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";
import { CapabilityCard } from "@/sections/repair/capability-card";

/**
 * RepairCapabilities — the exact same five capabilities and headline the
 * homepage's Repair section already states (`sections/repair/index.tsx`),
 * reusing that section's own `CapabilityCard` component directly rather
 * than rebuilding an equivalent — same content, same component, a
 * dedicated URL instead of a homepage scroll stop.
 */
const CAPABILITIES = [
  {
    icon: CircuitBoard,
    title: "Component-Level Repair",
    description: "Down to individual cells, busbars, and BMS boards — not just pack swaps.",
  },
  {
    icon: ClipboardCheck,
    title: "Preventive Maintenance",
    description:
      "Scheduled inspection and servicing that catches issues before they become failures.",
  },
  {
    icon: Wrench,
    title: "Corrective Maintenance",
    description: "Diagnostics-led repair that restores packs to factory specification.",
  },
  {
    icon: Gauge,
    title: "Diagnostics & Testing",
    description:
      "Cell-level and pack-level testing against the same standards as the original manufacturer.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Quality Assurance",
    description: "Every repair verified against GB 38031-2020 and manufacturer tolerances.",
  },
] as const;

export function RepairCapabilities() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Component-Level Repair</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-4xl uppercase">
              Five Capabilities, One Standard
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="body" className="max-w-xl text-balance">
              NEO ENERGY supplies, engineers, diagnoses, and supports EV
              battery systems throughout their operational life.
              Component-level repair is one of the ways we do that.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
