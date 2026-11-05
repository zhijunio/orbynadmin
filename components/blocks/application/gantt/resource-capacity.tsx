"use client";

import { useMemo, useState } from "react";
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconCopy, IconDots, IconFilter, IconPlus, IconSettings, IconTrash } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { cn } from "@/utils/cn";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Person = { id: string; name: string; title: string; group: string; initials: string; capacity: number };
type Booking = { id: string; personId: string; title: string; client: string; workstream: string; priority: "High" | "Medium" | "Low"; start: number; end: number; allocation: number; color: "primary" | "info" | "success" | "warning" | "muted"; warning?: boolean };

const people: Person[] = [
  { id: "mira", name: "Mira Stone", title: "Design Lead", group: "Experience", initials: "MS", capacity: 100 },
  { id: "nora", name: "Nora Vale", title: "Product Designer", group: "Experience", initials: "NV", capacity: 100 },
  { id: "theo", name: "Theo Park", title: "Frontend Engineer", group: "Experience", initials: "TP", capacity: 80 },
  { id: "leo", name: "Leo Grant", title: "Staff Engineer", group: "Platform", initials: "LG", capacity: 100 },
  { id: "alex", name: "Alex Johnson", title: "Backend Engineer", group: "Platform", initials: "AJ", capacity: 100 },
  { id: "priya", name: "Priya Patel", title: "Platform Engineer", group: "Platform", initials: "PP", capacity: 60 },
  { id: "sana", name: "Sana Qureshi", title: "Research Lead", group: "Insights", initials: "SQ", capacity: 100 },
  { id: "devin", name: "Devin Okoye", title: "Data Analyst", group: "Insights", initials: "DO", capacity: 80 },
];

const groups = [
  { id: "Experience", lead: "Lead Mira Stone" },
  { id: "Platform", lead: "Lead Leo Grant" },
  { id: "Insights", lead: "Lead Sana Qureshi" },
];

const workstreams = ["Discovery", "Design", "Build", "Launch"];
const streamColor: Record<Booking["color"], string> = {
  primary: "border-l-primary",
  info: "border-l-info",
  success: "border-l-success",
  warning: "border-l-warning",
  muted: "border-l-muted-foreground/50",
};

const seedBookings: Booking[] = [
  { id: "checkout-audit", personId: "mira", title: "Checkout Audit", client: "Northwind Retail", workstream: "Discovery", priority: "High", start: 3, end: 10, allocation: 35, color: "primary" },
  { id: "design-system", personId: "mira", title: "Design System", client: "Internal", workstream: "Design", priority: "Medium", start: 8, end: 18, allocation: 25, color: "info" },
  { id: "onboarding", personId: "nora", title: "Onboarding Flow", client: "Kestrel Health", workstream: "Design", priority: "High", start: 4, end: 14, allocation: 70, color: "primary" },
  { id: "billing", personId: "theo", title: "Billing Rewrite", client: "Kestrel Health", workstream: "Build", priority: "High", start: 3, end: 12, allocation: 90, color: "warning", warning: true },
  { id: "launch-review", personId: "theo", title: "Launch Review", client: "Northwind Retail", workstream: "Launch", priority: "Medium", start: 11, end: 23, allocation: 0, color: "warning" },
  { id: "search-rollout", personId: "leo", title: "Search Rollout", client: "Northwind Retail", workstream: "Launch", priority: "Medium", start: 6, end: 18, allocation: 50, color: "warning" },
  { id: "event-pipeline", personId: "leo", title: "Event Pipeline", client: "Meridian Logistics", workstream: "Build", priority: "Low", start: 13, end: 20, allocation: 0, color: "info" },
  { id: "ledger-sync", personId: "alex", title: "Ledger Sync", client: "Meridian Logistics", workstream: "Build", priority: "Medium", start: 3, end: 12, allocation: 80, color: "success" },
  { id: "cache-tuning", personId: "priya", title: "Cache Tuning", client: "Internal", workstream: "Build", priority: "Low", start: 4, end: 9, allocation: 60, color: "muted" },
  { id: "pricing-study", personId: "sana", title: "Pricing Study", client: "Northwind Retail", workstream: "Discovery", priority: "High", start: 5, end: 18, allocation: 60, color: "primary" },
  { id: "churn-model", personId: "devin", title: "Churn Model", client: "Kestrel Health", workstream: "Discovery", priority: "Medium", start: 7, end: 21, allocation: 50, color: "info" },
];

const defaultDraft = (personId = people[0].id): Booking => ({ id: "", personId, title: "", client: "Internal", workstream: workstreams[0], priority: "Medium", start: 3, end: 6, allocation: 25, color: "primary" });
function bookingsFor(bookings: Booking[], personId: string) {
  return bookings.filter((booking) => booking.personId === personId).reduce((sum, booking) => sum + booking.allocation, 0);
}

function monthWeeks(date: Date) {
  const monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = 1;
  const count = monthDays;
  const weeks: { label: string; shortLabel: string; start: number; end: number }[] = [];
  for (let day = firstDay; day <= monthDays;) {
    const current = new Date(date.getFullYear(), date.getMonth(), day);
    const daysLeft = 6 - current.getDay();
    const end = Math.min(monthDays, day + daysLeft);
    const yearStart = new Date(current.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((Math.floor((current.getTime() - yearStart.getTime()) / 86_400_000) + yearStart.getDay() + 1) / 7);
    const weekStart = new Date(current.getFullYear(), current.getMonth(), day - current.getDay());
    const weekMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(weekStart);
    weeks.push({ label: `W${weekNumber} ${weekMonth} ${weekStart.getDate()} - ${end}`, shortLabel: weekStart.getMonth() !== date.getMonth() ? `W${weekNumber}` : `W${weekNumber} ${weekMonth} ${weekStart.getDate()} - ${end}`, start: day, end });
    day = end + 1;
  }
  return { firstDay, count, weeks };
}

export function ResourceCapacity() {
  const [bookings, setBookings] = useState(seedBookings);
  const [date, setDate] = useState(new Date(2026, 7, 1));
  const [workstream, setWorkstream] = useState("all");
  const [squad, setSquad] = useState("all");
  const [overCapacityOnly, setOverCapacityOnly] = useState(false);
  const [showRole, setShowRole] = useState(true);
  const [showLoad, setShowLoad] = useState(true);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [draft, setDraft] = useState<Booking | null>(null);
  const [feedback, setFeedback] = useState("");
  const [dragged, setDragged] = useState<string | null>(null);
  const { firstDay, count, weeks } = monthWeeks(date);
  const timelineColumn = 3 + Number(showRole) + Number(showLoad);
  const gridColumns = `200px ${showRole ? "150px " : ""}${showLoad ? "72px " : ""}40px repeat(${count}, 54px)`;
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
  const shortMonthLabel = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const dayNumbers = Array.from({ length: count }, (_, index) => index + firstDay);
  const filteredPeople = useMemo(() => people.filter((person) => {
    const groupMatch = squad === "all" || person.group === squad;
    const capacityMatch = !overCapacityOnly || bookingsFor(bookings, person.id) > person.capacity;
    return groupMatch && capacityMatch;
  }), [bookings, overCapacityOnly, squad]);

  function saveBooking() {
    if (!draft) return;
    const allocation = Math.max(1, Math.min(100, draft.allocation));
    const next = { ...draft, allocation, start: Math.max(firstDay, Math.min(count + firstDay - 1, draft.start)), end: Math.max(draft.start, Math.min(count + firstDay - 1, draft.end)), id: draft.id || crypto.randomUUID() };
    const current = bookingsFor(bookings.filter((booking) => booking.id !== draft.id), next.personId) + allocation;
    if (current > (people.find((person) => person.id === next.personId)?.capacity ?? 100)) { setFeedback(`${people.find((person) => person.id === next.personId)?.name ?? "This person"} would be booked over capacity (${current}%).`); return; }
    setBookings((items) => draft.id ? items.map((item) => item.id === draft.id ? next : item) : [...items, next]);
    setDraft(null);
    setFeedback(`${next.title} saved.`);
  }

  function moveBooking(bookingId: string, personId: string, day: number) {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking) return;
    const target = people.find((person) => person.id === personId);
    const total = bookingsFor(bookings.filter((item) => item.id !== bookingId && item.personId === personId), personId) + booking.allocation;
    if (total > (target?.capacity ?? 100)) { setFeedback(`Moving ${booking.title} would exceed ${target?.name ?? "the resource"} capacity.`); return; }
    const duration = booking.end - booking.start;
    const start = Math.max(firstDay, Math.min(count + firstDay - duration, day));
    setBookings((items) => items.map((item) => item.id === bookingId ? { ...item, personId, start, end: start + duration } : item));
    setFeedback(`${booking.title} moved to ${target?.name ?? "the resource"}.`);
  }

  function changeMonth(amount: number) {
    setDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }

  return <Card className="overflow-hidden gap-0 py-0 shadow-none">
    <CardHeader className="flex flex-nowrap flex-row items-center gap-2 border-b px-3 py-2">
      <Button variant="ghost" size="sm" onClick={() => setDate(new Date(2026, 7, 1))}>Today</Button>
      <Button variant="outline" size="sm" aria-label="Select view">Month<IconChevronDown /></Button>
      <div className="flex shrink-0"><Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={() => changeMonth(-1)}><IconChevronLeft /></Button><Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={() => changeMonth(1)}><IconChevronRight /></Button></div>
      <span className="min-w-0 truncate text-sm font-medium">{monthLabel}</span>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm"><IconFilter />Filter</Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuCheckboxItem checked={workstream === "all"} onSelect={() => setWorkstream("all")}>All workstreams</DropdownMenuCheckboxItem>{workstreams.map((stream) => <DropdownMenuCheckboxItem key={stream} checked={workstream === stream} onSelect={() => setWorkstream(stream)}>{stream}</DropdownMenuCheckboxItem>)}<DropdownMenuCheckboxItem checked={squad === "Experience"} onSelect={() => setSquad(squad === "Experience" ? "all" : "Experience")}>Experience</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={squad === "Platform"} onSelect={() => setSquad(squad === "Platform" ? "all" : "Platform")}>Platform</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={squad === "Insights"} onSelect={() => setSquad(squad === "Insights" ? "all" : "Insights")}>Insights</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={overCapacityOnly} onCheckedChange={setOverCapacityOnly}>Over capacity only</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>
        <Button size="sm" onClick={() => setDraft(defaultDraft())}><IconPlus />New Booking</Button>
      </div>
    </CardHeader>
    <CardContent className="overflow-x-auto p-0">
      <div className="min-w-max">
        <div className="grid border-b bg-background text-xs text-muted-foreground" style={{ gridTemplateColumns: gridColumns }}>
          <div className="row-span-2 flex items-center border-r px-9" style={{ gridColumn: 1 }}>Resources</div>
          {showRole && <div className="row-span-2 flex items-center border-r px-2" style={{ gridColumn: 2 }}>Role</div>}
          {showLoad && <div className="row-span-2 flex items-center border-r px-2" style={{ gridColumn: showRole ? 3 : 2 }}>Load</div>}
          <div className="row-span-2 flex items-center justify-center border-r" style={{ gridColumn: timelineColumn - 1 }}><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-xs" aria-label="Show or hide columns"><IconSettings /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuCheckboxItem checked={showRole} onCheckedChange={setShowRole}>Role</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem checked={showLoad} onCheckedChange={setShowLoad}>Load</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu></div>
          <div className="grid grid-rows-2" style={{ gridColumn: `${timelineColumn} / span ${count}`, gridRow: "span 2", gridTemplateColumns: `repeat(${count}, 54px)` }}>
            <div className="grid border-b" style={{ gridColumn: "1 / -1", gridTemplateColumns: `repeat(${count}, 54px)` }}>{weeks.map((week) => <div key={week.label} title={week.label} className="overflow-hidden text-ellipsis whitespace-nowrap border-r px-2 py-2" style={{ gridColumn: `span ${week.end - week.start + 1}` }}>{week.shortLabel}</div>)}</div>
            <div className="grid" style={{ gridColumn: "1 / -1", gridTemplateColumns: `repeat(${count}, 54px)` }}>{dayNumbers.map((day) => { const weekday = new Date(date.getFullYear(), date.getMonth(), day).getDay(); return <div key={day} className={cn("whitespace-nowrap border-r px-1 py-2 text-center text-[11px]", (weekday === 0 || weekday === 6) && "bg-muted/40")}>{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(date.getFullYear(), date.getMonth(), day))} {day}</div>; })}</div>
          </div>
        </div>
        {groups.map((group) => {
          const members = filteredPeople.filter((person) => person.group === group.id);
          if (!members.length) return null;
          const booked = members.reduce((sum, person) => sum + bookingsFor(bookings, person.id), 0);
          const capacity = members.reduce((sum, person) => sum + person.capacity, 0);
          const isCollapsed = collapsed.includes(group.id);
          return <section key={group.id}>
            <div className="grid h-14 border-b bg-background text-xs" style={{ gridTemplateColumns: gridColumns }}>
              <div className="flex items-center gap-2 border-r px-3" style={{ gridColumn: 1 }}><button type="button" aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${group.id}`} aria-expanded={!isCollapsed} onClick={() => setCollapsed((items) => isCollapsed ? items.filter((id) => id !== group.id) : [...items, group.id])}><IconChevronDown className={cn("size-3.5 transition-transform", isCollapsed && "-rotate-90")} /></button><span className="font-medium">{group.id}</span><span className="text-muted-foreground">{members.length}</span></div>
              {showRole && <div className="flex items-center border-r px-2 text-muted-foreground" style={{ gridColumn: 2 }}>{group.lead}</div>}
              {showLoad && <div className="flex items-center border-r px-2" style={{ gridColumn: showRole ? 3 : 2 }}><Badge variant={booked > capacity ? "destructive-light" : "success-light"} size="sm">{booked}/{capacity}</Badge></div>}
              <div className="flex items-center justify-center border-r" style={{ gridColumn: timelineColumn - 1 }} />
              <div className="flex items-center px-2" style={{ gridColumn: `${timelineColumn} / span ${count}` }}><div className="h-1.5 w-full rounded-full bg-muted"><div className="h-full rounded-full bg-success" style={{ width: `${Math.min(100, booked / capacity * 100)}%` }} /></div></div>
            </div>
            {!isCollapsed && members.map((person) => {
              const allocation = bookingsFor(bookings, person.id);
              const resourceBookings = bookings.filter((booking) => booking.personId === person.id && (workstream === "all" || booking.workstream === workstream));
              return <div key={person.id} data-person-id={person.id} className="grid min-h-[64px] border-b last:border-0" style={{ gridTemplateColumns: gridColumns }} onDragOver={(event) => { if (dragged) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); if (!dragged) return; const track = event.currentTarget.querySelector("[data-month-timeline]")?.getBoundingClientRect(); if (!track) return; const day = Math.max(firstDay, Math.min(count + firstDay - 1, Math.floor((event.clientX - track.left) / (track.width / count)) + firstDay)); moveBooking(dragged, person.id, day); setDragged(null); }}>
                <div className="sticky left-0 z-10 flex items-center gap-2 border-r bg-card px-3" style={{ gridColumn: 1 }}><Avatar size="xs"><AvatarImage src={demoAvatarUrl(person.name)} alt="" /><AvatarFallback>{person.initials}</AvatarFallback></Avatar><div className="min-w-0"><div className="truncate text-xs font-medium">{person.name}</div><div className="truncate text-[11px] text-muted-foreground">{person.title}</div></div></div>
                {showRole && <div className="flex items-center border-r px-2 text-xs text-muted-foreground" style={{ gridColumn: 2 }}>{person.title}</div>}
                {showLoad && <div className="flex items-center border-r px-1" style={{ gridColumn: showRole ? 3 : 2 }}><Badge variant={allocation > person.capacity ? "destructive-light" : allocation >= person.capacity * 0.85 ? "warning-light" : "success-light"} size="sm">{allocation}/{person.capacity}</Badge></div>}
                <div className="flex items-center justify-center border-r" style={{ gridColumn: timelineColumn - 1 }}><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-xs" aria-label={`Actions for ${person.name}`}><IconDots /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setDraft(defaultDraft(person.id))}><IconPlus />New Booking</DropdownMenuItem><DropdownMenuItem variant="destructive" onSelect={() => { setBookings((items) => items.filter((booking) => booking.personId !== person.id)); setFeedback(`Bookings cleared for ${person.name}.`); }}><IconTrash />Clear row</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
                <div data-month-timeline={person.id} className="relative grid min-h-[64px]" style={{ gridColumn: `${timelineColumn} / span ${count}`, gridTemplateColumns: `repeat(${count}, 54px)` }}>
                  {dayNumbers.map((day) => { const weekday = new Date(date.getFullYear(), date.getMonth(), day).getDay(); return <div key={day} className={cn("border-r", weekday === 0 || weekday === 6 ? "bg-muted/40" : "bg-background")} />; })}
                  {resourceBookings.map((booking) => <div key={booking.id} className="z-10 mx-0.5 my-1.5 min-w-0" style={{ gridColumn: `${booking.start - firstDay + 1} / span ${booking.end - booking.start + 1}`, gridRow: "1" }}>
                    <div draggable onDragStart={() => setDragged(booking.id)} onDragEnd={() => setDragged(null)} className={cn("group relative flex h-[52px] cursor-grab items-center overflow-hidden rounded-md border border-border border-l-2 bg-card px-2", streamColor[booking.color], booking.warning && "border-l-destructive")}>
                      <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setDraft(booking)} title={booking.title}>
                        <span className="block truncate text-xs font-medium text-foreground">{booking.warning && <span className="mr-1 text-destructive">!</span>}{booking.title}</span>
                        <span className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-muted-foreground"><span className="truncate">{booking.client}</span><span>·</span><span>{shortMonthLabel} {booking.start}</span><Badge variant="outline" size="sm">{booking.workstream}</Badge><Badge variant={booking.priority === "High" ? "destructive-light" : booking.priority === "Medium" ? "warning-light" : "secondary"} size="sm">{booking.priority}</Badge></span>
                      </button>
                      <AvatarGroup className="ml-1 shrink-0" aria-label={`Assigned to ${person.name}`}><Avatar size="xs" className="size-5"><AvatarImage src={demoAvatarUrl(person.name)} alt="" /><AvatarFallback>{person.initials}</AvatarFallback></Avatar></AvatarGroup>
                      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-xs" className="ml-1" aria-label={`Actions for ${booking.title}`}><IconDots /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setDraft(booking)}>Edit booking</DropdownMenuItem><DropdownMenuItem onSelect={() => { const copy = { ...booking, id: crypto.randomUUID(), title: `${booking.title} copy` }; const total = bookingsFor(bookings, copy.personId) + copy.allocation; if (total > person.capacity) { setFeedback(`Duplicating ${booking.title} would exceed ${person.name}'s capacity.`); return; } setBookings((items) => [...items, copy]); setFeedback(`${copy.title} duplicated.`); }}><IconCopy />Duplicate</DropdownMenuItem><DropdownMenuItem variant="destructive" onSelect={() => { setBookings((items) => items.filter((item) => item.id !== booking.id)); setFeedback(`${booking.title} cancelled.`); }}><IconTrash />Cancel booking</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                    </div>
                  </div>)}
                </div>
              </div>;
            })}
          </section>;
        })}
      </div>
      <p role="status" className="min-h-8 border-t px-3 py-2 text-xs text-muted-foreground">{feedback}</p>
    </CardContent>
    <Dialog open={!!draft} onOpenChange={(open) => { if (!open) setDraft(null); }}><DialogContent><DialogHeader><DialogTitle>{draft?.id ? "Edit booking" : "New booking"}</DialogTitle><DialogDescription>Schedule a resource and check its monthly capacity.</DialogDescription></DialogHeader>{draft && <div className="grid gap-4 py-2"><div className="grid gap-2"><Label htmlFor="capacity-title">Booking name</Label><Input id="capacity-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></div><div className="grid gap-2"><Label htmlFor="capacity-client">Client</Label><Input id="capacity-client" value={draft.client} onChange={(event) => setDraft({ ...draft, client: event.target.value })} /></div><div className="grid gap-2"><Label htmlFor="capacity-person">Resource</Label><NativeSelect id="capacity-person" value={draft.personId} onChange={(event) => setDraft({ ...draft, personId: event.target.value })}>{people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</NativeSelect></div><div className="grid grid-cols-2 gap-3"><div className="grid gap-2"><Label htmlFor="capacity-start">Starts</Label><Input id="capacity-start" type="number" min={firstDay} max={count + firstDay - 1} value={draft.start} onChange={(event) => setDraft({ ...draft, start: Number(event.target.value) })} /></div><div className="grid gap-2"><Label htmlFor="capacity-end">Ends</Label><Input id="capacity-end" type="number" min={draft.start} max={count + firstDay - 1} value={draft.end} onChange={(event) => setDraft({ ...draft, end: Number(event.target.value) })} /></div></div><div className="grid grid-cols-2 gap-3"><div className="grid gap-2"><Label htmlFor="capacity-workstream">Workstream</Label><NativeSelect id="capacity-workstream" value={draft.workstream} onChange={(event) => setDraft({ ...draft, workstream: event.target.value })}>{workstreams.map((stream) => <option key={stream}>{stream}</option>)}</NativeSelect></div><div className="grid gap-2"><Label htmlFor="capacity-priority">Priority</Label><NativeSelect id="capacity-priority" value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as Booking["priority"] })}><option>High</option><option>Medium</option><option>Low</option></NativeSelect></div></div><div className="grid gap-2"><Label htmlFor="capacity-allocation">Allocation (%)</Label><Input id="capacity-allocation" type="number" min={1} max={100} value={draft.allocation} onChange={(event) => setDraft({ ...draft, allocation: Number(event.target.value) })} /></div></div>}<DialogFooter><Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button><Button onClick={saveBooking} disabled={!draft?.title.trim()}>Save booking</Button></DialogFooter></DialogContent></Dialog>
  </Card>;
}
