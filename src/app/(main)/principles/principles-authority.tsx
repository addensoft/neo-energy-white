import { Building2, CircuitBoard, Globe, Handshake, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading } from "@/components/ui";

/**
 * PrinciplesAuthority — "03. Market Position." The same five facts the
 * homepage's own Authority section states (`sections/authority/index.tsx`)
 * — including that section's own flag that "100+ Corporate & Fleet Clients"
 * is a professional placeholder pending the client's confirmed final copy,
 * which still applies here since it's the same unconfirmed number, just
 * reused rather than re-invented. Styled as large stat tiles (the CATL
 * reference document's own format for this kind of claim) rather than
 * Authority's icon-badge row, so the two don't look identical.
 */
const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  {
    icon: Layers,
    value: "EV Battery Solutions",
    label: "Supply · Engineering · Support",
  },
  {
    icon: CircuitBoard,
    value: "Component Expertise",
    label: "Advanced Diagnostics & Repair",
  },
  {
    icon: Handshake,
    value: "2 Of Top 3",
    label: "Direct Agent Of The Top 2 EV / Hybrid Battery",
  },
  {
    icon: Building2,
    value: "100+",
    label: "Corporate & Fleet Clients",
  },
  {
    icon: Globe,
    value: "Global",
    label: "Service & Support Network",
  },
];

export function PrinciplesAuthority() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <RevealWrapper variant="fade">
            <div className="flex items-center gap-3">
              <span className="font-display text-ion/25 text-4xl font-bold lg:text-5xl">
                03
              </span>
              <span className="text-ion text-label-sm font-mono">Market Position</span>
            </div>
          </RevealWrapper>
          <RevealWrapper variant="blur" delay={0.1} duration={1}>
            <Heading as="h2" size="h2" className="max-w-2xl uppercase">
              Authority, Confirmed Not Claimed
            </Heading>
          </RevealWrapper>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {STATS.map((stat, index) => (
            <RevealWrapper key={stat.label} variant="blur" delay={index * 0.08} duration={0.7}>
              <div className="border-border bg-graphite/60 hover:border-ion/50 ease-engineered flex h-full flex-col gap-3 rounded-md border p-5 transition-colors duration-300 lg:p-6">
                <stat.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                <span className="font-display text-foreground text-xl leading-tight font-bold lg:text-2xl">
                  {stat.value}
                </span>
                <span className="text-label-sm font-mono">{stat.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
