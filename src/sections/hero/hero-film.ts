/**
 * hero-film — the Hero film's source and the timing of the copy that plays
 * over it (Creative Direction §5/§9).
 *
 * The film used to be a 361-frame WebP sequence drawn to a canvas and
 * scrubbed by scroll. Per direct instruction it is now a plain looping
 * background `<video>`: it auto-plays, loops forever, and the page scrolls
 * straight past it like any other section — no pinning, no scrubbing. The
 * copy beats below are therefore expressed in SECONDS on a self-running
 * timeline (see `use-hero-sequence.ts`), not as fractions of a scroll range.
 *
 * Source: /new-hero-video.mp4 (1920×1080, 24fps, 15.04s) → re-encoded to
 * /public/videos/hero.mp4 at 1600×900, CRF 26, +faststart (~6MB) for
 * streaming. Poster is the film's own first frame.
 */
export const HERO_VIDEO_SRC = "/videos/hero.mp4";
export const HERO_POSTER_SRC = "/videos/hero-poster.webp";

/**
 * Where the opening title card, the value statements, and the headline land,
 * in seconds from the start of the copy sequence.
 *
 * The sequence runs once and settles; the film underneath keeps looping. So
 * unlike the scroll-scrubbed version, no beat can rely on sitting over a
 * particular shot — every overlay carries its own legibility treatment
 * instead (see `hero-value-statements.tsx` and `hero-copy.tsx`).
 */
export const HERO_TIMING = {
  introIn: 0,
  introInDuration: 1.2,
  introOut: 3,
  introOutDuration: 0.8,
  /** First statement starts here; each takes `statementSlot` seconds. */
  statementsStart: 4,
  statementSlot: 2,
  /** Set once the title card has cleared — this is what un-hides the navbar. */
  settleNavAt: 3.9,
} as const;

/**
 * Scrolling value statements — one engineering credibility line at a time,
 * cycling over the film's B-roll before the headline lands. Same six lines as
 * Why Choose NEO ENERGY's checklist, reused here as a premium keynote-style
 * highlight reel.
 */
export const VALUE_STATEMENTS = [
  "Singapore's authorised EV battery engineering specialist",
  "Component-level battery diagnostics and repair",
  "Partnerships with leading global battery manufacturers",
  "Advanced battery testing and thermal management",
  "Safety-first engineering and certified repair standards",
  "Trusted by fleets, dealerships and enterprise customers",
] as const;

/** When the headline block takes over, in seconds — immediately after the
 * last statement clears. Derived so the two can never overlap. */
export const HEADLINE_START =
  HERO_TIMING.statementsStart + VALUE_STATEMENTS.length * HERO_TIMING.statementSlot;
