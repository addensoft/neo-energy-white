"use client";

import { useRef } from "react";

import { VideoWrapper } from "@/components/media";
import { Section } from "@/components/section";
import { Button, Container, Heading } from "@/components/ui";

import { AdvantageItem } from "./advantage-item";
import { useFlagshipBatteryReveal } from "./use-flagship-battery-reveal";

// Client-approved copy, per the attached reference — same wording Why Choose
// Us uses, duplicated locally since the two sections are decoupled on
// purpose (Why Choose Us is due for its own redesign later).
const ADVANTAGES = [
  "Singapore's authorised EV battery engineering specialist",
  "Component-level battery diagnostics and repair",
  "Partnerships with leading global battery manufacturers",
  "Advanced battery testing and thermal management",
  "Safety-first engineering and certified repair standards",
  "Trusted by fleets, dealerships and enterprise customers",
] as const;

/**
 * Flagship Battery Overview — the next scene after the Trust & Technology Bar,
 * before Component-Level Repair. Right side now carries the "Why Choose NEO
 * ENERGY" checklist (per the approved reference) instead of the earlier spec
 * sheet — the standalone Why Choose Us section further down the page is
 * untouched and will get its own redesign separately. Reuses the same
 * `VideoWrapper` scaffold as before — an ambient autoplay/muted/loop video,
 * not a scroll-scrubbed frame sequence like Hero.
 */
export function FlagshipBattery() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoParallaxRef = useRef<HTMLDivElement>(null);
  const videoRevealRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useFlagshipBatteryReveal({
    sectionRef,
    videoParallaxRef,
    videoRevealRef,
    headlineRef,
    itemsRef,
    ctaRef,
  });

  return (
    <Section id="flagship-battery" ref={sectionRef} className="bg-void py-24 lg:py-32">
      {/* Ambient blue lighting */}
      <div
        aria-hidden="true"
        className="bg-ion/15 pointer-events-none absolute top-1/2 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20">
        {/* Left — flagship battery video. Fixed aspect on mobile (its own
            row, sized to content); on desktop, starts flush with the
            heading's top edge and runs to 105% of the checklist column's
            height — a deliberate slight overhang past the button, not a
            plain equal-height match. `object-cover` inside `VideoWrapper`
            means the extra height just crops the footage differently, no
            stretching/distortion. */}
        <div ref={videoParallaxRef} className="relative lg:h-full">
          <div
            ref={videoRevealRef}
            className="relative aspect-video overflow-hidden rounded-lg shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)] lg:aspect-auto lg:h-[105%]"
          >
            <VideoWrapper
              src="/videos/flagship-battery.mp4"
              poster="/videos/flagship-battery-poster.webp"
              alt="NEO ENERGY's flagship 77.94kWh EV battery pack"
              className="rounded-lg"
              mediaClassName="contrast-110 saturate-95"
            />
            {/* Very light edge polish, not a correction — the footage's own
                studio backdrop is already near-black throughout. Kept subtle
                on purpose so it reads as studio-grade grounding, not a visible
                vignette effect layered on top. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 78% 78% at 50% 52%, transparent 55%, rgba(0,0,0,0.16) 85%, rgba(0,0,0,0.3) 100%)",
              }}
            />
          </div>
        </div>

        {/* Right — Why Choose NEO ENERGY heading, checklist, CTA */}
        <div className="flex flex-col gap-8">
          <div ref={headlineRef}>
            <Heading as="h2" size="h2" className="uppercase">
              Why Choose NEO ENERGY?
            </Heading>
          </div>

          <ul className="flex flex-col gap-4">
            {ADVANTAGES.map((text, index) => (
              <AdvantageItem
                key={text}
                text={text}
                innerRef={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
              />
            ))}
          </ul>

          <div ref={ctaRef}>
            <Button href="#cta" variant="primary">
              Learn More About NEO ENERGY
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
