import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CareerPost {
  id: string;
  title: string;
  location: string;
  type: string;
  content: string;
  excerpt: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  author_id: string | null;
  poster_url: string | null;
}

/** Fetch published career posts (public) */
export function usePublishedCareerPosts() {
  return useQuery({
    queryKey: ["career-posts", "published"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("career_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as CareerPost[];
    },
  });
}

/** Fetch ALL career posts (admin) */
export function useAllCareerPosts() {
  return useQuery({
    queryKey: ["career-posts", "all"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("career_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CareerPost[];
    },
  });
}

/** Create / update a career post */
export function useUpsertCareerPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: Partial<CareerPost> & { title: string }) => {
      if (!supabase) throw new Error("Backend not available");

      if (post.id) {
        const { error } = await supabase
          .from("career_posts")
          .update(post)
          .eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("career_posts").insert(post);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["career-posts"] });
    },
  });
}

/** Delete a career post */
export function useDeleteCareerPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Backend not available");
      const { error } = await supabase.from("career_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["career-posts"] });
    },
  });
}
