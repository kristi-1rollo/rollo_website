import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/FadeInView";

const formatHudTimestamp = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return format(d, "MMMM d, yyyy");
};

const Blog = () => {
  const { data: posts = [], isLoading } = usePublishedPosts();

  const heroPost = posts.length > 0 ? posts[0] : null;
  const gridPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="pt-24 pb-16">
      {/* Page header */}
      <section className="section-glow-top relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl space-y-4 text-center">
          <p className="mono-spec text-primary">INTELLIGENCE FEED</p>
          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Dispatches & Field Reports
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-foreground/80">
            Latest thinking on autonomous security, field test results, and the
            future of robotic patrol technology.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <p className="text-muted-foreground text-center mono-spec">Loading dispatches…</p>
        ) : posts.length === 0 ? (
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
                    <div className="dispatch-hero__body text-left">
                      <div className="mb-3 flex items-center gap-3 justify-start">
                        <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                          LATEST
                        </span>
                      </div>
                      <p className="mono-spec telemetry-pulse mb-3 text-xs text-white/70">
                        {formatHudTimestamp(heroPost.published_at)}
                      </p>
                      <h2 className="title-halo text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                        {heroPost.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/80 md:text-base">
                        {heroPost.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 justify-start text-sm font-medium text-primary group-hover:underline">
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

                        <div className="flex flex-1 flex-col p-5 md:p-6 text-left">
                          {/* HUD timestamp */}
                          <p className="mono-spec telemetry-pulse mb-3 text-xs text-white/70">
                            {formatHudTimestamp(a.published_at)}
                          </p>

                          {/* Title */}
                          <h2 className="title-halo text-lg font-semibold text-foreground mb-3 leading-snug">
                            {a.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/80">
                            {a.excerpt}
                          </p>

                          {/* Read Dispatch */}
                          <span className="mt-auto inline-flex items-center gap-1.5 justify-start text-sm font-medium text-primary group-hover:underline">
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
