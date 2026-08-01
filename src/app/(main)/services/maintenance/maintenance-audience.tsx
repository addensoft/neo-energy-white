import { Building2, Car, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * MaintenanceAudience — a focused subset of the six real audience segments
 * `about-audience.tsx` already establishes, narrowed to the three where a
 * scheduled maintenance contract is the most natural fit — fleets and
 * corporate accounts run on a servicing calendar in a way a single private
 * owner typically doesn't. Not a claim that other segments are excluded,
 * just where this particular service is most relevant.
 */
const AUDIENCES: { icon: LucideIcon; label: string; description: string }[] = [
  {
    icon: Car,
    label: "Taxi Operators",
    description: "High daily usage that makes scheduled checks the difference between uptime and a breakdown.",
  },
  {
    icon: Truck,
    label: "Fleet Owners",
    description: "One maintenance calendar across every vehicle, not a repair booked after each fault.",
  },
  {
    icon: Building2,
    label: "Corporate Accounts",
    description: "Predictable servicing that fits an operations schedule, not an emergency one.",
  },
];

export function MaintenanceAudience() {
  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col items-center gap-4">
          <RevealWrapper variant="fade">
            <span className="text-ion text-label-sm font-mono">Who This Is For</span>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h3" className="uppercase">
              Built For A Servicing Calendar
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
