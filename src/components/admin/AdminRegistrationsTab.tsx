import { useState } from "react";
import { useRegistrations } from "@/hooks/useRegistrations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

export function AdminRegistrationsTab() {
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
}
