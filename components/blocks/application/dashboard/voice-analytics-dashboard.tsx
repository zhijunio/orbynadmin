"use client";

import { useMemo, useState } from "react";
import { Area, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import { IconActivity, IconChartBar, IconChevronDown, IconChevronRight, IconExternalLink, IconHeadset, IconPlus, IconSettings } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart/chart";

type MetricKey = "calls" | "duration" | "cost" | "callCost" | "llmCost" | "llmAvg";
type CallMetric = { key: MetricKey; label: string; value: string; unit?: string };
type Agent = { name: string; count: number; tone: string };
const metrics: CallMetric[] = [
  { key: "calls", label: "Calls", value: "482,032" },
  { key: "duration", label: "Avg. duration", value: "2:55" },
  { key: "cost", label: "Total cost", value: "207,732", unit: "credits" },
  { key: "callCost", label: "Avg. cost per call", value: "0.43", unit: "credits" },
  { key: "llmCost", label: "Total LLM cost", value: "$46,342" },
  { key: "llmAvg", label: "Avg. LLM cost", value: "$0.096" },
];
const agentRows: Agent[] = [
  { name: "Docs Support Agent", count: 190241, tone: "primary" },
  { name: "Website Agent", count: 114921, tone: "info" },
  { name: "Billing Triage Agent", count: 53908, tone: "warning" },
  { name: "Acme Co.", count: 34656, tone: "success" },
  { name: "Store Assistant", count: 32024, tone: "destructive" },
  { name: "Returns Concierge Agent", count: 26691, tone: "primary" },
];
const integrationRows = [
  { id: "model", name: "Model provider", icon: "model" },
  { id: "chat", name: "Team messaging", icon: "chat" },
  { id: "voice", name: "Voice gateway", icon: "phone" },
  { id: "meet", name: "Video meetings", icon: "meet" },
  { id: "coaching", name: "Call coaching", icon: "video" },
];
const dateLabels = Array.from({ length: 28 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 7, 18 + index));
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date);
});
const baseline = [81036, 78610, 76200, 52300, 43457, 58000, 81036, 78520, 75930, 71800, 68320, 65100, 62100, 59200, 55540, 57300, 60850, 64000, 69000, 74300, 78300, 81100, 76200, 73100, 70120, 66400, 60210, 52300];
const chartConfig: ChartConfig = { calls: { label: "Calls", color: "var(--primary)" } };
const number = (value: number) => new Intl.NumberFormat("en-US").format(value);

export function VoiceAnalyticsDashboard() {
  const [metric, setMetric] = useState<MetricKey>("calls");
  const [period, setPeriod] = useState("Last 7 days");
  const [granularity, setGranularity] = useState("Daily");
  const [agent, setAgent] = useState("All agents");
  const [agentMetric, setAgentMetric] = useState("Calls");
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({ model: true, chat: true, voice: true, meet: false, coaching: false });
  const [filterAdded, setFilterAdded] = useState(false);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2200); };

  const chartData = useMemo(() => {
    const days = period === "Last 7 days" ? dateLabels.slice(0, 7) : dateLabels;
    const values = period === "Last 7 days" ? baseline.slice(0, 7) : baseline;
    const agentOffset = agent === "All agents" ? 1 : agent === "Docs Support Agent" ? 0.43 : agent === "Website Agent" ? 0.26 : 0.13;
    const metricOffset = metric === "calls" ? 1 : metric === "duration" ? 0.42 : metric === "cost" ? 0.67 : metric === "callCost" ? 0.18 : metric === "llmCost" ? 0.33 : 0.12;
    const daily = days.map((label, index) => ({ label, calls: Math.round(values[index] * agentOffset * metricOffset) }));
    if (granularity === "Hourly") {
      const day = daily[daily.length - 1];
      return ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"].map((label, index) => ({ label, calls: Math.round(day.calls * [0.09, 0.15, 0.28, 0.24, 0.15, 0.09][index]) }));
    }
    if (granularity === "Weekly") {
      return Array.from({ length: Math.ceil(daily.length / 7) }, (_, index) => ({ label: daily[index * 7].label, calls: daily.slice(index * 7, index * 7 + 7).reduce((sum, row) => sum + row.calls, 0) }));
    }
    return daily;
  }, [agent, granularity, metric, period]);

  const rankings = agentRows.map((row, index) => ({ ...row, count: agentMetric === "Calls" ? row.count : Math.round(row.count * [0.42, 0.31, 0.52, 0.26, 0.37, 0.45][index]) }));
  const peak = Math.max(...chartData.map((row) => row.calls));
  const floor = Math.min(...chartData.map((row) => row.calls));

  return <main aria-label="Voice call analytics" className="mx-auto w-full min-w-0 max-w-[1216px] pt-6 text-foreground">
    <header className="space-y-3">
      <div className="flex items-center gap-2"><h2 className="text-xl font-semibold tracking-tight">Overview</h2><span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><IconHeadset className="size-3.5 text-primary" />Active Calls <strong className="font-semibold tabular-nums text-foreground">294</strong></span></div>
      <div className="flex flex-wrap items-center gap-2">
        <SelectControl ariaLabel="Date range" value={period} options={["Last 7 days", "Last 30 days"]} onChange={setPeriod} />
        <SelectControl ariaLabel="Chart interval" value={granularity} options={["Hourly", "Daily", "Weekly"]} onChange={setGranularity} />
        <SelectControl ariaLabel="Agents" value={agent} options={["All agents", ...agentRows.map((row) => row.name)]} onChange={setAgent} />
        <Button variant="outline" size="sm" onClick={() => setFilterAdded((current) => !current)}><IconPlus />Add Filter</Button>
        <div className="flex-1" />
        <Button size="sm" onClick={() => notify("Report added")}><IconPlus />Add</Button>
        <Button variant="outline" size="sm" onClick={() => notify("Call analytics settings opened")}><IconSettings />Configure</Button>
      </div>
    </header>
    {filterAdded && <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/20 p-2 text-xs"><Badge variant="outline">Agent</Badge><SelectControl ariaLabel="Filter by agent" value={agent} options={["All agents", ...agentRows.map((row) => row.name)]} onChange={setAgent} /><Button variant="ghost" size="xs" onClick={() => setFilterAdded(false)}>Clear filter</Button></div>}

    <section aria-label="Call analytics metrics" className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border bg-card sm:grid-cols-3 xl:grid-cols-6">
      {metrics.map((item) => <button key={item.key} type="button" aria-pressed={metric === item.key} onClick={() => setMetric(item.key)} className={`group relative flex min-h-[76px] flex-col justify-center gap-1 border-b px-4 py-2 text-left transition-colors hover:bg-muted/40 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:border-b-0 xl:border-r last:border-r-0 ${metric === item.key ? "bg-muted/30" : "bg-transparent"}`}><span className={`text-xs transition-colors ${metric === item.key ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{item.label}</span><span className="text-sm font-semibold tabular-nums">{item.value}{item.unit && <span className="ml-1 font-normal text-muted-foreground">{item.unit}</span>}</span>{metric === item.key && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary" />}</button>)}
    </section>

    <section aria-label="Call volume trend" className="relative mt-4 min-h-[516px] rounded-xl border bg-card px-4 pt-3 pb-2 sm:px-5">
      <div className="flex h-8 items-center justify-end gap-2 text-xs text-muted-foreground">Min <strong className="font-semibold tabular-nums text-foreground">{number(floor)}</strong><span className="text-border">•</span>Max <strong className="font-semibold tabular-nums text-foreground">{number(peak)}</strong></div>
      <ChartContainer config={chartConfig} className="h-[436px] w-full aspect-auto" aria-label={`${metrics.find((item) => item.key === metric)?.label} over time`}>
        <ComposedChart data={chartData} margin={{ top: 8, right: 18, left: 18, bottom: 18 }}>
          <defs><linearGradient id="call-area-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-calls)" stopOpacity={0.12} /><stop offset="95%" stopColor="var(--color-calls)" stopOpacity={0.01} /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 4" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} interval={0} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
          <YAxis hide domain={([dataMin, dataMax]) => [Math.floor(Number(dataMin) * 0.92), Math.ceil(Number(dataMax) * 1.12)]} />
          <Tooltip cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }} contentStyle={{ borderRadius: 10, borderColor: "var(--border)", background: "var(--popover)", color: "var(--popover-foreground)", fontSize: 12 }} formatter={(value) => [number(Number(value)), metrics.find((item) => item.key === metric)?.label]} />
          <Area dataKey="calls" type="monotone" stroke="none" fill="url(#call-area-fill)" isAnimationActive={false} />
          <Line dataKey="calls" type="monotone" stroke="var(--color-calls)" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: "var(--color-calls)" }} isAnimationActive={false} />
        </ComposedChart>
      </ChartContainer>
      <Button variant="outline" size="sm" className="absolute bottom-3 right-4 bg-card" onClick={() => notify("Full call report opened")}>View more<IconChevronRight /></Button>
    </section>

    <section className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
      <section aria-label="Most called agents" className="min-w-0 rounded-xl border bg-card">
        <header className="flex items-center justify-between gap-2 px-4 py-3"><h3 className="text-sm font-semibold">Most Called Agents</h3><SelectControl ariaLabel="Agent ranking metric" value={agentMetric} options={["Calls", "Minutes"]} onChange={setAgentMetric} /></header>
        <div className="space-y-3 px-4 pb-4">{rankings.map((row) => <div key={row.name} className="grid min-w-0 grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3"><div className="relative h-8 min-w-0 overflow-hidden rounded-full bg-muted"><div aria-hidden="true" className={`absolute inset-y-0 left-0 rounded-full opacity-20 ${toneClass(row.tone)}`} style={{ width: `${row.count / Math.max(...rankings.map((agent) => agent.count)) * 100}%` }} /><span className="relative z-10 flex h-full min-w-0 items-center gap-2 px-3 text-xs font-medium"><span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${toneClass(row.tone)}`} /><span className="truncate">{row.name}</span></span></div><span className={`justify-self-end text-right text-xs font-semibold tabular-nums ${textToneClass(row.tone)}`}>{number(row.count)}</span></div>)}</div>
      </section>

      <section aria-label="Integrations" className="min-w-0 rounded-xl border bg-card">
        <header className="flex items-center justify-between gap-2 px-4 py-3"><h3 className="text-sm font-semibold">Integrations</h3><Button variant="outline" size="sm" onClick={() => notify("Integration settings opened")}>Manage<IconExternalLink /></Button></header>
        <div className="divide-y px-4">{integrationRows.map((item) => <div key={item.id} className="flex min-h-[58px] items-center gap-3 py-2"><div className="grid size-9 shrink-0 place-items-center rounded-lg border bg-background">{item.icon === "chat" ? <IconActivity className="size-4 text-warning" /> : item.icon === "model" ? <IconChartBar className="size-4" /> : item.icon === "phone" ? <IconHeadset className="size-4" /> : item.icon === "meet" ? <IconChartBar className="size-4 text-primary" /> : <IconActivity className="size-4 text-info" />}</div><p className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</p>{integrations[item.id] && <Badge variant="outline" size="sm" className="border-success/30 bg-success/10 text-success">Live</Badge>}<Button variant="outline" size="xs" onClick={() => setIntegrations((current) => ({ ...current, [item.id]: !current[item.id] }))}>{integrations[item.id] ? "Disconnect" : "Connect"}</Button></div>)}</div>
      </section>
    </section>
    {notice && <div role="status" className="fixed bottom-4 right-4 z-50 rounded-lg border bg-popover px-4 py-2 text-sm shadow-lg">{notice}</div>}
  </main>;
}

function SelectControl({ ariaLabel, value, options, onChange }: { ariaLabel: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="relative inline-flex min-w-32 items-center"><select aria-label={ariaLabel} value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-full appearance-none rounded-lg border border-input bg-background py-1 pl-2.5 pr-8 text-xs text-foreground shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring">{options.map((option) => <option key={option}>{option}</option>)}</select><IconChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 size-3.5 text-muted-foreground" /></label>;
}

function toneClass(tone: string) { return tone === "primary" ? "bg-primary" : tone === "info" ? "bg-info" : tone === "warning" ? "bg-warning" : tone === "success" ? "bg-success" : "bg-destructive"; }
function textToneClass(tone: string) { return tone === "primary" ? "text-primary" : tone === "info" ? "text-info" : tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "text-destructive"; }
