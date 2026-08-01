import { CircuitBoard, Layers, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * PrinciplesServices — "02. Core Business." The same three pillars
 * `about-story.tsx` already established (client brief's own answer to "what
 * do you do?"), reused verbatim rather than re-described, in a horizontal
 * segment-breakdown layout instead of About's card grid so the two pages
 * don't read as duplicates of each other.
 */
const SEGMENTS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Layers,
    title: "EV & Hybrid Battery Systems",
    description:
      "Supply and engineering across EV and hybrid battery technologies, authorised by CATL, CALB, and BYD.",
  },
  {
    icon: CircuitBoard,
    title: "Preventive Maintenance",
    description:
      "Scheduled inspection and servicing that catches issues before they become failures.",
  },
  {
    icon: Wrench,
    title: "Corrective & Component Repair",
    description:
      "Diagnostics-led repair down to the cell, busbar, and BMS board — not just pack swaps.",
  },
];

export function PrinciplesServices() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                02
              </span>
              <span className="text-ion text-label-sm font-mono">Core Business</span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-2xl uppercase">
              What We Actually Do
            </Heading>
          </RevealWrapper>
        </div>

        <div className="divide-border border-border flex flex-col divide-y border-y sm:flex-row sm:divide-x sm:divide-y-0">
          {SEGMENTS.map((segment, index) => (
            <RevealWrapper
              key={segment.title}
              variant="blur"
              delay={index * 0.1}
              duration={0.7}
              className="flex-1"
            >
              {/* `index === 0` here, not a CSS `first:` selector — each card
                  is the lone child of its own `RevealWrapper`, so every card
                  would otherwise match "first child" and lose its left
                  padding, not just the actual first one. */}
              <div
                className={cn(
                  "flex h-full flex-col gap-3 py-6 sm:py-2",
                  index === 0 ? "sm:pr-8" : "sm:px-8",
                )}
              >
                <segment.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{segment.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
