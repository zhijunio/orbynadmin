"use client";

import { useState, type ReactNode } from "react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { IconCalendar, IconCheck, IconChevronDown, IconChevronLeft, IconChevronRight, IconClock, IconDots, IconPlus, IconVideo, IconWorld } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible/collapsible";
import { FileUpload } from "@/components/ui/file-upload/file-upload";
import { Input } from "@/components/ui/input/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Textarea } from "@/components/ui/textarea/textarea";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Example = { number: number; title: string; description: string; size: string; wide?: boolean };
const examples: Example[] = [
  { number: 1, title: "Appointment Planner", description: "Month calendar with a filterable day agenda.", size: "max-w-4xl", wide: true },
  { number: 2, title: "Time Range Picker", description: "Set a work session with quick duration presets.", size: "max-w-md" },
  { number: 3, title: "Meeting Scheduler", description: "Pick a meeting date, time, repeat rule and options.", size: "max-w-lg" },
  { number: 4, title: "Booking Page", description: "Choose a host, available day and meeting time.", size: "max-w-3xl", wide: true },
  { number: 5, title: "Team Attendance", description: "Review team presence and attendance totals.", size: "max-w-md" },
  { number: 6, title: "Create Schedule", description: "Create an event with members, time and files.", size: "max-w-lg" },
  { number: 7, title: "Webinar RSVP", description: "Review event details and respond to an invitation.", size: "max-w-md" },
  { number: 8, title: "Team Agenda", description: "Filter a compact month agenda by event category.", size: "max-w-[26rem]" },
  { number: 9, title: "Session Booking", description: "Choose a day, duration and open appointment slot.", size: "max-w-lg" },
  { number: 10, title: "Due Date Picker", description: "Set a date and time from shortcuts, calendar and slots.", size: "max-w-lg" },
];
const featuredExampleNumbers = new Set([1, 2, 4, 5, 7]);

export function ScheduleShowcase() {
  return <main className="mx-auto w-full max-w-7xl space-y-6 pb-8">
    <div className="flex flex-wrap items-end justify-between gap-2"><h1 className="text-2xl font-semibold tracking-tight">Schedule</h1><p className="text-sm text-muted-foreground">5 schedule examples</p></div>
    <div className="grid min-w-0 gap-x-6 gap-y-8 md:grid-cols-2">
      {examples.filter(({ number }) => featuredExampleNumbers.has(number)).map((example) => <ComponentPreview key={example.number} title={example.title} className={example.wide ? "min-w-0 md:col-span-2" : "min-w-0"} previewClassName="w-full items-start">
        <div className="w-full min-w-0 space-y-4"><p className="text-sm text-muted-foreground">{example.description}</p><div className={`w-full ${example.size}`}><ScheduleExample kind={example.number} /></div></div>
      </ComponentPreview>)}
    </div>
  </main>;
}

const people = ["Michael Rodriguez", "Sofia Reyes", "James Park", "Mila Torres", "Alex Chen"];
const times = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"];
const categoryColors: Record<string, string> = { Sprint: "bg-violet-500", Standup: "bg-amber-500", Review: "bg-sky-500", Deadline: "bg-rose-500", Workshop: "bg-emerald-500" };
const demoDate = (month = 6, day = 9) => new CalendarDate(2026, month, day);

type Kind = Example["number"];
function ScheduleExample({ kind }: { kind: Kind }) {
  switch (kind) {
    case 1: return <AppointmentPlanner />;
    case 2: return <TimeRangePicker />;
    case 3: return <MeetingScheduler />;
    case 4: return <BookingPage />;
    case 5: return <TeamAttendance />;
    case 6: return <CreateSchedule />;
    case 7: return <WebinarRsvp />;
    case 8: return <TeamAgenda />;
    case 9: return <SessionBooking />;
    case 10: return <DueDatePicker />;
  }
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
}
function CompactCalendar({
  month, selected, onMonthChange, onSelect, dots = {}, disabledDay, className = "", showNavigation = true, daySize = "regular",
}: {
  month: CalendarDate; selected: CalendarDate | null; onMonthChange: (date: CalendarDate) => void;
  onSelect: (date: CalendarDate) => void; dots?: Record<number, string[]>;
  disabledDay?: (date: CalendarDate) => boolean; className?: string; showNavigation?: boolean; daySize?: "regular" | "large";
}) {
  const jsFirst = new Date(month.year, month.month - 1, 1);
  const startOffset = jsFirst.getDay();
  const dayCount = month.calendar.getDaysInMonth(month);
  const cellCount = Math.ceil((startOffset + dayCount) / 7) * 7;
  const cells = Array.from({ length: cellCount }, (_, index) => {
    const date = new CalendarDate(month.year, month.month, 1).add({ days: index - startOffset });
    return { date, currentMonth: date.month === month.month };
  });
  const move = (delta: number) => onMonthChange(month.add({ months: delta }));
  return <div className={`min-w-0 ${className}`}>
    {showNavigation && <div className="mb-3 grid grid-cols-[32px_minmax(0,1fr)_minmax(0,88px)_32px] items-center gap-1">
      <Button size="icon-sm" variant="ghost" aria-label="Previous month" onClick={() => move(-1)}><IconChevronLeft /></Button>
      <Select value={String(month.month)} onValueChange={(value) => onMonthChange(new CalendarDate(month.year, Number(value), 1))}><SelectTrigger className="h-8"><SelectValue /></SelectTrigger><SelectContent>{Array.from({ length: 12 }, (_, i) => <SelectItem key={i + 1} value={String(i + 1)}>{new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(2026, i, 1))}</SelectItem>)}</SelectContent></Select>
      <Select value={String(month.year)} onValueChange={(value) => onMonthChange(new CalendarDate(Number(value), month.month, 1))}><SelectTrigger className="h-8"><SelectValue /></SelectTrigger><SelectContent>{[2025, 2026, 2027, 2028].map((year) => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}</SelectContent></Select>
      <Button size="icon-sm" variant="ghost" aria-label="Next month" onClick={() => move(1)}><IconChevronRight /></Button>
    </div>}
    <div className="grid grid-cols-7 gap-1 text-center">{"SUN MON TUE WED THU FRI SAT".split(" ").map((day) => <span key={day} className="pb-1 text-[10px] font-medium text-muted-foreground">{day}</span>)}
      {cells.map(({ date, currentMonth }) => {
        const chosen = selected?.compare(date) === 0;
        const disabled = Boolean(disabledDay?.(date));
        return <button key={date.toString()} type="button" disabled={disabled} onClick={() => onSelect(date)} aria-pressed={chosen} aria-label={formatDay(date)} className={`relative flex ${daySize === "large" ? "h-14" : "h-10"} min-w-0 flex-col items-center justify-center rounded-lg text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${!currentMonth ? "text-muted-foreground/50" : "bg-muted/40"} ${chosen ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""} ${disabled ? "cursor-not-allowed opacity-35 hover:bg-transparent" : ""}`}>
          <span>{date.day}</span><span className="flex h-1 gap-0.5">{(dots[date.day] ?? []).slice(0, 3).map((color, i) => <i key={i} className={`size-1 rounded-full ${chosen ? "bg-primary-foreground" : color}`} />)}</span>
        </button>;
      })}
    </div>
  </div>;
}
function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Panel className={className}>{children}</Panel>;
}
function AvatarGroup({ names, limit = 3 }: { names: string[]; limit?: number }) {
  const shown = names.slice(0, limit);
  return <div className="flex items-center -space-x-2">{shown.map((name) => <Avatar key={name} size="sm" className="size-6 border-2 border-background"><AvatarImage src={demoAvatarUrl(name)} alt={name} /><AvatarFallback className="text-[9px]">{initials(name)}</AvatarFallback></Avatar>)}{names.length > limit && <span className="grid size-6 place-items-center rounded-full border-2 border-background bg-muted text-[10px] text-muted-foreground">+{names.length - limit}</span>}</div>;
}
function AvatarPerson({ name, role, confirmed = false }: { name: string; role?: string; confirmed?: boolean }) {
  return <div className="flex items-center gap-2.5"><Avatar size="sm"><AvatarImage src={demoAvatarUrl(name)} alt={name} /><AvatarFallback>{initials(name)}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p>{role && <p className="text-xs text-muted-foreground">{role}</p>}</div>{confirmed && <IconCheck className="size-4 text-success" />}</div>;
}
function initials(name: string) { return name.split(" ").map((word) => word[0]).join("").slice(0, 2); }
function formatDay(date: CalendarDate, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) { return new Intl.DateTimeFormat("en-US", opts).format(date.toDate(getLocalTimeZone())); }
function formatWeekdayDay(date: CalendarDate) { return `${new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date.toDate(getLocalTimeZone()))}, ${date.day}`; }
function StatusSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) { return <div className="flex items-center justify-between gap-3 text-sm"><span>{label}</span><Switch checked={checked} onCheckedChange={onChange} aria-label={label} /></div>; }

const appointmentEvents = [
  { title: "Mobile QA Handoff", status: "Upcoming", people: ["Elliot Wallace", "Alex Johnson", "Zoe Martin", "Mila Torres"], time: "Jun 10 · 2:30 pm", place: "Remote" },
  { title: "Quarterly All-Hands", status: "Upcoming", people: ["Theo Alvarez", "Sofia Reyes"], time: "Jun 10 · 4:00 pm", place: "Main Hall" },
  { title: "Marketing Campaign Review", status: "Pending", people: ["Theo Alvarez", "Sofia Reyes", "James Park", "Nora Patel"], time: "Jun 10 · 10:30 am", place: "Google Meet" },
  { title: "Hiring Panel · Design", status: "Completed", people: ["Alex Johnson", "Zoe Martin", "Lena Ford", "Elliot Wallace"], time: "Jun 10 · 11:00 am", place: "Zoom" },
  { title: "Release Sign-off", status: "Cancelled", people: ["Zoe Martin", "Lena Ford", "Elliot Wallace"], time: "Jun 10 · 3:00 pm", place: "Zoom" },
  { title: "UX Research Session", status: "Upcoming", people: ["Zoe Martin", "Lena Ford", "Elliot Wallace"], time: "Jun 10 · 4:00 pm", place: "Lab 2" },
];
function AppointmentPlanner() {
  const [month, setMonth] = useState(demoDate(6, 1));
  const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 10));
  const [filter, setFilter] = useState("All events");
  const eventDots = Object.fromEntries([4, 8, 10, 16, 22, 24, 28].map((day) => [day, ["bg-muted-foreground/60"]]));
  const visible = appointmentEvents.filter((event) => filter === "All events" || event.status === filter);
  return <Frame className="mx-auto grid h-[26.25rem] w-full max-w-4xl grid-cols-1 sm:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1fr)]">
    <div className="border-b p-4 sm:border-b-0 sm:border-r sm:p-5"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={setDate} dots={eventDots} /></div>
    <div className="flex min-h-0 min-w-0 flex-col p-4 sm:p-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-sm font-semibold">{date ? formatDay(date, { weekday: "long", month: "long", day: "numeric" }) : "Select a day"}</h3><p className="text-xs text-muted-foreground">{visible.length} events</p></div><div className="flex items-center gap-2"><Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger><SelectContent>{["All events", "Upcoming", "Pending", "Completed", "Cancelled"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select><Button size="sm" className="h-8" onClick={() => setFilter("Upcoming")}><IconPlus /> Add</Button></div></div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">{visible.map((event) => <a key={event.title} href="#" onClick={(e) => e.preventDefault()} className="block rounded-xl border px-3 py-2.5 hover:bg-muted/30"><p className="text-sm font-medium">{event.title}</p><div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground"><Badge variant="primary-light" size="sm">{event.status}</Badge><AvatarGroup names={event.people} /><span className="inline-flex items-center gap-1"><IconCalendar className="size-3" />{event.time}</span><span>{event.place}</span></div></a>)}{visible.length === 0 && <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">No events match this filter.</p>}</div>
    </div>
  </Frame>;
}

function TimeRangePicker() {
  const [start, setStart] = useState(9 * 60);
  const [end, setEnd] = useState(10 * 60);
  const [confirmed, setConfirmed] = useState(false);
  const [notice, setNotice] = useState("");
  const duration = Math.max(0, end - start);
  const presets = [15, 30, 60, 120, 180, 240, 300, 360, 420, 480];
  const setDuration = (minutes: number) => { setEnd(Math.ceil((start + minutes) / 15) * 15); setConfirmed(false); };
  return <Frame className="mx-auto w-full max-w-md p-4">
    <div className="flex items-center gap-3 border-b pb-3"><Avatar size="sm"><AvatarImage src={demoAvatarUrl("Alex Johnson")} alt="Alex Johnson" /><AvatarFallback>AJ</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Alex Johnson</p><p className="text-xs text-muted-foreground">Founder &amp; CEO</p></div><Button size="icon-sm" variant="ghost" aria-label="More time range actions" onClick={() => setNotice("Time range options opened")}><IconDots /></Button></div>
    <div className="my-3 rounded-xl border p-4"><div className="grid grid-cols-2 gap-4"><TimeSelect label="Start time" value={start} onChange={(value) => { setStart(value); setConfirmed(false); }} /><TimeSelect label="End time" value={end} onChange={(value) => { setEnd(value); setConfirmed(false); }} /></div><p className="mb-2 mt-4 text-sm font-medium">Duration</p><div className="grid grid-cols-5 gap-2">{presets.map((minutes) => <Button key={minutes} size="sm" variant={duration === minutes ? "default" : "outline"} onClick={() => setDuration(minutes)}>{minutes < 60 ? `${minutes} min` : `${minutes / 60} ${minutes === 60 ? "hour" : "hours"}`}</Button>)}</div></div>
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">{notice || <>Selected duration: <strong className="text-foreground">{formatDuration(duration)}</strong></>}</p><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => { setStart(540); setEnd(600); setConfirmed(false); }}>Cancel</Button><Button size="sm" onClick={() => setConfirmed(true)}>{confirmed ? "Applied" : "Apply"}</Button></div></div>
  </Frame>;
}
function TimeSelect({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const options = Array.from({ length: 96 }, (_, index) => index * 15);
  return <label className="grid min-w-0 gap-1.5 text-sm"><span className="font-medium">{label}</span><Select value={String(value)} onValueChange={(next) => onChange(Number(next))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="max-h-64">{options.map((option) => <SelectItem key={option} value={String(option)}>{formatTime(option)}</SelectItem>)}</SelectContent></Select></label>;
}
function formatTime(minutes: number) { const hour = Math.floor(minutes / 60) % 24; const min = minutes % 60; return `${String(hour % 12 || 12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`; }
function formatTime24(minutes: number) { return `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`; }
function formatDuration(minutes: number) { const hours = Math.floor(minutes / 60); const remainder = minutes % 60; return `${hours ? `${hours} ${hours === 1 ? "hour" : "hours"}` : ""}${hours && remainder ? " " : ""}${remainder ? `${remainder} min` : ""}` || "0 min"; }

function MeetingScheduler() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 30));
  const [slot, setSlot] = useState("10:00"); const [duration, setDuration] = useState("30 min"); const [repeat, setRepeat] = useState("Every week");
  const [title, setTitle] = useState(""); const [description, setDescription] = useState(""); const [waiting, setWaiting] = useState(true); const [recording, setRecording] = useState(false); const [scheduled, setScheduled] = useState(false);
  const slots = Array.from({ length: 25 }, (_, i) => `${String(8 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
  return <Frame className="mx-auto w-full max-w-lg">
    <div className="border-b px-3 py-2"><h3 className="text-sm font-semibold">Schedule Meeting</h3><p className="text-xs text-muted-foreground">Asia/Shanghai</p></div>
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_132px] sm:grid-cols-[minmax(0,1fr)_158px]"><div className="min-w-0 p-3"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={(value) => { setDate(value); setScheduled(false); }} /></div><div className="border-l p-3"><p className="mb-2 text-sm font-semibold">{date ? formatWeekdayDay(date) : "Pick a date"}</p><div className="max-h-[19rem] space-y-1 overflow-y-auto pr-1">{slots.map((time) => <Button key={time} size="sm" disabled={time === "12:00" || time === "12:30"} variant={slot === time ? "default" : "outline"} className="w-full" onClick={() => { setSlot(time); setScheduled(false); }}>{time}</Button>)}</div></div></div>
    <div className="space-y-3 border-t p-4"><div className="grid grid-cols-2 gap-3"><SelectField label="Duration" value={duration} onChange={setDuration} options={["15 min", "30 min", "45 min", "60 min", "90 min"]} /><SelectField label="Recurrence" value={repeat} onChange={setRepeat} options={["Does not repeat", "Every day", "Every week", "Every month"]} /></div><TextField label="Title" value={title} onChange={setTitle} placeholder="e.g. Weekly standup" /><label className="grid gap-1.5 text-sm"><span className="font-medium">Description</span><Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add agenda or notes..." rows={2} className="min-h-16 resize-none" /></label><div className="grid gap-2 sm:grid-cols-2"><StatusSwitch label="Waiting room" checked={waiting} onChange={setWaiting} /><StatusSwitch label="Auto-record" checked={recording} onChange={setRecording} /></div></div>
    <div className="flex gap-3 border-t p-3"><Button variant="outline" className="flex-1" onClick={() => setScheduled(false)}>Cancel</Button><Button className="flex-1" onClick={() => setScheduled(true)}>{scheduled ? "Meeting scheduled" : "Schedule meeting"}</Button></div>
  </Frame>;
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <label className="grid min-w-0 gap-1.5 text-sm"><span className="font-medium">{label}</span><Select value={value} onValueChange={onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></label>; }
function TextField({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) { return <label className="grid gap-1.5 text-sm"><span className="font-medium">{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} /></label>; }

function BookingPage() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 15));
  const [slot, setSlot] = useState(""); const [confirmed, setConfirmed] = useState(false);
  const dots = Object.fromEntries([16, 17, 18, 19, 22, 23, 25, 29].map((day) => [day, ["bg-muted-foreground/60"]]));
  return <Frame className="mx-auto w-full max-w-3xl">
    <div className="grid min-w-0 min-h-[24.5rem] grid-cols-1 sm:grid-cols-[250px_minmax(0,1fr)_150px]">
      <div className="flex flex-col items-center justify-center border-b p-5 text-center sm:border-b-0 sm:border-r"><Avatar size="lg" className="mb-3 size-14"><AvatarImage src={demoAvatarUrl("James Park")} alt="James Park" /><AvatarFallback>JP</AvatarFallback></Avatar><p className="text-sm font-semibold">James Park</p><p className="text-xs text-muted-foreground">Solutions Architect</p><div className="mt-5 w-full space-y-3 text-left text-xs"><p className="flex items-center gap-2"><IconCalendar className="size-4" />Career Coaching</p><p className="flex items-center gap-2"><IconVideo className="size-4" />Google Meet</p><p className="flex items-center gap-2"><IconClock className="size-4" />30 minutes</p><p className="flex items-center gap-2"><IconWorld className="size-4" />Asia/Shanghai (GMT+8)</p></div></div>
      <div className="min-w-0 border-b p-4 sm:border-b-0 sm:border-r"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={(value) => { setDate(value); setSlot(""); setConfirmed(false); }} dots={dots} disabledDay={(value) => value.compare(demoDate(6, 15)) < 0} /></div>
      <div className="p-4"><p className="mb-2 text-sm font-semibold">{date ? formatWeekdayDay(date) : "Choose a date"}</p><div className="max-h-[18.5rem] space-y-1.5 overflow-y-auto pr-1">{times.slice(0, 12).map((time, index) => <Button key={time} size="sm" disabled={[0, 3, 6].includes(index)} variant={slot === time ? "default" : "outline"} className="w-full" onClick={() => { setSlot(time); setConfirmed(false); }}>{time}</Button>)}</div></div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-3 py-2"><p className="text-xs text-muted-foreground">{confirmed ? `Booked ${formatDay(date!)} · ${slot}` : slot ? `${formatDay(date!)} · ${slot} · 30 minutes` : "Select a date and time to continue"}</p><Button size="sm" disabled={!date || !slot} onClick={() => setConfirmed(true)}>{confirmed ? "Booking confirmed" : "Confirm booking"}</Button></div>
  </Frame>;
}

function TeamAttendance() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 9)); const [filter, setFilter] = useState("All");
  const members = [{ name: "Zoe Martin", status: "Attendance" }, { name: "Ivan Petrov", status: "Attendance" }, { name: "Isla Park", status: "Attendance" }, { name: "Theo Alvarez", status: "Delayed" }, { name: "Mila Torres", status: "Absences" }, { name: "Elliot Wallace", status: "Attendance" }, { name: "Sofia Reyes", status: "Attendance" }, { name: "Lena Ford", status: "Attendance" }];
  const stats = [{ label: "Attendance", value: "6/8", color: "bg-muted-foreground/50" }, { label: "Absences", value: "1/8", color: "bg-muted-foreground/70" }, { label: "Delayed", value: "1/8", color: "bg-foreground/80" }];
  return <Frame className="mx-auto w-full max-w-md p-1">
    <div className="p-4 pb-2"><div className="mb-3 flex items-center justify-between gap-2"><Select value={String(month.month)} onValueChange={(value) => setMonth(new CalendarDate(month.year, Number(value), 1))}><SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger><SelectContent>{Array.from({ length: 12 }, (_, i) => <SelectItem key={i + 1} value={String(i + 1)}>{new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(2026, i, 1))}</SelectItem>)}</SelectContent></Select><Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-8 w-32"><span className="flex items-center gap-2">Filter <Badge variant="secondary" size="sm">3</Badge></span></SelectTrigger><SelectContent>{["All", "Attendance", "Absences", "Delayed"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={setDate} showNavigation={false} daySize="large" /></div>
    <div className="border-y px-4 py-3"><div className="mb-2 flex items-center justify-between gap-2"><p className="text-xs font-medium">Vertex Studio · Today</p><Button size="xs" variant="outline" onClick={() => setFilter("All")}>All</Button></div><AvatarGroup names={members.filter((member) => filter === "All" || member.status === filter).map((member) => member.name)} limit={4} /></div>
    <div className="space-y-2 p-3">{stats.map((stat, index) => <div key={stat.label} className="flex items-center gap-2 rounded-lg border px-3 py-2"><span className="w-20 text-xs font-medium">{stat.label}</span><Badge variant={index === 0 ? "success-light" : index === 1 ? "warning-light" : "secondary"} size="sm">{stat.value}</Badge><div className="ml-auto flex h-6 items-end gap-px" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} className={`w-1 rounded-t-[2px] ${stat.color}`} style={{ height: `${5 + ((i * 7 + index * 11) % 17)}px` }} />)}</div></div>)}</div>
  </Frame>;
}

function CreateSchedule() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(null);
  const [members, setMembers] = useState([people[0]]); const [files, setFiles] = useState<File[]>([]); const [start, setStart] = useState("09:00 AM"); const [end, setEnd] = useState("10:00 AM"); const [notice, setNotice] = useState(""); const [name, setName] = useState(""); const [link, setLink] = useState(""); const [description, setDescription] = useState("");
  const allTimes = times.map((time) => time);
  return <Frame className="mx-auto w-full max-w-lg">
    <div className="px-3 pt-2"><h3 className="text-sm font-semibold">Create schedule</h3><p className="text-xs text-muted-foreground">Complete the form below to create a schedule</p></div>
    <form className="space-y-3 border-t p-4" onSubmit={(event) => { event.preventDefault(); setNotice("Schedule created"); }}>
      <TextField label="Schedule name" value={name} onChange={setName} placeholder="Enter the schedule name" required />
      <div className="grid gap-1.5 text-sm"><span className="font-medium">Members</span><Popover><div className="flex min-h-9 flex-wrap items-center gap-1 rounded-lg border px-2 py-1">{members.map((name) => <Badge key={name} variant="secondary" className="gap-1 font-normal"><Avatar size="sm" className="size-4"><AvatarImage src={demoAvatarUrl(name)} alt="" /><AvatarFallback>{initials(name)}</AvatarFallback></Avatar>{name}<button type="button" aria-label={`Remove ${name}`} onClick={() => setMembers((current) => current.filter((item) => item !== name))}>×</button></Badge>)}<PopoverTrigger asChild><button type="button" className="px-1 text-sm text-muted-foreground">Add members...</button></PopoverTrigger></div><PopoverContent align="start" className="w-56">{people.filter((name) => !members.includes(name)).map((name) => <button key={name} type="button" className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-muted" onClick={() => setMembers((current) => [...current, name])}><Avatar size="sm"><AvatarImage src={demoAvatarUrl(name)} alt="" /><AvatarFallback>{initials(name)}</AvatarFallback></Avatar>{name}</button>)}</PopoverContent></Popover></div>
      <label className="grid gap-1.5 text-sm"><span className="font-medium">Date</span><Popover><PopoverTrigger asChild><Button variant="outline" className="justify-start font-normal text-muted-foreground"><IconCalendar />{date ? formatDay(date, { month: "short", day: "numeric", year: "numeric" }) : "Select the date"}<IconChevronDown className="ml-auto size-4" /></Button></PopoverTrigger><PopoverContent align="start"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={setDate} /></PopoverContent></Popover></label>
      <div className="grid grid-cols-2 gap-3"><SelectField label="Start time" value={start} onChange={setStart} options={allTimes} /><SelectField label="End time" value={end} onChange={setEnd} options={allTimes} /></div>
      <div><FileUpload files={files} onFilesChange={(next) => setFiles(next.slice(0, 3))} multiple maxSize={2 * 1024 * 1024} accept={{ "image/*": [".png", ".jpg", ".jpeg"] }} className="[&>button]:h-14 [&>button]:flex-row [&>button]:justify-start [&>button]:gap-3 [&>button]:px-4 [&>button]:py-2 [&>button>span:first-child]:mb-0 [&>button>span:first-child]:size-7 [&>button>span:first-child]:bg-transparent [&>button>span:nth-child(4)]:hidden" /><p className="mt-1 text-xs text-muted-foreground">Up to 3 files · 2 MB each</p></div>
      <TextField label="Add link" value={link} onChange={setLink} placeholder="Copy paste in here" />
      <label className="grid gap-1.5 text-sm"><span className="font-medium">Description</span><Textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={2} placeholder="(e.g: Work from mountain)" className="min-h-16 resize-none" /></label>
      <div className="flex gap-3 border-t pt-3"><Button type="button" variant="outline" className="flex-1" onClick={() => { setName(""); setDate(null); setLink(""); setDescription(""); setFiles([]); setNotice(""); }}>Cancel</Button><Button type="submit" className="flex-1">Create schedule</Button></div><p role="status" className="text-xs text-muted-foreground">{notice}</p>
    </form>
  </Frame>;
}

function WebinarRsvp() {
  const [live, setLive] = useState(false); const [recording, setRecording] = useState(true); const [rsvp, setRsvp] = useState("");
  return <Frame className="mx-auto w-full max-w-md p-1">
    <Collapsible defaultOpen><CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold"><span>Wednesday, 4:00 PM</span><AvatarGroup names={["Sofia Reyes", "James Park", "Mila Torres"]} /><IconChevronDown className="size-4" /></CollapsibleTrigger><CollapsibleContent className="rounded-xl border p-3"><div className="space-y-2.5"><DetailRow icon={<IconCalendar />} label="Date" value="Wednesday, Jul 1, 2026" /><DetailRow icon={<IconClock />} label="Time" value={<span><Badge variant="outline" size="sm">90 min</Badge> 4:00 PM – 5:30 PM</span>} /><DetailRow icon={<IconVideo />} label="Platform" value="Zoom Webinar" /><DetailRow icon={<IconCalendar />} label="Reminder" value="1 hour before" /><StatusSwitch label="Live stream" checked={live} onChange={setLive} /><StatusSwitch label="Recording" checked={recording} onChange={setRecording} /></div></CollapsibleContent></Collapsible>
    <Collapsible defaultOpen><CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold">Presenters<IconChevronDown className="size-4" /></CollapsibleTrigger><CollapsibleContent className="space-y-3 rounded-xl border p-3"><AvatarPerson name="Sofia Reyes" role="Product Lead" confirmed /><AvatarPerson name="James Park" role="Engineering Lead" confirmed /><AvatarPerson name="Mila Torres" role="Design Lead" /></CollapsibleContent></Collapsible>
    <Collapsible defaultOpen><CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold">Agenda<IconChevronDown className="size-4" /></CollapsibleTrigger><CollapsibleContent className="rounded-xl border p-3"><p className="text-sm leading-5 text-muted-foreground">Live walkthrough of AI collaboration tools, redesigned workflow engine, and open Q&amp;A with the team.</p><div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3"><span className="text-sm font-semibold">Joining?</span><div className="flex gap-1.5">{["Yes", "Skip", "Maybe"].map((choice) => <Button key={choice} size="xs" variant={rsvp === choice ? "default" : "outline"} aria-pressed={rsvp === choice} onClick={() => setRsvp(choice)}>{choice}</Button>)}</div></div></CollapsibleContent></Collapsible>
  </Frame>;
}
function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) { return <div className="grid grid-cols-[18px_1fr_auto] items-center gap-2 text-sm"><span className="text-muted-foreground">{icon}</span><span>{label}</span><span className="text-right text-muted-foreground">{value}</span></div>; }

const agendaEvents = [
  { title: "Sprint Kickoff", time: "Jun 9, 9am - 10:30am", category: "Sprint", people: ["Alex Chen", "Mila Torres"] },
  { title: "Eng Standup", time: "Jun 9, 9:30am - 9:45am", category: "Standup", people: ["Mila Torres", "Theo Alvarez"] },
  { title: "Figma Workshop", time: "Jun 9, 1pm - 1:15pm", category: "Workshop", people: ["Lena Ford", "Sofia Reyes"] },
  { title: "Auth Deadline", time: "Jun 9, 5pm - 5pm", category: "Deadline", people: ["Alex Chen", "Mila Torres", "Zoe Martin"] },
];
function TeamAgenda() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 9)); const [filter, setFilter] = useState("All"); const [notice, setNotice] = useState("");
  const dots = { 9: ["bg-violet-500", "bg-amber-500", "bg-sky-500"], 10: ["bg-rose-500"], 11: ["bg-sky-500", "bg-emerald-500"], 12: ["bg-violet-500", "bg-amber-500"], 15: ["bg-sky-500", "bg-emerald-500"], 16: ["bg-rose-500", "bg-amber-500"], 17: ["bg-violet-500", "bg-sky-500"], 18: ["bg-emerald-500"], 22: ["bg-violet-500", "bg-amber-500", "bg-sky-500"] };
  const visible = agendaEvents.filter((event) => filter === "All" || event.category === filter);
  return <Frame className="mx-auto w-full max-w-[26rem]">
    <div className="p-4"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={setDate} dots={dots} /></div>
    <div className="border-y px-4 py-3"><div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold">{date ? formatDay(date, { month: "long", day: "numeric", year: "numeric" }) : "Choose a day"}</p><Button size="icon-sm" variant="ghost" aria-label="Add event" onClick={() => setNotice("New event draft") }><IconPlus /></Button></div><div className="grid grid-cols-3 gap-1.5">{["All", "Sprint", "Standup", "Review", "Deadline", "Workshop"].map((value) => <Button key={value} size="xs" variant={filter === value ? "default" : "outline"} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value !== "All" && <i className={`size-1.5 rounded-full ${categoryColors[value]}`} />}{value}</Button>)}</div></div>
    <div className="max-h-64 space-y-2 overflow-y-auto p-3">{visible.map((event) => <div key={event.title} className="flex gap-3 rounded-xl border p-3"><span className={`w-1 shrink-0 rounded-full ${categoryColors[event.category]}`} /><div className="min-w-0 flex-1"><p className="text-sm font-medium">{event.title}</p><p className="text-xs text-muted-foreground">{event.time}</p></div><AvatarGroup names={event.people} limit={2} /></div>)}{!visible.length && <p className="p-5 text-center text-sm text-muted-foreground">No events in this category.</p>}</div>{notice && <p role="status" className="px-4 pb-3 text-xs text-muted-foreground">{notice}</p>}
  </Frame>;
}

function SessionBooking() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(null); const [duration, setDuration] = useState(30); const [slot, setSlot] = useState(""); const [booked, setBooked] = useState(false);
  const daySlots = Array.from({ length: Math.floor((17 * 60 - 9 * 60) / duration) }, (_, index) => 9 * 60 + index * duration);
  return <Frame className="mx-auto w-full max-w-lg">
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"><h3 className="text-sm font-semibold">Schedule a session</h3><div className="flex gap-1">{[15, 30, 45, 60, 90].map((value) => <Button key={value} size="xs" variant={duration === value ? "default" : "outline"} aria-pressed={duration === value} onClick={() => { setDuration(value); setSlot(""); setBooked(false); }}>{value}m</Button>)}</div></div>
    <div className="grid min-w-0 grid-cols-1 border-y sm:grid-cols-[minmax(0,1fr)_156px]"><div className="p-3"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={(value) => { setDate(value); setSlot(""); setBooked(false); }} /></div><div className="flex min-h-[17rem] flex-col border-t p-4 sm:border-l sm:border-t-0"><p className="text-sm font-semibold">{date ? formatWeekdayDay(date) : "Pick a date"}</p>{date ? <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto">{daySlots.map((minutes) => { const time = formatTime(minutes); const unavailable = minutes === 12 * 60 || minutes === 12 * 60 + 15; return <Button key={minutes} size="sm" disabled={unavailable} variant={slot === time ? "default" : "outline"} className="w-full" onClick={() => setSlot(time)}>{time}</Button>; })}</div> : <div className="grid flex-1 content-center justify-items-center gap-2 text-center text-xs text-muted-foreground"><span className="grid size-10 place-items-center rounded-full bg-muted"><IconClock className="size-5" /></span>Select a date to see available times</div>}</div></div>
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"><p className="text-xs text-muted-foreground">{booked ? `${formatDay(date!)} · ${slot} · ${duration} min` : "Choose a date and time to book"}</p><Button size="sm" disabled={!date || !slot} onClick={() => setBooked(true)}>{booked ? "Booked" : "Book session"}</Button></div>
  </Frame>;
}

function DueDatePicker() {
  const [month, setMonth] = useState(demoDate(6, 1)); const [date, setDate] = useState<CalendarDate | null>(demoDate(6, 30)); const [slot, setSlot] = useState("10:00"); const [notice, setNotice] = useState("");
  const shortcuts = [
    { label: "Today", detail: "Tuesday", icon: "text-amber-500", date: demoDate(6, 30) },
    { label: "Tomorrow", detail: "Wednesday", icon: "text-amber-500", date: demoDate(7, 1) },
    { label: "Later this week", detail: "Thursday", icon: "text-emerald-500", date: demoDate(7, 2) },
    { label: "Next week", detail: "Mon, Jul 6", icon: "text-violet-500", date: demoDate(7, 6) },
  ];
  const slots = Array.from({ length: 25 }, (_, index) => 8 * 60 + index * 30);
  return <Frame className="mx-auto w-full max-w-lg">
    <div className="border-b px-3 py-2 text-sm font-semibold">Asia/Shanghai</div>
    <div className="space-y-0.5 p-3">{shortcuts.map((shortcut, index) => <button key={shortcut.label} type="button" onClick={() => { setDate(shortcut.date); setMonth(new CalendarDate(shortcut.date.year, shortcut.date.month, 1)); setNotice(""); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted ${index === 0 ? "bg-muted/60" : ""}`}><IconCalendar className={`size-4 ${shortcut.icon}`} /><span className="flex-1 font-medium">{shortcut.label}</span><span className="text-xs text-muted-foreground">{shortcut.detail}</span></button>)}<button type="button" onClick={() => { setDate(null); setSlot(""); setNotice(""); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"><span className="size-4 text-destructive">×</span><span className="flex-1 font-medium">No date</span><span className="text-xs text-muted-foreground">Remove deadline</span></button></div>
    <div className="grid min-w-0 grid-cols-1 border-y sm:grid-cols-[minmax(0,1fr)_140px]"><div className="p-3"><CompactCalendar month={month} selected={date} onMonthChange={setMonth} onSelect={(value) => { setDate(value); setNotice(""); }} daySize="large" /></div><div className="border-t p-3 sm:border-l sm:border-t-0"><p className="mb-2 text-sm font-semibold">{date ? formatWeekdayDay(date) : "No date"}</p><div className="max-h-[17rem] space-y-1 overflow-y-auto pr-1">{slots.map((minutes) => { const time = formatTime24(minutes); const unavailable = minutes === 12 * 60; return <Button key={minutes} size="sm" disabled={unavailable} variant={slot === time ? "default" : "outline"} className="w-full" onClick={() => setSlot(time)}>{time}{unavailable && <span className="ml-auto text-[10px]">Booked</span>}</Button>; })}</div></div></div>
    <div className="flex gap-3 p-3"><Button size="sm" variant="outline" className="flex-1" onClick={() => setNotice("Changes cancelled")}>Cancel</Button><Button size="sm" className="flex-1" onClick={() => setNotice(date ? `Applied ${formatDay(date)} at ${slot}` : "Applied without a due date")}>Apply</Button></div>{notice && <p role="status" className="px-3 pb-3 text-xs text-muted-foreground">{notice}</p>}
  </Frame>;
}
