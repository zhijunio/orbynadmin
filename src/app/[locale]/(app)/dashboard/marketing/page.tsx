"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { StatCard } from "@/components/feature/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download as IconDownload } from "lucide-react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const stats = [
  { label: "Avg. Client Rating", value: "7.8/10", change: 20, trend: "up" as const, hint: "vs. last month" },
  { label: "Instagram Followers", value: "5,934", change: 3.59, trend: "down" as const, hint: "vs. last month" },
  { label: "Total Revenue", value: "$9,758", change: 15, trend: "up" as const, hint: "vs. last month" },
];
const campaignRows = [
  ["Wilson Gouse", "Grow your brand with a summer campaign", "Success", "$4,280"],
  ["Wilson Gouse", "Make better ideas reach more people", "Pending", "$2,140"],
  ["Ava Kim", "Increase your website traffic", "Success", "$1,870"],
  ["Noah Novak", "Build a stronger social presence", "Failed", "$940"],
  ["Mia Chen", "Launch the new product story", "Success", "$3,120"],
  ["Liam Bauer", "Grow your brand by sharing customer stories", "Success", "$1,630"],
];
const trafficSources = [
  { name: "Google", share: 79, icon: "brand-google.svg", color: "bg-blue-500" },
  { name: "YouTube", share: 55, icon: "brand-youtube.svg", color: "bg-red-500" },
  { name: "Facebook", share: 48, icon: "brand-facebook.svg", color: "bg-sky-600" },
  { name: "Instagram", share: 48, icon: "brand-instagram.svg", color: "bg-pink-500" },
];
const traffic = [
  { month: "Jan", impressions: 4300, visits: 2800 }, { month: "Feb", impressions: 5100, visits: 3300 },
  { month: "Mar", impressions: 4700, visits: 3000 }, { month: "Apr", impressions: 6300, visits: 4100 },
  { month: "May", impressions: 7200, visits: 4900 }, { month: "Jun", impressions: 6900, visits: 4500 },
  { month: "Jul", impressions: 8100, visits: 5400 }, { month: "Aug", impressions: 8600, visits: 5900 },
  { month: "Sep", impressions: 7900, visits: 5200 }, { month: "Oct", impressions: 9500, visits: 6400 },
  { month: "Nov", impressions: 10200, visits: 7100 }, { month: "Dec", impressions: 11800, visits: 8200 },
];
export default function MarketingDashboardPage() {
  const [period, setPeriod] = useState("Monthly");
  const [campaignFilter, setCampaignFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = campaignRows.filter((row) => (campaignFilter === "All" || row[2] === campaignFilter) && row.join(" ").toLowerCase().includes(query.toLowerCase()));
  const data = period === "Monthly" ? traffic : period === "Quarterly" ? traffic.filter((_, index) => index % 3 === 2) : traffic.filter((_, index) => index % 6 === 5);
  return <div className="space-y-6">
    <PageHeader title="Marketing Dashboard"><Button variant="outline" size="sm" onClick={() => toast.success("Marketing report exported", { description: `${filtered.length} campaigns are included in the current view.` })}><IconDownload className="size-4" /> Export</Button></PageHeader>
    <div className="grid gap-4 sm:grid-cols-3">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2"><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle>Impression &amp; Data Traffic</CardTitle></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-2xl font-semibold">$9,758.00 <span className="text-sm font-medium text-emerald-600">+7.96%</span></p></div><div className="flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-1" />Impressions</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-2" />Visits</span></div></div><div className="h-[280px]"><ApexChart type="area" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["var(--chart-1)", "var(--chart-2)"], stroke: { curve: "smooth", width: 2 },
          fill: { type: "gradient", gradient: { opacityFrom: 0.22, opacityTo: 0 } },
          dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: data.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
        }} series={[{ name: "Impressions", data: data.map(({ impressions }) => impressions) }, { name: "Visits", data: data.map(({ visits }) => visits) }]} /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Traffic Stats</CardTitle></CardHeader><CardContent className="space-y-3">{[{ label: "New Subscribers", value: "567K", change: "+3.85%", hint: "then last week" }, { label: "Conversion Rate", value: "2.76%", change: "−5.39%", hint: "then last week" }, { label: "Page Bounce Rate", value: "28.5%", change: "+12.74%", hint: "then last week" }].map((item) => <div key={item.label} className="rounded-xl border p-4"><div className="flex items-center justify-between gap-2"><p className="text-sm text-muted-foreground">{item.label}</p><Badge variant="outline">{item.change}</Badge></div><p className="mt-2 text-2xl font-semibold">{item.value}</p><p className="mt-1 text-xs text-muted-foreground">{item.hint}</p></div>)}</CardContent></Card>
    </div>
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2"><CardHeader><CardTitle>Featured Campaigns</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-1">{["All", "Success", "Pending", "Failed"].map((item) => <Button size="sm" variant={campaignFilter === item ? "secondary" : "ghost"} key={item} onClick={() => setCampaignFilter(item)}>{item}</Button>)}</div><input aria-label="Search campaigns" className="h-9 rounded-md border bg-background px-3 text-sm sm:w-56" placeholder="Search campaigns..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="overflow-x-auto"><Table className="min-w-[650px]"><TableHeader><TableRow><TableHead>Owner</TableHead><TableHead>Campaign</TableHead><TableHead>Budget</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filtered.map(([owner, name, status, budget]) => <TableRow key={name}><TableCell className="font-medium">{owner}</TableCell><TableCell>{name}</TableCell><TableCell>{budget}</TableCell><TableCell><Badge variant={status === "Success" ? "secondary" : "outline"}>{status}</Badge></TableCell></TableRow>)}</TableBody></Table>{!filtered.length && <p className="py-8 text-center text-sm text-muted-foreground">No campaigns found.</p>}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Top Traffic Source</CardTitle></CardHeader><CardContent className="space-y-5">{trafficSources.map((source) => <div key={source.name}><div className="mb-2 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg border bg-background"><Image src={`/images/icons/${source.icon}`} alt={`${source.name} logo`} width={20} height={20} className="size-5 object-contain" /></span><span className="flex-1 text-sm font-medium">{source.name}</span><span className="text-sm font-semibold">{source.share}%</span></div><div className="h-1.5 rounded-full bg-muted"><div className={`h-full rounded-full ${source.color}`} style={{ width: `${source.share}%` }} /></div></div>)}</CardContent></Card>
    </div>
  </div>;
}
