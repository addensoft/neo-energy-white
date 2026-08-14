import { CalendarClock, FileClock, Percent, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container, Heading, Paragraph } from "@/components/ui";

/**
 * AppShowcase — the four real features TEAM AUTOPRO's own app markets
 * (NEO Energy's parent business, client-confirmed) — transcribed verbatim
 * from the numbered callouts on their real app-store screenshot, since
 * that graphic is the only place this copy exists (no separate page text
 * states them). Per direct instruction: same app content, nothing added —
 * titles only, no invented supporting description under each one.
 *
 * The screenshot itself (`app-screenshot.webp`, downloaded from their
 * page) replaces the old hand-built CSS phone mockup — that mockup existed
 * specifically because no real screenshot existed yet; now one does.
 */
const FEATURES: { icon: LucideIcon; title: string }[] = [
  { icon: CalendarClock, title: "Book Your Car Appointment" },
  { icon: Percent, title: "Major Car Discount Deals" },
  { icon: ShieldCheck, title: "10 Year Warranty Package" },
  { icon: FileClock, title: "Keep Track Of Your Road Tax Expiration" },
];

const CALLOUT_OFFSETS = [14, 38, 60, 84] as const;

export function AppShowcase() {
  return (
    <section className="bg-void relative py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <RevealWrapper variant="blur" duration={0.9}>
          <div className="relative mx-auto w-fit">
            <div className="relative aspect-[9/19.5] w-[240px] overflow-hidden rounded-[2.75rem] shadow-[0_30px_70px_-20px_rgba(15,23,42,0.45)] lg:w-[260px]">
              <Image
                src="/images/app/app-screenshot.webp"
                alt="The NEO ENERGY app — booking, discounts, warranty tracking, and road tax reminders"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>

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
                  <span aria-hidden="true" className="border-ion/50 w-8 border-t border-dashed" />
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

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <RevealWrapper variant="fade">
              <span className="text-ion text-label-sm font-mono">What It Does</span>
            </RevealWrapper>
            <RevealWrapper variant="blur" delay={0.1} duration={1}>
              <Heading as="h2" size="h2" className="uppercase">
                One App. Every Interaction.
              </Heading>
            </RevealWrapper>
            <RevealWrapper variant="fade" delay={0.2}>
              <Paragraph size="body" className="max-w-xl text-balance">
                Everything below is live in the app today.
              </Paragraph>
            </RevealWrapper>
          </div>

          <ul className="flex flex-col gap-5 xl:hidden">
            {FEATURES.map((feature, index) => (
              <RevealWrapper key={feature.title} variant="fade" delay={0.3 + index * 0.08}>
                <li className="flex items-center gap-4">
                  <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
                    <feature.icon className="text-ion h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-h4 text-foreground">{feature.title}</span>
                </li>
              </RevealWrapper>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
