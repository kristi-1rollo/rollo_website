import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Linkedin,
  Facebook,
  Instagram,
  Link2,
  Check,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";
import type { BlogPost as BlogPostType, MediaGalleryItem } from "@/hooks/useBlogPosts";
import FadeInView from "@/components/FadeInView";
import BlogMediaGallery from "@/components/BlogMediaGallery";
import TableOfContents, { injectHeadingIds } from "@/components/TableOfContents";
import BlogPostHeader from "@/components/BlogPostHeader";
import { useToast } from "@/hooks/use-toast";
import rolloRenderP013WebP from "@/assets/robot/rollo-render-p013.webp";

const estimateReadingTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const splitByH2 = (html: string): string[] => {
  const parts = html.split(/(?=<h2[\s>])/i);
  return parts.filter((p) => p.trim().length > 0);
};

const proseClasses =
  "dossier-prose prose prose-invert prose-sm sm:prose-base max-w-none text-white leading-relaxed " +
  "[&_img]:rounded-[4px] [&_img]:max-w-full [&_img]:shadow-lg [&_img]:shadow-black/20 [&_img]:my-6 " +
  "[&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 " +
  "[&_iframe]:rounded-[4px] [&_iframe]:max-w-full [&_iframe]:my-6 " +
  "[&_p]:mb-5 md:[&_p]:mb-6 [&_p]:text-left " +
  "[&_h1]:text-left [&_h2]:text-left [&_h3]:text-left " +
  "[&_ul]:text-left [&_ol]:text-left [&_li]:leading-snug [&_ul]:mb-6 [&_ol]:mb-6 " +
  "[&_h2]:text-white [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight " +
  "[&_h2]:border-t [&_h2]:border-border [&_h2]:pt-12 [&_h2]:mt-16 [&_h2]:mb-6 " +
  "[&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-8 [&_h2]:before:h-[2px] [&_h2]:before:bg-primary [&_h2]:before:mb-4 " +
  "[&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-10 " +
  "[&_h3]:text-white [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-10 [&_h3]:mb-4 " +
  "[&_strong]:text-white [&_p:empty]:min-h-[1.5em] [&_p:empty]:before:content-['\\00a0']";

const BlogPost = () => {
  const [copied, setCopied] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

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

  const { data: allPosts = [] } = useQuery({
    queryKey: ["blog-posts", "all"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const currentIndex = allPosts.findIndex((p) => p.id === id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const processedContent = useMemo(
    () => (post?.content ? injectHeadingIds(post.content) : ""),
    [post?.content]
  );

  const contentSections = useMemo(
    () =>
      splitByH2(processedContent).map((s) =>
        DOMPurify.sanitize(s, { USE_PROFILES: { html: true }, ADD_ATTR: ["id"] })
      ),
    [processedContent]
  );

  const readingTime = useMemo(
    () => (post?.content ? estimateReadingTime(post.content) : 0),
    [post?.content]
  );

  const publishedDate = post?.published_at
    ? format(new Date(post.published_at), "MMM d, yyyy")
    : "N/A";

  const authorLabel = post?.author_id
    ? `Operator ${post.author_id.slice(0, 8)}`
    : "ROLLO Intelligence Desk";

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied",
        description: "Paste it in your Instagram Story or bio.",
      });
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    });
  };

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
          <p className="text-muted-foreground mb-6">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.thumbnail_url || "https://rollo.ee/hero/rollo-street.webp",
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "author": {
      "@type": "Organization",
      "name": "ROLLO Intelligence Desk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ROLLO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rollo.ee/logo.png"
      }
    },
    "description": post.excerpt || post.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <div className="min-h-screen pb-16 dossier-interactive">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BlogPostHeader
        title={post.title}
        category={post.tag}
        imageUrl={post.thumbnail_url}
      />

      <div className="container-premium section-glow-top">
        <article className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <main className="min-w-0">
            <FadeInView>
              <Link
                to="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </FadeInView>

            <FadeInView delay={100}>
              <div className="surface-panel mb-8 flex flex-wrap items-center gap-3 rounded-[4px] px-4 py-3">
                <span className="text-sm font-medium text-white/85">{publishedDate}</span>
                {readingTime > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {readingTime} min read
                  </span>
                )}
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <TableOfContents html={post.content} />
            </FadeInView>

            {contentSections.map((section, i) => (
              <FadeInView key={i} delay={300 + i * 80}>
                <div
                  className={`${proseClasses} ${
                    i === contentSections.length - 1 ? "mb-12" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: section }}
                />
              </FadeInView>
            ))}

            <FadeInView delay={450}>
              <div className="surface-panel mb-12 rounded-[4px] p-5">
                <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="inline-block h-[2px] w-4 bg-primary" />
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
                          className="surface-panel rounded-[4px] p-2.5 text-muted-foreground transition hover:text-primary"
                          title="Share on LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="surface-panel rounded-[4px] p-2.5 text-muted-foreground transition hover:text-primary"
                          title="Share on Facebook"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                        <button
                          onClick={handleInstagramShare}
                          className="surface-panel rounded-[4px] p-2.5 text-muted-foreground transition hover:text-primary"
                          title="Copy link and open Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="surface-panel rounded-[4px] p-2.5 text-muted-foreground transition hover:text-primary"
                          title="Copy link"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Link2 className="h-4 w-4" />
                          )}
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </FadeInView>

            {post.media_gallery && post.media_gallery.length > 0 && (
              <FadeInView delay={500}>
                <section className="mb-12">
                  <h2 className="mb-6 text-xl font-semibold text-foreground">Gallery</h2>
                  <BlogMediaGallery items={post.media_gallery} />
                </section>
              </FadeInView>
            )}

            <FadeInView delay={550}>
              <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-left">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-not-allowed opacity-50">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </span>
                )}
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-not-allowed opacity-50">
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </nav>
            </FadeInView>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <FadeInView delay={120}>
                <section className="surface-panel rounded-[4px] p-5">
                  <p className="mono-spec mb-4 text-primary">Metadata</p>
                  <dl className="space-y-4">
                    <div>
                      <dt className="mono-spec text-white/50">Author</dt>
                      <dd className="mt-1 text-sm text-white">{authorLabel}</dd>
                    </div>
                    <div>
                      <dt className="mono-spec text-white/50">Date</dt>
                      <dd className="mt-1 text-base text-white font-medium">{publishedDate}</dd>
                    </div>
                  </dl>
                </section>
              </FadeInView>

              <FadeInView delay={200}>
                <section className="surface-panel rounded-[4px] p-5">
                  <p className="mono-spec mb-3 text-primary">Target Unit</p>
                  <div className="mb-4 overflow-hidden rounded-[4px] border border-white/10">
                    <img
                      src={rolloRenderP013WebP}
                      alt="ROLLO F6 target unit"
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mb-4 text-sm text-foreground/80">
                    Compact autonomous perimeter unit for 24/7 patrol operations.
                  </p>
                  <Link
                    to="/product"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-white"
                  >
                    View ROLLO F6
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </section>
              </FadeInView>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
