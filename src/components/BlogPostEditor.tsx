import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertPost, uploadThumbnail, type BlogPost, type MediaGalleryItem } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ArrowUp, ArrowDown, Plus, Sparkles, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ImageCropPositioner from "@/components/ImageCropPositioner";
import { supabase } from "@/integrations/supabase/client";

const TAGS = ["General", "Technology", "Security", "Field Test", "AI & Vision", "Industry", "Company"];

interface Props {
  post?: BlogPost | null;
  onDone: () => void;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = URL.createObjectURL(file);
  });
}

const BlogPostEditor = ({ post, onDone }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tag, setTag] = useState(post?.tag ?? "General");
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url ?? "");
  const [thumbWidth, setThumbWidth] = useState<number | "">(post?.thumbnail_width ?? "");
  const [thumbHeight, setThumbHeight] = useState<number | "">(post?.thumbnail_height ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [uploading, setUploading] = useState(false);
  const [thumbFocalX, setThumbFocalX] = useState<number>((post as any)?.thumbnail_focal_x ?? 50);
  const [thumbFocalY, setThumbFocalY] = useState<number>((post as any)?.thumbnail_focal_y ?? 50);
  const [thumbZoom, setThumbZoom] = useState<number>((post as any)?.thumbnail_zoom ?? 1);
  const [gallery, setGallery] = useState<MediaGalleryItem[]>(post?.media_gallery ?? []);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false);
  const upsert = useUpsertPost();
  const { toast } = useToast();

  const handleGenerateExcerpt = async () => {
    if (!content.trim()) return;
    setGeneratingExcerpt(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-excerpt", {
        body: { content },
      });
      if (error) throw error;
      if (data?.excerpt) {
        setExcerpt(data.excerpt);
        toast({ title: "Excerpt generated" });
      }
    } catch (err: any) {
      toast({ title: "AI generation failed", description: err.message, variant: "destructive" });
    } finally {
      setGeneratingExcerpt(false);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dims = await getImageDimensions(file);
      setThumbWidth(dims.width);
      setThumbHeight(dims.height);
      const url = await uploadThumbnail(file);
      setThumbnailUrl(url);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setGalleryUploading(true);
    try {
      const newItems: MediaGalleryItem[] = [];
      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        let width = 0, height = 0;
        if (!isVideo) {
          const dims = await getImageDimensions(file);
          width = dims.width;
          height = dims.height;
        }
        const url = await uploadThumbnail(file);
        newItems.push({ url, type: isVideo ? "video" : "image", width, height, caption: "" });
      }
      setGallery((prev) => [...prev, ...newItems]);
    } catch (err: any) {
      toast({ title: "Gallery upload failed", description: err.message, variant: "destructive" });
    } finally {
      setGalleryUploading(false);
      if (galleryFileRef.current) galleryFileRef.current.value = "";
    }
  };

  const moveGalleryItem = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= gallery.length) return;
    setGallery((prev) => {
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  };

  const updateGalleryItem = (index: number, updates: Partial<MediaGalleryItem>) => {
    setGallery((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const removeGalleryItem = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
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
        thumbnail_width: thumbWidth || null,
        thumbnail_height: thumbHeight || null,
        thumbnail_focal_x: thumbFocalX,
        thumbnail_focal_y: thumbFocalY,
        thumbnail_zoom: thumbZoom,
        media_gallery: gallery,
        is_published: isPublished,
        published_at: isPublished ? (post?.published_at ?? new Date().toISOString()) : null,
      } as any);
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
        <label className="text-sm text-muted-foreground mb-2 block">Thumbnail</label>
        {thumbnailUrl ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-md">
              <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-48 object-cover rounded-[4px] border border-border" />
              <button
                onClick={() => { setThumbnailUrl(""); setThumbWidth(""); setThumbHeight(""); setThumbFocalX(50); setThumbFocalY(50); setThumbZoom(1); }}
                className="absolute top-2 right-2 p-1 bg-background/80 rounded-[4px] text-foreground hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 max-w-md">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Width (px)</label>
                <Input
                  type="number"
                  value={thumbWidth}
                  onChange={(e) => setThumbWidth(e.target.value ? Number(e.target.value) : "")}
                  className="bg-muted/50 border-border text-foreground"
                  placeholder="Auto"
                />
              </div>
              <span className="text-muted-foreground mt-5">×</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Height (px)</label>
                <Input
                  type="number"
                  value={thumbHeight}
                  onChange={(e) => setThumbHeight(e.target.value ? Number(e.target.value) : "")}
                  className="bg-muted/50 border-border text-foreground"
                  placeholder="Auto"
                />
              </div>
            </div>
            {/* Crop positioner for thumbnail */}
            {thumbWidth && thumbHeight && (
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Pildi positsioneerimine</label>
                <ImageCropPositioner
                  src={thumbnailUrl}
                  width={Number(thumbWidth)}
                  height={Number(thumbHeight)}
                  initial={{ focalX: thumbFocalX, focalY: thumbFocalY, zoom: thumbZoom }}
                  onChange={({ focalX, focalY, zoom }) => {
                    setThumbFocalX(focalX);
                    setThumbFocalY(focalY);
                    setThumbZoom(zoom);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex flex-col items-center gap-2 px-6 py-6 border border-dashed border-border rounded-[4px] text-sm text-muted-foreground hover:border-muted-foreground/50 transition w-full max-w-md"
          >
            <Upload className="h-5 w-5" />
            <span>{uploading ? "Uploading…" : "Upload thumbnail"}</span>
            <span className="text-[10px] text-muted-foreground/60">Soovituslik: 1200 × 630 px · JPG / PNG / WebP</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </div>

      {/* Title */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted/50 border-border text-foreground" />
      </div>

      {/* Excerpt */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-muted-foreground">Excerpt</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={generatingExcerpt || !content.trim()}
            onClick={handleGenerateExcerpt}
            className="h-7 text-xs gap-1.5 border-border text-muted-foreground hover:text-primary hover:border-primary/40"
          >
            {generatingExcerpt ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            Generate with AI
          </Button>
        </div>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="bg-muted/50 border-border text-foreground" />
        <p className="text-[10px] text-muted-foreground/60 mt-1">SEO lühikirjeldus, max 160 tähemärki. Praegu: {excerpt.length}/160</p>
      </div>

      {/* Content — Rich Text Editor */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Content</label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Tag */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Tag</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 text-xs rounded-[4px] border transition ${
                tag === t
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "bg-muted/50 border-border text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Media Gallery */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Media Gallery</label>
        <div className="space-y-3">
          {gallery.map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-[4px] border border-border bg-muted/30">
              {/* Preview */}
              <div className="w-20 h-20 flex-shrink-0 rounded-[4px] overflow-hidden border border-border bg-background">
                {item.type === "video" ? (
                  <video src={item.url} className="w-full h-full object-cover" />
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-muted-foreground">W</label>
                    <Input
                      type="number"
                      value={item.width || ""}
                      onChange={(e) => updateGalleryItem(i, { width: Number(e.target.value) || 0 })}
                      className="h-7 text-xs bg-muted/50 border-border text-foreground"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-muted-foreground">H</label>
                    <Input
                      type="number"
                      value={item.height || ""}
                      onChange={(e) => updateGalleryItem(i, { height: Number(e.target.value) || 0 })}
                      className="h-7 text-xs bg-muted/50 border-border text-foreground"
                    />
                  </div>
                </div>
                <Input
                  value={item.caption || ""}
                  onChange={(e) => updateGalleryItem(i, { caption: e.target.value })}
                  placeholder="Caption (optional)"
                  className="h-7 text-xs bg-muted/50 border-border text-foreground"
                />
                {/* Crop positioner for gallery images */}
                {item.type === "image" && item.width > 0 && item.height > 0 && (
                  <ImageCropPositioner
                    src={item.url}
                    width={item.width}
                    height={item.height}
                    initial={{ focalX: item.focal_x ?? 50, focalY: item.focal_y ?? 50, zoom: item.zoom ?? 1 }}
                    onChange={({ focalX, focalY, zoom }) =>
                      updateGalleryItem(i, { focal_x: focalX, focal_y: focalY, zoom })
                    }
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1">
                <button onClick={() => moveGalleryItem(i, -1)} className="p-1 text-muted-foreground hover:text-foreground" disabled={i === 0}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => moveGalleryItem(i, 1)} className="p-1 text-muted-foreground hover:text-foreground" disabled={i === gallery.length - 1}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => removeGalleryItem(i)} className="p-1 text-destructive hover:text-destructive/80">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => galleryFileRef.current?.click()}
            disabled={galleryUploading}
            className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-[4px] text-sm text-muted-foreground hover:border-muted-foreground/50 transition w-full justify-center"
          >
            <Plus className="h-4 w-4" />
            {galleryUploading ? "Uploading…" : "Add images / videos"}
          </button>
          <input ref={galleryFileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleGalleryUpload} />
        </div>
      </div>

      {/* Publish toggle */}
      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={setIsPublished} />
        <span className="text-sm text-muted-foreground">{isPublished ? "Published" : "Draft"}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={upsert.isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-tight"
        >
          {upsert.isPending ? "Saving…" : "Save"}
        </Button>
        <Button variant="outline" onClick={onDone} className="border-border text-muted-foreground hover:text-foreground">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlogPostEditor;
