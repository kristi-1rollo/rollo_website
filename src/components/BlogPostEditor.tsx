import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertPost, uploadThumbnail, type BlogPost } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const TAGS = ["General", "Technology", "Security", "Field Test", "AI & Vision", "Industry", "Company"];

interface Props {
  post?: BlogPost | null;
  onDone: () => void;
}

const BlogPostEditor = ({ post, onDone }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tag, setTag] = useState(post?.tag ?? "General");
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const upsert = useUpsertPost();
  const { toast } = useToast();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadThumbnail(file);
      setThumbnailUrl(url);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !excerpt.trim()) {
      toast({ title: "Title and excerpt are required", variant: "destructive" });
      return;
    }

    try {
      await upsert.mutateAsync({
        ...(post?.id ? { id: post.id } : {}),
        title,
        excerpt,
        content,
        tag,
        thumbnail_url: thumbnailUrl || null,
        is_published: isPublished,
        published_at: isPublished ? (post?.published_at ?? new Date().toISOString()) : null,
      });
      toast({ title: post?.id ? "Post updated" : "Post created" });
      onDone();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Thumbnail */}
      <div>
        <label className="text-sm text-slate-300 mb-2 block">Thumbnail</label>
        {thumbnailUrl ? (
          <div className="relative w-full max-w-md">
            <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-48 object-cover rounded-[4px] border border-white/10" />
            <button
              onClick={() => setThumbnailUrl("")}
              className="absolute top-2 right-2 p-1 bg-black/60 rounded-[4px] text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-3 border border-dashed border-white/20 rounded-[4px] text-sm text-slate-400 hover:border-white/40 transition"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload image"}
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </div>

      {/* Title */}
      <div>
        <label className="text-sm text-slate-300 mb-2 block">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/5 border-white/10 text-white" />
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-sm text-slate-300 mb-2 block">Excerpt</label>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="bg-white/5 border-white/10 text-white" />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm text-slate-300 mb-2 block">Content</label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="bg-white/5 border-white/10 text-white" />
      </div>

      {/* Tag */}
      <div>
        <label className="text-sm text-slate-300 mb-2 block">Tag</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 text-xs rounded-[4px] border transition ${
                tag === t
                  ? "bg-[#B4FF33]/20 border-[#B4FF33]/40 text-[#B4FF33]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Publish toggle */}
      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={setIsPublished} />
        <span className="text-sm text-slate-300">{isPublished ? "Published" : "Draft"}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={upsert.isPending}
          className="bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 font-bold uppercase tracking-tight"
        >
          {upsert.isPending ? "Saving…" : "Save"}
        </Button>
        <Button variant="outline" onClick={onDone} className="border-white/10 text-slate-300 hover:text-white">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlogPostEditor;
