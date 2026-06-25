// Postbuild: prerenders static SEO HTML into dist/<route>/index.html for
// every public route + every published blog post.
//
// Approach: read dist/index.html (the Vite build shell), then per route
// (a) replace the head's title/description/canonical/og:*/twitter:* and
// inject JSON-LD, (b) inject a real H1 + lead/article body INSIDE the
// existing <div id="root">...</div>. Because src/main.tsx uses
// createRoot().render() (not hydrateRoot), React replaces the root
// contents on mount — no hydration mismatch, the user sees the live app
// the moment JS executes.
//
// Strict by default: ANY failure aborts the build. There is no silent
// fallback — that's the whole point of this script.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  staticRoutes,
  blogPostRoute,
} from "./routes.mjs";
import { fetchPublishedPosts } from "./lib/fetch-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

// ──────────────────────────── helpers ────────────────────────────

function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );
}

function attrEscape(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]),
  );
}

// Conservative HTML→text: strip tags & decode common entities.
// Used only for length checks / lead extraction, not for output.
function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Replace or insert a meta tag matching `match` (regex) with given full tag.
function upsertHead(head, match, replacement) {
  if (match.test(head)) return head.replace(match, replacement);
  return head.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

function buildHead(head, route) {
  const url = `${BASE_URL}${route.path}`;
  const title = route.title;
  const description = route.description;
  const ogImage = route.image || DEFAULT_OG_IMAGE;

  let h = head;

  // <title>
  h = h.replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(title)}</title>`);

  // description
  h = upsertHead(
    h,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${attrEscape(description)}" />`,
  );

  // canonical
  h = upsertHead(
    h,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${attrEscape(url)}" />`,
  );

  // og:type
  h = upsertHead(
    h,
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${route.type || "website"}" />`,
  );
  // og:url
  h = upsertHead(
    h,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${attrEscape(url)}" />`,
  );
  // og:title
  h = upsertHead(
    h,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${attrEscape(title)}" />`,
  );
  // og:description
  h = upsertHead(
    h,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${attrEscape(description)}" />`,
  );
  // og:image
  h = upsertHead(
    h,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${attrEscape(ogImage)}" />`,
  );

  // twitter:*
  h = upsertHead(
    h,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${attrEscape(title)}" />`,
  );
  h = upsertHead(
    h,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${attrEscape(description)}" />`,
  );
  h = upsertHead(
    h,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${attrEscape(ogImage)}" />`,
  );

  // noindex if requested
  if (route.noindex) {
    h = upsertHead(
      h,
      /<meta\s+name=["']robots["'][^>]*>/i,
      `<meta name="robots" content="noindex,nofollow" />`,
    );
  }

  // JSON-LD for blog articles
  if (route.type === "article") {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.h1 || title,
      description,
      mainEntityOfPage: url,
      url,
      image: ogImage,
      datePublished: route.publishedAt || undefined,
      author: { "@type": "Organization", name: "1ROLLO" },
      publisher: {
        "@type": "Organization",
        name: "1ROLLO",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
      },
    };
    h = h.replace(
      /<\/head>/i,
      `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`,
    );
  }

  return h;
}

function buildSeoBody(route) {
  const url = `${BASE_URL}${route.path}`;
  const parts = [];
  parts.push(`<h1>${htmlEscape(route.h1 || route.title)}</h1>`);
  if (route.lead) parts.push(`<p>${htmlEscape(route.lead)}</p>`);
  if (route.type === "article") {
    if (route.publishedAt) {
      const d = new Date(route.publishedAt);
      if (!isNaN(d)) {
        parts.push(
          `<p><time datetime="${attrEscape(route.publishedAt)}">${d.toISOString().slice(0, 10)}</time></p>`,
        );
      }
    }
    // Trust the editor-sanitized content as already-safe HTML.
    // It came through DOMPurify in the admin pipeline.
    parts.push(`<article>${route.articleHtml || ""}</article>`);
  }
  // Lightweight nav so crawlers can reach all top-level pages
  parts.push(
    `<nav aria-label="Site"><a href="/">Home</a> · <a href="/product">Product</a> · <a href="/blog">Blog</a> · <a href="/about">About</a> · <a href="/career">Careers</a> · <a href="/contact">Contact</a></nav>`,
  );
  // Wrap in a marker block. Visually hidden but crawler-readable — and
  // React replaces #root on mount so it never reaches users.
  return `<div data-prerender="seo" style="position:absolute;left:-99999px;top:auto;width:1px;height:1px;overflow:hidden">${parts.join("")}</div>`;
}

function injectSeo(html, route) {
  // 1) Head
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) throw new Error("dist/index.html has no <head> block");
  const newHead = `<head>${buildHead(headMatch[1], route).replace(/<\/?head[^>]*>/gi, "")}</head>`;
  let out = html.replace(/<head[^>]*>[\s\S]*?<\/head>/i, newHead);

  // 2) Body: inject SEO content into <div id="root">
  const rootRe = /<div id="root">[\s\S]*?<\/div>/i;
  if (!rootRe.test(out)) throw new Error("dist/index.html has no <div id=\"root\">");
  out = out.replace(rootRe, `<div id="root">${buildSeoBody(route)}</div>`);

  return out;
}

function writeRoute(route, html) {
  // "/" → dist/index.html. "/foo" → dist/foo/index.html. "/a/b" → dist/a/b/index.html
  const rel = route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "")}/index.html`;
  const outPath = resolve(DIST, rel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  return outPath;
}

// Strict assertions per prerendered HTML. Any failure aborts the build.
function assertRouteHtml(route, html) {
  const required = [
    ["<title>", new RegExp(`<title>${htmlEscape(route.title).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`)],
    ["canonical", new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${BASE_URL.replace(/\./g, "\\.")}${route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`)],
    ["meta description", /<meta\s+name=["']description["'][^>]*content=["'][^"']{10,}/i],
    ["og:title", /<meta\s+property=["']og:title["'][^>]+content=/i],
    ["og:description", /<meta\s+property=["']og:description["'][^>]+content=/i],
    ["og:url", new RegExp(`<meta[^>]+property=["']og:url["'][^>]+content=["']${BASE_URL.replace(/\./g, "\\.")}${route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`)],
    ["<h1>", /<h1[^>]*>[\s\S]{3,}?<\/h1>/i],
  ];
  for (const [name, re] of required) {
    if (!re.test(html)) {
      throw new Error(`[prerender] route ${route.path}: missing ${name}`);
    }
  }
  // Body text length check
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/i);
  const bodyText = stripTags(rootMatch ? rootMatch[1] : "");
  if (bodyText.length < 40) {
    throw new Error(
      `[prerender] route ${route.path}: visible body text too short (${bodyText.length} chars)`,
    );
  }
  // Article body for blog posts
  if (route.type === "article") {
    const articleMatch = html.match(/<article>([\s\S]*?)<\/article>/i);
    const articleText = stripTags(articleMatch ? articleMatch[1] : "");
    if (articleText.length < 100) {
      throw new Error(
        `[prerender] route ${route.path}: article body too short (${articleText.length} chars)`,
      );
    }
    // Title must appear somewhere too (h1 already checked, but be paranoid)
    if (!stripTags(html).includes(stripTags(route.h1))) {
      throw new Error(`[prerender] route ${route.path}: h1 text not present`);
    }
  }
}

// ──────────────────────────── main ────────────────────────────

async function main() {
  if (!existsSync(DIST)) {
    throw new Error(`dist/ not found at ${DIST} — run vite build first`);
  }
  const shellPath = resolve(DIST, "index.html");
  if (!existsSync(shellPath)) {
    throw new Error(`dist/index.html not found — Vite build output incomplete`);
  }
  const shell = readFileSync(shellPath, "utf8");

  const posts = await fetchPublishedPosts();
  console.log(`[prerender] fetched ${posts.length} published blog posts`);

  const routes = [
    ...staticRoutes,
    ...posts.map((p) => blogPostRoute(p)),
  ];

  // Uniqueness check — every route must have a unique title.
  const titles = new Map();
  for (const r of routes) {
    if (titles.has(r.title)) {
      console.warn(
        `[prerender] WARNING: duplicate title "${r.title}" on ${r.path} and ${titles.get(r.title)}`,
      );
    }
    titles.set(r.title, r.path);
  }

  let total = 0;
  for (const route of routes) {
    let html;
    try {
      html = injectSeo(shell, route);
      assertRouteHtml(route, html);
    } catch (err) {
      console.error(`[prerender] FATAL while rendering ${route.path}: ${err.message}`);
      process.exit(1);
    }
    const out = writeRoute(route, html);
    const kb = (html.length / 1024).toFixed(1);
    console.log(`  ✓ ${route.path.padEnd(70)} → ${out.replace(ROOT + "/", "")} (${kb} KB)`);
    total++;
  }
  console.log(`[prerender] wrote ${total} HTML files`);
}

main().catch((err) => {
  console.error("[prerender] FATAL:", err);
  process.exit(1);
});
