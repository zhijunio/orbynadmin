"use client";
import { getInitials } from "@/lib/text";

import { PageHeader } from "@/components/feature/layout/PageHeader";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableCard } from "./_components/TableCard";
import { toast } from "sonner";
import { Download as IconDownload, Eye as IconEye, Trash as IconTrash, SlidersHorizontal as IconAdjustmentsHorizontal, Ellipsis as IconDots, Search as IconSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function LeadsReportTable() {
  return <TableCard title="Leads Report" flush><Table><TableHeader><TableRow className="bg-muted/40"><TableHead className="pl-6">Rep Name</TableHead><TableHead>Deals Closed</TableHead><TableHead>Revenue</TableHead><TableHead className="pr-6">Performance</TableHead></TableRow></TableHeader><TableBody>{leads.map((lead) => <TableRow key={lead.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9"><AvatarFallback>{getInitials(lead.name)}</AvatarFallback></Avatar><div><p className="font-medium">{lead.name}</p><p className="text-xs text-muted-foreground">{lead.role}</p></div></div></TableCell><TableCell className="tabular-nums">{lead.deals}</TableCell><TableCell className="font-medium tabular-nums">${lead.revenue.toLocaleString()}</TableCell><TableCell className="pr-6"><Badge variant="secondary" className={lead.performance > 85 ? "bg-emerald-500/10 text-emerald-600" : lead.performance > 75 ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"}>{lead.performance}%</Badge></TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const leads = [
  { name: "John Smith", role: "Sales Manager", deals: 24, revenue: 540000, performance: 125 },
  { name: "Alex Rodriguez", role: "Senior Account Executive", deals: 18, revenue: 410000, performance: 115 },
  { name: "Emily Johnson", role: "Account Executive", deals: 14, revenue: 320000, performance: 95 },
  { name: "Michael Brown", role: "Business Development Rep", deals: 11, revenue: 210000, performance: 82 },
  { name: "Sarah Wilson", role: "Account Executive", deals: 8, revenue: 180000, performance: 70 },
];

function PackagesTable() {
  return <TableCard flush><Table><TableHeader><TableRow className="bg-muted/40"><TableHead className="pl-6">Package</TableHead><TableHead>Invoice Date</TableHead><TableHead>Status</TableHead><TableHead className="pr-6">Action</TableHead></TableRow></TableHeader><TableBody>{packages.map((pkg, index) => <TableRow key={`${pkg.name}-${index}`}><TableCell className="pl-6"><p className="font-medium">{pkg.name}</p><p className="text-xs text-muted-foreground">{pkg.detail}</p></TableCell><TableCell>{pkg.date}</TableCell><TableCell><Badge variant="secondary" className={pkg.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : pkg.status === "Unpaid" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}>{pkg.status}</Badge></TableCell><TableCell className="pr-6"><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="size-8" aria-label="View package" onClick={() => toast.info(`Viewing ${pkg.name}`)}><IconEye className="size-4" /></Button><Button variant="ghost" size="icon" className="size-8 text-destructive" aria-label="Delete package" onClick={() => toast.info(`Delete ${pkg.name}`)}><IconTrash className="size-4" /></Button><Button variant="ghost" size="icon" className="size-8" aria-label="Download invoice" onClick={() => toast.success(`Downloading ${pkg.name} invoice`)}><IconDownload className="size-4" /></Button></div></TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const packages = [
  { name: "Free Packages", detail: "$0.00", date: "Jan 13, 2023", status: "Paid" },
  { name: "Standard Package", detail: "Senior Account Executive", date: "Dec 25, 2022", status: "Paid" },
  { name: "Business Package", detail: "Account Executive", date: "Mar 22, 2023", status: "Unpaid" },
  { name: "Standard Package", detail: "$59.00", date: "Feb 22, 2022", status: "Pending" },
];

function TopChannelsTable() {
  return <TableCard title="Top Channels"><Table><TableHeader><TableRow><TableHead className="pl-6">Source</TableHead><TableHead>Visitors</TableHead><TableHead>Revenues</TableHead><TableHead>Sales</TableHead><TableHead className="pr-6">Conversion</TableHead></TableRow></TableHeader><TableBody>{channels.map((channel) => <TableRow key={channel.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-8"><AvatarFallback className="text-xs font-semibold">{channel.name.slice(0,1)}</AvatarFallback></Avatar><span className="font-medium">{channel.name}</span></div></TableCell><TableCell>{channel.visitors}</TableCell><TableCell className="font-medium text-emerald-600">{channel.revenue}</TableCell><TableCell>{channel.sales}</TableCell><TableCell className="pr-6">{channel.conversion}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const channels = ["Google", "X.com", "Github", "Vimeo", "Facebook"].map((name) => ({ name, visitors: "3.5K", revenue: "$4,220.00", sales: "3,456", conversion: "2.59%" }));

function TopProductsTable() {
  return <TableCard title="Top Product"><Table><TableHeader><TableRow><TableHead className="pl-6">Rep Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Sold</TableHead><TableHead className="pr-6">Profit</TableHead></TableRow></TableHeader><TableBody>{products.map((product) => <TableRow key={product.name}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9 rounded-lg"><AvatarFallback className="rounded-lg bg-muted text-xs font-semibold">{getInitials(product.name)}</AvatarFallback></Avatar><span className="whitespace-nowrap font-medium">{product.name}</span></div></TableCell><TableCell className="text-muted-foreground">{product.category}</TableCell><TableCell className="tabular-nums">{product.price}</TableCell><TableCell className="tabular-nums">{product.sold}</TableCell><TableCell className="pr-6 font-medium text-emerald-600">{product.profit}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const products = [
  { name: "Keyboard H32", category: "Electronics", price: "$269", sold: "1,284", profit: "$2,442" },
  { name: "Mouse M12 Pro", category: "Electronics", price: "$54", sold: "934", profit: "$1,752" },
  { name: "Gaming Chair X5", category: "Electronics", price: "$140", sold: "732", profit: "$1,471" },
  { name: "Wireless Headset V7", category: "Electronics", price: "$45", sold: "1,120", profit: "$1,400" },
  { name: "4K Monitor S24", category: "Electronics", price: "$350", sold: "64", profit: "$590" },
];

function TransactionsTable() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const rows = useMemo(() => transactions.filter((row) => `${row.id} ${row.customer} ${row.status}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const allSelected = rows.length > 0 && rows.every((row) => selected.includes(row.id));
  const action = <div className="flex items-center gap-2"><div className="relative w-36 sm:w-48"><IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="h-9 pl-8" /></div><Button variant="outline" size="icon" className="size-9" aria-label="Filter transactions" onClick={() => toast.info("Add transaction filters") }><IconAdjustmentsHorizontal className="size-4" /></Button><Button variant="outline" size="icon" className="size-9" aria-label="Export transactions" onClick={() => toast.success(`${selected.length || rows.length} transactions exported`)}><IconDownload className="size-4" /></Button></div>;
  return <TableCard title="Last Transaction" action={action}><Table className="min-w-[780px]"><TableHeader><TableRow><TableHead className="w-10 pl-5"><Checkbox checked={allSelected ? true : selected.length > 0 ? "indeterminate" : false} onCheckedChange={(checked) => setSelected(checked ? [...new Set([...selected, ...rows.map((row) => row.id)])] : selected.filter((id) => !rows.some((row) => row.id === id)))} aria-label="Select all transactions" /></TableHead><TableHead>Order</TableHead><TableHead>Date</TableHead><TableHead>Customer</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-center">Action</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.id}><TableCell className="pl-5"><Checkbox checked={selected.includes(row.id)} onCheckedChange={(checked) => setSelected((current) => checked ? [...current, row.id] : current.filter((id) => id !== row.id))} aria-label={`Select ${row.id}`} /></TableCell><TableCell className="font-medium tabular-nums">{row.id}</TableCell><TableCell className="whitespace-nowrap text-muted-foreground">{row.date} · {row.time}</TableCell><TableCell className="font-medium">{row.customer}</TableCell><TableCell className="font-medium tabular-nums">{row.amount}</TableCell><TableCell><Badge variant="secondary" className={row.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : row.status === "Shipped" ? "bg-violet-500/10 text-violet-600" : "bg-muted text-muted-foreground"}>{row.status}</Badge></TableCell><TableCell className="text-center"><Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${row.id}`} onClick={() => toast.info(`Actions for ${row.id}`)}><IconDots className="size-4" /></Button></TableCell></TableRow>)}{rows.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No transactions found.</TableCell></TableRow>}</TableBody></Table></TableCard>;
}

const transactions = [
  { id: "#ORD-2958", date: "26 Dec 2026", time: "12:45 PM", customer: "Amelia Chen", amount: "$288.7", status: "Shipped" },
  { id: "#ORD-8539", date: "26 Dec 2026", time: "11:00 PM", customer: "Marcus Bell", amount: "$200", status: "Delivered" },
  { id: "#ORD-1047", date: "26 Dec 2026", time: "4:57 PM", customer: "Priya Natarajan", amount: "$509", status: "Delivered" },
  { id: "#ORD-6392", date: "26 Dec 2026", time: "2:14 PM", customer: "Jonas Weber", amount: "$420.5", status: "Pending" },
  { id: "#ORD-4715", date: "26 Dec 2026", time: "07:00 AM", customer: "Sofia Rinaldi", amount: "$510.2", status: "Returned" },
];

function UsersTable() {
  return <TableCard flush><Table><TableHeader><TableRow className="bg-muted/40"><TableHead className="pl-6">Name</TableHead><TableHead>Position</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead className="pr-6">Action</TableHead></TableRow></TableHeader><TableBody>{users.map((user) => <TableRow key={user.email} className="[&_td]:h-16 [&_td]:border-0"><TableCell className="pl-6 font-medium">{user.name}</TableCell><TableCell>{user.position}</TableCell><TableCell className="whitespace-nowrap">{user.email}</TableCell><TableCell>{user.role}</TableCell><TableCell className="pr-6"><Button variant="link" className="h-auto p-0" onClick={() => toast.info(`Edit ${user.name}`)}>Edit</Button></TableCell></TableRow>)}</TableBody></Table></TableCard>;
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

function ProjectTeamTable() {
  return <TableCard title="Projects Overview" description="Project ownership, team, status, and budget."><Table className="min-w-[700px]"><TableHeader><TableRow><TableHead className="pl-6">Project</TableHead><TableHead>Team</TableHead><TableHead>Status</TableHead><TableHead className="pr-6 text-right">Budget</TableHead></TableRow></TableHeader><TableBody>{projectRows.map((row) => <TableRow key={row.project}><TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-9 rounded-lg"><AvatarFallback className="rounded-lg bg-primary/10 text-xs font-semibold text-primary">{getInitials(row.name)}</AvatarFallback></Avatar><div><p className="font-medium">{row.project}</p><p className="text-xs text-muted-foreground">{row.name} · {row.role}</p></div></div></TableCell><TableCell><div className="flex -space-x-2">{row.team.map((person, index) => <Avatar key={`${row.project}-${person}-${index}`} className="size-8 border-2 border-card"><AvatarFallback className="bg-muted text-[10px]">{person}</AvatarFallback></Avatar>)}</div></TableCell><TableCell><Badge variant="secondary" className={row.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"}>{row.status}</Badge></TableCell><TableCell className="pr-6 text-right font-medium tabular-nums">{row.budget}</TableCell></TableRow>)}</TableBody></Table></TableCard>;
}

const orderRows = [
  { id: "DE124321", customer: "John Doe", email: "johndoe@gmail.com", item: "Software License", value: "$18,500.34", date: "Jun 15, 2026", status: "Complete" },
  { id: "DE124322", customer: "Jane Smith", email: "janesmith@gmail.com", item: "Cloud Hosting", value: "$12,990.00", date: "Jun 18, 2026", status: "Pending" },
  { id: "DE124323", customer: "Michael Brown", email: "michael@example.com", item: "Web Domain", value: "$950.00", date: "Jun 20, 2026", status: "Canceled" },
  { id: "DE124324", customer: "Alice Johnson", email: "alice@example.com", item: "SSL Certificate", value: "$230.45", date: "Jun 25, 2026", status: "Pending" },
  { id: "DE124325", customer: "Robert Lee", email: "robert@example.com", item: "Premium Support", value: "$1,520.00", date: "Jun 30, 2026", status: "Complete" },
];

function RecentOrdersTable() {
  const [query, setQuery] = useState("");
  const filtered = orderRows.filter((row) => `${row.id} ${row.customer} ${row.item} ${row.status}`.toLowerCase().includes(query.toLowerCase()));
  return <TableCard title="Recent Orders" description="Recent deals and their fulfillment status." action={<div className="flex items-center gap-2"><div className="relative"><IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders" className="h-9 w-36 pl-8 sm:w-48" /></div><Button variant="outline" size="sm" onClick={() => toast.info("Showing all orders")}>See all</Button></div>}><Table className="min-w-[820px]"><TableHeader><TableRow><TableHead className="pl-6">Deal ID</TableHead><TableHead>Customer</TableHead><TableHead>Product / Service</TableHead><TableHead>Deal Value</TableHead><TableHead>Close Date</TableHead><TableHead className="pr-6">Status</TableHead></TableRow></TableHeader><TableBody>{filtered.map((row) => <TableRow key={row.id}><TableCell className="pl-6 font-medium">{row.id}</TableCell><TableCell><div className="flex items-center gap-2.5"><Avatar className="size-8"><AvatarFallback className="text-[10px]">{getInitials(row.customer)}</AvatarFallback></Avatar><div><p className="font-medium">{row.customer}</p><p className="text-xs text-muted-foreground">{row.email}</p></div></div></TableCell><TableCell>{row.item}</TableCell><TableCell className="font-medium tabular-nums">{row.value}</TableCell><TableCell className="whitespace-nowrap text-muted-foreground">{row.date}</TableCell><TableCell className="pr-6"><Badge variant="secondary" className={row.status === "Complete" ? "bg-emerald-500/10 text-emerald-600" : row.status === "Pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"}>{row.status}</Badge></TableCell></TableRow>)}{filtered.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No matching orders.</TableCell></TableRow>}</TableBody></Table></TableCard>;
}

export default function BasicTablesPage() {
  return <div className="space-y-6"><PageHeader title="Basic Tables" /><div className="space-y-5"><ProjectTeamTable /><RecentOrdersTable /><TopProductsTable /><LeadsReportTable /><PackagesTable /><TransactionsTable /><TopChannelsTable /><UsersTable /></div></div>;
}
