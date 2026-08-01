import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNewsArticle, newsArticles } from "@/lib/news";

import { ArticleBody } from "./article-body";
import { ArticleHero } from "./article-hero";
import { RelatedArticles } from "./related-articles";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Every article is pre-rendered at build time — a fixed, small set of
 * static-data articles (see `@/lib/news.ts`), not paginated/dynamic content
 * that would need on-demand rendering. */
export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  const formattedDate = new Intl.DateTimeFormat("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.date));

  return (
    <>
      <ArticleHero article={article} formattedDate={formattedDate} />
      <ArticleBody article={article} />
      <RelatedArticles current={article} />
    </>
  );
}
