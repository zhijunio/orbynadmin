"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import { StatCard } from "@/components/feature/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const metrics = [
  { label: "Users", value: "10,590", change: 3.52, trend: "up" as const, hint: "Last 30 Days" },
  { label: "Projects", value: "15,682", change: 3.52, trend: "up" as const, hint: "Last 30 Days" },
  { label: "Revenue", value: "$90,369", change: 14.8, trend: "up" as const, hint: "Last 30 Days" },
  { label: "Paid Users", value: "520", change: 9.05, trend: "down" as const, hint: "Last 30 Days" },
];

const monthly = [
  { month: "Jan", users: 23, revenue: 12 }, { month: "Feb", users: 24, revenue: 13 },
  { month: "Mar", users: 24, revenue: 13 }, { month: "Apr", users: 25, revenue: 14 },
  { month: "May", users: 25, revenue: 15 }, { month: "Jun", users: 26, revenue: 16 },
  { month: "Jul", users: 27, revenue: 16 }, { month: "Aug", users: 26, revenue: 17 },
  { month: "Sep", users: 26, revenue: 17 }, { month: "Oct", users: 26, revenue: 17 },
  { month: "Nov", users: 26, revenue: 17 }, { month: "Dec", users: 26, revenue: 17 },
];

const tokenUsage = [
  { provider: "GPT", keys: "2 API keys configured", tokens: "7.0M", share: 78, color: "bg-primary" },
  { provider: "Gemini", keys: "1 API key configured", tokens: "2.5", share: 45, color: "bg-violet-500" },
  { provider: "xAI", keys: "2 API keys configured", tokens: "4.5M", share: 62, color: "bg-emerald-500" },
];

const transactions = [
  ["John Doe", "johndoe@gmail.com", "Starter · Monthly", "$20.00", "Feb 28, 2029", "Active"],
  ["Kierra Miles", "kierra@gmail.com", "Growth · Yearly", "$249.00", "Jan 28, 2029", "Active"],
  ["Emerson Workman", "emerson@gmail.com", "Premium · Monthly", "$199.00", "Jan 05, 2029", "Expired"],
  ["Chance Philips", "chance@gmail.com", "Growth · Yearly", "$249.00", "Dec 12, 2028", "Active"],
  ["Terry Geidt", "terry@gmail.com", "Starter · Monthly", "$20.00", "Nov 25, 2028", "Expired"],
  ["Avery Moore", "avery@gmail.com", "Premium · Yearly", "$1,999.00", "Nov 12, 2028", "Active"],
  ["Olivia Martin", "olivia@gmail.com", "Growth · Monthly", "$29.00", "Oct 31, 2028", "Active"],
  ["Noah Carter", "noah@gmail.com", "Starter · Yearly", "$199.00", "Oct 16, 2028", "Expired"],
  ["Mia Davis", "mia@gmail.com", "Premium · Monthly", "$199.00", "Oct 03, 2028", "Active"],
  ["Ethan Wilson", "ethan@gmail.com", "Growth · Monthly", "$29.00", "Sep 22, 2028", "Active"],
];

export default function AiDashboardPage() {
  const [period, setPeriod] = useState("Monthly");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const chartData = period === "Monthly" ? monthly : period === "Quarterly"
    ? Array.from({ length: 4 }, (_, index) => ({
      month: `Q${index + 1}`,
      users: monthly.slice(index * 3, index * 3 + 3).reduce((sum, item) => sum + (item.users ?? 0), 0),
      revenue: monthly.slice(index * 3, index * 3 + 3).reduce((sum, item) => sum + (item.revenue ?? 0), 0),
    }))
    : [{ month: "2028", users: monthly.reduce((sum, item) => sum + (item.users ?? 0), 0), revenue: monthly.reduce((sum, item) => sum + (item.revenue ?? 0), 0) }];
  const filteredTransactions = transactions.filter((row) =>
    row.join(" ").toLowerCase().includes(query.toLowerCase()) && (status === "All" || row[5] === status)
  );
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const visibleTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <StatCard key={metric.label} stat={metric} />)}</div>

      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between gap-4"><div><CardTitle>Users &amp; Revenue Statistics</CardTitle><p className="mt-1 text-sm text-muted-foreground">Visualize month-to-month progress and engagement.</p></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader>
          <CardContent><div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-1" />Users</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-2" />Revenue</span></div><div className="h-[300px]"><ApexChart type="area" height="100%" options={{
            chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
            colors: ["var(--chart-1)", "var(--chart-2)"], stroke: { curve: "smooth", width: 2 },
            fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
            dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
            xaxis: { categories: chartData.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
            yaxis: { min: 0, max: 35, tickAmount: 7, labels: { formatter: (value) => `${value}k` } },
            tooltip: { y: { formatter: (value) => `${value}k` } }, legend: { show: false },
          }} series={[{ name: "Users", data: chartData.map(({ users }) => users) }, { name: "Revenue", data: chartData.map(({ revenue }) => revenue) }]} /></div></CardContent>
        </Card>
        <Card><CardHeader><CardTitle>API Token Usages</CardTitle></CardHeader><CardContent><div className="flex h-52 items-center justify-center"><div className="flex size-48 items-center justify-center rounded-full" style={{ background: "conic-gradient(from 0deg, #7593ff 0deg 210deg, #68c9ed 210deg 305deg, transparent 305deg 360deg)" }}><div className="size-28 rounded-full bg-card" /></div></div><div className="mt-2 divide-y">{tokenUsage.map((item, index) => <div key={item.provider} className="flex items-center gap-3 py-3"><span className="flex size-9 items-center justify-center rounded-full border bg-muted/20 text-xs font-semibold">{index === 0 ? "◎" : index === 1 ? "✦" : "𝕏"}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.provider}</p><p className="text-xs text-muted-foreground">{item.keys}</p></div><div className="text-right"><p className="text-sm font-semibold">{item.tokens}</p><p className="text-[11px] text-muted-foreground">Token used</p></div></div>)}</div><Button variant="link" className="mt-2 w-full">View All Usage Details</Button></CardContent></Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>User Analytics</CardTitle><p className="mt-1 text-sm text-muted-foreground">Platform user insights</p></CardHeader><CardContent><div className="mb-3 flex items-center justify-between border-b pb-3 text-sm"><span className="text-muted-foreground">Total Users</span><span className="text-lg font-semibold">10,590</span></div><div className="grid grid-cols-2 gap-1 rounded-xl border bg-muted/10 p-1">{[["Free Users", "15,682", "95% of total user", "text-chart-1"], ["Paid Users", "305", "5% of total user", "text-orange-500"], ["This Month", "4,925", "+5,238 from last month", "text-emerald-600"], ["This Year", "12,489", "+12,495 from last year", "text-pink-500"]].map(([label, value, note, tone]) => <div key={label} className="min-h-28 rounded-lg border bg-card p-4"><p className="text-sm font-medium">{label}</p><p className="mt-3 text-xl font-semibold">{value}</p><p className={`mt-1 text-xs ${tone}`}>{note}</p></div>)}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Projects Analytics</CardTitle><p className="mt-1 text-sm text-muted-foreground">View detailed project insights</p></CardHeader><CardContent><div className="mb-3 flex items-center justify-between border-b pb-3 text-sm"><span className="text-muted-foreground">Total Projects</span><span className="text-lg font-semibold">15,682</span></div><div className="grid grid-cols-2 gap-1 rounded-xl border bg-muted/10 p-1">{[["Today", "120", "Project created", "text-violet-500"], ["Yesterday", "392", "Project created", "text-sky-500"], ["This Month", "3,835", "+2,093 from last month", "text-emerald-600"], ["This Year", "12,958", "+8,532 from last year", "text-pink-500"]].map(([label, value, note, tone]) => <div key={label} className="min-h-28 rounded-lg border bg-card p-4"><p className="text-sm font-medium">{label}</p><p className="mt-3 text-xl font-semibold">{value}</p><p className={`mt-1 text-xs ${tone}`}>{note}</p></div>)}</div></CardContent></Card>
      </div>

      <Card><CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Recent Transactions</CardTitle></div><div className="flex flex-col gap-2 sm:flex-row"><Input className="sm:w-56" placeholder="Search transactions..." value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /><div className="flex rounded-md border p-1">{["All", "Active", "Expired"].map((item) => <button type="button" key={item} onClick={() => { setStatus(item); setPage(1); }} className={`rounded px-2.5 py-1 text-xs ${status === item ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}>{item}</button>)}</div></div></CardHeader><CardContent className="px-0 pb-0"><div className="overflow-x-auto"><Table className="min-w-[760px]"><TableHeader><TableRow><TableHead>Paid By</TableHead><TableHead>Package Name</TableHead><TableHead>Price</TableHead><TableHead>Paid Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{visibleTransactions.map(([name, email, plan, price, date, state]) => <TableRow key={email}><TableCell><div className="font-medium">{name}</div><div className="text-xs text-muted-foreground">{email}</div></TableCell><TableCell>{plan}</TableCell><TableCell>{price}</TableCell><TableCell>{date}</TableCell><TableCell><Badge variant={state === "Active" ? "secondary" : "outline"}>{state}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => toast("Subscription details", { description: `${name} · ${plan} · ${state}` })}>View</Button></TableCell></TableRow>)}</TableBody></Table>{filteredTransactions.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No transactions found.</p>}</div><div className="flex flex-col gap-3 border-t px-6 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Showing {filteredTransactions.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredTransactions.length)} of {filteredTransactions.length} transactions</span><div className="flex items-center gap-2"><span>Page {page} of {pageCount}</span><Pagination className="mx-0 w-auto"><PaginationContent className="gap-1"><PaginationItem><PaginationPrevious href="#" text="Previous" className="h-8 [&>span]:block aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined} onClick={(event) => { event.preventDefault(); setPage((current) => Math.max(1, current - 1)); }} /></PaginationItem><PaginationItem><PaginationNext href="#" text="Next" className="h-8 [&>span]:block aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={page >= pageCount} tabIndex={page >= pageCount ? -1 : undefined} onClick={(event) => { event.preventDefault(); setPage((current) => Math.min(pageCount, current + 1)); }} /></PaginationItem></PaginationContent></Pagination></div></div></CardContent></Card>
    </div>
  );
}
