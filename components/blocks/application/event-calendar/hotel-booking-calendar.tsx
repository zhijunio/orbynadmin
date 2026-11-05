"use client"

import { useMemo, useState } from "react"
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react"
import { demoAvatarUrl } from "@/utils/demo-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

type HotelEvent = { id: string; title: string; day: number; start: number; end: number; kind: "in" | "out" | "job" | "service" | "group"; detail: string; guest?: string; initials?: string; allDay?: boolean }

const events: HotelEvent[] = [
  { id: "meridian", title: "MERIDIAN AGM in house", day: 6, start: 0, end: 0, kind: "group", detail: "Conference · 48 rooms", allDay: true },
  { id: "meridian-2", title: "", day: 7, start: 0, end: 0, kind: "group", detail: "Conference · 48 rooms", allDay: true },
  { id: "meridian-3", title: "", day: 8, start: 0, end: 0, kind: "group", detail: "Conference · 48 rooms", allDay: true },
  { id: "meridian-4", title: "", day: 9, start: 0, end: 0, kind: "group", detail: "Conference · 48 rooms", allDay: true },
  { id: "wedding", title: "Romero wedding", day: 10, start: 0, end: 0, kind: "group", detail: "Wedding party · 26 rooms", allDay: true },
  { id: "wedding-2", title: "", day: 11, start: 0, end: 0, kind: "group", detail: "Wedding party · 26 rooms", allDay: true },
  { id: "johnson-out", title: "Check out: Johnson", day: 6, start: 8, end: 9, kind: "out", detail: "Room 826", guest: "Maya Johnson", initials: "MJ" },
  { id: "chen-out", title: "Check out: Chen", day: 6, start: 9.25, end: 10, kind: "out", detail: "Room 512", guest: "Leo Chen", initials: "LC" },
  { id: "turnover-mon", title: "Turnover round", day: 6, start: 10.4, end: 11.5, kind: "job", detail: "Departure rooms" },
  { id: "wilson-in", title: "Check in: Wilson", day: 6, start: 14.5, end: 15.3, kind: "in", detail: "Harbour Suite 1203", guest: "Ava Wilson", initials: "AW" },
  { id: "meridian-out", title: "Check out: Meridian", day: 6, start: 16, end: 16.7, kind: "out", detail: "Room 402", guest: "Nora Lee", initials: "NL" },
  { id: "ballroom", title: "Ballroom", day: 7, start: 8, end: 17, kind: "group", detail: "Meridian AGM" },
  { id: "check-tue-1", title: "Check out: Rivera", day: 7, start: 8.5, end: 9.2, kind: "out", detail: "Room 311" },
  { id: "check-tue-2", title: "Check out: Patel", day: 7, start: 10, end: 10.7, kind: "out", detail: "Room 714" },
  { id: "turnover-tue", title: "Turnover round", day: 7, start: 11, end: 12, kind: "job", detail: "Departure rooms" },
  { id: "check-tue-in", title: "Check in: Santos", day: 7, start: 15, end: 16, kind: "in", detail: "Junior Suite 1002" },
  { id: "romero-in", title: "Check in: Romero", day: 7, start: 16, end: 16.8, kind: "in", detail: "Suite 908" },
  { id: "rodriguez-out", title: "Check out: Rodriguez", day: 8, start: 7.25, end: 8, kind: "out", detail: "Room 417", guest: "Sofia Rodriguez", initials: "SR" },
  { id: "deep-clean", title: "Deep clean: floor 9", day: 8, start: 9, end: 13, kind: "job", detail: "Floor 9" },
  { id: "johnson-wed-out", title: "Check out: Johnson", day: 8, start: 9.75, end: 10.5, kind: "out", detail: "Room 826", guest: "Maya Johnson", initials: "MJ" },
  { id: "turnover-wed", title: "Turnover round", day: 8, start: 10.25, end: 11.25, kind: "job", detail: "Departure rooms" },
  { id: "patel-in", title: "Check in: Patel", day: 8, start: 13.5, end: 14.3, kind: "in", detail: "Harbour Suite 1203", guest: "Riya Patel", initials: "RP" },
  { id: "santos-in", title: "Check in: Santos", day: 8, start: 16, end: 16.8, kind: "in", detail: "Junior Suite 1002" },
  { id: "chen-thu", title: "Check out: Chen", day: 9, start: 11, end: 11.7, kind: "out", detail: "Room 512" },
  { id: "turnover-thu", title: "Turnover round", day: 9, start: 12, end: 13, kind: "job", detail: "Departure rooms" },
  { id: "wedding", title: "Wedding party", day: 9, start: 13, end: 15, kind: "group", detail: "Romero wedding" },
  { id: "spa", title: "Spa: Romero party", day: 9, start: 13.5, end: 14.3, kind: "service", detail: "Spa bookings" },
  { id: "romero-in-thu", title: "Check in: Romero", day: 10, start: 13, end: 14, kind: "in", detail: "Junior Suite 1002" },
  ...Array.from({ length: 7 }, (_, index): HotelEvent => ({ id: `turnover-${index}`, title: "Turndown round", day: 6 + index, start: 18, end: 19.5, kind: "job", detail: "14 suites + VIP arrivals" })),
]

const tone: Record<HotelEvent["kind"], string> = {
  in: "border-info/20 bg-info/15 text-foreground",
  out: "border-warning/20 bg-warning/15 text-foreground",
  job: "border-success/20 bg-success/15 text-foreground",
  service: "border-destructive/20 bg-destructive/10 text-foreground",
  group: "border-violet-500/20 bg-violet-500/15 text-foreground",
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function HotelBookingCalendar() {
  const [selectedDay, setSelectedDay] = useState(8)
  const [weekOffset, setWeekOffset] = useState(0)
  const [stream, setStream] = useState("All streams")
  const [hotelEvents, setHotelEvents] = useState(events)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingName, setBookingName] = useState("")
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => new Date(2026, 6, 6 + weekOffset * 7 + index)), [weekOffset])
  const visibleEvents = hotelEvents.filter((event) => stream === "All streams" || stream === "Arrivals" && event.kind === "in" || stream === "Housekeeping" && event.kind === "job")
  const dayEvents = visibleEvents.filter((event) => event.day === selectedDay && !event.allDay)
  const counts = { in: dayEvents.filter((event) => event.kind === "in").length, out: dayEvents.filter((event) => event.kind === "out").length, jobs: dayEvents.filter((event) => event.kind === "job").length }
  const monthDays = Array.from({ length: 35 }, (_, index) => index - 1)

  return <div className="grid min-h-[760px] overflow-hidden rounded-xl border bg-card lg:grid-cols-[280px_minmax(0,1fr)]">
    <aside className="border-b lg:border-b-0 lg:border-r">
      <header className="flex h-12 items-center justify-between border-b px-3"><h3 className="text-sm font-semibold">Streams</h3><Select value={stream} onValueChange={setStream}><SelectTrigger aria-label="Select streams" className="h-8 w-24"><span className="flex items-center gap-0.5">{stream === "All streams" ? <><i aria-hidden="true" className="size-2 rounded-full bg-info" /><i aria-hidden="true" className="size-2 rounded-full bg-warning" /><i aria-hidden="true" className="size-2 rounded-full bg-success" /></> : stream}</span></SelectTrigger><SelectContent position="popper" align="end"><SelectItem value="All streams">All streams</SelectItem><SelectItem value="Arrivals">Arrivals</SelectItem><SelectItem value="Housekeeping">Housekeeping</SelectItem></SelectContent></Select></header>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between"><Button size="icon-sm" variant="ghost" aria-label="Previous month"><IconChevronLeft /></Button><h4 className="text-sm font-medium">July 2026</h4><Button size="icon-sm" variant="ghost" aria-label="Next month"><IconChevronRight /></Button></div>
        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => <span key={day} className="py-2">{day}</span>)}</div>
        <div className="grid grid-cols-7">{monthDays.map((day, index) => <button key={index} type="button" onClick={() => { if (day > 0 && day <= 31) { setSelectedDay(day); setWeekOffset(Math.floor((day - 6) / 7)) } }} className={`relative mx-auto grid size-8 place-items-center rounded-lg text-xs ${day <= 0 || day > 31 ? "text-muted-foreground/60" : ""} ${day === selectedDay ? "bg-foreground text-background" : "hover:bg-muted"}`}>{day <= 0 ? day + 30 : day > 31 ? day - 31 : day}<span className={`absolute bottom-1 size-1 rounded-full ${day === selectedDay ? "bg-background" : "bg-foreground/50"}`} /></button>)}</div>
      </div>
      <div className="border-t p-3">
        <div className="mb-3 rounded-lg border bg-muted/50 p-2.5"><div className="text-sm font-medium">{weekdays[(selectedDay - 6) % 7]}, Jul {selectedDay}</div><div className="mt-1 text-xs text-muted-foreground">{counts.in} in <span className="px-1">·</span> {counts.out} out <span className="px-1">·</span> {counts.jobs} jobs</div></div>
        <div className="grid gap-3">{dayEvents.map((event, index) => <div key={event.id} className="flex gap-2.5"><Avatar className="mt-0.5 size-7"><AvatarImage src={event.guest ? demoAvatarUrl(event.guest ?? event.initials ?? event.id) : undefined} alt="" /><AvatarFallback>{event.initials ?? (event.kind === "job" ? "⌁" : "•")}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><div className="text-sm font-medium leading-5">{event.title}</div><div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground"><span className={`size-1.5 rounded-full ${event.kind === "in" ? "bg-info" : event.kind === "out" ? "bg-warning" : event.kind === "job" ? "bg-success" : "bg-destructive"}`} />{formatTime(event.start)} <span>·</span>{event.detail}</div></div>{index === 2 && <span className="self-center rounded-md border px-2 py-0.5 text-[10px] text-violet-600">Due Out</span>}</div>)}</div>
      </div>
    </aside>
    <section className="grid min-w-0 grid-rows-[auto_auto_minmax(0,1fr)]">
      <header className="flex min-h-12 flex-wrap items-center gap-2 border-b px-3 py-2"><Button size="sm" variant="ghost" onClick={() => setWeekOffset(0)}>Today</Button><Button size="icon-sm" variant="ghost" aria-label="Previous week" onClick={() => setWeekOffset((value) => value - 1)}><IconChevronLeft /></Button><Button size="icon-sm" variant="ghost" aria-label="Next week" onClick={() => setWeekOffset((value) => value + 1)}><IconChevronRight /></Button><h3 className="flex-1 text-sm font-semibold">{formatRange(weekDays[0], weekDays[6])}</h3><Button size="sm" onClick={() => setBookingOpen(true)}><IconPlus />New booking</Button></header>
      <div className="grid grid-cols-[58px_repeat(7,minmax(76px,1fr))] border-b text-xs"><span /><div className="col-span-7 grid grid-cols-7">{weekDays.map((day) => <div key={day.toISOString()} className="border-l px-2 py-2 font-medium">{weekdays[(day.getDay() + 6) % 7]} {day.getDate()}</div>)}</div><span className="px-2 py-2 text-muted-foreground">All day</span><div className="col-span-7 grid grid-cols-7">{weekDays.map((day) => <div key={day.toISOString()} className="min-h-8 border-l p-1">{visibleEvents.filter((event) => event.day === day.getDate() && day.getMonth() === 6 && event.allDay).map((event) => <div key={event.id} className={`truncate rounded-md border px-1.5 py-1 text-[11px] ${tone[event.kind]}`}>{event.title}</div>)}</div>)}</div></div>
      <div className="min-h-0 overflow-auto"><div className="relative grid min-w-[590px] grid-cols-[58px_repeat(7,minmax(76px,1fr))]">{Array.from({ length: 14 }, (_, row) => <div key={row} className="contents"><div className="h-16 border-b px-2 pt-1 text-right text-[11px] text-muted-foreground">{formatTime(row + 8)}</div>{weekDays.map((day) => <div key={`${day.toISOString()}-${row}`} className="h-16 border-b border-l" />)}</div>)}<div className="pointer-events-none absolute inset-y-0 left-[58px] right-0 grid grid-cols-7">{weekDays.map((day) => { const dayEvents = visibleEvents.filter((event) => event.day === day.getDate() && day.getMonth() === 6 && !event.allDay && (event.start < 18 || event.kind === "job")).sort((a, b) => a.start - b.start); const lanes: number[] = []; const positioned = dayEvents.map((event) => { let lane = lanes.findIndex((end) => end <= event.start); if (lane < 0) lane = lanes.length; lanes[lane] = event.end; return { event, lane } }); const laneCount = Math.max(1, lanes.length); return <div key={day.toISOString()} className="relative h-[896px] border-l">{positioned.map(({ event, lane }) => { const start = Math.max(8, event.start); const end = Math.min(22, event.end); return <button key={event.id} type="button" title={event.title} style={{ top: `${(start - 8) * 64}px`, height: `${Math.max(38, (end - start) * 64 - 4)}px`, left: `calc(${lane * 100 / laneCount}% + 2px)`, width: `calc(${100 / laneCount}% - 4px)` }} className={`pointer-events-auto absolute overflow-hidden rounded-md border p-1.5 text-left text-[11px] leading-4 ${tone[event.kind]}`}><span className="line-clamp-2">{event.title}</span></button> })}</div> })}</div></div></div>
    </section>
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}><DialogContent><DialogHeader><DialogTitle>New booking</DialogTitle><DialogDescription>Add a reservation for July {selectedDay}.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Guest name<Input value={bookingName} onChange={(event) => setBookingName(event.target.value)} placeholder="Guest name" /></label><DialogFooter><Button variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button><Button onClick={() => { setHotelEvents((current) => [...current, { id: `booking-${Date.now()}`, title: `Check in: ${bookingName || "Guest"}`, day: selectedDay, start: 15, end: 16, kind: "in", detail: "New reservation" }]); setBookingName(""); setBookingOpen(false) }}>Create booking</Button></DialogFooter></DialogContent></Dialog>
  </div>
}

function formatTime(hour: number) {
  const wholeHour = Math.floor(hour)
  const minute = Math.round((hour - wholeHour) * 60)
  const date = new Date(2026, 6, 8, wholeHour, minute)
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: minute ? "2-digit" : undefined }).format(date)
}

function formatRange(start: Date, end: Date) {
  const startMonth = new Intl.DateTimeFormat("en", { month: "long" }).format(start)
  const endMonth = new Intl.DateTimeFormat("en", { month: "short" }).format(end)
  const endYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(end)
  return start.getMonth() === end.getMonth() ? `${startMonth} ${start.getDate()} - ${end.getDate()}, ${endYear}` : `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${endYear}`
}
