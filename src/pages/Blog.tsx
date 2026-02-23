import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

const TAGS = ["All", "Technology", "Security", "Field Test", "AI & Vision", "Industry", "Company", "General"];

const Blog = () => {
  const { data: posts = [], isLoading } = usePublishedPosts();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((p) => p.tag === activeTag);
  }, [posts, activeTag]);

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Blog</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Insights & Updates
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Latest thinking on autonomous security, field test results, and the
            future of robotic patrol technology.
          </p>
        </div>
      </section>

      {/* Tag filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-3 py-1.5 text-xs rounded-[4px] border transition uppercase tracking-wider ${
                activeTag === t
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "bg-muted/50 border-border text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <p className="text-muted-foreground text-center">Loading posts…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center">No posts yet — check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((a) => (
              <article
                key={a.id}
                className="h-full flex flex-col rounded-[4px] border border-border bg-card/50 p-6 transition hover:border-muted-foreground/30 hover:bg-card/80"
              >
                {/* Tag + Date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-[4px] bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                    {a.tag}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {a.published_at ? format(new Date(a.published_at), "MMM d, yyyy") : ""}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                  {a.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {a.excerpt}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${a.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-auto"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
