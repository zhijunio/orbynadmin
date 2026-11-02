"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";

import { Button } from "@/components/base/buttons/button";
import { Card } from "@/components/base/card/card";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/base/popover/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select/select";
import { cn } from "@/utils/cn";

type EventColor = "blue" | "emerald" | "amber" | "rose" | "violet";
type EventCalendar = "work" | "personal";

type CalEvent = {
  day: number;
  title: string;
  translationKey?: string;
  time: string;
  color: EventColor;
  calendar: EventCalendar;
  attendees?: string[];
  meetingCode?: string;
};

const colorDot: Record<EventColor, string> = {
  blue: "bg-primary",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
};

const colorPill: Record<EventColor, string> = {
  blue: "bg-primary/10 text-primary dark:text-primary",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  amber: "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
};

const eventColors: EventColor[] = ["blue", "emerald", "amber", "rose", "violet"];

const initialEvents: CalEvent[] = [
  { day: 3, title: "Design review", translationKey: "designReview", time: "10:00 AM", color: "violet", calendar: "work" },
  { day: 7, title: "Sprint planning", translationKey: "sprintPlanning", time: "9:30 AM", color: "blue", calendar: "work", attendees: ["Alex Morgan", "Priya Nair", "Marcus Chen"], meetingCode: "sprint-729" },
  { day: 9, title: "1:1 with Emma", translationKey: "oneOnOneEmma", time: "2:00 PM", color: "emerald", calendar: "work", attendees: ["Alex Morgan", "Emma Novak"], meetingCode: "emma-1on1" },
  { day: 14, title: "Product demo", translationKey: "productDemo", time: "11:00 AM", color: "amber", calendar: "work", attendees: ["Alex Morgan", "Sofia Rossi", "Lucas Silva"], meetingCode: "demo-0814" },
  { day: 17, title: "Board meeting", translationKey: "boardMeeting", time: "3:00 PM", color: "rose", calendar: "work", attendees: ["Alex Morgan", "Priya Nair", "Marcus Chen"], meetingCode: "board-0717" },
  { day: 17, title: "Team lunch", translationKey: "teamLunch", time: "12:30 PM", color: "emerald", calendar: "personal" },
  { day: 22, title: "Release v2.4", translationKey: "releaseV24", time: "All day", color: "blue", calendar: "work" },
  { day: 28, title: "Quarterly review", translationKey: "quarterlyReview", time: "1:00 PM", color: "violet", calendar: "work", attendees: ["Alex Morgan", "Hannah Kim"], meetingCode: "q3-review" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const BASE_YEAR = 2026;
const BASE_MONTH = 6; // July (0-indexed)
const TODAY = 17;

export default function CalendarPage() {
  const locale = useLocale();
  const tr = useTranslations("Apps.Calendar");
  const [events, setEvents] = useState<CalEvent[]>(initialEvents);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<number>(TODAY);
  const [calendarFilter, setCalendarFilter] = useState<"all" | EventCalendar>("all");

  // New-event dialog state.
  const [addOpen, setAddOpen] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evDay, setEvDay] = useState<number>(TODAY);
  const [evTime, setEvTime] = useState("");
  const [evColor, setEvColor] = useState<EventColor>("blue");
  const [evCalendar, setEvCalendar] = useState<EventCalendar>("work");

  const eventTitle = (event: CalEvent) => {
    const key = event.translationKey ? `events.${event.translationKey}` : "";
    return key && tr.has(key) ? tr(key) : event.title;
  };

  const view = new Date(BASE_YEAR, BASE_MONTH + monthOffset, 1);
  const monthLabel = view.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(
    view.getFullYear(),
    view.getMonth() + 1,
    0,
  ).getDate();
  const firstWeekday = view.getDay();
  const isBaseMonth = monthOffset === 0;

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay = (day: number) =>
    isBaseMonth
      ? events.filter((event) => event.day === day && (calendarFilter === "all" || event.calendar === calendarFilter))
      : [];
  function goToday() {
    setMonthOffset(0);
    setSelected(TODAY);
  }

  function openAdd() {
    setEvTitle("");
    setEvDay(isBaseMonth ? selected : TODAY);
    setEvTime("");
    setEvColor("blue");
    setEvCalendar("work");
    setAddOpen(true);
  }

  function addEvent() {
    const t = evTitle.trim();
    if (!t) return;
    const day = Math.min(Math.max(Math.round(evDay) || TODAY, 1), 31);
    setEvents((prev) => [
      ...prev,
      { day, title: t, time: evTime.trim() || "All day", color: evColor, calendar: evCalendar },
    ]);
    setMonthOffset(0); // events live in the base month — jump there so it shows
    setCalendarFilter(evCalendar);
    setSelected(day);
    setAddOpen(false);
    toast.success(tr("eventAdded"), { description: `${t} · ${new Date(BASE_YEAR, BASE_MONTH, day).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric" })}` });
  }

  return <ConsoleLayout>{<div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{tr("title")}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={calendarFilter} onValueChange={(value) => setCalendarFilter(value as "all" | EventCalendar)}>
            <SelectTrigger aria-label={tr("calendarFeed")} className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">{tr("allCalendars")}</SelectItem>
              <SelectItem value="work">{tr("workCalendar")}</SelectItem>
              <SelectItem value="personal">{tr("personalCalendar")}</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-r-none"
              onClick={() => setMonthOffset((o) => o - 1)}
              aria-label={tr("previousMonth")}
            >
              <IconChevronLeft className="size-4" />
            </Button>
            <span className="min-w-32 px-2 text-center text-sm font-medium">
              {monthLabel}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-l-none"
              onClick={() => setMonthOffset((o) => o + 1)}
              aria-label={tr("nextMonth")}
            >
              <IconChevronRight className="size-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={goToday}>
            {tr("today")}
          </Button>
          <Button onClick={openAdd}>
            <IconPlus className="size-4" /> {tr("newEvent")}
          </Button>
        </div>
      </div>

      <div>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[560px] sm:min-w-0">
          <div className="grid grid-cols-7 border-b bg-muted/30">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="py-2.5 text-center text-xs font-medium text-muted-foreground"
              >
                {tr(`weekdays.${d}`)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const dayEvents = day ? eventsByDay(day) : [];
              const isToday = isBaseMonth && day === TODAY;
              return (
                <div
                  key={i}
                  role="gridcell"
                  className={cn(
                    "min-h-24 border-b border-r p-1.5 text-left align-top transition-colors last:border-r-0",
                    "[&:nth-child(7n)]:border-r-0",
                    !day && "bg-muted/20",
                    day === selected && "bg-primary/5 ring-1 ring-inset ring-primary/30",
                  )}
                >
                  {day && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelected(day)}
                        aria-label={`${day} ${monthLabel}`}
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full text-xs font-medium tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isToday
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {day}
                      </button>
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map((e, idx) => (
                          <Popover key={`${day}-${idx}`}>
                            <PopoverTrigger asChild>
                              <button type="button" onClick={() => setSelected(day)} className={cn("flex w-full items-center gap-1 truncate rounded px-1 py-0.5 text-left text-[11px] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", colorPill[e.color])}>
                                <span className={cn("size-1.5 shrink-0 rounded-full", colorDot[e.color])} />
                                <span className="truncate">{eventTitle(e)}</span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="gap-2.5">
                              <PopoverHeader>
                                <PopoverTitle>{eventTitle(e)}</PopoverTitle>
                                <PopoverDescription>{new Date(view.getFullYear(), view.getMonth(), day).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</PopoverDescription>
                              </PopoverHeader>
                              <div className="flex items-center gap-2 border-t pt-2 text-xs text-muted-foreground">
                                <span className={cn("size-2 rounded-full", colorDot[e.color])} />
                                {e.time === "All day" ? tr("allDay") : e.time}
                              </div>
                              {e.attendees && e.attendees.length > 0 && (
                                <div className="space-y-1.5 border-t pt-2">
                                  <p className="text-xs font-medium">{tr("attendees", { count: e.attendees.length })}</p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1.5" aria-hidden="true">
                                      {e.attendees.slice(0, 4).map((name) => (
                                        <span key={name} title={name} className="flex size-6 items-center justify-center rounded-full border-2 border-popover bg-muted text-[9px] font-medium text-muted-foreground">
                                          {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                                        </span>
                                      ))}
                                    </div>
                                    <span className="min-w-0 truncate text-xs text-muted-foreground">{e.attendees.join(", ")}</span>
                                  </div>
                                </div>
                              )}
                              {e.meetingCode && (
                                <>
                                  <p className="border-t pt-2 text-xs text-muted-foreground">{tr("meetingCode")}: <span className="font-medium text-foreground">{e.meetingCode}</span></p>
                                  <Button size="sm" className="w-full" onClick={() => toast.info(tr("joiningMeeting"), { description: e.meetingCode })}>{tr("joinMeeting")}</Button>
                                </>
                              )}
                            </PopoverContent>
                          </Popover>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="px-1 text-[11px] text-muted-foreground">
                            {tr("more", { count: dayEvents.length - 2 })}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </Card>

      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tr("newEvent")}</DialogTitle>
            <DialogDescription>
              {tr("addEventDescription", { month: new Date(BASE_YEAR, BASE_MONTH, 1).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", { month: "long" }), year: BASE_YEAR })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ev-title">{tr("eventTitle")}</Label>
              <Input
                id="ev-title"
                value={evTitle}
                onChange={(e) => setEvTitle(e.target.value)}
                placeholder={tr("eventPlaceholder")}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) addEvent();
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ev-day">{tr("day")}</Label>
                <Input
                  id="ev-day"
                  type="number"
                  min={1}
                  max={31}
                  value={evDay}
                  onChange={(e) => setEvDay(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ev-time">{tr("time")}</Label>
                <Input
                  id="ev-time"
                  value={evTime}
                  onChange={(e) => setEvTime(e.target.value)}
                  placeholder="10:00 AM"
                />
              </div>
              <div className="space-y-2">
                <Label>{tr("color")}</Label>
                <Select value={evColor} onValueChange={(v) => setEvColor(v as EventColor)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventColors.map((c) => (
                      <SelectItem key={c} value={c}>
                        <span className="flex items-center gap-2">
                          <span className={cn("size-2.5 rounded-full", colorDot[c])} />
                        <span>{tr(`colors.${c}`)}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{tr("calendarFeed")}</Label>
                <Select value={evCalendar} onValueChange={(value) => setEvCalendar(value as EventCalendar)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">{tr("workCalendar")}</SelectItem>
                    <SelectItem value="personal">{tr("personalCalendar")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              {tr("cancel")}
            </Button>
            <Button onClick={addEvent} disabled={!evTitle.trim()}>
              {tr("addEvent")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>}</ConsoleLayout>;
}
