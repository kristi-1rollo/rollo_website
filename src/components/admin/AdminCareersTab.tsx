import { useRef, useCallback } from "react";
import { useAllCareerPosts, useDeleteCareerPost, useUpsertCareerPost, type CareerPost } from "@/hooks/useCareerPosts";
import CareerPostEditor from "@/components/CareerPostEditor";
import { LeaveDialog } from "@/components/admin/LeaveDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { useEditorGuard } from "@/hooks/useEditorGuard";

/** Career form data shape exposed via formDataRef */
export interface CareerFormData {
  title: string;
  excerpt: string;
  content: string;
  location: string;
  type: string;
  posterUrl: string;
}

export function AdminCareersTab() {
  const { data: posts = [], isLoading } = useAllCareerPosts();
  const deletePost = useDeleteCareerPost();
  const upsertPost = useUpsertCareerPost();
  const { toast } = useToast();
  const formRef = useRef<CareerFormData | null>(null);

  const handleSaveDraft = useCallback(async () => {
    const fd = formRef.current;
    if (!fd || !fd.title.trim()) return;
    try {
      await upsertPost.mutateAsync({
        title: fd.title,
        content: fd.content,
        excerpt: fd.excerpt,
        location: fd.location,
        type: fd.type,
        poster_url: fd.posterUrl || null,
        is_published: false,
        published_at: null,
      } as Parameters<typeof upsertPost.mutateAsync>[0]);
      toast({ title: "Saved as draft" });
    } catch {
      // silently ignore
    }
  }, [upsertPost, toast]);

  const guard = useEditorGuard<CareerPost>({ onSaveDraft: handleSaveDraft });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this position?")) return;
    try {
      await deletePost.mutateAsync(id);
      toast({ title: "Position deleted" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    }
  };

  if (guard.editing) {
    return (
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {guard.editing === "new" ? "New Position" : "Edit Position"}
        </h2>
        <CareerPostEditor
          post={guard.editing === "new" ? null : guard.editing}
          onDone={guard.closeClean}
          onDirtyChange={guard.setIsDirty}
          formDataRef={formRef}
        />
        <LeaveDialog
          open={guard.showLeaveDialog}
          onOpenChange={guard.setShowLeaveDialog}
          onDiscard={guard.confirmDiscard}
          onSaveDraft={guard.confirmSaveDraft}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => guard.setEditing("new")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-tight"
        >
          <Plus className="h-4 w-4 mr-1" /> New Position
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading positions…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No positions yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 border border-border bg-card/50 rounded-[4px]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                      p.is_published
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.type}
                  </span>
                  {p.location && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {p.location}
                    </span>
                  )}
                </div>
                <p className="text-foreground font-medium truncate">{p.title}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => guard.setEditing(p)}
                  className="h-8 w-8 border-border text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDelete(p.id)}
                  className="h-8 w-8 border-border text-muted-foreground hover:text-destructive"
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
}
