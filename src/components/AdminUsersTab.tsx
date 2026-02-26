import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Plus, Loader2, Shield, ShieldOff, KeyRound } from "lucide-react";
import { format } from "date-fns";

interface Profile {
  email: string | null;
  full_name: string | null;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

interface AuditEntry {
  id: string;
  actor_id: string;
  action: string;
  target_user_id: string | null;
  metadata: any;
  created_at: string;
}

/** Admin Users management tab */
export const AdminUsersTab = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resettingId, setResettingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRoles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("user_roles").select("*");
    if (error) {
      toast({ title: "Viga rollide laadimisel", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    setRoles(data ?? []);

    // Fetch profiles for all user_ids
    const userIds = (data ?? []).map((r) => r.user_id);
    if (userIds.length > 0) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", userIds);
      const map: Record<string, Profile> = {};
      (profileData ?? []).forEach((p: any) => {
        map[p.id] = { email: p.email, full_name: p.full_name };
      });
      setProfiles(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const displayName = (userId: string) => {
    const p = profiles[userId];
    if (p?.full_name && p?.email) return `${p.full_name} (${p.email})`;
    if (p?.email) return p.email;
    if (p?.full_name) return p.full_name;
    return userId.slice(0, 8) + "…";
  };

  const grantAdmin = async () => {
    if (!newEmail.trim()) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admin", {
        body: { action: "grant", email: newEmail.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: data?.message || "Admin õigused antud" });
      setNewEmail("");
      fetchRoles();
    } catch (err: any) {
      toast({ title: "Viga", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const revokeAdmin = async (userId: string) => {
    if (!confirm("Eemalda admin õigused sellelt kasutajalt?")) return;
    try {
      const { data, error } = await supabase.functions.invoke("manage-admin", {
        body: { action: "revoke", user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: "Admin õigused eemaldatud" });
      fetchRoles();
    } catch (err: any) {
      toast({ title: "Viga", description: err.message, variant: "destructive" });
    }
  };

  const sendPasswordReset = async (userId: string) => {
    setResettingId(userId);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admin", {
        body: { action: "send_reset", user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: data?.message || "Parooli taastamise kiri saadetud" });
    } catch (err: any) {
      toast({ title: "Viga", description: err.message, variant: "destructive" });
    } finally {
      setResettingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add admin */}
      <div className="flex gap-3 max-w-md">
        <Input
          placeholder="kasutaja@email.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && grantAdmin()}
          className="bg-muted/50 border-border text-foreground"
        />
        <Button
          onClick={grantAdmin}
          disabled={submitting || !newEmail.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-tight gap-1.5"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Lisa admin
        </Button>
      </div>
      <p className="text-[11px] text-muted-foreground -mt-4">
        Kui kasutajat pole, saadetakse kutse parooli loomiseks. Olemasolevale kasutajale antakse admin roll.
      </p>

      {/* Existing admins */}
      {loading ? (
        <p className="text-muted-foreground">Laen…</p>
      ) : roles.length === 0 ? (
        <p className="text-muted-foreground">Rolle pole leitud.</p>
      ) : (
        <div className="border border-border rounded-[4px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Kasutaja</TableHead>
                <TableHead className="text-muted-foreground">Roll</TableHead>
                <TableHead className="text-muted-foreground text-right">Tegevused</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id} className="border-border hover:bg-muted/30">
                  <TableCell className="text-foreground text-sm">{displayName(r.user_id)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/40 text-primary text-[10px] gap-1">
                      <Shield className="h-3 w-3" />
                      {r.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendPasswordReset(r.user_id)}
                        disabled={resettingId === r.user_id}
                        className="h-7 text-xs gap-1 border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                        title="Saada parooli taastamise kiri"
                      >
                        {resettingId === r.user_id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <KeyRound className="h-3 w-3" />
                        )}
                        Reset
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => revokeAdmin(r.user_id)}
                        className="h-7 text-xs gap-1 border-border text-muted-foreground hover:text-destructive hover:border-destructive/40"
                      >
                        <ShieldOff className="h-3 w-3" />
                        Eemalda
                      </Button>
                    </div>
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

/** Audit log tab */
export const AdminAuditTab = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("admin_audit_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) {
        toast({ title: "Viga auditi laadimisel", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      setEntries(data ?? []);

      // Collect all unique user IDs
      const ids = new Set<string>();
      (data ?? []).forEach((e) => {
        if (e.actor_id) ids.add(e.actor_id);
        if (e.target_user_id) ids.add(e.target_user_id);
      });
      if (ids.size > 0) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("id, email, full_name")
          .in("id", Array.from(ids));
        const map: Record<string, Profile> = {};
        (profileData ?? []).forEach((p: any) => {
          map[p.id] = { email: p.email, full_name: p.full_name };
        });
        setProfiles(map);
      }
      setLoading(false);
    })();
  }, []);

  const displayName = (userId: string | null) => {
    if (!userId) return "—";
    const p = profiles[userId];
    if (p?.email) return p.email;
    if (p?.full_name) return p.full_name;
    return userId.slice(0, 8) + "…";
  };

  const actionLabels: Record<string, string> = {
    grant_admin: "Admin roll antud",
    invite_admin: "Admin kutse saadetud",
    revoke_admin: "Admin roll eemaldatud",
    send_password_reset: "Parooli reset saadetud",
    blog_post_created: "Blogipostitus loodud",
    blog_post_updated: "Blogipostitus muudetud",
    blog_post_published: "Blogipostitus avaldatud",
    blog_post_unpublished: "Blogipostitus peidetud",
    blog_post_deleted: "Blogipostitus kustutatud",
  };

  return (
    <div>
      {loading ? (
        <p className="text-muted-foreground">Laen…</p>
      ) : entries.length === 0 ? (
        <p className="text-muted-foreground">Audit logi on tühi.</p>
      ) : (
        <div className="border border-border rounded-[4px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Aeg</TableHead>
                <TableHead className="text-muted-foreground">Tegevus</TableHead>
                <TableHead className="text-muted-foreground">Tegija</TableHead>
                <TableHead className="text-muted-foreground">Sihtmärk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e) => (
                <TableRow key={e.id} className="border-border hover:bg-muted/30">
                  <TableCell className="text-muted-foreground whitespace-nowrap text-xs">
                    {format(new Date(e.created_at), "dd.MM.yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] border-border text-foreground">
                      {actionLabels[e.action] || e.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground text-xs">{displayName(e.actor_id)}</TableCell>
                  <TableCell className="text-foreground text-xs">{displayName(e.target_user_id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
