"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { CalendarDate, today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "next-intl";
import { MonthPanel } from "@/components/base/date-picker/calendar-shared";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function DateCalendarPage() {
  const locale = useLocale();
  const now = today(getLocalTimeZone());
  const [selected, setSelected] = useState(() => now);
  const [range, setRange] = useState<{ start: CalendarDate; end: CalendarDate } | null>(null);
  const chooseRange = (date: CalendarDate) => setRange((current) => !current || current.start.compare(current.end) !== 0 || date.compare(current.start) < 0 ? { start: date, end: date } : { start: current.start, end: date });
  return <ConsoleLayout>{<Showcase title="Date Calendar">
    <ComponentPreview title="Single date"><div className="grid gap-3"><MonthPanel date={selected} selected={selected} onSelect={setSelected} aria-label="Choose a delivery date" /><p className="text-xs text-muted-foreground" aria-live="polite">Selected: {selected.toString()}</p></div></ComponentPreview>
    <ComponentPreview title="Limits and unavailable days"><MonthPanel date={now} selected={selected} onSelect={setSelected} minValue={now} maxValue={now.add({ weeks: 6 })} isDateUnavailable={(day) => isWeekend(day, locale)} aria-label="Choose a weekday in the next six weeks" /></ComponentPreview>
    <ComponentPreview title="Date range"><div className="grid gap-3"><div className="flex flex-wrap gap-3"><MonthPanel date={now} selected={range?.start} rangeEnd={range?.end} onSelect={chooseRange} aria-label="Choose range start" /><MonthPanel date={now.add({ months: 1 })} selected={range?.start} rangeEnd={range?.end} onSelect={chooseRange} showPrev={false} aria-label="Choose range end" /></div><p className="text-xs text-muted-foreground" aria-live="polite">{range ? `${range.start.toString()} – ${range.end.toString()}` : "Select a start and end date."}</p></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
