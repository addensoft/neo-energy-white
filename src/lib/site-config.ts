import { workshopServices } from "./workshop-services";

/**
 * Single source of truth for site-wide identity, navigation, and SEO defaults.
 * Sourced from the approved Creative Direction document (§1 Brand Foundation, §12 Premium UI Layout).
 */

export const siteConfig = {
  name: "NEO ENERGY",
  legalName: "NEO Energy Battery Services Pte. Ltd.",
  tagline: "Powering the Future",
  // NEO Energy is a leading EV battery engineering and technology company, not a
  // repair workshop — component-level repair is one differentiator among several,
  // not the brand's core identity. Keep future copy framed accordingly.
  description:
    "Singapore's leading EV battery engineering and technology company — authorised partner across CATL, CALB, and BYD battery technologies.",
  /** Client-confirmed production domain. Feeds `metadataBase`, the Open
   * Graph URL, `sitemap.xml` and `robots.txt`. */
  url: "https://neoenergybatt.com",
  // Client-confirmed inbox, matching the production neoenergybatt.com domain.
  contactEmail: "enquiry@neoenergybatt.com",
  /** Client-confirmed WhatsApp line. `whatsappNumber` is digits-only for
   * wa.me deep links; `whatsappDisplay` is the human-readable form. */
  whatsappNumber: "6580712233",
  whatsappDisplay: "+65 8071 2233",
  locale: "en-SG",
  themeColor: "#FFFFFF",
} as const;

export type NavChild = {
  label: string;
  href: string;
  /** Groups children under a heading inside the dropdown — used by Services,
   * which is large enough now to need one. Consecutive children sharing a
   * `group` render under one heading; ungrouped children (About's) render
   * as a plain flat list, unchanged from before. */
  group?: string;
  /** Opens in a new tab — for the government e-service links, which take
   * the visitor entirely off this site. */
  external?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  /** Dropdown sub-items — "About" and "Services" render as hover/focus menus. */
  children?: readonly NavChild[];
};

/**
 * Primary navigation — full multi-page structure (site is expanding beyond a
 * single homepage).
 *
 * "Home", "Contact Us", "About Us", "App", "Career", "Promo", "News", "Our
 * Team", "Our Principles", "Our Gallery", "FAQ", "Battery Systems",
 * "Component Repair", "Maintenance", "Diagnostics", and the 13 workshop
 * services in `@/lib/workshop-services.ts` are real routes, not
 * homepage-only anchors. "Our Mission" is still a real section on `/about`
 * (see `app/(main)/about/about-mission.tsx`) so it links straight to that
 * anchor. `/team`'s roster is placeholder data pending the client's real
 * one — see `app/(main)/team/team-grid.tsx`; `/principles` is a denser,
 * dedicated presentation of facts already established across
 * About/Repair/Trust Bar — see `app/(main)/principles/page.tsx`.
 *
 * Services and About were restructured to mirror teamauto.sg's menu
 * (NEO Energy's parent business, TEAM AUTOPRO Pte Ltd — client-confirmed)
 * per direct instruction: Services' "Workshop Services" group is TeamAuto's
 * real service list, adapted (see `@/lib/workshop-services.ts` for what
 * that adaptation means); NEO's own 4 EV-specific services stay listed,
 * moved to the bottom of the dropdown rather than removed, per direct
 * instruction ("keep neo already services pages at bottom"). "Quick Links"
 * carries over the real government e-service links from TeamAuto's own
 * menu (Pay Parking Fines, Pay Traffic Fines, Renew Road Tax) — TeamAuto's
 * menu had two near-identical "Pay Parking Fines" entries pointing at the
 * same HDB URL (HDB and URA); the URA one looks like a copy-paste error on
 * the source site, not a distinct real destination, so it wasn't carried
 * over rather than guessing at what URA's own portal URL should be. About
 * gained "Our Gallery" and "FAQ" (also TeamAuto structure, real new pages —
 * see `app/(main)/gallery/page.tsx` and `app/(main)/faq/page.tsx`), added
 * rather than replacing NEO's own existing items.
 */
export const primaryNav: readonly NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Our Team", href: "/team" },
      { label: "Our Principles", href: "/principles" },
      { label: "News", href: "/news" },
    ],
  },
  {
    label: "Services",
    href: "#",
    children: [
      ...workshopServices.map(
        (service): NavChild => ({
          label: service.title,
          href: `/services/${service.slug}`,
          group: "Workshop Services",
        }),
      ),
      {
        label: "Pay Parking Fines (HDB)",
        href: "https://services2.hdb.gov.sg/webapp/BL16AWESVPAYMENT/faces/JSP/eservices/pay/BL16REPayFromESVSearch.jsp",
        group: "Quick Links",
        external: true,
      },
      {
        label: "Pay Traffic Fines (LTA)",
        href: "https://onemotoring.lta.gov.sg/",
        group: "Quick Links",
        external: true,
      },
      {
        label: "Renew Road Tax",
        href: "https://vrl.lta.gov.sg/lta/vrl/action/pubfunc?ID=RoadTaxEnquiry",
        group: "Quick Links",
        external: true,
      },
      { label: "Battery Systems", href: "/services/battery-systems", group: "EV Battery Services" },
      { label: "Component Repair", href: "/services/component-repair", group: "EV Battery Services" },
      { label: "Maintenance", href: "/services/maintenance", group: "EV Battery Services" },
      { label: "Diagnostics", href: "/services/diagnostics", group: "EV Battery Services" },
    ],
  },
  { label: "Career", href: "/career" },
  { label: "Promo", href: "/promo" },
  { label: "App", href: "/app" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * "the-object", "exploded-view", "manifesto", "engineering", and "industries"
 * stay in the type union (their shell/full-build files still reference them)
 * but are deliberately absent from the active `chapters` registry below — on
 * hold per the locked content-order revision, not deleted. The Object and
 * the Exploded View were pulled because Flagship Battery Overview now covers
 * that same "battery spec overview" ground; Industries ("For Business") was
 * pulled — nav item and section both — per direct instruction, since it was
 * still an unbuilt empty shell. Files are untouched and can be re-slotted
 * back in later if needed.
 */
export type ChapterId =
  | "hero"
  | "trust-bar"
  | "flagship-battery"
  | "the-object"
  | "exploded-view"
  | "manifesto"
  | "engineering"
  | "repair"
  | "industries"
  | "why-choose-us"
  | "authority"
  | "cta";

export type Chapter = {
  id: ChapterId;
  index: number;
  label: string;
};

/**
 * Homepage chapter registry — drives the section anchor order and each
 * Section's landmark label. Order here is authoritative and reflects the
 * locked content structure (Hero → Trust & Technology Bar → Flagship Battery
 * Overview → Component-Level Repair → Why Choose NEO ENERGY → Trust & Key
 * Statistics → Final CTA). "The Object", "Exploded View", "Manifesto",
 * "Engineering", and "Industries" are on hold and intentionally omitted here.
 */
export const chapters: readonly Chapter[] = [
  { id: "hero", index: 0, label: "Hero" },
  { id: "trust-bar", index: 1, label: "Trust & Technology" },
  { id: "flagship-battery", index: 2, label: "Flagship Battery Overview" },
  { id: "repair", index: 3, label: "Component-Level Repair" },
  { id: "why-choose-us", index: 4, label: "Why Choose NEO Energy" },
  { id: "authority", index: 5, label: "Trust & Key Statistics" },
  { id: "cta", index: 6, label: "Final Call to Action" },
] as const;
