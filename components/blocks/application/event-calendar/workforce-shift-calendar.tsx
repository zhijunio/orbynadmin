"use client"

import { useMemo, useState } from "react"
import { IconChevronLeft, IconChevronRight, IconPlus, IconSearch } from "@tabler/icons-react"
import { demoAvatarUrl } from "@/utils/demo-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

type Shift = { id: string; title: string; day: number; start: number; end: number; department: string; crew: string[]; required: number; tone: string; allDay?: boolean }

const staff = ["Maya Chen", "Leo Park", "Amira Jones", "Noah Kim", "Sofia Diaz", "Ethan Reed", "Nora Patel", "Ava Brooks", "Jules Martin", "Caleb Moore", "Riya Shah", "Owen Wells"]
const departments = ["Dock", "Pick", "Cold", "Load Out", "Site Cover"]
const seedShifts: Shift[] = [
  { id: "dock-mon", title: "Dock AM", day: 14, start: 6, end: 14, department: "Dock", crew: staff.slice(0, 4), required: 4, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "pick-mon", title: "Pick AM", day: 14, start: 6, end: 14, department: "Pick", crew: staff.slice(4, 6), required: 4, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "pick-pm-mon", title: "Pick PM", day: 14, start: 14, end: 22, department: "Pick", crew: staff.slice(6, 11), required: 5, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "dock-tue", title: "Dock AM", day: 15, start: 6, end: 14, department: "Dock", crew: staff.slice(0, 3), required: 4, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "pick-tue", title: "Pick AM", day: 15, start: 6, end: 14, department: "Pick", crew: staff.slice(3, 9), required: 6, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "pick-pm-tue", title: "Pick PM", day: 15, start: 14, end: 22, department: "Pick", crew: staff.slice(0, 2), required: 4, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "dock-wed", title: "Dock AM", day: 16, start: 6, end: 14, department: "Dock", crew: staff.slice(0, 4), required: 4, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "pick-wed", title: "Pick AM", day: 16, start: 6, end: 14, department: "Pick", crew: staff.slice(4, 7), required: 4, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "loadout-wed", title: "Load Out", day: 16, start: 16, end: 22, department: "Load Out", crew: staff.slice(7, 9), required: 5, tone: "border-success/25 bg-success/15" },
  { id: "dock-thu", title: "Dock AM", day: 17, start: 6, end: 14, department: "Dock", crew: staff.slice(0, 4), required: 4, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "pick-thu", title: "Pick AM", day: 17, start: 6, end: 14, department: "Pick", crew: staff.slice(4, 6), required: 4, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "cold-thu", title: "Cold PM", day: 17, start: 14, end: 22, department: "Cold", crew: staff.slice(8, 12), required: 5, tone: "border-rose-500/25 bg-rose-500/15" },
  { id: "dock-fri", title: "Dock AM", day: 18, start: 6, end: 14, department: "Dock", crew: staff.slice(0, 5), required: 5, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "pick-fri", title: "Pick AM", day: 18, start: 6, end: 14, department: "Pick", crew: staff.slice(5, 8), required: 5, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "pick-pm-fri", title: "Pick PM", day: 18, start: 14, end: 22, department: "Pick", crew: staff.slice(2, 6), required: 5, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "pick-sat", title: "Pick AM", day: 19, start: 7, end: 15, department: "Pick", crew: staff.slice(1, 3), required: 3, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "site-sat", title: "Site Cover", day: 19, start: 8, end: 16, department: "Site Cover", crew: staff.slice(9, 11), required: 2, tone: "border-violet-500/25 bg-violet-500/15" },
  { id: "dock-sun", title: "Dock AM", day: 20, start: 8, end: 14, department: "Dock", crew: staff.slice(0, 2), required: 3, tone: "border-sky-500/25 bg-sky-500/15" },
  { id: "cold-sun", title: "Cold AM", day: 20, start: 9, end: 15, department: "Cold", crew: staff.slice(10, 12), required: 2, tone: "border-rose-500/25 bg-rose-500/15" },
]

const onCall = [{ day: 16, title: "On Call" }, { day: 19, title: "On Call" }, { day: 20, title: "On Call" }]
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function WorkforceShiftCalendar() {
  const [shifts, setShifts] = useState(seedShifts)
  const [weekOffset, setWeekOffset] = useState(0)
  const [department, setDepartment] = useState("All departments")
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [shiftDay, setShiftDay] = useState("14")
  const [assignee, setAssignee] = useState("Maya Chen")
  const [shiftStart, setShiftStart] = useState("10:00")
  const [shiftEnd, setShiftEnd] = useState("18:00")
  const [shiftError, setShiftError] = useState("")
  const [feedback, setFeedback] = useState("")
  const weekStart = 14 + weekOffset * 7
  const weekDays = Array.from({ length: 7 }, (_, index) => weekStart + index)
  const visibleShifts = useMemo(() => shifts.filter((shift) => (department === "All departments" || shift.department === department) && `${shift.title} ${shift.department} ${shift.crew.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [department, search, shifts])
  const openCount = visibleShifts.reduce((count, shift) => count + Math.max(0, shift.required - shift.crew.length), 0)

  function addShift() {
    const day = Number(shiftDay)
    const start = timeToHour(shiftStart)
    const end = timeToHour(shiftEnd)
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) { setShiftError("Enter a valid shift time range."); return }
    const overlap = shifts.some((shift) => shift.day === day && shift.crew.includes(assignee) && Math.max(shift.start, start) < Math.min(shift.end, end))
    if (overlap) { setShiftError(`${assignee} already has an overlapping shift on Sep ${day}.`); return }
    const newShift: Shift = { id: `shift-${Date.now()}`, title: title || "New shift", day, start, end, department: "Pick", crew: [assignee], required: 2, tone: "border-violet-500/25 bg-violet-500/15" }
    setShifts((current) => [...current, newShift])
    setShiftError("")
    setTitle("")
    setDialogOpen(false)
    setFeedback("Shift added")
  }

  return <div className="overflow-hidden rounded-xl border bg-card">
    <header className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
      <Button size="sm" variant="ghost" onClick={() => setWeekOffset(0)}>Today</Button>
      <Select value="Week" onValueChange={() => {}}><SelectTrigger aria-label="Calendar view" className="h-8 w-20"><span>Week</span></SelectTrigger><SelectContent><SelectItem value="Week">Week</SelectItem></SelectContent></Select>
      <Button size="icon-sm" variant="ghost" aria-label="Previous week" onClick={() => setWeekOffset((value) => value - 1)}><IconChevronLeft /></Button>
      <Button size="icon-sm" variant="ghost" aria-label="Next week" onClick={() => setWeekOffset((value) => value + 1)}><IconChevronRight /></Button>
      <h3 className="min-w-48 flex-1 text-sm font-semibold">September {weekDays[0]} - {weekDays[6]}, 2026</h3>
      <label className="relative hidden sm:block"><IconSearch className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search shifts or staff..." className="h-8 w-48 pl-8" /></label>
      <Select value={department} onValueChange={setDepartment}><SelectTrigger aria-label="Departments" className="h-8 w-32"><span>{department === "All departments" ? "Departments" : department}</span></SelectTrigger><SelectContent position="popper" align="end"><SelectItem value="All departments">All departments</SelectItem>{departments.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
      <span className="rounded-md bg-warning/15 px-2.5 py-1.5 text-xs font-medium text-warning-foreground">● {openCount} Open</span>
      <Button size="sm" onClick={() => { setDialogOpen(true); setShiftError("") }}><IconPlus />New shift</Button>
    </header>
    <div className="overflow-auto"><div className="min-w-[760px]">
      <div className="grid grid-cols-[58px_repeat(7,minmax(100px,1fr))] border-b text-xs"><span /><div className="col-span-7 grid grid-cols-7">{weekDays.map((day, index) => <div key={day} className="border-l px-2 py-2 font-medium">{days[index]} {day}</div>)}</div><span className="px-2 py-2 text-muted-foreground">All day</span><div className="col-span-7 grid grid-cols-7">{weekDays.map((day) => <div key={day} className="min-h-8 border-l p-1">{onCall.filter((event) => event.day === day).map((event) => <div key={event.day} className="flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-1.5 py-1 text-[11px]"><span className="size-1.5 rounded-full bg-primary" />{event.title}<span className="ml-auto text-muted-foreground">1/1</span></div>)}</div>)}</div></div>
      <div className="relative grid grid-cols-[58px_repeat(7,minmax(100px,1fr))]">{Array.from({ length: 18 }, (_, row) => <div key={row} className="contents"><div className="h-16 border-b px-2 pt-1 text-right text-[11px] text-muted-foreground">{formatHour(row + 6)}</div>{weekDays.map((day) => <div key={`${day}-${row}`} className="h-16 border-b border-l" />)}</div>)}<div className="pointer-events-none absolute inset-y-0 left-[58px] right-0 grid grid-cols-7">{weekDays.map((day) => { const dayShifts = visibleShifts.filter((shift) => shift.day === day).sort((left, right) => left.start - right.start); const laneEnds: number[] = []; const positioned = dayShifts.map((shift) => { let lane = laneEnds.findIndex((end) => end <= shift.start); if (lane < 0) lane = laneEnds.length; laneEnds[lane] = shift.end; return { shift, lane } }); const laneCount = Math.max(1, laneEnds.length); return <div key={day} className="relative h-[1152px] border-l">{positioned.map(({ shift, lane }) => <button key={shift.id} type="button" title={shift.title} onClick={() => setFeedback(`${shift.title} · ${shift.crew.length}/${shift.required} assigned`)} style={{ top: `${(shift.start - 6) * 64}px`, height: `${(shift.end - shift.start) * 64 - 3}px`, left: `calc(${lane * 100 / laneCount}% + 2px)`, width: `calc(${100 / laneCount}% - 4px)` }} className={`pointer-events-auto absolute overflow-hidden rounded-md border p-1.5 text-left text-xs ${shift.tone}`}><span className="block truncate font-medium">{shift.title}</span>{shift.end - shift.start <= 2 && <span className="block truncate text-[10px] text-muted-foreground">{formatHour(shift.start)} - {formatHour(shift.end)}</span>}<span className="mt-1 flex -space-x-1">{shift.crew.slice(0, 3).map((name) => <Avatar key={name} className="size-5 border-2 border-background"><AvatarImage src={demoAvatarUrl(name)} alt="" /><AvatarFallback className="text-[8px]">{name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar>)}{shift.crew.length > 3 && <span className="grid size-5 place-items-center rounded-full border-2 border-background bg-muted text-[8px]">+{shift.crew.length - 3}</span>}</span><span className="mt-0.5 block truncate text-[11px] font-medium">{shift.required > shift.crew.length ? <span className="text-warning-foreground">{shift.required - shift.crew.length} open</span> : `${shift.crew.length}/${shift.required}`}</span></button>)}</div> })}</div></div>
    </div></div>
    {feedback && <div role="status" className="sr-only">{feedback}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New shift</DialogTitle><DialogDescription>Assign coverage for September {shiftDay}.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Shift name<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Shift name" /></label><label className="grid gap-1.5 text-sm">Day<Select value={shiftDay} onValueChange={setShiftDay}><SelectTrigger><span>September {shiftDay}</span></SelectTrigger><SelectContent position="popper" align="start">{weekDays.map((day) => <SelectItem key={day} value={String(day)}>September {day}</SelectItem>)}</SelectContent></Select></label><div className="grid grid-cols-2 gap-3"><label className="grid gap-1.5 text-sm">Start<Input type="time" value={shiftStart} onChange={(event) => setShiftStart(event.target.value)} /></label><label className="grid gap-1.5 text-sm">End<Input type="time" value={shiftEnd} onChange={(event) => setShiftEnd(event.target.value)} /></label></div><label className="grid gap-1.5 text-sm">Assign staff<Select value={assignee} onValueChange={setAssignee}><SelectTrigger><span>{assignee}</span></SelectTrigger><SelectContent position="popper" align="start">{staff.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select></label>{shiftError && <p className="text-sm text-destructive" role="alert">{shiftError}</p>}<DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={addShift}>Create shift</Button></DialogFooter></DialogContent></Dialog>
  </div>
}

function formatHour(hour: number) {
  return new Intl.DateTimeFormat("en", { hour: "numeric" }).format(new Date(2026, 8, 14, hour))
}

function timeToHour(value: string) {
  const [hour, minute] = value.split(":").map(Number)
  return hour + minute / 60
}
