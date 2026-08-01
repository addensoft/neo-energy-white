import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container, Heading } from "@/components/ui";
import { NEWS_CATEGORIES, newsArticles, type NewsArticle } from "@/lib/news";

export function RelatedArticles({ current }: { current: NewsArticle }) {
  const others = newsArticles.filter((article) => article.slug !== current.slug).slice(0, 2);

  if (others.length === 0) return null;

  return (
    <section className="bg-graphite/40 relative py-16 lg:py-24">
      <Container className="relative z-10 flex flex-col gap-10">
        <Heading as="h2" size="h3" className="text-center uppercase">
          More From News &amp; Insights
        </Heading>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {others.map((article) => (
            <a
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group border-border bg-background hover:border-ion/50 ease-engineered flex h-full flex-col overflow-hidden rounded-md border transition-colors duration-300 sm:flex-row"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-40">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(min-width: 640px) 160px, 100vw"
                  className="ease-engineered object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-ion text-label-sm font-mono">
                  {NEWS_CATEGORIES[article.category]}
                </span>
                <h3 className="font-display text-h4 text-foreground">{article.title}</h3>
                <span className="text-ion ease-engineered mt-auto flex items-center gap-1.5 pt-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase transition-transform duration-300 group-hover:translate-x-1">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
