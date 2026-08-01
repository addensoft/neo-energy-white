import { CalendarClock, Gauge, History, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

import { AppPhoneMockup } from "./app-phone-mockup";

/**
 * AppShowcase — what the app will let you do, tied to services the site
 * already confirms are real (assessments, diagnostics, direct engineer
 * contact — see Repair/Contact) rather than invented capabilities. Framed
 * as "you'll be able to," not present-tense claims, since nothing here has
 * shipped yet.
 *
 * The phone mockup (`AppPhoneMockup`) is illustrative concept art, not a
 * real screenshot — see that component's own comment. These same four
 * features drive both the floating numbered callouts beside it (`xl:` and
 * up, where there's enough column width for them not to crowd the copy
 * beside it) and the plain list underneath (everything narrower than that),
 * so no content is lost at any breakpoint — only its presentation changes.
 */
const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CalendarClock,
    title: "Book A Battery Assessment",
    description: "Schedule a diagnostic or repair slot without a phone call.",
  },
  {
    icon: History,
    title: "Track Service History",
    description: "Every diagnostic and repair for your vehicle or fleet, in one place.",
  },
  {
    icon: MessageCircle,
    title: "Message Your Engineer Directly",
    description: "No call centre, no ticket queue — the same team handling your battery.",
  },
  {
    icon: Gauge,
    title: "Real-Time Status Updates",
    description: "Know exactly where your assessment or repair stands, as it happens.",
  },
];

/** Vertical position (percentage of phone height) each callout points at. */
const CALLOUT_OFFSETS = [14, 38, 60, 84] as const;

export function AppShowcase() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Phone mockup + floating feature callouts */}
        <RevealWrapper variant="blur" duration={0.9}>
          <div className="relative mx-auto w-fit">
            <AppPhoneMockup />

            {/* Numbered callouts, each naming one real feature (same copy as
                the plain list below) — visible once the column is wide
                enough that they read as an annotation, not clutter. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden xl:block"
            >
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="absolute left-full flex items-center"
                  style={{ top: `${CALLOUT_OFFSETS[index]}%` }}
                >
                  <span
                    aria-hidden="true"
                    className="border-ion/50 w-8 border-t border-dashed"
                  />
                  <div className="border-border bg-background flex max-w-[170px] items-start gap-2 rounded-lg border px-3 py-2 shadow-[0_16px_36px_-18px_rgba(15,23,42,0.35)]">
                    <span className="bg-ion flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-foreground text-[0.72rem] leading-snug font-semibold">
                      {feature.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* Copy + feature list — the list is the accessible, always-present
            version of the callouts above; hidden at `xl:` and up only
            because the callouts are already saying the same thing there. */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">What&apos;s Coming</span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                One App. Every Battery Interaction.
              </Heading>
            </RevealWrapper>
            <RevealWrapper variant="fade" delay={0.2}>
              <Paragraph size="body" className="max-w-xl text-balance">
                Once it launches, here&apos;s what you&apos;ll be able to do
                straight from your phone.
              </Paragraph>
            </RevealWrapper>
          </div>

          <ul className="flex flex-col gap-5 xl:hidden">
            {FEATURES.map((feature, index) => (
              <RevealWrapper key={feature.title} variant="fade" delay={0.3 + index * 0.08}>
                <li className="flex items-start gap-4">
                  <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                    <feature.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-h4 text-foreground">
                      {feature.title}
                    </span>
                    <span className="font-body text-muted text-sm leading-relaxed">
                      {feature.description}
                    </span>
                  </div>
                </li>
              </RevealWrapper>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
