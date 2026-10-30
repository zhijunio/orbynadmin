"use client";
import { getInitials } from "@/lib/text";
import { customers } from "@/lib/demo-data";
import type { Customer } from "@/lib/demo-data";

import { useMemo, useState } from "react";

import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { EllipsisVertical as IconDotsVertical, Copy as IconCopy, Trash as IconTrash, Table as IconTable, Download as IconDownload } from "lucide-react";

import { PageHeader } from "@/components/feature/layout/PageHeader";
import { DataTable, SortableHeader } from "@/components/feature/table/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<Customer["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Inactive: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const planStyles: Record<Customer["plan"], string> = {
  Free: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Pro: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Enterprise: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function makeColumns(
  onDelete: (customer: Customer) => void
): ColumnDef<Customer>[] {
  return [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={c.avatar} alt={c.name} />
            <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <span className="font-medium">{c.name}</span>
            <p className="truncate text-xs text-muted-foreground">{c.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.company}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <Badge variant="secondary" className={planStyles[row.original.plan]}>
        {row.original.plan}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary" className={statusStyles[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "spent",
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortableHeader column={column} title="Spent" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        ${row.original.spent.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.location}</span>
    ),
  },
  {
    accessorKey: "joined",
    header: ({ column }) => <SortableHeader column={column} title="Joined" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.original.joined}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <IconDotsVertical className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onSelect={() => {
                    void copyCustomerId(c.id);
                  }}
                >
                  <IconCopy className="size-4" /> Copy id
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => {
                  onDelete(c);
                }}
              >
                <IconTrash className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  ];
}

export default function DataTableExamplePage() {
  const [data, setData] = useState<Customer[]>(customers);
  const [pendingDelete, setPendingDelete] = useState<{
    rows: Customer[];
    clearSelection: () => void;
  } | null>(null);
  const columns = useMemo(
    () =>
      makeColumns((customer) =>
        setPendingDelete({ rows: [customer], clearSelection: () => {} })
      ),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Table"
        description="A reusable table with sorting, column visibility, row selection, search and pagination — built on TanStack Table."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <IconTable className="size-4" /> Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchKey="name"
            searchPlaceholder="Search customers…"
            bulkActions={(rows, clearSelection) => (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportCustomers(rows)}
                >
                  <IconDownload className="size-4" /> Export ({rows.length})
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setPendingDelete({ rows, clearSelection })}
                >
                  <IconTrash className="size-4" /> Delete ({rows.length})
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => { if (!open) setPendingDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete?.rows.length === 1 ? "Delete this customer?" : "Delete selected customers?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {pendingDelete?.rows.length ?? 0} {pendingDelete?.rows.length === 1 ? "customer" : "customers"} from this demo table. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (!pendingDelete) return;
                const ids = new Set(pendingDelete.rows.map((row) => row.id));
                setData((previous) => previous.filter((customer) => !ids.has(customer.id)));
                pendingDelete.clearSelection();
                toast.success(`${ids.size} customer${ids.size === 1 ? "" : "s"} deleted`);
                setPendingDelete(null);
              }}
            >Delete {pendingDelete?.rows.length === 1 ? "customer" : "customers"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function exportCustomers(rows: Customer[]) {
  const columns: (keyof Customer)[] = ["name", "email", "company", "plan", "status", "spent", "location", "joined"];
  const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => {
    const value = String(row[column] ?? "");
    return `"${value.replaceAll('"', '""')}"`;
  }).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "selected-customers.csv";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast.success(`${rows.length} customer${rows.length === 1 ? "" : "s"} exported`);
}

async function copyCustomerId(id: string) {
  try {
    await navigator.clipboard.writeText(id);
    toast.success("Customer ID copied", { description: id });
  } catch {
    toast.error("Could not copy customer ID");
  }
}
