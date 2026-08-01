/**
 * News & Insights — single source of truth for every article on `/news` and
 * `/news/[slug]`. A static data module rather than a CMS: there's no
 * headless CMS or backend in this project (same reasoning `site-config.ts`
 * centralizes nav data), so publishing a new article means adding an entry
 * here.
 *
 * Content discipline: every article is either a real, verifiable fact about
 * this project (the "new website" launch — this site) or an educational
 * explainer built from standards/claims this codebase already establishes
 * elsewhere (GB 38031-2020, component-level repair — see Repair/About),
 * not a fabricated announcement, partnership, or event with a specific date
 * that never happened. Update this comment's reasoning if that changes.
 */
export type NewsCategory = "company" | "insights";

export const NEWS_CATEGORIES: Record<NewsCategory, string> = {
  company: "Company News",
  insights: "Industry Insights",
};

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  date: string;
  author: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  body: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "neo-energy-launches-new-website",
    title: "NEO ENERGY Launches A New Website",
    excerpt:
      "A new cinematic home for NEO ENERGY online, built around the same precision the team brings to every battery.",
    category: "company",
    date: "2026-08-01",
    author: "NEO ENERGY Team",
    readMinutes: 3,
    image: "/videos/flagship-battery-poster.webp",
    imageAlt: "NEO ENERGY's flagship EV battery pack",
    body: [
      "NEO ENERGY's website has a new home — rebuilt from the ground up around the same engineering precision the team brings to every battery it touches.",
      "The new site brings together everything NEO ENERGY does in one place: the flagship battery systems supplied and engineered in partnership with CATL, CALB, and BYD; the component-level diagnostics and repair work that sets the team apart from generalist workshops; and direct ways to reach the engineers themselves, whether that's a WhatsApp message, an email, or a full enquiry form.",
      "It also introduces dedicated pages that didn't exist before — a Careers page for anyone interested in joining the team, a Promotions page for current offers, and this News & Insights section, where the team will share updates and write about the engineering standards behind the work.",
      "Nothing about how NEO ENERGY works has changed — this is the same authorised team, the same standards, the same direct access. The website just finally looks and feels like it.",
    ],
  },
  {
    slug: "understanding-gb-38031-2020-battery-certification",
    title: "Understanding GB 38031-2020: What EV Battery Certification Really Means",
    excerpt:
      "Nail penetration. Water immersion. Vibration and mechanical shock. Here's what a battery actually has to survive to be certified.",
    category: "insights",
    date: "2026-07-24",
    author: "NEO ENERGY Team",
    readMinutes: 5,
    image: "/images/why-choose-chip.webp",
    imageAlt: "A battery management chip on a circuit board, lit in blue",
    body: [
      "GB 38031-2020 is the Chinese national standard for the safety of electric vehicle traction batteries — and it's the standard every repair NEO ENERGY performs is verified against, not just the standard a pack was originally built to.",
      "The standard isn't a paperwork exercise. It's a set of physical tests a battery pack has to survive: nail penetration, which simulates a sharp object piercing a cell without triggering a fire or explosion; water immersion, submerging a pack for a sustained period to confirm sealing integrity holds; and vibration and mechanical shock testing, which simulates the punishment a pack takes over years of real driving — potholes, kerbs, and the ordinary wear of daily use.",
      "Why does this matter for a repair, not just a new pack? Because a repair that doesn't restore a pack to these same tolerances hasn't actually fixed the problem — it's created a battery that looks repaired but hasn't been proven safe. That's the gap between a generalist workshop swapping a pack and an authorised team repairing the component: the second one is still accountable to the same standard the manufacturer was.",
      "This is also why component-level diagnostics matter more than they might seem to at first. A pack that fails a safety check at the cell or busbar level, but passes at a glance, is a genuine risk hiding behind a working dashboard light. Testing to GB 38031-2020 is how that gap gets closed.",
    ],
  },
  {
    slug: "why-component-level-repair-outperforms-pack-swapping",
    title: "Why Component-Level Repair Outperforms Pack Swapping",
    excerpt:
      "Most workshops solve a battery fault by replacing the whole pack. Here's what's actually going on inside — and why that's rarely necessary.",
    category: "insights",
    date: "2026-07-10",
    author: "NEO ENERGY Team",
    readMinutes: 4,
    image: "/images/why-choose-engineering.webp",
    imageAlt: "A battery management chip on a circuit board",
    body: [
      "When an EV or hybrid battery pack develops a fault, the fastest fix most workshops can offer is a full pack swap — pull the old one out, put a new one in. It works, but it's rarely the fix the fault actually called for.",
      "A battery pack isn't one component; it's an assembly of individual cells, busbars connecting them, and a battery management system (BMS) monitoring all of it. A fault in one cell group, a stressed busbar joint, or a BMS board reading incorrectly doesn't mean the other 90% of the pack has failed — it means one identifiable part has.",
      "Component-level repair means diagnosing down to that part: testing individual cells rather than the pack as a whole, inspecting busbar connections for the specific joint under stress, and repairing or replacing a BMS board without touching a cell architecture that's still within spec. It takes deeper diagnostic equipment and training than a pack swap does, which is exactly why it isn't the default option for most workshops.",
      "The upside isn't just cost. A full pack replacement discards cells that were still performing correctly, and a new pack still has to be integrated and verified against the vehicle's own systems. A precise component repair, verified to the same certification standard the pack was built to, restores exactly what failed — nothing more, nothing less.",
    ],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
