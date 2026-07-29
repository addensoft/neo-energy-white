"use client";

import type { LucideIcon } from "lucide-react";

/**
 * One of the five feature columns — circular outlined icon badge (same
 * gradient/inset-highlight recipe Authority's `StatItem` uses, for a
 * consistent "premium engineered" icon language site-wide), short title,
 * two-line supporting description. Centered, not left-aligned, matching the
 * approved reference.
 */
type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="from-background to-graphite ring-border shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(10,14,20,0.04),0_0_18px_rgba(46,143,255,0.14)] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-b ring-1">
        <Icon className="text-ion h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-foreground font-display text-[0.95rem] font-semibold">
          {title}
        </span>
        <span className="text-body text-[0.8rem] text-balance">{description}</span>
      </div>
    </div>
  );
}
