"use client";

import { Fragment, useState, type ReactNode } from "react";
import { CalendarDate, getLocalTimeZone, startOfWeek } from "@internationalized/date";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

export function formatTriggerDate(date: CalendarDate, locale?: string) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date.toDate(getLocalTimeZone()));
}
export function formatChipDate(date: CalendarDate) { return `${String(date.day).padStart(2, "0")}/${String(date.month).padStart(2, "0")}/${date.year}`; }
export function parseChipDate(text: string): CalendarDate | null {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim()); if (!match) return null;
  try { return new CalendarDate(Number(match[3]), Number(match[2]), Number(match[1])); } catch { return null; }
}

type MonthPanelProps = {
  "aria-label"?: string;
  date?: CalendarDate;
  onMonthChange?: (date: CalendarDate) => void;
  selected?: CalendarDate | null;
  selectedDates?: CalendarDate[];
  dayClassName?: (date: CalendarDate) => string | undefined;
  rangeEnd?: CalendarDate | null;
  onSelect?: (date: CalendarDate) => void;
  showPrev?: boolean;
  showNext?: boolean;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
  isDateUnavailable?: (date: CalendarDate) => boolean;
  showWeekNumbers?: boolean;
  locale?: string;
  dir?: "ltr" | "rtl";
  navigationPosition?: "inline" | "right";
  dayContent?: (date: CalendarDate) => ReactNode;
};
export function MonthPanel({ date, onMonthChange, selected, selectedDates, dayClassName, rangeEnd, onSelect, showPrev = true, showNext = true, minValue, maxValue, isDateUnavailable, showWeekNumbers = false, locale: localeOverride, dir, navigationPosition = "inline", dayContent, "aria-label": ariaLabel }: MonthPanelProps) {
  const currentLocale = useLocale(); const locale = localeOverride ?? currentLocale; const t = useTranslations("DateControls");
  const [internalDate, setInternalDate] = useState(() => new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
  const [focusedDate, setFocusedDate] = useState(selected ?? date ?? internalDate);
  const month = date ?? internalDate;
  const first = new CalendarDate(month.year, month.month, 1);
  const weekStart = startOfWeek(first, locale);
  const cells = Array.from({ length: 42 }, (_, i) => weekStart.add({ days: i }));
  const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: "short" }).format(weekStart.add({ days: i }).toDate(getLocalTimeZone())));
  const visibleFocus = focusedDate.month === month.month && focusedDate.year === month.year ? focusedDate : selected?.month === month.month && selected.year === month.year ? selected : first;
  const move = (amount: number) => { const next = month.add({ months: amount }); onMonthChange?.(next); if (!onMonthChange) setInternalDate(next); };
  const withinRange = (day: CalendarDate) => selected && rangeEnd && day.compare(selected) >= 0 && day.compare(rangeEnd) <= 0;
  const unavailable = (day: CalendarDate) => Boolean((minValue && day.compare(minValue) < 0) || (maxValue && day.compare(maxValue) > 0) || isDateUnavailable?.(day));
  const focusDate = (next: CalendarDate) => {
    setFocusedDate(next);
    const nextMonth = new CalendarDate(next.year, next.month, 1);
    if (next.month !== month.month || next.year !== month.year) {
      onMonthChange?.(nextMonth);
      if (!onMonthChange) setInternalDate(nextMonth);
    }
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-calendar-date="${next.toString()}"]`)?.focus());
  };
  const handleDayKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, day: CalendarDate) => {
    let next: CalendarDate | undefined;
    if (event.key === "ArrowLeft") next = day.subtract({ days: 1 });
    if (event.key === "ArrowRight") next = day.add({ days: 1 });
    if (event.key === "ArrowUp") next = day.subtract({ days: 7 });
    if (event.key === "ArrowDown") next = day.add({ days: 7 });
    if (event.key === "PageUp") next = day.add(event.shiftKey ? { years: -1 } : { months: -1 });
    if (event.key === "PageDown") next = day.add(event.shiftKey ? { years: 1 } : { months: 1 });
    if (event.key === "Home") next = new CalendarDate(day.year, day.month, 1);
    if (event.key === "End") next = new CalendarDate(day.year, day.month, day.calendar.getDaysInMonth(day));
    if (next && !unavailable(next)) { event.preventDefault(); focusDate(next); }
  };
  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month.toDate(getLocalTimeZone()));
  const previousButton = showPrev ? <button type="button" aria-label={t("previousMonth")} onClick={() => move(-1)} className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconChevronLeft className="size-4" /></button> : <span className="size-8" aria-hidden="true" />;
  const nextButton = showNext ? <button type="button" aria-label={t("nextMonth")} onClick={() => move(1)} className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconChevronRight className="size-4" /></button> : <span className="size-8" aria-hidden="true" />;
  return <section dir={dir} className="w-[296px] max-w-full rounded-xl border border-border bg-card p-3 shadow-sm" aria-label={ariaLabel ?? new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month.toDate(getLocalTimeZone()))}>
    <div dir={dir} className="mb-3 flex items-center justify-between">{navigationPosition === "right" ? <><span className="text-sm font-semibold">{monthLabel}</span><div className="flex items-center">{previousButton}{nextButton}</div></> : <>{previousButton}<span className="text-sm font-semibold">{monthLabel}</span>{nextButton}</>}</div>
    <div role="grid" className={cn("grid gap-y-1 text-center", showWeekNumbers ? "grid-cols-8" : "grid-cols-7")}>
      {showWeekNumbers && <div role="columnheader" className="pb-1 text-[10px] font-medium text-muted-foreground">Wk</div>}
      {weekdays.map((day, i) => <div role="columnheader" key={i} className="pb-1 text-xs font-medium text-muted-foreground">{day}</div>)}
      {cells.map((day, i) => { const isCurrent = day.month === month.month; const isStart = selected && day.compare(selected) === 0; const isEnd = rangeEnd && day.compare(rangeEnd) === 0; const isMultipleSelected = selectedDates?.some((selectedDate) => selectedDate.compare(day) === 0) ?? false; const isSelected = isMultipleSelected || isStart || isEnd || (selected && !rangeEnd && day.compare(selected) === 0); const disabled = unavailable(day); return <Fragment key={day.toString()}>{showWeekNumbers && i % 7 === 0 && <div role="rowheader" className="flex items-center justify-center text-[10px] tabular-nums text-muted-foreground">{getISOWeekNumber(day)}</div>}<div role="gridcell" aria-selected={Boolean(isSelected || withinRange(day))} className="flex justify-center"><button type="button" data-calendar-date={day.toString()} disabled={disabled} onClick={() => { setFocusedDate(day); onSelect?.(day); }} onKeyDown={(event) => handleDayKeyDown(event, day)} tabIndex={day.compare(visibleFocus) === 0 ? 0 : -1} aria-label={formatTriggerDate(day, locale)} className={cn("size-8 rounded-md text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", dayContent && "flex h-12 w-10 flex-col items-center justify-center gap-0.5", !isCurrent && "text-muted-foreground/50", withinRange(day) && "bg-primary/10", isSelected && "bg-primary text-primary-foreground hover:bg-primary/90", dayClassName?.(day), disabled && "cursor-not-allowed opacity-40 hover:bg-transparent")}>{dayContent ? dayContent(day) : day.day}</button></div></Fragment>})}
    </div>
  </section>;
}
function getISOWeekNumber(date: CalendarDate) {
  const day = date.toDate("UTC");
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
  return String(Math.ceil((((day.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)).padStart(2, "0");
}
export function DateChipInput({ date, label, onCommit }: { date: CalendarDate; label: string; onCommit: (date: CalendarDate) => void }) {
  const formatted = formatChipDate(date); const [draft, setDraft] = useState({ source: formatted, text: formatted }); const text = draft.source === formatted ? draft.text : formatted;
  const commit = () => { const parsed = parseChipDate(text); if (parsed) onCommit(parsed); setDraft({ source: formatted, text: parsed ? formatChipDate(parsed) : formatted }); };
  return <input type="text" dir="ltr" inputMode="numeric" value={text} onChange={e => setDraft({ source: formatted, text: e.currentTarget.value })} onBlur={commit} onKeyDown={e => { if (e.key === "Enter") e.currentTarget.blur(); if (e.key === "Escape") setDraft({ source: formatted, text: formatted }); }} aria-label={label} className="h-9 w-[108px] rounded-md border border-input bg-background px-2 text-sm tabular-nums shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />;
}
export const triggerButtonClassName = "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm shadow-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
