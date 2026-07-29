"use client";

import { cn } from "@/lib/utils";

/**
 * A partner wordmark. No official brand asset files exist in this project for
 * any of these manufacturers, so each is set in the site's own display type —
 * a typographic mark, not a fabricated or externally-sourced logo image. BYD
 * gets the roundel treatment its real logotype is known for; everything else
 * is a plain uppercase mark, matching how the reference layout treats CATL/
 * CALB/Mazda.
 */
type PartnerMarkProps = {
  name: string;
  suffix?: string;
  ringed?: boolean;
  innerRef: (el: HTMLDivElement | null) => void;
};

export function PartnerMark({ name, suffix, ringed, innerRef }: PartnerMarkProps) {
  return (
    // Entrance opacity/transform lives on this outer node (GSAP-controlled,
    // left alone after the reveal); hover dimming lives on the inner node's
    // own CSS opacity so GSAP's leftover inline style never overrides it —
    // the two opacities compose (1 × 0.6 = 0.6 at rest, 1 × 1 = 1 on hover).
    <div ref={innerRef} className="shrink-0">
      <div className="ease-engineered group relative flex cursor-pointer items-baseline gap-1.5 pb-2 opacity-60 transition-[opacity,filter] duration-300 hover:opacity-100 hover:drop-shadow-[0_0_14px_rgba(46,143,255,0.4)]">
        <span
          className={cn(
            "font-display text-foreground text-xl tracking-wide whitespace-nowrap lg:text-2xl",
            ringed && "border-foreground/70 rounded-full border px-3 py-0.5",
          )}
        >
          {name}
        </span>
        {suffix ? (
          <span className="text-muted font-mono text-[0.65rem] tracking-[0.08em] uppercase">
            {suffix}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="bg-ion ease-engineered absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        />
      </div>
    </div>
  );
}
