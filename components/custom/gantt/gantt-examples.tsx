"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconSettings } from "@tabler/icons-react";
import { Gantt, type GanttProps } from "./gantt";
import { addCalendarDays, canScheduleGanttEvent, summarizeGanttResource, type GanttEvent, type GanttResource } from "./gantt-lib";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table/table";


const seedEvents: GanttEvent[] = [
  { id: "design-task", resourceId: "design", title: "Design audit", start: new Date(2026, 10, 2), end: new Date(2026, 10, 5), progress: 100 },
  { id: "development-task", resourceId: "development", title: "Development", start: new Date(2026, 10, 5), end: new Date(2026, 10, 10), progress: 60 },
  { id: "testing-task", resourceId: "testing", title: "Testing", start: new Date(2026, 10, 10), end: new Date(2026, 10, 13), progress: 20 },
  { id: "launch-task", resourceId: "launch", title: "Launch", start: new Date(2026, 10, 13), end: new Date(2026, 10, 15), progress: 0 },
];
function initialEvents(example: number): GanttEvent[] {
  return seedEvents.map((event, index) => ({ ...event, ...(example === 3 ? { start: addCalendarDays(event.start, index * 10), end: addCalendarDays(event.end, index * 16) } : {}), ...(example === 6 ? { baseline: { start: addCalendarDays(event.start, -1), end: addCalendarDays(event.end, -2) } } : {}), ...(example === 7 ? { dependencies: index ? [seedEvents[index - 1].id] : [], ...(index === 3 ? { kind: "milestone" as const, end: event.start } : {}) } : {}) }));
}
function dateToken(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
export function GanttExample({ example }: { example: number }) {
  const locale = "en-US";
  const [events, setEvents] = useState(() => initialEvents(example));
  const [start, setStart] = useState(new Date(2026, 10, 2));
  const [scale, setScale] = useState<NonNullable<GanttProps["scale"]>>(example === 3 ? "quarter" : example === 4 ? "week" : "day");
  const [resourceOrder, setResourceOrder] = useState(["design", "development", "testing", "launch", ...(example === 1 ? ["release"] : [])]);
  const [selected, setSelected] = useState<GanttEvent | null>(null);
  const [feedback, setFeedback] = useState("");
  const [weekends, setWeekends] = useState(true);
  const [summaries, setSummaries] = useState(example === 3);
  const [dependencies, setDependencies] = useState(example === 7);
  const resources: GanttResource[] = [{ id: "project", title: "NextRose", children: resourceOrder.map((id) => ({ id, title: id === "design" ? "Design audit" : id === "development" ? "Development" : id === "testing" ? "Testing" : id === "launch" ? "Launch" : "Release preparation", capacity: 40 })) }];
  const summary = summaries ? summarizeGanttResource(resources[0], events) : null;
  const displayEvents = [...events, ...(summary ? [summary] : [])];
  const labels = { resources: "Tasks", timeline: "Timeline", move: "Use left and right arrows to move by one day.", resize: "Resize with left and right arrows", expand: "Expand", collapse: "Collapse", empty: "No matching records.", moveUp: "Move task up", moveDown: "Move task down", progress: "Progress", capacity: "capacity used", schedule: "Schedule task", resizeResources: "Resize resource column" };
  function updateEvent(event: GanttEvent) {
    if (!canScheduleGanttEvent(example === 7 ? events : [], event)) { setFeedback("The schedule conflicts with a dependency. Keep tasks after their predecessors and before their successors."); return false; }
    setEvents((current) => { const previous = current.find((item) => item.id === event.id); return previous ? current.map((item) => item.id === event.id ? { ...event, title: item.title } : item) : [...current, event]; });
    setFeedback("Task updated."); return true;
  }
  const dependencyError = selected && example === 7 && selected.end >= selected.start && !canScheduleGanttEvent(events, selected);
  const period = scale === "day" ? 14 : scale === "week" ? 28 : scale === "year" ? 365 : scale === "quarter" ? 180 : 90;
  return <div className="w-full min-w-0 space-y-4">
    <div className="flex flex-wrap items-center gap-2"><Button variant="outline" size="icon-sm" aria-label={"Previous period"} onClick={() => setStart((date) => addCalendarDays(date, -period))}><IconChevronLeft /></Button><Button variant="outline" size="icon-sm" aria-label={"Next period"} onClick={() => setStart((date) => addCalendarDays(date, period))}><IconChevronRight /></Button><span className="text-sm font-medium">{new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(start)}</span><NativeSelect aria-label={"Timeline scale"} value={scale} onChange={(event) => setScale(event.target.value as typeof scale)}>{[{ value: "day", label: "Day scale" }, { value: "week", label: "Week scale" }, { value: "month", label: "Month scale" }, { value: "quarter", label: "Quarter scale" }, { value: "year", label: "Year scale" }].map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</NativeSelect><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon-sm" aria-label={"Gantt settings"}><IconSettings /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuCheckboxItem checked={weekends} onCheckedChange={setWeekends}>{"Show weekends"}</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={summaries} onCheckedChange={setSummaries}>{"Show summary rollups"}</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={dependencies} onCheckedChange={setDependencies}>{"Show dependencies"}</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu><Button size="sm" variant="ghost" onClick={() => { setEvents(initialEvents(example)); setStart(new Date(2026, 10, 2)); setFeedback(""); }}>{"Reset"}</Button></div>
    {example === 1 && <p className="text-xs text-muted-foreground">{"Select Schedule task on an empty row to create a task. Use the settings menu to adjust the timeline."}</p>}{example === 6 && <p className="text-xs text-muted-foreground">{"The thin gray bar shows the baseline; the main bar shows the current schedule."}</p>}{example === 7 && <p className="text-xs text-muted-foreground">{"Arrows link predecessor tasks to their successors. The diamond marks the launch milestone."}</p>}
    <Gantt resources={resources} events={displayEvents} start={start} scale={scale} locale={locale} labels={labels} showWeekends={weekends} showCapacity={example === 4} showDetails={example === 5} showDependencies={dependencies} resizableResourceColumn={example === 1} onEventChange={updateEvent} onEventSelect={setSelected} onSlotSelect={example === 1 ? (resourceId, date) => setSelected({ id: crypto.randomUUID(), resourceId, title: resources[0].children?.find((resource) => resource.id === resourceId)?.title ?? "New task", start: date, end: addCalendarDays(date, 2), progress: 0 }) : undefined} onResourceReorder={example === 2 ? (sourceId, targetId) => { setResourceOrder((current) => { const next = [...current]; const from = next.indexOf(sourceId), to = next.indexOf(targetId); if (from < 0 || to < 0) return current; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; }); setFeedback("Task order updated."); } : undefined} />
    {example === 5 && <Table><TableHeader><TableRow><TableHead>{"Tasks"}</TableHead><TableHead>{"Start date"}</TableHead><TableHead>{"End date"}</TableHead><TableHead>{"Progress"}</TableHead></TableRow></TableHeader><TableBody>{events.map((event) => <TableRow key={event.id}><TableCell><Button variant="link" size="sm" onClick={() => setSelected(event)}>{event.title}</Button></TableCell><TableCell>{dateToken(event.start)}</TableCell><TableCell>{dateToken(event.end)}</TableCell><TableCell><Input className="w-20" type="number" aria-label={`${"Progress"} ${event.title}`} min={0} max={100} value={event.progress ?? 0} onChange={(inputEvent) => updateEvent({ ...event, progress: Math.max(0, Math.min(100, Number(inputEvent.target.value))) })} /></TableCell></TableRow>)}</TableBody></Table>}
    <output role="status" className="block min-h-4 text-xs text-muted-foreground">{feedback}</output>
    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent><DialogHeader><DialogTitle>{"Edit task"}</DialogTitle><DialogDescription>{"Choose the start and exclusive end date."}</DialogDescription></DialogHeader>{selected && <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); if (updateEvent(selected)) setSelected(null); }}><div className="grid gap-2"><Label htmlFor={`gantt-start-${example}`}>{"Start date"}</Label><Input id={`gantt-start-${example}`} type="date" required value={dateToken(selected.start)} onChange={(event) => { if (event.target.value) setSelected({ ...selected, start: new Date(`${event.target.value}T00:00:00`), ...(selected.kind === "milestone" ? { end: new Date(`${event.target.value}T00:00:00`) } : {}) }); }} /></div>{selected.kind !== "milestone" && <div className="grid gap-2"><Label htmlFor={`gantt-end-${example}`}>{"End date"}</Label><Input id={`gantt-end-${example}`} type="date" required min={dateToken(addCalendarDays(selected.start, 1))} value={dateToken(selected.end)} aria-invalid={selected.end <= selected.start} aria-describedby={selected.end <= selected.start ? `gantt-error-${example}` : undefined} onChange={(event) => { if (event.target.value) setSelected({ ...selected, end: new Date(`${event.target.value}T00:00:00`) }); }} /></div>}{selected.kind !== "milestone" && selected.end <= selected.start && <p id={`gantt-error-${example}`} role="alert" className="text-sm text-destructive">{"The end date must be after the start date."}</p>}<div className="grid gap-2"><Label htmlFor={`gantt-progress-${example}`}>{"Progress"}</Label><Input id={`gantt-progress-${example}`} type="number" min={0} max={100} required value={selected.progress ?? 0} onChange={(event) => setSelected({ ...selected, progress: Number(event.target.value) })} /></div>{dependencyError && <p role="alert" className="text-sm text-destructive">{"The schedule conflicts with a dependency. Keep tasks after their predecessors and before their successors."}</p>}<DialogFooter><Button variant="outline" onClick={() => setSelected(null)}>{"Cancel"}</Button><Button type="submit" disabled={!!dependencyError || selected.kind !== "milestone" && selected.end <= selected.start}>{"Save changes"}</Button></DialogFooter></form>}</DialogContent></Dialog>
  </div>;
}
