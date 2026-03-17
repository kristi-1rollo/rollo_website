import { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllPosts, useDeletePost, useUpsertPost, type BlogPost } from "@/hooks/useBlogPosts";
import { useAllCareerPosts, useDeleteCareerPost, useUpsertCareerPost, type CareerPost } from "@/hooks/useCareerPosts";
import { useRegistrations } from "@/hooks/useRegistrations";
import BlogPostEditor from "@/components/BlogPostEditor";
import CareerPostEditor from "@/components/CareerPostEditor";
import { AdminUsersTab, AdminAuditTab } from "@/components/AdminUsersTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, Search, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { format } from "date-fns";

/* ─── Blog Tab ─── */
const BlogTab = () => {
  const { data: posts = [], isLoading } = useAllPosts();
  const deletePost = useDeletePost();
  const upsertPost = useUpsertPost();
  const { toast } = useToast();
  const [editing, setEditing] = useState<BlogPost | null | "new">(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const pendingCloseRef = useRef(false);
  const blogFormRef = useRef<{ title: string; excerpt: string; content: string; tag: string } | null>(null);

  // pushState when entering editor, popstate to go back to list
  useEffect(() => {
    if (!editing) return;
    window.history.pushState({ adminEditor: true }, "");
    const onPopState = () => {
      if (isDirty) {
        setShowLeaveDialog(true);
        // re-push so user stays on admin
        window.history.pushState({ adminEditor: true }, "");
      } else {
        setEditing(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [editing, isDirty]);

  const handleClose = useCallback(() => {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      setEditing(null);
    }
  }, [isDirty]);

  const handleDiscard = () => {
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  };

  const handleSaveDraft = async () => {
    const formData = blogFormRef.current;
    const postId = editing && editing !== "new" ? editing.id : undefined;
    if (!formData || !formData.title.trim()) {
      handleDiscard();
      return;
    }
    try {
      await upsertPost.mutateAsync({
        ...(postId ? { id: postId } : {}),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tag: formData.tag,
        is_published: false,
        published_at: null,
      } as any);
      toast({ title: "Saved as draft" });
    } catch {}
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost.mutateAsync(id);
      toast({ title: "Post deleted" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    }
  };

  if (editing) {
    return (
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {editing === "new" ? "New Post" : "Edit Post"}
        </h2>
        <BlogPostEditor
          post={editing === "new" ? null : editing}
          onDone={() => { setIsDirty(false); setEditing(null); }}
          onDirtyChange={setIsDirty}
          formDataRef={blogFormRef}
        />
        <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Would you like to save as draft or discard?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="outline" onClick={handleDiscard}>Discard</Button>
              <Button onClick={handleSaveDraft}>Save Draft</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setEditing("new")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-tight"
        >
          <Plus className="h-4 w-4 mr-1" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading posts…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 border border-border bg-card/50 rounded-[4px]"
            >
              {p.thumbnail_url && (
                <img
                  src={p.thumbnail_url}
                  alt=""
                  className="w-16 h-16 object-cover rounded-[4px] border border-border flex-shrink-0"
                />
              )}
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
                    {p.tag}
                  </span>
                </div>
                <p className="text-foreground font-medium truncate">{p.title}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setEditing(p)}
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
};

/* ─── Careers Tab ─── */
const CareersTab = () => {
  const { data: posts = [], isLoading } = useAllCareerPosts();
  const deletePost = useDeleteCareerPost();
  const upsertPost = useUpsertCareerPost();
  const { toast } = useToast();
  const [editing, setEditing] = useState<CareerPost | null | "new">(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  useEffect(() => {
    if (!editing) return;
    window.history.pushState({ adminEditor: true }, "");
    const onPopState = () => {
      if (isDirty) {
        setShowLeaveDialog(true);
        window.history.pushState({ adminEditor: true }, "");
      } else {
        setEditing(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [editing, isDirty]);

  const handleClose = useCallback(() => {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      setEditing(null);
    }
  }, [isDirty]);

  const handleDiscard = () => {
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  };

  const handleSaveDraft = async () => {
    const current = editing;
    if (!current || current === "new") {
      handleDiscard();
      return;
    }
    try {
      await upsertPost.mutateAsync({
        id: current.id,
        title: current.title,
        content: current.content,
        excerpt: current.excerpt,
        location: current.location,
        type: current.type,
        is_published: false,
        published_at: null,
      } as any);
      toast({ title: "Saved as draft" });
    } catch {}
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  };

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

  if (editing) {
    return (
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {editing === "new" ? "New Position" : "Edit Position"}
        </h2>
        <CareerPostEditor
          post={editing === "new" ? null : editing}
          onDone={() => { setIsDirty(false); setEditing(null); }}
          onDirtyChange={setIsDirty}
        />
        <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Would you like to save as draft or discard?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="outline" onClick={handleDiscard}>Discard</Button>
              <Button onClick={handleSaveDraft}>Save Draft</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setEditing("new")}
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
                  onClick={() => setEditing(p)}
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
};

/* ─── Registrations Tab ─── */
const RegistrationsTab = () => {
  const { data: registrations = [], isLoading } = useRegistrations();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading registrations…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">
          {search ? "No results found." : "No registrations yet."}
        </p>
      ) : (
        <div className="border border-border rounded-[4px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Region</TableHead>
                <TableHead className="text-muted-foreground">Topics</TableHead>
                <TableHead className="text-muted-foreground">Message</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-border hover:bg-muted/30">
                  <TableCell className="text-foreground font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.email}</TableCell>
                  <TableCell className="text-muted-foreground">{r.region}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {r.topics.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[10px] border-border text-muted-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {r.message ? (
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === r.id ? null : r.id)
                        }
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        <span className={expandedId === r.id ? "" : "truncate max-w-[150px] inline-block"}>
                          {r.message}
                        </span>
                        {expandedId === r.id ? (
                          <ChevronUp className="h-3 w-3 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-3 w-3 flex-shrink-0" />
                        )}
                      </button>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {format(new Date(r.created_at), "dd.MM.yyyy HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

/* ─── Admin Page ─── */
const Admin = () => {
  const { user, loading, isAdmin, signOut } = useAuth();

  if (loading) {
    return <div className="pt-24 pb-16 text-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-muted-foreground">You do not have admin access.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin</h1>
        <Button
          variant="outline"
          onClick={signOut}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-1" /> Sign Out
        </Button>
      </div>

      <Tabs defaultValue="blog">
        <TabsList className="bg-muted/50 border border-border mb-6">
          <TabsTrigger
            value="blog"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Blog
          </TabsTrigger>
          <TabsTrigger
            value="careers"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Careers
          </TabsTrigger>
          <TabsTrigger
            value="registrations"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Registrations
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <BlogTab />
        </TabsContent>
        <TabsContent value="careers">
          <CareersTab />
        </TabsContent>
        <TabsContent value="registrations">
          <RegistrationsTab />
        </TabsContent>
        <TabsContent value="users">
          <AdminUsersTab />
        </TabsContent>
        <TabsContent value="audit">
          <AdminAuditTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
