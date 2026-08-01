import { Award, CircuitBoard, Headset, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * AboutPrinciples — four working principles, each restating a fact already
 * established elsewhere on the site rather than generic corporate values
 * copy: authorised-agent status (Trust Bar), component-level repair depth
 * (Repair section), GB 38031-2020 certification (Repair section), and the
 * "no call centre" direct-access line this project introduced on the
 * Contact page. Reused verbatim so the site keeps saying the same things in
 * the same words wherever they appear.
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
    description:
      "From cell to busbar to BMS — we repair the component, not just swap the pack.",
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

export function AboutPrinciples() {
  return (
    <section id="principles" className="bg-void relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Our Principles</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              How We Work
            </Heading>
          </RevealWrapper>
          <RevealWrapper variant="fade" delay={0.2}>
            <Paragraph size="body" className="max-w-xl text-balance">
              Four commitments that shape every engagement, from a single
              diagnostic to an islandwide fleet contract.
            </Paragraph>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
          {PRINCIPLES.map((principle, index) => (
            <RevealWrapper
              key={principle.title}
              variant="blur"
              delay={index * 0.1}
              duration={0.7}
            >
              <div className="border-border bg-graphite/60 hover:border-ion/50 ease-engineered flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center transition-colors duration-300 lg:items-start lg:p-8 lg:text-left">
                <principle.icon className="text-ion h-6 w-6" strokeWidth={1.5} />
                <h3 className="font-display text-h4 text-foreground">{principle.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
