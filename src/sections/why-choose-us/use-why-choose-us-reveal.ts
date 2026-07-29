"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/gsap";
import { EASE_ENGINEERED_CSS } from "@/lib/motion-tokens";

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  /** The content block (eyebrow/heading/paragraph/features/button) — one
   * scroll-gated entrance (opacity/translateY/scale). No more "card" element
   * to animate — the content itself is the reveal target now. */
  contentRef: RefObject<HTMLDivElement | null>;
  /** The artwork/background layer. The battery itself never moves or
   * rotates — this only ever gets a very small (max ±10px) scroll-scrubbed
   * parallax, nothing else. */
  artworkRef: RefObject<HTMLDivElement | null>;
  /** Soft blue glow breathing behind the chip. */
  glowRef: RefObject<HTMLDivElement | null>;
  /** Small light pulses animated along branching PCB-trace-like paths. */
  pulseRefs: RefObject<HTMLDivElement[]>;
  /** Faint slow-drifting dust particles around the chip. */
  particleRefs: RefObject<HTMLDivElement[]>;
};

/** Two-leg offsets (px) per pulse — a short primary trace segment then a
 * further segment at a different angle, so each pulse reads as travelling
 * along a branching circuit path rather than a straight line. */
const PULSE_PATHS = [
  { leg1: { x: -22, y: -10 }, leg2: { x: -14, y: -20 } },
  { leg1: { x: -18, y: 14 }, leg2: { x: -26, y: 10 } },
  { leg1: { x: -16, y: -8 }, leg2: { x: -30, y: 4 } },
  { leg1: { x: -20, y: 12 }, leg2: { x: -12, y: 24 } },
] as const;

/**
 * Why Choose NEO ENERGY — no card, so the scroll-gated entrance now targets
 * the content block directly rather than a "card" element. The battery
 * itself is a stable, anchored product shot: it never moves, floats, or
 * rotates. What's alive is
 * the *engineering background* around it — soft blue energy pulses that
 * branch across the PCB traces every 2–4s, a very low-intensity breathing
 * glow (5–6s cycle) at the chip's own core, a few near-invisible drifting
 * dust particles for depth, and — on scroll only — an extremely subtle
 * (≤10px) parallax on the artwork layer as a whole. No spin, no bounce, no
 * neon; same restrained "engineered" language as every other reveal on the
 * page.
 */
export function useWhyChooseUsReveal({
  sectionRef,
  contentRef,
  artworkRef,
  glowRef,
  pulseRefs,
  particleRefs,
}: Refs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const idleTweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];

    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 32, scale: 0.97 });

      gsap.to(content, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: EASE_ENGINEERED_CSS,
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
        onComplete: () => {
          // Battery breathing glow — 5.5s full cycle, kept very low
          // intensity (0.2–0.4) so it never reads as flashy.
          if (glowRef.current) {
            gsap.set(glowRef.current, { opacity: 0.2 });
            idleTweens.push(
              gsap.to(glowRef.current, {
                opacity: 0.4,
                duration: 5.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              }),
            );
          }

          // Energy pulses — each fades in near the chip, travels a two-leg
          // branching path while a soft halo (layered box-shadow) fades
          // behind it, then waits a couple of seconds before repeating.
          // Staggered starts/delays so a new one begins every 2–4s.
          pulseRefs.current.forEach((dot, index) => {
            const path = PULSE_PATHS[index % PULSE_PATHS.length];
            gsap.set(dot, { x: 0, y: 0, opacity: 0 });

            const tl = gsap.timeline({
              repeat: -1,
              repeatDelay: 2 + index * 0.6,
              delay: index * 0.9,
            });
            tl.to(dot, { opacity: 1, duration: 0.35, ease: "power1.out" })
              .to(dot, { x: path.leg1.x, y: path.leg1.y, duration: 1.1, ease: "power1.inOut" }, "<")
              .to(dot, {
                x: path.leg1.x + path.leg2.x,
                y: path.leg1.y + path.leg2.y,
                opacity: 0,
                duration: 1.4,
                ease: "power1.in",
              });
            idleTweens.push(tl);
          });

          // Floating dust particles — slow, near-invisible drift.
          particleRefs.current.forEach((particle, index) => {
            idleTweens.push(
              gsap.to(particle, {
                x: index % 2 === 0 ? 10 : -10,
                y: -14,
                opacity: 0.5,
                duration: 16 + index * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              }),
            );
          });
        },
      });

      // Scroll-only parallax on the artwork/background layer — a small
      // ≤10px drift, never touching the battery's own visual stability
      // beyond this shared, very subtle motion.
      if (artworkRef.current) {
        gsap.fromTo(
          artworkRef.current,
          { y: -8 },
          {
            y: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }
    }, section);

    return () => {
      idleTweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);
}
