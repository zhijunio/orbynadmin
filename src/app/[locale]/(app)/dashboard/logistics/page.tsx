"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Box as IconBox, ChevronDown as IconChevronDown, CircleCheck as IconCircleCheck, MessageCircle as IconMessageCircle, Package as IconPackage, Phone as IconPhone, Truck as IconTruckDelivery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { DeliveryRouteMap } from "@/components/feature/maps/DeliveryRouteMap";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const stats = [
  { label: "Total Orders", value: "12,384", icon: IconPackage },
  { label: "Orders in Transit", value: "728", icon: IconTruckDelivery },
  { label: "Total Orders", value: "12,384", icon: IconBox },
];

const deliveries = [
  ["#324112", "Furniture", "HomeLine", "Berlin–Milan", "10 Apr 2028 · 2:15 pm", "$1,250.00", "Delivered"],
  ["#325678", "Clothing", "StylePro", "Paris–Rome", "21 May 2028 · 9:00 am", "$340.75", "Delivered"],
  ["#326789", "Books", "EduSource", "New York–Chicago", "02 Jun 2028 · 11:45 am", "$128.40", "In Transit"],
  ["#327003", "Automotive", "AutoParts Co.", "Tokyo–Osaka", "18 Mar 2028 · 4:00 pm", "$2,150.89", "Delivered"],
  ["#328556", "Electronics", "TechNova", "San Francisco–Seattle", "25 Jul 2028 · 10:30 am", "$849.99", "Delivered"],
  ["#329101", "Home Goods", "Northwind", "Toronto–Ottawa", "26 Jul · 8:30 am", "$620.00", "Processing"],
  ["#329214", "Accessories", "Lumen Co", "Austin–Dallas", "26 Jul · 1:10 pm", "$425.00", "In Transit"],
  ["#329332", "Appliances", "Aperture", "London–Manchester", "27 Jul · 9:00 am", "$1,780.50", "Delivered"],
  ["#329450", "Office", "Vertex Labs", "Seattle–Portland", "27 Jul · 3:45 pm", "$299.99", "Pending"],
  ["#329578", "Sportswear", "Kite Digital", "Sydney–Canberra", "28 Jul · 11:00 am", "$580.00", "Processing"],
];
const activityFilters = ["All", "Delivered", "In Transit", "Pending", "Processing"];

const monthly = [
  { month: "Jan", shipment: 78, delivery: 88 }, { month: "Feb", shipment: 58, delivery: 48 },
  { month: "Mar", shipment: 67, delivery: 62 }, { month: "Apr", shipment: 38, delivery: 23 },
  { month: "May", shipment: 63, delivery: 76 }, { month: "Jun", shipment: 43, delivery: 66 },
  { month: "Jul", shipment: 46, delivery: 73 }, { month: "Aug", shipment: 52, delivery: 88 },
  { month: "Sep", shipment: 55, delivery: 29 }, { month: "Oct", shipment: 48, delivery: 68 },
  { month: "Nov", shipment: 65, delivery: 88 }, { month: "Dec", shipment: 73, delivery: 93 },
];

function statusVariant(status: string) {
  if (status === "Delivered") return "secondary" as const;
  if (status === "In Transit") return "default" as const;
  return "outline" as const;
}

export default function LogisticsDashboardPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filteredDeliveries = useMemo(() => deliveries.filter((row) =>
    (filter === "All" || row[6] === filter) && row.join(" ").toLowerCase().includes(search.toLowerCase())
  ), [filter, search]);
  const visibleDeliveries = filteredDeliveries.slice((page - 1) * 5, page * 5);
  const pageCount = Math.max(1, Math.ceil(filteredDeliveries.length / 5));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map((stat, index) => <Card key={`${stat.label}-${index}`}><CardContent className="flex items-center gap-4"><span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground"><stat.icon className="size-8" /></span><div><p className="text-3xl font-semibold tabular-nums">{stat.value}</p><div className="mt-1 flex flex-wrap items-center gap-2"><span className="text-sm text-muted-foreground">{stat.label}</span><Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">+20%</Badge></div></div></CardContent></Card>)}</div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle>Delivery Statistics</CardTitle><p className="mt-1 text-sm text-muted-foreground">Total number of deliveries 70.5K</p></div><Button variant="outline" className="min-w-32 justify-between">Monthly <IconChevronDown className="size-4" /></Button></CardHeader><CardContent><div className="mb-3 flex flex-wrap gap-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-primary/30" />Shipment</span><span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-primary" />Delivery</span></div><div className="h-[340px]"><ApexChart type="bar" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["#b9caff", "#5368ff"], plotOptions: { bar: { columnWidth: "45%", borderRadius: 4 } },
          dataLabels: { enabled: false }, grid: { borderColor: "var(--border)" },
          xaxis: { categories: monthly.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          yaxis: { min: 0, max: 100, labels: { formatter: (value) => `${value}%` } },
          tooltip: { y: { formatter: (value) => `${value}%` } }, legend: { show: false },
        }} series={[{ name: "Shipment", data: monthly.map(({ shipment }) => shipment) }, { name: "Delivery", data: monthly.map(({ delivery }) => delivery) }]} /></div></CardContent></Card>

        <Card className="row-span-2 xl:col-start-3 xl:row-start-1"><CardHeader><CardTitle>Tracking Delivery</CardTitle><p className="mt-1 text-sm text-muted-foreground">Last viewed delivery history</p></CardHeader><CardContent><DeliveryRouteMap /><div className="mt-4 rounded-xl border p-4"><p className="text-sm text-muted-foreground">Tracking ID</p><div className="mt-1 flex items-center justify-between gap-2"><p className="text-lg font-semibold">#28745-72809bjk</p><Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">In Transit</Badge></div><div className="mt-5 space-y-4">{[{ label: "Picked up", time: "12:54", date: "12 Apr 2028", icon: IconCircleCheck }, { label: "In Transit", time: "12:58", date: "12 Apr 2028", icon: IconTruckDelivery }, { label: "Delivered", time: "--:--", date: "13 Apr 2028", icon: IconBox }].map((step, index) => <div key={step.label} className="flex items-center gap-3"><span className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${index < 2 ? "border-primary/20 bg-primary/5 text-primary" : "border-muted text-muted-foreground"}`}><step.icon className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">{step.date}</p><p className="font-medium">{step.label}</p></div><span className="text-sm text-muted-foreground">{step.time}</span></div>)}</div></div><div className="mt-3 flex items-center gap-3 rounded-xl border p-3"><Avatar className="size-12"><AvatarImage src={demoAvatarUrl("Devid Walthen")} alt="Devid Walthen" /><AvatarFallback>DW</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">Courier</p><p className="truncate font-medium">Devid walthen</p></div><Button variant="outline" size="icon" aria-label="Message courier"><IconMessageCircle className="size-4" /></Button><Button variant="outline" size="icon" aria-label="Call courier"><IconPhone className="size-4" /></Button></div></CardContent></Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-2"><Card><CardContent className="flex h-full flex-col justify-between gap-6"><div><p className="text-sm text-muted-foreground">Total revenue earned</p><p className="mt-1 text-3xl font-semibold">$23,445,700</p></div><div><p className="text-sm text-muted-foreground">Shipped quantities</p><p className="mt-1 text-3xl font-semibold">9,258</p></div></CardContent></Card><Card><CardHeader><CardTitle>Delivery Vehicles</CardTitle><p className="mt-1 text-sm text-muted-foreground">Vehicles operating on the road</p></CardHeader><CardContent className="flex items-center justify-between gap-3"><div><p className="text-3xl font-semibold">29</p><p className="mt-2 text-sm"><span className="font-medium text-emerald-600">+3.85%</span> than last week</p><p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600"><span className="size-2.5 rounded-full bg-emerald-500" />On-route</p></div><Image src="/images/logistics/truck.png" alt="Delivery truck" width={160} height={132} className="h-auto w-36 object-contain" /></CardContent></Card></div>
      </div>

      <Card><CardHeader><CardTitle>Delivery Activities</CardTitle><p className="mt-1 text-sm text-muted-foreground">Track your recent shipping activities</p></CardHeader><CardContent className="space-y-4 px-0 pb-0"><div className="flex flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-1">{activityFilters.map((item) => <Button key={item} size="sm" variant={filter === item ? "secondary" : "ghost"} onClick={() => { setFilter(item); setPage(1); }}>{item}</Button>)}</div><input aria-label="Search deliveries" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search shipments..." className="h-9 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:w-56" /></div><div className="overflow-x-auto"><Table className="min-w-[900px]"><TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Category</TableHead><TableHead>Company</TableHead><TableHead>Arrival time</TableHead><TableHead>Route</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{visibleDeliveries.map(([id, category, company, route, arrival, price, status]) => <TableRow key={id}><TableCell className="font-medium">{id}</TableCell><TableCell>{category}</TableCell><TableCell>{company}</TableCell><TableCell>{arrival}</TableCell><TableCell>{route}</TableCell><TableCell>{price}</TableCell><TableCell><Badge variant={statusVariant(status)}>{status}</Badge></TableCell></TableRow>)}</TableBody></Table>{filteredDeliveries.length === 0 && <p className="px-6 py-8 text-center text-sm text-muted-foreground">No deliveries match this filter.</p>}</div><div className="flex flex-col gap-2 border-t px-6 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Showing {filteredDeliveries.length ? (page - 1) * 5 + 1 : 0} to {Math.min(page * 5, filteredDeliveries.length)} of {filteredDeliveries.length} shipments</span><div className="flex items-center gap-2"><span>Page {page} of {pageCount}</span><Pagination className="mx-0 w-auto"><PaginationContent className="gap-1"><PaginationItem><PaginationPrevious href="#" text="Previous" className="h-8 [&>span]:block aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined} onClick={(event) => { event.preventDefault(); setPage((current) => Math.max(1, current - 1)); }} /></PaginationItem><PaginationItem><PaginationNext href="#" text="Next" className="h-8 [&>span]:block aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={page >= pageCount} tabIndex={page >= pageCount ? -1 : undefined} onClick={(event) => { event.preventDefault(); setPage((current) => Math.min(pageCount, current + 1)); }} /></PaginationItem></PaginationContent></Pagination></div></div></CardContent></Card>
    </div>
  );
}
