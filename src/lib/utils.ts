import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge's built-in "text color" group matches any `text-*` class it
 * doesn't otherwise recognise as a font-size/leading utility — which swallows
 * this project's custom typography classes (globals.css `@layer components`,
 * e.g. `.text-h2`). Left unfixed, `cn("text-h2", "text-white")` silently
 * drops `text-h2` (they "conflict" as far as twMerge is concerned), so any
 * component overriding a heading/paragraph's color via `className` loses its
 * font-size/line-height for free — exactly what happened to CTA's headline.
 * Registering them as their own group keeps them independent of real
 * Tailwind color utilities passed alongside them.
 */
const twMerge = extendTailwindMerge<"neo-typography-scale">({
  extend: {
    classGroups: {
      "neo-typography-scale": [
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-body",
        "text-spec-label",
        "text-spec-value",
        "text-label-sm",
      ],
    },
  },
});

/**
 * Merges class names with Tailwind-aware de-duplication.
 * Standard shadcn/ui-style helper — used by every component that accepts `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
