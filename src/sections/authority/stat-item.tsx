"use client";

import type { LucideIcon } from "lucide-react";

/**
 * `value`/`decimals`/`suffix` drive a GSAP count-up (see use-authority-reveal.ts)
 * for genuinely numeric stats; `staticValue` is the escape hatch for stats that
 * aren't numbers — they just fade in with everything else, no counting.
 */
type StatItemProps = {
  icon: LucideIcon;
  value: number | null;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  /** Underline width in px — scaled per title so five identical dashes don't
   * ignore how different each title's own visual weight is. */
  underlineWidth: number;
  innerRef: (el: HTMLDivElement | null) => void;
  iconRef: (el: HTMLDivElement | null) => void;
  valueRef: (el: HTMLSpanElement | null) => void;
  underlineRef: (el: HTMLSpanElement | null) => void;
};

export function StatItem({
  icon: Icon,
  value,
  decimals = 0,
  suffix = "",
  staticValue,
  label,
  underlineWidth,
  innerRef,
  iconRef,
  valueRef,
  underlineRef,
}: StatItemProps) {
  return (
    <div
      ref={innerRef}
      className="group flex flex-1 flex-col items-center gap-1.5 px-2 py-1 text-center lg:px-6 lg:py-2"
    >
      {/* Premium icon badge — soft gradient + inset highlight + resting ion
          glow, brightening further on hover. Kept deliberately understated. */}
      <div
        ref={iconRef}
        className="from-background to-graphite ring-border shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(10,14,20,0.04),0_0_18px_rgba(46,143,255,0.14)] ease-engineered flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-b ring-1 transition-shadow duration-300 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(10,14,20,0.04),0_0_28px_rgba(46,143,255,0.32)]"
      >
        <Icon className="text-ion h-6 w-6" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col items-center gap-2">
        {/* Real final value in markup (correct with no JS / reduced motion) —
            the reveal hook resets this to 0 itself right before counting up. */}
        <span ref={valueRef} className="text-spec-value font-display">
          {staticValue ?? `${(value ?? 0).toFixed(decimals)}${suffix}`}
        </span>

        <span
          ref={underlineRef}
          aria-hidden="true"
          style={{ width: `${underlineWidth}px` }}
          className="bg-ion ease-engineered h-0.5 origin-center scale-x-100 transition-transform duration-300 group-hover:scale-x-125"
        />

        <p className="text-label-sm font-body max-w-[14rem]">{label}</p>
      </div>
    </div>
  );
}
