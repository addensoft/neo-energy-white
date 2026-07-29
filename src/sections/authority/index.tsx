"use client";

import { Building2, CircuitBoard, Globe, Handshake, Layers } from "lucide-react";
import { Fragment, useRef } from "react";

import { Section } from "@/components/section";
import { Container } from "@/components/ui";

import { StatItem } from "./stat-item";
import { useAuthorityReveal } from "./use-authority-reveal";

// `value`/`decimals`/`suffix` drive a count-up for genuine numbers; company-
// achievement items with no number to count take `staticValue` instead.
//
// Business-positioning correction (client feedback): the first two items used
// to be battery *specifications* (77.9 kWh / 15 min fast charge), which don't
// belong in a company statistics bar. Replaced with company-level positioning
// statements. Wording here is a professional placeholder pending the client's
// confirmed final copy — do not treat as final claims.
// `underlineWidth` — the decorative underline scales with each title's own
// visual weight instead of using one fixed width for all five.
const STATS = [
  {
    icon: Layers,
    value: null,
    staticValue: "EV Battery Solutions",
    label: "Supply · Engineering · Support",
    underlineWidth: 56,
  },
  {
    icon: CircuitBoard,
    value: null,
    staticValue: "Component Expertise",
    label: "Advanced Diagnostics & Repair",
    underlineWidth: 52,
  },
  {
    icon: Handshake,
    value: 2,
    decimals: 0,
    suffix: " of Top 3",
    label: "Direct Agent of the Top 2 EV / Hybrid Battery",
    underlineWidth: 36,
  },
  {
    icon: Building2,
    value: 100,
    decimals: 0,
    suffix: "+",
    label: "Corporate & Fleet Clients",
    underlineWidth: 24,
  },
  {
    icon: Globe,
    value: null,
    staticValue: "Global",
    label: "Service & Support Network",
    underlineWidth: 28,
  },
] as const;

/** A hairline that fades at both ends — an "elegant divider," not a hard
 * rule. Desktop only; the mobile layout stacks columns and separates them
 * with a plain horizontal line instead. */
function ColumnDivider() {
  return (
    <div aria-hidden="true" className="relative hidden w-px shrink-0 self-stretch lg:block">
      <div className="via-border absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent to-transparent" />
    </div>
  );
}

/**
 * Authority — "Company Highlights," a premium trust panel (not a KPI
 * dashboard) sitting immediately below Why Choose NEO ENERGY. One centered
 * white card with a soft shadow and subtle border, per client design review —
 * replaced the earlier full-width statistics bar treatment, which read as too
 * "dashboard" for the rest of the site's cinematic feel. Content is unchanged
 * from the approved five items; only the container, icon treatment, dividers,
 * and reveal sequencing are new.
 */
export function Authority() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const underlinesRef = useRef<HTMLSpanElement[]>([]);
  const valueRefs = useRef<HTMLSpanElement[]>([]);

  useAuthorityReveal({
    sectionRef,
    containerRef,
    statsRef,
    iconsRef,
    underlinesRef,
    valueRefs,
    statConfigs: STATS,
  });

  return (
    <Section
      id="authority"
      ref={sectionRef}
      className="bg-void relative min-h-0 justify-center py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute inset-x-0 bottom-0 h-32 blur-[80px]"
      />

      <Container className="relative z-10">
        <div
          ref={containerRef}
          className="border-border bg-background rounded-[22px] border px-6 py-10 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.14)] lg:px-10 lg:py-12"
        >
          {/* Mobile: a 2-column grid (row 1: solutions/expertise, row 2: the two
              numeric stats, row 3: "Global" spanning both columns, centered) —
              not five stacked cards. The last item's wrapper uses `lg:contents`
              so it's transparent to layout at desktop, where this reverts to
              the original flex-row with explicit fading dividers between items. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:flex lg:flex-row lg:items-stretch lg:gap-x-0 lg:gap-y-0">
            {STATS.map((stat, index) => {
              const isLast = index === STATS.length - 1;
              const item = (
                <StatItem
                  icon={stat.icon}
                  value={stat.value}
                  decimals={"decimals" in stat ? stat.decimals : undefined}
                  suffix={"suffix" in stat ? stat.suffix : undefined}
                  staticValue={"staticValue" in stat ? stat.staticValue : undefined}
                  label={stat.label}
                  underlineWidth={stat.underlineWidth}
                  innerRef={(el) => {
                    if (el) statsRef.current[index] = el;
                  }}
                  iconRef={(el) => {
                    if (el) iconsRef.current[index] = el;
                  }}
                  valueRef={(el) => {
                    if (el) valueRefs.current[index] = el;
                  }}
                  underlineRef={(el) => {
                    if (el) underlinesRef.current[index] = el;
                  }}
                />
              );

              return (
                <Fragment key={stat.label}>
                  {index > 0 && <ColumnDivider />}
                  {isLast ? (
                    <div className="col-span-2 lg:contents">{item}</div>
                  ) : (
                    item
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
