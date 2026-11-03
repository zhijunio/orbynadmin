"use client";
import { getInitials } from "@/utils/text";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { TableCard } from "@/components/application/data-table/basic/table-card";
import { toast } from "sonner";
import { IconDownload as IconDownload, IconEye as IconEye, IconTrash as IconTrash, IconAdjustmentsHorizontal as IconAdjustmentsHorizontal, IconDots as IconDots, IconSearch as IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/base/buttons/button";
import { useMemo, useState, type FormEvent } from "react";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/base/dialog/alert-dialog";
import { escapeCsvCell } from "@/utils/csv";

export function LeadsReportTable() {
  return <TableCard title="Leads Report" flush><Table><TableHeader><TableRow className="bg-muted/40"><TableHead className="pl-6">Rep Name</TableHead><TableHead>Deals Closed</TableHead><TableHead>Revenue</TableHead><TableHead className="pr-6">Performance</TableHead></TableRow></TableHeader><TableBody>{leads.map((lead) => <TableRow key={lead.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9"><AvatarFallback>{getInitials(lead.name)}</AvatarFallback></Avatar><div><p className="font-medium">{lead.name}</p><p className="text-xs text-muted-foreground">{lead.role}</p></div></div></TableCell><TableCell className="tabular-nums">{lead.deals}</TableCell><TableCell className="font-medium tabular-nums">${lead.revenue.toLocaleString()}</TableCell><TableCell className="pr-6"><Badge variant="secondary" className={lead.performance > 85 ? "bg-emerald-500/10 text-emerald-600" : lead.performance > 75 ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"}>{lead.performance}%</Badge></TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const leads = [
  { name: "John Smith", role: "Sales Manager", deals: 24, revenue: 540000, performance: 125 },
  { name: "Alex Rodriguez", role: "Senior Account Executive", deals: 18, revenue: 410000, performance: 115 },
  { name: "Emily Johnson", role: "Account Executive", deals: 14, revenue: 320000, performance: 95 },
  { name: "Michael Brown", role: "Business Development Rep", deals: 11, revenue: 210000, performance: 82 },
  { name: "Sarah Wilson", role: "Account Executive", deals: 8, revenue: 180000, performance: 70 },
];

export function PackagesTable() {
  const [rows, setRows] = useState(packages);
  const [viewing, setViewing] = useState<(typeof packages)[number] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<(typeof packages)[number] | null>(null);

  function downloadInvoice(pkg: (typeof packages)[number]) {
    const values = ["Invoice", "Package", "Date", "Amount", "Status"];
    const row = [pkg.id, pkg.name, pkg.date, pkg.detail, pkg.status];
    const csv = [values, row]
      .map((line) => line.map(escapeCsvCell).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pkg.id}.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    toast.success(`${pkg.name} invoice CSV downloaded`);
  }

  function deletePackage() {
    if (!deleteTarget) return;
    setRows((current) => current.filter((pkg) => pkg.id !== deleteTarget.id));
    toast.success(`${deleteTarget.name} removed`);
    setDeleteTarget(null);
  }

  return (
    <>
      <TableCard flush>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="pl-6">Package</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="pl-6">
                  <p className="font-medium">{pkg.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.detail}</p>
                </TableCell>
                <TableCell>{pkg.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={pkg.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : pkg.status === "Unpaid" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}>
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`View ${pkg.name} invoice dated ${pkg.date}`} onClick={() => setViewing(pkg)}>
                      <IconEye className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-destructive" aria-label={`Delete ${pkg.name} package dated ${pkg.date}`} onClick={() => setDeleteTarget(pkg)}>
                      <IconTrash className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`Download ${pkg.name} invoice CSV dated ${pkg.date}`} onClick={() => downloadInvoice(pkg)}>
                      <IconDownload className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No packages remaining.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>

      <Dialog open={viewing !== null} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.name}</DialogTitle>
            <DialogDescription>Invoice details</DialogDescription>
          </DialogHeader>
          {viewing && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Invoice</dt><dd>{viewing.id}</dd>
              <dt className="text-muted-foreground">Date</dt><dd>{viewing.date}</dd>
              <dt className="text-muted-foreground">Amount</dt><dd>{viewing.detail}</dd>
              <dt className="text-muted-foreground">Status</dt><dd>{viewing.status}</dd>
            </dl>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>This removes the package from this example table.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={deletePackage}>Delete package</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const packages = [
  { id: "INV-2023-001", name: "Free Packages", detail: "$0.00", date: "Jan 13, 2023", status: "Paid" },
  { id: "INV-2022-002", name: "Standard Package", detail: "$59.00", date: "Dec 25, 2022", status: "Paid" },
  { id: "INV-2023-003", name: "Business Package", detail: "$129.00", date: "Mar 22, 2023", status: "Unpaid" },
  { id: "INV-2022-004", name: "Standard Package", detail: "$59.00", date: "Feb 22, 2022", status: "Pending" },
];

export function TopChannelsTable() {
  return <TableCard title="Top Channels"><Table><TableHeader><TableRow><TableHead className="pl-6">Source</TableHead><TableHead>Visitors</TableHead><TableHead>Revenues</TableHead><TableHead>Sales</TableHead><TableHead className="pr-6">Conversion</TableHead></TableRow></TableHeader><TableBody>{channels.map((channel) => <TableRow key={channel.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-8"><AvatarFallback className="text-xs font-semibold">{channel.name.slice(0,1)}</AvatarFallback></Avatar><span className="font-medium">{channel.name}</span></div></TableCell><TableCell>{channel.visitors}</TableCell><TableCell className="font-medium text-emerald-600">{channel.revenue}</TableCell><TableCell>{channel.sales}</TableCell><TableCell className="pr-6">{channel.conversion}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const channels = ["Google", "X.com", "Github", "Vimeo", "Facebook"].map((name) => ({ name, visitors: "3.5K", revenue: "$4,220.00", sales: "3,456", conversion: "2.59%" }));

export function TopProductsTable() {
  return <TableCard title="Top Product"><Table><TableHeader><TableRow><TableHead className="pl-6">Rep Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Sold</TableHead><TableHead className="pr-6">Profit</TableHead></TableRow></TableHeader><TableBody>{products.map((product) => <TableRow key={product.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9 rounded-lg"><AvatarFallback className="rounded-lg bg-muted text-xs font-semibold">{getInitials(product.name)}</AvatarFallback></Avatar><span className="whitespace-nowrap font-medium">{product.name}</span></div></TableCell><TableCell className="text-muted-foreground">{product.category}</TableCell><TableCell className="tabular-nums">{product.price}</TableCell><TableCell className="tabular-nums">{product.sold}</TableCell><TableCell className="pr-6 font-medium text-emerald-600">{product.profit}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const products = [
  { name: "Keyboard H32", category: "Electronics", price: "$269", sold: "1,284", profit: "$2,442" },
  { name: "Mouse M12 Pro", category: "Electronics", price: "$54", sold: "934", profit: "$1,752" },
  { name: "Gaming Chair X5", category: "Electronics", price: "$140", sold: "732", profit: "$1,471" },
  { name: "Wireless Headset V7", category: "Electronics", price: "$45", sold: "1,120", profit: "$1,400" },
  { name: "4K Monitor S24", category: "Electronics", price: "$350", sold: "64", profit: "$590" },
];

export function TransactionsTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const rows = useMemo(() => transactions.filter((row) =>
    `${row.id} ${row.customer} ${row.status}`.toLowerCase().includes(query.trim().toLowerCase()) &&
    (statusFilter.length === 0 || statusFilter.includes(row.status)),
  ), [query, statusFilter]);
  const allSelected = rows.length > 0 && rows.every((row) => selected.includes(row.id));
  const selectedVisibleCount = rows.filter((row) => selected.includes(row.id)).length;

  async function copyOrderId(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      toast.success(`Copied ${id}`);
    } catch {
      toast.error("Unable to copy the order ID.");
    }
  }

  function exportTransactions() {
    const exportRows = selected.length
      ? transactions.filter((row) => selected.includes(row.id))
      : rows;
    const csv = [
      ["Order", "Date", "Time", "Customer", "Amount", "Status"],
      ...exportRows.map((row) => [row.id, row.date, row.time, row.customer, row.amount, row.status]),
    ].map((line) => line.map(escapeCsvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    toast.success(`${exportRows.length} transactions exported`);
  }

  const action = (
    <div className="flex items-center gap-2">
      <div className="relative w-36 sm:w-48">
        <IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search" className="h-9 pl-8" aria-label="Search transactions" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="size-9" aria-label="Filter transactions by status">
            <IconAdjustmentsHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[...new Set(transactions.map((row) => row.status))].map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={statusFilter.includes(status)}
              onCheckedChange={(checked) =>
                setStatusFilter((current) =>
                  checked
                    ? [...current, status]
                    : current.filter((value) => value !== status),
                )
              }
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" size="icon" className="size-9" aria-label="Export transactions" onClick={exportTransactions}>
        <IconDownload className="size-4" />
      </Button>
    </div>
  );
  return <TableCard title="Last Transaction" action={action}><Table className="min-w-[780px]"><TableHeader><TableRow><TableHead className="w-10 pl-5"><Checkbox checked={allSelected ? true : selectedVisibleCount > 0 ? "indeterminate" : false} onCheckedChange={(checked) => setSelected(checked ? [...new Set([...selected, ...rows.map((row) => row.id)])] : selected.filter((id) => !rows.some((row) => row.id === id)))} aria-label="Select all transactions" /></TableHead><TableHead>Order</TableHead><TableHead>Date</TableHead><TableHead>Customer</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-center">Action</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.id}><TableCell className="pl-5"><Checkbox checked={selected.includes(row.id)} onCheckedChange={(checked) => setSelected((current) => checked ? [...new Set([...current, row.id])] : current.filter((id) => id !== row.id))} aria-label={`Select ${row.id}`} /></TableCell><TableCell className="font-medium tabular-nums">{row.id}</TableCell><TableCell className="whitespace-nowrap text-muted-foreground">{row.date} · {row.time}</TableCell><TableCell className="font-medium">{row.customer}</TableCell><TableCell className="font-medium tabular-nums">{row.amount}</TableCell><TableCell><Badge variant="secondary" className={row.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : row.status === "Shipped" ? "bg-violet-500/10 text-violet-600" : "bg-muted text-muted-foreground"}>{row.status}</Badge></TableCell><TableCell className="text-center"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${row.id}`}><IconDots className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => void copyOrderId(row.id)}>Copy order ID</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>)}{rows.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No transactions found.</TableCell></TableRow>}</TableBody></Table></TableCard>;
}

const transactions = [
  { id: "#ORD-2958", date: "26 Dec 2026", time: "12:45 PM", customer: "Amelia Chen", amount: "$288.7", status: "Shipped" },
  { id: "#ORD-8539", date: "26 Dec 2026", time: "11:00 PM", customer: "Marcus Bell", amount: "$200", status: "Delivered" },
  { id: "#ORD-1047", date: "26 Dec 2026", time: "4:57 PM", customer: "Priya Natarajan", amount: "$509", status: "Delivered" },
  { id: "#ORD-6392", date: "26 Dec 2026", time: "2:14 PM", customer: "Jonas Weber", amount: "$420.5", status: "Pending" },
  { id: "#ORD-4715", date: "26 Dec 2026", time: "07:00 AM", customer: "Sofia Rinaldi", amount: "$510.2", status: "Returned" },
];

export function UsersTable() {
  const [rows, setRows] = useState(users);
  const [editingUser, setEditingUser] = useState<(typeof users)[number] | null>(null);
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");

  function openEditor(user: (typeof users)[number]) {
    setEditingUser(user);
    setPosition(user.position);
    setRole(user.role);
  }

  function saveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingUser || !position.trim() || !role.trim()) return;

    setRows((current) => current.map((user) =>
      user.email === editingUser.email
        ? { ...user, position: position.trim(), role: role.trim() }
        : user,
    ));
    toast.success(`${editingUser.name} updated`);
    setEditingUser(null);
  }

  return (
    <>
      <TableCard flush>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((user) => (
              <TableRow key={user.email} className="[&_td]:h-16 [&_td]:border-0">
                <TableCell className="pl-6 font-medium">{user.name}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="pr-6">
                  <Button variant="link" className="h-auto p-0" onClick={() => openEditor(user)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>

      <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingUser?.name}</DialogTitle>
            <DialogDescription>Update this member’s position and role.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveUser} className="space-y-4">
            <label className="grid gap-2 text-sm font-medium">
              Position
              <Input value={position} onChange={(event) => setPosition(event.currentTarget.value)} required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Role
              <Input value={role} onChange={(event) => setRole(event.currentTarget.value)} required />
            </label>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!position.trim() || !role.trim()}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const users = [
  { name: "Musharof Chowdhury", position: "Multidisciplinary Web Entrepreneur", email: "musharof@example.com", role: "Owner" },
  { name: "Naimur Rahman", position: "Website Front-end Developer", email: "naimurrahman@example.com", role: "Member" },
  { name: "Shafiq Hammad", position: "Regional Paradigm Technician", email: "shafiq.hd@example.com", role: "Moderator" },
  { name: "Alex Semuyel", position: "Applications Engineer", email: "alex.semuel@example.com", role: "Admin" },
  { name: "Sulium Keliym", position: "Lead Implementation Liaison", email: "suliym.info@example.com", role: "Member" },
  { name: "Jhon Smith", position: "Multidisciplinary Web Entrepreneur", email: "jhon.smith@example.com", role: "Member" },
];

const projectRows = [
  { name: "Lindsey Curtis", role: "Web Designer", project: "Agency Website", team: ["LC", "JD", "AM"], status: "Active", budget: "$3.9K" },
  { name: "Kaiya George", role: "Project Manager", project: "Technology", team: ["KG", "MW"], status: "Pending", budget: "$24.9K" },
  { name: "Zain Geidt", role: "Content Writer", project: "Blog Writing", team: ["ZG"], status: "Active", budget: "$12.7K" },
  { name: "Abram Schleifer", role: "Digital Marketer", project: "Social Media", team: ["AS", "CJ", "TW"], status: "Canceled", budget: "$2.8K" },
  { name: "Carla George", role: "Front-end Developer", project: "Website", team: ["CG", "LC", "JD"], status: "Active", budget: "$4.5K" },
];

export function ProjectTeamTable() {
  return <TableCard title="Projects Overview"><Table className="min-w-[700px]"><TableHeader><TableRow><TableHead className="pl-6">Project</TableHead><TableHead>Team</TableHead><TableHead>Status</TableHead><TableHead className="pr-6 text-right">Budget</TableHead></TableRow></TableHeader><TableBody>{projectRows.map((row) => <TableRow key={row.project}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9 rounded-lg"><AvatarFallback className="rounded-lg bg-primary/10 text-xs font-semibold text-primary">{getInitials(row.name)}</AvatarFallback></Avatar><div><p className="font-medium">{row.project}</p><p className="text-xs text-muted-foreground">{row.name} · {row.role}</p></div></div></TableCell><TableCell><div className="flex -space-x-2">{row.team.map((person, index) => <Avatar key={`${row.project}-${person}-${index}`} className="size-8 border-2 border-card"><AvatarFallback className="bg-muted text-[10px]">{person}</AvatarFallback></Avatar>)}</div></TableCell><TableCell><Badge variant="secondary" className={row.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"}>{row.status}</Badge></TableCell><TableCell className="pr-6 text-right font-medium tabular-nums">{row.budget}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const orderRows = [
  { id: "DE124321", customer: "John Doe", email: "johndoe@gmail.com", item: "Software License", value: "$18,500.34", date: "Jun 15, 2026", status: "Complete" },
  { id: "DE124322", customer: "Jane Smith", email: "janesmith@gmail.com", item: "Cloud Hosting", value: "$12,990.00", date: "Jun 18, 2026", status: "Pending" },
  { id: "DE124323", customer: "Michael Brown", email: "michael@example.com", item: "Web Domain", value: "$950.00", date: "Jun 20, 2026", status: "Canceled" },
  { id: "DE124324", customer: "Alice Johnson", email: "alice@example.com", item: "SSL Certificate", value: "$230.45", date: "Jun 25, 2026", status: "Pending" },
  { id: "DE124325", customer: "Robert Lee", email: "robert@example.com", item: "Premium Support", value: "$1,520.00", date: "Jun 30, 2026", status: "Complete" },
];

export function RecentOrdersTable() {
  const [query, setQuery] = useState("");
  const filtered = orderRows.filter((row) => `${row.id} ${row.customer} ${row.item} ${row.status}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <TableCard
      title="Recent Orders"
      action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search recent orders"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search orders"
              className="h-9 w-36 pl-8 sm:w-48"
            />
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/commerce/orders">See all</Link>
          </Button>
        </div>
      }
    >
      <Table className="min-w-[820px]">
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">Deal ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product / Service</TableHead>
            <TableHead>Deal Value</TableHead>
            <TableHead>Close Date</TableHead>
            <TableHead className="pr-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="pl-6 font-medium">{row.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-[10px]">{getInitials(row.customer)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{row.customer}</p>
                    <p className="text-xs text-muted-foreground">{row.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell className="font-medium tabular-nums">{row.value}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{row.date}</TableCell>
              <TableCell className="pr-6">
                <Badge variant="secondary" className={row.status === "Complete" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                No matching orders.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableCard>
  );
}
