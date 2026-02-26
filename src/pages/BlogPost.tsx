import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import BlogMediaGallery from "@/components/BlogMediaGallery";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents, { injectHeadingIds } from "@/components/TableOfContents";
import type { BlogPost as BlogPostType, MediaGalleryItem } from "@/hooks/useBlogPosts";
import { useMemo } from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const estimateReadingTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-posts", "single", id],
    queryFn: async () => {
      if (!supabase || !id) return null;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return {
        ...data,
        media_gallery: (data.media_gallery as MediaGalleryItem[]) ?? [],
      } as BlogPostType;
    },
    enabled: !!id,
  });

  const processedContent = useMemo(
    () => (post?.content ? injectHeadingIds(post.content) : ""),
    [post?.content]
  );

  const readingTime = useMemo(
    () => (post?.content ? estimateReadingTime(post.content) : 0),
    [post?.content]
  );

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-center py-20">Loading…</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p className="text-muted-foreground mb-6">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="pt-24 pb-16 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <ScrollFadeIn>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </ScrollFadeIn>

          {/* Header */}
          <ScrollFadeIn delay={100}>
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-[4px] bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary font-medium">
                  {post.tag}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {post.published_at
                    ? format(new Date(post.published_at), "MMM d, yyyy")
                    : ""}
                </span>
                {readingTime > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {readingTime} min read
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </header>
          </ScrollFadeIn>

          {/* Thumbnail */}
          {post.thumbnail_url && (
            <ScrollFadeIn delay={200}>
              <div
                className="mb-10 overflow-hidden rounded-[4px] border border-border"
                style={{
                  maxWidth: post.thumbnail_width ? `${post.thumbnail_width}px` : undefined,
                  maxHeight: post.thumbnail_height ? `${post.thumbnail_height}px` : undefined,
                }}
              >
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full object-cover"
                  style={{
                    objectPosition: (post as any).thumbnail_focal_x != null
                      ? `${(post as any).thumbnail_focal_x}% ${(post as any).thumbnail_focal_y}%`
                      : undefined,
                    transform: (post as any).thumbnail_zoom > 1
                      ? `scale(${(post as any).thumbnail_zoom})`
                      : undefined,
                    transformOrigin: (post as any).thumbnail_focal_x != null
                      ? `${(post as any).thumbnail_focal_x}% ${(post as any).thumbnail_focal_y}%`
                      : undefined,
                  }}
                  loading="lazy"
                />
              </div>
            </ScrollFadeIn>
          )}

          {/* Table of Contents */}
          <ScrollFadeIn delay={300}>
            <TableOfContents html={post.content} />
          </ScrollFadeIn>

          {/* Content */}
          <ScrollFadeIn delay={400}>
            <div
              className="prose prose-invert prose-sm sm:prose-base max-w-none text-slate-300 leading-relaxed mb-12 [&_img]:rounded-[4px] [&_img]:max-w-full [&_img]:shadow-lg [&_img]:shadow-black/20 [&_img]:my-4 [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_iframe]:rounded-[4px] [&_iframe]:max-w-full [&_iframe]:my-4 [&_p]:mb-4 [&_p]:text-justify [&_h2]:text-white [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-t [&_h2]:border-border [&_h2]:pt-10 [&_h2]:mt-14 [&_h2]:mb-3 [&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-8 [&_h2]:before:h-[2px] [&_h2]:before:bg-primary [&_h2]:before:mb-4 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-8 [&_h3]:text-white [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-white [&_p:empty]:min-h-[1.5em] [&_p:empty]:before:content-['\00a0']"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </ScrollFadeIn>

          {/* Media Gallery */}
          {post.media_gallery && post.media_gallery.length > 0 && (
            <ScrollFadeIn delay={500}>
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-foreground mb-6">Gallery</h2>
                <BlogMediaGallery items={post.media_gallery} />
              </section>
            </ScrollFadeIn>
          )}
        </article>
      </div>
    </>
  );
};

export default BlogPost;
