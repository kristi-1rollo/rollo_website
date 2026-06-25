// Fetch published blog posts via Supabase REST API at build time.
// Throws on any failure — callers MUST NOT swallow the error in production
// builds. Returns posts sorted newest-first.

const SUPABASE_URL = "https://igdxbtuaajrhvuqtwhmm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHhidHVhYWpyaHZ1cXR3aG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODQzMDEsImV4cCI6MjA4NzM2MDMwMX0.TVkCfOruv2ZheDTeMLuL_JOf7rb0weuzNUZOb5vPkhc";

export async function fetchPublishedPosts() {
  const url = new URL(`${SUPABASE_URL}/rest/v1/blog_posts`);
  url.searchParams.set(
    "select",
    "id,slug,title,excerpt,content,published_at,thumbnail_url,author_id",
  );
  url.searchParams.set("is_published", "eq.true");
  url.searchParams.set("order", "published_at.desc");

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Supabase REST returned ${res.status} ${res.statusText} for blog_posts: ${body}`,
    );
  }

  const posts = await res.json();
  if (!Array.isArray(posts)) {
    throw new Error(`Supabase returned non-array body for blog_posts`);
  }
  if (posts.length === 0) {
    throw new Error(
      `No published blog posts returned from Supabase — refusing to ship a build with no blog SEO content.`,
    );
  }
  for (const p of posts) {
    if (!p.slug || !p.title) {
      throw new Error(
        `Blog post id=${p.id} is missing slug or title — cannot prerender.`,
      );
    }
  }
  return posts;
}
