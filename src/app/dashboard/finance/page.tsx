import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PageHeader } from "@/components/application/app-shell/page-header";
import RevenueChartCard from "@/components/application/dashboard/chart-cards/revenue-chart-card";
import RadialChartCard from "@/components/application/dashboard/chart-cards/radial-chart-card";
import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { ChartCard } from "@/components/application/charts/chart-card";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { IconCoin, IconCreditCard, IconPigMoney, IconWallet } from "@tabler/icons-react";

const financeStats: StatCardData[] = [
  { label: "Total balance", value: "$84,230", change: 3.2, trend: "up", hint: "vs. last month", icon: IconWallet },
  { label: "Income", value: "$18,420", change: 6.1, trend: "up", hint: "vs. last month", icon: IconCoin },
  { label: "Expenses", value: "$9,140", change: 2.4, trend: "up", goodWhen: "down", hint: "vs. last month", icon: IconCreditCard },
  { label: "Invested", value: "$32,400", change: 8.4, trend: "up", hint: "vs. last month", icon: IconPigMoney },
];

const allocations = [
  { label: "Stocks", value: 55, color: "var(--chart-1)" },
  { label: "Funds", value: 30, color: "var(--chart-2)" },
  { label: "Crypto", value: 15, color: "var(--chart-3)" },
];

const spendingCategories = [
  { name: "Groceries", value: 1840 },
  { name: "Housing", value: 1620 },
  { name: "Transport", value: 970 },
  { name: "Subscriptions", value: 740 },
  { name: "Utilities", value: 640 },
];

const dailySpending = [
  { day: "Mon", value: 420 }, { day: "Tue", value: 680 }, { day: "Wed", value: 510 },
  { day: "Thu", value: 940 }, { day: "Fri", value: 730 }, { day: "Sat", value: 640 }, { day: "Sun", value: 470 },
];

const transactions = [
  { name: "Whole Foods Market", account: "Savings", category: "Groceries", date: "Oct 28, 2026", amount: -135 },
  { name: "Spotify", account: "Savings", category: "Subscriptions", date: "Jul 15, 2026", amount: -12 },
  { name: "Acme Corp payroll", account: "Savings", category: "Income", date: "Jun 17, 2026", amount: 6200 },
  { name: "iCloud storage", account: "Checking", category: "Subscriptions", date: "Feb 03, 2026", amount: -3 },
  { name: "Electric utility", account: "Credit card", category: "Utilities", date: "Jun 06, 2026", amount: -91 },
  { name: "Studio K invoice", account: "Checking", category: "Income", date: "Dec 14, 2026", amount: 1286 },
];

function SpendingByCategoryCard() {
  const total = spendingCategories.reduce((sum, category) => sum + category.value, 0);
  const max = spendingCategories[0].value;
  return (
    <ChartCard title="Spending by category">
      <div className="mb-5 flex items-baseline gap-2 border-b pb-4"><span className="text-2xl font-semibold tabular-nums">${total.toLocaleString()}</span><span className="text-xs text-muted-foreground">this month</span></div>
      <div className="space-y-4">{spendingCategories.map(({ name, value }, index) => <div key={name}>
        <div className="mb-1.5 flex items-center justify-between text-sm"><span>{name}</span><span className="font-medium tabular-nums">${value.toLocaleString()}</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${value / max * 100}%`, backgroundColor: `var(--chart-${index + 1})` }} /></div>
      </div>)}</div>
    </ChartCard>
  );
}

function DailySpendingCard() {
  const max = Math.max(...dailySpending.map(({ value }) => value));
  const total = dailySpending.reduce((sum, day) => sum + day.value, 0);
  return (
    <ChartCard title="Daily spending">
      <div className="mb-4 flex items-baseline gap-2 border-b pb-4"><span className="text-2xl font-semibold tabular-nums">${total.toLocaleString()}</span><span className="text-xs text-muted-foreground">last 7 days</span></div>
      <div className="flex h-44 items-end justify-between gap-2">
        {dailySpending.map(({ day, value }) => <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-[10px] tabular-nums text-muted-foreground">${value}</span>
          <div className="w-full rounded-t-md bg-chart-1" style={{ height: `${value / max * 72}%` }} />
          <span className="text-xs text-muted-foreground">{day}</span>
        </div>)}
      </div>
    </ChartCard>
  );
}

function TransactionsCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Transactions</CardTitle><CardAction><span className="text-sm text-muted-foreground">140 transactions</span></CardAction></CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader><TableRow><TableHead className="pl-5">Transaction</TableHead><TableHead>Account</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead><TableHead className="pr-5 text-right">Amount</TableHead></TableRow></TableHeader>
          <TableBody>{transactions.map((transaction) => <TableRow key={`${transaction.name}-${transaction.date}`}>
            <TableCell className="pl-5 font-medium">{transaction.name}</TableCell><TableCell>{transaction.account}</TableCell><TableCell>{transaction.category}</TableCell><TableCell className="text-muted-foreground">{transaction.date}</TableCell>
            <TableCell className={`pr-5 text-right font-medium tabular-nums ${transaction.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{transaction.amount > 0 ? "+" : "−"}${Math.abs(transaction.amount).toLocaleString()}</TableCell>
          </TableRow>)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function FinanceDashboardPage() {
  return (
    <ConsoleLayout>
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        <PageHeader title="Finance" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financeStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2"><RevenueChartCard title="Cash flow" /></div>
          <RadialChartCard title="Portfolio" metrics={allocations} maximum={100} change="+6.2%" periodLabel="Year to date" valueSuffix="%" />
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-2">
          <SpendingByCategoryCard />
          <DailySpendingCard />
        </div>
        <TransactionsCard />
      </div>
    </ConsoleLayout>
  );
}
