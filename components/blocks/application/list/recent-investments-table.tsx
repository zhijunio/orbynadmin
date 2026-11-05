"use client";

import { useMemo, useState } from "react";
import { SearchField } from "@/components/ui/search-field/search-field";
import { Kbd } from "@/components/ui/kbd/kbd";
import { cn } from "@/utils/cn";
import { ListCard, ListCardHeader } from "@/components/blocks/application/list/list-card";

const investments = [
  { id: "asterion", company: "Asterion Materials", date: "Feb 8, 2025", sector: "Industrial Materials", change: "+ $ 420,000", compactChange: "+$420k", mark: "A" },
  { id: "bluepeak", company: "Bluepeak Properties", date: "Feb 7, 2025", sector: "Real Estate", change: "+ $ 310,000", compactChange: "+$310k", mark: "B" },
  { id: "northline", company: "Northline Logistics", date: "Feb 6, 2025", sector: "Transportation", change: "+ $ 185,000", compactChange: "+$185k", mark: "N" },
  { id: "wavemark", company: "Wavemark Holdings", date: "Feb 5, 2025", sector: "Finance", change: "- $ 92,000", compactChange: "-$92k", mark: "W" },
] as const;

export function RecentInvestmentsTable() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized ? investments.filter(({ company, date, sector }) => `${company} ${date} ${sector}`.toLowerCase().includes(normalized)) : investments;
  }, [query]);

  return (
    <ListCard aria-labelledby="recent-investments-title">
      <ListCardHeader>
        <h2 id="recent-investments-title" className="text-base font-semibold">Recent Investments</h2>
        <div className="relative w-full max-w-[184px]">
          <SearchField value={query} onValueChange={setQuery} placeholder="Search" size="sm" shape="rounded" className="w-full" inputClassName="border border-input bg-background pe-12" />
          {!query && <Kbd className="pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2">⌘ K</Kbd>}
        </div>
      </ListCardHeader>
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
          <tr className="h-10 border-y border-border">
            <th scope="col" className="w-[48%] px-2 font-medium sm:px-3.5">Company</th>
            <th scope="col" className="w-[28%] px-1 font-medium sm:px-2">Sector</th>
            <th scope="col" className="w-[24%] px-2 text-right font-medium sm:px-3.5">Value Change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, company, date, sector, change, compactChange, mark }) => {
            const isGain = !change.startsWith("-");
            return (
              <tr key={id} className="h-[69px] border-b border-border last:border-b-0">
                <th scope="row" className="px-2 text-left font-normal sm:px-3.5">
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-xs font-semibold text-primary">{mark}</span>
                    <span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{company}</span><span className="block text-xs text-muted-foreground">{date}</span></span>
                  </span>
                </th>
                <td className="px-1 text-xs sm:px-2 sm:text-sm"><span className="block truncate">{sector}</span></td>
                <td className={cn("whitespace-nowrap px-2 text-right text-xs font-medium tabular-nums sm:px-3.5 sm:text-sm", isGain ? "text-success" : "text-destructive")}><span className="sm:hidden">{compactChange}</span><span className="hidden sm:inline">{change}</span></td>
              </tr>
            );
          })}
          {rows.length === 0 && <tr><td colSpan={3} className="h-20 text-center text-sm text-muted-foreground">No matching investments</td></tr>}
        </tbody>
      </table>
    </ListCard>
  );
}
