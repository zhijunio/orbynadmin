import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { ListCard } from "@/components/blocks/application/list/list-card";

const transactions = [
  { id: "ethereum-gain", title: "Ethereum Gain", date: "12th May, 2026", amount: "+ $1,980", direction: "credit" },
  { id: "bitcoin-sold", title: "Bitcoin Sold", date: "11th May, 2026", amount: "- $2,450", direction: "debit" },
  { id: "usdt-deposit", title: "USDT Deposit", date: "9th May, 2026", amount: "+ $3,200", direction: "credit" },
  { id: "staking-reward", title: "Staking Reward", date: "8th May, 2026", amount: "+ $126", direction: "credit" },
  { id: "solana-purchase", title: "Solana Purchase", date: "6th May, 2026", amount: "- $750", direction: "debit" },
] as const;

export function CryptoActivityFeed() {
  return <ListCard aria-label="Crypto activity">
    <ul>
      {transactions.map((transaction, index) => {
        const isCredit = transaction.direction === "credit";
        const DirectionIcon = isCredit ? IconArrowUpRight : IconArrowDownRight;
        return <li key={transaction.id} className={cn("flex h-[72px] items-center gap-2 px-3.5", index < transactions.length - 1 && "border-b border-border")}>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-sm ring-1", isCredit ? "border-success/20 bg-success/10 text-success ring-success/10" : "border-destructive/20 bg-destructive/10 text-destructive ring-destructive/10")}>
          <DirectionIcon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{transaction.title}</p>
          <p className="text-xs text-muted-foreground">{transaction.date}</p>
        </div>
        <p className={cn("shrink-0 text-lg font-medium", isCredit ? "text-success" : "text-destructive")}>{transaction.amount}</p>
        </li>;
      })}
    </ul>
  </ListCard>;
}
