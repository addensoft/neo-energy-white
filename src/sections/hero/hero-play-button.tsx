"use client";

import { Pause, Play } from "lucide-react";

/**
 * HeroPlayButton — bottom-left glassmorphism control that auto-advances the
 * film (see `use-hero-autoplay.ts` — it drives the same scroll position the
 * film already scrubs from, via Lenis, rather than a second animation
 * system) so a visitor who'd rather not scroll can just watch it play.
 */
type HeroPlayButtonProps = {
  visible: boolean;
  isPlaying: boolean;
  onToggle: () => void;
};

export function HeroPlayButton({ visible, isPlaying, onToggle }: HeroPlayButtonProps) {
  if (!visible) return null;

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
