import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertCareerPost, type CareerPost } from "@/hooks/useCareerPosts";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

interface Props {
  post?: CareerPost | null;
  onDone: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

const CareerPostEditor = ({ post, onDone }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [location, setLocation] = useState(post?.location ?? "");
  const [type, setType] = useState(post?.type ?? "Full-time");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [posterUrl, setPosterUrl] = useState(post?.poster_url ?? "");
  const [uploading, setUploading] = useState(false);

  const upsert = useUpsertCareerPost();
  const { toast } = useToast();

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("career-posters")
        .upload(path, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage.from("career-posters").getPublicUrl(path);
      setPosterUrl(data.publicUrl);
      toast({ title: "Poster uploaded" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast({ title: "Upload failed", description: message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    try {
      await upsert.mutateAsync({
        ...(post?.id ? { id: post.id } : {}),
        title,
        location,
        type,
        excerpt,
        content,
        is_published: isPublished,
        published_at: isPublished ? (post?.published_at ?? new Date().toISOString()) : null,
        poster_url: posterUrl || null,
      } as any);
      toast({ title: post?.id ? "Position updated" : "Position created" });
      onDone();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Robotics Software Engineer"
          className="bg-muted/50 border-border text-foreground"
        />
      </div>

      {/* Location & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Location</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Tallinn, Estonia"
            className="bg-muted/50 border-border text-foreground"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-muted/50 px-3 text-sm text-foreground"
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Poster Image */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Poster Image (794×1123px recommended)
        </label>
        {posterUrl ? (
          <div className="relative inline-block">
            <img
              src={posterUrl}
              alt="Poster preview"
              className="w-40 h-auto rounded-lg border border-border"
            />
            <button
              type="button"
              onClick={() => setPosterUrl("")}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition w-fit">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {uploading ? "Uploading…" : "Upload poster"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Short description</label>
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary shown in the listing…"
          rows={3}
          className="bg-muted/50 border-border text-foreground"
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Full description</label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={setIsPublished} />
        <span className="text-sm text-foreground">
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleSave}
          disabled={upsert.isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-tight"
        >
          {upsert.isPending ? "Saving…" : "Save"}
        </Button>
        <Button
          variant="outline"
          onClick={onDone}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CareerPostEditor;
