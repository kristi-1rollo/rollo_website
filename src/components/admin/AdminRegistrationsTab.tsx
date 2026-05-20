import { useState, useMemo } from "react";
import { useRegistrations, type Registration } from "@/hooks/useRegistrations";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, ChevronDown, ChevronUp, Trash2, Download, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const normalizeExcelCell = (v: unknown) => {
  if (v == null) return "";
  return String(v).replace(/\r?\n+/g, " | ").replace(/\s{2,}/g, " ").trim();
};

const buildExcelWorkbook = (rows: Registration[]) => {
  const headers = ["Date", "Name", "Email", "Region", "Topics", "Message", "ID"];
  const data = rows.map((r) => [
    format(new Date(r.created_at), "dd.MM.yyyy HH:mm"),
    normalizeExcelCell(r.name),
    normalizeExcelCell(r.email),
    normalizeExcelCell(r.region),
    normalizeExcelCell((r.topics || []).join(", ")),
    normalizeExcelCell(r.message),
    normalizeExcelCell(r.id),
  ]);

  const sheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  sheet["!cols"] = [
    { wch: 18 },
    { wch: 24 },
    { wch: 32 },
    { wch: 18 },
    { wch: 24 },
    { wch: 80 },
    { wch: 38 },
  ];
  sheet["!rows"] = Array.from({ length: data.length + 1 }, (_, index) => ({ hpt: index === 0 ? 18 : 15 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Registrations");
  return workbook;
};

const downloadExcel = (rows: Registration[], filename: string) => {
  const workbook = buildExcelWorkbook(rows);
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export function AdminRegistrationsTab() {
  const { data: registrations = [], isLoading } = useRegistrations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteSingleId, setDeleteSingleId] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(
    () =>
      registrations.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.email.toLowerCase().includes(search.toLowerCase())
      ),
    [registrations, search]
  );

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));
    setSelectedIds(allSelected ? new Set() : new Set(filtered.map((r) => r.id)));
  };

  const deleteRecords = async (ids: string[]) => {
    const targets = registrations.filter((r) => ids.includes(r.id));
    if (targets.length === 0) return false;

    // 1. Auto-download Excel backup BEFORE deletion
    const stamp = format(new Date(), "yyyy-MM-dd_HHmm");
    downloadExcel(targets, `registrations_backup_BEFORE-DELETE_${stamp}.xlsx`);

    // 2. Delete (audit log trigger captures each row server-side too)
    const { error } = await supabase.from("registrations").delete().in("id", ids);
    if (error) {
      toast({ title: "Kustutamine ebaõnnestus", description: error.message, variant: "destructive" });
      return false;
    }

    toast({
      title: `Kustutatud: ${targets.length} ${targets.length === 1 ? "kirje" : "kirjet"}`,
      description: "Exceli varukoopia laeti alla ja tegevus salvestati auditi logisse.",
    });
    queryClient.invalidateQueries({ queryKey: ["registrations"] });
    return true;
  };

  const handleSingleDelete = async () => {
    if (!deleteSingleId) return;
    setIsDeleting(true);
    const ok = await deleteRecords([deleteSingleId]);
    setIsDeleting(false);
    if (ok) setDeleteSingleId(null);
  };

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    const ok = await deleteRecords(Array.from(selectedIds));
    setIsDeleting(false);
    if (ok) {
      setBulkDeleteOpen(false);
      setConfirmText("");
      setSelectedIds(new Set());
    }
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    downloadExcel(filtered, `registrations_${format(new Date(), "yyyy-MM-dd_HHmm")}.xlsx`);
  };

  const deleteTarget = registrations.find((r) => r.id === deleteSingleId);
  const allFilteredSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));
  const someFilteredSelected = filtered.some((r) => selectedIds.has(r.id));
  const selectedCount = selectedIds.size;
  const bulkConfirmRequired = selectedCount >= 3;
  const bulkCanDelete = !bulkConfirmRequired || confirmText === "KUSTUTA";

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
        <div className="flex gap-2">
          {selectedCount > 0 && (
            <Button
              variant="outline"
              onClick={() => setBulkDeleteOpen(true)}
              className="gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Kustuta valitud ({selectedCount})
            </Button>
          )}
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
                <TableHead className="w-10">
                  <Checkbox
                    checked={allFilteredSelected ? true : someFilteredSelected ? "indeterminate" : false}
                    onCheckedChange={toggleAll}
                    aria-label="Vali kõik"
                  />
                </TableHead>
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
                <TableRow
                  key={r.id}
                  className={`border-border hover:bg-muted/30 ${selectedIds.has(r.id) ? "bg-muted/20" : ""}`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(r.id)}
                      onCheckedChange={() => toggleOne(r.id)}
                      aria-label={`Vali ${r.name}`}
                    />
                  </TableCell>
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
                      onClick={() => setDeleteSingleId(r.id)}
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

      {/* Single delete dialog */}
      <AlertDialog
        open={!!deleteSingleId}
        onOpenChange={(open) => !open && !isDeleting && setDeleteSingleId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kustuta registreering?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                {deleteTarget && (
                  <p>
                    Kas oled kindel, et soovid kustutada kirje{" "}
                    <strong className="text-foreground">{deleteTarget.name}</strong> ({deleteTarget.email})?
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  ✓ Enne kustutamist laetakse automaatselt alla CSV-varukoopia.<br />
                  ✓ Tegevus salvestatakse auditi logisse (kes, millal, mis kirje).<br />
                  ✗ Seda tegevust ei saa tagasi võtta.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Tühista</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleSingleDelete(); }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Kustutan…" : "Laadi varukoopia ja kustuta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete dialog */}
      <AlertDialog
        open={bulkDeleteOpen}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setBulkDeleteOpen(false);
            setConfirmText("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              Kustuta {selectedCount} {selectedCount === 1 ? "kirje" : "kirjet"}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  Sa kustutad korraga{" "}
                  <strong className="text-foreground">{selectedCount}</strong>{" "}
                  registreeringut. Seda ei saa tagasi võtta.
                </p>
                <div className="text-xs text-muted-foreground rounded-[4px] border border-border bg-muted/30 p-3 space-y-1">
                  <p>✓ Enne kustutamist laetakse automaatselt alla CSV-varukoopia kõigi valitud kirjetega.</p>
                  <p>✓ Iga kustutamine logitakse serveris auditi logisse.</p>
                  <p>✗ Andmebaasist eemaldatakse kirjed jäädavalt.</p>
                </div>
                {bulkConfirmRequired && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      Kinnituseks trüki{" "}
                      <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
                        KUSTUTA
                      </code>
                      :
                    </p>
                    <Input
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="KUSTUTA"
                      autoFocus
                      className="bg-muted/50 border-border"
                    />
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Tühista</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleBulkDelete(); }}
              disabled={isDeleting || !bulkCanDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {isDeleting ? "Kustutan…" : `Laadi varukoopia ja kustuta ${selectedCount}`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
