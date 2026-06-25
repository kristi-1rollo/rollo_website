// Postbuild verification: reads a sample of the prerendered HTML files
// straight from dist/ and asserts they contain the SEO content crawlers
// need. Any missing element aborts the build.

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL } from "./routes.mjs";
import { fetchPublishedPosts } from "./lib/fetch-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function read(routePath) {
  const rel =
    routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}/index.html`;
  const file = resolve(DIST, rel);
  if (!existsSync(file)) {
    throw new Error(`[verify] missing prerendered file: ${file}`);
  }
  return { file, html: readFileSync(file, "utf8") };
}

function assertAll(routePath, html, { expectArticle = false, articleNeedle } = {}) {
  const url = `${BASE_URL}${routePath}`;
  const checks = [
    ["unique <title>", /<title>[^<]{5,}<\/title>/i],
    [
      "canonical for exact route",
      new RegExp(
        `<link[^>]+rel=["']canonical["'][^>]+href=["']${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
        "i",
      ),
    ],
    ["meta description", /<meta\s+name=["']description["'][^>]*content="[^"]{20,}/i],
    ["og:title", /<meta\s+property=["']og:title["'][^>]+content="[^"]{5,}/i],
    ["og:description", /<meta\s+property=["']og:description["'][^>]+content="[^"]{10,}/i],
    [
      "og:url matches route",
      new RegExp(
        `<meta[^>]+property=["']og:url["'][^>]+content=["']${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
        "i",
      ),
    ],
    ["H1", /<h1[^>]*>[\s\S]{3,}?<\/h1>/i],
  ];
  for (const [name, re] of checks) {
    if (!re.test(html)) {
      throw new Error(`[verify] ${routePath}: missing ${name}`);
    }
  }
  const text = stripTags(html);
  if (text.length < 200) {
    throw new Error(
      `[verify] ${routePath}: visible body text too short (${text.length} chars)`,
    );
  }
  if (expectArticle) {
    const m = html.match(/<article>([\s\S]*?)<\/article>/i);
    if (!m) throw new Error(`[verify] ${routePath}: <article> body missing`);
    const articleText = stripTags(m[1]);
    if (articleText.length < 200) {
      throw new Error(
        `[verify] ${routePath}: article body too short (${articleText.length} chars)`,
      );
    }
    if (articleNeedle && !articleText.toLowerCase().includes(articleNeedle.toLowerCase())) {
      throw new Error(
        `[verify] ${routePath}: article body missing expected content "${articleNeedle}"`,
      );
    }
  }
}

async function main() {
  // Static routes
  for (const path of ["/", "/blog"]) {
    const { file, html } = read(path);
    assertAll(path, html);
    console.log(`  ✓ ${path.padEnd(70)} → ${file.split("/").slice(-3).join("/")}`);
  }

  // Sample blog post — must include real article content from Supabase
  const posts = await fetchPublishedPosts();
  const target = posts.find(
    (p) => p.slug === "rollo-robotics-secures-3-7m-pre-seed-round",
  );
  if (!target) {
    throw new Error(
      `[verify] expected published blog post "rollo-robotics-secures-3-7m-pre-seed-round" not found in Supabase`,
    );
  }
  const path = `/blog/${target.slug}`;
  const { file, html } = read(path);
  // Pick a non-trivial slice of the article body as a needle.
  const needle = stripTags(target.content || "").slice(0, 40);
  assertAll(path, html, { expectArticle: true, articleNeedle: needle });
  console.log(`  ✓ ${path.padEnd(70)} → ${file.split("/").slice(-3).join("/")}`);

  console.log("[verify] all prerender SEO checks passed");
}

main().catch((err) => {
  console.error("[verify] FATAL:", err);
  process.exit(1);
});
