/**
 * hero-frames — metadata for the real Hero film, extracted to a WebP frame
 * sequence for scroll-scrubbing (Creative Direction §5/§9, Sprint 3 revision).
 *
 * Source: /new-hero-video.mp4 (1920×1080, H.264, 24fps, 15.04s, 361 frames).
 * Frames were extracted at 1600×900 and re-encoded as WebP (~17MB total for
 * the full sequence) — a canvas image sequence rather than `<video>.currentTime`
 * scrubbing, because native video seeking is throttled and keyframe-limited
 * and stutters under fast/reverse scroll; drawing a preloaded still frame to
 * canvas is instant and frame-accurate regardless of scroll speed or direction.
 */
export const HERO_FRAME_COUNT = 361;

export function heroFramePath(oneBasedIndex: number): string {
  const n = String(oneBasedIndex).padStart(4, "0");
  return `/hero-frames/frame-${n}.webp`;
}

/**
 * Where the headline/subline/signature land, as fractions of total scroll
 * progress (0–1). Carried over unchanged from the previous film — these are
 * proportional to total scroll distance, not raw frame indices, so they still
 * apply after swapping in a differently-paced source video.
 */
export const HERO_TEXT_TIMING = {
  scrimStart: 0.76,
  headlineStart: 0.76,
  sublineStart: 0.82,
  signatureStart: 0.9,
} as const;

/**
 * Scrolling value statements — one engineering credibility line at a time,
 * cycling across the "B-roll" portion of the scroll range, well before
 * `HERO_TEXT_TIMING.scrimStart` (0.76) so they never overlap the headline
 * reveal. Same six lines as Why Choose NEO ENERGY's checklist, reused here
 * as a premium keynote-style highlight reel.
 */
export const VALUE_STATEMENTS = [
  "Singapore's authorised EV battery engineering specialist",
  "Component-level battery diagnostics and repair",
  "Partnerships with leading global battery manufacturers",
  "Advanced battery testing and thermal management",
  "Safety-first engineering and certified repair standards",
  "Trusted by fleets, dealerships and enterprise customers",
] as const;

/** The statements cycle within this scroll-progress window — evenly split
 * into one slot per statement (fade in → hold → fade out, non-overlapping),
 * ending well before the headline reveal begins. */
export const VALUE_STATEMENT_RANGE = { start: 0.06, end: 0.7 } as const;
