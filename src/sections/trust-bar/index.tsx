"use client";

import { ShieldCheck } from "lucide-react";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Container } from "@/components/ui";

import { PartnerMark } from "./partner-mark";
import { useTrustBarReveal } from "./use-trust-bar-reveal";

// Official brand assets (public/logos/, via Wikimedia Commons' brand-logo
// library — CALB only exists there as a transparent PNG; the rest are SVG).
// `aspect` is each file's intrinsic width/height; heights are tuned per logo
// for optical balance: plain wordmarks share one cap height, while NIO
// (emblem stacked above the word) and Mazda (winged emblem beside it) run
// taller so their type reads at a comparable size. See partner-mark.tsx for
// why widths must never be equalised.
const PARTNERS = [
  {
    name: "CATL",
    src: "/logos/catl.svg",
    aspect: 1024 / 216,
    sizeClassName: "h-[22px] lg:h-[26px]",
  },
  {
    name: "CALB",
    src: "/logos/calb.png",
    aspect: 1660 / 300,
    sizeClassName: "h-[22px] lg:h-[26px]",
  },
  {
    name: "BYD",
    src: "/logos/byd.svg",
    aspect: 1920 / 480,
    sizeClassName: "h-[20px] lg:h-[24px]",
  },
  {
    name: "NIO",
    src: "/logos/nio.svg",
    aspect: 2500 / 931,
    sizeClassName: "h-[34px] lg:h-[40px]",
  },
  {
    name: "Mazda",
    src: "/logos/mazda.svg",
    aspect: 2489.78 / 601.44,
    sizeClassName: "h-[26px] lg:h-[30px]",
    suffix: "(TBC)",
  },
] as const;

/**
 * Trust & Technology Bar — sits directly beneath the (frozen) Hero, ahead of
 * Chapter 1. A slim credibility strip, not a full-viewport chapter: overrides
 * `Section`'s default `min-h-screen` down to a compact bar. Partner marks are
 * the manufacturers' official logos, mask-rendered to a single muted ink
 * (see partner-mark.tsx).
 */
export function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const shieldGroupRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const trustGroupRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useTrustBarReveal({ sectionRef, shieldGroupRef, sweepRef, logosRef, trustGroupRef, glowRef });

  return (
    <Section
      id="trust-bar"
      ref={sectionRef}
      className="bg-void/95 relative min-h-0 justify-center overflow-hidden py-10 backdrop-blur-md lg:py-14"
    >
      {/* Seams — a fading line, not a hard edge, so the scene above (Hero)
          and below (Flagship Battery) bleed into this one rather than cutting. */}
      <div
        aria-hidden="true"
        className="via-border pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="via-border pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      {/* Atmospheric wash — a faint top-down ion tint, so the bar reads as a
          lit scene rather than a flat white strip. */}
      <div
        aria-hidden="true"
        className="from-ion/[0.06] pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
      />
      {/* Ambient blue lighting — breathes slowly once the entrance completes (see reveal hook) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="bg-ion/25 pointer-events-none absolute top-1/2 left-1/2 h-44 w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
      />
      {/* Entrance light sweep — normal blend, not screen: screen mode needs a
          dark backdrop to show a lightening streak, which a light-theme bar
          doesn't have. A translucent ion-blue streak reads as a soft tint instead. */}
      <div
        ref={sweepRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(75deg, transparent 42%, rgba(46,143,255,0.35) 50%, transparent 58%)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
        {/* Left — "We Are Authorized By", introducing the partner marks */}
        <div
          ref={shieldGroupRef}
          className="lg:border-border flex shrink-0 items-center gap-3.5 lg:border-r lg:pr-8"
        >
          <div className="ring-ion/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 ring-1">
            <ShieldCheck className="text-ion h-5 w-5" strokeWidth={1.5} />
          </div>
          <span className="text-label-sm font-display text-foreground block leading-tight">
            We Are
            <br />
            Authorized By
          </span>
        </div>

        {/* Center — partner marks, horizontally swipeable on mobile */}
        <div
          className="flex w-full items-center gap-x-12 overflow-x-auto px-1 py-1 [-webkit-overflow-scrolling:touch] lg:justify-between lg:gap-x-10 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PARTNERS.map((partner, index) => (
            <PartnerMark
              key={partner.name}
              name={partner.name}
              src={partner.src}
              aspect={partner.aspect}
              sizeClassName={partner.sizeClassName}
              suffix={"suffix" in partner ? partner.suffix : undefined}
              innerRef={(el) => {
                if (el) logosRef.current[index] = el;
              }}
            />
          ))}
        </div>

        {/* Right — Direct Agent */}
        <div
          ref={trustGroupRef}
          className="lg:border-border flex shrink-0 flex-col items-center gap-0.5 text-center lg:items-end lg:border-l lg:pl-8 lg:text-right"
        >
          <span className="text-label-sm font-display text-foreground block">
            Direct Agent
          </span>
          <span className="text-label-sm block font-mono leading-tight">
            of the Top <span className="text-ion text-base font-bold">2</span>
            <br />
            EV / Hybrid Battery
          </span>
        </div>
      </Container>
    </Section>
  );
}
