import { useState } from "react";
import { useRegistrations } from "@/hooks/useRegistrations";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, ChevronDown, ChevronUp, Trash2, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function AdminRegistrationsTab() {
  const { data: registrations = [], isLoading } = useRegistrations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const { error } = await supabase.from("registrations").delete().eq("id", deleteId);
    setIsDeleting(false);
    if (error) {
      toast({ title: "Kustutamine ebaõnnestus", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Kirje kustutatud", description: "Tegevus salvestati auditi logisse." });
    setDeleteId(null);
    queryClient.invalidateQueries({ queryKey: ["registrations"] });
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const headers = ["Date", "Name", "Email", "Region", "Topics", "Message"];
    const rows = filtered.map((r) => [
      format(new Date(r.created_at), "yyyy-MM-dd HH:mm:ss"),
      r.name, r.email, r.region,
      (r.topics || []).join("; "),
      r.message ?? "",
    ].map(escape).join(","));
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${format(new Date(), "yyyy-MM-dd_HHmm")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteTarget = registrations.find((r) => r.id === deleteId);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Otsi nime või e-maili järgi…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={filtered.length === 0}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Ekspordi CSV ({filtered.length})
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Laen registreeringuid…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">
          {search ? "Tulemusi ei leitud." : "Registreeringuid pole."}
        </p>
      ) : (
        <div className="border border-border rounded-[4px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Nimi</TableHead>
                <TableHead className="text-muted-foreground">E-mail</TableHead>
                <TableHead className="text-muted-foreground">Regioon</TableHead>
                <TableHead className="text-muted-foreground">Teemad</TableHead>
                <TableHead className="text-muted-foreground">Sõnum</TableHead>
                <TableHead className="text-muted-foreground">Kuupäev</TableHead>
                <TableHead className="text-muted-foreground w-12"></TableHead>
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
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(r.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      aria-label="Kustuta kirje"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kustuta registreering?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? (
                <>
                  Kas oled kindel, et soovid kustutada kirje <strong>{deleteTarget.name}</strong> ({deleteTarget.email})?
                  Seda tegevust ei saa tagasi võtta. Tegevus salvestatakse auditi logisse.
                </>
              ) : "Kas oled kindel?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Tühista</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDelete(); }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Kustutan…" : "Kustuta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
