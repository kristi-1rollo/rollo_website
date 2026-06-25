// Shared route definitions for sitemap + prerender.
// Mirrors the per-page <SEO> values from src/pages/*.tsx.
// Auth/private/system routes (/login, /set-password, /admin, /admin/blog,
// /unsubscribe) are intentionally absent — they must never be prerendered
// or listed in sitemap.xml.

export const BASE_URL = "https://1rollo.com";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg?v=1rollo-20260525`;

/**
 * Static routes — prerendered + (unless `noindex`) added to sitemap.
 * `lead` is rendered as the first visible paragraph beneath the H1
 * so crawlers see real body text immediately.
 */
export const staticRoutes = [
  {
    path: "/",
    title: "1ROLLO — Autonomous Robot Security Guard",
    description:
      "1ROLLO is the world's first commercial autonomous one-wheeled security robot. Making security services 10x cheaper, smarter, and more energy-efficient.",
    h1: "The world's first commercial autonomous one-wheeled security robot.",
    lead:
      "1ROLLO replaces routine security patrols with an always-on, energy-efficient autonomous platform. 10x cheaper than human guards, with edge AI, 360° vision, and 24/7 operation.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/product",
    title: "1ROLLO Robot — Autonomous Security Specs & Capabilities",
    description:
      "Discover 1ROLLO's autonomous one-wheeled security robot: 360° vision, edge AI, all-weather operation, and cloud integration for next-generation patrol.",
    h1: "1ROLLO — autonomous security specs and capabilities.",
    lead:
      "Single-wheel autonomy, 360° vision, edge AI, all-weather operation, and cloud integration. Built for autonomous perimeter and indoor patrol at industrial sites, logistics hubs, and commercial properties.",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/blog",
    title: "1ROLLO Blog — Insights on Autonomous Security",
    description:
      "Latest thinking on autonomous security, field test results, and the future of robotic patrol technology from the 1ROLLO intelligence desk.",
    h1: "1ROLLO Blog — insights on autonomous security.",
    lead:
      "Field reports, product updates, and analysis from the 1ROLLO intelligence desk. Follow our progress building the world's first autonomous one-wheeled security robot.",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "About 1ROLLO — A Decade of Shared Robotics Experience",
    description:
      "Meet the team behind 1ROLLO: mechanical, electronics, software, and AI experts building the world's first autonomous one-wheeled security robot.",
    h1: "A decade of shared robotics experience.",
    lead:
      "1ROLLO is built by a multidisciplinary team of mechanical, electronics, software, and AI engineers with more than a decade of shared robotics experience.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/career",
    title: "Careers at 1ROLLO — Join the Robotics Frontier",
    description:
      "Join 1ROLLO and help build the world's first autonomous one-wheeled security robot. Open roles in robotics, AI, software, and hardware engineering.",
    h1: "Careers at 1ROLLO — join the robotics frontier.",
    lead:
      "Open roles in robotics, AI, software, and hardware engineering. Help us bring the world's first commercial autonomous one-wheeled security robot to market.",
    priority: "0.7",
    changefreq: "weekly",
  },
  {
    path: "/career-new",
    title: "Careers — 1ROLLO",
    description: "Internal careers preview.",
    h1: "Careers preview",
    lead: "Internal preview of upcoming career roles at 1ROLLO.",
    noindex: true, // prerendered but excluded from sitemap
  },
  {
    path: "/contact",
    title: "Contact 1ROLLO — Get a Quote for Autonomous Security",
    description:
      "Request a quote or partner with 1ROLLO. Deploy autonomous one-wheeled security robots at your facility — talk to our team today.",
    h1: "Contact 1ROLLO — get a quote for autonomous security.",
    lead:
      "Request a quote or discuss a deployment at your facility. Our team replies within one business day.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/funding",
    title: "EU Co-Financing — 1ROLLO",
    description:
      "Information about 1ROLLO's EU NextGenerationEU co-financing and research grants supporting autonomous security robotics development.",
    h1: "EU co-financing — NextGenerationEU.",
    lead:
      "1ROLLO's research and development is supported by EU NextGenerationEU co-financing and Estonian innovation grants.",
    priority: "0.5",
    changefreq: "yearly",
  },
  {
    path: "/eu-kaasrahastus",
    title: "EL kaasrahastus — 1ROLLO",
    description:
      "Info 1ROLLO Euroopa Liidu NextGenerationEU kaasrahastuse ja teadusgrantide kohta, mis toetavad autonoomse turvarobootika arendust.",
    h1: "EL kaasrahastus — NextGenerationEU.",
    lead:
      "1ROLLO arendustegevust toetab Euroopa Liidu NextGenerationEU kaasrahastus ja Eesti innovatsioonitoetused.",
    priority: "0.5",
    changefreq: "yearly",
  },
];

/**
 * Build a route descriptor for a published blog post.
 * Mirrors the BlogPost.tsx Helmet output.
 */
export function blogPostRoute(post) {
  const path = `/blog/${post.slug}`;
  const title = `${post.title} — 1ROLLO Blog`;
  const description = post.excerpt || post.title;
  return {
    path,
    title,
    description,
    h1: post.title,
    lead: post.excerpt || "",
    articleHtml: post.content || "",
    image: post.thumbnail_url || DEFAULT_OG_IMAGE,
    publishedAt: post.published_at,
    type: "article",
    priority: "0.6",
    changefreq: "monthly",
  };
}
