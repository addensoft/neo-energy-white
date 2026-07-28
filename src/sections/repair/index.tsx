"use client";

import { CircuitBoard, ClipboardCheck, Gauge, ShieldCheck, Wrench } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Section } from "@/components/section";
import { Container, Heading, Paragraph } from "@/components/ui";

import { CapabilityCard } from "./capability-card";

const CAPABILITIES = [
  {
    icon: CircuitBoard,
    title: "Component-Level Repair",
    description:
      "Down to individual cells, busbars, and BMS boards — not just pack swaps.",
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
    description:
      "Every repair verified against GB 38031-2020 and manufacturer tolerances.",
  },
] as const;

/**
 * Component-Level Repair. Creative Direction §2 Chapter 5 ("The Differentiator"),
 * reframed per the locked content order to sit right after the exploded
 * engineering view rather than after a manifesto beat.
 *
 * "Tonal shift from 'product' to 'craft'" (§2).
 *
 * Business-positioning correction (client feedback, second pass): the
 * original headline ("Most Workshops Swap the Pack. We Repair the
 * Component.") still read as a repair-shop pitch. Replaced with "Engineering
 * Beyond the Battery Pack," chosen from the client's own shortlist — technical
 * and confident rather than a repair-workshop tagline, and it still sets up
 * the component-level differentiator the capability cards below demonstrate.
 * Sales/supply/engineering live in Flagship Battery Overview above this
 * section, so the two together should read as "we sell and engineer battery
 * systems, and we service them deeper than anyone else," not "we are a
 * repair shop." Cards, icons, layout, and animations are unchanged — copy only.
 */
export function Repair() {
  return (
    <Section id="repair" className="bg-void relative py-24 lg:py-32">
      {/* Ambient blue lighting — same treatment (opacity/blur) as every other
          full section, so the light reads as one consistent environment. */}
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">
              Component-Level Repair
            </span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-4xl uppercase">
              Engineering Beyond the Battery Pack
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="body" className="max-w-xl text-balance">
              NEO ENERGY supplies, engineers, diagnoses, and supports EV battery
              systems throughout their operational life. Component-level repair is one
              of the ways we do that — from cell to busbar to BMS, Singapore&apos;s
              only authorised team certified to go this deep.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
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
    </Section>
  );
}
