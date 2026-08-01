"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * ComponentRain — thin blue streaks falling continuously over the
 * component-level image, echoing data/energy flowing down across the board
 * and the cell's glowing top face. Pure CSS (`@keyframes component-rain` in
 * globals.css), not GSAP/Framer — this is an ambient, infinite loop rather
 * than a triggered reveal, so it doesn't need either library's machinery,
 * just a looping animation with per-streak delay/duration for an organic
 * (not obviously synchronised) fall.
 *
 * `mix-blend-mode: screen` so the streaks brighten the image rather than
 * sitting on top of it as a visible dark rectangle — same reasoning the
 * site's other light-sweep effects use screen/normal blend deliberately
 * (see `button.tsx`).
 *
 * Decorative only (`aria-hidden`), and skipped entirely under
 * `prefers-reduced-motion` rather than paused — an infinite ambient
 * animation has no "settled" end state to freeze on.
 */
const STREAKS = [
  { left: "8%", height: "55%", duration: 3.2, delay: 0 },
  { left: "20%", height: "40%", duration: 2.6, delay: 0.8 },
  { left: "34%", height: "60%", duration: 3.8, delay: 0.3 },
  { left: "48%", height: "45%", duration: 2.9, delay: 1.4 },
  { left: "62%", height: "50%", duration: 3.4, delay: 0.6 },
  { left: "75%", height: "38%", duration: 2.7, delay: 1.8 },
  { left: "87%", height: "52%", duration: 3.6, delay: 1.1 },
] as const;

export function ComponentRain() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mix-blend-mode:screen]"
    >
      {STREAKS.map((streak, index) => (
        <span
          key={index}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-ion-light to-transparent"
          style={{
            left: streak.left,
            height: streak.height,
            animation: `component-rain ${streak.duration}s linear ${streak.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
