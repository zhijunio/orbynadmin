"use client"

import { useMemo, useState } from "react"
import { IconCalendar, IconChevronLeft, IconChevronRight, IconClock, IconFilter, IconPlus } from "@tabler/icons-react"
import { demoAvatarUrl } from "@/utils/demo-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"

type AppointmentStatus = "Completed" | "In Chair" | "Booked" | "Unpaid" | "Arrived" | "Cancelled"
type Appointment = { id: string; patient: string; practitioner: string; start: number; end: number; treatment: string; status: AppointmentStatus }
type ClinicHold = { id: string; practitioner: string; start: number; end: number; label: string }

const practitioners = [
  { name: "Dr. Amara Chen", patients: 5, initials: "AC" },
  { name: "Dr. Ravi Menon", patients: 3, initials: "RM" },
  { name: "Dr. Elena Novak", patients: 3, initials: "EN" },
  { name: "Dr. Tomas Reyes", patients: 2, initials: "TR" },
  { name: "Dr. Hana Sato", patients: 3, initials: "HS" },
]

const initialAppointments: Appointment[] = [
  { id: "ifeoma-am", patient: "Ifeoma Okafor", practitioner: "Dr. Amara Chen", start: 9, end: 9.5, treatment: "Check-in", status: "Completed" },
  { id: "samir-am", patient: "Samir Haddad", practitioner: "Dr. Amara Chen", start: 9.5, end: 10.5, treatment: "Scaling", status: "Completed" },
  { id: "elsa-am", patient: "Elsa Lindqvist", practitioner: "Dr. Amara Chen", start: 11, end: 12, treatment: "Crown Fitting", status: "In Chair" },
  { id: "wei-am", patient: "Wei Ling Tan", practitioner: "Dr. Amara Chen", start: 14.25, end: 15, treatment: "Composite Filling", status: "Booked" },
  { id: "chiara-am", patient: "Chiara Novello", practitioner: "Dr. Amara Chen", start: 16, end: 16.5, treatment: "Check-in", status: "Booked" },
  { id: "mateo-ravi", patient: "Mateo Santos", practitioner: "Dr. Ravi Menon", start: 9, end: 10.5, treatment: "Root Canal", status: "Completed" },
  { id: "gregory-ravi", patient: "Gregory Whitfield", practitioner: "Dr. Ravi Menon", start: 10.75, end: 12.25, treatment: "Root Canal", status: "Unpaid" },
  { id: "declan-ravi", patient: "Declan Brennan", practitioner: "Dr. Ravi Menon", start: 15, end: 16, treatment: "Composite Filling", status: "Booked" },
  { id: "laila-elena", patient: "Laila Abadi", practitioner: "Dr. Elena Novak", start: 10.25, end: 10.75, treatment: "Check-in", status: "Arrived" },
  { id: "chiara-elena", patient: "Chiara Novello", practitioner: "Dr. Elena Novak", start: 10.75, end: 11.25, treatment: "Booked", status: "Booked" },
  { id: "ifeoma-elena", patient: "Ifeoma Okafor", practitioner: "Dr. Elena Novak", start: 14, end: 15, treatment: "Implant Review", status: "Booked" },
  { id: "mateo-elena", patient: "Mateo Santos", practitioner: "Dr. Elena Novak", start: 16.5, end: 17, treatment: "Case Review", status: "Cancelled" },
  { id: "samir-tomas", patient: "Samir Haddad", practitioner: "Dr. Tomas Reyes", start: 14, end: 15, treatment: "Extraction", status: "Booked" },
  { id: "elsa-tomas", patient: "Elsa Lindqvist", practitioner: "Dr. Tomas Reyes", start: 15.5, end: 16.5, treatment: "Extraction", status: "Booked" },
  { id: "wei-hana", patient: "Wei Ling Tan", practitioner: "Dr. Hana Sato", start: 8, end: 9, treatment: "Scaling", status: "Completed" },
  { id: "declan-hana", patient: "Declan Brennan", practitioner: "Dr. Hana Sato", start: 9.25, end: 10.25, treatment: "Whitening", status: "Completed" },
  { id: "laila-hana", patient: "Laila Abadi", practitioner: "Dr. Hana Sato", start: 12.5, end: 13.5, treatment: "Scaling", status: "Arrived" },
]

const initialHolds: ClinicHold[] = [
  { id: "lunch-1", practitioner: "Dr. Amara Chen", start: 12, end: 12.75, label: "Lunch" },
  { id: "lunch-2", practitioner: "Dr. Ravi Menon", start: 12.5, end: 13.25, label: "Lunch" },
  { id: "lunch-3", practitioner: "Dr. Elena Novak", start: 13, end: 13.75, label: "Lunch" },
  { id: "theatre", practitioner: "Dr. Tomas Reyes", start: 9, end: 13, label: "Theatre List" },
  { id: "lunch-4", practitioner: "Dr. Tomas Reyes", start: 13.25, end: 14, label: "Lunch" },
  { id: "lunch-5", practitioner: "Dr. Hana Sato", start: 12, end: 12.5, label: "Lunch" },
  { id: "sterilisation", practitioner: "Dr. Hana Sato", start: 16, end: 18, label: "Sterilisation" },
]

const statusTone: Record<AppointmentStatus, string> = {
  Completed: "border-success/25 bg-success/15",
  "In Chair": "border-violet-500/25 bg-violet-500/15",
  Booked: "border-muted-foreground/20 bg-muted",
  Unpaid: "border-warning/30 bg-warning/15",
  Arrived: "border-info/25 bg-info/15",
  Cancelled: "border-destructive/25 bg-destructive/10",
}
const statusBadge: Record<AppointmentStatus, string> = {
  Completed: "bg-success/15 text-success-foreground",
  "In Chair": "bg-violet-500/15 text-violet-700",
  Booked: "bg-muted-foreground/10 text-muted-foreground",
  Unpaid: "bg-warning/20 text-warning-foreground",
  Arrived: "bg-info/15 text-info-foreground",
  Cancelled: "bg-destructive/15 text-destructive",
}

export function ClinicChairCalendar() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [holds] = useState(initialHolds)
  const [dayOffset, setDayOffset] = useState(0)
  const [weekView, setWeekView] = useState(false)
  const [activeTab, setActiveTab] = useState("Calendar")
  const [filterOpen, setFilterOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [patient, setPatient] = useState("")
  const [practitioner, setPractitioner] = useState(practitioners[0].name)
  const [feedback, setFeedback] = useState("")
  const date = new Date(2026, 4, 14 + dayOffset)
  const bookedCount = appointments.filter((appointment) => appointment.status !== "Cancelled").length
  const visibleAppointments = useMemo(() => appointments, [appointments])

  function moveAppointment(id: string, nextPractitioner: string) {
    const appointment = appointments.find((item) => item.id === id)
    if (!appointment) return
    const hold = holds.find((item) => item.practitioner === nextPractitioner && Math.max(item.start, appointment.start) < Math.min(item.end, appointment.end))
    if (hold) { setFeedback(`Cannot move appointment into ${hold.label}.`); return }
    const conflict = appointments.find((item) => item.id !== id && item.practitioner === nextPractitioner && Math.max(item.start, appointment.start) < Math.min(item.end, appointment.end))
    if (conflict) { setFeedback(`That time overlaps ${conflict.patient}'s appointment.`); return }
    setAppointments((current) => current.map((item) => item.id === id ? { ...item, practitioner: nextPractitioner } : item))
    setFeedback(`Appointment moved to ${nextPractitioner}.`)
  }

  function createBooking() {
    if (!patient.trim()) return
    setAppointments((current) => [...current, { id: `booking-${Date.now()}`, patient: patient.trim(), practitioner, start: 16.75, end: 17.5, treatment: "New booking", status: "Booked" }])
    setPatient("")
    setDialogOpen(false)
    setFeedback("Booking added")
  }

  return <div className="overflow-hidden rounded-xl border bg-card">
    <div className="flex items-center gap-6 border-b px-4"><button type="button" onClick={() => setActiveTab("Calendar")} className={`h-11 border-b-2 text-sm ${activeTab === "Calendar" ? "border-foreground font-medium" : "border-transparent text-muted-foreground"}`}>Calendar</button><button type="button" onClick={() => setActiveTab("Log History")} className={`h-11 border-b-2 text-sm ${activeTab === "Log History" ? "border-foreground font-medium" : "border-transparent text-muted-foreground"}`}>Log History</button><span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground"><IconCalendar className="size-3.5" />{bookedCount} booked in view</span></div>
    <header className="flex flex-wrap items-center gap-2 border-b px-3 py-2"><Button size="sm" variant="ghost" onClick={() => setDayOffset(0)}>Today</Button><Button size="icon-sm" variant="ghost" aria-label="Previous day" onClick={() => setDayOffset((value) => value - 1)}><IconChevronLeft /></Button><Button size="icon-sm" variant="ghost" aria-label="Next day" onClick={() => setDayOffset((value) => value + 1)}><IconChevronRight /></Button><h3 className="min-w-48 flex-1 text-sm font-semibold">{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date)}</h3><div className="flex rounded-md border p-0.5"><Button size="xs" variant={weekView ? "ghost" : "secondary"} onClick={() => setWeekView(false)}>Day</Button><Button size="xs" variant={weekView ? "secondary" : "ghost"} onClick={() => setWeekView(true)}>Week</Button></div><Button size="sm" variant="outline" onClick={() => setFeedback("5 of 9 chairs in use")}><span className="mr-1">♧</span>5 of 9 Chairs</Button><Button size="sm" variant="outline" onClick={() => setFilterOpen((open) => !open)}><IconFilter />Filters <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">6</span></Button><Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />New Booking</Button></header>
    {activeTab === "Calendar" ? <div className="overflow-auto"><div className="min-w-[800px]">
      <div className="grid grid-cols-[58px_repeat(5,minmax(140px,1fr))] border-b"><span /><div className="col-span-5 grid grid-cols-5">{practitioners.map((doctor) => <div key={doctor.name} className="flex min-h-12 items-center gap-2 border-l px-2"><Avatar className="size-8"><AvatarImage src={demoAvatarUrl(doctor.name)} alt="" /><AvatarFallback>{doctor.initials}</AvatarFallback></Avatar><div className="min-w-0"><div className="truncate text-xs font-semibold">{doctor.name}</div><div className="text-[11px] text-muted-foreground">{doctor.patients} patients</div></div></div>)}</div><span className="flex items-center px-2 text-[11px] text-muted-foreground">All day</span><div className="col-span-5 grid grid-cols-5">{practitioners.map((doctor) => <div key={doctor.name} className="h-8 border-l" />)}</div></div>
      <div className="relative grid grid-cols-[58px_repeat(5,minmax(140px,1fr))]">{Array.from({ length: 10 }, (_, row) => <div key={row} className="contents"><div className="h-16 border-b px-2 pt-1 text-right text-[11px] text-muted-foreground">{formatHour(row + 8)}</div>{practitioners.map((doctor) => <div key={`${doctor.name}-${row}`} data-drop-practitioner={doctor.name} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); moveAppointment(event.dataTransfer.getData("text/plain"), doctor.name) }} className="h-16 border-b border-l" />)}</div>)}<div className="pointer-events-none absolute inset-y-0 left-[58px] right-0 grid grid-cols-5">{practitioners.map((doctor) => { const doctorAppointments = visibleAppointments.filter((appointment) => appointment.practitioner === doctor.name); const columnHolds = holds.filter((hold) => hold.practitioner === doctor.name); return <div key={doctor.name} className="relative h-[640px] border-l">{columnHolds.map((hold) => <div key={hold.id} style={{ top: `${(hold.start - 8) * 64}px`, height: `${(hold.end - hold.start) * 64 - 2}px` }} className="pointer-events-none absolute inset-x-0.5 grid place-items-center rounded-md border border-dashed bg-muted/70 text-xs text-muted-foreground"><span className="flex items-center gap-1"><IconClock className="size-3" />{hold.label}</span></div>)}{doctorAppointments.map((appointment) => <button key={appointment.id} type="button" draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", appointment.id)} title={`${appointment.patient} · ${appointment.status}`} onClick={() => setFeedback(`${appointment.patient} · ${appointment.status}`)} style={{ top: `${(appointment.start - 8) * 64}px`, height: `${Math.max(30, (appointment.end - appointment.start) * 64 - 3)}px` }} className={`pointer-events-auto absolute inset-x-0.5 z-10 overflow-hidden rounded-md border p-1 text-left text-[11px] ${statusTone[appointment.status]}`}><span className="flex items-center gap-1 truncate font-medium"><Avatar className="size-4 shrink-0"><AvatarImage src={demoAvatarUrl(appointment.patient)} alt="" /><AvatarFallback className="text-[7px]">{appointment.patient.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar>{appointment.patient}<span className={`shrink-0 rounded px-1 py-0.5 text-[9px] ${statusBadge[appointment.status]}`}>{appointment.status}</span></span>{appointment.end - appointment.start > 0.6 && <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">{formatHour(appointment.start)} <span>·</span> {appointment.treatment}</span>}</button>)}</div> })}</div></div>
    </div></div> : <div className="grid min-h-48 place-items-center text-sm text-muted-foreground">No recent changes</div>}
    {feedback && <div role="status" className="sr-only">{feedback}</div>}
    {filterOpen && <div className="flex flex-wrap gap-2 border-t px-4 py-3 text-xs"><span className="rounded-full border px-2 py-1">Completed</span><span className="rounded-full border px-2 py-1">Arrived</span><span className="rounded-full border px-2 py-1">Booked</span><span className="rounded-full border px-2 py-1">In Chair</span><span className="rounded-full border px-2 py-1">Unpaid</span><span className="rounded-full border px-2 py-1">Cancelled</span></div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New Booking</DialogTitle><DialogDescription>Book a chair for May 14.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Patient<Input value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Patient name" /></label><label className="grid gap-1.5 text-sm">Practitioner<Select value={practitioner} onValueChange={setPractitioner}><SelectTrigger><span>{practitioner}</span></SelectTrigger><SelectContent position="popper" align="start">{practitioners.map((doctor) => <SelectItem key={doctor.name} value={doctor.name}>{doctor.name}</SelectItem>)}</SelectContent></Select></label><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createBooking}>Create booking</Button></DialogFooter></DialogContent></Dialog>
  </div>
}

function formatHour(hour: number) {
  const wholeHour = Math.floor(hour)
  const minute = Math.round((hour - wholeHour) * 60)
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: minute ? "2-digit" : undefined }).format(new Date(2026, 4, 14, wholeHour, minute))
}
