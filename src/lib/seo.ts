import { contactInfo } from "@/lib/contact";

export const SITE_URL = "https://aicoret.com";
export const SITE_NAME = "AICORE Technologies";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const SITE_LOGO = `${SITE_URL}/logo.png`;

export function buildUrl(path = "") {
  if (/^https?:\/\//.test(path)) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
}

export function normalizePath(path = "") {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function toIsoDate(date?: string) {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();

  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const monthIndex = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ].indexOf(match[1].toLowerCase());

    if (monthIndex >= 0) {
      return new Date(Date.UTC(Number(match[2]), monthIndex, 1)).toISOString();
    }
  }

  return undefined;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AICORE Technologies Limited",
    url: SITE_URL,
    logo: SITE_LOGO,
    email: contactInfo.email,
    description:
      "AICORE Technologies Limited builds AI Employees, AI-powered software, automation platforms, IoT systems, intelligent dashboards and hardware-enabled solutions for organisations across Africa and beyond.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phones[0]?.number,
      contactType: "customer support",
      email: contactInfo.email,
      areaServed: "NG",
      availableLanguage: "English",
    },
    sameAs: [contactInfo.social.linkedin, contactInfo.social.website],
  };
}

export function localBusinessSchema() {
  const lagosOffice = contactInfo.offices.find((office) => office.city === "Lagos") ?? contactInfo.offices[0];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AICORE Technologies Limited",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    logo: SITE_LOGO,
    email: contactInfo.email,
    telephone: contactInfo.phones[0]?.number,
    address: {
      "@type": "PostalAddress",
      streetAddress: lagosOffice?.address,
      addressLocality: lagosOffice?.city,
      addressCountry: "NG",
    },
    areaServed: ["Nigeria", "Africa"],
    sameAs: [contactInfo.social.linkedin, contactInfo.social.website],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: "AICORE Technologies Limited",
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildUrl(item.path),
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug?: string;
  detail?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.detail ?? service.description,
    provider: {
      "@type": "Organization",
      name: "AICORE Technologies Limited",
      url: SITE_URL,
    },
    areaServed: ["Nigeria", "Africa"],
    url: buildUrl(service.slug ? `/solutions/${service.slug}` : "/solutions"),
  };
}

export function softwareApplicationSchema(product: {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: string;
  features: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: buildUrl(`/products/${product.slug}`),
    description: product.description || product.tagline,
    featureList: product.features,
    publisher: {
      "@type": "Organization",
      name: "AICORE Technologies Limited",
      url: SITE_URL,
    },
  };
}

export function articleSchema(article: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
}) {
  const published = toIsoDate(article.date);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: DEFAULT_OG_IMAGE,
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AICORE Technologies Limited",
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: buildUrl(`/insights/${article.slug}`),
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
