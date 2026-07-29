"use client";

import Image from "next/image";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

/**
 * VideoWrapper — Creative Direction §11 Video Placement.
 *
 * "Every video is silent/autoplay/looping, never a 'play button' experience on
 * the homepage — this is ambient cinematic texture, not content to be watched."
 *
 * Accessibility/performance strategy: honours `prefers-reduced-motion` by rendering
 * the static poster frame instead of a playing video, and never ships audio controls
 * since every homepage video is muted-by-design (decorative, not informational).
 *
 * No chapter wires an actual `src` into this yet — Sprint 1 ships the wrapper only.
 */
type VideoWrapperProps = WithClassName<{
  src?: string;
  poster: string;
  alt: string;
  /** Extra classes for the `<video>`/fallback `<Image>` itself — e.g. a subtle
   * `filter` grade. Kept separate from `className` (the outer wrapper) since
   * the two elements serve different layout roles. */
  mediaClassName?: string;
}>;

export function VideoWrapper({
  src,
  poster,
  alt,
  className,
  mediaClassName,
}: VideoWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const showVideo = Boolean(src) && !prefersReducedMotion;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {showVideo ? (
        <video
          className={cn("h-full w-full object-cover", mediaClassName)}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="100vw"
          className={cn("object-cover", mediaClassName)}
          priority={false}
        />
      )}
    </div>
  );
}
