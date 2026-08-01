import type { ReactNode } from "react";

import { VideoWrapper } from "@/components/media";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * PageBanner — the shared shell behind every inner page's cinematic banner
 * (Contact, About, and any page after them). Not a second Chapter 0: no
 * title card, no scroll-gated timeline, no scroll-scrub — just the site's
 * own footage looping behind copy that's on-screen from first paint, so
 * every inner page reads as a continuation of the same film rather than a
 * plain content page bolted onto it.
 *
 * `VideoWrapper` (not a raw `<video>`) is what gives this `prefers-reduced-
 * motion` support for free — it falls back to the poster frame instead of
 * playing, the same guarantee every homepage chapter's video already gets.
 *
 * Copy is passed as `children` rather than fixed props: each page keeps its
 * own eyebrow/heading/subline and its own `RevealWrapper` timing, only the
 * footage/grade/layout shell is shared.
 */
type PageBannerProps = {
  videoSrc: string;
  poster: string;
  alt: string;
  children: ReactNode;
  className?: string;
};

export function PageBanner({ videoSrc, poster, alt, children, className }: PageBannerProps) {
  return (
    <section
      className={cn(
        "bg-foreground relative flex min-h-[52vh] w-full items-center justify-center overflow-hidden lg:min-h-[60vh]",
        className,
      )}
    >
      <VideoWrapper src={videoSrc} poster={poster} alt={alt} className="absolute inset-0" />

      {/* Even top-to-bottom, not bottom-weighted like the homepage Hero's own
          grade: that version's copy always lands in the bottom third, but
          these banners center their content vertically, so the whole frame
          needs to hold contrast, not just the bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70"
      />

      <Container className="relative z-10 flex flex-col items-center gap-5 py-28 text-center lg:py-36">
        {children}
      </Container>
    </section>
  );
}
