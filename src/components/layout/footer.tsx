"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Leaf, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

import { Button, Container } from "@/components/ui";
import { DURATION } from "@/lib/motion-tokens";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { LinkedinIcon, WhatsAppIcon } from "./social-icons";

/**
 * Footer — approved client redesign (final direction). The Earth CTA
 * (`sections/cta`) flows directly into this minimal white sitemap footer —
 * two connected pieces of one scene, not two independently-bounded sections.
 *
 * Desktop and mobile are genuinely separate layouts below (`DesktopFooter` /
 * `MobileFooter`), not one responsively scaled down to the other, per the
 * brief. Every label below now resolves to a real destination — a real
 * route, or a real anchor on `/` (`/#authority`) or `/about`
 * (`/about#partners`) — EXCEPT "FAQs", "Documentation", and LinkedIn's URL,
 * which this project genuinely has no content/profile for yet. Those stay
 * `href="#"` per this project's "never fabricate fake destinations"
 * discipline (see how "Upgrades" was dropped from the primary nav entirely
 * for the same reason) until there's something real to point at.
 */
const FOOTER_LINK_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/career" },
      { label: "News & Updates", href: "/news" },
      { label: "Certifications", href: "/principles" },
      { label: "Partners", href: "/about#partners" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Battery Systems", href: "/services/battery-systems" },
      { label: "Diagnostics & Testing", href: "/services/diagnostics" },
      { label: "Component Repair", href: "/services/component-repair" },
      { label: "Lifecycle Support", href: "/services/maintenance" },
      { label: "Thermal Management", href: "/services/maintenance" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

/** Mobile-only extra accordion group, appended after Company/Solutions and
 * before Contact. Reuses the old footer's Support links (minus "Contact Us",
 * which would just duplicate the Contact accordion immediately after it).
 * (The original approved design also had an "Industries" group between
 * Solutions and Support — dropped per direct instruction, since 3 of its 5
 * links didn't correspond to anything NEO Energy actually does and had no
 * real content anywhere in this project.) */
const MOBILE_SUPPORT_GROUP = {
  title: "Support",
  links: [
    { label: "Service Network", href: "/#authority" },
    { label: "FAQs", href: "#" },
    { label: "Documentation", href: "#" },
  ],
};

const MOBILE_ACCORDION_GROUPS = [...FOOTER_LINK_GROUPS, MOBILE_SUPPORT_GROUP];

const COLUMN_TITLE_CLASS =
  "font-mono text-[0.8rem] font-semibold tracking-[0.14em] text-foreground uppercase";

/** Sitemap-style link — soft colour shift plus a left-to-right underline draw on hover.
 * `external` opens in a new tab (with `rel="noopener noreferrer"`) — for links like
 * WhatsApp that take the visitor off-site entirely, rather than losing their place
 * on the page they were just reading. */
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group ease-engineered text-body focus-visible:outline-ion relative inline-block w-fit py-0.5 transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
      <span className="bg-ion ease-engineered absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

/** A row of legal links joined by hairline "|" separators, per the reference. */
function LegalLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {LEGAL_LINKS.map((link, index) => (
        <span key={link.label} className="flex items-center gap-3">
          {index > 0 && (
            <span className="text-border select-none" aria-hidden="true">
              |
            </span>
          )}
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </span>
      ))}
    </div>
  );
}

/** Circular social glyph — subtle border, small hover lift only. No glow/shadow
 * here per the brief's "no heavy shadows" / "small hover animation only". */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion focus-visible:outline-ion flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-9 lg:w-9"
    >
      {children}
    </a>
  );
}

/** LinkedIn / Email / WhatsApp — replaces the old Instagram/Facebook set per
 * the approved design. Email and WhatsApp reuse the site's real, confirmed
 * contact details; the third slot used to be a "Phone" icon pointing at
 * `tel:+65` — a dead link, since no real phone number has ever been
 * confirmed (see `contact-info.tsx`, which treats that same placeholder as
 * unclickable for the same reason). WhatsApp is what that row actually links
 * to everywhere else on the site (`siteConfig.whatsappNumber`), so it
 * replaces Phone here rather than sitting next to a fake number. */
function SocialLinks() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <div className="flex items-center gap-3">
      <SocialLink href="#" label="LinkedIn">
        <LinkedinIcon className="h-4 w-4" />
      </SocialLink>
      <SocialLink href={`mailto:${siteConfig.contactEmail}`} label="Email">
        <Mail className="h-4 w-4" strokeWidth={1.5} />
      </SocialLink>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="border-border text-muted ease-engineered hover:border-ion/60 hover:text-ion focus-visible:outline-ion flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-9 lg:w-9"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

/** Brand column — logo, one-line positioning, socials. Desktop only — the
 * mobile footer omits it (nav already carries the logo; the accordion stays
 * lean per the approved mobile layout, which opens straight on "Company"). */
function BrandBlock() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src="/images/footer-logo.webp"
        alt="NEO ENERGY — Powering the Future"
        width={1597}
        height={828}
        className="h-9 w-auto self-start"
      />
      <p className="text-body max-w-[22rem]">
        Engineering the next generation of EV Battery Solutions.
      </p>
      <SocialLinks />
    </div>
  );
}

/** Location / phone / email + CTA — the Contact column's body, shared
 * between the desktop column and the mobile accordion's Contact panel.
 * `large` renders a full-width button for the mobile accordion panel; the
 * desktop column keeps the original compact fit. Same `primary` Button style
 * as everywhere else on the site — no one-off color treatment for this
 * button specifically. */
function ContactDetails({ large = false }: { large?: boolean }) {
  return (
    <>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-2.5">
          <MapPin className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
          <span className="text-body">Singapore</span>
        </li>
        <li className="flex items-center gap-2.5">
          <WhatsAppIcon className="text-ion h-4 w-4 shrink-0" />
          <FooterLink href={`https://wa.me/${siteConfig.whatsappNumber}`} external>
            {siteConfig.whatsappDisplay}
          </FooterLink>
        </li>
        <li className="flex items-center gap-2.5">
          <Mail className="text-ion h-4 w-4 shrink-0" strokeWidth={1.5} />
          <FooterLink href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </FooterLink>
        </li>
      </ul>
      <Button
        href={`mailto:${siteConfig.contactEmail}`}
        variant="primary"
        size={large ? "md" : "sm"}
        className={large ? "w-full" : "w-fit"}
      >
        Request Assessment
      </Button>
    </>
  );
}

/** Desktop — four-column grid (brand, two link groups, contact), no
 * dividers, generous whitespace. "Modern Apple/CATL style" per the brief.
 * (Was five columns/three link groups until the "Industries" group was
 * dropped — see `MOBILE_SUPPORT_GROUP`'s comment for why.) */
function DesktopFooter({ year }: { year: number }) {
  return (
    <div className="hidden lg:block">
      <Container className="flex flex-col gap-12 py-section-sm">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-x-10">
          <BrandBlock />

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className={COLUMN_TITLE_CLASS}>{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className={COLUMN_TITLE_CLASS}>Contact</h3>
            <ContactDetails />
          </div>
        </div>

        <div className="border-border flex items-center justify-between gap-6 border-t pt-6">
          <span className="text-body shrink-0">
            © {year} {siteConfig.name}. All Rights Reserved.
          </span>
          <LegalLinks />
          <span className="text-muted flex shrink-0 items-center gap-1.5 text-xs">
            Designed for a sustainable future.
            <Leaf className="text-ion h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </Container>
    </div>
  );
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-1 pb-1">
      {links.map((link) => (
        <li key={link.label}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </ul>
  );
}

/** One collapsible row. `AccordionRow` is dumb — `MobileFooter` owns which
 * single index is open, so opening one row always closes any other. */
function AccordionRow({
  title,
  isOpen,
  onToggle,
  panelId,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  children: ReactNode;
}) {
  return (
    <div className="border-border border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="text-foreground ease-engineered flex min-h-11 w-full items-center justify-between py-4 font-mono text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300"
      >
        {title}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "ease-engineered h-4 w-4 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile — Earth CTA flows straight into a single-open accordion (Company /
 * Solutions / Industries / Support / Contact), then a centered legal bar with
 * the sustainability leaf mark. Not a scaled-down copy of the desktop grid —
 * a dedicated layout per the brief. */
function MobileFooter({ year }: { year: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contactIndex = MOBILE_ACCORDION_GROUPS.length;

  return (
    <div className="lg:hidden">
      <Container className="flex flex-col gap-8 py-10">
        <div>
          {MOBILE_ACCORDION_GROUPS.map((group, index) => (
            <AccordionRow
              key={group.title}
              title={group.title}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              panelId={`footer-accordion-${group.title.toLowerCase()}`}
            >
              <LinkList links={group.links} />
            </AccordionRow>
          ))}
          <AccordionRow
            title="Contact"
            isOpen={openIndex === contactIndex}
            onToggle={() => setOpenIndex(openIndex === contactIndex ? null : contactIndex)}
            panelId="footer-accordion-contact"
          >
            <div className="flex flex-col gap-6">
              <ContactDetails large />
              <SocialLinks />
            </div>
          </AccordionRow>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-body text-sm">
              © {year} {siteConfig.name}. All Rights Reserved.
            </span>
            <LegalLinks className="flex-wrap justify-center gap-x-3 gap-y-1" />
          </div>
          <Leaf
            role="img"
            aria-label="Designed for a sustainable future"
            className="text-ion h-3.5 w-3.5 self-end"
            strokeWidth={1.5}
          />
        </div>
      </Container>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <DesktopFooter year={year} />
      <MobileFooter year={year} />
    </footer>
  );
}
