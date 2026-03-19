import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { optimizeImage } from "@/lib/imageOptimize";

export interface MediaGalleryItem {
  url: string;
  type: "image" | "video";
  width: number;
  height: number;
  caption?: string;
  focal_x?: number;
  focal_y?: number;
  zoom?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  thumbnail_url: string | null;
  thumbnail_width: number | null;
  thumbnail_height: number | null;
  thumbnail_focal_x: number | null;
  thumbnail_focal_y: number | null;
  thumbnail_zoom: number | null;
  media_gallery: MediaGalleryItem[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  author_id: string | null;
}

/** Fetch published posts (public) */
export function usePublishedPosts() {
  return useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

/** Fetch ALL posts (admin) */
export function useAllPosts() {
  return useQuery({
    queryKey: ["blog-posts", "all"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

/** Create / update a post */
export function useUpsertPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: Partial<BlogPost> & { title: string; excerpt: string }) => {
      if (!supabase) throw new Error("Backend not available");

      if (post.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(post)
          .eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(post);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

/** Delete a post */
export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Backend not available");
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

/** Optimize image before upload — resize to max dimensions and compress */
async function optimizeImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<File> {
  // Skip non-image files and SVGs
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  // Skip small files (< 200KB)
  if (file.size < 200 * 1024) return file;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { naturalWidth: w, naturalHeight: h } = img;

      // Only downscale, never upscale
      if (w <= maxWidth && h <= maxHeight) {
        URL.revokeObjectURL(img.src);
        resolve(file);
        return;
      }

      const ratio = Math.min(maxWidth / w, maxHeight / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(img.src);

      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const optimized = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
            type: "image/webp",
          });
          // Only use optimized if it's actually smaller
          resolve(optimized.size < file.size ? optimized : file);
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

/** Upload thumbnail image (with optimization) */
export async function uploadThumbnail(file: File): Promise<string> {
  if (!supabase) throw new Error("Backend not available");
  const optimized = await optimizeImage(file);
  const ext = optimized.name.split(".").pop() || "webp";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, optimized);
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}
