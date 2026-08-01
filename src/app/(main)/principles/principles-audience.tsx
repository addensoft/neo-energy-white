import { Building2, Car, ShieldCheck, Store, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * PrinciplesAudience — "06. Who We Power." Same six audience segments
 * `about-audience.tsx` already established, reused verbatim as pill chips
 * (rather than About's icon-tile grid) for visual variety between the two
 * pages.
 */
const AUDIENCES: { icon: LucideIcon; label: string }[] = [
  { icon: Car, label: "Taxi Operators" },
  { icon: Truck, label: "Fleet Owners" },
  { icon: Store, label: "Car Dealerships" },
  { icon: ShieldCheck, label: "Insurance Companies" },
  { icon: Wrench, label: "Workshops" },
  { icon: Building2, label: "Corporate Accounts" },
];

export function PrinciplesAudience() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-12">
        <div className="flex flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                06
              </span>
              <span className="text-ion text-label-sm font-mono">Who We Power</span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-2xl uppercase">
              Islandwide. Every Fleet. Every Brand.
            </Heading>
          </RevealWrapper>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {AUDIENCES.map((audience, index) => (
            <RevealWrapper key={audience.label} variant="fade" delay={index * 0.06}>
              <div className="border-border bg-background hover:border-ion/50 ease-engineered flex items-center gap-2.5 rounded-full border px-5 py-2.5 transition-colors duration-300">
                <audience.icon className="text-ion h-4 w-4" strokeWidth={1.5} />
                <span className="text-label-sm font-mono">{audience.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
