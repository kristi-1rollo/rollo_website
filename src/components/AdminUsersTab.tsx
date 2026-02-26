import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Plus, Trash2, Loader2, Shield, ShieldOff } from "lucide-react";
import { format } from "date-fns";

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
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchRoles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("user_roles").select("*");
    if (error) {
      toast({ title: "Viga rollide laadimisel", description: error.message, variant: "destructive" });
    } else {
      setRoles(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const grantAdmin = async () => {
    if (!newEmail.trim()) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admin", {
        body: { action: "grant", email: newEmail.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: "Admin õigused antud" });
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

  return (
    <div className="space-y-6">
      {/* Add admin */}
      <div className="flex gap-3 max-w-md">
        <Input
          placeholder="kasutaja@email.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
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
                <TableHead className="text-muted-foreground">Kasutaja ID</TableHead>
                <TableHead className="text-muted-foreground">Roll</TableHead>
                <TableHead className="text-muted-foreground text-right">Tegevused</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id} className="border-border hover:bg-muted/30">
                  <TableCell className="text-foreground font-mono text-xs">{r.user_id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/40 text-primary text-[10px] gap-1">
                      <Shield className="h-3 w-3" />
                      {r.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => revokeAdmin(r.user_id)}
                      className="h-7 text-xs gap-1 border-border text-muted-foreground hover:text-destructive hover:border-destructive/40"
                    >
                      <ShieldOff className="h-3 w-3" />
                      Eemalda
                    </Button>
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
      } else {
        setEntries(data ?? []);
      }
      setLoading(false);
    })();
  }, []);

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
                      {e.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground font-mono text-xs">{e.actor_id?.slice(0, 8)}…</TableCell>
                  <TableCell className="text-foreground font-mono text-xs">
                    {e.target_user_id ? `${e.target_user_id.slice(0, 8)}…` : "—"}
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
