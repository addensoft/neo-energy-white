import { CircuitBoard, Layers, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * AboutStory — "who we are," in the site's own already-approved words. The
 * heading is the Creative Direction's own positioning line for the homepage
 * (§0, "The Big Idea") — this page states it directly instead of only
 * implying it through footage, since an About page's job is the explanation
 * the homepage deliberately withholds.
 *
 * The three pillars restate the client brief's own answer to "what do you
 * do?" (EV/hybrid battery systems, preventive maintenance, corrective/
 * component repair), reusing the exact wording already shipped in the
 * Repair section's capability cards rather than inventing new claims.
 */
const PILLARS: { icon: LucideIcon; title: string; description: string }[] = [
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

export function AboutStory() {
  return (
    <section id="story" className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-3/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Our Story</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Singapore&apos;s Authorised Battery Engineering Partner
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.3}>
            <Paragraph size="body" className="max-w-2xl text-balance">
              We don&apos;t just service EV batteries. We&apos;re the only
              authorised team in Singapore that can go inside one — down to
              the last busbar — and bring it back to factory spec. As a
              direct agent for two of the world&apos;s top three battery
              technologies, that authority is confirmed, not claimed.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <RevealWrapper key={pillar.title} variant="blur" delay={index * 0.1} duration={0.7}>
              <div className="border-border bg-graphite/60 flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center lg:gap-4 lg:p-8">
                <pillar.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{pillar.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
