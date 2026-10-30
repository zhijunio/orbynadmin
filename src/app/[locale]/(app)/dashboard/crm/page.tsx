"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisVertical as IconDotsVertical } from "lucide-react";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { getInitials } from "@/lib/text";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const statistics = [
  { month: "Jan", revenue: 180, sales: 40 },
  { month: "Feb", revenue: 190, sales: 30 },
  { month: "Mar", revenue: 170, sales: 50 },
  { month: "Apr", revenue: 160, sales: 40 },
  { month: "May", revenue: 175, sales: 55 },
  { month: "Jun", revenue: 165, sales: 40 },
  { month: "Jul", revenue: 170, sales: 70 },
  { month: "Aug", revenue: 205, sales: 100 },
  { month: "Sep", revenue: 230, sales: 110 },
  { month: "Oct", revenue: 210, sales: 120 },
  { month: "Nov", revenue: 240, sales: 150 },
  { month: "Dec", revenue: 235, sales: 140 },
];

const quarterlyStatistics = [
  { month: "Q1", revenue: 180, sales: 40 },
  { month: "Q2", revenue: 170, sales: 52 },
  { month: "Q3", revenue: 205, sales: 100 },
  { month: "Q4", revenue: 228, sales: 137 },
];

const annualStatistics = [
  { month: "2022", revenue: 155, sales: 42 },
  { month: "2023", revenue: 178, sales: 63 },
  { month: "2024", revenue: 205, sales: 102 },
  { month: "2025", revenue: 235, sales: 140 },
];

const categories = [
  { name: "Affiliate Program", value: 48, products: "2,040", color: "#3C50E0" },
  { name: "Direct Buy", value: 33, products: "1,402", color: "#80CAEE" },
  { name: "Adsense", value: 19, products: "510", color: "#8099FF" },
];

const schedule = [
  { date: "Wed, 11 Jan", time: "09:20 AM", title: "Business Analytics Press", description: "Exploring the Future of Data-Driven +6 more" },
  { date: "Fri, 15 Feb", time: "10:35 AM", title: "Business Sprint", description: "Techniques from Business Sprint +2 more" },
  { date: "Thu, 18 Mar", time: "01:15 AM", title: "Customer Review Meeting", description: "Insights from the Customer Review Meeting +8 more" },
];

const recentOrders = [
  { id: "DE124321", customer: "John Doe", email: "johndoe@gmail.com", product: "Software License", value: "$18,500.34", date: "2024-06-15", status: "Complete" },
  { id: "DE124322", customer: "Jane Smith", email: "janesmith@gmail.com", product: "Cloud Hosting", value: "$12,990.00", date: "2024-06-18", status: "Pending" },
  { id: "DE124323", customer: "Michael Brown", email: "michaelbrown@gmail.com", product: "Web Domain", value: "$9,500.00", date: "2024-06-20", status: "Cancel" },
  { id: "DE124324", customer: "Alice Johnson", email: "alicejohnson@gmail.com", product: "SSL Certificate", value: "$2,300.45", date: "2024-06-25", status: "Pending" },
  { id: "DE124325", customer: "Robert Lee", email: "robertlee@gmail.com", product: "Premium Support", value: "$15,200.00", date: "2024-06-30", status: "Complete" },
];

const statusStyle: Record<string, string> = {
  Complete: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cancel: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function MetricCard({ value, label, change, positive }: { value: string; label: string; change: string; positive: boolean }) {
  return (
    <Card className="gap-5 px-6 py-6 shadow-none">
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{value}</p>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="flex items-center gap-2">
          <Badge variant="secondary" className={positive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}>{change}</Badge>
          <span className="text-muted-foreground">last month</span>
        </span>
      </div>
    </Card>
  );
}

function GoalGauge() {
  return (
    <div className="relative mx-auto h-44 w-full max-w-72 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 aspect-square w-64 -translate-x-1/2 rounded-full"
        style={{
          background: "conic-gradient(from 270deg, var(--primary) 0deg 150deg, var(--muted) 150deg 180deg, transparent 180deg 360deg)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-sm text-muted-foreground">June Goals</span>
        <span className="mt-1 text-4xl font-bold tracking-tight">$90</span>
      </div>
    </div>
  );
}

export default function CrmPage() {
  const [period, setPeriod] = useState<"Monthly" | "Quarterly" | "Annually">("Monthly");
  const chartData = period === "Monthly" ? statistics : period === "Quarterly" ? quarterlyStatistics : annualStatistics;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard value="$120,369" label="Active Deal" change="+20%" positive />
        <MetricCard value="$234,210" label="Revenue Total" change="+9.0%" positive />
        <MetricCard value="874" label="Closed Deals" change="-4.5%" positive={false} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Statistics</CardTitle>
            </div>
            <Tabs value={period} onValueChange={(value) => setPeriod(value as typeof period)}><TabsList className="h-auto rounded-xl border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-8 rounded-md px-3 text-xs">{item}</TabsTrigger>)}</TabsList></Tabs>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="flex flex-wrap items-center gap-2"><span className="text-2xl font-bold tracking-tight">$212,142.12</span><Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">+23.2%</Badge></div>
                <p className="mt-1 text-sm text-muted-foreground">Avg. Yearly Profit</p>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2"><span className="text-2xl font-bold tracking-tight">$30,321.23</span><Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">-12.3%</Badge></div>
                <p className="mt-1 text-sm text-muted-foreground">Avg. Yearly Profit</p>
              </div>
            </div>
            <div className="h-[300px] w-full"><ApexChart type="area" height="100%" options={{
              chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
              colors: ["var(--chart-1)", "#9CB9FF"], stroke: { curve: "smooth", width: 2 },
              fill: { type: "gradient", gradient: { opacityFrom: 0.26, opacityTo: 0.02 } },
              dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)" },
              xaxis: { categories: chartData.map(({ month }) => month) }, yaxis: { labels: { formatter: (value) => String(value) } },
              tooltip: { y: { formatter: (value) => Number(value ?? 0).toLocaleString() } }, legend: { show: false },
            }} series={[{ name: "Revenue", data: chartData.map(({ revenue }) => revenue) }, { name: "Sales", data: chartData.map(({ sales }) => sales) }]} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated Revenue</CardTitle>
            <CardAction><Button variant="ghost" size="icon" aria-label="Revenue options"><IconDotsVertical className="size-4" /></Button></CardAction>
          </CardHeader>
          <CardContent>
            <GoalGauge />
            <div className="mt-4 space-y-5 border-t pt-5">
              <div><p className="text-sm text-muted-foreground">Marketing</p><div className="mt-2 flex items-center justify-between gap-3"><span className="font-semibold">$30,569.00</span><div className="flex items-center gap-3"><div className="h-2 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full w-[85%] rounded-full bg-primary" /></div><span className="text-sm font-medium">85%</span></div></div></div>
              <div><p className="text-sm text-muted-foreground">Sales</p><div className="mt-2 flex items-center justify-between gap-3"><span className="font-semibold">$20,486.00</span><div className="flex items-center gap-3"><div className="h-2 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full w-[55%] rounded-full bg-primary" /></div><span className="text-sm font-medium">55%</span></div></div></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Category</CardTitle>
            <CardAction><Button variant="ghost" size="icon" aria-label="Sales category options"><IconDotsVertical className="size-4" /></Button></CardAction>
          </CardHeader>
          <CardContent className="grid items-center gap-5 md:grid-cols-2">
            <div className="relative mx-auto size-56 rounded-full" style={{ background: "conic-gradient(#3C50E0 0% 48%, #80CAEE 48% 81%, #8099FF 81% 100%)" }}>
              <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-card"><span className="text-sm text-muted-foreground">Total</span><span className="text-xl font-semibold">3.5K</span></div>
            </div>
            <div className="space-y-5">
              {categories.map((category) => <div key={category.name} className="flex items-start gap-3"><span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ backgroundColor: category.color }} /><div><h3 className="font-semibold">{category.name}</h3><p className="mt-1 text-sm text-muted-foreground"><span className="font-medium text-foreground">{category.value}%</span><span className="mx-2">·</span>{category.products} Products</p></div></div>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardAction><Button variant="ghost" size="icon" aria-label="Schedule options"><IconDotsVertical className="size-4" /></Button></CardAction>
          </CardHeader>
          <CardContent className="space-y-5">
            {schedule.map((event) => <div key={event.title} className="flex items-start gap-4"><Checkbox className="mt-1" aria-label={`Mark ${event.title} complete`} /><div className="w-24 shrink-0 text-sm font-medium text-muted-foreground"><p>{event.date}</p><p className="mt-2 text-foreground">{event.time}</p></div><div className="min-w-0"><h3 className="font-semibold">{event.title}</h3><p className="mt-1 text-sm text-muted-foreground">{event.description}</p></div></div>)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <div className="flex items-center gap-2"><Button variant="outline" size="sm">Filter</Button><Button variant="outline" size="sm">See all</Button></div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table className="min-w-[900px]">
            <TableHeader><TableRow><TableHead className="w-12"><Checkbox aria-label="Select all orders" /></TableHead><TableHead>Deal ID</TableHead><TableHead>Customer</TableHead><TableHead>Product/Service</TableHead><TableHead>Deal Value</TableHead><TableHead>Close Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {recentOrders.map((order) => <TableRow key={order.id}><TableCell><Checkbox aria-label={`Select ${order.id}`} /></TableCell><TableCell className="font-medium">{order.id}</TableCell><TableCell><div className="flex items-center gap-3"><Avatar className="size-9"><AvatarImage src={demoAvatarUrl(order.customer)} alt={order.customer} /><AvatarFallback>{getInitials(order.customer)}</AvatarFallback></Avatar><div><p className="font-medium">{order.customer}</p><p className="text-xs text-muted-foreground">{order.email}</p></div></div></TableCell><TableCell>{order.product}</TableCell><TableCell className="font-medium tabular-nums">{order.value}</TableCell><TableCell>{order.date}</TableCell><TableCell><Badge variant="secondary" className={statusStyle[order.status]}>{order.status}</Badge></TableCell><TableCell className="text-right"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`Actions for ${order.id}`}><IconDotsVertical className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>View details</DropdownMenuItem><DropdownMenuItem>Download invoice</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
