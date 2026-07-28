"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useHeroPhase } from "@/components/providers/hero-phase-provider";
import { Button } from "@/components/ui";
import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";
import { primaryNav, siteConfig, type NavLink as NavLinkData } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Navbar — Creative Direction §12 Premium UI Layout / §5 Hero Section Concept.
 *
 * Two states over the life of a page load:
 *  1. Hidden — the entire 18s Hero film plays with zero UI chrome (§5, §9).
 *  2. Visible — film has settled (`HeroPhaseProvider` phase === "settled"):
 *     one persistent lockup (logo / centered nav / CTA), solid white from the
 *     moment it appears — including over Hero, since Hero's dark-text-safe
 *     styling doesn't extend to nav chrome and the site's default text color
 *     is now dark ink. Only the height/logo size shrink slightly once the
 *     user has scrolled past Hero (tracked via IntersectionObserver on #hero).
 *     Logo, links, and CTA never swap content or layout between the two.
 */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group ease-engineered relative inline-block py-2 font-mono text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
        active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-ion ease-engineered absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </a>
  );
}

/** "About" / "Services" — hover/focus reveals a light dropdown panel of sub-pages. */
function NavDropdown({ item, active }: { item: NavLinkData; active: boolean }) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        className={cn(
          "ease-engineered flex items-center gap-1.5 py-2 font-mono text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
          active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown className="ease-engineered h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div
        className={cn(
          "ease-engineered border-border bg-background invisible absolute top-full left-1/2 z-10 mt-3 w-56 -translate-x-1/2 translate-y-1 rounded-lg border p-2 opacity-0 shadow-[var(--shadow-elevation-md)] transition-all duration-300",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        {item.children?.map((child) => (
          <a
            key={child.label}
            href={child.href}
            className="text-foreground/80 hover:bg-graphite-light hover:text-foreground ease-engineered block rounded-md px-3 py-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-200"
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Mobile equivalent of NavDropdown — tap to expand inline instead of hover. */
function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavLinkData;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="text-foreground/80 hover:text-foreground ease-engineered flex w-full items-center justify-between py-3 font-mono text-[0.85rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "ease-engineered h-4 w-4 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-1 pb-2 pl-4">
          {item.children?.map((child) => (
            <li key={child.label}>
              <a
                href={child.href}
                onClick={onNavigate}
                className="text-foreground/60 hover:text-foreground ease-engineered block py-2 font-mono text-[0.78rem] tracking-[0.08em] uppercase transition-colors duration-300"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Full-width panel below the header, mobile/tablet only. */
function MobileNav({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_ENGINEERED }}
          className="border-border bg-background overflow-hidden border-t lg:hidden"
        >
          <ul className="px-gutter flex flex-col gap-1 py-4">
            {primaryNav.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <MobileAccordion item={link} onNavigate={onNavigate} />
                ) : (
                  <a
                    href={link.href}
                    onClick={onNavigate}
                    className="text-foreground/80 hover:text-foreground ease-engineered block py-3 font-mono text-[0.85rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Button href="#cta" variant="primary" size="sm" className="w-full">
                Request Assessment
              </Button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Real in-page anchors only (skips "#" placeholders for not-yet-built pages). */
function collectTrackedTargets(nav: readonly NavLinkData[]) {
  const targets: { id: string; ownerLabel: string }[] = [];
  for (const item of nav) {
    if (item.href.length > 1 && item.href.startsWith("#")) {
      targets.push({ id: item.href.slice(1), ownerLabel: item.label });
    }
    for (const child of item.children ?? []) {
      if (child.href.length > 1 && child.href.startsWith("#")) {
        targets.push({ id: child.href.slice(1), ownerLabel: item.label });
      }
    }
  }
  return targets;
}

export function Navbar() {
  const { phase } = useHeroPhase();
  const [frosted, setFrosted] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFrosted(entry.intersectionRatio < 0.6),
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = collectTrackedTargets(primaryNav)
      .map((t) => ({ ...t, el: document.getElementById(t.id) }))
      .filter((t): t is { id: string; ownerLabel: string; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const match = targets.find((t) => t.el === mostVisible.target);
        if (match) setActiveLabel(match.ownerLabel);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
  }, []);

  if (phase === "film") return null;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE_ENGINEERED }}
      className="ease-engineered bg-background border-border fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "px-gutter lg:px-gutter-lg ease-engineered mx-auto grid w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-6 transition-all duration-500",
          frosted ? "h-16" : "h-20",
        )}
      >
        <motion.a
          href="#hero"
          aria-label={siteConfig.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE_ENGINEERED }}
          className="ease-engineered inline-flex w-fit shrink-0 items-center"
        >
          {/* No card wrapper on the frosted (white) navbar — the logo's own
              baked-in white background already matches the page. Over the
              transparent Hero state, those same white pixels are what keep it
              legible against the dark video underneath. */}
          <Image
            src="/images/footer-logo.webp"
            alt={siteConfig.name}
            width={1597}
            height={828}
            priority
            className={cn(
              "ease-engineered w-auto transition-all duration-500",
              frosted ? "h-8" : "h-9",
            )}
          />
        </motion.a>

        <ul className="hidden items-center justify-self-center lg:flex lg:gap-6 xl:gap-8">
          {primaryNav.map((link) => (
            <li key={link.label}>
              {link.children ? (
                <NavDropdown item={link} active={activeLabel === link.label} />
              ) : (
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={activeLabel === link.label}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 justify-self-end">
          <Button href="#cta" variant="primary" size="sm" className="hidden sm:inline-flex">
            Request Assessment
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="text-foreground ease-engineered flex h-9 w-9 items-center justify-center transition-colors duration-300 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </motion.header>
  );
}
