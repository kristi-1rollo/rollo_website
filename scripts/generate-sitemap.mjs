// Prebuild: regenerates public/sitemap.xml from the shared routes list +
// live published blog posts. Hard-fails if Supabase is unreachable so a
// production build never ships a stale sitemap.

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, staticRoutes, blogPostRoute } from "./routes.mjs";
import { fetchPublishedPosts } from "./lib/fetch-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]),
  );
}

function entry({ path, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  let posts;
  try {
    posts = await fetchPublishedPosts();
  } catch (err) {
    console.error("[sitemap] FATAL: failed to fetch blog posts:", err.message);
    process.exit(1);
  }

  const entries = [];
  for (const r of staticRoutes) {
    if (r.noindex) continue;
    entries.push({ path: r.path, changefreq: r.changefreq, priority: r.priority });
  }
  for (const p of posts) {
    const r = blogPostRoute(p);
    entries.push({
      path: r.path,
      lastmod: p.published_at,
      changefreq: r.changefreq,
      priority: r.priority,
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((e) =>
      entry({ ...e, path: escapeXml(e.path) }),
    ),
    "</urlset>",
    "",
  ].join("\n");

  const out = resolve(ROOT, "public/sitemap.xml");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, xml, "utf8");
  console.log(`[sitemap] wrote ${out} with ${entries.length} URLs`);
  for (const e of entries) console.log(`  · ${BASE_URL}${e.path}`);
}

main().catch((err) => {
  console.error("[sitemap] FATAL:", err);
  process.exit(1);
});
