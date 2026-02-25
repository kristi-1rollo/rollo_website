import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import BlogMediaGallery from "@/components/BlogMediaGallery";
import type { BlogPost as BlogPostType, MediaGalleryItem } from "@/hooks/useBlogPosts";

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
    <div className="pt-24 pb-16 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
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
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Thumbnail */}
        {post.thumbnail_url && (
          <div className="mb-10">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full rounded-[4px] border border-border object-cover"
              style={{
                maxWidth: post.thumbnail_width ? `${post.thumbnail_width}px` : undefined,
                maxHeight: post.thumbnail_height ? `${post.thumbnail_height}px` : undefined,
              }}
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed mb-12 [&_img]:rounded-[4px] [&_img]:max-w-full [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Media Gallery */}
        {post.media_gallery && post.media_gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Gallery</h2>
            <BlogMediaGallery items={post.media_gallery} />
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
