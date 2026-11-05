"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { IconCheck, IconEdit, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { DataGrid, type DataGridLabels } from "@/components/ui/data-grid/data-grid";
import { Input } from "@/components/ui/input/input";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { invoices } from "@/components/custom/table/invoices";

type GridRecord = {
  id: string;
  name: string;
  status: "paid" | "pending" | "overdue";
  amount: number;
  children?: GridRecord[];
};

export type DataGridExampleId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DataGridExampleKind =
  | "appearance"
  | "rows"
  | "columns"
  | "summary"
  | "loading"
  | "infinite"
  | "editing"
  | "remote"
  | "virtualization";
type Editor = { mode: "create" | "edit"; record: GridRecord };

const exampleKinds: Record<DataGridExampleId, DataGridExampleKind> = {
  1: "appearance",
  2: "rows",
  3: "columns",
  4: "summary",
  5: "loading",
  6: "infinite",
  7: "editing",
  8: "remote",
  9: "virtualization",
};

const initialRows: GridRecord[] = Array.from({ length: 60 }, (_, index) => ({
  ...invoices[index % invoices.length],
  id: `INV-${String(index + 1).padStart(3, "0")}`,
}));

const labels: DataGridLabels = {
  search: "Search invoices…",
  columns: "Columns",
  selectAll: "Select all rows on this page",
  selectRow: "Select row",
  selected: "selected",
  previous: "Previous",
  next: "Next",
  page: "Page",
  of: "of",
  rowsPerPage: "Rows per page",
  sort: "Sort",
  empty: "No matching records.",
  loading: "Loading records…",
  expand: "Expand row",
  collapse: "Collapse row",
  moveLeft: "Move left",
  moveRight: "Move right",
  moveUp: "Move up",
  moveDown: "Move down",
  pin: "Pin",
  unpin: "Unpin",
  resize: "Resize column",
};

const statusLabel = (status: GridRecord["status"]) =>
  status === "paid" ? "Paid" : status === "pending" ? "Pending" : "Overdue";

function compareRecords(left: GridRecord, right: GridRecord, columnId: string) {
  const leftValue = columnId === "amount" ? left.amount : columnId === "status" ? statusLabel(left.status) : columnId === "id" ? left.id : left.name;
  const rightValue = columnId === "amount" ? right.amount : columnId === "status" ? statusLabel(right.status) : columnId === "id" ? right.id : right.name;
  return typeof leftValue === "number" && typeof rightValue === "number"
    ? leftValue - rightValue
    : String(leftValue).localeCompare(String(rightValue), "en-US");
}

export function DataGridExample({ example }: { example: DataGridExampleId }) {
  const kind = exampleKinds[example];
  const [source, setSource] = useState(initialRows);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingRemote, setLoadingRemote] = useState(kind === "remote");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [feedback, setFeedback] = useState("");
  const [remote, setRemote] = useState({ rows: initialRows.slice(0, 5), total: initialRows.length });
  const request = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRemote = kind === "remote";
  const isInfinite = kind === "infinite";
  const isEditing = kind === "editing";
  const isVirtualized = kind === "virtualization";
  const isSummary = kind === "summary";

  useEffect(() => {
    if (!isRemote) return;
    const timer = setTimeout(() => {
      const filtered = source.filter((row) => `${row.id} ${row.name} ${statusLabel(row.status)}`.toLowerCase().includes(query.toLowerCase()));
      const sort = sorting[0];
      const sorted = sort ? [...filtered].sort((left, right) => compareRecords(left, right, sort.id) * (sort.desc ? -1 : 1)) : filtered;
      setRemote({
        rows: sorted.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize),
        total: sorted.length,
      });
      setLoadingRemote(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [isRemote, pagination, query, sorting, source]);

  useEffect(() => () => {
    if (request.current) clearTimeout(request.current);
  }, []);

  const data = useMemo(() => {
    if (isRemote) return remote.rows;
    if (isInfinite) return source.slice(0, loaded);
    if (kind === "rows") {
      return source.slice(0, 5).map((row, index) => ({
        ...row,
        children: source.slice(5 + index * 2, 7 + index * 2).map((child) => ({
          ...child,
          id: `${row.id}-${child.id}`,
        })),
      }));
    }
    if (isVirtualized) return Array.from({ length: 120 }, (_, index) => ({
      ...source[index % source.length],
      id: `INV-${String(index + 1).padStart(3, "0")}`,
    }));
    return source;
  }, [isInfinite, isRemote, isVirtualized, kind, loaded, remote.rows, source]);

  const beginEditing = useCallback((record: GridRecord) => {
    setEditor({ mode: "edit", record });
    setFeedback("");
  }, []);

  function beginCreating() {
    const record: GridRecord = { id: crypto.randomUUID(), name: "", status: "pending", amount: 0 };
    setSource((rows) => [record, ...rows]);
    setQuery("");
    setSorting([]);
    setPagination((current) => ({ ...current, pageIndex: 0 }));
    setEditor({ mode: "create", record });
    setFeedback("");
  }

  const updateDraft = useCallback((record: GridRecord) => {
    setEditor((current) => current ? { ...current, record } : current);
  }, []);

  const cancelEditing = useCallback(() => {
    if (editor?.mode === "create") {
      setSource((rows) => rows.filter((row) => row.id !== editor.record.id));
    }
    setEditor(null);
    setFeedback("");
  }, [editor]);

  const saveEditing = useCallback(() => {
    if (!editor) return;
    const record = { ...editor.record, name: editor.record.name.trim() };
    if (!record.name) {
      setFeedback("Enter a customer name before saving.");
      return;
    }
    setSource((rows) => rows.map((row) => row.id === record.id ? record : row));
    setEditor(null);
    setFeedback("Invoice saved.");
  }, [editor]);

  const handleEditorKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEditing();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  }, [cancelEditing, saveEditing]);

  const columns = useMemo<ColumnDef<GridRecord>[]>(() => {
    const base: ColumnDef<GridRecord>[] = [
      { accessorKey: "id", header: "Invoice", enableHiding: false, footer: isSummary ? () => "Total" : undefined },
      {
        accessorKey: "name",
        header: "Customer",
        footer: isSummary ? ({ table }) => `${table.getFilteredRowModel().rows.length} records` : undefined,
        cell: ({ row }) => editor?.record.id === row.id ? (
          <Input
            aria-label={`Customer for ${row.id}`}
            aria-invalid={!!feedback && !editor.record.name.trim()}
            autoFocus
            value={editor.record.name}
            onChange={(event) => updateDraft({ ...editor.record, name: event.target.value })}
            onKeyDown={handleEditorKeyDown}
            className="h-8 min-w-36"
          />
        ) : row.original.name,
      },
      {
        accessorFn: (row) => statusLabel(row.status),
        id: "status",
        header: "Status",
        cell: ({ row }) => editor?.record.id === row.id ? (
          <NativeSelect
            aria-label={`Status for ${row.id}`}
            size="sm"
            value={editor.record.status}
            onChange={(event) => {
              const status = event.target.value;
              if (status === "paid" || status === "pending" || status === "overdue") {
                updateDraft({ ...editor.record, status });
              }
            }}
          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </NativeSelect>
        ) : <Badge variant={row.original.status === "overdue" ? "destructive" : "secondary"}>{statusLabel(row.original.status)}</Badge>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => editor?.record.id === row.id ? (
          <Input
            aria-label={`Amount for ${row.id}`}
            type="number"
            min={0}
            max={100000}
            value={editor.record.amount}
            onChange={(event) => updateDraft({ ...editor.record, amount: Math.min(100000, Math.max(0, Number(event.target.value))) })}
            onKeyDown={handleEditorKeyDown}
            className="h-8 w-28"
          />
        ) : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(row.original.amount),
        footer: isSummary
          ? ({ table }) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.amount, 0),
            )
          : undefined,
      },
    ];

    if (isEditing) {
      base.push({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex gap-1">
            {editor?.record.id === row.id ? <>
              <Button variant="ghost" size="icon-sm" aria-label={`Save invoice ${row.id}`} onClick={saveEditing}><IconCheck /></Button>
              <Button variant="ghost" size="icon-sm" aria-label={`Cancel editing invoice ${row.id}`} onClick={cancelEditing}><IconX /></Button>
            </> : <>
              <Button variant="ghost" size="icon-sm" aria-label={`Edit invoice ${row.id}`} disabled={!!editor} onClick={() => beginEditing(row.original)}><IconEdit /></Button>
              <Button variant="ghost" size="icon-sm" aria-label={`Remove invoice ${row.id}`} disabled={!!editor} onClick={() => {
                setSource((rows) => rows.filter((item) => item.id !== row.id));
                setFeedback("Invoice removed.");
              }}><IconTrash /></Button>
            </>}
          </div>
        ),
      });
    }

    if (isVirtualized) {
      return [base[0], ...Array.from({ length: 100 }, (_, index): ColumnDef<GridRecord> => ({
        id: `metric-${index + 1}`,
        header: `Metric ${index + 1}`,
        accessorFn: (row) => row.amount + index,
        size: 150,
      }))];
    }

    return base;
  }, [beginEditing, cancelEditing, editor, feedback, handleEditorKeyDown, isEditing, isSummary, isVirtualized, saveEditing, updateDraft]);

  // TanStack Table maintains its own memoization and is not React Compiler compatible.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    defaultColumn: { minSize: 60, maxSize: 500, size: 150 },
    state: { sorting, rowSelection: selection, pagination, globalFilter: query },
    onSortingChange: (updater) => {
      setSorting(updater);
      if (isRemote) {
        setLoadingRemote(true);
        setPagination((current) => ({ ...current, pageIndex: 0 }));
      }
    },
    onRowSelectionChange: setSelection,
    onPaginationChange: (updater) => {
      setPagination(updater);
      if (isRemote) setLoadingRemote(true);
    },
    onGlobalFilterChange: (updater) => {
      setQuery(updater);
      if (isRemote) {
        setLoadingRemote(true);
        setPagination((current) => ({ ...current, pageIndex: 0 }));
      }
    },
    getRowId: (row) => row.id,
    getSubRows: (row) => row.children,
    getRowCanExpand: (row) => kind === "rows" && !!row.original.children?.length,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: isInfinite || isRemote || isVirtualized ? undefined : getPaginationRowModel(),
    manualPagination: isRemote,
    manualFiltering: isRemote,
    manualSorting: isRemote,
    rowCount: isRemote ? remote.total : undefined,
    enableRowSelection: kind === "rows" || isEditing,
    enableSorting: kind === "columns" || isRemote,
    enableColumnResizing: kind === "columns",
    enableColumnPinning: kind === "columns",
    columnResizeMode: "onChange",
    autoResetPageIndex: isEditing,
  });

  function reorderRows(sourceId: string, targetId: string) {
    setSource((rows) => {
      const next = [...rows];
      const from = next.findIndex((row) => row.id === sourceId);
      const to = next.findIndex((row) => row.id === targetId);
      if (from < 0 || to < 0) return rows;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setFeedback("Row order updated.");
  }

  function loadMore() {
    if (loadingMore || loaded >= source.length) return;
    setLoadingMore(true);
    request.current = setTimeout(() => {
      setLoaded((count) => Math.min(source.length, count + 10));
      setLoadingMore(false);
    }, 250);
  }

  const loading = kind === "loading" || isRemote && loadingRemote;
  const grid = (appearance?: "dense" | "striped") => (
    <DataGrid
      table={table}
      labels={labels}
      caption={`Invoice data grid: ${kind}`}
      appearance={appearance}
      loading={loading}
      searchable={isEditing || isRemote}
      columnVisibility={kind === "columns"}
      selectable={kind === "rows" || isEditing}
      columnMoves={kind === "columns"}
      resizable={kind === "columns"}
      pinnableColumns={kind === "columns"}
      onRowOrderChange={kind === "rows" ? reorderRows : undefined}
      stickyHeader={isSummary || isInfinite || isVirtualized}
      pagination={isRemote}
      footer={isSummary}
      virtualRows={isVirtualized}
      virtualColumns={isVirtualized}
      onReachEnd={isInfinite ? loadMore : undefined}
      renderExpanded={kind === "rows" ? (row) => (
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt>Invoice</dt><dd>{row.id}</dd>
          <dt>Status</dt><dd>{statusLabel(row.original.status)}</dd>
        </dl>
      ) : undefined}
      toolbar={isEditing ? (
        <Button size="sm" disabled={!!editor} onClick={beginCreating}>
          <IconPlus />Add invoice
        </Button>
      ) : undefined}
    />
  );

  return (
    <div className="w-full min-w-0 space-y-3">
      {kind === "appearance" ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <section className="min-w-0 space-y-2"><p className="text-xs font-medium text-muted-foreground">Dense</p>{grid("dense")}</section>
          <section className="min-w-0 space-y-2"><p className="text-xs font-medium text-muted-foreground">Striped</p>{grid("striped")}</section>
        </div>
      ) : grid()}
      {isInfinite && <div className="flex items-center justify-between gap-2">
        <output aria-live="polite" className="text-xs text-muted-foreground">{loaded} of {source.length} loaded</output>
        <Button variant="outline" size="sm" disabled={loadingMore || loaded >= source.length} onClick={loadMore}>
          {loadingMore ? "Loading records…" : "Load more"}
        </Button>
      </div>}
      {(kind === "rows" || isEditing) && <output role="status" className="block min-h-4 text-xs text-muted-foreground">{feedback}</output>}
    </div>
  );
}
