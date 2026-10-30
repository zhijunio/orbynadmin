"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Star as IconStar } from "lucide-react";

const brandLogo: Record<string, string> = {
  AAPL: "/images/icons/brand-apple.svg",
  APPL: "/images/icons/brand-apple.svg",
  PYPL: "/images/icons/brand-paypal.svg",
  TSLA: "/images/icons/brand-tesla.svg",
  AMZN: "/images/icons/brand-amazon.svg",
  SPOT: "/images/icons/brand-spotify.svg",
  ABNB: "/images/icons/brand-airbnb.svg",
  ENVT: "/images/icons/brand-envato.svg",
  QIWI: "/images/icons/brand-qiwi.svg",
  KKST: "/images/icons/brand-kick.svg",
  FB: "/images/icons/brand-facebook.svg",
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const positions = [
  { symbol: "AAPL", name: "Apple, Inc", value: "$1,232.00", change: "+11.01%", amount: 1232 },
  { symbol: "PYPL", name: "PayPal Holdings", value: "$965.00", change: "+9.05%", amount: 965 },
  { symbol: "TSLA", name: "Tesla, Inc", value: "$1,232.00", change: "+11.01%", amount: 1232 },
  { symbol: "AMZN", name: "Amazon.com, Inc", value: "$2,567.00", change: "+11.01%", amount: 2567 },
];
const stocks = [
  { symbol: "TSLA", name: "Tesla, Inc", price: "$192.53", change: "+1.01%" },
  { symbol: "AAPL", name: "Apple, Inc", price: "$192.53", change: "+3.59%" },
  { symbol: "SPOT", name: "Spotify, Inc", price: "$192.53", change: "+1.01%" },
  { symbol: "PYPL", name: "PayPal, Inc", price: "$192.53", change: "+1.01%" },
  { symbol: "AMZN", name: "Amazon, Inc", price: "$192.53", change: "+1.01%" },
];
const watchlist = [
  ["AAPL", "Apple, Inc", "$4,008.65", "+11.01%"], ["SPOT", "Spotify.com", "$11,689.00", "+9.48%"],
  ["ABNB", "Airbnb, Inc", "$32,227.00", "+0.29%"], ["ENVT", "Envato, Inc", "$13,895.00", "+3.79%"],
  ["QIWI", "Qiwi.com, Inc", "$4,008.65", "+4.52%"], ["APPL", "Apple, Inc", "$4,523.00", "+3.12%"],
];
const monthly = [
  { month: "Jan", portfolio: 18000, invested: 14800 }, { month: "Feb", portfolio: 19200, invested: 15100 },
  { month: "Mar", portfolio: 18600, invested: 15300 }, { month: "Apr", portfolio: 20700, invested: 15600 },
  { month: "May", portfolio: 21500, invested: 16000 }, { month: "Jun", portfolio: 23100, invested: 16400 },
  { month: "Jul", portfolio: 22500, invested: 16900 }, { month: "Aug", portfolio: 24900, invested: 17200 },
  { month: "Sep", portfolio: 26200, invested: 17700 }, { month: "Oct", portfolio: 25400, invested: 18100 },
  { month: "Nov", portfolio: 28100, invested: 18600 }, { month: "Dec", portfolio: 30200, invested: 19000 },
];
const transactions = [["Bought PYPL", "Nov 23, 01:00 PM", "$2,567.88", "Finance", "Success"], ["Bought AAPL", "Nov 23, 01:00 PM", "$2,567.88", "Finance", "Pending"], ["Sold KKST", "Nov 22, 11:30 AM", "$1,240.00", "Finance", "Success"], ["Bought FB", "Nov 21, 09:15 AM", "$2,567.88", "Finance", "Success"], ["Sold AMZN", "Nov 20, 03:40 PM", "$2,567.88", "Finance", "Failed"]];

export default function StocksDashboardPage() {
  const [period, setPeriod] = useState("Monthly");
  const [query, setQuery] = useState("");
  const [transactionQuery, setTransactionQuery] = useState("");
  const chartData = period === "Monthly" ? monthly : period === "Quarterly" ? monthly.filter((_, index) => index % 3 === 2) : monthly.filter((_, index) => index % 6 === 5);
  const filteredTransactions = transactions.filter((row) => row.join(" ").toLowerCase().includes(transactionQuery.toLowerCase()));
  return <div className="space-y-6">
    <PageHeader title="Stocks Dashboard" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{positions.map((position) => <Card key={position.symbol}><CardContent><div className="flex items-center gap-3"><Image src={brandLogo[position.symbol]} alt={`${position.name} logo`} width={40} height={40} className="size-10 rounded-full object-contain" /><div><p className="text-sm font-medium">{position.name}</p><p className="text-xs text-muted-foreground">{position.symbol}</p></div></div><p className="mt-4 text-2xl font-semibold">{position.value}</p><p className="mt-1 text-xs text-emerald-600">↗ {position.change} <span className="text-muted-foreground">today</span></p></CardContent></Card>)}</div>
    <div className="grid gap-4 xl:grid-cols-3"><Card className="xl:col-span-2"><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle>Portfolio Performance</CardTitle></div><Tabs value={period} onValueChange={setPeriod}><TabsList className="h-auto rounded-lg border bg-background p-1">{["Monthly", "Quarterly", "Annually"].map((item) => <TabsTrigger key={item} value={item} className="h-7 rounded-md px-2.5 text-xs data-active:bg-primary data-active:text-primary-foreground">{item}</TabsTrigger>)}</TabsList></Tabs></CardHeader><CardContent><div className="mb-3 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-1" />Portfolio value</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-2" />Invested capital</span></div><div className="h-[285px]"><ApexChart type="area" height="100%" options={{
          chart: { toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["var(--chart-1)", "var(--chart-2)"], stroke: { curve: "smooth", width: 2 },
          fill: { type: "gradient", gradient: { opacityFrom: 0.2, opacityTo: 0 } },
          dataLabels: { enabled: false }, markers: { size: 0 }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: chartData.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          yaxis: { labels: { formatter: (value) => `$${Math.round(value / 1000)}k` } },
          tooltip: { y: { formatter: (value) => `$${Number(value ?? 0).toLocaleString()}` } }, legend: { show: false },
        }} series={[{ name: "Portfolio value", data: chartData.map(({ portfolio }) => portfolio) }, { name: "Invested capital", data: chartData.map(({ invested }) => invested) }]} /></div></CardContent></Card><Card><CardHeader><CardTitle>Dividend</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">$1,284.50</p><p className="mt-1 text-sm text-emerald-600">+8.4% <span className="text-muted-foreground">vs. last year</span></p><div className="mt-5 space-y-3">{[["Quarterly income", "$321.13"], ["Next payment", "Dec 18, 2025"], ["Dividend yield", "2.8%"]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 border-t pt-3 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>)}</div></CardContent></Card></div>
    <Card><CardHeader><CardTitle>Trending Stocks</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{stocks.map((stock) => <div key={stock.symbol} className="rounded-xl border p-4"><div className="flex items-center justify-between"><Image src={brandLogo[stock.symbol]} alt={`${stock.name} logo`} width={36} height={36} className="size-9 rounded-full object-contain" /><Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">{stock.change}</Badge></div><p className="mt-3 text-xs text-muted-foreground">{stock.symbol}</p><p className="truncate text-sm font-medium">{stock.name}</p><p className="mt-1 text-xl font-semibold">{stock.price}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="flex-1" onClick={() => toast("Short order", { description: `${stock.symbol} short order preview` })}>Short</Button><Button size="sm" className="flex-1" onClick={() => toast("Buy order", { description: `${stock.symbol} buy order preview` })}>Buy</Button></div></div>)}</CardContent></Card>
    <div className="grid gap-4 xl:grid-cols-2"><Card><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>My Watchlist</CardTitle></div><Button size="sm" variant="outline" onClick={() => toast("Watchlist", { description: "Your saved stock list is ready to edit." })}><IconStar className="size-4" /> Manage</Button></CardHeader><CardContent><div className="mb-3"><Input placeholder="Search watchlist..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Symbol</TableHead><TableHead>Company</TableHead><TableHead>Value</TableHead><TableHead>Change</TableHead></TableRow></TableHeader><TableBody>{watchlist.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())).map(([symbol, name, value, change]) => <TableRow key={`${symbol}-${name}`}><TableCell><span className="flex items-center gap-2"><Image src={brandLogo[symbol]} alt={`${name} logo`} width={28} height={28} className="size-7 rounded-full object-contain" /><span className="font-semibold">{symbol}</span></span></TableCell><TableCell>{name}</TableCell><TableCell>{value}</TableCell><TableCell className="text-emerald-600">{change}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card><Card><CardHeader><CardTitle>Latest Transactions</CardTitle></CardHeader><CardContent><Input className="mb-3" placeholder="Search transactions..." value={transactionQuery} onChange={(event) => setTransactionQuery(event.target.value)} /><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Activity</TableHead><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filteredTransactions.map(([name, date, amount, , status]) => { const symbol = name.split(" ")[1]; return <TableRow key={name}><TableCell><span className="flex items-center gap-2"><Image src={brandLogo[symbol] ?? brandLogo.AAPL} alt={`${symbol} logo`} width={24} height={24} className="size-6 rounded-full object-contain" />{name}</span></TableCell><TableCell>{date}</TableCell><TableCell>{amount}</TableCell><TableCell><Badge variant={status === "Success" ? "secondary" : "outline"}>{status}</Badge></TableCell></TableRow>; })}</TableBody></Table></div></CardContent></Card></div>
  </div>;
}
