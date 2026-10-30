"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownLeft as IconArrowDownLeft, ArrowUpRight as IconArrowUpRight, ChevronDown as IconChevronDown, ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight } from "lucide-react";
import { toast } from "sonner";
import { demoAvatarUrl } from "@/lib/demo-avatar";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" /> });

const monthlyCashflow = [
  { month: "Jan", income: 9600, expenses: 6200 }, { month: "Feb", income: 6300, expenses: 3900 },
  { month: "Mar", income: 14100, expenses: 9000 }, { month: "Apr", income: 7500, expenses: 4700 },
  { month: "May", income: 9500, expenses: 6100 }, { month: "Jun", income: 9900, expenses: 6800 },
  { month: "Jul", income: 6600, expenses: 4300 }, { month: "Aug", income: 10200, expenses: 7900 },
  { month: "Sep", income: 7900, expenses: 5200 }, { month: "Oct", income: 9800, expenses: 8800 },
  { month: "Nov", income: 5600, expenses: 5200 }, { month: "Dec", income: 4500, expenses: 4300 },
];
const spending = [
  { name: "Activity", value: "$3,870", color: "#6675f5", width: 29 },
  { name: "Online Purchases", value: "$2,840", color: "#56c6ed", width: 21 },
  { name: "Groceries", value: "$2,105", color: "#a5a1fa", width: 16 },
  { name: "Digital Goods", value: "$1,140", color: "#e98ee7", width: 12 },
  { name: "Stationery", value: "$698", color: "#75d9b0", width: 8 },
  { name: "Others", value: "$2,105", color: "#d6d9df", width: 14 },
];
const recipients = ["Amelia Moore", "Ethan Wilson", "Sofia Fischer", "Noah Brown", "Mia Chen"];
const recentActivity = [
  { title: "Payment Received", note: "Cashback from Stellar Rewards", amount: "+$120.00", date: "Mar 20", icon: "payment-rewards.svg", positive: true },
  { title: "Netflix Subscription", note: "September subscription charge", amount: "−$36.24", date: "Sep 18", icon: "payment-netflix.svg", positive: false },
  { title: "Money received", note: "Payment received via PayPal", amount: "+$590", date: "Feb 12", icon: "payment-paypal.svg", positive: true },
  { title: "Google Ads", note: "Payment received form google ads", amount: "+$236.24", date: "Jan 28", icon: "payment-google-ads.svg", positive: true },
  { title: "Money received", note: "Payment received via PayPal", amount: "+$1,093", date: "Jan 10", icon: "payment-paypal.svg", positive: true },
];
const transactions = [
  ["NIV_034834", "Hotel Booking", "$9,234.87", "15 Mar, 2028 08:22 AM", "Completed"],
  ["NIV_034345", "Online Shopping", "$4,567.23", "28 Feb, 2028 09:15 AM", "Completed"],
  ["NIV_093854", "Game Purchase", "$22,101.76", "14 Feb, 2028 02:55 PM", "In Progress"],
  ["NIV_005378", "Utility Bill Payment", "$7,890.45", "02 Feb, 2028 06:30 PM", "Completed"],
  ["NIV_823930", "Online Course Enrollment", "$11,223.90", "22 Jan, 2028 11:02 AM", "Completed"],
];

function Metric({ title, value, detail, tone }: { title: string; value: string; detail: string; tone: "up" | "down" | "goal" }) {
  return <div className="rounded-xl border bg-card p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p><p className={`mt-5 flex items-center gap-1.5 text-xs font-medium ${tone === "down" ? "text-rose-600" : tone === "goal" ? "text-muted-foreground" : "text-emerald-600"}`}>{tone === "up" ? "↑" : tone === "down" ? "↓" : "◌"}{detail}</p></div>;
}

export default function FinanceDashboardPage() {
  const [cashflowRange, setCashflowRange] = useState("3 Month");
  const [cashflowYear, setCashflowYear] = useState("2025");
  const [spendingPeriod, setSpendingPeriod] = useState("Yearly");
  const [recipient, setRecipient] = useState(recipients[0]);
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const data = useMemo(() => {
    const factor = cashflowYear === "2025" ? 1 : 0.91;
    return monthlyCashflow.map((item) => ({ ...item, income: Math.round(item.income * factor), expenses: Math.round(item.expenses * factor) }));
  }, [cashflowYear]);
  const rows = transactions.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()) && (status === "All" || row[4] === status));
  const sendMoney = () => {
    if (!Number(amount)) return toast.error("Enter an amount to send");
    toast.success(`${currency} ${Number(amount).toFixed(2)} sent to ${recipient}`);
    setAmount("");
  };

  return <div className="space-y-4">
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="bg-muted/40 p-2"><CardContent className="flex min-h-[285px] flex-col justify-between rounded-xl bg-card p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle className="text-sm">Total Balance</CardTitle><p className="mt-1 text-sm text-muted-foreground">Overview of your current funds</p></div><div className="flex gap-2"><Button variant="outline" size="sm"><Image src="/images/icons/flag-us.svg" alt="" width={16} height={16} />USD <IconChevronDown className="size-4" /></Button><Button variant="outline" size="sm">June 2025 <IconChevronDown className="size-4" /></Button></div></div><div className="flex items-end justify-between gap-4"><div><p className="text-3xl font-semibold tracking-tight">19,857.00</p><p className="mt-2 text-sm font-medium text-emerald-600">↑ 3.2% <span className="text-muted-foreground">than last month</span></p></div><div className="flex h-14 w-36 items-end gap-1" aria-hidden="true">{[24, 30, 26, 34, 28, 38, 32, 36, 31, 43, 62, 50, 76, 68, 88, 78].map((height, i) => <span key={i} className="flex-1 rounded-t-sm bg-primary/70" style={{ height: `${height}%` }} />)}</div></div><div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"><p className="text-sm"><span className="text-muted-foreground">Primary Account:</span> <span className="font-semibold">•••• •••• •••• 5332</span></p><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => toast("Account details", { description: "Primary account ending in 5332" })}>Copy</Button><Button variant="outline" size="sm">See Details</Button></div></div></CardContent><div className="flex gap-3 p-2"><Button className="flex-1" onClick={() => toast("Transfer", { description: "Choose a recipient and amount to transfer." })}><IconArrowUpRight className="size-4" />Transfer</Button><Button className="flex-1" variant="outline" onClick={() => toast("Received", { description: "Incoming transfer history" })}><IconArrowDownLeft className="size-4" />Received</Button><Button variant="outline" size="icon" aria-label="More balance actions">+</Button></div></Card>
      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/40 p-2"><Metric title="Total Balance" value="$24,830" detail="3.2% than last month" tone="up" /><Metric title="Monthly Income" value="$5,200" detail="3.2% than last month" tone="down" /><Metric title="Total Spent" value="$3,831" detail="295 than last month" tone="up" /><Metric title="Saving Rate" value="26.1%" detail="Goal: 30% - 3.9% to go" tone="goal" /></div>
    </div>

    <div className="grid items-start gap-4 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <Card><CardHeader className="flex flex-row items-start justify-between"><CardTitle>Cashflow Overview</CardTitle><div className="flex gap-2"><Select aria-label="Cashflow year" value={cashflowYear} onValueChange={setCashflowYear}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2025">2025</SelectItem><SelectItem value="2024">2024</SelectItem></SelectContent></Select><Select aria-label="Cashflow period" value={cashflowRange} onValueChange={setCashflowRange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["3 Month", "6 Month", "12 Month"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></CardHeader><CardContent><div className="flex items-end justify-between gap-4"><div><p className="text-sm text-muted-foreground">Total Revenue</p><p className="mt-1 text-2xl font-semibold">$9,758.00 <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600">+7.96%</span></p></div><div className="flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary" />Income</span><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary/40" />Expense</span></div></div><div className="mt-4 h-[280px]"><ApexChart type="bar" height="100%" options={{
          chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", background: "transparent" },
          colors: ["#4f5fff", "#9bb4ff"], plotOptions: { bar: { columnWidth: "45%", borderRadius: 4, borderRadiusApplication: "end" } },
          dataLabels: { enabled: false }, grid: { borderColor: "var(--border)", strokeDashArray: 3 },
          xaxis: { categories: data.map(({ month }) => month), axisBorder: { show: false }, axisTicks: { show: false } },
          yaxis: { labels: { formatter: (value) => value === 0 ? "0" : `${Math.round(Number(value) / 1000)}K` } },
          tooltip: { y: { formatter: (value) => `$${Number(value ?? 0).toLocaleString()}` } }, legend: { show: false },
        }} series={[{ name: "Income", data: data.map(({ income }) => income) }, { name: "Expense", data: data.map(({ expenses }) => expenses) }]} /></div></CardContent></Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Spending</CardTitle><Select aria-label="Spending period" value={spendingPeriod} onValueChange={setSpendingPeriod}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Yearly">Yearly</SelectItem><SelectItem value="Monthly">Monthly</SelectItem></SelectContent></Select></CardHeader><CardContent><p className="text-sm text-muted-foreground">Total</p><p className="mt-1 text-3xl font-semibold">{spendingPeriod === "Yearly" ? "$10,758" : "$3,831"}</p><div className="mt-5 flex h-7 overflow-hidden rounded-sm">{spending.map((item) => <span key={item.name} style={{ width: `${item.width}%`, backgroundColor: item.color }} />)}</div><div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2">{spending.map((item) => <div key={item.name} className="flex items-center gap-2 text-xs"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} /><span>{item.name}</span></div>)}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Quick send</CardTitle></CardHeader><CardContent><div className="mb-5 flex items-center gap-2 overflow-hidden">{recipients.map((name) => <button key={name} onClick={() => setRecipient(name)} title={name} aria-label={`Send to ${name}`} className={`size-10 shrink-0 overflow-hidden rounded-full border-2 ${recipient === name ? "border-primary" : "border-transparent"}`}><Avatar className="size-full"><AvatarImage src={demoAvatarUrl(name)} alt={name} /><AvatarFallback>{name.slice(0, 1)}</AvatarFallback></Avatar></button>)}<Button variant="outline" size="icon" className="shrink-0 rounded-full" aria-label="More recipients"><IconChevronRight className="size-4" /></Button></div><label htmlFor="send-from" className="mb-1 block text-xs font-medium">Send From</label><button id="send-from" className="flex h-10 w-full items-center justify-between rounded-lg border px-3 text-sm"><span>Visa •••• •••• 3657</span><IconChevronDown className="size-4 text-muted-foreground" /></button><div className="mt-3 grid grid-cols-2 gap-3"><div><label className="mb-1 block text-xs font-medium">Currency</label><Select value={currency} onValueChange={setCurrency}><SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem><SelectItem value="GBP">GBP</SelectItem></SelectContent></Select></div><div><label htmlFor="send-amount" className="mb-1 block text-xs font-medium">Amount</label><Input id="send-amount" type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" /></div></div><Button className="mt-4 w-full" onClick={sendMoney}>Send Money</Button></CardContent></Card>
        </div>
      </div>

      <aside className="space-y-4">
        <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>My Cards</CardTitle><Button variant="outline" size="sm" onClick={() => toast("Add Card", { description: "Add a payment card to your wallet." })}>+ Add Card</Button></CardHeader><CardContent><div className="relative min-h-[225px] overflow-hidden rounded-2xl bg-[#101828] p-5 text-white"><div className="absolute -right-6 -top-8 size-36 rotate-12 rounded-xl bg-white/[0.04]" /><div className="relative flex items-center justify-between"><span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-400">Active</span><Image src="/images/finance/mastercard.png" alt="Mastercard" width={45} height={36} className="h-8 w-auto" /></div><p className="relative mt-6 font-medium">Musharof Chy</p><div className="relative mt-6 grid grid-cols-[1fr_auto_auto] gap-3 text-xs"><div><p className="text-white/60">Card Number</p><p className="mt-1 font-medium">•••• •••• 4983</p></div><div><p className="text-white/60">EXP</p><p className="mt-1 font-medium">09/29</p></div><div><p className="text-white/60">CVC</p><p className="mt-1 font-medium">659</p></div></div></div><div className="flex items-center justify-between py-3"><p className="font-semibold">Virtual Card</p><div className="flex gap-2"><Button variant="outline" size="icon" className="size-8" aria-label="Previous card"><IconChevronLeft className="size-4" /></Button><Button variant="outline" size="icon" className="size-8" aria-label="Next card"><IconChevronRight className="size-4" /></Button></div></div><div className="border-t pt-3"><p className="mb-2 text-xs text-muted-foreground">Recent Transactions</p>{recentActivity.map((item) => <div key={`${item.title}-${item.date}`} className="flex items-center gap-2 border-b py-2.5 last:border-0"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border"><Image src={`/images/icons/${item.icon}`} alt="" width={20} height={20} className="size-5" /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{item.title}</p><p className="truncate text-[10px] text-muted-foreground">{item.note}</p></div><div className="text-right"><p className={`text-xs font-semibold ${item.positive ? "text-emerald-600" : "text-rose-600"}`}>{item.amount}</p><p className="text-[10px] text-muted-foreground">{item.date}</p></div></div>)}<Button variant="outline" className="mt-3 w-full" size="sm">See All Transactions</Button></div></CardContent></Card>
      </aside>
    </div>

    <Card><CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><CardTitle>Recent Transactions</CardTitle><div className="flex flex-col gap-2 sm:flex-row"><Input placeholder="Search..." value={query} onChange={(event) => setQuery(event.target.value)} className="sm:w-64" /><Select value={status} onValueChange={setStatus}><SelectTrigger aria-label="Filter transaction status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">All</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="In Progress">In Progress</SelectItem></SelectContent></Select><Button variant="outline" size="sm"><span className="mr-1">☷</span>Filter</Button></div></CardHeader><CardContent className="px-0 pb-0"><div className="overflow-x-auto"><Table className="min-w-[780px]"><TableHeader><TableRow><TableHead className="pl-6">Order ID</TableHead><TableHead>Activity</TableHead><TableHead>Price</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="pr-6 text-right"> </TableHead></TableRow></TableHeader><TableBody>{rows.map(([id, activity, price, date, state]) => <TableRow key={id}><TableCell className="pl-6 font-semibold">{id}</TableCell><TableCell>{activity}</TableCell><TableCell>{price}</TableCell><TableCell>{date}</TableCell><TableCell><Badge variant="secondary" className={state === "In Progress" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}>{state}</Badge></TableCell><TableCell className="pr-6 text-right text-muted-foreground">•••</TableCell></TableRow>)}</TableBody></Table><p className="border-t px-6 py-3 text-xs text-muted-foreground">Showing {rows.length} of {transactions.length}</p></div></CardContent></Card>
  </div>;
}
