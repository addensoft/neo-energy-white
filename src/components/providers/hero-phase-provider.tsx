"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * HeroPhaseProvider — the one piece of cross-component state the Hero film
 * needs to share: whether Chapter 0's copy sequence has finished.
 *
 * Creative Direction §5: the nav stays fully hidden while the homepage's
 * title card plays and only fades in once it clears. Hero calls
 * `setPhase("settled")` from its own timeline; Navbar reads `phase` to
 * decide whether to render at all.
 *
 * Only the homepage ever mounts a `<Hero>`, so only "/" should start on
 * "film" — any other route (e.g. `/contact`) has no component that will ever
 * call `setPhase("settled")`, and defaulting to "film" everywhere would leave
 * the navbar permanently hidden on every page but the homepage.
 */
type HeroPhase = "film" | "settled";

type HeroPhaseContextValue = {
  phase: HeroPhase;
  setPhase: (phase: HeroPhase) => void;
};

const HeroPhaseContext = createContext<HeroPhaseContextValue | null>(null);

export function HeroPhaseProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<HeroPhase>(pathname === "/" ? "film" : "settled");
  const value = useMemo(() => ({ phase, setPhase }), [phase]);

  return <HeroPhaseContext.Provider value={value}>{children}</HeroPhaseContext.Provider>;
}

export function useHeroPhase(): HeroPhaseContextValue {
  const ctx = useContext(HeroPhaseContext);
  if (!ctx) {
    throw new Error("useHeroPhase must be used within HeroPhaseProvider");
  }
  return ctx;
}
