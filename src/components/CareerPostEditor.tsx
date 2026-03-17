import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertCareerPost, type CareerPost } from "@/hooks/useCareerPosts";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

interface Props {
  post?: CareerPost | null;
  onDone: () => void;
}

const CareerPostEditor = ({ post, onDone }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [location, setLocation] = useState(post?.location ?? "");
  const [type, setType] = useState(post?.type ?? "Full-time");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);

  const upsert = useUpsertCareerPost();
  const { toast } = useToast();

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
