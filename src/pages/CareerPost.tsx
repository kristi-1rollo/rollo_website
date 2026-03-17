import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";
import DOMPurify from "dompurify";
import type { CareerPost as CareerPostType } from "@/hooks/useCareerPosts";
import FadeInView from "@/components/FadeInView";

const proseClasses =
  "prose prose-invert prose-sm sm:prose-base max-w-none text-slate-300 leading-relaxed " +
  "[&_img]:rounded-[4px] [&_img]:max-w-full [&_img]:my-4 " +
  "[&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 " +
  "[&_p]:mb-4 [&_h2]:text-white [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight " +
  "[&_h2]:border-t [&_h2]:border-border [&_h2]:pt-10 [&_h2]:mt-14 [&_h2]:mb-3 " +
  "[&_h3]:text-white [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_strong]:text-white [&_ul]:text-left [&_ol]:text-left [&_li]:leading-snug";

const CareerPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["career-posts", "single", id],
    queryFn: async () => {
      if (!supabase || !id) return null;
      const { data, error } = await supabase
        .from("career_posts")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data as CareerPostType;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-center py-20">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p className="text-muted-foreground mb-6">Position not found.</p>
          <Link to="/careers" className="text-primary hover:underline">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const sanitized = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <Link
            to="/careers"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>
        </FadeInView>

        <FadeInView delay={100}>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium rounded-[4px] border border-primary/30">
                {post.type}
              </span>
              {post.location && (
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {post.location}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
          </div>
        </FadeInView>

        <FadeInView delay={200}>
          <div
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </FadeInView>

        <FadeInView delay={300}>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-muted-foreground text-sm mb-4">
              Interested? Send your application to{" "}
              <a
                href="mailto:careers@rollo.ee"
                className="text-primary hover:underline"
              >
                careers@rollo.ee
              </a>
            </p>
          </div>
        </FadeInView>
      </div>
    </div>
  );
};

export default CareerPost;
