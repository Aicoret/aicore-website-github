import fs from "node:fs/promises";
import path from "node:path";
import { buildSeoRoutes, buildUrl, getIndexableRoutes, projectRoot, writeFileIfChanged } from "./seo-routes.mjs";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderSitemap(routes) {
  const urls = routes
    .map((route) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(buildUrl(route.path))}</loc>`,
        `    <lastmod>${escapeXml(route.lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
        `    <priority>${escapeXml(route.priority)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const routes = getIndexableRoutes(await buildSeoRoutes());
const sitemap = renderSitemap(routes);

const publicPath = path.join(projectRoot, "public", "sitemap.xml");
await writeFileIfChanged(publicPath, sitemap);

const distPath = path.join(projectRoot, "dist", "public", "sitemap.xml");
try {
  await fs.access(path.dirname(distPath));
  await writeFileIfChanged(distPath, sitemap);
} catch {
  // Dist does not exist before the first build. The public copy is still generated.
}

console.log(`Generated sitemap.xml with ${routes.length} routes.`);
