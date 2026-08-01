import { Award, Globe2, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * CareerWhyJoin — reasons to work here, each restating a fact already
 * established elsewhere on the site (authorised-agent status, component-
 * level repair depth, GB 38031-2020 certification, islandwide reach — see
 * About/Repair/Trust Bar) reframed for a prospective employee rather than a
 * prospective customer, instead of inventing generic "great culture" copy or
 * unconfirmed specifics like salary bands or leave policy.
 */
const REASONS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wrench,
    title: "Real Engineering Work",
    description:
      "Component-level diagnostics and repair down to the cell, busbar, and BMS board — not just pack swaps on a bench.",
  },
  {
    icon: ShieldCheck,
    title: "Manufacturer-Backed Standards",
    description:
      "Work as a direct agent for two of the world's top three EV / hybrid battery technologies, to their own authorised standards.",
  },
  {
    icon: Award,
    title: "Certified Safety Culture",
    description:
      "Every repair verified against GB 38031-2020 and manufacturer tolerances — precision is the baseline, not the exception.",
  },
  {
    icon: Globe2,
    title: "Islandwide Impact",
    description:
      "Your work keeps taxi fleets, dealerships, and corporate accounts across Singapore on the road.",
  },
];

export function CareerWhyJoin() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Why Join Us</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Work On Batteries That Actually Matter
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Singapore&apos;s authorised EV battery engineering specialist —
              not a generic repair shop.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
          {REASONS.map((reason, index) => (
            <RevealWrapper key={reason.title} variant="blur" delay={index * 0.1} duration={0.7}>
              <div className="border-border bg-graphite/60 hover:border-ion/50 ease-engineered flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center transition-colors duration-300 lg:items-start lg:p-8 lg:text-left">
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
