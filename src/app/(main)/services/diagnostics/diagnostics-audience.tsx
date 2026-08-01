import { Search, ShieldCheck, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * DiagnosticsAudience — a focused subset of the six real audience segments
 * `about-audience.tsx` already establishes, narrowed to the three where a
 * standalone diagnostic (not a repair) is the actual thing being asked
 * for — an insurance assessment, a pre-purchase inspection, or a used-EV
 * buyer wanting an independent check before committing.
 */
const AUDIENCES: { icon: LucideIcon; label: string; description: string }[] = [
  {
    icon: ShieldCheck,
    label: "Insurance Companies",
    description: "Independent damage assessment against manufacturer tolerances, not a guess.",
  },
  {
    icon: Store,
    label: "Car Dealerships",
    description: "Pre-purchase inspection and certification before a used EV goes on the floor.",
  },
  {
    icon: Search,
    label: "Private & Used-EV Buyers",
    description: "An independent check of the exact pack you're about to buy or sell.",
  },
];

export function DiagnosticsAudience() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Who This Is For</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h3" className="uppercase">
              When You Need The Truth, Not A Repair
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {AUDIENCES.map((audience, index) => (
            <RevealWrapper key={audience.label} variant="fade" delay={index * 0.08}>
              <div className="border-border bg-background flex h-full flex-col items-center gap-3 rounded-md border p-6 text-center">
                <div className="ring-ion/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                  <audience.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-label-sm font-mono">{audience.label}</span>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
