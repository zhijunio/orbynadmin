"use client"

import { useMemo, useState } from "react"
import { IconChevronLeft, IconChevronRight, IconPlus, IconRepeat } from "@tabler/icons-react"

import { EventCalendar, type CalendarEvent, type CalendarView } from "@/components/custom/event-calendar/event-calendar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

const eventAt = (day: number, hour = 9, minute = 0) => new Date(2026, 6, day, hour, minute)

const initialEvents: CalendarEvent[] = [
  { id: "time-off", title: "Time off", start: eventAt(1), end: eventAt(3, 17), tone: "success" },
  { id: "one-on-one", title: "1:1 with Leo", start: eventAt(2, 11), end: eventAt(2, 12), detail: "personal", tone: "default" },
  ...[6, 13, 20, 27].map((day) => ({ id: `weekly-${day}`, title: "Weekly planning", start: eventAt(day, 9, 30), end: eventAt(day, 10, 30), detail: "repeat", tone: "default" as const })),
  { id: "design-review", title: "Design review", start: eventAt(7, 10), end: eventAt(7, 11), detail: "work", tone: "default" },
  { id: "offsite", title: "Offsite", start: eventAt(9), end: eventAt(10, 17), tone: "destructive" },
  { id: "roadmap", title: "Roadmap review", start: eventAt(14, 13), end: eventAt(14, 14), detail: "work", tone: "default" },
  { id: "focus", title: "Focus block", start: eventAt(15, 14), end: eventAt(15, 16), tone: "warning" },
  { id: "client-call", title: "Client call: Northwind", start: eventAt(17, 15), end: eventAt(17, 16), detail: "work", tone: "default" },
  { id: "interview", title: "Interview: Systems", start: eventAt(21, 10), end: eventAt(21, 11), tone: "default" },
  { id: "quarterly", title: "Quarterly planning", start: eventAt(23, 13), end: eventAt(23, 14), detail: "work", tone: "default" },
  { id: "monthly", title: "Monthly review", start: eventAt(28, 10), end: eventAt(28, 11), detail: "repeat", tone: "default" },
  { id: "release", title: "Release day", start: eventAt(30), end: eventAt(30, 17), detail: "work", tone: "default" },
]

function eventTime(event: CalendarEvent) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(event.start)
}

function attendeeMarks(event: CalendarEvent) {
  const hasAttendees = event.detail === "work" || event.detail === "repeat" || event.id === "one-on-one"
  if (!hasAttendees) return null
  const marks = event.title.includes("Quarterly") || event.title.includes("Monthly") ? ["M", "K", "+1"] : ["M", "K"]
  return <span className="flex shrink-0 -space-x-1">{marks.map((mark, index) => <span key={`${mark}-${index}`} className="grid size-4 place-items-center rounded-full border border-background bg-muted text-[8px] text-foreground">{mark}</span>)}</span>
}

function calendarDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function PersonalMonthGrid({ date, events, onSelect, onMove, onDaySelect }: { date: Date; events: CalendarEvent[]; onSelect: (event: CalendarEvent) => void; onMove: (eventId: string, day: Date) => void; onDaySelect: (day: Date) => void }) {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstDay = new Date(monthStart)
  firstDay.setDate(monthStart.getDate() - ((monthStart.getDay() + 6) % 7))
  const days = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstDay)
    day.setDate(firstDay.getDate() + index)
    return day
  })
  const weeks = Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7))
  const tone = (event: CalendarEvent) => event.tone === "success" ? "border-success/30 bg-success/10 text-foreground" : event.tone === "warning" ? "border-warning/30 bg-warning/10 text-foreground" : event.tone === "destructive" ? "border-destructive/30 bg-destructive/10 text-foreground" : "border-info/25 bg-info/10 text-foreground"
  return <div className="overflow-auto">
    <div className="grid min-w-[720px] grid-cols-7 border-b text-center text-xs text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day} className="py-2">{day}</span>)}</div>
    {weeks.map((week) => {
      const weekStart = calendarDay(week[0])
      const weekEnd = calendarDay(week[6])
      const positioned = events.flatMap((event) => {
        const start = calendarDay(event.start)
        const end = calendarDay(event.end)
        if (end < weekStart || start > weekEnd) return []
        const startColumn = Math.max(0, Math.round((start.getTime() - weekStart.getTime()) / 86_400_000))
        const endColumn = Math.min(6, Math.round((end.getTime() - weekStart.getTime()) / 86_400_000))
        return [{ event, startColumn, span: endColumn - startColumn + 1 }]
      }).sort((left, right) => left.startColumn - right.startColumn || right.span - left.span)
      const occupied: number[][] = []
      const bars = positioned.map((item) => {
        let row = 0
        while (Array.from({ length: item.span }, (_, index) => item.startColumn + index).some((column) => occupied[row]?.includes(column))) row += 1
        occupied[row] = [...(occupied[row] ?? []), ...Array.from({ length: item.span }, (_, index) => item.startColumn + index)]
        return { ...item, row }
      })
      return <div key={week[0].toISOString()} className="relative grid h-[148px] min-w-[720px] grid-cols-7 border-b">
        {week.map((day) => <button key={day.toISOString()} type="button" onClick={() => onDaySelect(day)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData("text/calendar-event"); if (id) onMove(id, day) }} className={`relative border-r p-1 text-left ${day.getMonth() !== date.getMonth() ? "bg-muted/20 text-muted-foreground" : ""}`}><span className="absolute bottom-2 right-2 text-xs">{day.getDate()}</span></button>)}
        {bars.map(({ event, startColumn, span, row }) => <button key={`${week[0].toISOString()}-${event.id}`} type="button" draggable onDragStart={(dragEvent) => { dragEvent.dataTransfer.setData("text/calendar-event", event.id); dragEvent.dataTransfer.effectAllowed = "move" }} onClick={() => onSelect(event)} title={`${event.title} · ${eventTime(event)}`} style={{ left: `calc(${startColumn * 100 / 7}% + 4px)`, width: `calc(${span * 100 / 7}% - 8px)`, top: `${6 + row * 26}px` }} className={`absolute z-10 flex h-6 min-w-0 items-center gap-1 truncate rounded-md border px-1.5 text-left text-[11px] ${tone(event)}`}><span className="size-1.5 shrink-0 rounded-full bg-current" />{event.detail === "repeat" && <IconRepeat className="size-3 shrink-0" />}<span className="min-w-0 flex-1 truncate font-medium">{event.title}</span>{span === 1 && event.end.getHours() < 17 && <span className="shrink-0 opacity-60">{eventTime(event)}</span>}{attendeeMarks(event)}</button>)}
      </div>
    })}
  </div>
}

export function PersonalCalendar() {
  const [events, setEvents] = useState(initialEvents)
  const [date, setDate] = useState(new Date(2026, 6, 1))
  const [view, setView] = useState<CalendarView>("month")
  const [calendar, setCalendar] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")
  const [recurrence, setRecurrence] = useState("none")
  const visibleEvents = useMemo(() => events.filter((event) => calendar === "all" || event.detail === calendar || event.detail === "repeat"), [calendar, events])
  const monthLabel = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date)

  function movePeriod(direction: number) {
    const next = new Date(date)
    if (view === "month") next.setMonth(next.getMonth() + direction)
    else next.setDate(next.getDate() + direction * (view === "three-day" ? 3 : view === "week" ? 7 : 1))
    setDate(next)
  }

  function moveEvent(eventId: string, day: Date) {
    setEvents((current) => current.map((event) => {
      if (event.id !== eventId) return event
      const start = new Date(day)
      start.setHours(event.start.getHours(), event.start.getMinutes(), 0, 0)
      const end = new Date(start.getTime() + event.end.getTime() - event.start.getTime())
      return { ...event, start, end }
    }))
  }

  function createEvent() {
    if (activeEventId) {
      setEvents((current) => current.map((event) => {
        if (event.id !== activeEventId) return event
        const start = new Date(event.start)
        const end = new Date(event.end)
        const [startHour, startMinute] = startTime.split(":").map(Number)
        const [endHour, endMinute] = endTime.split(":").map(Number)
        start.setHours(startHour, startMinute, 0, 0)
        end.setHours(endHour, endMinute, 0, 0)
        if (end <= start) end.setDate(end.getDate() + 1)
        return { ...event, title, start, end }
      }))
      setActiveEventId(null)
      setTitle("")
      setDialogOpen(false)
      return
    }
    const start = new Date(date)
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)
    start.setHours(startHour, startMinute, 0, 0)
    const end = new Date(start)
    end.setHours(endHour, endMinute, 0, 0)
    if (end <= start) end.setDate(end.getDate() + 1)
    const occurrences = recurrence === "weekly" ? [0, 7, 14, 21] : recurrence === "daily" ? [0, 1, 2, 3] : [0]
    setEvents((current) => [...current, ...occurrences.map((offset, index) => {
      const occurrenceStart = new Date(start)
      occurrenceStart.setDate(start.getDate() + offset)
      const occurrenceEnd = new Date(end)
      occurrenceEnd.setDate(end.getDate() + offset)
      return { id: `event-${Date.now()}-${index}`, title: title || "New event", start: occurrenceStart, end: occurrenceEnd, detail: recurrence === "none" ? undefined : "repeat", tone: "default" as const }
    })])
    setTitle("")
    setDialogOpen(false)
  }

  return <div className="overflow-hidden rounded-xl border bg-card">
    <header className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
      <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>Today</Button>
      <Select value={view} onValueChange={(value) => setView(value as CalendarView)}>
      <SelectTrigger aria-label="Calendar view" className="h-8 w-[112px]"><span className="capitalize">{view === "three-day" ? "3 days" : view}</span></SelectTrigger>
        <SelectContent position="popper" align="start"><SelectItem value="month">Month</SelectItem><SelectItem value="week">Week</SelectItem><SelectItem value="three-day">3 days</SelectItem><SelectItem value="day">Day</SelectItem><SelectItem value="agenda">Agenda</SelectItem></SelectContent>
      </Select>
      <Button variant="ghost" size="icon-sm" aria-label="Previous period" onClick={() => movePeriod(-1)}><IconChevronLeft /></Button>
      <Button variant="ghost" size="icon-sm" aria-label="Next period" onClick={() => movePeriod(1)}><IconChevronRight /></Button>
      <h2 className="min-w-32 flex-1 text-sm font-semibold">{monthLabel}</h2>
      <Select value={calendar} onValueChange={setCalendar}>
        <SelectTrigger aria-label="Calendars" className="h-8 w-[142px]"><span className="flex items-center gap-0.5"><span className="size-2 rounded-full bg-info" /><span className="size-2 rounded-full bg-success" /><span className="size-2 rounded-full bg-warning" /><span className="size-2 rounded-full bg-destructive" /></span><span className="capitalize">{calendar === "all" ? "Calendars" : calendar}</span></SelectTrigger>
        <SelectContent position="popper" align="start"><SelectItem value="all">Calendars</SelectItem><SelectItem value="personal">Personal</SelectItem><SelectItem value="work">Work</SelectItem></SelectContent>
      </Select>
      <Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />Add event</Button>
    </header>
    {view === "month" ? <PersonalMonthGrid date={date} events={visibleEvents} onSelect={(event) => { setActiveEventId(event.id); setTitle(event.title); setDialogOpen(true) }} onMove={moveEvent} onDaySelect={(day) => { setDate(day); setView("day") }} /> : <EventCalendar
      events={visibleEvents}
      date={date}
      onDateChange={setDate}
      view={view}
      onViewChange={setView}
      showToolbar={false}
      weekStartsOn={1}
      highlightDate={false}
      renderEvent={(event) => <span className="flex min-w-0 items-center gap-1"><span className="size-1.5 shrink-0 rounded-full bg-current" />{event.detail === "repeat" && <IconRepeat className="size-3 shrink-0" />}<span className="min-w-0 flex-1 truncate font-medium">{event.title}</span>{event.end.getHours() < 17 && <span className="shrink-0 opacity-60">{eventTime(event)}</span>}{attendeeMarks(event)}</span>}
      onEventSelect={(event) => { setActiveEventId(event.id); setTitle(event.title); setStartTime(`${String(event.start.getHours()).padStart(2, "0")}:${String(event.start.getMinutes()).padStart(2, "0")}`); setEndTime(`${String(event.end.getHours()).padStart(2, "0")}:${String(event.end.getMinutes()).padStart(2, "0")}`); setDialogOpen(true) }}
      locale="en-US"
      className="!rounded-none !border-0"
    />}
    <Dialog open={dialogOpen} onOpenChange={(nextOpen) => { setDialogOpen(nextOpen); if (!nextOpen) setActiveEventId(null) }}><DialogContent><DialogHeader><DialogTitle>{activeEventId ? "Edit event" : "Add event"}</DialogTitle><DialogDescription>Add a calendar event.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Event title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a title" /></label><div className="grid grid-cols-2 gap-3"><label className="grid gap-1.5 text-sm">Start time<Input aria-label="Start time" type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} /></label><label className="grid gap-1.5 text-sm">End time<Input aria-label="End time" type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} /></label></div>{!activeEventId && <label className="grid gap-1.5 text-sm">Repeat<Select value={recurrence} onValueChange={setRecurrence}><SelectTrigger className="w-full"><span>{recurrence === "none" ? "Does not repeat" : recurrence === "daily" ? "Daily" : "Weekly"}</span></SelectTrigger><SelectContent position="popper" align="start"><SelectItem value="none">Does not repeat</SelectItem><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem></SelectContent></Select></label>}<DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createEvent}>{activeEventId ? "Save changes" : "Add event"}</Button></DialogFooter></DialogContent></Dialog>
  </div>
}
