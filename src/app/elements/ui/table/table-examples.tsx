"use client";

import { useMemo, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";

const rows = [
  { name: "Acme, Inc.", owner: "Maya Chen", status: "Active", seats: 24 },
  { name: "Northstar Labs", owner: "Noah Patel", status: "Trial", seats: 8 },
  { name: "Pioneer Health", owner: "Ava Martin", status: "Active", seats: 62 },
  { name: "Summit Works", owner: "Leo Kim", status: "Review", seats: 15 },
];

function InteractiveTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ascending, setAscending] = useState(true);
  const sortedRows = useMemo(
    () => [...rows].sort((left, right) => ascending ? left.seats - right.seats : right.seats - left.seats),
    [ascending],
  );
  const allSelected = selected.length === rows.length;
  const someSelected = selected.length > 0 && !allSelected;

  function toggleRow(name: string, checked: boolean) {
    setSelected((current) => checked ? [...current, name] : current.filter((item) => item !== name));
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{rows.length} organizations</span>
        <span aria-live="polite" className="font-medium">{selected.length} selected</span>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(checked) => setSelected(checked ? rows.map((row) => row.name) : [])}
                  aria-label="Select all organizations"
                />
              </TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead aria-sort={ascending ? "ascending" : "descending"} className="text-right">
                <button type="button" onClick={() => setAscending((current) => !current)} className="inline-flex items-center gap-1.5 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Sort by seats ${ascending ? "descending" : "ascending"}`}>
                  Seats{ascending ? <IconChevronUp aria-hidden="true" className="size-3.5" /> : <IconChevronDown aria-hidden="true" className="size-3.5" />}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.name} data-state={selected.includes(row.name) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox checked={selected.includes(row.name)} onCheckedChange={(checked) => toggleRow(row.name, checked === true)} aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell><span className="inline-flex items-center gap-2"><span aria-hidden="true" className={`size-2 rounded-full ${row.status === "Active" ? "bg-emerald-500" : row.status === "Trial" ? "bg-primary" : "bg-amber-500"}`} />{row.status}</span></TableCell>
                <TableCell className="text-right tabular-nums">{row.seats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function TableExamples() {
  return <Showcase title="Table">
    <ComponentPreview title="Sortable and Selectable Rows" className="xl:col-span-2"><InteractiveTable /></ComponentPreview>
    <ComponentPreview title="Responsive Primitive"><div className="w-full overflow-x-auto rounded-lg border"><Table><TableHeader><TableRow><TableHead>Organization</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Seats</TableHead></TableRow></TableHeader><TableBody>{rows.slice(0, 3).map((row) => <TableRow key={row.name}><TableCell className="font-medium">{row.name}</TableCell><TableCell>{row.owner}</TableCell><TableCell>{row.status}</TableCell><TableCell className="text-right tabular-nums">{row.seats}</TableCell></TableRow>)}</TableBody></Table></div></ComponentPreview>
  </Showcase>;
}
