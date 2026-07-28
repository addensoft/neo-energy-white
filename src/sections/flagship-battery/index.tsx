"use client";

import {
  BatteryCharging,
  BatteryFull,
  Droplets,
  LayoutGrid,
  Timer,
  TrendingUp,
  Weight,
  Zap,
} from "lucide-react";
import { useRef } from "react";

import { VideoWrapper } from "@/components/media";
import { Section } from "@/components/section";
import { Button, Container, Heading, Paragraph } from "@/components/ui";

import { SpecItem } from "./spec-item";
import { useFlagshipBatteryReveal } from "./use-flagship-battery-reveal";

const SPECS = [
  { icon: BatteryFull, value: "77.94 kWh", label: "Total Energy" },
  { icon: BatteryCharging, value: "214 Ah", label: "Rated Capacity" },
  { icon: Zap, value: "364.24 V", label: "Nominal Voltage" },
  { icon: Weight, value: "≤ 550 kg", label: "Total Weight" },
  { icon: TrendingUp, value: "140+ Wh/kg", label: "Energy Density" },
  { icon: Timer, value: "15 min", label: "Fast Charge (30–80%)" },
  { icon: Droplets, value: "Liquid", label: "Cooling System" },
  { icon: LayoutGrid, value: "1P116S", label: "Configuration" },
] as const;

/**
 * Flagship Battery Overview — the next scene after the Trust & Technology Bar,
 * before The Object. Business-positioning correction (client feedback): NEO
 * ENERGY sells, engineers, and supports EV battery systems — this pack is one
 * example of that, not the sole product. Copy must not read as if this single
 * unit is the entirety of what NEO ENERGY offers. Reuses the `VideoWrapper`
 * scaffold built (and unused) since Sprint 1 — an ambient autoplay/muted/loop
 * video, not a scroll-scrubbed frame sequence like Hero.
 */
export function FlagshipBattery() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoParallaxRef = useRef<HTMLDivElement>(null);
  const videoRevealRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement[]>([]);

  useFlagshipBatteryReveal({
    sectionRef,
    videoParallaxRef,
    videoRevealRef,
    headlineRef,
    descriptionRef,
    specsRef,
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
        {/* Left — flagship battery video. Fixed aspect on mobile (its own row,
            sized to content); stretches to match the content column's full
            height on desktop so it reads as one cinematic panel rather than a
            small box floating in dead space. */}
        <div ref={videoParallaxRef} className="relative lg:h-full">
          <div
            ref={videoRevealRef}
            className="relative aspect-video min-h-[22rem] overflow-hidden rounded-lg shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)] lg:aspect-auto lg:h-full lg:min-h-0"
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

        {/* Right — headline, spec grid, CTA */}
        <div className="flex flex-col gap-10">
          <div ref={headlineRef} className="flex flex-col gap-5">
            <span className="text-ion text-spec-value font-display">77.94 kWh</span>
            <Heading as="h2" size="h2" className="uppercase">
              Advanced EV
              <br />
              Battery Solutions
            </Heading>
          </div>

          <div ref={descriptionRef}>
            <Paragraph size="body" className="max-w-xl">
              NEO ENERGY supplies, engineers, and supports advanced EV battery systems
              for fleets, dealerships, and manufacturers — from cell chemistry to
              enclosure, validated through CFD thermal simulation and CAE vibration
              testing. Shown here: our 77.94kWh flagship LFP pack, one example of the
              battery solutions we deliver.
            </Paragraph>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {SPECS.map((spec, index) => (
              <SpecItem
                key={spec.label}
                icon={spec.icon}
                value={spec.value}
                label={spec.label}
                innerRef={(el) => {
                  if (el) specsRef.current[index] = el;
                }}
              />
            ))}
          </div>

          <div ref={ctaRef}>
            <Button href="#repair" variant="primary">
              Explore Battery Solutions
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
