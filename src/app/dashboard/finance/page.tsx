"use client";

import { useState } from "react";
import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PageHeader } from "@/components/application/app-shell/page-header";
import FinanceCharts from "./finance-charts";
import FinanceTransactionsCard, { type FinanceTransaction } from "./finance-transactions-card";
import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { Button } from "@/components/base/buttons/button";
import { IconAdjustmentsHorizontal, IconCoin, IconCreditCard, IconPlus, IconPigMoney, IconWallet } from "@tabler/icons-react";

const financeStats: StatCardData[] = [
  { label: "Total balance", value: "$84,230", change: 3.2, trend: "up", hint: "vs. last month", icon: IconWallet },
  { label: "Income", value: "$18,420", change: 6.1, trend: "up", hint: "vs. last month", icon: IconCoin },
  { label: "Expenses", value: "$9,140", change: 2.4, trend: "up", goodWhen: "down", hint: "vs. last month", icon: IconCreditCard },
  { label: "Invested", value: "$32,400", change: 8.4, trend: "up", hint: "vs. last month", icon: IconPigMoney },
];

const transactionExamples: FinanceTransaction[] = [
  { name: "Whole Foods Market", account: "Savings", category: "Groceries", date: "Oct 28, 2026", amount: -135 },
  { name: "Spotify", account: "Savings", category: "Subscriptions", date: "Jul 15, 2026", amount: -12 },
  { name: "Acme Corp payroll", account: "Savings", category: "Income", date: "Jun 17, 2026", amount: 6200 },
  { name: "iCloud storage", account: "Checking", category: "Subscriptions", date: "Feb 03, 2026", amount: -3 },
  { name: "Electric utility", account: "Credit card", category: "Utilities", date: "Jun 06, 2026", amount: -91 },
  { name: "Whole Foods Market", account: "Checking", category: "Groceries", date: "Apr 05, 2026", amount: -161 },
  { name: "Studio K invoice", account: "Checking", category: "Income", date: "Dec 14, 2026", amount: 1286 },
  { name: "Shell", account: "Credit card", category: "Transport", date: "Nov 01, 2026", amount: -76 },
  { name: "Netflix", account: "Credit card", category: "Subscriptions", date: "Dec 14, 2026", amount: -18 },
  { name: "iCloud storage", account: "Checking", category: "Subscriptions", date: "Apr 24, 2026", amount: -3 },
];

const transactions: FinanceTransaction[] = Array.from({ length: 140 }, (_, index) => {
  const example = transactionExamples[index % transactionExamples.length];
  if (index < transactionExamples.length) return example;
  const cycle = Math.floor(index / transactionExamples.length);
  const date = new Date(Date.UTC(2026, cycle, (index * 7) % 27 + 1));
  return { ...example, date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" }) };
});

export default function FinanceDashboardPage() {
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  return (
    <ConsoleLayout>
      <div className="mx-auto w-full max-w-[1300px] space-y-4">
        <PageHeader title="Finance">
          <Button variant="outline" onClick={() => document.getElementById("finance-filters")?.scrollIntoView({ behavior: "smooth", block: "center" })}><IconAdjustmentsHorizontal aria-hidden="true" />5 Filters</Button>
          <Button onClick={() => setAddTransactionOpen(true)}><IconPlus aria-hidden="true" />Add transaction</Button>
        </PageHeader>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financeStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
        <FinanceCharts />
        <FinanceTransactionsCard initialTransactions={transactions} dialogOpen={addTransactionOpen} onDialogOpenChange={setAddTransactionOpen} />
      </div>
    </ConsoleLayout>
  );
}
