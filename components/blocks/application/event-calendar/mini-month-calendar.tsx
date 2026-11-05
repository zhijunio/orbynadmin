"use client"

import { useMemo, useState } from "react"
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button/button"
import { Checkbox } from "@/components/ui/checkbox/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

type MiniEvent = { id: string; title: string; start: Date; end: Date; calendar: string; tone: string; allDay?: boolean }
type CalendarItem = { id: string; title: string; tone: string }

const dateAt = (day: number, hour = 9, minute = 0) => new Date(2026, 6, day, hour, minute)
const initialCalendars: CalendarItem[] = [
  { id: "work", title: "Work", tone: "bg-primary" },
  { id: "meetings", title: "Meetings", tone: "bg-violet-500" },
  { id: "focus", title: "Focus", tone: "bg-warning" },
  { id: "personal", title: "Personal", tone: "bg-success" },
  { id: "travel", title: "Travel", tone: "bg-destructive" },
]
const seedItems: MiniEvent[] = [
  { id: "weekly", title: "Weekly planning", start: dateAt(6, 10), end: dateAt(6, 11), calendar: "meetings", tone: "border-violet-500/25 bg-violet-500/10" },
  { id: "design", title: "Design review", start: dateAt(6, 14), end: dateAt(6, 15), calendar: "work", tone: "border-primary/25 bg-primary/10" },
  { id: "one-on-one", title: "1:1 with Leo", start: dateAt(7, 11), end: dateAt(7, 12), calendar: "meetings", tone: "border-violet-500/25 bg-violet-500/10" },
  { id: "focus-block", title: "Focus block", start: dateAt(7, 14), end: dateAt(7, 16), calendar: "focus", tone: "border-warning/25 bg-warning/15" },
  { id: "lunch", title: "Lunch with Nora", start: dateAt(8, 12, 30), end: dateAt(8, 13, 30), calendar: "personal", tone: "border-success/25 bg-success/15" },
  { id: "interview", title: "Interview: System design", start: dateAt(9, 10), end: dateAt(9, 11), calendar: "meetings", tone: "border-violet-500/25 bg-violet-500/10" },
  { id: "roadmap", title: "Roadmap review", start: dateAt(9, 13), end: dateAt(9, 15), calendar: "meetings", tone: "border-violet-500/25 bg-violet-500/10" },
  { id: "client", title: "Client call: Northstar", start: dateAt(9, 13, 30), end: dateAt(9, 14, 30), calendar: "meetings", tone: "border-violet-500/25 bg-violet-500/10" },
  { id: "offsite", title: "Offsite", start: dateAt(10), end: dateAt(10, 17), calendar: "travel", tone: "border-destructive/25 bg-destructive/10", allDay: true },
]

function mondayOf(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  monday.setDate(date.getDate() - ((date.getDay() + 6) % 7))
  return monday
}

function formatDay(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en", options).format(date)
}

export function MiniMonthCalendar() {
  const [date, setDate] = useState(new Date(2026, 6, 8))
  const [calendars, setCalendars] = useState(initialCalendars)
  const [enabledCalendars, setEnabledCalendars] = useState(() => new Set(initialCalendars.map((calendar) => calendar.id)))
  const [events, setEvents] = useState(seedItems)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [view, setView] = useState("Week")
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  const monthGridStart = mondayOf(monthStart)
  const monthDays = Array.from({ length: 35 }, (_, index) => {
    const day = new Date(monthGridStart)
    day.setDate(monthGridStart.getDate() + index)
    return day
  })
  const weekStart = mondayOf(date)
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + index)
    return day
  })
  const visibleEvents = useMemo(() => events.filter((event) => enabledCalendars.has(event.calendar)), [enabledCalendars, events])
  const upcomingEvents = visibleEvents.filter((event) => event.start >= new Date(date.getFullYear(), date.getMonth(), date.getDate()) && event.start <= new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6, 23, 59)).sort((left, right) => left.start.getTime() - right.start.getTime()).slice(0, 4)
  const monthLabel = formatDay(date, { month: "long", year: "numeric" })
  const rangeLabel = `${formatDay(weekDays[0], { month: "long", day: "numeric" })} - ${formatDay(weekDays[6], { day: "numeric" })}, ${formatDay(weekDays[0], { year: "numeric" })}`

  function setMonth(offset: number) {
    const next = new Date(date)
    next.setMonth(next.getMonth() + offset)
    setDate(next)
  }

  function addCalendar() {
    const id = `calendar-${calendars.length + 1}`
    const next = { id, title: "New calendar", tone: "bg-primary" }
    setCalendars((current) => [...current, next])
    setEnabledCalendars((current) => new Set(current).add(id))
  }

  function createEvent() {
    const start = new Date(date)
    start.setHours(15, 0, 0, 0)
    const end = new Date(start)
    end.setHours(16)
    setEvents((current) => [...current, { id: `new-${Date.now()}`, title: title || "New event", start, end, calendar: "work", tone: "border-primary/25 bg-primary/10" }])
    setTitle("")
    setDialogOpen(false)
  }

  return <div className="grid min-h-[760px] overflow-hidden rounded-xl border bg-card lg:grid-cols-[280px_minmax(0,1fr)]">
    <aside className="border-b p-4 lg:border-b-0 lg:border-r lg:p-5">
      <div>
        <div className="mb-3 flex items-center justify-between"><Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={() => setMonth(-1)}><IconChevronLeft /></Button><h2 className="text-sm font-semibold">{monthLabel}</h2><Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={() => setMonth(1)}><IconChevronRight /></Button></div>
        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => <span key={day} className="py-1">{day}</span>)}</div>
        <div className="grid grid-cols-7">{monthDays.map((day) => {
          const dayHasEvents = visibleEvents.some((event) => event.start.toDateString() === day.toDateString())
          return <button key={day.toISOString()} type="button" onClick={() => setDate(day)} className={`relative mx-auto grid size-9 place-items-center rounded-lg text-xs ${day.getMonth() !== date.getMonth() ? "text-muted-foreground" : ""} ${day.toDateString() === date.toDateString() ? "bg-foreground text-background" : "hover:bg-muted"}`}><span>{day.getDate()}</span>{dayHasEvents && <span className={`absolute bottom-1 size-1 rounded-full ${day.toDateString() === date.toDateString() ? "bg-background" : "bg-foreground/50"}`} />}</button>
        })}</div>
      </div>
      <div className="mt-5">
        <h3 className="mb-3 text-xs font-medium text-muted-foreground">Up Next</h3>
        <div className="grid gap-3">{upcomingEvents.map((event) => <button key={event.id} type="button" onClick={() => setDate(event.start)} className="grid gap-0.5 text-left"><span className="flex items-center gap-2 text-sm font-medium"><span className={`size-2 rounded-full ${calendars.find((calendar) => calendar.id === event.calendar)?.tone ?? "bg-primary"}`} />{event.title}</span><span className="pl-4 text-xs text-muted-foreground">{formatDay(event.start, { weekday: "short", month: "short", day: "numeric" })} <span className="px-1">·</span>{formatDay(event.start, { hour: "numeric", minute: "2-digit" })}</span></button>)}</div>
      </div>
      <div className="mt-5">
        <h3 className="mb-2 text-xs font-medium text-muted-foreground">My Calendars</h3>
        <div className="grid gap-1">{calendars.map((calendar) => <label key={calendar.id} className="flex h-8 items-center gap-2 text-sm"><Checkbox checked={enabledCalendars.has(calendar.id)} onCheckedChange={(checked) => setEnabledCalendars((current) => { const next = new Set(current); if (checked) next.add(calendar.id); else next.delete(calendar.id); return next })} className="size-4" /><span className={`size-3 rounded-sm ${calendar.tone}`} />{calendar.title}</label>)}</div>
        <Button variant="ghost" className="mt-1 h-8 justify-start px-1 text-muted-foreground" onClick={addCalendar}><IconPlus />New calendar</Button>
      </div>
    </aside>
    <section className="grid min-w-0 grid-rows-[auto_auto_minmax(0,1fr)]">
      <header className="flex min-h-12 flex-wrap items-center gap-2 border-b px-3 py-2"><Button size="sm" variant="outline" onClick={() => setDate(new Date())}>Today</Button><Select value={view} onValueChange={setView}><SelectTrigger aria-label="Calendar view" className="h-8 w-[104px]"><span>{view}</span></SelectTrigger><SelectContent position="popper" align="start"><SelectItem value="Week">Week</SelectItem><SelectItem value="Day">Day</SelectItem><SelectItem value="Month">Month</SelectItem></SelectContent></Select><Button variant="ghost" size="icon-sm" aria-label="Previous week" onClick={() => { const next = new Date(date); next.setDate(next.getDate() - 7); setDate(next) }}><IconChevronLeft /></Button><Button variant="ghost" size="icon-sm" aria-label="Next week" onClick={() => { const next = new Date(date); next.setDate(next.getDate() + 7); setDate(next) }}><IconChevronRight /></Button><h2 className="min-w-32 flex-1 text-sm font-semibold">{rangeLabel}</h2><Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />New event</Button></header>
      <div className="grid grid-cols-[64px_repeat(7,minmax(80px,1fr))] border-b text-xs"><span /><div className="col-span-7 grid grid-cols-7">{weekDays.map((day) => <div key={day.toISOString()} className="border-l px-2 py-2 font-medium">{formatDay(day, { weekday: "short" })} {day.getDate()}</div>)}</div><span className="px-2 py-2 text-muted-foreground">All day</span><div className="col-span-7 grid grid-cols-7">{weekDays.map((day) => <div key={day.toISOString()} className="min-h-8 border-l p-1">{visibleEvents.filter((event) => event.allDay && event.start.toDateString() === day.toDateString()).map((event) => <div key={event.id} className={`truncate rounded-md border px-1.5 py-1 text-[11px] ${event.tone}`}>{event.title}</div>)}</div>)}</div></div>
      <div className="min-h-0 overflow-auto"><div className="relative grid min-w-[624px] grid-cols-[64px_repeat(7,minmax(80px,1fr))]">
        {Array.from({ length: 14 }, (_, row) => {
          const hour = row + 7
          return <div key={hour} className="contents"><div className="h-16 border-b px-2 pt-1 text-right text-[11px] text-muted-foreground">{formatDay(new Date(2020, 0, 1, hour), { hour: "numeric" })}</div>{weekDays.map((day) => <div key={`${day.toISOString()}-${hour}`} className="h-16 border-b border-l" />)}</div>
        })}
        <div className="pointer-events-none absolute inset-y-0 left-16 right-0 grid grid-cols-7">
          {weekDays.map((day) => {
            const dayEvents = visibleEvents.filter((event) => !event.allDay && event.start.toDateString() === day.toDateString()).sort((left, right) => left.start.getTime() - right.start.getTime())
            const lanes: number[] = []
            const positioned = dayEvents.map((event) => {
              const start = event.start.getHours() + event.start.getMinutes() / 60
              const end = event.end.getHours() + event.end.getMinutes() / 60
              let lane = lanes.findIndex((laneEnd) => laneEnd <= start)
              if (lane === -1) lane = lanes.length
              lanes[lane] = end
              return { event, start, end, lane }
            })
            const laneCount = Math.max(1, lanes.length)
            return <div key={day.toISOString()} className="relative h-[896px] border-l">{positioned.map(({ event, start, end, lane }) => <button key={event.id} type="button" title={event.title} style={{ top: `${(start - 7) * 64}px`, height: `${Math.max(42, (end - start) * 64 - 4)}px`, left: `calc(${lane * 100 / laneCount}% + 3px)`, width: `calc(${100 / laneCount}% - 6px)` }} className={`pointer-events-auto absolute overflow-hidden rounded-md border p-1.5 text-left text-xs leading-4 ${event.tone}`}><span className="line-clamp-2">{event.title}</span></button>)}</div>
          })}
        </div>
      </div></div>
    </section>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New event</DialogTitle><DialogDescription>Add an event to this week.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Event title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a title" /></label><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createEvent}>Create event</Button></DialogFooter></DialogContent></Dialog>
  </div>
}
