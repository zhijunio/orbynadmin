"use client";

import { useState } from "react";
import { IconBell, IconCalendar, IconChevronDown, IconChevronLeft, IconChevronRight, IconClock, IconPlus, IconSearch, IconUsers } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type CalendarPanel = "Calendars" | "Schedule" | "Contacts" | "Notifications";
const calendarNames = ["Work", "Personal", "Meetings"];
const calendarColors = ["bg-primary", "bg-success", "bg-violet-500"];
const events = [
  { title: "Weekly Team Standup", time: "9:00 AM to 9:30 AM", color: "border-primary", people: ["Sarah Chen", "Marcus Lee", "Emma Wilson"] },
  { title: "Design Review · Component Library v3", time: "11:00 AM to 12:00 PM", color: "border-violet-500", people: ["Sarah Chen"] },
  { title: "Coffee with Alex", time: "2:00 PM to 2:30 PM", color: "border-success", people: ["Alex Martin"] },
];

export function CalendarContactsHub() {
  const [panel, setPanel] = useState<CalendarPanel>("Calendars");
  const [month, setMonth] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 10));
  const [visibleCalendars, setVisibleCalendars] = useState(calendarNames);
  const [accounts, setAccounts] = useState(["nick@company.io", "nick@gmail.com"]);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("Week");
  const [eventOpen, setEventOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const label = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(month);
  const days = Array.from({ length: 35 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - month.getDay() + 1));
  const changeMonth = (offset: number) => { const next = new Date(month.getFullYear(), month.getMonth() + offset, 1); setMonth(next); setSelectedDate(next); };

  return (
    <div className="flex h-svh min-h-[32rem] min-w-0 overflow-hidden bg-background">
      <aside className="hidden w-12 shrink-0 flex-col items-center gap-2 border-r bg-sidebar py-2 sm:flex" aria-label="Calendar panels">
        <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><IconCalendar className="size-4" /></div>
        <nav className="grid w-full gap-1 px-1" aria-label="Workspace panels">
          {([["Calendars", IconCalendar], ["Schedule", IconClock], ["Contacts", IconUsers], ["Notifications", IconBell]] as const).map(([name, Icon]) => <Button key={name} type="button" variant="ghost" size="icon" aria-label={name} aria-pressed={panel === name} onClick={() => setPanel(name)} className={`size-9 ${panel === name ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground"}`}><Icon className="size-4" /></Button>)}
          <Button type="button" variant="ghost" size="icon" aria-label="Search" className="size-9 text-muted-foreground"><IconSearch className="size-4" /></Button>
        </nav>
        <Avatar className="mt-auto size-8"><AvatarImage src={demoAvatarUrl("Admin")} alt="Admin" /><AvatarFallback>AM</AvatarFallback></Avatar>
      </aside>

      <aside className="flex w-64 shrink-0 flex-col border-r sm:w-[19rem]" aria-label={panel}>
        <header className="flex h-12 shrink-0 items-center border-b px-3"><h1 className="text-sm font-semibold">{panel}</h1><Button type="button" variant="ghost" size="icon" className="ml-auto size-8" aria-label={`Add ${panel.toLowerCase()}`} onClick={() => panel === "Calendars" && setAccounts((items) => items.includes("nick@outlook.com") ? items : [...items, "nick@outlook.com"])}><IconPlus className="size-4" /></Button></header>
        {panel === "Calendars" && <>
          <MiniCalendar month={month} label={label} days={days} selectedDate={selectedDate} onSelect={setSelectedDate} onMonthChange={changeMonth} />
          <div className="min-h-0 flex-1 overflow-y-auto">
            <section className="border-t px-3 py-3"><h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">My calendars</h2>
              {accounts.map((account, index) => <details key={account} open={index === 0} className="group mb-1"><summary className="flex h-8 cursor-pointer list-none items-center gap-2 rounded-md px-2 text-xs font-medium hover:bg-muted"><IconChevronRight className="size-3.5 transition-transform group-open:rotate-90" />{account}<span className="ml-auto rounded-md border px-1.5 py-0.5 text-[10px] text-muted-foreground">{index === 0 ? calendarNames.length : 2}</span></summary>
                {index === 0 && <div className="grid gap-1 pl-2">{calendarNames.map((name, i) => <label key={name} className="flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:bg-muted"><Checkbox checked={visibleCalendars.includes(name)} onCheckedChange={(checked) => setVisibleCalendars((current) => checked ? [...current, name] : current.filter((item) => item !== name))} /><span className={`size-2 rounded-full ${calendarColors[i]}`} /><span>{name}</span></label>)}</div>}
              </details>)}
              <Button type="button" variant="ghost" className="h-8 w-full justify-start gap-2 px-2 text-sm text-muted-foreground" onClick={() => setAccounts((current) => current.includes("nick@outlook.com") ? current : [...current, "nick@outlook.com"])}><IconPlus className="size-4" />Add account</Button>
            </section>
            <section className="border-t px-3 py-3"><div className="mb-2 flex items-center justify-between"><h2 className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Up next</h2><span className="rounded-md border px-1.5 py-0.5 text-[10px] text-muted-foreground">{events.length}</span></div>
              <div className="grid gap-2">{events.map((event) => <button key={event.title} type="button" className={`flex gap-2 rounded-md border-l py-1.5 pl-2 text-left ${event.color}`} onClick={() => setEventOpen(true)}><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{event.title}</span><span className="block text-xs text-muted-foreground">{event.time}</span></span><span className="flex -space-x-2">{event.people.map((person) => <Avatar key={person} className="size-5 border-2 border-background"><AvatarImage src={demoAvatarUrl(person)} alt={person} /><AvatarFallback>{person[0]}</AvatarFallback></Avatar>)}</span></button>)}</div>
            </section>
          </div>
        </>}
        {panel === "Schedule" && <div className="grid content-start gap-2 p-3">{events.map((event) => <button key={event.title} type="button" onClick={() => setEventOpen(true)} className="rounded-lg border p-3 text-left"><span className="block text-sm font-medium">{event.title}</span><span className="text-xs text-muted-foreground">{event.time}</span></button>)}</div>}
        {panel === "Contacts" && <div className="grid content-start gap-2 p-3"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search contacts..." aria-label="Search contacts" className="h-8 text-xs" />{["Sarah Chen", "Marcus Lee", "Emma Wilson", "Maya Chen"].filter((name) => name.toLowerCase().includes(query.toLowerCase())).map((name) => <div key={name} className="flex items-center gap-2 py-1"><Avatar className="size-8"><AvatarImage src={demoAvatarUrl(name)} alt={name} /><AvatarFallback>{name[0]}</AvatarFallback></Avatar><span className="text-sm">{name}</span></div>)}</div>}
        {panel === "Notifications" && <div className="grid content-start gap-3 p-3 text-sm"><p><span className="font-medium">Maya Chen</span> invited you to Design review.</p><p><span className="font-medium">Weekly Team Standup</span> starts in 30 minutes.</p><p><span className="font-medium">Marcus Lee</span> updated the project calendar.</p></div>}
      </aside>

      <section className="flex min-w-0 flex-1 flex-col" aria-label="Calendar">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4"><h2 className="text-base font-semibold">{label}</h2><div className="flex items-center gap-0.5">{calendarNames.map((name, i) => visibleCalendars.includes(name) && <span key={name} aria-label={name} className={`size-2.5 rounded-full ${calendarColors[i]}`} />)}</div>
          <div className="ml-auto flex items-center gap-1"><Button type="button" variant="ghost" size="icon" aria-label="Previous month" className="size-8" onClick={() => changeMonth(-1)}><IconChevronLeft className="size-4" /></Button><Button type="button" variant="ghost" size="icon" aria-label="Next month" className="size-8" onClick={() => changeMonth(1)}><IconChevronRight className="size-4" /></Button><Button type="button" variant="outline" className="h-8 px-3 text-xs" onClick={() => setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 10))}>Today</Button><Button type="button" variant="outline" className="h-8 gap-2 px-3 text-xs" onClick={() => setView((current) => current === "Week" ? "Month" : "Week")}>{view}<IconChevronDown className="size-3.5" /></Button><Button type="button" className="h-8 gap-1.5 px-3 text-xs" onClick={() => setEventOpen(true)}><IconPlus className="size-4" />New Event</Button></div>
        </header>
        <main className="grid min-h-0 flex-1 grid-rows-[minmax(8rem,0.62fr)_minmax(12rem,2fr)] gap-4 p-4" aria-label="Calendar schedule"></main>
      </section>
      <Dialog open={eventOpen} onOpenChange={setEventOpen}><DialogContent><DialogHeader><DialogTitle>New event</DialogTitle></DialogHeader><Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Event title" aria-label="Event title" /><DialogFooter><Button type="button" variant="outline" onClick={() => setEventOpen(false)}>Cancel</Button><Button type="button" onClick={() => { setEventTitle(""); setEventOpen(false); }}>Create event</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function MiniCalendar({ month, label, days, selectedDate, onSelect, onMonthChange }: { month: Date; label: string; days: Date[]; selectedDate: Date; onSelect: (date: Date) => void; onMonthChange: (offset: number) => void }) {
  return <section className="shrink-0 px-3 py-3" aria-label="Mini calendar"><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-medium">{label}</h2><div className="flex"><Button type="button" variant="ghost" size="icon" className="size-7" aria-label="Previous month" onClick={() => onMonthChange(-1)}><IconChevronLeft className="size-4" /></Button><Button type="button" variant="ghost" size="icon" className="size-7" aria-label="Next month" onClick={() => onMonthChange(1)}><IconChevronRight className="size-4" /></Button></div></div><div className="grid grid-cols-7 text-center text-[11px] text-muted-foreground">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <span key={day} className="grid h-6 place-items-center">{day}</span>)}</div><div className="grid grid-cols-7">{days.map((date, i) => { const inMonth = date.getMonth() === month.getMonth(); const selected = date.toDateString() === selectedDate.toDateString(); const event = inMonth && [6, 8, 10, 12, 15, 18, 23].includes(date.getDate()); return <button key={`${date.toISOString()}-${i}`} type="button" aria-label={date.toLocaleDateString("en", { dateStyle: "long" })} aria-pressed={selected} onClick={() => onSelect(date)} className={`relative grid h-10 place-items-center rounded-lg text-xs ${selected ? "bg-foreground text-background" : inMonth ? "hover:bg-muted" : "text-muted-foreground"}`}>{date.getDate()}{event && !selected && <span className="absolute bottom-1 size-1 rounded-full bg-muted-foreground" />}</button>; })}</div></section>;
}
