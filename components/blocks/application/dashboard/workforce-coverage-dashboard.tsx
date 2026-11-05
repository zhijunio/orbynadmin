"use client";

import { useMemo, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import { IconCalendarClock, IconChevronDown, IconChevronRight, IconDots, IconDownload, IconLink, IconMail, IconMapPin, IconRefresh, IconShieldCheck, IconUsers, IconWaveSine } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Crew = { id: string; name: string; role: string; district: string; initials: string; coverage: number; note: string; relief: string; handoffs: number; status: "Stable" | "Watch" | "Critical" | "Pending" };
const crew: Crew[] = [
  { id: "ms", name: "Mira Stone", role: "Floor lead", district: "Harbor", initials: "MS", coverage: 94, note: "Adds two closers", relief: "6h", handoffs: 2, status: "Stable" },
  { id: "aj", name: "Alex Johnson", role: "Stock lead", district: "Harbor", initials: "AJ", coverage: 91, note: "Backfill locked", relief: "7h", handoffs: 1, status: "Stable" },
  { id: "lg", name: "Leo Grant", role: "Dispatch owner", district: "Airport", initials: "LG", coverage: 81, note: "Driver window tight", relief: "3h", handoffs: 5, status: "Watch" },
  { id: "tp", name: "Theo Park", role: "Ramp lead", district: "Airport", initials: "TP", coverage: 89, note: "Training overlap", relief: "5h", handoffs: 3, status: "Stable" },
  { id: "nv", name: "Nora Vale", role: "Inventory coach", district: "Uptown", initials: "NV", coverage: 72, note: "Cycle count open", relief: "2h", handoffs: 6, status: "Critical" },
  { id: "sq", name: "Sana Qureshi", role: "Route floater", district: "Uptown", initials: "SQ", coverage: 78, note: "Awaiting confirm", relief: "4h", handoffs: 4, status: "Pending" },
];
const actions = [
  { id: "swap", title: "3 swap approvals", detail: "before 2 PM", button: "Approve", icon: "swap", tone: "warning" },
  { id: "invites", title: "6 standby invites", detail: "Harbor route", button: "Invite", icon: "invite", tone: "info" },
  { id: "lead", title: "1 lead missing", detail: "Uptown close", button: "Assign", icon: "assign", tone: "destructive" },
  { id: "sync", title: "Timecard sync", detail: "before payroll run", button: "Sync", icon: "sync", tone: "success" },
  { id: "gaps", title: "2 route gaps", detail: "Airport noon", button: "Fill", icon: "fill", tone: "warning" },
  { id: "audit", title: "Break audit", detail: "two sites", button: "Check", icon: "audit", tone: "success" },
] as const;
const raw = [130,145,125,158,171,145,118,145,157,142,125,139,150,138,115,135,168,150,132,119,112];
const rawTotal = raw.reduce((sum, value) => sum + value, 0);
const forecasts = raw.map((value) => Math.round(value * 3043 / rawTotal));
forecasts[forecasts.length - 1] += 3043 - forecasts.reduce((sum, value) => sum + value, 0);
const demand = forecasts.map((forecast, index) => {
  const date = new Date(Date.UTC(2026, 5, 22 + index));
  const supply = forecast + (index === 20 ? 13 : 12);
  const standby = Math.round(supply * (index % 4 === 1 ? 0.27 : 0.22));
  return { date, day: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date), forecast, scheduled: supply - standby, standby };
});
const dateRanges = ["Jun 22 - Jul 12, 2026", "Jun 29 - Jul 12, 2026", "Jul 06 - Jul 12, 2026"];
const chartConfig: ChartConfig = { scheduled: { label: "Scheduled", color: "var(--info)" }, standby: { label: "Standby", color: "var(--primary)" }, forecast: { label: "Forecast", color: "var(--destructive)" } };

export function WorkforceCoverageDashboard() {
  const [range, setRange] = useState(dateRanges[0]);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [undoIds, setUndoIds] = useState<string[] | null>(null);
  const [notice, setNotice] = useState("");
  const chartData = useMemo(() => demand.slice(range.startsWith("Jun 29") ? 7 : range.startsWith("Jul 06") ? 14 : 0), [range]);
  const noticeFor = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };
  const resolve = (id: string) => { setUndoIds(doneIds); setDoneIds((current) => current.includes(id) ? current : [...current, id]); noticeFor("Action resolved · Undo"); };
  const resolveAll = () => { setUndoIds(doneIds); setDoneIds(actions.map((action) => action.id)); setMenuOpen(false); noticeFor("All actions resolved · Undo"); };
  const reopenAll = () => { setUndoIds(doneIds); setDoneIds([]); setMenuOpen(false); noticeFor("All actions reopened"); };
  const undo = () => { if (undoIds) setDoneIds(undoIds); setUndoIds(null); setNotice(""); };

  return <main aria-label="Workforce coverage" className="mx-auto w-full min-w-0 max-w-[1216px] space-y-3 text-foreground">
    <header className="flex min-h-10 flex-wrap items-center justify-between gap-3"><nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground"><span>Home</span><IconChevronRight className="size-3.5" /><span>Workforce</span><IconChevronRight className="size-3.5" /><span className="text-foreground">Coverage</span></nav><div className="flex items-center gap-2"><div className="relative"><Button variant="outline" size="sm" className="min-w-[240px] justify-between font-normal" aria-expanded={rangeOpen} onClick={() => setRangeOpen((open) => !open)}><span>{range}</span><IconChevronDown className="size-4 text-muted-foreground" /></Button>{rangeOpen && <div role="listbox" aria-label="Demand date range" className="absolute right-0 top-full z-30 mt-1 w-full rounded-lg border bg-popover p-1 shadow-md">{dateRanges.map((item) => <button key={item} role="option" aria-selected={range === item} className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted" onClick={() => { setRange(item); setRangeOpen(false); }}>{item}</button>)}</div>}</div><Button size="sm" onClick={() => noticeFor("Workforce report exported")}><IconDownload />Export</Button></div></header>

    <section aria-label="Coverage metrics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <Metric icon={<IconCalendarClock />} label="Open Gaps" value="11" detail="before kickoff" change="↘ -4%" tone="warning" />
      <Metric icon={<IconUsers />} label="Standby Pool" value="24" detail="ready workers" change="↗ +7" tone="success" />
      <Metric icon={<IconShieldCheck />} label="Swap Risk" value="8%" detail="open requests" change="↘ -2%" tone="destructive" />
      <Metric icon={<IconWaveSine />} label="Check Score" value="4.8" detail="site average" change="↗ +0.3" tone="info" />
      <Metric icon={<IconUsers />} label="Crew Tenure" value="146d" detail="rolling median" change="↗ +6d" tone="secondary" />
    </section>

    <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[2fr_0.98fr]">
      <article aria-label="Coverage review" className="min-w-0 overflow-hidden rounded-xl border bg-card"><header className="flex items-center justify-between gap-2 bg-muted/25 px-4 py-3"><div><h2 className="text-sm font-semibold">Coverage Review</h2><p className="text-sm text-muted-foreground">Crew health by district</p></div><Badge variant="outline" size="sm">6 crews</Badge></header><div className="overflow-x-auto"><Table className="min-w-[760px]"><TableHeader><TableRow><TableHead>Crew Lead</TableHead><TableHead>District</TableHead><TableHead>Coverage</TableHead><TableHead>Relief</TableHead><TableHead>Handoffs</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{crew.map((person) => <TableRow key={person.id} className="h-[52px]"><TableCell><div className="flex items-center gap-2.5"><Avatar className="size-8"><AvatarImage src={demoAvatarUrl(person.id)} alt="" /><AvatarFallback className="text-[10px]">{person.initials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-sm font-medium">{person.name}</p><p className="truncate text-xs text-muted-foreground">{person.role}</p></div></div></TableCell><TableCell>{person.district}</TableCell><TableCell><div className="min-w-[188px]"><div className="mb-1 flex items-center justify-between gap-2"><span className="text-sm font-medium tabular-nums">{person.coverage}%</span><span className="truncate text-xs text-muted-foreground">{person.note}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${coverageTone(person.status)}`} style={{ width: `${person.coverage}%` }} /></div></div></TableCell><TableCell className="tabular-nums">{person.relief}</TableCell><TableCell className="tabular-nums">{person.handoffs}</TableCell><TableCell><CrewStatus status={person.status} /></TableCell></TableRow>)}</TableBody></Table></div></article>

      <article aria-label="Action queue" className="min-w-0 rounded-xl border bg-card"><header className="flex items-start justify-between gap-2 px-4 py-3"><div><h2 className="text-sm font-semibold">Action Queue</h2><p className="text-sm text-muted-foreground">{actions.length - doneIds.length} open before cutoff</p></div><div className="relative"><Button variant="ghost" size="icon-sm" aria-label="Queue actions" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><IconDots /></Button>{menuOpen && <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border bg-popover p-1 shadow-md"><button className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted" onClick={resolveAll}>Resolve all</button><button className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted" onClick={reopenAll}>Reopen all</button></div>}</div></header><div className="divide-y px-3">{actions.map((action) => { const done = doneIds.includes(action.id); return <div key={action.id} className={`flex min-h-[64px] items-center gap-3 px-1 py-2 ${done ? "opacity-55" : ""}`}><span className={`grid size-10 shrink-0 place-items-center rounded-xl border bg-background ${toneText(action.tone)}`}><ActionIcon name={action.icon} /></span><div className="min-w-0 flex-1"><p className={`truncate text-sm font-medium ${done ? "line-through" : ""}`}>{action.title}</p><p className="truncate text-xs text-muted-foreground">{action.detail}</p></div><Button variant="outline" size="xs" onClick={() => done ? undo() : resolve(action.id)}>{done ? "Undo" : action.button}</Button></div>; })}</div></article>
    </section>

    <section aria-label="Demand mix" className="min-w-0 space-y-2"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-sm font-semibold">Demand Mix</h2><p className="text-sm text-muted-foreground">Supply against forecast, {range.replace(", 2026", "")}</p></div><div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><DemandSummary label="Supply" value="3,296" note="108.3%" tone="info" /><DemandSummary label="Forecast" value="3,043" note="Avg 145" tone="warning" /><DemandSummary label="Gap" value="+253" note="+8.3%" tone="success" /></div></div><div className="rounded-xl border bg-card px-4 py-3"><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-info" /><i className="-ml-2 size-2.5 rounded-sm bg-primary" />Supply <span>Scheduled + standby</span></span><span className="inline-flex items-center gap-1.5"><i className="h-0.5 w-4 bg-destructive" />Forecast</span></div><Badge variant="outline" size="sm">{chartData.length} day view</Badge></div><ChartContainer config={chartConfig} className="mt-2 h-[300px] w-full aspect-auto" aria-label="Scheduled supply, standby, and forecast over selected dates"><ComposedChart data={chartData} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}><defs><pattern id="crew-scheduled-pattern" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-scheduled)" strokeOpacity="0.45" strokeWidth="2" /></pattern><pattern id="crew-standby-pattern" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-standby)" strokeOpacity="0.45" strokeWidth="2" /></pattern></defs><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 4" /><XAxis dataKey="day" axisLine={false} tickLine={false} interval={Math.max(1, Math.floor(chartData.length / 6))} tickMargin={10} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} /><YAxis hide /><Tooltip labelFormatter={(_, payload) => payload?.[0]?.payload?.day} contentStyle={{ borderRadius: 8, borderColor: "var(--border)", background: "var(--popover)", color: "var(--popover-foreground)", fontSize: 12 }} /><Bar dataKey="scheduled" stackId="supply" fill="url(#crew-scheduled-pattern)" stroke="var(--color-scheduled)" strokeWidth={0.5} barSize={24} isAnimationActive={false} /><Bar dataKey="standby" stackId="supply" fill="url(#crew-standby-pattern)" stroke="var(--color-standby)" strokeWidth={0.5} radius={[3, 3, 0, 0]} barSize={24} isAnimationActive={false} /><Line dataKey="forecast" type="monotone" stroke="var(--color-forecast)" strokeWidth={2} dot={{ r: 2, fill: "var(--color-forecast)" }} activeDot={{ r: 4 }} isAnimationActive={false} /></ComposedChart></ChartContainer></div></section>
    {notice && <div role="status" className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border bg-popover px-4 py-2 text-sm shadow-lg">{notice}{undoIds && <button className="font-medium text-primary" onClick={undo}>Undo</button>}</div>}
  </main>;
}

function Metric({ icon, label, value, detail, change, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; change: string; tone: string }) { return <article className="flex min-h-[120px] items-center gap-3 rounded-lg border bg-card px-3 py-3"><span className={`grid size-9 shrink-0 place-items-center rounded-xl border bg-background ${toneText(tone)}`}>{icon}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{label}</p><div className="mt-1.5 flex items-baseline gap-2"><strong className="text-2xl font-semibold leading-none tabular-nums">{value}</strong><span className="truncate text-xs text-muted-foreground">{detail}</span></div></div><Badge variant={tone === "warning" ? "warning" : tone === "success" ? "success" : tone === "destructive" ? "destructive" : tone === "info" ? "info" : "secondary"} size="sm">{change}</Badge></article>; }
function DemandSummary({ label, value, note, tone }: { label: string; value: string; note: string; tone: string }) { return <div className="flex min-w-40 items-center gap-2 border-l pl-3"><span className={`size-2.5 rounded-full ${toneBg(tone)}`} /><span className="text-xs text-muted-foreground">{label}</span><span className="ml-auto text-sm font-semibold tabular-nums">{value}</span><Badge variant={tone === "info" ? "info" : tone === "warning" ? "warning" : "success"} size="sm">{note}</Badge></div>; }
function CrewStatus({ status }: { status: Crew["status"] }) { const variant = status === "Stable" ? "success" : status === "Watch" ? "warning" : status === "Critical" ? "destructive" : "secondary"; return <Badge variant={variant} size="sm">{status}</Badge>; }
function ActionIcon({ name }: { name: (typeof actions)[number]["icon"] }) { const className = "size-4"; if (name === "swap") return <IconRefresh className={className} />; if (name === "invite") return <IconMail className={className} />; if (name === "assign") return <IconMapPin className={className} />; if (name === "sync") return <IconLink className={className} />; if (name === "fill") return <IconCalendarClock className={className} />; return <IconShieldCheck className={className} />; }
function coverageTone(status: Crew["status"]) { return status === "Critical" ? "bg-destructive" : status === "Watch" ? "bg-warning" : status === "Pending" ? "bg-info" : "bg-success"; }
function toneText(tone: string) { return tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : tone === "info" ? "text-info" : "text-muted-foreground"; }
function toneBg(tone: string) { return tone === "warning" ? "bg-warning" : tone === "success" ? "bg-success" : tone === "destructive" ? "bg-destructive" : tone === "info" ? "bg-info" : "bg-primary"; }
