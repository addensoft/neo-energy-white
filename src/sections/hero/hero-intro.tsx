"use client";

import { useEffect, useRef } from "react";

import { Heading, Paragraph } from "@/components/ui";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

/**
 * HeroIntro — a brief premium title card ("WELCOME TO / NEO ENERGY /
 * Engineering the Future of EV Battery Technology.") that plays once the
 * film's frames are loaded, before the user has necessarily started
 * scrolling: fade in, hold, fade out — a keynote-style opening beat, not
 * part of the scroll-scrubbed timeline. Purely decorative/ephemeral
 * (`pointer-events-none`, `aria-hidden`) — it never blocks scrolling, and
 * the real accessible headline/subline/name already exist in `HeroCopy`.
 */
export function HeroIntro({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!ready || !el) return;

    if (prefersReducedMotion) {
      gsap.set(el, { autoAlpha: 0 });
      return;
    }

    gsap.set(el, { autoAlpha: 0, y: 18 });

    const tl = gsap.timeline();
    tl.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE_ENGINEERED_CSS })
      .to(el, { autoAlpha: 1, duration: 2.4 })
      .to(el, { autoAlpha: 0, y: -18, duration: 0.9, ease: "power2.in" });

    return () => {
      tl.kill();
    };
  }, [ready, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0"
    >
      {/* Soft ambient glow behind the title card — same restrained blue-white
          "engineered" glow language used site-wide, not a heavy effect. */}
      <div
        aria-hidden="true"
        className="bg-ion/20 absolute h-[26rem] w-[26rem] rounded-full blur-[130px]"
      />

      <div className="px-gutter relative flex flex-col items-center gap-5 text-center">
        <span className="font-mono text-[0.75rem] font-semibold tracking-[0.4em] text-white/70 uppercase">
          Welcome To
        </span>

        <Heading as="p" size="hero" className="text-white uppercase">
          NEO ENERGY
        </Heading>

        <Paragraph size="lead" className="max-w-lg text-balance text-white/80">
          Engineering the Future of EV Battery Technology.
        </Paragraph>
      </div>
    </div>
  );
}
