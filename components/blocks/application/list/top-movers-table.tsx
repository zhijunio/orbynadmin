"use client";

import { useMemo, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Kbd } from "@/components/ui/kbd/kbd";
import { SearchField } from "@/components/ui/search-field/search-field";
import { cn } from "@/utils/cn";
import { ListCard, ListCardHeader } from "@/components/blocks/application/list/list-card";

const movers = [
  { id: "arc-line", name: "ArcLine", location: "Barcelona, Spain", status: "Active", amount: "+$1.9M", trend: "up", mark: "A" },
  { id: "market-forge", name: "MarketForge", location: "Belo Horizonte, Brazil", status: "New", amount: "-$2.1M", trend: "down", mark: "M" },
  { id: "nexa-cloud", name: "Nexa Cloud", location: "San Francisco, CA", status: "Active", amount: "+$870k", trend: "up", mark: "N" },
  { id: "vantage-studio", name: "Vantage Studio", location: "San Francisco, CA", status: "On Hold", amount: "-$530k", trend: "down", mark: "V" },
] as const;

const statusVariant = { Active: "success-light", New: "primary-light", "On Hold": "warning-light" } as const;

export function TopMoversTable() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized ? movers.filter(({ name, location, status }) => `${name} ${location} ${status}`.toLowerCase().includes(normalized)) : movers;
  }, [query]);

  return (
    <ListCard aria-labelledby="top-movers-title">
      <ListCardHeader>
        <h2 id="top-movers-title" className="text-base font-semibold">Top Movers</h2>
        <div className="relative w-full max-w-[184px]">
          <SearchField value={query} onValueChange={setQuery} placeholder="Search" size="sm" shape="rounded" className="w-full" inputClassName="border border-input bg-background pe-12" />
          {!query && <Kbd className="pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2">⌘ K</Kbd>}
        </div>
      </ListCardHeader>
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
          <tr className="h-10 border-y border-border">
            <th scope="col" className="px-3 font-medium sm:px-3.5">Name</th>
            <th scope="col" className="w-[78px] px-1 font-medium sm:w-24 sm:px-2">Status</th>
            <th scope="col" className="w-[92px] px-2 text-right font-medium sm:w-[120px] sm:px-3.5">Active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, name, location, status, amount, trend, mark }) => {
            const TrendIcon = trend === "up" ? IconTrendingUp : IconTrendingDown;
            return (
              <tr key={id} className="h-[69px] border-b border-border last:border-b-0">
                <th scope="row" className="px-3 text-left font-normal sm:px-3.5">
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{mark}</span>
                    <span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{name}</span><span className="block truncate text-xs text-muted-foreground">{location}</span></span>
                  </span>
                </th>
                <td className="px-1 sm:px-2"><Badge variant={statusVariant[status]} radius="default" className="px-1.5 sm:px-2">{status}</Badge></td>
                <td className="px-2 text-right sm:px-3.5"><span className={cn("inline-flex items-center justify-end gap-1 text-xs font-medium tabular-nums sm:text-sm", trend === "up" ? "text-success" : "text-destructive")}><TrendIcon className="size-3.5 shrink-0 sm:size-4" aria-hidden="true" />{amount}</span></td>
              </tr>
            );
          })}
          {rows.length === 0 && <tr><td colSpan={3} className="h-20 text-center text-sm text-muted-foreground">No matching companies</td></tr>}
        </tbody>
      </table>
    </ListCard>
  );
}
