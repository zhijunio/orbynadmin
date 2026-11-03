"use client";

import * as React from "react";
import {
  type ColumnDef,
  type Column,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { IconChevronsLeft as IconChevronsLeft, IconChevronsRight as IconChevronsRight, IconAdjustmentsHorizontal as IconAdjustmentsHorizontal, IconSearch as IconSearch, IconArrowsUpDown as IconArrowsSort, IconArrowUp as IconArrowUp, IconArrowDown as IconArrowDown } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table/table";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/base/pagination/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowId: (row: TData) => string;
  searchKey?: string;
  searchPlaceholder?: string;
  columnFilters?: boolean;
  toolbar?: React.ReactNode;
  bulkActions?: (rows: TData[], clearSelection: () => void) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  searchKey,
  searchPlaceholder = "Search…",
  columnFilters = false,
  toolbar,
  bulkActions,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  // TanStack Table exposes a mutable instance that React Compiler cannot memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: Boolean(bulkActions),
    defaultColumn: { filterFn: "includesString" },
    initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const selectedCount = selectedRows.length;
  const totalCount = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const headerGroups = table.getHeaderGroups();
  const primarySort = table.getState().sorting[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {searchKey && (
          <div className="relative sm:max-w-xs">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn(searchKey)?.setFilterValue(e.target.value)
              }
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center justify-end gap-2 sm:ml-auto">
          {toolbar}
          {selectedCount > 0 && bulkActions?.(
            selectedRows,
            () => table.resetRowSelection()
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconAdjustmentsHorizontal className="size-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((c) => c.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(v) => column.toggleVisibility(!!v)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-[800px]">
          <TableHeader>
            {headerGroups.map((hg) => (
              <React.Fragment key={hg.id}>
                <TableRow className="bg-muted/40">
                  {bulkActions && (
                    <TableHead className="w-10 px-2">
                      {hg.id === headerGroups[0]?.id && (
                        <Checkbox
                          aria-label="Select all rows on this page"
                          checked={
                            table.getIsAllPageRowsSelected()
                              ? true
                              : table.getIsSomePageRowsSelected()
                                ? "indeterminate"
                                : false
                          }
                          onCheckedChange={(checked) =>
                            table.toggleAllPageRowsSelected(checked === true)
                          }
                        />
                      )}
                    </TableHead>
                  )}
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      aria-sort={
                        header.column.id === primarySort?.id
                          ? header.column.getIsSorted() === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
                {columnFilters && (
                  <TableRow>
                    {bulkActions && <TableHead />}
                    {hg.headers.map((header) => {
                      const column = header.column;
                      return (
                        <TableHead key={`${header.id}-filter`} className="py-2">
                          {column.getCanFilter() ? (
                            <Input
                              aria-label={`Filter ${column.id}`}
                              placeholder="Filter…"
                              value={(column.getFilterValue() as string) ?? ""}
                              onChange={(event) => column.setFilterValue(event.target.value)}
                              className="h-8 min-w-24 text-xs"
                            />
                          ) : null}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {bulkActions && (
                    <TableCell className="w-10 px-2">
                      <Checkbox
                        aria-label={`Select row ${row.id}`}
                        checked={row.getIsSelected()}
                        onCheckedChange={(checked) =>
                          row.toggleSelected(checked === true)
                        }
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length + (bulkActions ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedCount > 0
            ? `${selectedCount} row(s) selected`
            : `${totalCount} row(s)`}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger size="sm" className="w-[72px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[8, 10, 20, 50].map((n) => (
                  <SelectItem key={n} value={`${n}`}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(pageCount, 1)}
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationLink
                  href="#"
                  aria-label="Go to first page"
                  className="size-8 border bg-background aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-disabled={!table.getCanPreviousPage()}
                  tabIndex={table.getCanPreviousPage() ? undefined : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    table.setPageIndex(0);
                  }}
                >
                  <IconChevronsLeft className="size-4" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text=""
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-disabled={!table.getCanPreviousPage()}
                  tabIndex={table.getCanPreviousPage() ? undefined : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    table.previousPage();
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-disabled={!table.getCanNextPage()}
                  tabIndex={table.getCanNextPage() ? undefined : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    table.nextPage();
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  aria-label="Go to last page"
                  className="size-8 border bg-background aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-disabled={!table.getCanNextPage()}
                  tabIndex={table.getCanNextPage() ? undefined : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    table.setPageIndex(table.getPageCount() - 1);
                  }}
                >
                  <IconChevronsRight className="size-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

/** Sortable column header button — use in a column's `header`. */
export function SortableHeader<TData>({
  column,
  title,
}: {
  column: Column<TData, unknown>;
  title: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      {sorted === "asc" ? (
        <IconArrowUp className="size-3.5" />
      ) : sorted === "desc" ? (
        <IconArrowDown className="size-3.5" />
      ) : (
        <IconArrowsSort className="size-3.5 text-muted-foreground" />
      )}
    </Button>
  );
}
