"use client";

import { useMemo, useState } from "react";

import { IconDots, IconSearch } from "@tabler/icons-react";
import { Badge } from "@/components/base/badges/badge";
import { Button } from "@/components/base/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { Input } from "@/components/base/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";

export type Campaign = { name: string; status: string; objective: string; updated: string; spend: number; channel: string };

const campaignExamples: Campaign[] = [
  { name: "Founder story video · Global", status: "Active", objective: "Awareness", updated: "Jul 22, 2026", spend: 34_800, channel: "Meta" },
  { name: "Holiday gift guide · Global", status: "Paused", objective: "Traffic", updated: "Sep 16, 2026", spend: 30_884, channel: "Meta" },
  { name: "Founder story video · US", status: "Active", objective: "Conversions", updated: "Dec 24, 2026", spend: 1_330, channel: "Google Ads" },
  { name: "Newsletter promo · EU", status: "Paused", objective: "Leads", updated: "Dec 08, 2026", spend: 34_445, channel: "Email" },
  { name: "Spring launch · UK", status: "Draft", objective: "Awareness", updated: "Oct 04, 2026", spend: 0, channel: "LinkedIn" },
  { name: "Brand search · US", status: "Paused", objective: "Leads", updated: "Mar 23, 2026", spend: 19_116, channel: "Google Ads" },
  { name: "Cart retargeting · UK", status: "Draft", objective: "Awareness", updated: "Aug 21, 2026", spend: 0, channel: "X Ads" },
  { name: "Newsletter promo · US", status: "Active", objective: "Awareness", updated: "Oct 24, 2026", spend: 28_095, channel: "Email" },
  { name: "Webinar signups · UK", status: "Active", objective: "Awareness", updated: "Mar 08, 2026", spend: 25_305, channel: "LinkedIn" },
  { name: "Case study promo · UK", status: "Active", objective: "Retargeting", updated: "Mar 01, 2026", spend: 333, channel: "X Ads" },
];

export const initialCampaigns: Campaign[] = Array.from({ length: 80 }, (_, index) => {
  const campaign = campaignExamples[index % campaignExamples.length];
  if (index < campaignExamples.length) return campaign;
  const cycle = Math.floor(index / campaignExamples.length);
  const date = new Date(Date.UTC(2026, cycle, (index * 5) % 27 + 1));
  return { ...campaign, updated: date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" }) };
});

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Paused: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Draft: "bg-muted text-muted-foreground",
};

export default function MarketingCampaignsCard({ campaigns, onCampaignsChange }: { campaigns: Campaign[]; onCampaignsChange: (campaigns: Campaign[]) => void }) {
  const [channel, setChannel] = useState("all");
  const [objective, setObjective] = useState("all");
  const [spend, setSpend] = useState("all");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const channels = useMemo(() => Array.from(new Set(campaigns.map((campaign) => campaign.channel))), [campaigns]);
  const objectives = useMemo(() => Array.from(new Set(campaigns.map((campaign) => campaign.objective))), [campaigns]);
  const filtered = campaigns.filter((campaign) => {
    const text = `${campaign.name} ${campaign.channel} ${campaign.objective}`.toLowerCase();
    const matchesSpend = spend === "all" || (spend === "under" ? campaign.spend < 10_000 : spend === "mid" ? campaign.spend >= 10_000 && campaign.spend <= 25_000 : campaign.spend > 25_000);
    return (channel === "all" || campaign.channel === channel) && (objective === "all" || campaign.objective === objective) && matchesSpend && text.includes(search.toLowerCase());
  });
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(pageIndex, pageCount - 1);
  const visible = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Total Results</CardTitle>
      <span className="text-sm text-muted-foreground">{campaigns.length} campaigns</span>
    </CardHeader>
    <CardContent className="space-y-4 px-0 pb-0">
      <div id="campaign-filters" className="flex scroll-mt-20 flex-col gap-2 px-5 sm:flex-row sm:flex-wrap sm:items-center">
        <Select value={channel} onValueChange={(value) => { setChannel(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by channel" className="w-full sm:w-[150px]"><SelectValue placeholder="All channels" /></SelectTrigger><SelectContent><SelectItem value="all">All channels</SelectItem>{channels.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={objective} onValueChange={(value) => { setObjective(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by objective" className="w-full sm:w-[160px]"><SelectValue placeholder="All objectives" /></SelectTrigger><SelectContent><SelectItem value="all">All objectives</SelectItem>{objectives.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={spend} onValueChange={(value) => { setSpend(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by spend" className="w-full sm:w-[140px]"><SelectValue placeholder="All spend" /></SelectTrigger><SelectContent><SelectItem value="all">All spend</SelectItem><SelectItem value="under">Under $10K</SelectItem><SelectItem value="mid">$10K–$25K</SelectItem><SelectItem value="over">Over $25K</SelectItem></SelectContent></Select>
        <div className="relative min-w-40 flex-1 sm:ml-auto sm:max-w-xs"><IconSearch aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search campaigns" placeholder="Search" value={search} onChange={(event) => { setSearch(event.currentTarget.value); setPageIndex(0); }} className="pl-8" /></div>
      </div>
      <Table><TableHeader><TableRow><TableHead className="pl-5">Campaign</TableHead><TableHead>Delivery</TableHead><TableHead>Objective</TableHead><TableHead>Last updated</TableHead><TableHead className="pr-5 text-right">Spend</TableHead><TableHead className="w-12 pr-5"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader><TableBody>
        {visible.length ? visible.map((campaign, index) => <TableRow key={`${campaign.name}-${campaign.updated}-${index}`}>
          <TableCell className="pl-5 font-medium">{campaign.name}</TableCell><TableCell><Badge variant="secondary" className={statusStyles[campaign.status] ?? statusStyles.Draft}>{campaign.status}</Badge></TableCell><TableCell>{campaign.objective}</TableCell><TableCell className="text-muted-foreground">{campaign.updated}</TableCell><TableCell className="pr-5 text-right font-medium tabular-nums">${campaign.spend.toLocaleString()}</TableCell><TableCell className="pr-5"><DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon-xs" aria-label={`Actions for ${campaign.name}`}><IconDots aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => { const index = campaigns.indexOf(campaign); if (index >= 0) onCampaignsChange(campaigns.map((item, itemIndex) => itemIndex === index ? { ...item, status: item.status === "Active" ? "Paused" : "Active" } : item)); }}>{campaign.status === "Active" ? "Pause campaign" : "Activate campaign"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
        </TableRow>) : <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No matching campaigns.</TableCell></TableRow>}
      </TableBody></Table>
      <div className="flex flex-col gap-3 border-t px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-muted-foreground">Showing {filtered.length ? currentPage * pageSize + 1 : 0}–{Math.min((currentPage + 1) * pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-1"><Button variant="outline" size="sm" disabled={currentPage === 0} onClick={() => setPageIndex((page) => Math.max(0, page - 1))}>Previous</Button>{Array.from({ length: Math.min(5, pageCount) }, (_, index) => index).map((index) => <Button key={index} variant={currentPage === index ? "secondary" : "ghost"} size="sm" aria-current={currentPage === index ? "page" : undefined} onClick={() => setPageIndex(index)}>{index + 1}</Button>)}{pageCount > 5 && <><span className="px-1 text-muted-foreground">…</span><Button variant={currentPage === pageCount - 1 ? "secondary" : "ghost"} size="sm" aria-current={currentPage === pageCount - 1 ? "page" : undefined} onClick={() => setPageIndex(pageCount - 1)}>{pageCount}</Button></>}<Button variant="outline" size="sm" disabled={currentPage >= pageCount - 1} onClick={() => setPageIndex((page) => Math.min(pageCount - 1, page + 1))}>Next</Button></div></div>
    </CardContent>
  </Card>;
}
