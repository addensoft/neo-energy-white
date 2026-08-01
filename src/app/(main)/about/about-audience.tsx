import { Building2, Car, ShieldCheck, Store, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * AboutAudience — "Who We Power," carrying over Creative Direction §2
 * Chapter 6 ("Who We Power"/Audience), approved copy that — like the
 * manifesto in `about-mission.tsx` — was never actually shipped (see
 * `sections/industries.tsx`, still an on-hold empty shell). Same six
 * audience segments and headline as that spec, reused here rather than left
 * unused; icon tiles instead of the original's editorial photography, since
 * no real photoshoot exists for this project to draw from.
 */
const AUDIENCES: { icon: LucideIcon; label: string }[] = [
  { icon: Car, label: "Taxi Operators" },
  { icon: Truck, label: "Fleet Owners" },
  { icon: Store, label: "Car Dealerships" },
  { icon: ShieldCheck, label: "Insurance Companies" },
  { icon: Wrench, label: "Workshops" },
  { icon: Building2, label: "Corporate Accounts" },
];

export function AboutAudience() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-28">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Who We Power</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="uppercase">
              Islandwide. Every Fleet. Every Brand.
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {AUDIENCES.map((audience, index) => (
            <RevealWrapper key={audience.label} variant="fade" delay={index * 0.08}>
              <div className="border-border bg-background flex h-full flex-col items-center gap-3 rounded-md border p-5 text-center">
                <div className="ring-ion/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <audience.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-label-sm font-mono">{audience.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
