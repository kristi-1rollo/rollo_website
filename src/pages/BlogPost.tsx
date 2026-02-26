import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft, Clock, Linkedin, Facebook, Instagram, Link2, Check } from "lucide-react";
import BlogMediaGallery from "@/components/BlogMediaGallery";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents, { injectHeadingIds } from "@/components/TableOfContents";
import type { BlogPost as BlogPostType, MediaGalleryItem } from "@/hooks/useBlogPosts";
import { useMemo, useState } from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const estimateReadingTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/** Split HTML content by H2 headings into sections for individual fade-in */
const splitByH2 = (html: string): string[] => {
  // Split on <h2 tags, keeping the tag
  const parts = html.split(/(?=<h2[\s>])/i);
  return parts.filter((p) => p.trim().length > 0);
};

const proseClasses =
  "prose prose-invert prose-sm sm:prose-base max-w-none text-slate-300 leading-relaxed " +
  "[&_img]:rounded-[4px] [&_img]:max-w-full [&_img]:shadow-lg [&_img]:shadow-black/20 [&_img]:my-4 " +
  "[&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300 " +
  "[&_iframe]:rounded-[4px] [&_iframe]:max-w-full [&_iframe]:my-4 " +
  "[&_p]:mb-4 [&_p]:text-justify " +
  "[&_h1]:text-left [&_h2]:text-left [&_h3]:text-left " +
  "[&_ul]:text-left [&_ol]:text-left [&_li]:leading-snug " +
  "[&_h2]:text-white [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight " +
  "[&_h2]:border-t [&_h2]:border-border [&_h2]:pt-10 [&_h2]:mt-14 [&_h2]:mb-3 " +
  "[&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-8 [&_h2]:before:h-[2px] [&_h2]:before:bg-primary [&_h2]:before:mb-4 " +
  "[&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-8 " +
  "[&_h3]:text-white [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_strong]:text-white [&_p:empty]:min-h-[1.5em] [&_p:empty]:before:content-['\\00a0']";

const BlogPost = () => {
  const [copied, setCopied] = useState(false);
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

  const contentSections = useMemo(
    () => splitByH2(processedContent),
    [processedContent]
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

          {/* Thumbnail — fixed 16:9 aspect ratio */}
          {post.thumbnail_url && (
            <ScrollFadeIn delay={200}>
              <div
                className="mb-10 overflow-hidden rounded-[4px] border border-border w-full"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
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

          {/* Content — split by H2 sections for individual fade-in */}
          {contentSections.map((section, i) => (
            <ScrollFadeIn key={i} delay={400 + i * 80}>
              <div
                className={`${proseClasses} ${i === contentSections.length - 1 ? "mb-12" : ""}`}
                dangerouslySetInnerHTML={{ __html: section }}
              />
            </ScrollFadeIn>
          ))}

          {/* Share */}
          <ScrollFadeIn delay={450}>
            <div className="border-t border-border pt-8 mb-12">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-4 h-[2px] bg-primary" />
                Share this article
              </p>
              <div className="flex items-center gap-3">
                {(() => {
                  const url = encodeURIComponent(window.location.href);
                  return (
                    <>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-[4px] border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-[4px] border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                        title="Share on Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-[4px] border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                        title="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-2.5 rounded-[4px] border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                        title="Copy link"
                      >
                        {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
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
