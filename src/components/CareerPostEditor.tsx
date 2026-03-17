import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpsertCareerPost, type CareerPost } from "@/hooks/useCareerPosts";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Save } from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

interface Props {
  post?: CareerPost | null;
  onDone: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  formDataRef?: React.MutableRefObject<{ title: string; excerpt: string; content: string; location: string; type: string } | null>;
}

const CAREER_DRAFT_KEY_PREFIX = "career-draft-";
const DEBOUNCE_MS = 1200;

interface CareerDraftData {
  title?: string;
  location?: string;
  type?: string;
  excerpt?: string;
  content?: string;
  posterUrl?: string;
  savedAt?: string;
}

const CareerPostEditor = ({ post, onDone, onDirtyChange, formDataRef }: Props) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [location, setLocation] = useState(post?.location ?? "");
  const [type, setType] = useState(post?.type ?? "Full-time");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [posterUrl, setPosterUrl] = useState(post?.poster_url ?? "");
  const [uploading, setUploading] = useState(false);

  const initialRef = useRef({ title: post?.title ?? "", excerpt: post?.excerpt ?? "", content: post?.content ?? "" });
  const isDirty = title !== initialRef.current.title || excerpt !== initialRef.current.excerpt || content !== initialRef.current.content;

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  // Keep formDataRef in sync so parent can read current values for Save Draft
  useEffect(() => {
    if (formDataRef) {
      formDataRef.current = { title, excerpt, content, location, type };
    }
  }, [title, excerpt, content, location, type, formDataRef]);

  // --- Auto-draft (localStorage) ---
  const draftKey = `${CAREER_DRAFT_KEY_PREFIX}${post?.id ?? "new"}`;
  const draftDataRef = useRef<CareerDraftData | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftRestoredRef = useRef(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<CareerDraftData | null>(null);

  const saveDraftNow = useCallback(() => {
    if (!draftDataRef.current) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ ...draftDataRef.current, savedAt: new Date().toISOString() }));
      setLastSavedAt(new Date());
    } catch {}
  }, [draftKey]);

  useEffect(() => {
    draftDataRef.current = { title, excerpt, content, location, type, posterUrl: posterUrl };
  }, [title, excerpt, content, location, type, posterUrl]);

  useEffect(() => {
    if (!draftRestoredRef.current) return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(saveDraftNow, DEBOUNCE_MS);
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [title, excerpt, content, location, type, posterUrl, saveDraftNow]);

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const draft = JSON.parse(saved) as CareerDraftData;
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
    if (pendingDraft.location != null) setLocation(pendingDraft.location);
    if (pendingDraft.type != null) setType(pendingDraft.type);
    if (pendingDraft.posterUrl != null) setPosterUrl(pendingDraft.posterUrl);
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

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

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
      clearDraft();
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
