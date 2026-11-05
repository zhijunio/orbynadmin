"use client"

import { useMemo, useState } from "react"
import { IconBriefcase, IconChevronLeft, IconChevronRight, IconCube, IconListCheck, IconPlus } from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

type DealCategory = "Deal Closing" | "Task" | "Compliance" | "Call" | "Meeting" | "Email"
type DealEvent = { id: string; day: number; title: string; category: DealCategory; company?: string; time?: number; duration?: number; stream?: string; progress?: string; progressValue?: number; owner?: string; collaborators?: string[]; extraCount?: number; allDay?: boolean }

const categoryTone: Record<DealCategory, string> = {
  "Deal Closing": "border-warning/30 bg-warning/15",
  Task: "border-muted-foreground/20 bg-muted",
  Compliance: "border-violet-500/25 bg-violet-500/15",
  Call: "border-info/25 bg-info/15",
  Meeting: "border-violet-500/25 bg-violet-500/15",
  Email: "border-success/25 bg-success/15",
}
const categoryBadge: Record<DealCategory, string> = {
  "Deal Closing": "bg-warning text-warning-foreground",
  Task: "bg-foreground text-background",
  Compliance: "bg-violet-600 text-white",
  Call: "bg-info text-info-foreground",
  Meeting: "bg-violet-600 text-white",
  Email: "bg-success text-success-foreground",
}
const categories: DealCategory[] = ["Deal Closing", "Task", "Compliance", "Call", "Meeting", "Email"]
const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const seedEvents: DealEvent[] = [
  { id: "deal-ln40218", day: 0, title: "LN-40218", category: "Deal Closing", company: "Harbour Point Logistics (Term Loan)", stream: "Tasks", progress: "7/8", progressValue: 88, allDay: true },
  { id: "task-calder-row", day: 2, title: "Send data room for Calder Row", category: "Task", stream: "Deal Pipeline", progress: "1/5", progressValue: 20, allDay: true },
  { id: "compliance-ashgrove", day: 3, title: "Ashgrove Medical insurance certificates", category: "Compliance", stream: "Deliverables", progress: "4/9", progressValue: 44, allDay: true },
  { id: "funding-review", day: 0, title: "Funding Conditions Review", category: "Compliance", time: 9, duration: 1.5, stream: "Deliverables", progress: "5/6", progressValue: 83, owner: "AC" },
  { id: "credit-standup", day: 0, title: "Weekly Credit Standup", category: "Meeting", time: 13, duration: 1, owner: "RM" },
  { id: "intro-call", day: 1, title: "Introductory Call", category: "Call", time: 10, duration: 0.75, owner: "AC" },
  { id: "kestrel-terms", day: 1, title: "Kestrel Terms Review", category: "Call", time: 11, duration: 1, company: "Kestrel Cold Storage", owner: "RM" },
  { id: "certificate-chase", day: 2, title: "Certificate Chase", category: "Email", time: 9, duration: 1, owner: "EN" },
  { id: "site-visit", day: 2, title: "Site Visit Debrief", category: "Call", time: 15, duration: 1.75, company: "Kestrel Cold Storage", owner: "TR" },
  { id: "watchlist-prep", day: 3, title: "Watchlist Prep", category: "Task", time: 10, duration: 1.25, stream: "Tasks", progress: "3/6", progressValue: 50, owner: "HS" },
  { id: "portfolio-review", day: 3, title: "Portfolio Review", category: "Meeting", time: 13.5, duration: 2, company: "Internal", owner: "AC", collaborators: ["RM", "EN", "TR"], extraCount: 11 },
  { id: "calder-kickoff", day: 4, title: "Calder Row Kickoff", category: "Meeting", time: 9, duration: 1.25, company: "Calder Row Residences", owner: "AC", collaborators: ["RM", "EN", "TR"], extraCount: 3 },
  { id: "closing-followup", day: 4, title: "Closing Docs Follow Up", category: "Email", time: 11.5, duration: 1.25, company: "Orchard Line Retail", owner: "RC", collaborators: ["DA", "AC", "RM"], extraCount: 4 },
  { id: "servicing-handover", day: 4, title: "Servicing Handover", category: "Compliance", time: 15, duration: 1.25, stream: "Deliverables", progress: "2/4", progressValue: 50, owner: "HS" },
]

export function DealCalendar() {
  const [events, setEvents] = useState(seedEvents)
  const [weekOffset, setWeekOffset] = useState(0)
  const [category, setCategory] = useState("All categories")
  const [ownership, setOwnership] = useState("All owners")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [newCategory, setNewCategory] = useState<DealCategory>("Meeting")
  const [feedback, setFeedback] = useState("")
  const weekStart = new Date(2026, 0, 12 + weekOffset * 7)
  const days = Array.from({ length: 7 }, (_, index) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + index))
  const visibleEvents = useMemo(() => events.filter((event) => (category === "All categories" || event.category === category) && (ownership === "All owners" || event.owner === ownership)), [category, events, ownership])

  function createEvent() {
    if (!title.trim()) return
    setEvents((current) => [...current, { id: `event-${Date.now()}`, day: 0, title: title.trim(), category: newCategory, time: 16, duration: 1, owner: "AC" }])
    setTitle("")
    setDialogOpen(false)
    setFeedback("Event added")
  }

  return <div className="overflow-hidden rounded-xl border bg-card">
    <header className="flex items-center justify-between border-b px-4 py-2.5"><h2 className="text-sm font-semibold">Deal Calendar</h2><Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />New event</Button></header>
    <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2"><Button size="sm" variant="ghost" onClick={() => setWeekOffset(0)}>Today</Button><Select value="Week" onValueChange={() => {}}><SelectTrigger aria-label="Calendar view" className="h-8 w-20"><span>Week</span></SelectTrigger><SelectContent><SelectItem value="Week">Week</SelectItem></SelectContent></Select><Button size="icon-sm" variant="ghost" aria-label="Previous week" onClick={() => setWeekOffset((value) => value - 1)}><IconChevronLeft /></Button><Button size="icon-sm" variant="ghost" aria-label="Next week" onClick={() => setWeekOffset((value) => value + 1)}><IconChevronRight /></Button><h3 className="min-w-40 flex-1 text-sm font-semibold">{formatRange(days[0], days[6])}</h3><Select value={category} onValueChange={setCategory}><SelectTrigger aria-label="Filter category" className="h-8 w-28"><span>{category === "All categories" ? "Category 6" : category}</span></SelectTrigger><SelectContent position="popper" align="end"><SelectItem value="All categories">All categories</SelectItem>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><Select value={ownership} onValueChange={setOwnership}><SelectTrigger aria-label="Filter ownership" className="h-8 w-32"><span>{ownership === "All owners" ? "Ownership 6" : ownership}</span></SelectTrigger><SelectContent position="popper" align="end"><SelectItem value="All owners">All owners</SelectItem>{["AC", "RM", "EN", "TR", "HS", "RC"].map((owner) => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}</SelectContent></Select></div>
    <div className="overflow-auto"><div className="min-w-[760px]">
      <div className="grid grid-cols-[58px_repeat(7,minmax(100px,1fr))] border-b text-xs"><span /><div className="col-span-7 grid grid-cols-7">{days.map((day) => <div key={day.toISOString()} className="border-l px-2 py-2 font-medium">{weekNames[(day.getDay() + 6) % 7]} {day.getDate()}</div>)}</div><span className="px-2 py-2 text-muted-foreground">All day</span><div className="col-span-7 grid grid-cols-7">{days.map((day, index) => <div key={day.toISOString()} className="min-h-24 border-l p-1">{weekOffset === 0 && visibleEvents.filter((event) => event.day === index && event.allDay).map((event) => <AllDayDeal key={event.id} event={event} onClick={() => setFeedback(`${event.title} · ${event.category}`)} />)}</div>)}</div></div>
      <div className="relative grid grid-cols-[58px_repeat(7,minmax(100px,1fr))]">{Array.from({ length: 11 }, (_, row) => <div key={row} className="contents"><div className="h-16 border-b px-2 pt-1 text-right text-[11px] text-muted-foreground">{formatHour(row + 9)}</div>{days.map((day) => <div key={`${day.toISOString()}-${row}`} className="h-16 border-b border-l" />)}</div>)}<div className="pointer-events-none absolute inset-y-0 left-[58px] right-0 grid grid-cols-7">{days.map((day, index) => { const dayEvents = weekOffset === 0 ? visibleEvents.filter((event) => event.day === index && !event.allDay).sort((left, right) => (left.time ?? 0) - (right.time ?? 0)) : []; return <div key={day.toISOString()} className="relative h-[704px] border-l">{dayEvents.map((event) => <button key={event.id} type="button" title={`${event.title} · ${event.category}`} onClick={() => setFeedback(`${event.title} · ${event.category}`)} style={{ top: `${((event.time ?? 9) - 9) * 64}px`, height: `${Math.max(44, (event.duration ?? 1) * 64 - 3)}px` }} className={`pointer-events-auto absolute inset-x-0.5 z-10 overflow-hidden rounded-md border p-1.5 text-left text-[11px] ${categoryTone[event.category]}`}><div className="mb-1 flex items-start justify-between gap-1"><span className="truncate text-[10px] text-muted-foreground">{formatHour(event.time ?? 9)}{event.duration ? `, ${Math.round(event.duration * 60)} min` : ""}</span><span className={`shrink-0 rounded px-1 py-0.5 text-[9px] font-medium ${categoryBadge[event.category]}`}>{event.category === "Deal Closing" ? "Deal Closing" : event.category}</span></div><div className="truncate font-medium">{event.title}</div>{event.company && <div className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-muted-foreground"><IconBriefcase className="size-3 shrink-0" /><span className="truncate">{event.company}</span>{event.collaborators && <span className="ml-auto flex shrink-0 -space-x-1">{event.collaborators.slice(0, 3).map((initials) => <Avatar key={initials} className="size-4 border border-background"><AvatarFallback className="text-[7px]">{initials}</AvatarFallback></Avatar>)}{event.extraCount !== undefined && <span className="grid size-4 place-items-center rounded-full border border-background bg-muted text-[7px]">+{event.extraCount}</span>}</span>}</div>}{event.progress && <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">{event.stream === "Tasks" ? <IconListCheck className="size-3" /> : <IconCube className="size-3" />}<span className="truncate">{event.stream}</span><span className="ml-auto shrink-0">{event.progress}</span></div>}</button>)}</div> })}</div></div>
    </div></div>
    {feedback && <div role="status" className="sr-only">{feedback}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New event</DialogTitle><DialogDescription>Add an event to this week.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Event title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Event title" /></label><label className="grid gap-1.5 text-sm">Category<Select value={newCategory} onValueChange={(value) => setNewCategory(value as DealCategory)}><SelectTrigger><span>{newCategory}</span></SelectTrigger><SelectContent position="popper" align="start">{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createEvent}>Create event</Button></DialogFooter></DialogContent></Dialog>
  </div>
}

function AllDayDeal({ event, onClick }: { event: DealEvent; onClick: () => void }) {
  return <button type="button" title={event.title} onClick={onClick} className={`grid w-full min-w-0 gap-1 rounded-md border p-1.5 text-left text-[10px] ${categoryTone[event.category]}`}><span className="flex min-w-0 items-center justify-between gap-1"><span className="min-w-0 truncate font-medium">{event.category === "Deal Closing" ? `# ${event.title}` : `Jan ${12 + event.day}`}</span><span className={`shrink-0 rounded px-1.5 py-0.5 font-medium ${categoryBadge[event.category]}`}>{event.category}</span></span>{event.company ? <span className="line-clamp-2 leading-3">{event.company}</span> : <span className="line-clamp-2 min-w-0 leading-3">{event.title}</span>}{event.category !== "Deal Closing" && event.stream && <span className="truncate text-muted-foreground">{event.stream}</span>}<span className="flex min-w-0 items-center gap-1 text-muted-foreground"><span className="h-1 flex-1 overflow-hidden rounded-full bg-background/70"><span className="block h-full bg-foreground" style={{ width: `${event.progressValue ?? 0}%` }} /></span>{event.progress}</span></button>
}

function formatHour(hour: number) {
  const wholeHour = Math.floor(hour)
  const minute = Math.round((hour - wholeHour) * 60)
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: minute ? "2-digit" : undefined }).format(new Date(2026, 0, 12, wholeHour, minute))
}

function formatRange(start: Date, end: Date) {
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(start)
  return `${month} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`
}
