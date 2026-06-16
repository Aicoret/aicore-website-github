import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { transformWithEsbuild } from "vite";

export const SITE_URL = "https://aicoret.com";
export const SITE_NAME = "AICORE Technologies";
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const SITE_LOGO = `${SITE_URL}/logo.png`;
export const LASTMOD = "2026-06-02";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(__dirname, "..");
const cacheRoot = path.join("/tmp", "aicore-website-seo-cache");

export function buildUrl(routePath = "") {
  if (/^https?:\/\//.test(routePath)) return routePath;
  const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return cleanPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
}

function monthYearToIso(date) {
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

    if (monthIndex >= 0) return new Date(Date.UTC(Number(match[2]), monthIndex, 1)).toISOString();
  }
  return undefined;
}

function textFromList(items = []) {
  return items.filter(Boolean).join(" ");
}

function organizationSchema(contactInfo) {
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

function localBusinessSchema(contactInfo) {
  const lagosOffice = contactInfo.offices.find((office) => office.city === "Lagos") ?? contactInfo.offices[0];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AICORE Technologies Limited",
    url: SITE_URL,
    image: DEFAULT_IMAGE,
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

function websiteSchema() {
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

function breadcrumbSchema(items) {
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

function serviceSchema(solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.detail ?? solution.description,
    provider: {
      "@type": "Organization",
      name: "AICORE Technologies Limited",
      url: SITE_URL,
    },
    areaServed: ["Nigeria", "Africa"],
    url: buildUrl(`/solutions/${solution.slug}`),
  };
}

function softwareApplicationSchema(product) {
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

function articleSchema(article) {
  const date = monthYearToIso(article.date);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: DEFAULT_IMAGE,
    datePublished: date,
    dateModified: date,
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

function faqPageSchema(items) {
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

export async function loadSiteData() {
  const data = await loadTypeScriptModule(path.join(projectRoot, "src", "lib", "data.ts"));
  const contact = await loadTypeScriptModule(path.join(projectRoot, "src", "lib", "contact.ts"));
  return { ...data, ...contact };
}

async function fetchPublicArticles(fallbackArticles) {
  const baseUrl = (process.env.PUBLIC_CONTENT_API_BASE_URL || process.env.VITE_PLATFORM_API_BASE_URL || "").replace(/\/$/, "");
  if (!baseUrl) return fallbackArticles;

  try {
    const response = await fetch(`${baseUrl}/api/v1/public/articles`);
    if (!response.ok) return fallbackArticles;
    const payload = await response.json();
    const items = payload.data?.items ?? payload.items ?? [];
    return items.length
      ? items.map((article) => ({
          ...article,
          author: article.author ?? article.authorName ?? "AICORE Technical Team",
          date: article.date ?? monthYearFromIso(article.publishedAt),
          body: article.body ?? [],
          readTime: article.readTime ?? `${article.readingTimeMinutes ?? 5} min read`,
        }))
      : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

function monthYearFromIso(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

async function loadTypeScriptModule(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const result = await transformWithEsbuild(source, filePath, {
    loader: "ts",
    format: "esm",
    target: "node22",
  });
  const cachePath = path.join(cacheRoot, `${path.basename(filePath, ".ts")}.mjs`);
  await writeFileIfChanged(cachePath, result.code);
  return import(`${pathToFileURL(cachePath).href}?v=${Date.now()}`);
}

export async function buildSeoRoutes() {
  const { solutions, products, industries, insights, caseStudies, contactInfo } = await loadSiteData();
  const publicArticles = await fetchPublicArticles(insights);
  const siteSchemas = [organizationSchema(contactInfo), localBusinessSchema(contactInfo), websiteSchema()];
  const solutionFaqs = [
    {
      question: "Which AICORE solution should we start with?",
      answer:
        "Start with the highest-friction workflow or system constraint. AICORE can assess your process, data, devices, and users, then recommend whether AI, automation, IoT, SaaS, mobile, or embedded systems is the right first step.",
    },
    {
      question: "Can AICORE combine multiple service areas in one project?",
      answer:
        "Yes. Many projects combine software, AI, automation, embedded devices, dashboards, and mobile apps. AICORE is built for complete intelligent system delivery rather than isolated single-discipline work.",
    },
    {
      question: "Do you build MVPs or production systems?",
      answer:
        "We build both. We can validate an MVP quickly, then harden it into a secure, maintainable production system with deployment, monitoring, documentation, and support.",
    },
    {
      question: "Can you work with an existing team or system?",
      answer:
        "Yes. AICORE can extend existing platforms, integrate with current tools, modernise legacy workflows, or co-build alongside your internal technical team.",
    },
  ];
  const productFaqs = [
    {
      question: "Are AICORE products ready-made or customisable?",
      answer:
        "Some products are client-ready, while others are MVPs, prototypes, or internal platforms. AICORE can customise products around your workflows, data, users, integrations, and operational requirements.",
    },
    {
      question: "Can we request a live demo before starting?",
      answer:
        "Yes. For client-ready products, AICORE can walk you through the current product experience and discuss how it maps to your use case.",
    },
    {
      question: "Do product pages show live screenshots?",
      answer:
        "Some visuals are concept previews or sample screens. Product status is labelled clearly so you know whether a product is client-ready, MVP, prototype, or internal-use.",
    },
    {
      question: "Can AICORE build a custom platform if no product fits?",
      answer:
        "Yes. If an existing product is not a fit, AICORE can design and build a custom SaaS, automation, IoT, AI, or operations platform for your organisation.",
    },
  ];
  const contactFaqs = [
    {
      question: "How quickly does AICORE respond to enquiries?",
      answer: `AICORE typically responds ${contactInfo.responseTime.toLowerCase()} after receiving a project, product demo, academy, partnership, or general enquiry.`,
    },
    {
      question: "What information should I include in my enquiry?",
      answer:
        "Describe the workflow, system, device, data, or business problem you want to improve. Include current tools, users, timeline, and any technical requirements or limits if you know them.",
    },
    {
      question: "Can we talk through the idea before committing to a project?",
      answer:
        "Yes. AICORE can review your idea or operational challenge, suggest a practical next step, and outline the likely scope before a formal project begins.",
    },
    {
      question: "Does AICORE support clients outside Lagos?",
      answer:
        "Yes. AICORE works with clients across Nigeria and beyond, with offices in Lagos and Osogbo and remote collaboration for software, AI, automation, and IoT projects.",
    },
  ];

  const routes = [
    {
      path: "/",
      title: "AICORE Technologies — AI Employees, Automation, IoT & Intelligent Software",
      description:
        "AICORE Technologies builds AI Employees, AI-powered software, automation platforms, IoT systems, intelligent dashboards and hardware-enabled solutions for businesses, schools and facilities.",
      priority: "1.0",
      changefreq: "weekly",
      schemas: siteSchemas,
      content: [
        "AICORE Technologies builds practical AI Employees, automation, IoT, robotics, SaaS, web, mobile, and intelligent systems for organisations.",
        "Core service areas include AI Employee platforms, business process automation, connected IoT systems, embedded firmware, robotics, smart energy monitoring, SaaS platforms, and technical training.",
      ],
    },
    {
      path: "/solutions",
      title: "Solutions - Eight Service Areas",
      description:
        "Explore AICORE's eight solution pillars: AI systems, process automation, IoT, embedded firmware, robotics, SaaS platforms, mobile apps, and developer tools.",
      priority: "0.9",
      changefreq: "monthly",
      schemas: [
        ...solutions.map(serviceSchema),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]),
        faqPageSchema(solutionFaqs),
      ],
      content: [...solutions.map((s) => `${s.title}: ${s.description}`), ...solutionFaqs.map((faq) => `${faq.question} ${faq.answer}`)],
    },
    {
      path: "/solutions/web-mobile-saas-platforms",
      title: "Web, Mobile & SaaS Platforms",
      description: "Custom SaaS platforms, web applications, and mobile apps built for real business operations.",
      priority: "0.8",
      changefreq: "monthly",
      content: [
        "AICORE builds web applications, mobile apps, dashboards, portals, and SaaS platforms for real business workflows.",
      ],
    },
    {
      path: "/products",
      title: "Products - AICORE Platforms & Software",
      description:
        "Browse AICORE's portfolio of platforms and products across AI, automation, IoT, SaaS, and smart energy systems.",
      priority: "0.9",
      changefreq: "monthly",
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]),
        faqPageSchema(productFaqs),
      ],
      content: [...products.map((p) => `${p.name}: ${p.tagline}. ${p.problem}`), ...productFaqs.map((faq) => `${faq.question} ${faq.answer}`)],
    },
    {
      path: "/industries",
      title: "Industries - Sectors AICORE Serves",
      description:
        "AICORE builds intelligent systems for manufacturing, healthcare, agriculture, logistics, energy, education, fintech, and more across Africa and beyond.",
      priority: "0.8",
      changefreq: "monthly",
      content: industries.map((industry) => `${industry.name}: ${industry.pain}`),
    },
    {
      path: "/academy",
      title: "AICORE Academy - Practical Technology Training",
      description:
        "Hands-on technical training covering AI, robotics, IoT, embedded systems, software development, smart energy, and corporate upskilling.",
      priority: "0.8",
      changefreq: "monthly",
      content: ["AICORE Academy provides practical technology training in AI, automation, robotics, embedded systems, IoT, software development, and smart energy."],
    },
    {
      path: "/insights",
      title: "Insights - Technical Articles from AICORE",
      description:
        "Practical technical articles on AI for business, IoT, embedded systems, robotics, automation, and smart energy from the AICORE technical team.",
      priority: "0.8",
      changefreq: "weekly",
      content: publicArticles.map((article) => `${article.title}: ${article.excerpt}`),
    },
    {
      path: "/about",
      title: "About AICORE Technologies",
      description:
        "Learn about AICORE Technologies - our mission to build practical intelligent systems, our eight service areas, and what makes us different.",
      priority: "0.7",
      changefreq: "monthly",
      content: ["AICORE Technologies combines software, AI, embedded systems, automation, robotics, IoT, and business thinking in one technical team."],
    },
    {
      path: "/contact",
      title: "Contact AICORE - Start a Project",
      description:
        "Tell AICORE about your AI, automation, IoT, or software project. We respond within 24 hours.",
      priority: "0.7",
      changefreq: "monthly",
      schemas: [localBusinessSchema(contactInfo), faqPageSchema(contactFaqs)],
      content: [
        `Contact AICORE Technologies at ${contactInfo.email}. Phone: ${contactInfo.phones.map((p) => p.display).join(", ")}. Offices: ${contactInfo.offices.map((o) => `${o.city}: ${o.address}`).join("; ")}.`,
        ...contactFaqs.map((faq) => `${faq.question} ${faq.answer}`),
      ],
    },
    {
      path: "/case-studies",
      title: "Case Studies - Real Results from AICORE Projects",
      description:
        "Explore AICORE Technologies case studies - real-world deployments of AI, IoT, automation, and embedded systems delivering measurable results for clients.",
      priority: "0.7",
      changefreq: "monthly",
      content: caseStudies.filter((cs) => cs.status === "published").map((cs) => `${cs.client}: ${cs.challenge}`),
    },
    {
      path: "/partners",
      title: "Partners & Ecosystem - AICORE Technologies",
      description:
        "Explore AICORE's technology, hardware, cloud, and academic partners powering our AI, IoT, automation, and robotics solutions.",
      priority: "0.5",
      changefreq: "monthly",
      content: ["AICORE collaborates with technology, hardware, cloud, and academic partners across intelligent systems delivery."],
    },
    {
      path: "/careers",
      title: "Careers - Join AICORE Technologies",
      description:
        "Join the team building Africa's intelligent systems. Explore open roles in engineering, sales, and operations at AICORE Technologies.",
      priority: "0.5",
      changefreq: "monthly",
      content: ["AICORE hires engineers, sales professionals, and operations teammates building AI, IoT, automation, and intelligent systems."],
    },
    {
      path: "/press",
      title: "Press & Media - AICORE Technologies",
      description:
        "Media resources, press mentions, brand assets, and contact information for journalists and publishers covering AICORE Technologies.",
      priority: "0.5",
      changefreq: "monthly",
      content: ["Press resources, media contact, brand assets, and company boilerplate for AICORE Technologies."],
    },
    {
      path: "/request-demo",
      title: "Request a Product Demo - AICORE Technologies",
      description:
        "Schedule a personalised demo of any AICORE product. Tell us your use case and we'll reach out within 24 hours.",
      priority: "0.6",
      changefreq: "monthly",
      content: ["Request a personalised demo of AICORE products and platforms for your business use case."],
    },
    {
      path: "/company-profile",
      title: "Company Profile - AICORE Technologies",
      description:
        "Download or print the AICORE Technologies company profile - AI, automation, IoT, robotics, and intelligent systems for Africa and beyond.",
      priority: "0.5",
      changefreq: "monthly",
      content: ["AICORE Technologies company profile covering services, products, industries served, and contact information."],
    },
    {
      path: "/privacy",
      title: "Privacy Policy",
      description:
        "AICORE Technologies Limited privacy policy - how we collect, use, and protect your data in accordance with the Nigeria Data Protection Act 2023.",
      priority: "0.3",
      changefreq: "yearly",
      content: ["AICORE Technologies Limited privacy policy and data protection information."],
    },
    {
      path: "/terms",
      title: "Terms of Service",
      description: "AICORE Technologies Limited terms of service - the rules and conditions governing use of our website.",
      priority: "0.3",
      changefreq: "yearly",
      content: ["AICORE Technologies Limited website terms of service."],
    },
    {
      path: "/sitemap",
      title: "Sitemap",
      description: "Complete index of all pages on the AICORE Technologies website.",
      priority: "0.2",
      changefreq: "monthly",
      content: ["Complete index of pages on the AICORE Technologies website."],
    },
  ];

  for (const solution of solutions) {
    const faqs = [
      {
        question: `What does ${solution.title} include?`,
        answer: solution.description,
      },
      {
        question: "How does AICORE scope this kind of project?",
        answer:
          "We start with discovery, define the users and data flows, map integrations, identify delivery risks, and then propose a phased build plan with clear milestones.",
      },
      {
        question: "Can this integrate with our existing systems?",
        answer:
          "Yes. AICORE designs solutions around existing tools, APIs, databases, devices, and operational workflows wherever possible.",
      },
    ];

    routes.push({
      path: `/solutions/${solution.slug}`,
      title: solution.title,
      description: solution.description,
      priority: "0.8",
      changefreq: "monthly",
      schemas: [
        serviceSchema(solution),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${solution.slug}` },
        ]),
        faqPageSchema(faqs),
      ],
      content: [
        solution.detail,
        `Includes: ${solution.capabilities.join(", ")}.`,
        `Technologies: ${solution.technologies.join(", ")}.`,
        `Use cases: ${solution.useCases.join(", ")}.`,
        ...faqs.map((faq) => `${faq.question} ${faq.answer}`),
      ],
    });
  }

  for (const product of products) {
    const faqs = [
      {
        question: `Who is ${product.name} for?`,
        answer: product.targetUsers,
      },
      {
        question: "What problem does this product solve?",
        answer: product.problem,
      },
      {
        question: "Can AICORE customise this product?",
        answer:
          "Yes. AICORE can adapt product workflows, integrations, dashboards, user roles, and deployment details around your organisation's requirements.",
      },
    ];

    routes.push({
      path: `/products/${product.slug}`,
      title: product.name,
      description: product.tagline,
      priority: "0.7",
      changefreq: "monthly",
      schemas: [
        softwareApplicationSchema(product),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ]),
        faqPageSchema(faqs),
      ],
      content: [
        product.description,
        `Problem: ${product.problem}`,
        `Features: ${product.features.join(", ")}.`,
        `Target users: ${product.targetUsers}.`,
        ...faqs.map((faq) => `${faq.question} ${faq.answer}`),
      ],
    });
  }

  for (const article of publicArticles) {
    routes.push({
      path: `/insights/${article.slug}`,
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      type: "article",
      priority: "0.6",
      changefreq: "monthly",
      lastmod: article.updatedAt?.slice(0, 10) ?? article.publishedAt?.slice(0, 10) ?? monthYearToIso(article.date)?.slice(0, 10) ?? LASTMOD,
      schemas: [
        articleSchema(article),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]),
      ],
      content: [article.excerpt, ...article.body.map((section) => `${section.heading}: ${section.content}`)],
    });
  }

  for (const caseStudy of caseStudies.filter((cs) => cs.status === "published")) {
    routes.push({
      path: `/case-studies/${caseStudy.slug}`,
      title: `Case Study: ${caseStudy.client}`,
      description: `How AICORE helped a ${caseStudy.industry} client: ${caseStudy.challenge.slice(0, 150)}...`,
      priority: "0.6",
      changefreq: "monthly",
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: caseStudy.client, path: `/case-studies/${caseStudy.slug}` },
        ]),
      ],
      content: [
        `Challenge: ${caseStudy.challenge}`,
        `Solution: ${caseStudy.solution}`,
        `Outcomes: ${caseStudy.outcome.join(" ")}`,
        `Technologies: ${caseStudy.technologies.join(", ")}.`,
      ],
    });
  }

  return routes.map((route) => ({
    image: DEFAULT_IMAGE,
    lastmod: LASTMOD,
    type: "website",
    schemas: [],
    content: [],
    noindex: false,
    ...route,
  }));
}

export function getIndexableRoutes(routes) {
  return routes.filter((route) => !route.noindex);
}

export function routeText(route) {
  return textFromList([route.description, ...(route.content ?? [])]);
}

export async function writeFileIfChanged(filePath, content) {
  try {
    const existing = await fs.readFile(filePath, "utf8");
    if (existing === content) return false;
  } catch {
    // File does not exist yet.
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
  return true;
}
