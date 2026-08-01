import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { NEWS_CATEGORIES, type NewsArticle } from "@/lib/news";

/**
 * ArticleHero — a static-image banner, not `PageBanner`'s looping video.
 * Every other inner page is a standing destination that benefits from
 * ambient motion; an individual article is read once and left, so a video
 * loop here would just be autoplay weight with no payoff — the site's own
 * `prefers-reduced-motion` discipline (`use-reduced-motion.ts`) applies the
 * same judgment call, just made permanently here instead of conditionally.
 */
export function ArticleHero({
  article,
  formattedDate,
}: {
  article: NewsArticle;
  formattedDate: string;
}) {
  return (
    <section className="bg-foreground relative flex min-h-[46vh] w-full items-end overflow-hidden lg:min-h-[54vh]">
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"
      />

      <Container className="relative z-10 flex flex-col gap-5 py-10 lg:py-14">
        {/* `next/link`, not the plain `<a>` the rest of this project uses for
            internal links (see button.tsx's own comment on why) — this is a
            literal, static route rather than a hash anchor or a
            template-built slug, and the lint rule that only fires on exactly
            that shape (`no-html-link-for-pages`) is right that it should
            prefetch/soft-navigate like a real page link. */}
        <Link
          href="/news"
          className="ease-engineered flex w-fit items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.04em] text-white/70 uppercase transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back To News &amp; Insights
        </Link>

        <span className="bg-ion flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.1em] text-white uppercase">
          {NEWS_CATEGORIES[article.category]}
        </span>

        <h1 className="font-display max-w-3xl text-3xl font-semibold text-balance text-white uppercase sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <span className="font-mono text-xs tracking-[0.04em] text-white/60 uppercase">
          {article.author} · {formattedDate} · {article.readMinutes} min read
        </span>
      </Container>
    </section>
  );
}
