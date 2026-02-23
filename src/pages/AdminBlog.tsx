import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllPosts, useDeletePost, type BlogPost } from "@/hooks/useBlogPosts";
import BlogPostEditor from "@/components/BlogPostEditor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";

const AdminBlog = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const { data: posts = [], isLoading } = useAllPosts();
  const deletePost = useDeletePost();
  const { toast } = useToast();
  const [editing, setEditing] = useState<BlogPost | null | "new">(null);

  if (loading) {
    return <div className="pt-24 pb-16 text-center text-slate-400">Loading…</div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-slate-400">You do not have admin access.</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost.mutateAsync(id);
      toast({ title: "Post deleted" });
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
  };

  if (editing) {
    return (
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-8">
          {editing === "new" ? "New Post" : "Edit Post"}
        </h1>
        <BlogPostEditor
          post={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Blog Admin</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => setEditing("new")}
            className="bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 font-bold uppercase tracking-tight"
          >
            <Plus className="h-4 w-4 mr-1" /> New Post
          </Button>
          <Button
            variant="outline"
            onClick={signOut}
            className="border-white/10 text-slate-300 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-1" /> Sign Out
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Loading posts…</p>
      ) : posts.length === 0 ? (
        <p className="text-slate-400">No posts yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-[4px]"
            >
              {p.thumbnail_url && (
                <img
                  src={p.thumbnail_url}
                  alt=""
                  className="w-16 h-16 object-cover rounded-[4px] border border-white/10 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                      p.is_published
                        ? "bg-[#B4FF33]/10 text-[#B4FF33]"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {p.tag}
                  </span>
                </div>
                <p className="text-white font-medium truncate">{p.title}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setEditing(p)}
                  className="h-8 w-8 border-white/10 text-slate-300 hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDelete(p.id)}
                  className="h-8 w-8 border-white/10 text-slate-300 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
