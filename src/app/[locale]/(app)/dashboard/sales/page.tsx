"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { StatCard } from "@/components/feature/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download as IconDownload } from "lucide-react";
import { Filter as IconFilter } from "lucide-react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const stats = [
  { label: "Total Revenue", value: "$10,590", change: 32, trend: "up" as const, hint: "vs. last month" },
  { label: "Total Sales", value: "1,320", change: 32, trend: "up" as const, hint: "vs. last month" },
  { label: "Conversion Rate", value: "4.38%", change: 32, trend: "up" as const, hint: "vs. last month" },
  { label: "Refund Rate", value: "1.2%", change: 32, trend: "down" as const, hint: "vs. last month" },
];

const performance = [
  { month: "Jan", revenue: 18600, users: 1240 }, { month: "Feb", revenue: 22050, users: 1480 },
  { month: "Mar", revenue: 19700, users: 1360 }, { month: "Apr", revenue: 27340, users: 1720 },
  { month: "May", revenue: 31200, users: 1920 }, { month: "Jun", revenue: 28900, users: 1840 },
  { month: "Jul", revenue: 34800, users: 2110 }, { month: "Aug", revenue: 38100, users: 2280 },
  { month: "Sep", revenue: 35600, users: 2180 }, { month: "Oct", revenue: 42300, users: 2490 },
  { month: "Nov", revenue: 46800, users: 2740 }, { month: "Dec", revenue: 52400, users: 3020 },
];
const weeklyPerformance = [
  { month: "Week 1", revenue: 18200, users: 820 }, { month: "Week 2", revenue: 21400, users: 940 },
  { month: "Week 3", revenue: 19800, users: 890 }, { month: "Week 4", revenue: 24600, users: 1080 },
  { month: "Week 5", revenue: 23100, users: 1010 }, { month: "Week 6", revenue: 27900, users: 1190 },
  { month: "Week 7", revenue: 31200, users: 1320 },
];
const dailyPerformance = [
  { month: "Mon", revenue: 8200, users: 320 }, { month: "Tue", revenue: 9400, users: 365 },
  { month: "Wed", revenue: 7800, users: 298 }, { month: "Thu", revenue: 11200, users: 420 },
  { month: "Fri", revenue: 13800, users: 510 }, { month: "Sat", revenue: 12100, users: 488 },
  { month: "Sun", revenue: 9700, users: 390 },
];

const channels = [{ name: "Website", metric: 35, total: "5.2%" }, { name: "Email", metric: 25, total: "5.2%" }, { name: "Social Media", metric: 59, total: "5.2%" }];
const countries = [{ flag: "flag-us.svg", country: "USA", amount: "$20,594", share: "79%" }, { flag: "flag-france.svg", country: "France", amount: "$20,594", share: "77%" }, { flag: "flag-japan.svg", country: "Japan", amount: "$15,230", share: "68%" }, { flag: "flag-germany.svg", country: "Germany", amount: "$16,450", share: "72%" }];
const topProducts = [
  ["Classic Denim Jacket", "Jacket", "500", "$89.99", "100", "In Stock"],
  ["Slim Fit Chinos", "Pants", "500", "$49.99", "80", "In Stock"],
  ["Organic Cotton T-Shirt", "T-Shirt", "220", "$25.00", "30", "Low Stock"],
  ["Leather Ankle Boots", "Footwear", "875", "$120.00", "120", "Low Stock"],
  ["Classic Denim Jacket", "Jacket", "500", "$89.99", "100", "In Stock"],
];
const retentionColors = ["bg-primary/10", "bg-primary/20", "bg-primary/35", "bg-primary/55", "bg-primary/80"];

export default function SalesDashboardPage() {
  const [period, setPeriod] = useState("Monthly");
  const [filterOpen, setFilterOpen] = useState(false);
  const [productStatus, setProductStatus] = useState("All products");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const chartData = period === "Monthly" ? performance : period === "Weekly" ? weeklyPerformance : dailyPerformance;
  const visibleProducts = topProducts.filter((row) => productStatus === "All products" || row[5] === productStatus);

  return (
    <div className="space-y-6">
      <PageHeader title="Sales Dashboard"><Button variant="outline" size="sm" onClick={() => setFilterOpen((open) => !open)} aria-expanded={filterOpen}><IconFilter className="size-4" /> Filter</Button><Button variant="outline" size="sm"><IconDownload className="size-4" /> Export</Button></PageHeader>
      {filterOpen && <Card><CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end"><label className="grid gap-1 text-xs font-medium text-muted-foreground">Product availability<Select value={productStatus} onValueChange={setProductStatus}><SelectTrigger className="min-w-44 text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All products">All products</SelectItem><SelectItem value="In Stock">In Stock</SelectItem><SelectItem value="Low Stock">Low Stock</SelectItem></SelectContent></Select></label><label className="grid gap-1 text-xs font-medium text-muted-foreground">Sales channel<Select value={channelFilter} onValueChange={setChannelFilter}><SelectTrigger className="min-w-44 text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All channels">All channels</SelectItem><SelectItem value="Website">Website</SelectItem><SelectItem value="Email">Email</SelectItem><SelectItem value="Social Media">Social Media</SelectItem></SelectContent></Select></label><Button variant="ghost" size="sm" onClick={() => { setProductStatus("All products"); setChannelFilter("All channels"); }}>Clear filters</Button></CardContent></Card>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle>Users &amp; Revenue Statistics</CardTitle></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Daily", "Weekly", "Monthly"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="mb-3 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-1" />Revenue</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-2" />Users</span></div><div className="h-[260px]"><ApexChart type="area" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["var(--chart-1)", "var(--chart-2)"], stroke: { curve: "smooth", width: 2 },
          fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
          dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: chartData.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          yaxis: { labels: { formatter: (value) => `$${Math.round(value / 1000)}k` } },
          tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
        }} series={[{ name: "Revenue", data: chartData.map(({ revenue }) => revenue) }, { name: "Users", data: chartData.map(({ users }) => users) }]} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>User Retention</CardTitle></CardHeader><CardContent><div className="mb-4"><p className="text-3xl font-semibold">24%</p><p className="mt-1 text-xs text-emerald-600">+3.2% increased vs. last week</p></div><div className="overflow-x-auto pb-1"><div className="min-w-[320px]"><div className="mb-2 grid grid-cols-[20px_repeat(12,minmax(0,1fr))] gap-1 text-center text-[10px] text-muted-foreground"><span />{Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}</div>{Array.from({ length: 12 }, (_, row) => <div key={row} className="mb-1 grid grid-cols-[20px_repeat(12,minmax(0,1fr))] items-center gap-1"><span className="text-[10px] text-muted-foreground">{row + 1}</span>{Array.from({ length: 12 }, (_, col) => <span key={col} className={`h-4 rounded-sm ${retentionColors[(row * 5 + col * 3 + row * col) % retentionColors.length]}`} title={`Week ${row + 1}, day ${col + 1}`} />)}</div>)}</div></div></CardContent></Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Sales by Channel</CardTitle></CardHeader><CardContent><div className="mb-4 flex items-end justify-between rounded-lg bg-muted/30 p-3"><div><p className="text-xs text-muted-foreground">Total channel conversions</p><p className="mt-1 text-2xl font-semibold">75</p></div><p className="text-xs text-emerald-600">↗ 3.2% increased vs. last week</p></div><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Channel</TableHead><TableHead>Metric</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>{channels.filter((channel) => channelFilter === "All channels" || channel.name === channelFilter).map((channel) => <TableRow key={channel.name}><TableCell className="font-medium">{channel.name}</TableCell><TableCell>{channel.metric}</TableCell><TableCell className="text-right">{channel.total}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Sales by Country</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{countries.map((country) => <div key={country.country} className="flex items-center gap-3 rounded-lg border p-3"><Image src={`/images/icons/${country.flag}`} alt={`${country.country} flag`} width={30} height={20} className="h-5 w-[30px] rounded-sm object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{country.country}</p><p className="text-xs text-muted-foreground">Sales target</p></div><div className="text-right"><p className="text-sm font-semibold tabular-nums">{country.amount}</p><p className="text-xs text-emerald-600">{country.share}</p></div></div>)}</CardContent></Card>
      </div>

      <Card><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Top Products</CardTitle></div><Button variant="outline" size="sm">See all products</Button></CardHeader><CardContent className="px-0 pb-0"><div className="overflow-x-auto"><Table className="min-w-[760px]"><TableHeader><TableRow><TableHead>Product Name</TableHead><TableHead>Category</TableHead><TableHead>Sales</TableHead><TableHead>Earnings</TableHead><TableHead>Stocks</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{visibleProducts.map(([name, category, sales, price, stock, status], index) => <TableRow key={`${name}-${index}`}><TableCell><div className="flex items-center gap-3"><span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${index % 2 ? "bg-violet-500/10 text-violet-600" : "bg-primary/10 text-primary"}`}><span className="text-xs font-semibold">{category.slice(0, 2).toUpperCase()}</span></span><span className="font-medium">{name}<p className="text-xs font-normal text-muted-foreground">{index % 2 ? "4 Colors" : "3 Sizes"}</p></span></div></TableCell><TableCell>{category}</TableCell><TableCell>{sales}</TableCell><TableCell>{price}</TableCell><TableCell>{stock}</TableCell><TableCell><Badge variant={status === "In Stock" ? "secondary" : "outline"}>{status}</Badge></TableCell></TableRow>)}</TableBody></Table></div>{visibleProducts.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No products match this filter.</p>}</CardContent></Card>
    </div>
  );
}
