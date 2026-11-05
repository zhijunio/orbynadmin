"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { IconChevronRight, IconCloudDownload, IconChevronDown } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart/chart";

const metrics = [
  { title: "Signal Risk", label: "Threat Index", value: "Elevated", change: "+12.5%", detail: "5 cases", color: "destructive", points: [8, 15, 10, 24, 18, 27, 20, 30, 23, 14] },
  { title: "Mesh Uptime", label: "Service Health", value: "99.98%", change: "+0.2%", detail: "58 zones", color: "success", points: [28, 18, 24, 13, 19, 23, 17, 10] },
  { title: "Edge Traffic", label: "Scrubbed Load", value: "4.8 GB/s", change: "-3.1%", detail: "clean flow", color: "warning", points: [28, 16, 21, 9, 14, 5, 10, 7] },
  { title: "Sensor Reach", label: "Global Nodes", value: "18,420", change: "+6.8%", detail: "93 regions", color: "success", points: [24, 15, 21, 7, 19, 4, 12, 7] },
];

const threatVectors = [
  { name: "Bot", blocked: 42, watched: 69 }, { name: "Phish", blocked: 38, watched: 82 },
  { name: "DDoS", blocked: 61, watched: 41 }, { name: "Inject", blocked: 25, watched: 56 },
  { name: "Auth", blocked: 51, watched: 75 }, { name: "Probe", blocked: 20, watched: 54 },
  { name: "Exfil", blocked: 60, watched: 43 }, { name: "Beacon", blocked: 42, watched: 70 },
  { name: "Day0", blocked: 16, watched: 35 },
];

const nodeLoads = Array.from({ length: 52 }, (_, index) => {
  const load = [42, 39, 18, 15, 31, 38, 23, 14, 21, 26, 36, 17, 10, 29, 24, 34, 30, 37, 40, 42, 35, 24, 20, 77, 90, 86, 37, 69, 61, 52, 41, 28, 19, 12, 30, 40, 22, 16, 35, 24, 22, 32, 36, 18, 15, 20, 28, 37, 31, 36, 40, 39][index];
  return { id: `N${String(index).padStart(2, "0")}`, load };
});

const activeLanes = [
  { name: "[00] API Flood", source: "Edge WAF", status: "Mitigating", events: "4,521", progress: 92, color: "destructive" },
  { name: "[01] Mail Spoof", source: "Mail Relay", status: "Reviewing", events: "3,102", progress: 64, color: "warning" },
  { name: "[02] Cloud Probe", source: "Cloud API", status: "Queued", events: "1,250", progress: 26, color: "primary" },
  { name: "[03] Mesh Beacon", source: "Int Node", status: "Watching", events: "420", progress: 9, color: "success" },
];

const flowData = Array.from({ length: 26 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 4, 16 + index));
  const label = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date);
  const inbound = [68, 86, 82, 90, 50, 63, 69, 65, 58, 38, 57, 62, 73, 68, 70, 55, 43, 60, 68, 57, 72, 40, 63, 56, 80, 69][index];
  const outbound = [38, 44, 40, 43, 27, 36, 38, 40, 37, 30, 33, 37, 41, 39, 40, 34, 28, 35, 39, 36, 42, 27, 37, 34, 48, 40][index];
  return { date, label, inbound, outbound };
});
const flowConfig: ChartConfig = { inbound: { label: "Blocked", color: "var(--warning)" }, outbound: { label: "Allowed", color: "var(--success)" } };
const rangeOptions = ["May 12, 2026 - Jun 10, 2026", "May 27, 2026 - Jun 10, 2026", "Jun 03, 2026 - Jun 10, 2026"];

export function EdgeSecurityDashboard() {
  const [range, setRange] = useState(rangeOptions[0]);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const chartData = useMemo(() => {
    const start = range.startsWith("May 27") ? new Date(Date.UTC(2026, 4, 27)) : range.startsWith("Jun 03") ? new Date(Date.UTC(2026, 5, 3)) : new Date(Date.UTC(2026, 4, 12));
    return flowData.filter((row) => row.date >= start);
  }, [range]);
  const notify = () => { setNotice("Security report exported"); window.setTimeout(() => setNotice(""), 2200); };

  return <main aria-label="Edge security telemetry" className="mx-auto w-full min-w-0 max-w-[1216px] space-y-3 pt-5 text-foreground">
    <header className="flex min-h-10 flex-wrap items-center justify-between gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground"><span>Home</span><IconChevronRight className="size-3.5" /><span>Security</span><IconChevronRight className="size-3.5" /><span className="text-foreground">Telemetry</span></nav>
      <div className="flex flex-wrap items-center gap-2"><div className="relative"><Button variant="outline" size="sm" className="min-w-[250px] justify-between font-normal" aria-expanded={rangeOpen} onClick={() => setRangeOpen((open) => !open)}><span>{range}</span><IconChevronDown className="size-4 text-muted-foreground" /></Button>{rangeOpen && <div role="listbox" aria-label="Report date range" className="absolute right-0 top-full z-30 mt-1 w-full rounded-lg border bg-popover p-1 shadow-md">{rangeOptions.map((option) => <button key={option} role="option" aria-selected={range === option} className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted" onClick={() => { setRange(option); setRangeOpen(false); }}>{option}</button>)}</div>}</div><Button size="sm" onClick={notify}><IconCloudDownload />Export</Button></div>
    </header>

    <section aria-label="Security metrics" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {metrics.map((item) => <article key={item.title} className="relative flex h-[142px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border bg-card p-4"><div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(color-mix(in_oklch,var(--foreground)_12%,transparent)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" /><div className="relative flex items-start justify-between gap-2"><div><h2 className="text-sm font-semibold">{item.title}</h2><p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p></div><span aria-hidden="true" className="text-xs text-muted-foreground">⌜</span></div><div className="relative flex items-end justify-between gap-3"><div><div className="text-2xl font-semibold leading-none tracking-tight">{item.value}</div><div className="mt-2 flex items-center gap-2"><Badge variant={item.color === "destructive" ? "destructive" : item.color === "success" ? "success" : item.color === "warning" ? "warning" : "secondary"} size="sm">{item.change}</Badge><span className="text-xs text-muted-foreground">{item.detail}</span></div></div><Sparkline points={item.points} color={item.color} /></div></article>)}
    </section>

    <section className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
      <article aria-label="Threat vectors" className="h-[311px] min-w-0 rounded-xl border bg-card"><header className="flex items-center justify-between gap-3 px-4 py-3"><div><h3 className="text-sm font-semibold">Threat Vectors</h3><p className="text-xs text-muted-foreground">Blocked Signals</p></div><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-primary" />Blocked</span><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-info" />Watched</span></div></header><ThreatVectorChart /></article>
      <article aria-label="Network flow" className="h-[311px] min-w-0 rounded-xl border bg-card px-4 pt-3 pb-2"><header className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold">Network Flow</h3><p className="text-xs text-muted-foreground">Daily API and webhooks</p></div><Badge variant="success" size="sm">+5.3%</Badge></header><ChartContainer config={flowConfig} className="mt-2 h-[250px] w-full aspect-auto" aria-label="Blocked and allowed network traffic"><AreaChart data={chartData} margin={{ top: 16, right: 0, left: -18, bottom: 0 }}><defs><pattern id="flow-inbound-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-inbound)" strokeOpacity="0.28" strokeWidth="1" /></pattern><pattern id="flow-outbound-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-outbound)" strokeOpacity="0.28" strokeWidth="1" /></pattern></defs><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 4" /><XAxis dataKey="label" axisLine={false} tickLine={false} interval={Math.max(0, Math.floor(chartData.length / 9))} tickMargin={8} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} /><YAxis hide domain={[0, 100]} /><Tooltip labelFormatter={(_, payload) => payload?.[0]?.payload?.label} contentStyle={{ borderRadius: 8, borderColor: "var(--border)", background: "var(--popover)", color: "var(--popover-foreground)", fontSize: 12 }} /><Area dataKey="inbound" type="monotone" stroke="var(--color-inbound)" strokeWidth={1.5} fill="url(#flow-inbound-pattern)" isAnimationActive={false} /><Area dataKey="outbound" type="monotone" stroke="var(--color-outbound)" strokeWidth={1.5} fill="url(#flow-outbound-pattern)" isAnimationActive={false} /></AreaChart></ChartContainer></article>
    </section>

    <section className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
      <article aria-label="Cluster load" className="h-[376px] min-w-0 rounded-xl border bg-card"><header className="flex flex-wrap items-start justify-between gap-3 px-4 py-3"><div><h3 className="text-sm font-semibold">Cluster Load</h3><div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-muted-foreground/40" />Normal</span><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-warning" />Warm</span><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-destructive" />Critical</span></div></div><div className="flex items-center gap-2"><Badge variant="secondary">52 Nodes</Badge><Badge variant="warning">2 Warm</Badge><Badge variant="destructive">2 Critical</Badge></div></header><ClusterLoadChart /></article>
      <article aria-label="Active lanes" className="h-[376px] min-w-0 rounded-xl border bg-card"><header className="px-4 py-3"><h3 className="text-sm font-semibold">Active Lanes</h3><p className="text-xs text-muted-foreground">Threat Queue</p></header><div className="divide-y px-4">{activeLanes.map((lane) => <div key={lane.name} className="space-y-1.5 py-2"><div className="flex items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2"><span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${tone(lane.color)}`} /><span className="truncate text-sm font-medium">{lane.name}</span></div><span className="text-sm font-semibold tabular-nums">{lane.events}</span></div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span>{lane.source}</span><span aria-hidden="true">•</span><span>{lane.status}</span></div><div className="flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${tone(lane.color)}`} style={{ width: `${lane.progress}%` }} /></div><span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">{lane.progress}%</span></div></div>)}</div></article>
    </section>
    {notice && <div role="status" className="fixed bottom-4 right-4 z-50 rounded-lg border bg-popover px-4 py-2 text-sm shadow-lg">{notice}</div>}
  </main>;
}

function Sparkline({ points, color }: { points: number[]; color: string }) { const coords = points.map((value, index) => `${(index / (points.length - 1)) * 100},${Math.max(2, 30 - value)}`).join(" "); const colorClass = color === "destructive" ? "text-destructive" : color === "success" ? "text-success" : "text-warning"; return <svg aria-hidden="true" viewBox="0 0 100 32" preserveAspectRatio="none" className={`h-8 w-20 shrink-0 ${colorClass}`}><polyline points={coords} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function ThreatVectorChart() { return <div className="relative mx-4 mb-3 h-[225px] border-b"><svg aria-hidden="true" className="absolute size-0"><defs><pattern id="blocked-stripe-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--primary)" strokeWidth="2" /></pattern></defs></svg><div aria-hidden="true" className="absolute inset-x-0 top-0 h-[190px] bg-[linear-gradient(to_bottom,transparent_calc(25%-1px),var(--border)_25%,transparent_calc(25%+1px),transparent_calc(50%-1px),var(--border)_50%,transparent_calc(50%+1px),transparent_calc(75%-1px),var(--border)_75%,transparent_calc(75%+1px))] opacity-60" /><div className="relative flex h-[190px] items-end justify-between gap-2">{threatVectors.map((item) => <div key={item.name} className="flex h-full min-w-0 flex-1 items-end justify-center gap-1"><div aria-label={`${item.name} blocked`} role="img" className="w-[min(24px,40%)] rounded-t-md border border-primary/80 bg-primary/10" style={{ height: `${item.blocked}%`, backgroundImage: "repeating-linear-gradient(135deg, color-mix(in srgb, var(--primary) 75%, transparent) 0px, color-mix(in srgb, var(--primary) 75%, transparent) 1px, transparent 1px, transparent 4px)" }} /><div aria-label={`${item.name} watched`} role="img" className="w-[min(24px,40%)] rounded-t-md bg-info/70" style={{ height: `${item.watched}%` }} /></div>)}</div><div className="absolute inset-x-0 bottom-0 flex h-8 justify-between gap-2 text-[10px] text-muted-foreground">{threatVectors.map((item) => <span key={item.name} className="min-w-0 flex-1 truncate text-center">{item.name}</span>)}</div></div>; }

function ClusterLoadChart() { return <div className="relative mx-4 mt-1 h-[245px] border-b"><div aria-hidden="true" className="absolute inset-x-0 top-0 h-[180px] bg-[linear-gradient(to_bottom,transparent_calc(25%-1px),var(--border)_25%,transparent_calc(25%+1px),transparent_calc(50%-1px),var(--border)_50%,transparent_calc(50%+1px),transparent_calc(75%-1px),var(--border)_75%,transparent_calc(75%+1px))] opacity-60" /><div className="relative flex h-[180px] items-end justify-between gap-[3px]">{nodeLoads.map((node) => <div key={node.id} role="img" aria-label={`${node.id}: ${node.load}% load`} className={`min-w-0 flex-1 rounded-t-md ${node.load >= 86 ? "bg-destructive" : node.load >= 76 ? "bg-warning" : "bg-muted-foreground/25"}`} style={{ height: `${Math.max(5, node.load)}%` }} />)}</div><div className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-between text-[10px] text-muted-foreground"><span>N00</span><span>N26</span><span>N52</span></div></div>; }

function tone(color: string) { return color === "destructive" ? "bg-destructive" : color === "warning" ? "bg-warning" : color === "success" ? "bg-success" : "bg-primary"; }
