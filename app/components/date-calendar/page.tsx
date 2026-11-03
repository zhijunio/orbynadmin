"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { CalendarDate, today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "next-intl";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";

export default function DateCalendarPage() {
  const locale = useLocale();
  const now = today(getLocalTimeZone());
  const [selected, setSelected] = useState(() => {
    let firstAvailableDate = now;
    while (isWeekend(firstAvailableDate, locale)) {
      firstAvailableDate = firstAvailableDate.add({ days: 1 });
    }
    return firstAvailableDate;
  });
  const [range, setRange] = useState<{ start: CalendarDate; end: CalendarDate } | null>(null);
  const chooseRange = (date: CalendarDate) => setRange((current) => !current || current.start.compare(current.end) !== 0 || date.compare(current.start) < 0 ? { start: date, end: date } : { start: current.start, end: date });
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Date Calendar" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Single date"><div className="grid gap-3"><MonthPanel date={selected} selected={selected} onSelect={setSelected} aria-label="Choose a delivery date" /><p className="text-xs text-muted-foreground" aria-live="polite">Selected: {selected.toString()}</p></div></ComponentPreview>
    <ComponentPreview title="Minimum and Maximum Dates"><MonthPanel date={now} selected={selected} onSelect={setSelected} minValue={now} maxValue={now.add({ weeks: 6 })} aria-label="Choose a date in the next six weeks" /></ComponentPreview>
    <ComponentPreview title="Unavailable Dates"><MonthPanel date={now} selected={selected} onSelect={setSelected} isDateUnavailable={(day) => isWeekend(day, locale)} aria-label="Choose a date except on weekends" /></ComponentPreview>
    <ComponentPreview title="Date range"><div className="grid gap-3"><div className="flex flex-wrap gap-3"><MonthPanel date={now} selected={range?.start} rangeEnd={range?.end} onSelect={chooseRange} aria-label="Choose range start" /><MonthPanel date={now.add({ months: 1 })} selected={range?.start} rangeEnd={range?.end} onSelect={chooseRange} showPrev={false} aria-label="Choose range end" /></div><p className="text-xs text-muted-foreground" aria-live="polite">{range ? `${range.start.toString()} – ${range.end.toString()}` : "Select a start and end date."}</p></div></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
