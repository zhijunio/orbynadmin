"use client";

import { useState, type ReactNode } from "react";
import { flexRender, type Row, type Table as TableInstance } from "@tanstack/react-table";
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowsSort, IconArrowUp, IconChevronDown, IconChevronLeft, IconChevronRight, IconGripVertical, IconPin } from "@tabler/icons-react";
import { Button } from "@/components/ui/buttons/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table/table";
import { cn } from "@/utils/cn";

export type DataGridLabels = {
  search: string; columns: string; selectAll: string; selectRow: string; selected: string;
  previous: string; next: string; page: string; of: string; rowsPerPage: string;
  empty: string; loading: string; sort: string;
  expand?: string; collapse?: string; moveLeft?: string; moveRight?: string; moveUp?: string; moveDown?: string; pin?: string; unpin?: string; resize?: string;
};
export type DataGridProps<TData> = {
  table: TableInstance<TData>; labels: DataGridLabels; caption: string;
  loading?: boolean; error?: ReactNode; selectable?: boolean; toolbar?: ReactNode; className?: string;
  appearance?: "default" | "cell-border" | "dense" | "borderless" | "striped" | "auto";
  renderExpanded?: (row: Row<TData>) => ReactNode;
  columnMoves?: boolean; draggableColumns?: boolean; resizable?: boolean; pinnableColumns?: boolean;
  onRowOrderChange?: (sourceId: string, targetId: string) => void;
  rowPinning?: boolean; stickyHeader?: boolean; pagination?: boolean; footer?: boolean; virtualColumns?: boolean; onReachEnd?: () => void;
};
function RowActions<TData>({ row, labels, onMove, onPin, first, last }: { row: Row<TData>; labels: DataGridLabels; onMove?: (direction: -1 | 1) => void; onPin?: () => void; first: boolean; last: boolean }) {
  return <div className="flex items-center gap-1">{onMove && <><Button size="icon-xs" variant="ghost" disabled={first} aria-label={`${labels.moveUp} ${row.id}`} onClick={() => onMove(-1)}><IconArrowUp /></Button><Button size="icon-xs" variant="ghost" disabled={last} aria-label={`${labels.moveDown} ${row.id}`} onClick={() => onMove(1)}><IconArrowDown /></Button></>}{onPin && <Button size="icon-xs" variant="ghost" aria-label={`${row.getIsPinned() ? labels.unpin : labels.pin} ${row.id}`} onClick={onPin}><IconPin className={row.getIsPinned() ? "fill-current" : undefined} /></Button>}</div>;
}
export function DataGrid<TData>({ table, labels, caption, loading, error, selectable = false, toolbar, className, appearance = "default", renderExpanded, columnMoves, draggableColumns, resizable, pinnableColumns, onRowOrderChange, rowPinning, stickyHeader, pagination = true, footer, virtualColumns, onReachEnd }: DataGridProps<TData>) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragColumn, setDragColumn] = useState<string | null>(null);
  const [dragRow, setDragRow] = useState<string | null>(null);
  const rowCount = table.getFilteredRowModel().rows.length;
  const pageCount = Math.max(1, table.getPageCount());
  const selectionCount = table.getFilteredSelectedRowModel().rows.length;
  const columns = table.getVisibleLeafColumns();
  const start = virtualColumns ? Math.max(0, Math.floor(scrollLeft / 150) - 1) : 0;
  const end = virtualColumns ? Math.min(columns.length, start + 10) : columns.length;
  const virtualIds = new Set(columns.slice(start, end).map((column) => column.id));
  const columnCount = end - start + Number(selectable) + Number(!!renderExpanded) + Number(!!onRowOrderChange || !!rowPinning) + (start ? 1 : 0) + (end < columns.length ? 1 : 0);
  const rows = rowPinning ? [...table.getTopRows(), ...table.getCenterRows(), ...table.getBottomRows()] : table.getRowModel().rows;
  function moveColumn(id: string, target: string) {
    const order = table.getAllLeafColumns().map((column) => column.id);
    const from = order.indexOf(id), to = order.indexOf(target);
    if (from < 0 || to < 0 || from === to) return;
    order.splice(from, 1); order.splice(to, 0, id); table.setColumnOrder(order);
  }
  function pinnedStyle(id: string) {
    const column = table.getColumn(id);
    return column?.getIsPinned() ? { position: "sticky" as const, left: column.getStart("left"), zIndex: 2, background: "var(--card)" } : undefined;
  }
  const leftSpacer = start ? <TableCell aria-hidden style={{ width: start * 150, minWidth: start * 150, padding: 0 }} /> : null;
  const rightSpacer = end < columns.length ? <TableCell aria-hidden style={{ width: (columns.length - end) * 150, minWidth: (columns.length - end) * 150, padding: 0 }} /> : null;
  return <div data-slot="data-grid" className={cn("w-full min-w-0 space-y-3", className)}>
    <div className="flex flex-wrap items-center gap-2"><Input aria-label={labels.search} placeholder={labels.search} value={String(table.getState().globalFilter ?? "")} onChange={(event) => { table.setGlobalFilter(event.target.value); table.setPageIndex(0); }} className="w-full sm:max-w-64" />{toolbar}<DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">{labels.columns}</Button></DropdownMenuTrigger><DropdownMenuContent align="end">{table.getAllLeafColumns().filter((column) => column.getCanHide()).map((column) => <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} disabled={column.getIsVisible() && columns.length === 1} onCheckedChange={(checked) => column.toggleVisibility(checked)}>{typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}</DropdownMenuCheckboxItem>)}</DropdownMenuContent></DropdownMenu>{selectable && <output aria-live="polite" className="text-sm text-muted-foreground">{selectionCount} {labels.selected}</output>}</div>
    <div className={cn("overflow-hidden rounded-lg", appearance !== "borderless" && "border border-border", stickyHeader && "[&>[data-slot=table-container]]:max-h-80 [&>[data-slot=table-container]]:overflow-auto", appearance === "dense" && "[&_td]:py-1 [&_th]:h-8", appearance === "cell-border" && "[&_td]:border-r [&_th]:border-r", appearance === "striped" && "[&_tbody_tr:nth-child(even)]:bg-muted/40")} aria-busy={loading} onScrollCapture={(event) => { const target = event.target as HTMLElement; if (virtualColumns) setScrollLeft(target.scrollLeft); if (onReachEnd && target.scrollHeight > target.clientHeight && target.scrollHeight - target.scrollTop - target.clientHeight < 40) onReachEnd(); }}>
      <Table className={cn(appearance === "auto" ? "w-auto min-w-full" : "w-full", (resizable || virtualColumns) && "table-fixed")} style={resizable ? { width: table.getTotalSize() + Number(selectable) * 40 } : virtualColumns ? { width: columns.length * 150 } : undefined}><TableCaption className="sr-only">{caption}</TableCaption>
        <TableHeader className={stickyHeader ? "sticky top-0 z-10 bg-card" : undefined}>{table.getHeaderGroups().map((group) => <TableRow key={group.id}>
          {selectable && <TableHead className="w-10"><Checkbox aria-label={labels.selectAll} checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false} disabled={loading || !rows.length} onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)} /></TableHead>}
          {renderExpanded && <TableHead className="w-10"><span className="sr-only">{labels.expand}</span></TableHead>}{(onRowOrderChange || rowPinning) && <TableHead className="w-20"><span className="sr-only">{labels.moveUp ?? labels.pin}</span></TableHead>}{leftSpacer}
          {group.headers.filter((header) => virtualIds.has(header.column.id)).map((header) => {
            const column = header.column;
            const index = columns.findIndex((item) => item.id === column.id);
            return <TableHead key={header.id} colSpan={header.colSpan} className="relative" style={{ ...(resizable ? { width: header.getSize() } : virtualColumns ? { width: 150 } : {}), ...pinnedStyle(column.id) }} aria-sort={column.getIsSorted() === "asc" ? "ascending" : column.getIsSorted() === "desc" ? "descending" : undefined} draggable={draggableColumns} onDragStart={(event) => { setDragColumn(column.id); event.dataTransfer.setData("text/plain", column.id); }} onDragOver={(event) => { if (dragColumn) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); if (dragColumn) moveColumn(dragColumn, column.id); setDragColumn(null); }} onDragEnd={() => setDragColumn(null)}>
              <div className="flex items-center gap-1">{draggableColumns && <IconGripVertical className="size-3.5 shrink-0 text-muted-foreground" />}{header.isPlaceholder ? null : column.getCanSort() ? <button type="button" aria-label={`${labels.sort}: ${typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}`} className="inline-flex min-w-0 items-center gap-2 rounded py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={column.getToggleSortingHandler()}><span className="truncate">{flexRender(column.columnDef.header, header.getContext())}</span>{column.getIsSorted() === "asc" ? <IconArrowUp className="size-3.5" /> : column.getIsSorted() === "desc" ? <IconArrowDown className="size-3.5" /> : <IconArrowsSort className="size-3.5" />}</button> : flexRender(column.columnDef.header, header.getContext())}
              {(columnMoves || draggableColumns || pinnableColumns) && <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon-xs" variant="ghost" aria-label={`${labels.columns} ${column.id}`}><IconChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent>{(columnMoves || draggableColumns) && <><DropdownMenuItem disabled={index === 0} onSelect={() => moveColumn(column.id, columns[index - 1].id)}><IconArrowLeft />{labels.moveLeft}</DropdownMenuItem><DropdownMenuItem disabled={index === columns.length - 1} onSelect={() => moveColumn(column.id, columns[index + 1].id)}><IconArrowRight />{labels.moveRight}</DropdownMenuItem></>}{pinnableColumns && <DropdownMenuItem onSelect={() => column.pin(column.getIsPinned() ? false : "left")}><IconPin />{column.getIsPinned() ? labels.unpin : labels.pin}</DropdownMenuItem>}</DropdownMenuContent></DropdownMenu>}</div>
              {resizable && column.getCanResize() && <div role="separator" aria-orientation="vertical" aria-label={`${labels.resize} ${column.id}`} aria-valuenow={column.getSize()} aria-valuemin={column.columnDef.minSize ?? 60} aria-valuemax={column.columnDef.maxSize ?? 500} tabIndex={0} className="absolute inset-y-0 right-0 w-1 cursor-col-resize touch-none bg-border hover:bg-primary focus-visible:bg-primary" onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); table.setColumnSizing((current) => ({ ...current, [column.id]: Math.max(60, Math.min(500, column.getSize() + (event.key === "ArrowRight" ? 10 : -10))) })); } }} />}
            </TableHead>;
          })}{rightSpacer}
        </TableRow>)}</TableHeader>
        <TableBody>{loading ? Array.from({ length: 5 }, (_, index) => <TableRow key={`loading-${index}`}><TableCell colSpan={columnCount}><span className="sr-only" role={index === 0 ? "status" : undefined}>{labels.loading}</span><Skeleton className="h-5 w-full motion-reduce:animate-none" /></TableCell></TableRow>) : error ? <TableRow><TableCell colSpan={columnCount} className="h-28 text-center"><div role="alert">{error}</div></TableCell></TableRow> : rows.length ? rows.map((row, index) => <DataGridRow key={row.id} row={row} labels={labels} selectable={selectable} renderExpanded={renderExpanded} virtualIds={virtualIds} leftSpacer={leftSpacer} rightSpacer={rightSpacer} columnCount={columnCount} pinnedStyle={pinnedStyle} rowPinning={rowPinning} onRowOrderChange={onRowOrderChange} first={index === 0} last={index === rows.length - 1} onMove={(direction) => { const target = rows[index + direction]; if (target) onRowOrderChange?.(row.id, target.id); }} onDragStart={(event) => { setDragRow(row.id); event.dataTransfer.setData("text/plain", row.id); }} onDragOver={(event) => { if (dragRow) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); if (dragRow) onRowOrderChange?.(dragRow, row.id); setDragRow(null); }} />) : <TableRow><TableCell colSpan={columnCount} className="h-28 text-center text-muted-foreground"><span role="status">{labels.empty}</span></TableCell></TableRow>}</TableBody>
        {footer && <TableFooter>{table.getFooterGroups().map((group) => <TableRow key={group.id}>{selectable && <TableCell />}{group.headers.filter((header) => virtualIds.has(header.column.id)).map((header) => <TableCell key={header.id}>{flexRender(header.column.columnDef.footer, header.getContext())}</TableCell>)}</TableRow>)}</TableFooter>}
      </Table>
    </div>
    {pagination && <div className="flex flex-wrap items-center justify-between gap-3 text-sm"><label className="flex items-center gap-2 text-muted-foreground">{labels.rowsPerPage}<NativeSelect size="sm" aria-label={labels.rowsPerPage} value={table.getState().pagination.pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))}>{[5, 10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}</NativeSelect></label><div className="flex items-center gap-2"><span aria-live="polite" className="tabular-nums text-muted-foreground">{labels.page} {rowCount ? table.getState().pagination.pageIndex + 1 : 1} {labels.of} {pageCount}</span><Button variant="outline" size="icon-sm" aria-label={labels.previous} disabled={loading || !table.getCanPreviousPage()} onClick={() => table.previousPage()}><IconChevronLeft /></Button><Button variant="outline" size="icon-sm" aria-label={labels.next} disabled={loading || !table.getCanNextPage()} onClick={() => table.nextPage()}><IconChevronRight /></Button></div></div>}
  </div>;
}
function DataGridRow<TData>({ row, labels, selectable, renderExpanded, virtualIds, leftSpacer, rightSpacer, columnCount, pinnedStyle, rowPinning, onRowOrderChange, first, last, onMove, ...dragProps }: {
  row: Row<TData>; labels: DataGridLabels; selectable: boolean; renderExpanded?: DataGridProps<TData>["renderExpanded"]; virtualIds: Set<string>; leftSpacer: ReactNode; rightSpacer: ReactNode; columnCount: number; pinnedStyle: (id: string) => React.CSSProperties | undefined; rowPinning?: boolean; onRowOrderChange?: DataGridProps<TData>["onRowOrderChange"]; first: boolean; last: boolean; onMove: (direction: -1 | 1) => void;
} & Pick<React.ComponentProps<"tr">, "onDragStart" | "onDragOver" | "onDrop">) {
  return <><TableRow data-state={row.getIsSelected() ? "selected" : undefined} className={row.getIsPinned() ? "bg-primary/5" : undefined} draggable={!!onRowOrderChange} {...dragProps}>
    {selectable && <TableCell><Checkbox aria-label={`${labels.selectRow} ${row.id}`} checked={row.getIsSelected()} onCheckedChange={(checked) => row.toggleSelected(!!checked)} disabled={!row.getCanSelect()} /></TableCell>}
    {renderExpanded && <TableCell><Button variant="ghost" size="icon-xs" aria-label={`${row.getIsExpanded() ? labels.collapse : labels.expand} ${row.id}`} aria-expanded={row.getIsExpanded()} disabled={!row.getCanExpand()} onClick={row.getToggleExpandedHandler()} className="ml-0" style={{ marginLeft: row.depth * 12 }}>{row.getIsExpanded() ? <IconChevronDown /> : <IconChevronRight />}</Button></TableCell>}
    {(onRowOrderChange || rowPinning) && <TableCell><RowActions row={row} labels={labels} first={first} last={last} onMove={onRowOrderChange ? onMove : undefined} onPin={rowPinning ? () => row.pin(row.getIsPinned() ? false : "top") : undefined} /></TableCell>}{leftSpacer}
    {row.getVisibleCells().filter((cell) => virtualIds.has(cell.column.id)).map((cell) => <TableCell key={cell.id} style={pinnedStyle(cell.column.id)}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}{rightSpacer}
  </TableRow>{renderExpanded && row.getIsExpanded() && !row.subRows.length && <TableRow><TableCell colSpan={columnCount} className="bg-muted/30 p-4">{renderExpanded(row)}</TableCell></TableRow>}</>;
}
