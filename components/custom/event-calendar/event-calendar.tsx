"use client"

import * as React from "react"
import { IconCalendarEvent, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button/button"
import { cn } from "@/utils/cn"

export type CalendarView = "month" | "week" | "three-day" | "day" | "agenda" | "resource"
export type CalendarResource = { id: string; label: string; detail?: string }
export type CalendarEvent = { id: string; title: string; start: Date; end: Date; resourceId?: string; detail?: string; tone?: "default" | "success" | "warning" | "destructive" }
export type TimeRangeSelection = { date: Date; start: string; end: string; resourceId?: string }

export type EventCalendarProps = {
  events: CalendarEvent[]
  date?: Date
  onDateChange?: (date: Date) => void
  view?: CalendarView
  onViewChange?: (view: CalendarView) => void
  resources?: CalendarResource[]
  showWeekends?: boolean
  selectable?: boolean
  onTimeRangeSelect?: (range: TimeRangeSelection) => void
  onEventSelect?: (event: CalendarEvent) => void
  renderEvent?: (event: CalendarEvent) => React.ReactNode
  showToolbar?: boolean
  weekStartsOn?: 0 | 1
  highlightDate?: boolean
  className?: string
  locale?: string
}

const hours = Array.from({ length: 10 }, (_, index) => index + 8)
const weekDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function sameDay(left: Date, right: Date) { return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() }
function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 0) { const start = new Date(date); start.setDate(date.getDate() - ((date.getDay() - weekStartsOn + 7) % 7)); start.setHours(0, 0, 0, 0); return start }
function addDays(date: Date, amount: number) { const next = new Date(date); next.setDate(next.getDate() + amount); return next }
function timeLabel(date: Date) { return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(date) }
function formatDay(date: Date, locale: string, options: Intl.DateTimeFormatOptions) { return new Intl.DateTimeFormat(locale, options).format(date) }

function EventCalendar({ events, date: dateProp, onDateChange, view: viewProp, onViewChange, resources = [], showWeekends = true, selectable = false, onTimeRangeSelect, onEventSelect, renderEvent, showToolbar = true, weekStartsOn = 0, highlightDate = true, className, locale = "en-US" }: EventCalendarProps) {
  const [internalDate, setInternalDate] = React.useState(() => { const value = new Date(); value.setHours(0, 0, 0, 0); return value })
  const [internalView, setInternalView] = React.useState<CalendarView>("week")
  const [selection, setSelection] = React.useState<{ date: Date; hour: number; resourceId?: string } | null>(null)
  const selectionRef = React.useRef<{ date: Date; hour: number; resourceId?: string } | null>(null)
  const date = dateProp ?? internalDate
  const view = viewProp ?? internalView
  const setDate = (next: Date) => { if (dateProp === undefined) setInternalDate(next); onDateChange?.(next) }
  const setView = (next: CalendarView) => { if (viewProp === undefined) setInternalView(next); onViewChange?.(next) }
  const rangeStart = startOfWeek(date, weekStartsOn)
  const days = Array.from({ length: 7 }, (_, index) => addDays(rangeStart, index)).filter((day) => showWeekends || (day.getDay() !== 0 && day.getDay() !== 6))
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  const monthGridStart = startOfWeek(monthStart, weekStartsOn)
  const monthDays = Array.from({ length: 42 }, (_, index) => addDays(monthGridStart, index))
  const displayedDays = view === "day" ? [date] : view === "three-day" ? Array.from({ length: 3 }, (_, index) => addDays(date, index)) : days
  const eventTone = (event: CalendarEvent) => event.tone === "success" ? "border-success/30 bg-success/10 text-success-foreground" : event.tone === "warning" ? "border-warning/30 bg-warning/10 text-warning-foreground" : event.tone === "destructive" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-primary/25 bg-primary/10 text-foreground"
  const eventsForDay = (day: Date, resourceId?: string) => events.filter((event) => sameDay(event.start, day) && (!resourceId || event.resourceId === resourceId)).sort((a, b) => a.start.getTime() - b.start.getTime())

  function navigate(direction: number) {
    const next = new Date(date)
    if (view === "month") next.setMonth(next.getMonth() + direction)
    else if (view === "day") next.setDate(next.getDate() + direction)
    else if (view === "three-day") next.setDate(next.getDate() + direction * 3)
    else next.setDate(next.getDate() + direction * 7)
    setDate(next)
  }
  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!selectable) return
    if ((event.target as HTMLElement).closest("button")) return
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-time-slot]")
    if (!target) return
    const dateValue = target.dataset.date
    const hour = Number(target.dataset.hour)
    if (!dateValue || !Number.isFinite(hour)) return
    const resourceId = target.dataset.resourceId
    const start = { date: new Date(dateValue), hour, ...(resourceId ? { resourceId } : {}) }
    selectionRef.current = start
    setSelection(start)
  }
  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const start = selectionRef.current
    if (!start) return
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-time-slot]")
    const endDate = target?.dataset.date ? new Date(target.dataset.date) : start.date
    const endHour = target?.dataset.hour ? Number(target.dataset.hour) : start.hour
    const same = sameDay(start.date, endDate)
    const low = same && endHour < start.hour ? endHour : start.hour
    const high = same ? Math.max(start.hour, endHour) + 1 : start.hour + 1
    const toTime = (value: number) => `${String(Math.floor(value)).padStart(2, "0")}:00`
    onTimeRangeSelect?.({ date: start.date, start: toTime(low), end: toTime(high), resourceId: start.resourceId })
    selectionRef.current = null
    setSelection(null)
  }

  const eventButton = (event: CalendarEvent, compact = false) => <button key={event.id} type="button" onClick={() => onEventSelect?.(event)} title={`${event.title} · ${timeLabel(event.start)}`} className={cn("block w-full truncate rounded-md border px-1.5 py-1 text-left text-[11px] leading-4 transition-colors hover:brightness-95", eventTone(event), compact && "px-1 text-[10px]")}>{renderEvent ? renderEvent(event) : <><span className="font-medium">{event.title}</span><span className="ml-1 opacity-70">{timeLabel(event.start)}</span></>}</button>

  return <section aria-label="Event calendar" className={cn("w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card", className)}>
    {showToolbar && <header className="flex flex-wrap items-center gap-2 border-b p-3"><div className="flex min-w-max flex-1 items-center gap-2"><Button size="icon-sm" variant="ghost" aria-label="Previous period" onClick={() => navigate(-1)}><IconChevronLeft /></Button><Button size="sm" variant="outline" onClick={() => setDate(new Date())}>Today</Button><Button size="icon-sm" variant="ghost" aria-label="Next period" onClick={() => navigate(1)}><IconChevronRight /></Button><h3 className="ml-1 truncate text-sm font-semibold">{view === "month" ? formatDay(date, locale, { month: "long", year: "numeric" }) : view === "day" ? formatDay(date, locale, { weekday: "long", month: "long", day: "numeric" }) : `${formatDay(displayedDays[0], locale, { month: "short", day: "numeric" })} – ${formatDay(displayedDays.at(-1)!, locale, { month: "short", day: "numeric", year: "numeric" })}`}</h3></div><div className="flex flex-wrap gap-1" role="group" aria-label="Calendar view">{(["month", "week", "day", "agenda", ...(resources.length ? ["resource" as const] : [])] as CalendarView[]).map((item) => <Button key={item} type="button" size="sm" variant={view === item ? "secondary" : "ghost"} aria-pressed={view === item} onClick={() => setView(item)} className="capitalize">{item === "resource" ? "Rooms" : item}</Button>)}</div></header>}
    {view === "month" ? <div className="p-2"><div className="grid grid-cols-7 border-b pb-2 text-center text-xs text-muted-foreground">{(weekStartsOn ? [...weekDayLabels.slice(1), weekDayLabels[0]] : weekDayLabels).map((day) => <span key={day}>{day}</span>)}</div><div className="grid grid-cols-7">{monthDays.map((day) => <div key={day.toISOString()} data-month-day={day.toISOString()} className={cn("min-h-20 border-b border-r p-1", day.getMonth() !== date.getMonth() && "bg-muted/20 text-muted-foreground")}><button type="button" onClick={() => setDate(day)} className={cn("mb-1 grid size-6 place-items-center rounded-full text-xs", highlightDate && sameDay(day, date) && "bg-primary text-primary-foreground")}>{day.getDate()}</button><div className="grid gap-1">{eventsForDay(day).slice(0, 2).map((event) => eventButton(event, true))}</div></div>)}</div></div>
      : view === "agenda" ? <div className="grid max-h-96 gap-3 overflow-y-auto p-4">{displayedDays.map((day) => <section key={day.toISOString()} className="grid gap-2"><h4 className="text-xs font-semibold text-muted-foreground">{formatDay(day, locale, { weekday: "long", month: "short", day: "numeric" })}</h4>{eventsForDay(day).map((event) => <button key={event.id} type="button" onClick={() => onEventSelect?.(event)} className="flex items-center gap-3 rounded-lg border p-2 text-left hover:bg-muted"><span className="w-16 shrink-0 text-xs text-muted-foreground">{timeLabel(event.start)}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{event.title}</span>{event.detail && <span className="text-xs text-muted-foreground">{event.detail}</span>}</span></button>)}{eventsForDay(day).length === 0 && <p className="text-xs text-muted-foreground">No events scheduled.</p>}</section>)}</div>
      : <div className="max-h-[34rem] overflow-auto" onPointerDown={selectable ? handlePointerDown : undefined} onPointerUp={selectable ? handlePointerUp : undefined} onPointerCancel={() => { selectionRef.current = null; setSelection(null) }}>
        <div className="grid min-w-[680px]" style={{ gridTemplateColumns: view === "resource" ? `80px repeat(${resources.length}, minmax(160px, 1fr))` : `64px repeat(${displayedDays.length}, minmax(112px, 1fr))` }}>
          <div className="sticky top-0 z-10 border-b bg-card p-2 text-xs text-muted-foreground">{view === "resource" ? "Time" : ""}</div>
          {(view === "resource" ? resources : displayedDays).map((item) => { const label = view === "resource" ? (item as CalendarResource).label : formatDay(item as Date, locale, { weekday: "short", day: "numeric" }); return <div key={view === "resource" ? (item as CalendarResource).id : (item as Date).toISOString()} className="sticky top-0 z-10 border-b border-l bg-card p-2 text-center text-xs font-medium">{label}</div>})}
          {hours.map((hour) => <React.Fragment key={hour}><div className="h-12 border-b p-2 text-right text-[10px] text-muted-foreground">{formatDay(new Date(2020, 0, 1, hour), locale, { hour: "numeric" })}</div>{(view === "resource" ? resources : displayedDays).map((item) => { const day = view === "resource" ? date : item as Date; const resourceId = view === "resource" ? (item as CalendarResource).id : undefined; const entries = eventsForDay(day, resourceId).filter((event) => event.start.getHours() === hour); const isSelected = selection && sameDay(selection.date, day) && selection.hour === hour && selection.resourceId === resourceId; return <div key={`${day.toDateString()}-${resourceId ?? "day"}-${hour}`} data-time-slot="true" data-date={day.toISOString()} data-hour={hour} data-resource-id={resourceId} className={cn("relative min-h-12 border-b border-l p-1", selectable && "touch-none cursor-crosshair", isSelected && "bg-primary/10")}>{entries.map((event) => eventButton(event))}</div>})}</React.Fragment>)}
        </div>
        {selectable && <p className="border-t bg-muted/30 px-3 py-2 text-xs text-muted-foreground">Drag across a time range to create a booking.</p>}
      </div>}
    {!events.length && <div className="border-t px-3 py-2 text-xs text-muted-foreground"><IconCalendarEvent className="mr-1 inline size-3.5" />No events in this view.</div>}
  </section>
}

export { EventCalendar }
