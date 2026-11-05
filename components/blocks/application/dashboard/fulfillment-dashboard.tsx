"use client";

import { useMemo, useState } from "react";
import {
  IconAlertTriangle,
  IconArrowDown,
  IconArrowDownRight,
  IconArrowUp,
  IconArrowUpRight,
  IconBox,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconDots,
  IconDownload,
  IconFilter,
  IconInfoCircle,
  IconPlus,
  IconSearch,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Badge } from "@/components/ui/badge/badge";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar/avatar";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Exception = {
  order: string;
  laneCode: string;
  customer: string;
  email: string;
  route: string;
  stage: string;
  progress: number;
  automation: "Autopilot" | "Copilot" | "Manual";
  value: number;
  state: "On Time" | "At Risk" | "Delayed";
  due: string;
};

const records: Exception[] = [
  { order: "NSC-84763", laneCode: "LAX-4", customer: "Northline Studio", email: "returns@northline.example", route: "Los Angeles to Seattle", stage: "Packing", progress: 82, automation: "Autopilot", value: 52210, state: "On Time", due: "Due Today 19:45" },
  { order: "NSC-84721", laneCode: "ORD-2", customer: "Avery Outdoor", email: "ops@averyoutdoor.example", route: "Chicago to Austin", stage: "Carrier tender", progress: 72, automation: "Copilot", value: 38240, state: "At Risk", due: "42 min buffer" },
  { order: "NSC-84698", laneCode: "JFK-1", customer: "Meridian Supply", email: "ship@meridiansupply.example", route: "New York to Boston", stage: "Quality check", progress: 56, automation: "Manual", value: 24780, state: "Delayed", due: "18 min late" },
  { order: "NSC-84674", laneCode: "LAX-4", customer: "Fieldwork Goods", email: "team@fieldwork.example", route: "Los Angeles to Denver", stage: "Label created", progress: 38, automation: "Copilot", value: 19400, state: "At Risk", due: "1 hr buffer" },
  { order: "NSC-84652", laneCode: "ATL-3", customer: "Harbor & Pine", email: "orders@harborpine.example", route: "Atlanta to Miami", stage: "In transit", progress: 68, automation: "Autopilot", value: 16850, state: "On Time", due: "Due Today 21:10" },
  { order: "NSC-84631", laneCode: "ORD-2", customer: "Cedar House", email: "warehouse@cedarhouse.example", route: "Chicago to Detroit", stage: "Awaiting pickup", progress: 24, automation: "Manual", value: 13920, state: "Delayed", due: "31 min late" },
  { order: "NSC-84610", laneCode: "DFW-2", customer: "Monarch Labs", email: "logistics@monarch.example", route: "Dallas to Phoenix", stage: "Sorting", progress: 49, automation: "Autopilot", value: 11760, state: "On Time", due: "Due Today 22:30" },
  { order: "NSC-84592", laneCode: "SEA-1", customer: "Alpine Works", email: "dispatch@alpine.example", route: "Seattle to Portland", stage: "Carrier tender", progress: 74, automation: "Copilot", value: 9560, state: "At Risk", due: "56 min buffer" },
  { order: "NSC-84574", laneCode: "MIA-3", customer: "Goodwell Market", email: "ops@goodwell.example", route: "Miami to Orlando", stage: "Packing", progress: 83, automation: "Autopilot", value: 8240, state: "On Time", due: "Due Today 23:15" },
  { order: "NSC-84550", laneCode: "SFO-2", customer: "Studio Morrow", email: "ship@studiomorrow.example", route: "San Francisco to San Diego", stage: "Quality check", progress: 59, automation: "Manual", value: 6480, state: "Delayed", due: "12 min late" },
];

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export function FulfillmentDashboard() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [showStatus, setShowStatus] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [range, setRange] = useState("May 12, 2026 - Jun 10, 2026");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [sortDescending, setSortDescending] = useState(true);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState("Week");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((row) => {
      const matchesQuery = !query || `${row.order} ${row.customer} ${row.route} ${row.laneCode}`.toLowerCase().includes(query);
      return matchesQuery && (!stateFilter.length || stateFilter.includes(row.state));
    });
  }, [search, stateFilter]);
  const sorted = useMemo(() => [...filtered].sort((a, b) => (sortDescending ? b.value - a.value : a.value - b.value)), [filtered, sortDescending]);
  const visible = sorted.slice((page - 1) * 5, page * 5);
  const compactRange = range.startsWith("Jun 03");
  const shortRange = range.startsWith("May 27");
  const metricValues = compactRange
    ? [["4,318", "+3.2% (+134)"], ["95.1%", "+1.1 pts (from 94.0%)"], ["21", "3 fewer (since Jun 02)"], ["73.8%", "+2.4 pts (from 71.4%)"]]
    : shortRange
      ? [["8,904", "+3.7% (+318)"], ["94.9%", "+0.9 pts (from 94.0%)"], ["28", "4 fewer (since May 26)"], ["72.4%", "+3.1 pts (from 69.3%)"]]
      : [["18,797", "+4.0% (+731)"], ["94.6%", "+0.8 pts (from 93.8%)"], ["34", "5 fewer (since May 11)"], ["70.2%", "+4.6 pts (from 65.6%)"]];

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function toggleState(value: string) {
    setStateFilter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    setPage(1);
  }

  return (
    <section aria-label="Fulfillment dashboard" className="mx-auto w-full min-w-0 max-w-[1216px] space-y-1.5 pb-8 pt-5 text-foreground">
      <header className="flex min-h-10 flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Home</span><IconChevronRight className="size-3.5" /><span>Operations</span><IconChevronRight className="size-3.5" /><span className="text-foreground">Fulfillment</span>
        </nav>
        <div className="flex basis-full min-w-0 flex-wrap items-center justify-end gap-2 sm:basis-auto sm:flex-nowrap">
          <div className="relative min-w-0 flex-1 sm:flex-none">
            <Button variant="outline" size="sm" className="w-full justify-between font-normal sm:min-w-[246px]" onClick={() => setRangeOpen((open) => !open)} aria-expanded={rangeOpen}>
              <span className="truncate">{range}</span><IconCalendar className="size-4 shrink-0 text-muted-foreground" />
            </Button>
            {rangeOpen && <div className="absolute right-0 z-20 mt-1 w-60 rounded-lg border bg-popover p-2 shadow-md" role="group" aria-label="Report date range">
              {["May 12, 2026 - Jun 10, 2026", "May 27, 2026 - Jun 10, 2026", "Jun 03, 2026 - Jun 10, 2026"].map((item) => <button key={item} className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted" onClick={() => { setRange(item); setRangeOpen(false); }}>{item}</button>)}
            </div>}
          </div>
          <Button size="sm" className="shrink-0" onClick={() => announce("Fulfillment report exported")}><IconDownload />Export</Button>
        </div>
      </header>

        <section aria-label="Fulfillment metrics" className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<IconBox />} tone="neutral" group="Outbound" title="Orders Ready" label="Ready Volume" value={metricValues[0][0]} delta={metricValues[0][1]} />
        <MetricCard icon={<IconTruck />} tone="primary" group="Promise" title="Same-Day SLA" label="Service Level" value={metricValues[1][0]} delta={metricValues[1][1]} />
        <MetricCard icon={<IconAlertTriangle />} tone="warning" group="Inventory" title="Stock Risk" label="Blocked SKUs" value={metricValues[2][0]} delta={metricValues[2][1]} />
        <MetricCard icon={<IconCircleCheck />} tone="info" group="Automation" title="Auto Resolved" label="Orders handled automatically" value={metricValues[3][0]} delta={metricValues[3][1]} />
      </section>

      <section className="grid min-w-0 gap-3 lg:grid-cols-2" aria-label="Shift and capacity overview">
        <div>
          <section className="flex min-h-[417px] flex-col rounded-lg border bg-card p-4">
            <header className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Shift Performance</h2>
              <select aria-label="Shift" className="h-8 rounded-lg border bg-background px-3 text-sm"><option>Today</option><option>Yesterday</option><option>This week</option></select>
            </header>
            <div className="mt-6 grid grid-cols-3 gap-3 border-b pb-5">
              <ShiftMetric value="495" label="Orders Cleared" delta="+5.8%" />
              <ShiftMetric value="91.3%" label="SLA Recovery" delta="+2.2 pts" />
              <ShiftMetric value="$133.8k" label="Risk Exposure" delta="-9.4%" negative />
            </div>
            <div className="border-b py-5">
              <div className="mb-2 flex items-center justify-between text-sm"><span>Pipeline Progress</span><span className="font-medium">76%</span></div>
              <div className="h-1 rounded-full bg-muted"><div className="h-1 w-[76%] bg-foreground" /></div>
            </div>
            <div className="flex-1 pt-5">
              <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
              <ActivityRow color="text-emerald-500" status="Cleared">Released priority wave to dock B</ActivityRow>
              <ActivityRow color="text-sky-500" status="Review">Carrier mix repriced for zone 6</ActivityRow>
              <ActivityRow color="text-amber-500" status="Watch">Inventory hold isolated to 3 SKUs</ActivityRow>
            </div>
          </section>
          <div className="grid grid-cols-2 gap-2 px-2 pb-1.5 pt-2">
            <Button variant="outline" onClick={() => announce("Shift schedule opened")}>Schedule</Button>
            <Button onClick={() => announce("Full report opened")}>Full Report</Button>
          </div>
        </div>

        <div className="space-y-5">
          <section className="min-h-[224px] rounded-lg border bg-card p-4">
            <div className="h-full min-h-[214px]">
              <PanelHeader title="Capacity Allocation" period={period} onPeriod={setPeriod} info="Capacity allocation against the labor plan" />
              <div className="mt-4 flex items-baseline gap-2"><strong className="text-[28px] font-semibold leading-none">86%</strong><span className="text-xs text-emerald-600">+5.8%</span><span className="text-xs text-muted-foreground">vs labor plan</span></div>
              <div className="mt-5 flex h-7 items-stretch gap-[4px]" aria-label="86 percent capacity allocated">{Array.from({ length: 48 }, (_, index) => <span key={index} className={`min-w-0 flex-1 rounded-sm ${index < 41 ? "bg-emerald-500" : "bg-muted"}`} />)}</div>
              <div className="mt-5 flex items-center justify-between gap-2 text-xs"><span className="text-muted-foreground">Queued Orders: <b className="text-foreground">3,840 orders</b></span><div className="flex items-center gap-2"><AvatarGroup className="-space-x-2"><MiniAvatar name="Leo Martins" /><MiniAvatar name="Maya Singh" /><MiniAvatar name="Noah Kim" /></AvatarGroup><span className="text-muted-foreground">6 Members</span></div></div>
            </div>
          </section>
          <section className="min-h-[224px] rounded-lg border bg-card p-4">
            <div className="min-h-[214px]">
              <PanelHeader title="Decision Flow" period={period} onPeriod={setPeriod} info="Orders resolved by each automation level" />
              <div className="mt-5 grid grid-cols-[108px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[138px_minmax(0,1fr)] sm:gap-4">
                <DecisionDonut />
                <div className="min-w-0">{[["Autopilot", "9.1k", "49.5%", "bg-emerald-500"], ["Copilot", "5.2k", "28.3%", "bg-blue-500"], ["Manual", "2.8k", "15.2%", "bg-amber-500"]].map(([name, count, share, color]) => <div key={name} className="flex items-center justify-between gap-1 border-b py-2 text-xs last:border-0 sm:text-sm"><span className="flex min-w-0 items-center gap-2 truncate sm:gap-3"><i className={`size-2 shrink-0 rounded-full ${color}`} />{name}</span><span className="flex shrink-0 items-baseline gap-1 whitespace-nowrap sm:gap-3">{count}<span className="text-[10px] text-muted-foreground sm:text-xs">{share}</span></span></div>)}</div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-card" aria-label="Exception Queue">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-muted/30 px-4 py-3">
          <div><h2 className="text-sm font-semibold">Exception Queue</h2><p className="mt-0.5 text-xs text-muted-foreground">{filtered.length} of 10 fulfillment records</p></div>
          <Button size="sm" onClick={() => announce("New exception form opened")}><IconPlus />Add exception</Button>
        </header>
        <div className="flex flex-wrap items-center justify-between gap-2 border-y px-4 py-2">
          <div className="flex items-center gap-2">
            <label className="relative block"><IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search orders..." className="h-8 w-60 pl-8" aria-label="Search orders" /></label>
            <div className="relative"><Button size="sm" variant="outline" onClick={() => setShowStatus((open) => !open)} aria-expanded={showStatus}><IconFilter />Status{stateFilter.length > 0 && <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{stateFilter.length}</span>}</Button>
              {showStatus && <div className="absolute left-0 top-9 z-20 w-40 rounded-lg border bg-popover p-2 shadow-md">{["On Time", "At Risk", "Delayed"].map((value) => <label key={value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"><input type="checkbox" checked={stateFilter.includes(value)} onChange={() => toggleState(value)} />{value}</label>)}</div>}
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => announce("Queue actions opened")}><IconDots />Actions</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-xs">
            <thead className="bg-background text-muted-foreground"><tr className="border-b">
              <th className="w-11 px-4 py-2"><input aria-label="Select all orders" type="checkbox" checked={visible.length > 0 && visible.every((row) => selected.includes(row.order))} onChange={(event) => setSelected(event.target.checked ? Array.from(new Set([...selected, ...visible.map((r) => r.order)])) : selected.filter((id) => !visible.some((row) => row.order === id)))} /></th>
              <SortHead label="Order" /><SortHead label="Customer" /><SortHead label="Lane" /><SortHead label="Stage" /><SortHead label="Automation" /><th className="px-3 py-2"><button className="inline-flex items-center gap-1" onClick={() => setSortDescending((value) => !value)}>Value{sortDescending ? <IconArrowDown className="size-3" /> : <IconArrowUp className="size-3" />}</button></th><SortHead label="State" /><th className="w-10" />
            </tr></thead>
            <tbody>{visible.map((row) => <tr key={row.order} className="h-16 border-b last:border-0 hover:bg-muted/30">
              <td className="px-4"><input type="checkbox" aria-label={`Select ${row.order}`} checked={selected.includes(row.order)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, row.order] : current.filter((id) => id !== row.order))} /></td>
              <td className="px-3"><b className="font-medium text-foreground">{row.order}</b><span className="mt-1 block text-muted-foreground">{row.laneCode} · {row.customer.split(" ")[0]}</span></td>
              <td className="min-w-48 px-3"><div className="flex items-center gap-2"><Avatar size="sm"><AvatarImage src={demoAvatarUrl(row.customer)} alt="" /><AvatarFallback>{row.customer.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><div className="min-w-0"><span className="block truncate font-medium text-foreground">{row.customer}</span><span className="block truncate text-muted-foreground">{row.email}</span></div></div></td>
              <td className="px-3"><span className="block max-w-36 truncate text-foreground">{row.route}</span><span className="text-muted-foreground">{row.laneCode}</span></td>
              <td className="min-w-36 px-3"><div className="flex items-center gap-2"><IconBox className="size-4 text-muted-foreground" /><span>{row.stage}</span></div><div className="mt-1.5 flex items-center gap-2"><div className="h-1.5 w-20 rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${row.progress}%` }} /></div><span className="text-muted-foreground">{row.progress}%</span></div></td>
              <td className="px-3"><Badge variant={row.automation === "Autopilot" ? "success-outline" : row.automation === "Copilot" ? "primary-outline" : "outline"}>{row.automation}</Badge></td>
              <td className="px-3"><span className="font-medium text-foreground">{money(row.value)}</span><IconInfoCircle className="ml-1 inline size-3.5 text-muted-foreground" /></td>
              <td className="min-w-28 px-3"><Badge variant={row.state === "On Time" ? "success-outline" : row.state === "At Risk" ? "warning-outline" : "destructive-outline"}><i className={`mr-1 size-1.5 rounded-full ${row.state === "On Time" ? "bg-emerald-500" : row.state === "At Risk" ? "bg-amber-500" : "bg-destructive"}`} />{row.state}</Badge><span className="mt-1 block text-muted-foreground">{row.due}</span></td>
              <td className="relative px-2"><details className="group relative"><summary className="flex size-7 cursor-pointer list-none items-center justify-center rounded-md hover:bg-muted" aria-label={`More actions for ${row.order}`}><IconDots className="size-4" /></summary><div className="absolute right-0 top-8 z-20 w-32 rounded-lg border bg-popover p-1 shadow-md">{["View", "Notify", "Escalate"].map((action) => <button key={action} className="block w-full rounded px-2 py-1.5 text-left text-xs hover:bg-muted" onClick={() => announce(`${action} ${row.order}`)}>{action}</button>)}</div></details></td>
            </tr>)}</tbody>
          </table>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground"><span>{selected.length ? `${selected.length} selected` : `Showing ${filtered.length ? (page - 1) * 5 + 1 : 0}-${Math.min(page * 5, filtered.length)} of ${filtered.length} records`}</span><div className="flex items-center gap-2"><Button size="xs" variant="outline" disabled={page === 1} onClick={() => setPage((value) => value - 1)}><IconChevronLeft />Previous</Button><span>Page {page} of {Math.max(1, Math.ceil(filtered.length / 5))}</span><Button size="xs" variant="outline" disabled={page >= Math.ceil(filtered.length / 5)} onClick={() => setPage((value) => value + 1)}>Next<IconChevronRight /></Button></div></footer>
      </section>
      {notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border bg-popover px-4 py-3 text-sm shadow-lg"><IconCheck className="size-4 text-emerald-500" />{notice}<button aria-label="Dismiss" onClick={() => setNotice("")}><IconX className="size-4" /></button></div>}
    </section>
  );
}

function MetricCard({ icon, tone, group, title, label, value, delta }: { icon: React.ReactNode; tone: "neutral" | "primary" | "warning" | "info"; group: string; title: string; label: string; value: string; delta: string }) {
  const toneClass = { neutral: "bg-foreground text-background", primary: "bg-primary text-primary-foreground", warning: "bg-warning text-warning-foreground", info: "bg-info text-info-foreground" }[tone];
  return <article className="min-h-[144px] rounded-lg border bg-card p-4"><div className="flex items-center gap-3"><span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${toneClass}`}>{icon}</span><div><p className="text-sm text-muted-foreground">{group}</p><h3 className="text-sm font-medium">{title}</h3></div></div><p className="mt-4 text-sm text-muted-foreground">{label}</p><div className="mt-1 flex flex-wrap items-baseline gap-1.5"><strong className="text-xl font-medium tabular-nums">{value}</strong><span className="text-sm text-teal-600">{delta}</span></div></article>;
}

function ShiftMetric({ value, label, delta, negative = false }: { value: string; label: string; delta: string; negative?: boolean }) {
  const TrendIcon = negative ? IconArrowDownRight : IconArrowUpRight;
  return <div><strong className="text-xl font-semibold tabular-nums">{value}</strong><span className="mt-0.5 block text-xs text-muted-foreground">{label}</span><span className="mt-1 block text-xs text-emerald-600"><TrendIcon className="mr-0.5 inline size-3" />{delta}</span></div>;
}

function ActivityRow({ children, color, status }: { children: React.ReactNode; color: string; status: string }) {
  return <div className="flex min-h-7 items-center justify-between gap-2 text-xs"><span className="flex min-w-0 items-center gap-2"><IconCircleCheck className={`size-3.5 shrink-0 ${color}`} /><span className="truncate">{children}</span></span><Badge variant={status === "Cleared" ? "success-outline" : status === "Review" ? "primary-outline" : "warning-outline"}>{status}</Badge></div>;
}

function PanelHeader({ title, period, onPeriod, info }: { title: string; period: string; onPeriod: (value: string) => void; info: string }) {
  return <header className="flex flex-wrap items-center justify-between gap-2"><h2 className="flex items-center gap-1.5 text-sm font-medium">{title}<span className="group relative"><IconInfoCircle className="size-3.5 text-muted-foreground" /><span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-48 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">{info}</span></span></h2><div className="flex rounded-lg bg-muted/70 p-0.5" role="group" aria-label={`${title} period`}>{["Week", "Month", "Year"].map((item) => <button key={item} onClick={() => onPeriod(item)} className={`rounded-md px-2 py-1 text-xs ${period === item ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div></header>;
}

function DecisionDonut() {
  return <div className="relative mx-auto size-[100px] sm:size-[128px]" aria-label="Decision flow: 49.5 percent Autopilot, 28.3 percent Copilot, 15.2 percent Manual"><svg viewBox="0 0 120 120" className="size-full -rotate-90"><circle cx="60" cy="60" r="49" fill="none" stroke="var(--muted)" strokeWidth="11" /><circle cx="60" cy="60" r="49" fill="none" stroke="var(--color-emerald-500)" strokeWidth="11" strokeDasharray="150 308" strokeDashoffset="0" /><circle cx="60" cy="60" r="49" fill="none" stroke="var(--color-blue-500)" strokeWidth="11" strokeDasharray="85 308" strokeDashoffset="-158" /><circle cx="60" cy="60" r="49" fill="none" stroke="var(--color-amber-500)" strokeWidth="11" strokeDasharray="46 308" strokeDashoffset="-251" /><circle cx="60" cy="60" r="49" fill="none" stroke="var(--color-slate-400)" strokeWidth="11" strokeDasharray="17 308" strokeDashoffset="-306" /></svg><div className="absolute inset-0 flex flex-col items-center justify-center text-center"><span className="text-[10px] text-muted-foreground">Flow</span><strong className="text-sm">18.4k</strong></div></div>;
}

function MiniAvatar({ name }: { name: string }) {
  return <Avatar size="xs" className="ring-2 ring-background"><AvatarImage src={demoAvatarUrl(name)} alt="" /><AvatarFallback>{name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar>;
}

function SortHead({ label }: { label: string }) {
  return <th className="px-3 py-2"><button className="inline-flex items-center gap-1 hover:text-foreground">{label}<IconChevronDown className="size-3" /></button></th>;
}
