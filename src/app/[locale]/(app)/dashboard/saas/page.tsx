"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { StatCard } from "@/components/feature/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight as IconArrowRight, Check as IconCheck } from "lucide-react";
import { toast } from "sonner";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { getInitials } from "@/lib/text";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const overview = [
  { label: "Total Revenue", value: "$200,458", change: 2.5, trend: "up" as const, hint: "vs. last week" },
  { label: "Active Users", value: "9,528", change: 9.5, trend: "up" as const, hint: "vs. last month" },
  { label: "Customer Lifetime Value", value: "$849.54", change: 1.6, trend: "down" as const, hint: "vs. last month" },
  { label: "Customer Acquisition Cost", value: "$95.28", change: 3.5, trend: "up" as const, hint: "vs. last month" },
];
const invoices = [
  ["#DF429", "Apr 28, 2026", "Jenny Wilson", "$473.85", "Complete"],
  ["#HTY274", "Mar 30, 2026", "Wade Warren", "$293.01", "Complete"],
  ["#LKE600", "Mar 19, 2026", "Darlene Robertson", "$782.01", "Pending"],
  ["#HRP447", "Feb 20, 2026", "Arlene McCoy", "$202.87", "Cancelled"],
  ["#WRH647", "Feb 13, 2026", "Bessie Cooper", "$490.51", "Complete"],
];
const activities = [
  { name: "Francisco Grbbs", action: "created invoice", id: "PQ-4491C", time: "Just now" },
  { name: "Courtney Henry", action: "created invoice", id: "HK-234G", time: "15 minutes ago" },
  { name: "Bessie Cooper", action: "joined the Growth plan", id: "Workspace plan", time: "Yesterday" },
  { name: "Theresa Webb", action: "created invoice", id: "CK-125NH", time: "2 days ago" },
];
const trend = [
  { month: "Jan", daily: 180, online: 290, users: 210 }, { month: "Feb", daily: 210, online: 310, users: 240 },
  { month: "Mar", daily: 195, online: 280, users: 230 }, { month: "Apr", daily: 250, online: 350, users: 290 },
  { month: "May", daily: 280, online: 370, users: 330 }, { month: "Jun", daily: 270, online: 390, users: 350 },
  { month: "Jul", daily: 330, online: 420, users: 370 }, { month: "Aug", daily: 360, online: 460, users: 390 },
  { month: "Sep", daily: 340, online: 440, users: 420 }, { month: "Oct", daily: 390, online: 490, users: 450 },
  { month: "Nov", daily: 430, online: 520, users: 480 }, { month: "Dec", daily: 470, online: 560, users: 520 },
];
const funnels = [{ label: "Visitors", count: "24,800", width: "100%" }, { label: "Sign ups", count: "8,450", width: "72%" }, { label: "Activated", count: "4,920", width: "48%" }, { label: "Paid users", count: "1,842", width: "28%" }];

export default function SaaSDashboardPage() {
  const [performance, setPerformance] = useState("Daily Sales");
  const [period, setPeriod] = useState("Monthly");
  const [query, setQuery] = useState("");
  const data = period === "Monthly" ? trend : period === "Quarterly" ? trend.filter((_, index) => index % 3 === 2) : trend.filter((_, index) => index % 6 === 5);
  const visibleInvoices = invoices.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <PageHeader title="SaaS Dashboard" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{overview.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
    <div className="grid gap-4 xl:grid-cols-3"><Card><CardHeader><CardTitle>Churn Rate</CardTitle></CardHeader><CardContent><p className="text-4xl font-semibold">4.26%</p><p className="mt-2 text-sm text-emerald-600">↓ 0.31% than last week</p><div className="mt-6 h-2 rounded-full bg-muted"><div className="h-full w-[24%] rounded-full bg-primary" /></div><p className="mt-2 text-xs text-muted-foreground">Below the 5% monthly target</p></CardContent></Card><Card><CardHeader><CardTitle>User Growth</CardTitle></CardHeader><CardContent><p className="text-4xl font-semibold">3,768</p><p className="mt-2 text-sm text-emerald-600">↗ 3.85% than last week</p><div className="mt-5 flex h-12 items-end gap-1">{[34, 48, 40, 64, 58, 74, 66, 86, 78, 96, 82, 100].map((height, index) => <span key={index} className="flex-1 rounded-t bg-primary/70" style={{ height: `${height}%` }} />)}</div></CardContent></Card><Card><CardHeader><CardTitle>Conversion Funnel</CardTitle></CardHeader><CardContent className="space-y-3">{funnels.map((stage) => <div key={stage.label}><div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{stage.label}</span><span className="font-medium">{stage.count}</span></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: stage.width }} /></div></div>)}</CardContent></Card></div>
    <div className="grid gap-4 xl:grid-cols-3"><Card className="xl:col-span-2"><CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle>Product Performance</CardTitle></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><Tabs value={performance} onValueChange={setPerformance}><TabsList className="h-auto rounded-md border bg-background p-1">{["Daily Sales", "Online Sales", "New Users"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded px-2.5 text-xs data-active:bg-muted data-active:font-medium">{item}</TabsTrigger>)}</TabsList></Tabs><div className="flex gap-4">{[["Digital Product", "790"], ["Physical Product", "572"], ["Average Daily Sales", "$2,950"]].map(([label, value]) => <div key={label} className="hidden text-right sm:block"><p className="text-[11px] text-muted-foreground">{label}</p><p className="text-sm font-semibold">{value}</p></div>)}</div></div><div className="h-[260px]"><ApexChart type="area" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["var(--chart-1)"], stroke: { curve: "smooth", width: 2 },
          fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
          dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: data.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
        }} series={[{ name: performance, data: data.map((item) => performance === "Daily Sales" ? item.daily : performance === "Online Sales" ? item.online : item.users) }]} /></div></CardContent></Card><Card><CardHeader><CardTitle>Activities</CardTitle></CardHeader><CardContent className="divide-y">{activities.map((activity) => <div key={activity.id} className="flex gap-3 py-4 first:pt-0 last:pb-0"><Avatar className="size-9 shrink-0"><AvatarImage src={demoAvatarUrl(activity.name)} alt={activity.name} /><AvatarFallback>{getInitials(activity.name)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="text-sm font-medium">{activity.name}</p><p className="text-xs text-muted-foreground">{activity.action} · {activity.id}</p><p className="mt-1 text-[11px] text-muted-foreground">{activity.time}</p></div></div>)}</CardContent></Card></div>
    <Card><CardHeader><CardTitle>Recent Invoices</CardTitle></CardHeader><CardContent><div className="mb-3 flex justify-end"><input className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-64" placeholder="Search invoices..." aria-label="Search invoices" value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="overflow-x-auto"><Table className="min-w-[700px]"><TableHeader><TableRow><TableHead>Invoice No.</TableHead><TableHead>Close Date</TableHead><TableHead>User</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-right">View</TableHead></TableRow></TableHeader><TableBody>{visibleInvoices.map(([id, date, user, amount, status]) => <TableRow key={id}><TableCell className="font-medium">{id}</TableCell><TableCell>{date}</TableCell><TableCell>{user}</TableCell><TableCell>{amount}</TableCell><TableCell><Badge variant={status === "Complete" ? "secondary" : "outline"}>{status}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm" onClick={() => toast.success(`Invoice ${id}`, { description: `${user} · ${amount} · ${status}` })}><IconCheck className="size-4" /><span className="sr-only">View {id}</span><IconArrowRight className="size-4" /></Button></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
  </div>;
}
