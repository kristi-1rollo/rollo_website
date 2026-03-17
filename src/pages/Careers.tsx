import { Link } from "react-router-dom";
import { usePublishedCareerPosts } from "@/hooks/useCareerPosts";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import FadeInView from "@/components/FadeInView";

const Careers = () => {
  const { data: posts = [], isLoading } = usePublishedCareerPosts();

  return (
    <div className="pt-24 pb-16">
      {/* Page header */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-2xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <p className="mono-spec text-primary">JOIN THE MISSION</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Open Positions
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Help us build the future of autonomous security robotics. Explore
            our current openings below.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <p className="text-muted-foreground text-center mono-spec">Loading positions…</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-center mono-spec">
            No open positions at the moment. Check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((p, i) => (
              <FadeInView key={p.id} delay={Math.min(i * 80, 400)}>
                <Link
                  to={`/careers/${p.id}`}
                  className="flex flex-col h-full p-6 border border-border bg-card/50 rounded-[4px] transition hover:border-muted-foreground/30 hover:bg-card/80 group no-underline blog-card-glow"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                      {p.type}
                    </span>
                    {p.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                    {p.title}
                  </h2>

                  {p.excerpt && (
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline mt-auto">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </FadeInView>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Careers;
