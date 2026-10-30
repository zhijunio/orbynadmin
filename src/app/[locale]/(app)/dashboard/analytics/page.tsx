"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight as IconArrowUpRight, Monitor as IconDeviceDesktop, Smartphone as IconDeviceMobile, Tablet as IconDeviceTablet, EllipsisVertical as IconDotsVertical, Eye as IconEye, Users as IconUsers } from "lucide-react";
import { VisitorsWorldMap } from "@/components/feature/maps/VisitorsWorldMap";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-full min-h-28 animate-pulse rounded-lg bg-muted/40" /> });

const overview = [
  { label: "Unique Visitors", value: "24.7K", change: "+20%", icon: IconUsers },
  { label: "Total Pageviews", value: "55.9K", change: "+4%", icon: IconEye },
  { label: "Bounce Rate", value: "54%", change: "−1.59%", icon: IconArrowUpRight },
  { label: "Visit Duration", value: "2m 56s", change: "+7%", icon: IconDeviceDesktop },
];

const monthly = Array.from({ length: 30 }, (_, index) => ({ day: String(index + 1), visitors: [160, 380, 190, 290, 180, 190, 285, 105, 210, 385, 275, 105, 115, 205, 265, 185, 305, 110, 85, 375, 105, 215, 285, 165, 285, 105, 110, 285, 375, 310][index], pageviews: [210, 220, 120, 185, 150, 250, 315, 215, 120, 260, 175, 230, 140, 315, 165, 120, 210, 165, 315, 185, 145, 255, 115, 220, 315, 160, 185, 120, 220, 250][index] }));
const channels = [
  { name: "Google", visitors: "4.7K", share: 84 }, { name: "Facebook", visitors: "3.4K", share: 68 },
  { name: "Threads", visitors: "2.9K", share: 56 }, { name: "Google", visitors: "1.5K", share: 35 },
];
const pages = [
  ["tailadmin.com", "4.7K"], ["preview.tailadmin.com", "3.4K"], ["docs.tailadmin.com", "2.9K"], ["tailadmin.com/components", "1.5K"],
];
const devices = [
  { name: "Desktop", value: 33, icon: IconDeviceDesktop }, { name: "Mobile", value: 49, icon: IconDeviceMobile }, { name: "Tablet", value: 18, icon: IconDeviceTablet },
];
const deviceMix = [{ name: "Desktop", value: 33 }, { name: "Mobile", value: 49 }, { name: "Tablet", value: 18 }];
const countries = [
  { name: "USA", customers: "2,379 Customers", share: "79%", flag: "/images/icons/flag-us.svg" },
  { name: "France", customers: "589 Customers", share: "23%", flag: "/images/icons/flag-france.svg" },
];
const orders = [
  ["TailGrids", "UI Kits", "USA", "Dashboard", "$12,499"], ["GrayGrids", "Templates", "France", "Dashboard", "$5,498"],
  ["Uideck", "Templates", "Singapore", "Dashboard", "$4,621"], ["FormBold", "SaaS", "UK", "Dashboard", "$13,843"],
  ["NextAdmin", "Templates", "Egypt", "Dashboard", "$7,523"], ["Form Builder", "Templates", "Finland", "Dashboard", "$1,377"],
  ["AyroUI", "Templates", "Belgium", "Dashboard", "$599.00"],
];
const countryFlags: Record<string, string> = { USA: "flag-us.svg", France: "flag-france.svg", Singapore: "flag-singapore.svg", UK: "flag-united-kingdom.svg", Egypt: "flag-egypt.svg", Finland: "flag-finland.svg", Belgium: "flag-belgium.svg" };

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("Monthly");
  const [query, setQuery] = useState("");
  const chartData = period === "Monthly" ? monthly : period === "Quarterly"
    ? Array.from({ length: 10 }, (_, index) => ({ ...monthly[index * 3], day: `Day ${index * 3 + 1}` }))
    : monthly.filter((_, index) => index % 3 === 0);
  const filteredOrders = orders.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));

  return <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{overview.map(({ label, value, change, icon: Icon }) => <Card key={label}><CardContent className="flex items-center gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-6" /></span><div className="min-w-0"><p className="text-sm text-muted-foreground">{label}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tracking-tight">{value}</p><span className={`text-xs font-medium ${change.startsWith("−") ? "text-emerald-600" : "text-emerald-600"}`}>{change}</span></div><p className="text-xs text-muted-foreground">vs. last month</p></div></CardContent></Card>)}</div>

    <Card><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Analytics</CardTitle><p className="mt-1 text-sm text-muted-foreground">Visitor analytics of last 30 days</p></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="h-[300px]"><ApexChart type="bar" height="100%" options={{ chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" }, colors: ["var(--chart-1)"], plotOptions: { bar: { borderRadius: 4, columnWidth: "48%" } }, dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 }, xaxis: { categories: chartData.map(({ day }) => day), axisBorder: { show: false }, axisTicks: { show: false }, labels: { rotate: -45 } }, yaxis: { min: 0, max: 400, tickAmount: 4 }, tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false } }} series={[{ name: "Visitors", data: chartData.map(({ visitors }) => visitors) }]} /></div></CardContent></Card>

    <div className="grid gap-4 xl:grid-cols-3">
      <Card><CardHeader><CardTitle>Top Channels</CardTitle></CardHeader><CardContent className="space-y-4">{channels.map((channel, index) => <div key={`${channel.name}-${index}`}><div className="mb-1.5 flex items-center justify-between text-sm"><span className="font-medium">{channel.name}</span><span className="text-muted-foreground">{channel.visitors}</span></div><div className="h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${channel.share}%` }} /></div></div>)}<Button variant="link" className="h-auto p-0 text-primary">Channels Report</Button></CardContent></Card>
      <Card><CardHeader><CardTitle>Top Pages</CardTitle></CardHeader><CardContent className="px-0 pb-0"><Table><TableHeader><TableRow><TableHead className="pl-6">Source</TableHead><TableHead className="pr-6 text-right">Pageview</TableHead></TableRow></TableHeader><TableBody>{pages.map(([source, views]) => <TableRow key={source}><TableCell className="pl-6 font-medium">{source}</TableCell><TableCell className="pr-6 text-right">{views}</TableCell></TableRow>)}</TableBody></Table><div className="px-6 py-3"><Button variant="link" className="h-auto p-0 text-primary">Channels Report</Button></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Active Users</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-500" /><p className="text-3xl font-semibold">364</p><p className="text-sm text-muted-foreground">Live visitors</p></div><div className="mt-3 h-28 rounded-lg bg-muted/20 p-2"><ApexChart type="area" height="100%" options={{ chart: { sparkline: { enabled: true }, toolbar: { show: false }, background: "transparent" }, colors: ["var(--chart-1)"], stroke: { curve: "smooth", width: 2 }, fill: { type: "gradient", gradient: { opacityFrom: 0.25, opacityTo: 0 } }, dataLabels: { enabled: false }, markers: { size: 0 }, tooltip: { y: { formatter: (value) => String(value) } } }} series={[{ name: "Visitors", data: [22, 28, 33, 48, 42, 35, 29, 37, 45, 61, 67, 48] }]} /></div><div className="mt-4 grid grid-cols-3 border-t pt-3 text-center">{[["224", "Avg. Daily"], ["1.4K", "Avg. Weekly"], ["22.1K", "Avg. Monthly"]].map(([value, label]) => <div key={label}><p className="font-semibold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div></CardContent></Card>
    </div>

    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2"><CardHeader><CardTitle>Acquisition Channels</CardTitle></CardHeader><CardContent><div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">{["Direct", "Referral", "Organic Search", "Social"].map((name, index) => <span key={name} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: `var(--chart-${index + 1})` }} />{name}</span>)}</div><div className="h-[230px]"><ApexChart type="bar" height="100%" options={{ chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", background: "transparent" }, colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"], plotOptions: { bar: { borderRadius: 3, columnWidth: "50%" } }, dataLabels: { enabled: false }, grid: { borderColor: "var(--border)" }, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { formatter: (value) => String(value) } }, tooltip: { y: { formatter: (value) => String(value) } }, legend: { show: false } }} series={[{ name: "Direct", data: [24, 28, 32, 36, 40, 44, 48, 52] }, { name: "Referral", data: [15, 17, 19, 21, 23, 25, 27, 29] }, { name: "Organic Search", data: [31, 34, 37, 40, 43, 46, 49, 52] }, { name: "Social", data: [12, 13, 14, 15, 16, 17, 18, 19] }]} /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Sessions By Device</CardTitle></CardHeader><CardContent><div className="h-36"><ApexChart type="donut" height="100%" options={{ chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" }, labels: deviceMix.map(({ name }) => name), colors: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"], plotOptions: { pie: { donut: { size: "58%" } } }, dataLabels: { enabled: false }, stroke: { width: 0 }, legend: { show: false }, tooltip: { y: { formatter: (value) => `${value}%` } } }} series={deviceMix.map(({ value }) => value)} /></div><div className="mt-3 space-y-2">{devices.map(({ name, value, icon: Icon }, index) => <div key={name} className="flex items-center gap-2 text-sm"><span className="size-2 rounded-full" style={{ backgroundColor: `var(--chart-${index + 1})` }} /><Icon className="size-4 text-muted-foreground" /><span>{name}</span><span className="ml-auto font-medium">{value}%</span></div>)}</div></CardContent></Card>
    </div>

    <div className="grid gap-4 xl:grid-cols-3">
      <Card><CardHeader><CardTitle>Customers Demographic</CardTitle><p className="mt-1 text-sm text-muted-foreground">Number of customer based on country</p></CardHeader><CardContent><VisitorsWorldMap /><div className="mt-3 space-y-3">{countries.map((country) => <div key={country.name} className="flex items-center gap-3"><Image src={country.flag} alt={`${country.name} flag`} width={21} height={14} className="h-3.5 w-[21px] rounded-sm object-cover" /><span className="flex-1 text-sm font-medium">{country.name}</span><span className="text-xs text-muted-foreground">{country.customers}</span><span className="text-sm font-semibold">{country.share}</span></div>)}</div></CardContent></Card>
      <Card className="xl:col-span-2"><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recent Orders</CardTitle><Button variant="outline" size="sm"><IconDotsVertical className="size-4" /> Filter</Button></CardHeader><CardContent className="px-0 pb-0"><div className="flex justify-end px-6 pb-3"><Input className="sm:w-64" placeholder="Search..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="overflow-x-auto"><Table className="min-w-[720px]"><TableHeader><TableRow><TableHead className="pl-6">Products</TableHead><TableHead>Category</TableHead><TableHead>Country</TableHead><TableHead>CR</TableHead><TableHead className="pr-6 text-right">Value</TableHead></TableRow></TableHeader><TableBody>{filteredOrders.map(([product, category, country, cr, value]) => <TableRow key={product}><TableCell className="pl-6 font-medium">{product}</TableCell><TableCell>{category}</TableCell><TableCell><span className="flex items-center gap-2"><Image src={`/images/icons/${countryFlags[country]}`} alt="" width={22} height={22} className="size-5 rounded-full" />{country}</span></TableCell><TableCell>{cr}</TableCell><TableCell className="pr-6 text-right font-medium text-emerald-600">{value}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
    </div>

  </div>;
}
