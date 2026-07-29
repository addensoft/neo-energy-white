"use client";

import { cn } from "@/lib/utils";

/**
 * A partner logo, rendered as a CSS mask over a solid colour rather than as
 * an <img>. The official files (public/logos/, sourced from Wikimedia
 * Commons' brand-logo library) each carry their own brand colour — CATL
 * navy, BYD red, Mazda black — and masking normalises all of them to one
 * muted monochrome ink, which is what keeps the strip reading as a single
 * premium showcase instead of a patchwork of brand palettes. It also makes
 * the hover state trivial: the mask's background-color simply transitions
 * to Ion Blue.
 *
 * `aspect` (the file's own width/height) plus a per-logo height class is
 * what implements "consistent visual height, optical alignment, no equal-
 * width stretching": every logo derives its width from its true aspect
 * ratio, and emblem-bearing marks (NIO, Mazda) get a taller height than
 * plain wordmarks so their type sits at a comparable optical size.
 */
type PartnerMarkProps = {
  name: string;
  src: string;
  /** Intrinsic width ÷ height of the logo file. */
  aspect: number;
  /** Height classes (mobile + lg) tuned per logo for optical balance. */
  sizeClassName: string;
  suffix?: string;
  innerRef: (el: HTMLDivElement | null) => void;
};

export function PartnerMark({
  name,
  src,
  aspect,
  sizeClassName,
  suffix,
  innerRef,
}: PartnerMarkProps) {
  return (
    // Entrance opacity/transform lives on this outer node (GSAP-controlled,
    // left alone after the reveal); hover dimming lives on the inner node's
    // own CSS opacity so GSAP's leftover inline style never overrides it —
    // the two opacities compose (1 × 0.6 = 0.6 at rest, 1 × 1 = 1 on hover).
    <div ref={innerRef} className="shrink-0">
      <div className="ease-engineered group relative flex cursor-pointer items-center gap-2 pb-2 opacity-60 transition-[opacity,filter] duration-300 hover:opacity-100 hover:drop-shadow-[0_0_14px_rgba(46,143,255,0.4)]">
        <span
          role="img"
          aria-label={name}
          className={cn(
            "bg-foreground ease-engineered block transition-colors duration-300 group-hover:bg-ion",
            sizeClassName,
          )}
          style={{
            aspectRatio: String(aspect),
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
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
