"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { DateRangePicker, type DateRangeValue } from "@/components/ui/date-picker/date-range-picker";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";

export function DatePickerFieldsCatalogExamples() {
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [range, setRange] = useState<DateRangeValue | null>(null);
  const selectedDay = today(getLocalTimeZone());
  const [timeRange, setTimeRange] = useState({ start: "09:00", end: "10:00" });

  return (
    <CatalogGridItems>
      <ComponentPreview title="Range Picker" layout="field">
        <div className="space-y-3">
          <DateRangePicker aria-label="Report period" value={range} onChange={setRange} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {range ? `${range.start.toString()} – ${range.end.toString()}` : "No range selected"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Default Range" layout="field">
        <DateRangePicker aria-label="Choose a reporting period" />
      </ComponentPreview>

      <ComponentPreview title="Disabled Range" layout="field">
        <DateRangePicker disabled aria-label="Locked reporting period" />
      </ComponentPreview>

      <ComponentPreview title="Single Date" layout="field">
        <div className="space-y-2">
          <DatePicker aria-label="Due date" value={date} onChange={setDate} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {date ? date.toString() : "No date selected"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Default Date" layout="field">
        <DatePicker defaultValue={selectedDay.add({ days: 14 })} aria-label="Project deadline" />
      </ComponentPreview>

      <ComponentPreview title="Inline Month" description="Uses the same date state as Single Date." layout="field">
        <div className="w-fit max-w-full">
          <MonthPanel
            date={date ?? today(getLocalTimeZone())}
            selected={date}
            onSelect={setDate}
            aria-label="Select date"
            showPrev
            showNext
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Date" layout="field">
        <DatePicker disabled aria-label="Locked due date" />
      </ComponentPreview>

      <ComponentPreview title="Date and Time" layout="field">
        <div className="grid gap-3">
          <DatePicker aria-label="Schedule date" value={date} onChange={setDate} />
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              Start time
              <input
                type="time"
                value={timeRange.start}
                onChange={(event) => setTimeRange((current) => ({ ...current, start: event.currentTarget.value }))}
                className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              End time
              <input
                type="time"
                value={timeRange.end}
                onChange={(event) => setTimeRange((current) => ({ ...current, end: event.currentTarget.value }))}
                className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground"
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {date ? `${date.toString()} · ${timeRange.start}–${timeRange.end}` : "Pick a date and time range."}
          </p>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
