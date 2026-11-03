"use client";

import * as React from "react";
import { IconChevronDown, IconChevronRight, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { addCalendarDays, calendarDayNumber, ganttPosition, moveGanttEvent, type GanttEvent, type GanttResource } from "./gantt-lib";

export type GanttProps = {
  resources: readonly GanttResource[];
  events: readonly GanttEvent[];
  start: Date;
  scale?: "day" | "week" | "month" | "quarter" | "year";
  locale?: string;
  labels: { resources: string; timeline: string; move: string; resize: string; expand: string; collapse: string; empty: string; moveUp?: string; moveDown?: string; progress?: string; capacity?: string; schedule?: string };
  onEventChange?: (event: GanttEvent) => void;
  onEventSelect?: (event: GanttEvent) => void;
  className?: string;
  showWeekends?: boolean; showCapacity?: boolean; showDetails?: boolean; showDependencies?: boolean;
  onSlotSelect?: (resourceId: string, date: Date) => void;
  onResourceReorder?: (sourceId: string, targetId: string) => void;
};
export function Gantt({ resources, events, start, scale = "day", locale = "en", labels, onEventChange, onEventSelect, className, showWeekends = true, showCapacity, showDetails, showDependencies, onResourceReorder, onSlotSelect }: GanttProps) {
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const drag = React.useRef<{ id: string; mode: "move" | "resize"; grabOffset: number } | null>(null);
  const days = scale === "day" ? 14 : scale === "week" ? 28 : scale === "year" ? 365 : 90;
  const axisDates = Array.from({ length: days }, (_, index) => addCalendarDays(start, index)).filter((date) => showWeekends || ![0, 6].includes(date.getDay()));
  const datePosition = (date: Date) => axisDates.filter((item) => calendarDayNumber(item) < calendarDayNumber(date)).length;
  function positionFor(first: Date, last: Date) {
    if (!ganttPosition(first, last, start, days)) return null;
    const offset = datePosition(first), end = datePosition(last);
    return end > offset ? { offset, duration: end - offset } : null;
  }
  const resourceWidth = showDetails ? 320 : 176;
  const markerId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [dragResource, setDragResource] = React.useState<string | null>(null);
  const width = scale === "day" ? 48 : scale === "week" ? 32 : scale === "year" ? 5 : 16;
  const rows: { resource: GanttResource; depth: number }[] = [];
  function collect(items: readonly GanttResource[], depth: number) {
    for (const resource of items) {
      rows.push({ resource, depth });
      if (!collapsed.has(resource.id)) collect(resource.children ?? [], depth + 1);
    }
  }
  collect(resources, 0);
  const dateFormat = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
  function resize(event: GanttEvent, amount: number) {
    const end = addCalendarDays(event.end, amount);
    if (calendarDayNumber(end) > calendarDayNumber(event.start)) onEventChange?.({ ...event, end });
  }
  return <div data-slot="gantt" className={cn("max-w-full overflow-auto rounded-lg border border-border", className)}>
    <div className="relative" style={{ minWidth: resourceWidth + axisDates.length * width }}>
      <div className="flex h-12 border-b bg-muted/50 text-xs font-medium">
        <div className="sticky left-0 z-20 flex shrink-0 items-center justify-between border-r bg-card px-3" style={{ width: resourceWidth }}>{labels.resources}{showDetails && <span>{labels.progress}</span>}</div>
        <div aria-label={labels.timeline} className="relative flex flex-1">{axisDates.map((date, index) => <div key={index} className="shrink-0 border-r border-border/50 pt-3 text-center text-muted-foreground" style={{ width }}>{index % (scale === "year" ? 30 : scale === "month" || scale === "quarter" ? 7 : scale === "week" ? 2 : 1) === 0 ? dateFormat.format(date) : ""}</div>)}</div>
      </div>
      {!rows.length && <p className="p-6 text-sm text-muted-foreground">{labels.empty}</p>}
      {rows.map(({ resource, depth }, rowIndex) => <div key={resource.id} className="flex h-14 border-b last:border-b-0">
        <div className="sticky left-0 z-10 flex shrink-0 items-center gap-1 border-r bg-card pr-2 text-sm" style={{ paddingLeft: 12 + depth * 16, width: resourceWidth }} draggable={!!onResourceReorder && depth > 0} onDragStart={(event) => { setDragResource(resource.id); event.dataTransfer.setData("text/plain", resource.id); }} onDragOver={(event) => { if (dragResource) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); if (dragResource) onResourceReorder?.(dragResource, resource.id); setDragResource(null); }} onDragEnd={() => setDragResource(null)}>
          {resource.children?.length ? <button type="button" aria-label={`${collapsed.has(resource.id) ? labels.expand : labels.collapse} ${resource.title}`} aria-expanded={!collapsed.has(resource.id)} className="rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setCollapsed((current) => { const next = new Set(current); if (next.has(resource.id)) next.delete(resource.id); else next.add(resource.id); return next; })}>{collapsed.has(resource.id) ? <IconChevronRight className="size-3.5" /> : <IconChevronDown className="size-3.5" />}</button> : <span className="w-5 shrink-0" />}
          <span className="min-w-0 flex-1 truncate">{resource.title}{showCapacity && resource.capacity && <span className="mt-1 block text-xs tabular-nums text-muted-foreground">{Math.round(events.filter((event) => event.resourceId === resource.id).reduce((sum, event) => sum + Math.max(0, Math.min(days, calendarDayNumber(event.end) - calendarDayNumber(start)) - Math.max(0, calendarDayNumber(event.start) - calendarDayNumber(start))) * 8, 0) / resource.capacity * 100)}% {labels.capacity}</span>}</span>
          {showDetails && <span className="text-xs tabular-nums text-muted-foreground">{events.find((event) => event.resourceId === resource.id)?.progress ?? 0}%</span>}
          {onResourceReorder && depth > 0 && <span className="flex"><button type="button" aria-label={`${labels.moveUp} ${resource.title}`} className="rounded p-1 focus-visible:ring-2 focus-visible:ring-ring" disabled={rowIndex < 2} onClick={() => { const target = rows[rowIndex - 1]; if (target && target.depth === depth) onResourceReorder(resource.id, target.resource.id); }}><IconArrowUp className="size-3" /></button><button type="button" aria-label={`${labels.moveDown} ${resource.title}`} className="rounded p-1 focus-visible:ring-2 focus-visible:ring-ring" disabled={rowIndex === rows.length - 1} onClick={() => { const target = rows[rowIndex + 1]; if (target && target.depth === depth) onResourceReorder(resource.id, target.resource.id); }}><IconArrowDown className="size-3" /></button></span>}
        </div>
        <div className="relative flex-1" onDragOver={(event) => { if (drag.current && onEventChange) event.preventDefault(); }} onDrop={(event) => {
          event.preventDefault();
          const current = drag.current;
          drag.current = null;
          const item = events.find((candidate) => candidate.id === current?.id);
          if (!item || !current || !onEventChange) return;
          const offset = Math.max(0, Math.min(axisDates.length, Math.round((event.clientX - event.currentTarget.getBoundingClientRect().left) / width) - current.grabOffset));
          if (current.mode === "resize") {
            const end = (axisDates[offset] ?? addCalendarDays(axisDates.at(-1) ?? start, 1));
            if (calendarDayNumber(end) > calendarDayNumber(item.start)) onEventChange({ ...item, end });
          } else onEventChange({ ...moveGanttEvent(item, calendarDayNumber((axisDates[offset] ?? addCalendarDays(axisDates.at(-1) ?? start, 1))) - calendarDayNumber(item.start)), resourceId: resource.id });
        }}>
          <div aria-hidden className="pointer-events-none absolute inset-0 flex">{axisDates.map((date, index) => <div key={index} className={cn("h-full shrink-0 border-r border-border/40", [0, 6].includes(date.getDay()) && (showWeekends ? "bg-muted/40" : "bg-muted"))} style={{ width }} />)}</div>
          {onSlotSelect && !events.some((event) => event.resourceId === resource.id) && !resource.children?.length && <button type="button" className="absolute top-3 left-2 rounded-md border border-dashed border-primary px-3 py-1 text-xs text-primary outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring" onClick={() => onSlotSelect(resource.id, start)}>{labels.schedule}</button>}
          {events.filter((event) => event.resourceId === resource.id).map((event) => {
            const position = positionFor(event.start, event.kind === "milestone" ? addCalendarDays(event.start, 1) : event.end);
            if (!position) return null;
            const editable = !!onEventChange && event.kind !== "summary";
            const baseline = event.baseline ? positionFor(event.baseline.start, event.baseline.end) : null;
            return <React.Fragment key={event.id}>{baseline && <span aria-hidden className="absolute top-11 h-1 rounded bg-muted-foreground/40" style={{ left: baseline.offset * width, width: baseline.duration * width }} />}<div className={cn("absolute top-3 flex h-8 items-stretch overflow-hidden rounded-md bg-primary text-primary-foreground", event.kind === "summary" && "top-4 h-5 rounded-none bg-primary/60", event.kind === "milestone" && "top-4 size-5 rotate-45 rounded-sm")} style={{ left: position.offset * width + 2, width: event.kind === "milestone" ? 20 : Math.max(12, position.duration * width - 4) }}>
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 bg-primary-foreground/20" style={{ width: `${Math.max(0, Math.min(100, event.progress ?? 0))}%` }} />
              <button type="button" draggable={editable} onDragStart={(dragEvent) => {
                drag.current = { id: event.id, mode: "move", grabOffset: Math.round((dragEvent.clientX - dragEvent.currentTarget.getBoundingClientRect().left) / width) };
                dragEvent.dataTransfer.setData("text/plain", event.id);
              }} onDragEnd={() => { drag.current = null; }} onClick={() => { if (editable) onEventSelect?.(event); }} onKeyDown={(keyEvent) => {
                if (!editable || !onEventChange || !["ArrowLeft", "ArrowRight"].includes(keyEvent.key)) return;
                keyEvent.preventDefault();
                onEventChange(moveGanttEvent(event, keyEvent.key === "ArrowRight" ? 1 : -1));
              }} aria-label={`${event.title}, ${dateFormat.format(event.start)} – ${dateFormat.format(event.end)}. ${labels.move}`} className="relative min-w-0 flex-1 truncate px-2 text-left text-xs outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-foreground">{event.kind === "milestone" ? <span className="sr-only">{event.title}</span> : event.title}</button>
              {editable && event.kind !== "milestone" && <button type="button" aria-label={`${labels.resize} ${event.title}`} title={labels.resize} className="relative w-3 shrink-0 cursor-ew-resize border-l border-primary-foreground/30 outline-none focus-visible:bg-primary-foreground/30" draggable onDragStart={(dragEvent) => { dragEvent.stopPropagation(); drag.current = { id: event.id, mode: "resize", grabOffset: 0 }; dragEvent.dataTransfer.setData("text/plain", event.id); }} onDragEnd={() => { drag.current = null; }} onKeyDown={(keyEvent) => { if (["ArrowLeft", "ArrowRight"].includes(keyEvent.key)) { keyEvent.preventDefault(); resize(event, keyEvent.key === "ArrowRight" ? 1 : -1); } }} onClick={() => onEventSelect?.(event)} />}
            </div></React.Fragment>;
          })}
        </div>
      </div>)}
      {showDependencies && <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 text-primary" width={resourceWidth + axisDates.length * width} height={48 + rows.length * 56}><defs><marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" /></marker></defs>{events.flatMap((event) => (event.dependencies ?? []).map((id) => {
        const predecessor = events.find((item) => item.id === id);
        const fromRow = rows.findIndex((row) => row.resource.id === predecessor?.resourceId), toRow = rows.findIndex((row) => row.resource.id === event.resourceId);
        if (!predecessor || fromRow < 0 || toRow < 0) return null;
        const from = calendarDayNumber(predecessor.end) - calendarDayNumber(start), to = calendarDayNumber(event.start) - calendarDayNumber(start);
        if (from < 0 || from > days || to < 0 || to > days) return null;
        const x1 = resourceWidth + datePosition(predecessor.end) * width, x2 = resourceWidth + datePosition(event.start) * width, y1 = 48 + fromRow * 56 + 28, y2 = 48 + toRow * 56 + 28;
        return <path key={`${id}-${event.id}`} d={`M${x1},${y1} H${Math.max(x1 + 10, x2 - 12)} V${y2} H${x2 - 2}`} fill="none" stroke="currentColor" strokeWidth={1.5} markerEnd={`url(#${markerId})`} />;
      }))}</svg>}
    </div>
  </div>;
}
