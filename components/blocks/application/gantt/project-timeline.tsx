"use client";

import { useRef, useState } from "react";
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconDots, IconLock, IconPlus, IconSettings, IconUsers } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { cn } from "@/utils/cn";

type Task = { id: string; title: string; group: string; status: "Done" | "In Progress" | "To Do" | "In Review"; assignees: string[]; due: number; start: number; end: number; progress: number; color: string; dependency?: string; locked?: boolean };
const initialTasks: Task[] = [
  { id: "login", title: "Login redirect", group: "bugs", status: "Done", assignees: ["MC", "LG"], due: 14, start: 14, end: 16, progress: 100, color: "bg-info" },
  { id: "access", title: "Access rules", group: "bugs", status: "In Progress", assignees: ["MC"], due: 19, start: 15, end: 20, progress: 45, color: "bg-primary", dependency: "login" },
  { id: "mobile", title: "Mobile crash", group: "bugs", status: "In Progress", assignees: ["LG", "AB", "SR"], due: 21, start: 18, end: 23, progress: 35, color: "bg-muted-foreground" },
  { id: "ios", title: "iOS audit", group: "bugs", status: "In Progress", assignees: ["AB"], due: 20, start: 17, end: 21, progress: 55, color: "bg-info", dependency: "mobile" },
  { id: "android", title: "Android audit", group: "bugs", status: "To Do", assignees: [], due: 25, start: 21, end: 27, progress: 0, color: "bg-success", dependency: "ios" },
  { id: "truncation", title: "Button truncation", group: "bugs", status: "In Review", assignees: ["SR"], due: 14, start: 12, end: 14, progress: 30, color: "bg-warning" },
  { id: "offline", title: "Offline sync", group: "bugs", status: "To Do", assignees: ["MC", "SR"], due: 27, start: 22, end: 28, progress: 0, color: "bg-success" },
  { id: "api", title: "API key rotation", group: "bugs", status: "Done", assignees: ["LG"], due: 14, start: 10, end: 13, progress: 100, color: "bg-destructive" },
  { id: "replay", title: "Session replay", group: "bugs", status: "To Do", assignees: [], due: 29, start: 26, end: 31, progress: 0, color: "bg-primary" },
  { id: "export", title: "Data export", group: "release", status: "In Progress", assignees: ["LG", "MC"], due: 22, start: 19, end: 24, progress: 52, color: "bg-primary", dependency: "api" },
  { id: "validation", title: "Form validation", group: "release", status: "To Do", assignees: ["MC"], due: 27, start: 24, end: 28, progress: 18, color: "bg-destructive", dependency: "export" },
  { id: "nav", title: "Nav focus", group: "release", status: "To Do", assignees: [], due: 28, start: 26, end: 30, progress: 0, color: "bg-warning" },
  { id: "perf", title: "Perf audit", group: "release", status: "In Review", assignees: ["LG"], due: 22, start: 21, end: 25, progress: 38, color: "bg-destructive", locked: true },
  { id: "changelog", title: "Changelog", group: "release", status: "To Do", assignees: [], due: 4, start: 29, end: 34, progress: 0, color: "bg-success" },
];
const people: Record<string, string> = { MC: "Maya Chen", LG: "Leo Grant", AB: "Ari Bennett", SR: "Sam Rivera" };
const statusTone: Record<Task["status"], string> = { Done: "success-light", "In Progress": "primary-light", "To Do": "outline", "In Review": "warning-light" };

export function ProjectTimeline() {
  const [tasks, setTasks] = useState(initialTasks);
  const [month, setMonth] = useState(new Date(2026, 6, 1));
  const [view, setView] = useState("Month");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [draft, setDraft] = useState<Task | null>(null);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);
  const [resizing, setResizing] = useState(false);
  const [metaWidth, setMetaWidth] = useState(420);
  const resizeStart = useRef<{ x: number; width: number } | null>(null);
  const [assignee, setAssignee] = useState("all");
  const [showStatus, setShowStatus] = useState(true);
  const [showAssignee, setShowAssignee] = useState(true);
  const days = view === "Day" ? 7 : view === "Week" ? 14 : 21;
  const dateStart = new Date(month.getFullYear(), month.getMonth(), 12);
  const dates = Array.from({ length: days }, (_, i) => new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate() + i));
  const visibleGroups = ["bugs", "release"].filter((group) => !collapsed.includes(group));
  const filtered = tasks.filter((task) => assignee === "all" || task.assignees.includes(assignee));
  const displayedRows = ["bugs", "release"].flatMap((group) => [
    { kind: "group" as const, group },
    ...(visibleGroups.includes(group) ? filtered.filter((task) => task.group === group).map((task) => ({ kind: "task" as const, task })) : []),
  ]);
  const fixedMetaWidth = (showStatus ? 88 : 0) + (showAssignee ? 72 : 0) + 82;
  const gridStyle = { gridTemplateColumns: `${metaWidth - fixedMetaWidth}px ${showStatus ? "88px" : "0px"} ${showAssignee ? "72px" : "0px"} 82px minmax(0, 1fr)` };
  function changeMonth(amount: number) { setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1)); }
  function formatDue(day: number) { return `${day < 12 ? "Aug" : "Jul"} ${day}`; }
  function moveTask(task: Task, day: number) { const length = task.end - task.start; setTasks((current) => current.map((item) => item.id === task.id ? { ...item, start: day, end: day + length } : item)); }
  function addTask(group = "bugs") { const newTask: Task = { id: `task-${Date.now()}`, title: "New task", group, status: "To Do", assignees: [], due: 25, start: 20, end: 24, progress: 0, color: "bg-primary" }; setSelected(newTask); setDraft(newTask); }
  return <section aria-label="Project timeline" className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
    <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
      <Button variant="outline" size="sm" onClick={() => setMonth(new Date(2026, 6, 1))}>Today</Button>
      <Select value={view} onValueChange={setView}><SelectTrigger size="sm" aria-label="Select view" className="w-24"><SelectValue /></SelectTrigger><SelectContent>{["Day", "Week", "Month"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
      <div className="flex"><Button variant="ghost" size="icon-sm" aria-label="Previous" onClick={() => changeMonth(-1)}><IconChevronLeft /></Button><Button variant="ghost" size="icon-sm" aria-label="Next" onClick={() => changeMonth(1)}><IconChevronRight /></Button></div>
      <span className="text-sm font-medium">{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(month)}</span>
      <div className="ml-auto flex items-center gap-2"><Button variant="outline" size="sm" aria-label="Filter by assignee" onClick={() => setAssignee((value) => value === "all" ? "MC" : value === "MC" ? "LG" : "all")}><IconUsers />{assignee === "all" ? "All" : people[assignee]}</Button><Button size="sm" onClick={() => addTask()}><IconPlus />Add Task</Button><Button size="icon-sm" variant="outline" aria-label="Column settings" onClick={() => { setShowStatus((v) => !v); setShowAssignee((v) => !v); }}><IconSettings /></Button></div>
    </div>
    <div className="overflow-x-auto">
      <div className="min-w-[840px]">
        <div className="grid h-16 border-b bg-muted/30 text-[11px] font-medium text-muted-foreground" style={gridStyle}>
          <div className="sticky left-0 z-20 row-span-2 flex items-center border-r bg-muted/30 px-3" style={{ gridColumn: 1 }}>Name</div>
          {showStatus && <div className="row-span-2 flex items-center border-r px-2" style={{ gridColumn: 2 }}>Status</div>}
          {showAssignee && <div className="row-span-2 flex items-center border-r px-2" style={{ gridColumn: 3 }}>Assignee</div>}
          <div className="row-span-2 flex items-center border-r px-2" style={{ gridColumn: 4 }}>Due date</div>
          <div className="relative grid grid-rows-[32px_32px] border-b" style={{ gridColumn: 5, gridTemplateColumns: `repeat(${days}, minmax(28px, 1fr))` }}>
            {Array.from({ length: Math.ceil(days / 7) }, (_, week) => { const from = dates[week * 7]; const through = dates[Math.min(week * 7 + 6, days - 1)]; return <div key={week} className="row-start-1 flex items-center border-r px-2 font-medium" style={{ gridColumn: `span ${Math.min(7, days - week * 7)}` }}>W{29 + week} {from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {through.toLocaleDateString("en-US", { day: "numeric" })}</div>; })}
            {dates.map((date, index) => <div key={date.toISOString()} style={{ gridColumn: index + 1, gridRow: 2 }} className="flex items-center justify-center border-r">{date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}</div>)}
            <div role="separator" aria-label="Resize task tree" aria-orientation="vertical" aria-valuemin={320} aria-valuemax={620} aria-valuenow={metaWidth} tabIndex={0} className="absolute inset-y-0 left-0 z-30 w-1 -translate-x-1/2 cursor-col-resize touch-none bg-border outline-none hover:bg-primary focus-visible:bg-ring" style={{ left: 0 }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); resizeStart.current = { x: event.clientX, width: metaWidth }; }} onPointerMove={(event) => { if (!resizeStart.current) return; setMetaWidth(Math.max(320, Math.min(620, resizeStart.current.width + event.clientX - resizeStart.current.x))); }} onPointerUp={(event) => { resizeStart.current = null; event.currentTarget.releasePointerCapture(event.pointerId); }} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setMetaWidth((width) => Math.max(320, Math.min(620, width + (event.key === "ArrowRight" ? 12 : -12)))); } }} />
          </div>
        </div>
        {displayedRows.map((row) => row.kind === "group" ? <div key={row.group} className="grid h-9 border-b bg-background text-xs" style={gridStyle}>
          <div className="sticky left-0 z-20 col-span-4 flex items-center gap-2 border-r bg-background px-3"><button type="button" aria-label={`${collapsed.includes(row.group) ? "Expand" : "Collapse"} ${row.group === "bugs" ? "Bug Tracking" : "Release 2.4"}`} aria-expanded={!collapsed.includes(row.group)} onClick={() => setCollapsed((items) => items.includes(row.group) ? items.filter((item) => item !== row.group) : [...items, row.group])}><IconChevronDown className={cn("size-3.5 transition-transform", collapsed.includes(row.group) && "-rotate-90")} /></button><span className="size-2 rounded-full bg-primary" /><span className="font-medium">{row.group === "bugs" ? "Bug Tracking" : "Release 2.4"}</span><DropdownMenu><DropdownMenuTrigger asChild><Button type="button" size="icon-sm" variant="ghost" className="ml-auto size-7" aria-label={`More ${row.group} options`}><IconDots className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => addTask(row.group)}>Add task</DropdownMenuItem><DropdownMenuItem onSelect={() => setCollapsed((items) => items.includes(row.group) ? items.filter((item) => item !== row.group) : [...items, row.group])}>{collapsed.includes(row.group) ? "Expand group" : "Collapse group"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
          <div className="relative col-start-5 row-start-1 border-r"><div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${days}, minmax(28px, 1fr))` }}>{dates.map((date) => <div key={date.toISOString()} className={cn("border-r", [0, 6].includes(date.getDay()) && "bg-muted/40")} />)}</div><div className="absolute inset-y-1/2 left-0 h-1 w-[72%] rounded-full bg-muted-foreground/40"><span className="block h-full w-2/3 rounded-full bg-muted-foreground/50" /></div></div>
        </div> : <div key={row.task.id} className="grid h-10 border-b text-xs" style={gridStyle}>
          <div className="sticky left-0 z-10 flex min-w-0 items-center gap-2 border-r bg-card px-3" title={row.task.title} style={{ gridColumn: 1 }}><span className={cn("size-2 shrink-0 rounded-full", row.task.status === "Done" ? "bg-success" : row.task.status === "In Progress" ? "bg-primary" : row.task.status === "In Review" ? "bg-warning" : "border border-muted-foreground/40")} /><span className="truncate">{row.task.title}</span>{row.task.locked && <IconLock aria-label="Locked" className="size-3.5 text-muted-foreground" />}<DropdownMenu><DropdownMenuTrigger asChild><Button type="button" size="icon-sm" variant="ghost" className="ml-auto size-7" aria-label={`More options for ${row.task.title}`}><IconDots className="size-3.5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => { setSelected(row.task); setDraft(row.task); }}>Edit task</DropdownMenuItem><DropdownMenuItem onSelect={() => { setTasks((current) => current.map((task) => task.id === row.task.id ? { ...task, status: "Done", progress: 100 } : task)); setMessage(`${row.task.title} marked complete.`); }}>Mark complete</DropdownMenuItem><DropdownMenuItem variant="destructive" onSelect={() => { setTasks((current) => current.filter((task) => task.id !== row.task.id)); setMessage(`${row.task.title} removed.`); }}>Delete task</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
          {showStatus && <div className="flex items-center border-r px-2" style={{ gridColumn: 2 }}><Badge variant={statusTone[row.task.status] as "success-light" | "primary-light" | "outline" | "warning-light"} size="sm">{row.task.status}</Badge></div>}
          {showAssignee && <div className="flex items-center gap-0.5 border-r px-2" style={{ gridColumn: 3 }}>{row.task.assignees.slice(0, 3).map((person) => <span key={person} title={people[person]} className="flex size-5 items-center justify-center rounded-full border border-background bg-muted text-[9px] font-medium text-muted-foreground">{person.slice(0, 1)}</span>)}{!row.task.assignees.length && <span className="size-5 rounded-full border border-dashed border-muted-foreground/40" />}</div>}
          <div className={cn("flex items-center border-r px-2", row.task.due < 16 && row.task.status === "In Review" && "text-destructive")} style={{ gridColumn: 4 }}>{formatDue(row.task.due)}</div>
          <div className="relative" onDragOver={(event) => { if (dragging) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); const box = event.currentTarget.getBoundingClientRect(); const day = Math.max(0, Math.min(days - 1, Math.floor((event.clientX - box.left) / box.width * days))); const task = tasks.find((item) => item.id === dragging); if (task) { if (resizing) setTasks((current) => current.map((item) => item.id === task.id ? { ...item, end: Math.max(item.start + 1, day + 12) } : item)); else moveTask(task, day + 12); setMessage(`${task.title} ${resizing ? "resized" : "moved"} on the timeline.`); } setDragging(null); setResizing(false); }}>
            <div className="absolute inset-0 grid" aria-hidden>{dates.map((date) => <div key={date.toISOString()} className={cn("border-r", [0, 6].includes(date.getDay()) && "bg-muted/40")} />)}</div>
            {row.task.dependency && <span aria-hidden className="absolute top-1/2 z-0 h-px border-t border-dashed border-muted-foreground/70" style={{ left: `${Math.max(0, (row.task.start - 13) / days * 100)}%`, width: "5%" }} />}
            <div role="button" tabIndex={0} draggable onDragStart={() => { setDragging(row.task.id); setResizing(false); }} onDragEnd={() => setDragging(null)} onClick={() => { setSelected(row.task); setDraft(row.task); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(row.task); setDraft(row.task); } }} aria-label={`${row.task.title}, Jul ${row.task.due}, ${row.task.status}. Edit task`} className={cn("absolute top-1.5 z-10 flex h-7 min-w-[24px] items-center overflow-hidden rounded-md text-left text-[11px] font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring", row.task.color === "bg-primary" ? "bg-primary/20" : row.task.color === "bg-info" ? "bg-info/20" : row.task.color === "bg-success" ? "bg-success/20" : row.task.color === "bg-warning" ? "bg-warning/20" : row.task.color === "bg-destructive" ? "bg-destructive/20" : "bg-muted-foreground/20")} style={{ left: `${Math.max(0, (row.task.start - 12) / days * 100)}%`, width: `${Math.max(9, (row.task.end - row.task.start) / days * 100)}%` }}><span aria-hidden className={cn("absolute inset-y-0 left-0 rounded-l-md opacity-60", row.task.color)} style={{ width: `${row.task.progress}%` }} /><span className="relative min-w-0 flex-1 truncate px-2">{row.task.title}</span><button type="button" draggable aria-label={`Resize ${row.task.title}`} title="Drag to resize" className="relative z-10 h-full w-2 shrink-0 cursor-ew-resize border-l border-foreground/10 outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={(event) => event.stopPropagation()} onDragStart={(event) => { event.stopPropagation(); setDragging(row.task.id); setResizing(true); event.dataTransfer.setData("text/plain", row.task.id); }} onDragEnd={() => { setDragging(null); setResizing(false); }} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); event.stopPropagation(); setTasks((current) => current.map((task) => task.id === row.task.id ? { ...task, end: Math.max(task.start + 1, task.end + (event.key === "ArrowRight" ? 1 : -1)) } : task)); } }} /></div>
          </div>
        </div>)}
      </div>
    </div>
    {message && <p role="status" className="border-t px-3 py-2 text-xs text-muted-foreground">{message}</p>}
    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent><DialogHeader><DialogTitle>{tasks.some((task) => task.id === selected?.id) ? "Edit task" : "Add task"}</DialogTitle><DialogDescription>Update the task details and save your changes.</DialogDescription></DialogHeader>{draft && <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); const existing = tasks.some((task) => task.id === draft.id); setTasks((current) => existing ? current.map((task) => task.id === draft.id ? draft : task) : [...current, draft]); setMessage(`${draft.title} ${existing ? "saved" : "created"}.`); setSelected(null); }}><label className="grid gap-1 text-sm">Name<Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label><label className="grid gap-1 text-sm">Due date<Input type="number" min="1" max="31" value={draft.due} onChange={(event) => setDraft({ ...draft, due: Number(event.target.value) })} /></label><label className="grid gap-1 text-sm">Progress<Input type="number" min="0" max="100" value={draft.progress} onChange={(event) => setDraft({ ...draft, progress: Number(event.target.value) })} /></label><DialogFooter><Button type="button" variant="outline" onClick={() => setSelected(null)}>Cancel</Button><Button type="submit">Save changes</Button></DialogFooter></form>}</DialogContent></Dialog>
  </section>;
}
