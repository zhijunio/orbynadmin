import * as React from "react";
import type { ReactNode } from "react";
import { IconBrandVercel, IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { Input } from "@/components/ui/input/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { demoAvatarUrl } from "@/utils/demo-avatar";
import { BrandMark } from "@/components/custom/auth/brand-mark";

export function ShellPreview({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider className="h-svh min-h-0 overflow-hidden bg-background">
        <div className="h-full min-h-0 w-full min-w-0 overflow-hidden bg-background">{children}</div>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export function ProjectBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${className}`}>
      <BrandMark size="small" />
      <span className="truncate text-sm font-semibold">NextRose</span>
    </div>
  );
}

export function VercelWorkspace({ compact = false }: { compact?: boolean }) {
  const [workspace, setWorkspace] = React.useState("Vercel");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" type="button" className={`min-w-0 justify-start ${compact ? "h-8 gap-2 px-2" : "h-10 w-full gap-2 px-2"}`}>
        <IconBrandVercel className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate text-sm">{workspace}</span>
        <IconChevronRight className="ml-auto size-4 rotate-90 text-muted-foreground" aria-hidden="true" />
      </Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>Switch workspace</DropdownMenuLabel><DropdownMenuSeparator />
        {["Vercel", "Acme Inc."].map(name => <DropdownMenuItem key={name} onSelect={() => setWorkspace(name)}>{name}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ClaudeWorkspace({ compact = false }: { compact?: boolean }) {
  return (
    <Button variant="ghost" type="button" className={`min-w-0 justify-start ${compact ? "h-9 gap-2 px-2" : "h-10 w-full gap-2 px-2"}`}>
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-600 text-[10px] font-semibold text-white" aria-hidden="true">C</span>
      <span className="truncate text-sm">Claude</span>
      <span className="ml-auto text-muted-foreground" aria-hidden="true">···</span>
    </Button>
  );
}

export function DemoAvatar({ name, className = "size-7" }: { name: string; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={demoAvatarUrl(name)} alt="" />
      <AvatarFallback className="bg-muted text-[10px] font-medium text-foreground">{name.split(/\s+/).map(part => part[0]).join("").slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

export function AvatarStack({ names, size = "size-6" }: { names: string[]; size?: string }) {
  return (
    <span className="flex -space-x-2" aria-label={`${names.length} participants`}>
      {names.map(name => <DemoAvatar key={name} name={name} className={`${size} border-2 border-background`} />)}
    </span>
  );
}

export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  color: string;
  people: string[];
};

export const initialCalendarEvents: CalendarEvent[] = [
  { title: "Weekly Team Standup", start: "9:00 AM", end: "9:30 AM", color: "bg-indigo-500", people: ["Sarah Chen", "Marcus Lee", "Emma Wilson"] },
  { title: "Design Review · Component Library v3", start: "11:00 AM", end: "12:00 PM", color: "bg-violet-500", people: ["Sarah Chen"] },
  { title: "Coffee with Alex", start: "2:00 PM", end: "2:30 PM", color: "bg-orange-500", people: ["Alex Martin"] },
];

const calendarAccounts = [
  { email: "nick@company.io", calendars: [{ name: "Work", color: "bg-indigo-500" }, { name: "Personal", color: "bg-emerald-500" }, { name: "Meetings", color: "bg-violet-500" }] },
  { email: "nick@gmail.com", calendars: [{ name: "Family", color: "bg-amber-500" }, { name: "Birthdays", color: "bg-rose-500" }] },
];

export function CalendarSidebar({
  year,
  month,
  selectedDay,
  onSelectDay,
  onMonthChange,
  events = initialCalendarEvents,
  timezone = false,
  onNewEvent,
  onShare,
  side = "left",
}: {
  year: number;
  month: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onMonthChange: (year: number, month: number) => void;
  events?: CalendarEvent[];
  timezone?: boolean;
  onNewEvent: () => void;
  onShare: () => void;
  side?: "left" | "right";
}) {
  const [expandedAccount, setExpandedAccount] = React.useState<string | null>(calendarAccounts[0].email);
  const [checked, setChecked] = React.useState<string[]>(calendarAccounts[0].calendars.map(calendar => calendar.name));
  const [extraAccount, setExtraAccount] = React.useState(false);
  const title = new Date(year, month, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
  const firstWeekday = new Date(year, month, 1).getDay();
  const monthLength = new Date(year, month + 1, 0).getDate();
  const previousMonthLength = new Date(year, month, 0).getDate();
  const cells = Array.from({ length: Math.ceil((firstWeekday + monthLength) / 7) * 7 }, (_, index) => {
    const day = index - firstWeekday + 1;
    if (day < 1) return { day: previousMonthLength + day, current: false };
    if (day > monthLength) return { day: day - monthLength, current: false };
    return { day, current: true };
  });
  const eventDays = month === 5 ? [6, 8, 10, 13, 15, 17] : month === 1 ? [20, 22, 24, 27] : [4, 10, 16, 22];
  const moveMonth = (amount: number) => {
    const date = new Date(year, month + amount, 1);
    onMonthChange(date.getFullYear(), date.getMonth());
  };

  return (
    <aside className={`flex min-h-0 min-w-0 shrink-0 flex-col ${side === "left" ? "w-full border-r md:w-[18.75rem]" : "w-[17.5rem] border-l"}`}>
      {side === "left" && <div className="flex h-10 shrink-0 items-center justify-between px-3">
        <h2 className="text-sm font-medium">{side === "left" ? "Calendars" : title}</h2>
        {side === "left" && <Button variant="ghost" size="icon" className="size-7" aria-label="Add calendar" onClick={onNewEvent}><span className="text-lg leading-none">+</span></Button>}
      </div>}
      <div className="border-b px-3 pb-3">
        <div className="flex h-8 items-center justify-between">
          {side === "right" && <Button variant="ghost" size="icon" className="size-7" aria-label="Previous month" onClick={() => moveMonth(-1)}><IconChevronLeft className="size-4" /></Button>}
          {side === "left" && <span className="text-sm">{title}</span>}
          <span className={`text-sm font-medium ${side === "left" ? "sr-only" : ""}`}>{side === "right" ? title : null}</span>
          {side === "left" && <div className="flex"><Button variant="ghost" size="icon" className="size-7" aria-label="Previous month" onClick={() => moveMonth(-1)}><IconChevronLeft className="size-4" /></Button><Button variant="ghost" size="icon" className="size-7" aria-label="Next month" onClick={() => moveMonth(1)}><IconChevronRight className="size-4" /></Button></div>}
          {side === "right" && <Button variant="ghost" size="icon" className="size-7" aria-label="Next month" onClick={() => moveMonth(1)}><IconChevronRight className="size-4" /></Button>}
        </div>
        <div className="mt-1 grid grid-cols-7 text-center text-xs text-muted-foreground">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => <span key={day} className="py-1">{day}</span>)}</div>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {cells.map((cell, index) => (
            <button key={`${cell.current ? "current" : "adjacent"}-${cell.day}-${index}`} type="button" aria-label={`${cell.current ? title : "Adjacent month"} ${cell.day}`} aria-pressed={cell.current && selectedDay === cell.day} disabled={!cell.current} onClick={() => onSelectDay(cell.day)} className={`relative mx-auto grid size-7 place-items-center rounded-lg text-xs transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none ${cell.current && selectedDay === cell.day ? "bg-foreground text-background hover:bg-foreground" : cell.current ? "text-foreground" : "text-muted-foreground/50"}`}>
              {cell.day}
              {cell.current && eventDays.includes(cell.day) && <span aria-hidden="true" className={`absolute -top-0.5 size-1 rounded-full ${selectedDay === cell.day ? "bg-background" : "bg-muted-foreground"}`} />}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="border-b px-3 py-3">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground"><span>MY CALENDARS</span><Badge variant="outline" className="h-5 px-1.5">{checked.length}</Badge></div>
          {calendarAccounts.map(account => <div key={account.email}>
            <button type="button" aria-expanded={expandedAccount === account.email} onClick={() => setExpandedAccount(expandedAccount === account.email ? null : account.email)} className="flex h-8 w-full items-center gap-2 rounded-md px-1.5 text-xs hover:bg-muted">
              <IconChevronRight className={`size-3.5 transition-transform duration-150 motion-reduce:transition-none ${expandedAccount === account.email ? "rotate-90" : ""}`} />
              <span className="flex-1 text-left">{account.email}</span><Badge variant="outline" className="h-5 px-1.5">{account.calendars.length}</Badge>
            </button>
            {expandedAccount === account.email && account.calendars.map(calendar => <label key={calendar.name} className="flex h-8 items-center gap-2 pl-5 text-sm">
              <span className={`size-2 rounded-full ${calendar.color}`} />
              <input type="checkbox" checked={checked.includes(calendar.name)} onChange={() => setChecked(current => current.includes(calendar.name) ? current.filter(name => name !== calendar.name) : [...current, calendar.name])} className="size-4 accent-foreground" />
              <span>{calendar.name}</span>
            </label>)}
          </div>)}
          {extraAccount && <div className="flex h-8 items-center gap-2 px-2 text-xs"><span className="size-2 rounded-full bg-sky-500"/> team@company.io <Badge variant="outline" className="ml-auto h-5 px-1.5">1</Badge></div>}
          <Button variant="ghost" type="button" className="mt-1 h-8 w-full justify-start gap-2 px-1.5 text-sm text-muted-foreground" onClick={() => setExtraAccount(value => !value)}><span aria-hidden="true">+</span>{extraAccount ? "Remove account" : "Add account"}</Button>
        </div>
        <div className="px-3 py-3">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground"><span>UP NEXT</span><Badge variant="outline" className="h-5 px-1.5">{events.length}</Badge></div>
          <div className="grid gap-2">{events.map(event => <button key={event.title} type="button" className="flex min-w-0 gap-2 rounded-md p-1.5 text-left transition-colors hover:bg-muted motion-reduce:transition-none"><span className={`w-1 shrink-0 rounded-full ${event.color}`} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{event.title}</span><span className="mt-0.5 block text-xs text-muted-foreground">{event.start} to {event.end}</span></span><span className="hidden shrink-0 sm:block"><AvatarStack names={event.people} size="size-5" /></span></button>)}</div>
        </div>
      </div>
      <div className="grid shrink-0 gap-1 border-t p-2">
        <Button type="button" className="h-8 justify-start gap-2" onClick={onNewEvent}><span aria-hidden="true">+</span>New Event</Button>
        <Button type="button" variant="outline" className="h-8 justify-start gap-2" onClick={onShare}><IconCalendar className="size-4" />Share Availability</Button>
        {timezone && <div className="border-t px-2 pt-2 text-[11px] text-muted-foreground"><div>Your timezone</div><div>GMT+5 (+05:00) · Asia/Tashkent</div></div>}
      </div>
    </aside>
  );
}

export function NewCalendarEventDialog({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (open: boolean) => void; onCreate: (title: string) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>New Event</DialogTitle></DialogHeader>
        <form className="grid gap-4" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; const value = new FormData(form).get("title"); if (typeof value === "string" && value.trim()) onCreate(value.trim()); }}>
          <Input name="title" aria-label="Event title" placeholder="Event name" required />
          <div className="grid grid-cols-2 gap-3"><Input name="date" aria-label="Event date" type="date" defaultValue="2026-06-10"/><Input name="time" aria-label="Event time" type="time" defaultValue="09:00"/></div>
          <DialogFooter><Button type="submit">Create event</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
