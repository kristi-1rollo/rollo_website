import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertPost, uploadThumbnail, type BlogPost, type MediaGalleryItem } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ArrowUp, ArrowDown, Plus, Sparkles, Loader2, Lock, Unlock, GripVertical, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ImageCropPositioner from "@/components/ImageCropPositioner";
import { supabase } from "@/integrations/supabase/client";

const TAGS = ["General", "Technology", "Security", "Field Test", "AI & Vision", "Industry", "Company"];

interface Props {
  post?: BlogPost | null;
  onDone: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = URL.createObjectURL(file);
  });
}

const DRAFT_KEY_PREFIX = "blog-draft-";
const DEBOUNCE_MS = 1200;

interface DraftData {
  title?: string;
  excerpt?: string;
  content?: string;
  tag?: string;
  thumbnailUrl?: string;
  thumbWidth?: number | "";
  thumbHeight?: number | "";
  gallery?: MediaGalleryItem[];
  thumbFocalX?: number;
  thumbFocalY?: number;
  thumbZoom?: number;
  savedAt?: string;
}
const BlogPostEditor = ({ post, onDone, onDirtyChange }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tag, setTag] = useState(post?.tag ?? "General");
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url ?? "");
  const [thumbWidth, setThumbWidth] = useState<number | "">(post?.thumbnail_width ?? "");
  const [thumbHeight, setThumbHeight] = useState<number | "">(post?.thumbnail_height ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [uploading, setUploading] = useState(false);
  const [thumbFocalX, setThumbFocalX] = useState<number>(post?.thumbnail_focal_x ?? 50);
  const [thumbFocalY, setThumbFocalY] = useState<number>(post?.thumbnail_focal_y ?? 50);
  const [thumbZoom, setThumbZoom] = useState<number>(post?.thumbnail_zoom ?? 1);
  const [gallery, setGallery] = useState<MediaGalleryItem[]>(post?.media_gallery ?? []);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [thumbLocked, setThumbLocked] = useState(true);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<DraftData | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false);
  const upsert = useUpsertPost();
  const { toast } = useToast();

  // Original aspect ratio for thumbnail proportion lock
  const thumbOriginalRatio = useRef<number | null>(null);
  useEffect(() => {
    if (post?.thumbnail_width && post?.thumbnail_height) {
      thumbOriginalRatio.current = post.thumbnail_width / post.thumbnail_height;
    }
  }, []);

  // --- Robust Auto-draft ---
  const draftKey = `${DRAFT_KEY_PREFIX}${post?.id ?? "new"}`;
  const draftDataRef = useRef<DraftData | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftRestoredRef = useRef(false);

  const saveDraftNow = useCallback(() => {
    if (!draftDataRef.current) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ ...draftDataRef.current, savedAt: new Date().toISOString() }));
      setLastSavedAt(new Date());
    } catch {}
  }, [draftKey]);

  // Keep ref in sync with current state
  useEffect(() => {
    draftDataRef.current = { title, excerpt, content, tag, thumbnailUrl, thumbWidth, thumbHeight, gallery, thumbFocalX, thumbFocalY, thumbZoom };
  }, [title, excerpt, content, tag, thumbnailUrl, thumbWidth, thumbHeight, gallery, thumbFocalX, thumbFocalY, thumbZoom]);

  // Debounced save on every change
  useEffect(() => {
    if (!draftRestoredRef.current) return; // Don't save before initial restore check
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(saveDraftNow, DEBOUNCE_MS);
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [title, excerpt, content, tag, thumbnailUrl, thumbWidth, thumbHeight, gallery, thumbFocalX, thumbFocalY, thumbZoom, saveDraftNow]);

  // Save on beforeunload, visibilitychange, and unmount
  useEffect(() => {
    const flushDraft = () => saveDraftNow();
    const handleVisibility = () => { if (document.visibilityState === "hidden") flushDraft(); };
    window.addEventListener("beforeunload", flushDraft);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      flushDraft();
      window.removeEventListener("beforeunload", flushDraft);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [saveDraftNow]);

  // Restore draft on mount — show banner instead of browser confirm
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const draft = JSON.parse(saved) as DraftData;
        setPendingDraft(draft);
        setShowDraftBanner(true);
      } else {
        draftRestoredRef.current = true;
      }
    } catch {
      draftRestoredRef.current = true;
    }
  }, []);

  const restoreDraft = () => {
    if (!pendingDraft) return;
    if (pendingDraft.title != null) setTitle(pendingDraft.title);
    if (pendingDraft.excerpt != null) setExcerpt(pendingDraft.excerpt);
    if (pendingDraft.content != null) setContent(pendingDraft.content);
    if (pendingDraft.tag != null) setTag(pendingDraft.tag);
    if (pendingDraft.thumbnailUrl != null) setThumbnailUrl(pendingDraft.thumbnailUrl);
    if (pendingDraft.thumbWidth != null) setThumbWidth(pendingDraft.thumbWidth);
    if (pendingDraft.thumbHeight != null) setThumbHeight(pendingDraft.thumbHeight);
    if (pendingDraft.gallery != null) setGallery(pendingDraft.gallery);
    if (pendingDraft.thumbFocalX != null) setThumbFocalX(pendingDraft.thumbFocalX);
    if (pendingDraft.thumbFocalY != null) setThumbFocalY(pendingDraft.thumbFocalY);
    if (pendingDraft.thumbZoom != null) setThumbZoom(pendingDraft.thumbZoom);
    toast({ title: "Mustand taastatud" });
    setShowDraftBanner(false);
    setPendingDraft(null);
    draftRestoredRef.current = true;
  };

  const discardDraft = () => {
    localStorage.removeItem(draftKey);
    setShowDraftBanner(false);
    setPendingDraft(null);
    draftRestoredRef.current = true;
  };

  const clearDraft = useCallback(() => {
    localStorage.removeItem(draftKey);
  }, [draftKey]);

  // --- Thumbnail proportion lock handlers ---
  const handleThumbWidthChange = (val: string) => {
    const w = val ? Number(val) : "";
    setThumbWidth(w);
    if (thumbLocked && thumbOriginalRatio.current && w) {
      setThumbHeight(Math.round(w / thumbOriginalRatio.current));
    }
  };

  const handleThumbHeightChange = (val: string) => {
    const h = val ? Number(val) : "";
    setThumbHeight(h);
    if (thumbLocked && thumbOriginalRatio.current && h) {
      setThumbWidth(Math.round(h * thumbOriginalRatio.current));
    }
  };

  // --- Gallery proportion lock per-item ---
  const galleryRatios = useRef<Map<number, number>>(new Map());

  const handleGalleryWidthChange = (index: number, val: number, item: MediaGalleryItem) => {
    if (!galleryRatios.current.has(index) && item.width && item.height) {
      galleryRatios.current.set(index, item.width / item.height);
    }
    const ratio = galleryRatios.current.get(index);
    const updates: Partial<MediaGalleryItem> = { width: val };
    if (ratio && val) updates.height = Math.round(val / ratio);
    updateGalleryItem(index, updates);
  };

  const handleGalleryHeightChange = (index: number, val: number, item: MediaGalleryItem) => {
    if (!galleryRatios.current.has(index) && item.width && item.height) {
      galleryRatios.current.set(index, item.width / item.height);
    }
    const ratio = galleryRatios.current.get(index);
    const updates: Partial<MediaGalleryItem> = { height: val };
    if (ratio && val) updates.width = Math.round(val * ratio);
    updateGalleryItem(index, updates);
  };

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "AI generation failed", description: message, variant: "destructive" });
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
      thumbOriginalRatio.current = dims.width / dims.height;
      const url = await uploadThumbnail(file);
      setThumbnailUrl(url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Upload failed", description: message, variant: "destructive" });
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Gallery upload failed", description: message, variant: "destructive" });
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

  // --- Drag & Drop for gallery ---
  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = dragIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }
    setGallery((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, item);
      return copy;
    });
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
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
      clearDraft();
      toast({ title: post?.id ? "Post updated" : "Post created" });
      onDone();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Draft restore banner */}
      {showDraftBanner && (
        <div className="flex items-center gap-3 p-3 rounded-[4px] border border-primary/40 bg-primary/5">
          <Save className="h-4 w-4 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">
            Leiti salvestamata mustand{pendingDraft?.savedAt ? ` (${new Date(pendingDraft.savedAt).toLocaleString("et-EE")})` : ""}. Kas soovid selle taastada?
          </p>
          <Button size="sm" onClick={restoreDraft} className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
            Taasta
          </Button>
          <Button size="sm" variant="outline" onClick={discardDraft} className="h-7 text-xs border-border text-muted-foreground hover:text-foreground">
            Hülga
          </Button>
        </div>
      )}

      {/* Last saved indicator */}
      {lastSavedAt && (
        <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
          <Save className="h-3 w-3" />
          Mustand salvestatud: {lastSavedAt.toLocaleTimeString("et-EE")}
        </p>
      )}

      {/* Thumbnail */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Thumbnail</label>
        {thumbnailUrl ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-md">
              <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-48 object-cover rounded-[4px] border border-border" loading="lazy" decoding="async" />
              <button
                onClick={() => { setThumbnailUrl(""); setThumbWidth(""); setThumbHeight(""); setThumbFocalX(50); setThumbFocalY(50); setThumbZoom(1); thumbOriginalRatio.current = null; }}
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
                  onChange={(e) => handleThumbWidthChange(e.target.value)}
                  className="bg-muted/50 border-border text-foreground"
                  placeholder="Auto"
                />
              </div>
              <button
                type="button"
                onClick={() => setThumbLocked(!thumbLocked)}
                className="mt-5 p-1.5 rounded-[4px] text-muted-foreground hover:text-foreground transition"
                title={thumbLocked ? "Vabasta proportsioonid" : "Lukusta proportsioonid"}
              >
                {thumbLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Height (px)</label>
                <Input
                  type="number"
                  value={thumbHeight}
                  onChange={(e) => handleThumbHeightChange(e.target.value)}
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
                  displayAspectRatio="16/9"
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
            <div
              key={i}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`flex gap-3 items-start p-3 rounded-[4px] border transition ${
                dragOverIndex === i
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-muted/30"
              }`}
            >
              {/* Drag handle */}
              <div className="flex-shrink-0 mt-6 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Preview */}
              <div className="w-20 h-20 flex-shrink-0 rounded-[4px] overflow-hidden border border-border bg-background">
                {item.type === "video" ? (
                  <video src={item.url} className="w-full h-full object-cover" />
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                )}
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-[10px] text-muted-foreground">W</label>
                    <Input
                      type="number"
                      value={item.width || ""}
                      onChange={(e) => handleGalleryWidthChange(i, Number(e.target.value) || 0, item)}
                      className="h-7 text-xs bg-muted/50 border-border text-foreground"
                    />
                  </div>
                  <Lock className="h-3.5 w-3.5 text-muted-foreground mb-2 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[10px] text-muted-foreground">H</label>
                    <Input
                      type="number"
                      value={item.height || ""}
                      onChange={(e) => handleGalleryHeightChange(i, Number(e.target.value) || 0, item)}
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
