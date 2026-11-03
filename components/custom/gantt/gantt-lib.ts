export type GanttResource = { id: string; title: string; children?: GanttResource[]; capacity?: number };
export type GanttEvent = { id: string; resourceId: string; title: string; start: Date; end: Date; progress?: number; kind?: "task" | "milestone" | "summary"; dependencies?: readonly string[]; baseline?: { start: Date; end: Date } };
export function addCalendarDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}
export function calendarDayNumber(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
}
export function moveGanttEvent(event: GanttEvent, days: number): GanttEvent {
  return { ...event, start: addCalendarDays(event.start, days), end: addCalendarDays(event.end, days) };
}
/** Intervals are end-exclusive. Invalid and invisible intervals have no bar. */
export function ganttPosition(start: Date, end: Date, viewStart: Date, days: number): { offset: number; duration: number } | null {
  const first = calendarDayNumber(start) - calendarDayNumber(viewStart);
  const last = calendarDayNumber(end) - calendarDayNumber(viewStart);
  if (!Number.isFinite(first) || !Number.isFinite(last) || first >= last || last <= 0 || first >= days) return null;
  const offset = Math.max(0, first);
  return { offset, duration: Math.min(days, last) - offset };
}

export function summarizeGanttResource(resource: GanttResource, events: readonly GanttEvent[]): GanttEvent | null {
  const resourceIds = new Set<string>();
  function collect(item: GanttResource) { resourceIds.add(item.id); item.children?.forEach(collect); }
  collect(resource);
  const tasks = events.filter((event) => resourceIds.has(event.resourceId) && event.kind !== "summary" && calendarDayNumber(event.end) > calendarDayNumber(event.start));
  if (!tasks.length) return null;
  let total = 0, completed = 0;
  for (const task of tasks) { const days = calendarDayNumber(task.end) - calendarDayNumber(task.start); total += days; completed += days * Math.max(0, Math.min(100, task.progress ?? 0)); }
  return { id: `summary-${resource.id}`, resourceId: resource.id, title: resource.title, kind: "summary", start: new Date(Math.min(...tasks.map((task) => task.start.getTime()))), end: new Date(Math.max(...tasks.map((task) => task.end.getTime()))), progress: total ? Math.round(completed / total) : 0 };
}

export function canScheduleGanttEvent(events: readonly GanttEvent[], proposal: GanttEvent): boolean {
  const start = calendarDayNumber(proposal.start), end = calendarDayNumber(proposal.end);
  if (!Number.isFinite(start) || !Number.isFinite(end) || (proposal.kind === "milestone" ? end < start : end <= start)) return false;
  const byId = new Map(events.map((event) => [event.id, event]));
  for (const id of proposal.dependencies ?? []) {
    const predecessor = byId.get(id);
    if (!predecessor || calendarDayNumber(predecessor.end) > start) return false;
  }
  return events.every((event) => !event.dependencies?.includes(proposal.id) || calendarDayNumber(event.start) >= end);
}
