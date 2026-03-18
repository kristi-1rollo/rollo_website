import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/FadeInView";

const TAGS = ["All", "Technology", "Security", "Field Test", "AI & Vision", "Industry", "Company", "General"];

const formatHudTimestamp = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const time = format(d, "HH:mm:ss");
  const date = format(d, "MMM d yyyy").toUpperCase();
  return `${time} // ${date}`;
};

const Blog = () => {
  const { data: posts = [], isLoading } = usePublishedPosts();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((p) => p.tag === activeTag);
  }, [posts, activeTag]);

  const heroPost = filtered.length > 0 ? filtered[0] : null;
  const gridPosts = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <div className="pt-24 pb-16">
      {/* Page header */}
      <section className="section-glow-top relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-2xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <p className="mono-spec text-primary">INTELLIGENCE FEED</p>
          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Dispatches & Field Reports
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Latest thinking on autonomous security, field test results, and the
            future of robotic patrol technology.
          </p>
        </div>
      </section>

      {/* HUD toggle filters */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`hud-toggle ${activeTag === t ? "hud-toggle--active" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <p className="text-muted-foreground text-center mono-spec">Loading dispatches…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center mono-spec">No dispatches found</p>
        ) : (
          <>
            {/* Hero post */}
            {heroPost && (
              <FadeInView>
                <Link
                  to={`/blog/${heroPost.id}`}
                  className="surface-panel block overflow-hidden transition group no-underline blog-card-glow mb-12"
                >
                  <div className="dispatch-hero">
                    {/* Image */}
                    <div className="dispatch-hero__image cyber-frame scan-lines">
                      {heroPost.thumbnail_url ? (
                        <img
                          src={heroPost.thumbnail_url}
                          alt={heroPost.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10" />
                      )}
                    </div>

                    {/* Body */}
                    <div className="dispatch-hero__body text-center md:text-left">
                      <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                        <span className="bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                          {heroPost.tag}
                        </span>
                      </div>
                      <p className="mono-spec text-muted-foreground telemetry-pulse mb-3">
                        {formatHudTimestamp(heroPost.published_at)}
                      </p>
                      <h2 className="title-halo text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                        {heroPost.title}
                      </h2>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {heroPost.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline justify-center md:justify-start">
                        Read Dispatch
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInView>
            )}

            {/* Grid posts */}
            {gridPosts.length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {gridPosts.map((a, i) => (
                    <FadeInView key={a.id} delay={Math.min(i * 80, 400)}>
                      <Link
                        to={`/blog/${a.id}`}
                        className="surface-panel h-full flex flex-col overflow-hidden transition group no-underline blog-card-glow"
                      >
                        {/* Thumbnail */}
                        <div className="cyber-frame scan-lines relative">
                          {a.thumbnail_url ? (
                            <img
                              src={a.thumbnail_url}
                              alt={a.title}
                              className="w-full h-48 object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-muted/30 to-muted/10" />
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-1 text-center md:text-left">
                          {/* Tag */}
                          <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                            <span className="bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                              {a.tag}
                            </span>
                          </div>

                          {/* HUD timestamp */}
                          <p className="mono-spec text-muted-foreground telemetry-pulse mb-3">
                            {formatHudTimestamp(a.published_at)}
                          </p>

                          {/* Title */}
                          <h2 className="title-halo text-lg font-semibold text-foreground mb-3 leading-snug">
                            {a.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                            {a.excerpt}
                          </p>

                          {/* Read Dispatch */}
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline mt-auto justify-center md:justify-start">
                            Read Dispatch
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </FadeInView>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Blog;
