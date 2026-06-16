import fs from "node:fs/promises";
import path from "node:path";
import { buildSeoRoutes, buildUrl, getIndexableRoutes, projectRoot, writeFileIfChanged } from "./seo-routes.mjs";

const distRoot = path.join(projectRoot, "dist", "public");
const templatePath = path.join(distRoot, "index.html");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeTitle(title) {
  return title.includes("AICORE Technologies") ? title : `${title} | AICORE Technologies`;
}

function removeExistingSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+(?:name|property)=["'](?:description|robots|og:type|og:site_name|og:title|og:description|og:image|og:image:width|og:image:height|og:url|twitter:card|twitter:title|twitter:description|twitter:image|article:published_time|article:modified_time|article:author)["'][^>]*>\s*/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi, "");
}

function renderMeta(route) {
  const title = normalizeTitle(route.title);
  const url = buildUrl(route.path);
  const robots = route.noindex ? "noindex, nofollow" : "index, follow";
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${escapeHtml(route.type ?? "website")}" />`,
    `<meta property="og:site_name" content="AICORE Technologies" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(route.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`,
  ];

  const schemas = route.schemas?.length
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": route.schemas })}</script>`
    : "";

  return `${tags.join("\n    ")}${schemas ? `\n    ${schemas}` : ""}`;
}

function renderSeoRoot(route) {
  const paragraphs = (route.content ?? []).slice(0, 12);

  return `<div id="root"><main id="seo-prerender" class="seo-prerender">
  <h1>${escapeHtml(route.title)}</h1>
  <p>${escapeHtml(route.description)}</p>
  ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n  ")}
  <nav aria-label="Important links">
    <a href="/">Home</a>
    <a href="/solutions">Solutions</a>
    <a href="/products">Products</a>
    <a href="/industries">Industries</a>
    <a href="/insights">Insights</a>
    <a href="/contact">Contact</a>
  </nav>
</main></div>`;
}

function renderHtml(template, route) {
  const cleaned = removeExistingSeo(template);
  const withMeta = cleaned.replace("</head>", `    ${renderMeta(route)}\n  </head>`);
  const withStyle = withMeta.replace(
    "</head>",
    `    <style id="seo-prerender-style">.seo-prerender{max-width:960px;margin:0 auto;padding:96px 24px 48px;font-family:Inter,system-ui,sans-serif;line-height:1.65;color:#0f172a}.seo-prerender h1{font-size:2.5rem;line-height:1.1;margin:0 0 1rem}.seo-prerender p{margin:0 0 1rem;color:#475569}.seo-prerender nav{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}.seo-prerender a{color:#1E5BFF;font-weight:600}</style>\n  </head>`,
  );
  return withStyle.replace(/<div id="root"><\/div>/, renderSeoRoot(route));
}

function outputPathForRoute(routePath) {
  if (routePath === "/") return path.join(distRoot, "index.html");
  return path.join(distRoot, routePath.replace(/^\//, ""), "index.html");
}

const template = await fs.readFile(templatePath, "utf8");
const routes = getIndexableRoutes(await buildSeoRoutes());

for (const route of routes) {
  const filePath = outputPathForRoute(route.path);
  await writeFileIfChanged(filePath, renderHtml(template, route));
}

console.log(`Prerendered SEO HTML for ${routes.length} routes.`);
