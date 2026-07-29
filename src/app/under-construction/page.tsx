import type { Metadata } from "next";

import { UnderConstructionView } from "./under-construction-view";

/**
 * /under-construction — a standalone premium placeholder for routes that
 * aren't built yet. Independent of the homepage by design: it shares the
 * brand's design tokens and UI primitives, but none of its section
 * components or layout.
 *
 * `robots: noindex` so temporary placeholder routes never get indexed and
 * outrank (or dilute) the real pages once those ship.
 */
export const metadata: Metadata = {
  title: "Under Construction",
  description:
    "This page is under construction. Our engineering team is preparing this experience with the same precision that defines NEO ENERGY's advanced EV battery solutions.",
  robots: { index: false, follow: true },
};

export default function UnderConstructionPage() {
  // Its own `<main>` landmark — this route sits outside the `(main)` route
  // group, so it doesn't inherit that layout's wrapper (or its chrome).
  return (
    <main className="flex-1">
      <UnderConstructionView />
    </main>
  );
}
