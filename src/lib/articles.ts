import { useQuery } from "@tanstack/react-query";
import { insights } from "@/lib/data";
import { getPublicJson } from "@/lib/public-api";

export type ArticleSection = {
  heading: string;
  content: string;
};

export type PublicArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleSection[];
  category: string;
  tags?: string[];
  authorName?: string;
  author: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime: string;
  readingTimeMinutes?: number;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
};

type ListResponse = {
  data?: {
    items?: Partial<PublicArticle>[];
  };
  items?: Partial<PublicArticle>[];
};

const staticArticles = insights as PublicArticle[];

function normalizeArticle(article: Partial<PublicArticle>): PublicArticle {
  return {
    slug: article.slug ?? "",
    title: article.title ?? "Untitled article",
    excerpt: article.excerpt ?? "",
    body: article.body ?? [],
    category: article.category ?? "Insights",
    tags: article.tags ?? [],
    authorName: article.authorName ?? article.author ?? "AICORE Technical Team",
    author: article.author ?? article.authorName ?? "AICORE Technical Team",
    date: article.date ?? monthYear(article.publishedAt),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readTime: article.readTime ?? `${article.readingTimeMinutes ?? 5} min read`,
    readingTimeMinutes: article.readingTimeMinutes,
    featured: article.featured,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    ogImageUrl: article.ogImageUrl,
    canonicalUrl: article.canonicalUrl,
  };
}

function monthYear(value?: string) {
  if (!value) return "Latest";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Latest";
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}

async function fetchArticles(): Promise<PublicArticle[]> {
  try {
    const response = await getPublicJson<ListResponse>("/api/v1/public/articles");
    const items = response.data?.items ?? response.items ?? [];
    return items.length ? items.map(normalizeArticle) : staticArticles;
  } catch {
    return staticArticles;
  }
}

async function fetchArticle(slug: string): Promise<PublicArticle | undefined> {
  try {
    const response = await getPublicJson<{ data?: Partial<PublicArticle> } & Partial<PublicArticle>>(`/api/v1/public/articles/${slug}`);
    const article = response.data ?? response;
    return normalizeArticle(article);
  } catch {
    return staticArticles.find((article) => article.slug === slug);
  }
}

export function useArticles() {
  return useQuery({
    queryKey: ["public-articles"],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000,
  });
}

export function useArticle(slug?: string) {
  return useQuery({
    queryKey: ["public-articles", slug],
    queryFn: () => fetchArticle(slug ?? ""),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}

export { staticArticles };

