"use client";

import { motion } from "framer-motion";

import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";

/**
 * HeroScrollHint — "Scroll Down To Discover More" + an animated scroll-mouse
 * glyph, bottom-center. Appears as soon as the title card clears and stays:
 * the film loops forever now, so there's no end-of-film moment to wait for
 * before inviting the visitor onward.
 *
 * It absorbed the job of the old `ScrollCue` chevron (removed with the
 * scroll-scrub build) — one scroll invitation, not two, and this is the
 * explicit one.
 */
export function HeroScrollHint({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_ENGINEERED }}
      className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span className="font-mono text-[0.7rem] font-medium tracking-[0.24em] text-white/70 uppercase">
        Scroll Down To Discover More
      </span>

      <motion.svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        animate={visible ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
        transition={{ duration: 2.2, repeat: visible ? Infinity : 0, ease: "easeInOut" }}
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="30"
          rx="9"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="10"
          r="1.75"
          fill="rgba(255,255,255,0.9)"
          animate={visible ? { cy: [8, 16, 8], opacity: [1, 0, 1] } : { cy: 8, opacity: 1 }}
          transition={{ duration: 2.2, repeat: visible ? Infinity : 0, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}
