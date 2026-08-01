"use client";

import { Pause, Play } from "lucide-react";

/**
 * HeroPlayButton — bottom-left glassmorphism control that plays and pauses
 * the Hero film (see `use-hero-video.ts`).
 *
 * Always rendered, unlike the scroll-driven version it replaces. The film
 * auto-plays and loops forever, so WCAG 2.2.2 requires a way to stop it; it's
 * also the recovery path when a browser refuses auto-play, and the way in
 * under `prefers-reduced-motion`, where the film waits on its poster frame.
 */
type HeroPlayButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function HeroPlayButton({ isPlaying, onToggle }: HeroPlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause the hero film" : "Play the hero film"}
      className="ease-engineered border-white/25 bg-white/10 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md absolute bottom-8 left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:left-10"
    >
      {isPlaying ? (
        <Pause className="h-4 w-4" strokeWidth={1.5} fill="currentColor" />
      ) : (
        <Play className="ml-0.5 h-4 w-4" strokeWidth={1.5} fill="currentColor" />
      )}
    </button>
  );
}
