"use client";

import { ArrowRight, LayoutGrid, Newspaper, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { RevealWrapper } from "@/components/motion/reveal-wrapper";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NEWS_CATEGORIES, newsArticles, type NewsCategory } from "@/lib/news";

const FILTERS: { id: NewsCategory | "all"; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All Articles", icon: LayoutGrid },
  { id: "company", label: NEWS_CATEGORIES.company, icon: Newspaper },
  { id: "insights", label: NEWS_CATEGORIES.insights, icon: Sparkles },
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * NewsGrid — category-filterable article grid, same filter-tab mechanic
 * `promo-offers.tsx` established (one active-filter state, tabs styled the
 * same way) so the two pages feel like one system rather than two
 * independently-invented UI patterns.
 */
export function NewsGrid() {
  const [activeFilter, setActiveFilter] = useState<NewsCategory | "all">("all");

  const visibleArticles = newsArticles.filter(
    (article) => activeFilter === "all" || article.category === activeFilter,
  );

  return (
    <section className="bg-void relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <RevealWrapper variant="fade">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "ease-engineered flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-300",
                    isActive
                      ? "border-ion bg-ion text-white"
                      : "border-border text-muted hover:border-ion/50 hover:text-foreground",
                  )}
                >
                  <filter.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </RevealWrapper>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleArticles.map((article, index) => (
            <RevealWrapper
              key={article.slug}
              variant="blur"
              delay={index * 0.08}
              duration={0.7}
              className="h-full"
            >
              <a
                href={`/news/${article.slug}`}
                className="group border-border bg-graphite/60 hover:border-ion/50 ease-engineered flex h-full flex-col overflow-hidden rounded-md border transition-colors duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="ease-engineered object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="bg-ion absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.06em] text-white uppercase">
                    {NEWS_CATEGORIES[article.category]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-label-sm font-mono">
                    {formatDate(article.date)} · {article.readMinutes} min read
                  </span>
                  <h3 className="font-display text-h4 text-foreground">{article.title}</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="text-ion ease-engineered mt-auto flex items-center gap-1.5 pt-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase transition-transform duration-300 group-hover:translate-x-1">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            </RevealWrapper>
          ))}

          {visibleArticles.length === 0 && (
            <p className="font-body text-muted col-span-full py-8 text-center text-sm">
              No articles in this category yet — check back soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
