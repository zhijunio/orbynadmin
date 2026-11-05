"use client";

import { useState } from "react";
import { IconAlertCircle, IconArrowDownLeft, IconArrowUpRight, IconArrowsExchange, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { cn } from "@/utils/cn";
import { ListCard, ListCardFooter, ListCardHeader } from "@/components/blocks/application/list/list-card";

const transactions = {
  weekly: [
    { id: "received", title: "Received", detail: "From: 0x8a44...72Da", amount: "+ 8.4910 AVAX", type: "credit" },
    { id: "sent", title: "Sent", detail: "To: 0x41c9...0B33", amount: "- 0.342 BTC", type: "debit" },
    { id: "swapped", title: "Swapped", detail: "On: Exchange Hub", receive: "+ 42.8 MATIC", amount: "- $280.00 USDT", type: "swap" },
    { id: "failed", title: "Failed", detail: "To: 0x19e4...B7c2", amount: "- 1.24 ETH", type: "failed" },
  ],
  allTime: [
    { id: "received", title: "Received", detail: "From: 0x984e...A020", amount: "+ 68.4020 AVAX", type: "credit" },
    { id: "sent", title: "Sent", detail: "To: 0x517a...D11a", amount: "- 3.214 BTC", type: "debit" },
    { id: "swapped", title: "Swapped", detail: "On: Exchange Hub", receive: "+ 392.4 MATIC", amount: "- $2,400.00 USDT", type: "swap" },
    { id: "failed", title: "Failed", detail: "To: 0xC02a...4417", amount: "- 6.12 ETH", type: "failed" },
  ],
} as const;

const typeStyles = {
  credit: { Icon: IconArrowDownLeft, className: "border-success/20 bg-success/10 text-success", value: "text-success" },
  debit: { Icon: IconArrowUpRight, className: "border-warning/20 bg-warning/10 text-warning", value: "text-warning" },
  swap: { Icon: IconArrowsExchange, className: "border-primary/20 bg-primary/10 text-primary", value: "text-success" },
  failed: { Icon: IconAlertCircle, className: "border-destructive/20 bg-destructive/10 text-destructive", value: "text-destructive" },
} as const;

export function SwapTransactionList() {
  const [period, setPeriod] = useState<keyof typeof transactions>("weekly");

  return (
    <ListCard aria-labelledby="swap-transactions-title">
      <ListCardHeader>
        <h2 id="swap-transactions-title" className="text-base font-semibold">Transactions</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as keyof typeof transactions)}>
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="px-2.5 text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="allTime" className="px-2.5 text-xs">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </ListCardHeader>
      <ul aria-live="polite" className="px-3.5">
        {transactions[period].map((transaction, index) => {
          const style = typeStyles[transaction.type];
          const Icon = style.Icon;
          return (
            <li key={transaction.id} className={cn("flex min-h-[72px] items-center gap-2", index < transactions[period].length - 1 && "border-b border-dashed border-border")}>
              <span aria-hidden="true" className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg border shadow-sm", style.className)}><Icon className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium", transaction.type === "failed" && "text-destructive")}>{transaction.title}</p>
                <p className="truncate text-xs text-muted-foreground">{transaction.detail}</p>
              </div>
              <div className="shrink-0 text-right text-sm font-medium tabular-nums">
                {"receive" in transaction && <p className="text-success">{transaction.receive}</p>}
                <p className={transaction.type === "swap" ? "text-warning" : style.value}>{transaction.amount}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <ListCardFooter>
        <Button variant="outline" className="w-full"><IconExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />View All</Button>
      </ListCardFooter>
    </ListCard>
  );
}
