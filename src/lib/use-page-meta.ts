import { useEffect } from "react";
import { buildUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

type PageMetaOptions = {
  image?: string;
  type?: "website" | "article" | "profile" | "product";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
};

function ensureMeta(selector: string, create: () => HTMLMetaElement) {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = create();
    document.head.appendChild(meta);
  }
  return meta;
}

function setNameMeta(name: string, content: string) {
  const meta = ensureMeta(`meta[name="${name}"]`, () => {
    const el = document.createElement("meta");
    el.name = name;
    return el;
  });
  meta.content = content;
}

function setPropertyMeta(property: string, content: string) {
  const meta = ensureMeta(`meta[property="${property}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute("property", property);
    return el;
  });
  meta.content = content;
}

function removePropertyMeta(property: string) {
  document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.remove();
}

function formatTitle(title: string) {
  return title.includes("AICORE Technologies") ? title : `${title} | AICORE Technologies`;
}

export function usePageMeta(
  title: string,
  description: string,
  path = "",
  options: PageMetaOptions = {},
) {
  useEffect(() => {
    const fullTitle = formatTitle(title);
    const canonicalUrl = buildUrl(path);
    const image = buildUrl(options.image ?? DEFAULT_OG_IMAGE);
    const robots = options.noindex ? "noindex, nofollow" : "index, follow";

    document.title = fullTitle;

    setNameMeta("description", description);
    setNameMeta("robots", robots);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    setPropertyMeta("og:type", options.type ?? "website");
    setPropertyMeta("og:site_name", "AICORE Technologies");
    setPropertyMeta("og:title", fullTitle);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:image", image);
    setPropertyMeta("og:image:width", "1200");
    setPropertyMeta("og:image:height", "630");

    if (options.publishedTime) setPropertyMeta("article:published_time", options.publishedTime);
    else removePropertyMeta("article:published_time");

    if (options.modifiedTime) setPropertyMeta("article:modified_time", options.modifiedTime);
    else removePropertyMeta("article:modified_time");

    if (options.author) setPropertyMeta("article:author", options.author);
    else removePropertyMeta("article:author");

    setNameMeta("twitter:card", "summary_large_image");
    setNameMeta("twitter:title", fullTitle);
    setNameMeta("twitter:description", description);
    setNameMeta("twitter:image", image);
  }, [title, description, path, options]);
}
