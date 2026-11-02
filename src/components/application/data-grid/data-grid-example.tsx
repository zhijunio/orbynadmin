"use client";

import { useMemo, useRef, useState } from "react";
import { IconDownload, IconSearch, IconTableOptions } from "@tabler/icons-react";
import { toast } from "sonner";
import { Badge } from "@/components/base/badges/badge";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";

type Account = { id: string; account: string; owner: string; region: string; stage: string; seats: number; arr: number; health: number };
type ColumnKey = Exclude<keyof Account, "id">;
type Column = { key: ColumnKey; label: string; width: number; align?: "right"; editable?: boolean };

const columns: Column[] = [
  { key: "account", label: "Account", width: 220, editable: true },
  { key: "owner", label: "Owner", width: 150, editable: true },
  { key: "region", label: "Region", width: 140, editable: true },
  { key: "stage", label: "Stage", width: 150, editable: true },
  { key: "seats", label: "Seats", width: 100, align: "right", editable: true },
  { key: "arr", label: "ARR", width: 130, align: "right" },
  { key: "health", label: "Health", width: 110, align: "right", editable: true },
];

const accountNames = ["Northwind", "Lumen", "Cedar", "Brightline", "Harbor", "Pinecrest", "Atlas", "Summit", "Fieldstone", "Evergreen", "Meridian", "Redwood"];
const owners = ["Owen Park", "Tyler Hayes", "Marcus Johnson", "Sarah Bennett", "Daniel Kim"];
const regions = ["North America", "Europe", "Asia Pacific", "Latin America"];
const stages = ["Discovery", "Proposal", "Negotiation", "Committed", "Closed won"];
const rowHeight = 40;
const viewportHeight = 440;

function createAccounts(): Account[] {
  return Array.from({ length: 10000 }, (_, index) => {
    const n = index + 1;
    const seats = ((n * 37) % 650) + 10;
    return {
      id: `AC-${String(n).padStart(5, "0")}`,
      account: `${accountNames[(n * 7) % accountNames.length]} ${["Freight", "Systems", "Group", "Labs"][n % 4]}`,
      owner: owners[(n * 3) % owners.length],
      region: regions[(n * 5) % regions.length],
      stage: stages[(n * 11) % stages.length],
      seats,
      arr: seats * (120 + ((n * 17) % 240)),
      health: 40 + ((n * 13) % 61),
    };
  });
}

const money = (value: number) => `$${value.toLocaleString("en-US")}`;

export function DataGridExample() {
  const [data, setData] = useState(createAccounts);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sort, setSort] = useState<{ key: ColumnKey; descending: boolean } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [visibleKeys, setVisibleKeys] = useState<Set<ColumnKey>>(() => new Set(columns.map((column) => column.key)));
  const [scrollTop, setScrollTop] = useState(0);
  const [editing, setEditing] = useState<{ id: string; key: ColumnKey } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [compact, setCompact] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const shownColumns = columns.filter((column) => visibleKeys.has(column.key));

  function resetViewport() {
    if (viewport.current) viewport.current.scrollTop = 0;
    setScrollTop(0);
  }

  const rows = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    const filtered = data.filter((row) =>
      (stageFilter === "all" || row.stage === stageFilter) &&
      (!normalized || columns.some((column) => String(row[column.key]).toLocaleLowerCase().includes(normalized))),
    );
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      const compare = typeof left === "number" && typeof right === "number"
        ? left - right
        : String(left).localeCompare(String(right), undefined, { numeric: true });
      return sort.descending ? -compare : compare;
    });
  }, [data, query, sort, stageFilter]);

  const height = compact ? 34 : rowHeight;
  const first = Math.max(0, Math.floor(scrollTop / height) - 5);
  const last = Math.min(rows.length, Math.ceil((scrollTop + viewportHeight) / height) + 5);
  const visibleRows = rows.slice(first, last);
  const selectedVisibleCount = rows.reduce((count, row) => count + Number(selected.has(row.id)), 0);
  const allVisibleSelected = rows.length > 0 && selectedVisibleCount === rows.length;
  const selectedRows = rows.filter((row) => selected.has(row.id));
  const summarized = selectedRows.length ? selectedRows : rows;
  const summary = summarized.reduce((result, row) => ({ seats: result.seats + row.seats, arr: result.arr + row.arr, health: result.health + row.health }), { seats: 0, arr: 0, health: 0 });

  function updateCell(id: string, key: ColumnKey, rawValue: string) {
    setData((current) => current.map((row) => {
      if (row.id !== id) return row;
      if (key === "seats" || key === "health") {
        const value = Number(rawValue);
        if (!Number.isFinite(value) || value < 0 || (key === "health" && value > 100)) {
          toast.error(key === "health" ? "Health must be between 0 and 100." : "Seats must be zero or greater.");
          return row;
        }
        return { ...row, [key]: value };
      }
      if (!rawValue.trim()) {
        toast.error(`${columns.find((column) => column.key === key)?.label ?? "Value"} cannot be empty.`);
        return row;
      }
      return { ...row, [key]: rawValue };
    }));
  }

  function exportCsv() {
    const exportRows = selectedRows.length ? selectedRows : rows;
    const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const csv = [
      shownColumns.map((column) => escape(column.label)).join(","),
      ...exportRows.map((row) => shownColumns.map((column) => escape(row[column.key])).join(",")),
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "accounts.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`${exportRows.length.toLocaleString()} rows exported`);
  }

  function toggleAll(checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      for (const row of rows) {
        if (checked) next.add(row.id);
        else next.delete(row.id);
      }
      return next;
    });
  }

  function toggleColumn(key: ColumnKey) {
    setVisibleKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else next.add(key);
      return next;
    });
  }

  function finishEdit(commit: boolean) {
    if (commit && editing) updateCell(editing.id, editing.key, editValue);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search accounts" value={query} onChange={(event) => { setQuery(event.currentTarget.value); resetViewport(); }} placeholder="Search accounts…" className="pl-9" />
        </div>
        <Select value={stageFilter} onValueChange={(value) => { setStageFilter(value); resetViewport(); }}>
          <SelectTrigger aria-label="Filter by stage" className="w-full sm:w-44"><SelectValue placeholder="All stages" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {stages.map((stage) => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
          </SelectContent>
        </Select>
        <details className="relative">
          <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-md border px-3 text-sm hover:bg-muted">
            <IconTableOptions className="size-4" /> Columns
          </summary>
          <div className="absolute right-0 z-20 mt-2 grid min-w-44 gap-2 rounded-lg border bg-popover p-3 text-sm shadow-lg">
            {columns.map((column) => <label key={column.key} className="flex items-center gap-2"><input type="checkbox" checked={visibleKeys.has(column.key)} onChange={() => toggleColumn(column.key)} className="accent-primary" />{column.label}</label>)}
          </div>
        </details>
        <Button variant="outline" size="sm" onClick={() => setCompact((value) => !value)} className="sm:ml-auto">{compact ? "Comfortable rows" : "Compact rows"}</Button>
        <Button size="sm" onClick={exportCsv}><IconDownload className="size-4" /> Export {selectedRows.length ? `(${selectedRows.length})` : "CSV"}</Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div ref={viewport} role="region" aria-label="Accounts data grid" tabIndex={0} className="max-h-[440px] overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
          <table className="w-full min-w-[950px] border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-10 bg-muted/95 backdrop-blur">
              <tr className="h-10">
                <th className="sticky left-0 z-20 w-12 border-b bg-muted px-3 text-left"><Checkbox aria-label="Select all filtered accounts" checked={allVisibleSelected ? true : selectedVisibleCount > 0 ? "indeterminate" : false} onCheckedChange={(value) => toggleAll(Boolean(value))} /></th>
                <th className="sticky left-12 z-20 w-12 border-b bg-muted text-center text-xs text-muted-foreground">#</th>
                {shownColumns.map((column, index) => <th key={column.key} className={`border-b px-3 text-xs font-medium text-muted-foreground ${column.align === "right" ? "text-right" : "text-left"} ${index === 0 ? "sticky left-[96px] z-20 bg-muted" : ""}`} style={{ width: column.width, minWidth: column.width }}><button type="button" className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setSort((current) => current?.key === column.key ? { key: column.key, descending: !current.descending } : { key: column.key, descending: false })}>{column.label}<span aria-hidden>{sort?.key === column.key ? sort.descending ? "↓" : "↑" : "↕"}</span></button></th>)}
              </tr>
            </thead>
            <tbody>
              {first > 0 && <tr aria-hidden="true"><td colSpan={shownColumns.length + 2} style={{ height: first * height }} /></tr>}
              {visibleRows.map((row, offset) => <tr key={row.id} className={`group ${selected.has(row.id) ? "bg-primary/5" : "hover:bg-muted/40"}`} style={{ height }}>
                <td className="sticky left-0 z-[1] border-b bg-card px-3 group-hover:bg-muted/40"><Checkbox aria-label={`Select ${row.account}`} checked={selected.has(row.id)} onCheckedChange={(checked) => setSelected((current) => { const next = new Set(current); if (checked) next.add(row.id); else next.delete(row.id); return next; })} /></td>
                <td className="sticky left-12 z-[1] border-b bg-card text-center text-xs tabular-nums text-muted-foreground group-hover:bg-muted/40">{first + offset + 1}</td>
                {shownColumns.map((column, index) => {
                  const value = row[column.key];
                  const cellEditing = editing?.id === row.id && editing.key === column.key;
                  return <td key={column.key} className={`border-b px-3 tabular-nums ${column.align === "right" ? "text-right" : "text-left"} ${index === 0 ? "sticky left-[96px] z-[1] bg-card group-hover:bg-muted/40" : ""}`} onDoubleClick={() => { if (column.editable) { setEditing({ id: row.id, key: column.key }); setEditValue(String(value)); } }} title={column.editable ? "Double-click to edit" : undefined}>
                    {cellEditing ? <input autoFocus value={editValue} onChange={(event) => setEditValue(event.currentTarget.value)} onBlur={() => finishEdit(true)} onKeyDown={(event) => { if (event.key === "Enter") finishEdit(true); if (event.key === "Escape") finishEdit(false); }} className="w-full rounded border bg-background px-1.5 py-1 text-inherit outline-none focus:ring-2 focus:ring-ring" aria-label={`Edit ${column.label}`} /> : column.key === "stage" ? <Badge variant="secondary" className="font-normal">{value}</Badge> : column.key === "arr" ? money(value as number) : column.key === "health" ? `${value}%` : value}
                  </td>;
                })}
              </tr>)}
              {last < rows.length && <tr aria-hidden="true"><td colSpan={shownColumns.length + 2} style={{ height: (rows.length - last) * height }} /></tr>}
              {!rows.length && <tr><td colSpan={shownColumns.length + 2} className="h-24 text-center text-muted-foreground">No matching accounts.</td></tr>}
            </tbody>
            <tfoot className="sticky bottom-0 z-10 bg-muted font-medium">
              <tr className="h-10"><td colSpan={2} className="border-t px-3 text-xs text-muted-foreground">{selectedRows.length ? "Selected total" : "Filtered total"}</td>{shownColumns.map((column) => <td key={column.key} className={`border-t px-3 ${column.align === "right" ? "text-right" : "text-left"}`}>{column.key === "seats" ? summary.seats.toLocaleString() : column.key === "arr" ? money(summary.arr) : column.key === "health" ? `${summarized.length ? (summary.health / summarized.length).toFixed(1) : "0.0"}% avg` : null}</td>)}</tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>{rows.length.toLocaleString()} rows · {data.length.toLocaleString()} total</span>
        <span>{selected.size ? `${selected.size} selected` : "Double-click editable cells to change values · summaries follow filters"}</span>
      </div>
    </div>
  );
}
