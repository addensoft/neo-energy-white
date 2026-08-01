"use client";

import { useEffect, useState } from "react";

/**
 * PromoCountdown — a live countdown to a fixed expiry instant
 * (`PROMO_END_ISO` in `promo-offer.tsx`), not a "days from page load" timer.
 * The latter would silently reset for every visitor on every visit and
 * never actually expire — dishonest for something claiming to be
 * time-limited. This counts down to one real, shared deadline for everyone.
 *
 * Client-rendered on purpose: the deadline is fixed, but "how long is left"
 * depends on the visitor's own clock at the moment they load the page, which
 * a server render can't know. Starts from `null` (renders nothing extra
 * until mounted) to avoid a server/client markup mismatch on first paint.
 */
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetMs: number): TimeLeft | null {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export function PromoCountdown({ targetIso }: { targetIso: string }) {
  const targetMs = new Date(targetIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetMs));

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetMs));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetMs]);

  if (!mounted) return null;

  if (!timeLeft) {
    return (
      <span className="font-mono text-sm font-semibold tracking-[0.08em] text-white/70 uppercase">
        This offer has ended
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3" role="timer" aria-live="polite">
      {UNITS.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center gap-1">
          <span className="border-white/20 bg-white/10 flex h-12 w-12 items-center justify-center rounded-md border font-mono text-lg font-bold text-white backdrop-blur-sm sm:h-14 sm:w-14 sm:text-xl">
            {String(timeLeft[unit.key]).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] text-white/60 uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
