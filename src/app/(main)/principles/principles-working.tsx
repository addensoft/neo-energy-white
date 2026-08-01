import { Award, CircuitBoard, Headset, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * PrinciplesWorking — "05. How We Work." The exact four principles
 * `about-principles.tsx` already established, reused verbatim. Laid out as
 * a numbered list with a left accent rule instead of About's card grid —
 * different visual treatment, same words, so this page complements rather
 * than duplicates About.
 */
const PRINCIPLES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Authorised, Not Aftermarket",
    description:
      "Direct agent for two of the world's top three EV / hybrid battery technologies — not a generic third-party workshop.",
  },
  {
    icon: CircuitBoard,
    title: "Component-Level Engineering",
    description: "From cell to busbar to BMS — we repair the component, not just swap the pack.",
  },
  {
    icon: Award,
    title: "Certified Safety Standards",
    description: "Every repair verified against GB 38031-2020 and manufacturer tolerances.",
  },
  {
    icon: Headset,
    title: "Direct Engineering Access",
    description:
      "No call centre, no ticket queue — every enquiry reaches the engineers who'll actually work on it.",
  },
];

export function PrinciplesWorking() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                05
              </span>
              <span className="text-ion text-label-sm font-mono">How We Work</span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-2xl uppercase">
              Four Commitments, Every Engagement
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <RevealWrapper key={principle.title} variant="fade" delay={index * 0.1}>
              <div className="border-ion/40 hover:border-ion ease-engineered flex gap-5 border-l-2 py-1 pl-6 transition-colors duration-300">
                <span className="font-display text-ion/30 shrink-0 text-3xl font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <principle.icon className="text-ion h-4 w-4" strokeWidth={1.5} />
                    <h3 className="font-display text-h4 text-foreground">{principle.title}</h3>
                  </div>
                  <p className="font-body text-muted text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
