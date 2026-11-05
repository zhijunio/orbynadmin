"use client";

import { useState } from "react";
import { IconAdjustments, IconBell, IconChevronLeft, IconChevronRight, IconChevronDown, IconCreditCard, IconDatabase, IconDots, IconLock, IconPlus, IconRobot, IconShieldCheck, IconTool } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { cn } from "@/utils/cn";

type RunState = "Succeeded" | "Running" | "Failed" | "Queued" | "Waiting";
type Stage = { id: string; name: string; icon: "robot" | "tool" | "shield" | "card" | "bell" | "database"; state: RunState; slack: string; start: number; length: number; color: "success" | "primary" | "destructive" | "muted"; gate?: boolean; blocked?: boolean; retries?: number };
type Flow = { id: string; name: string; run: string; state: RunState; slack: string; progress: number; stages: Stage[] };

const initialFlows: Flow[] = [
  { id: "refund", name: "Refund Escalation", run: "PB-31", state: "Failed", slack: "0m", progress: 60, stages: [
    { id: "intake", name: "Intake & Classify", icon: "robot", state: "Succeeded", slack: "0m", start: 8, length: 1.2, color: "success" },
    { id: "policy", name: "Policy Check", icon: "tool", state: "Succeeded", slack: "0m", start: 9.2, length: 0.6, color: "success" },
    { id: "finance", name: "Finance Approval", icon: "shield", state: "Succeeded", slack: "0m", start: 10, length: 1.2, color: "success", gate: true, retries: 2 },
    { id: "capture", name: "Capture Refund", icon: "tool", state: "Failed", slack: "0m", start: 11.4, length: 1.1, color: "destructive", retries: 3 },
    { id: "notify", name: "Notify Customer", icon: "robot", state: "Queued", slack: "Blocked", start: 12.8, length: 1.2, color: "muted", blocked: true },
  ] },
  { id: "contract", name: "Contract Ingest", run: "PB-44", state: "Running", slack: "30m", progress: 25, stages: [
    { id: "fetch", name: "Fetch Documents", icon: "tool", state: "Succeeded", slack: "30m", start: 9, length: 0.8, color: "success" },
    { id: "parse", name: "Parse Batch", icon: "robot", state: "Running", slack: "30m", start: 10.8, length: 2.8, color: "primary", retries: 3 },
    { id: "summarize", name: "Summarize", icon: "robot", state: "Queued", slack: "30m", start: 13.2, length: 1.2, color: "muted" },
    { id: "risk", name: "Risk Review", icon: "shield", state: "Queued", slack: "30m", start: 14.8, length: 1.5, color: "muted", gate: true },
  ] },
  { id: "steward", name: "Data Steward Sweep", run: "PB-19", state: "Waiting", slack: "3h", progress: 72, stages: [
    { id: "snapshot", name: "Snapshot", icon: "database", state: "Succeeded", slack: "6h", start: 7, length: 1.3, color: "success" },
    { id: "dedupe", name: "Dedupe & Enrich", icon: "robot", state: "Succeeded", slack: "6h", start: 8.2, length: 4.1, color: "success" },
  ] },
];

const stateDot: Record<RunState, string> = { Succeeded: "bg-success", Running: "bg-info", Failed: "bg-destructive", Queued: "bg-muted-foreground", Waiting: "bg-warning" };
const stageIcon = { robot: IconRobot, tool: IconTool, shield: IconShieldCheck, card: IconCreditCard, bell: IconBell, database: IconDatabase };
const hourLabels = Array.from({ length: 12 }, (_, index) => `${(index + 7) % 12 || 12} ${index + 7 < 12 ? "AM" : "PM"}`);
const timelineWidth = 760;
const timelineStartHour = 7;
const timelineHours = 12;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);
}

export function AgentPlaybook() {
  const [flows, setFlows] = useState(initialFlows);
  const [date, setDate] = useState(new Date(2026, 6, 22));
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [showDependencies, setShowDependencies] = useState(true);
  const [showRetryLanes, setShowRetryLanes] = useState(true);
  const [message, setMessage] = useState("");

  function updateStage(flowId: string, stageId: string, update: Partial<Stage>, feedback: string) {
    setFlows((current) => current.map((flow) => flow.id === flowId ? { ...flow, stages: flow.stages.map((stage) => stage.id === stageId ? { ...stage, ...update } : stage) } : flow));
    setMessage(feedback);
  }

  function addStage() {
    const id = `stage-${Date.now()}`;
    setFlows((current) => current.map((flow, index) => index === 0 ? { ...flow, stages: [...flow.stages, { id, name: "Review escalation", icon: "robot", state: "Queued", slack: "—", start: 15, length: 1.4, color: "muted", blocked: true }] } : flow));
    setMessage("Review escalation added to Refund Escalation.");
  }

  function moveDate(amount: number) {
    setDate((current) => new Date(current.getFullYear(), current.getMonth(), current.getDate() + amount));
  }

  return <Card className="overflow-hidden gap-0 py-0 shadow-none">
    <CardHeader className="flex flex-nowrap flex-row items-center gap-2 border-b px-3 py-2">
      <Button variant="ghost" size="sm" onClick={() => setDate(new Date(2026, 6, 22))}>Today</Button>
      <div className="flex shrink-0"><Button variant="ghost" size="icon-sm" aria-label="Previous day" onClick={() => moveDate(-1)}><IconChevronLeft /></Button><Button variant="ghost" size="icon-sm" aria-label="Next day" onClick={() => moveDate(1)}><IconChevronRight /></Button></div>
      <span className="min-w-0 truncate text-sm font-medium">{formatDate(date)}</span>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm"><IconAdjustments />Settings</Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuCheckboxItem checked={showDependencies} onCheckedChange={setShowDependencies}>Dependencies</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={showRetryLanes} onCheckedChange={setShowRetryLanes}>Retry lanes</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>
        <Button size="sm" onClick={addStage}><IconPlus />New Stage</Button>
      </div>
    </CardHeader>
    <CardContent className="overflow-auto p-0">
      <div className="min-w-[1240px]">
        <div className="grid h-16 border-b bg-background text-[11px] text-muted-foreground" style={{ gridTemplateColumns: "minmax(380px, 520px) 1fr" }}>
          <div className="grid grid-cols-[minmax(0,1fr)_136px_74px_40px] items-center border-r"><span className="px-9">Stage</span><span className="px-2">Status</span><span className="px-2 text-right">Slack</span><span className="text-center">actions</span></div>
          <div className="grid grid-rows-2"><div className="flex items-center border-b px-3">{formatDate(date)}</div><div className="grid" style={{ gridTemplateColumns: `repeat(12, minmax(0, 1fr))` }}>{hourLabels.map((label) => <div key={label} className="flex items-center justify-center border-r text-xs">{label}</div>)}</div></div>
        </div>
        {flows.map((flow) => <section key={flow.id}>
          <div className="grid h-10 border-b bg-background text-xs" style={{ gridTemplateColumns: "minmax(380px, 520px) 1fr" }}>
            <div className="grid grid-cols-[minmax(0,1fr)_136px_74px_40px] items-center border-r px-3">
              <div className="flex min-w-0 items-center gap-2"><button type="button" aria-label={`${collapsed.includes(flow.id) ? "Expand" : "Collapse"} ${flow.name}`} aria-expanded={!collapsed.includes(flow.id)} onClick={() => setCollapsed((current) => collapsed.includes(flow.id) ? current.filter((id) => id !== flow.id) : [...current, flow.id])}><IconChevronDown className={cn("size-3.5 transition-transform", collapsed.includes(flow.id) && "-rotate-90")} /></button><span className="truncate font-medium">{flow.name}</span><Badge variant="secondary" size="sm">{flow.run}</Badge></div>
              <div className="px-2"><Badge variant="outline" size="sm"><span className={cn("size-1.5 rounded-full", stateDot[flow.state])} />{flow.state}</Badge></div>
              <span className="px-2 text-right tabular-nums text-muted-foreground">{flow.slack}</span><span />
            </div>
            <div className="relative flex items-center px-3"><div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-foreground/55" style={{ width: `${flow.progress}%` }} /></div><span className="ml-2 shrink-0 tabular-nums text-muted-foreground">{flow.progress}%</span></div>
          </div>
          {!collapsed.includes(flow.id) && flow.stages.map((stage, stageIndex) => {
            const StageIcon = stageIcon[stage.icon];
            const left = `${(stage.start - timelineStartHour) / timelineHours * 100}%`;
            const width = `${stage.length / timelineHours * 100}%`;
            const previous = flow.stages[stageIndex - 1];
            const previousCenter = previous ? (previous.start + previous.length - timelineStartHour) / timelineHours * timelineWidth : 0;
            const currentCenter = (stage.start - timelineStartHour) / timelineHours * timelineWidth;
            const rowHeight = stage.retries && showRetryLanes ? 68 : 40;
            return <div key={stage.id} className="grid border-b" style={{ height: rowHeight, gridTemplateColumns: "minmax(380px, 520px) 1fr" }}>
              <div className="grid grid-cols-[minmax(0,1fr)_136px_74px_40px] items-center border-r text-xs">
                <div className="flex min-w-0 items-center gap-2 pl-12 pr-2"><StageIcon className="size-3.5 shrink-0 text-muted-foreground" /><span className="truncate">{stage.name}</span>{stage.gate && <Badge variant="secondary" size="sm">Gate</Badge>}</div>
                <div className="px-2"><Badge variant="outline" size="sm"><span className={cn("size-1.5 rounded-full", stateDot[stage.state])} />{stage.state}</Badge></div>
                <span className={cn("px-2 text-right tabular-nums", stage.blocked ? "text-destructive" : "text-muted-foreground")}>{stage.slack}</span>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-xs" aria-label={`Actions for ${stage.name}`}><IconDots /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => updateStage(flow.id, stage.id, { state: "Running", color: "primary", blocked: false, slack: "0m" }, `${stage.name} retry started.`)}>Retry stage</DropdownMenuItem><DropdownMenuItem onSelect={() => updateStage(flow.id, stage.id, { state: "Succeeded", color: "success", blocked: false }, `${stage.name} marked successful.`)}>Mark successful</DropdownMenuItem><DropdownMenuItem onSelect={() => setMessage(`${stage.name} depends on ${previous?.name ?? "the previous workflow stage"}.`)}>View dependencies</DropdownMenuItem><DropdownMenuItem onSelect={() => setMessage(`${stage.name} run details opened.`)}>Run details</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
              </div>
              <div className="relative overflow-hidden" style={{ backgroundImage: "linear-gradient(to right, var(--color-border) 1px, transparent 1px)", backgroundSize: `${100 / 12}% 100%` }}>
                {showDependencies && previous && <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full text-muted-foreground/60" viewBox={`0 0 ${timelineWidth} ${rowHeight}`} preserveAspectRatio="none"><path d={`M ${previousCenter} 0 V ${rowHeight / 2 - 5} H ${currentCenter - 6} V ${rowHeight / 2}`} fill="none" stroke="currentColor" strokeWidth="1.5" /><path d={`M ${currentCenter - 9} ${rowHeight / 2 - 3} L ${currentCenter - 3} ${rowHeight / 2} L ${currentCenter - 9} ${rowHeight / 2 + 3}`} fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>}
                {stage.retries && showRetryLanes ? Array.from({ length: stage.retries }, (_, index) => <div key={`${stage.id}-try-${index}`} className={cn("absolute z-10 flex h-5 items-center gap-1 overflow-hidden rounded-md px-2 text-[11px]", stage.color === "success" ? "bg-success/15 text-success-foreground" : stage.color === "primary" ? "bg-info/20 text-foreground" : "bg-destructive/15 text-destructive")} style={{ left, width, top: 7 + index * 20 }}><span className={cn("size-1.5 shrink-0 rounded-full", stage.color === "success" ? "bg-success" : stage.color === "primary" ? "bg-primary" : "bg-destructive")} /><span className="truncate">{stage.name}</span>{stage.state === "Running" && index === 0 && <span className="ml-auto shrink-0 text-muted-foreground">Shard 3 of 3</span>}</div>) : <div className={cn("absolute z-10 flex h-6 items-center gap-1 overflow-hidden rounded-md px-2 text-[11px]", stage.color === "success" ? "bg-success/15 text-success-foreground" : stage.color === "primary" ? "bg-info/20 text-foreground" : stage.color === "destructive" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground")} style={{ left, width, top: "7px" }}><span className={cn("size-1.5 shrink-0 rounded-full", stage.color === "success" ? "bg-success" : stage.color === "primary" ? "bg-primary" : stage.color === "destructive" ? "bg-destructive" : "bg-muted-foreground")} /><span className="truncate">{stage.name}</span></div>}
                {stage.blocked && <div className="absolute inset-y-0 right-0 z-0 flex items-center px-2 text-[10px] text-destructive"><IconLock className="mr-1 size-3" />Blocked</div>}
              </div>
            </div>;
          })}
        </section>)}
        <p role="status" className="min-h-8 border-t px-3 py-2 text-xs text-muted-foreground">{message}</p>
      </div>
    </CardContent>
  </Card>;
}
