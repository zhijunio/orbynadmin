"use client";

import { useState } from "react";
import { addDays, addMonths, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight } from "lucide-react";
import { Showcase } from "@/components/feature/example/Showcase";
import { DatePicker } from "@/components/ui/date-picker";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { cn } from "@/lib/utils";

function Calendar({ selected, onSelect }: { selected?: Date; onSelect: (date: Date | undefined) => void }) {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selected ?? new Date()));
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });
  const startMonth = startOfMonth(new Date(2020, 0));
  const endMonth = startOfMonth(addYears(new Date(), 5));
  const canGoBack = visibleMonth > startMonth;
  const canGoForward = visibleMonth < endMonth;

  return (
    <div className="w-full rounded-xl border border-border bg-card p-3">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" aria-label="Previous month" disabled={!canGoBack} onClick={() => setVisibleMonth((month) => subMonths(month, 1))} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent disabled:opacity-40"><IconChevronLeft className="size-4" /></button>
        <div className="text-sm font-semibold">{format(visibleMonth, "MMMM yyyy")}</div>
        <button type="button" aria-label="Next month" disabled={!canGoForward} onClick={() => setVisibleMonth((month) => addMonths(month, 1))} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent disabled:opacity-40"><IconChevronRight className="size-4" /></button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {Array.from({ length: 7 }, (_, index) => <div key={index} className="py-2 text-xs font-medium text-muted-foreground">{format(new Date(2024, 0, 7 + index), "EEEEE")}</div>)}
        {days.map((day) => {
          const isSelected = selected && isSameDay(day, selected);
          return <button key={day.toISOString()} type="button" onClick={() => onSelect(day)} aria-pressed={Boolean(isSelected)} className={cn("mx-auto my-0.5 inline-flex size-9 items-center justify-center rounded-full text-sm transition-colors hover:bg-accent", !isSameMonth(day, visibleMonth) && "text-muted-foreground/50", isSelected && "bg-primary text-primary-foreground hover:bg-primary/90", !isSelected && isSameDay(day, new Date()) && "font-semibold text-primary")}>{format(day, "d")}</button>;
        })}
      </div>
    </div>
  );
}

function DatePickerExamples() {
  const [date, setDate] = useState<Date>();
  const [deadline, setDeadline] = useState<Date>(addDays(new Date(), 14));
  const [rangeStart, setRangeStart] = useState<Date>();
  const [rangeEnd, setRangeEnd] = useState<Date>();

  return (
    <>
      <ComponentPreview title="Default">
        <div className="w-full max-w-sm space-y-2">
          <p className="text-sm font-medium">Select a date</p>
          <DatePicker value={date} onChange={setDate} placeholder="Choose a date" />
          <p className="text-xs text-muted-foreground">Choose a date for a report or scheduled event.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="With a selected date">
        <div className="w-full max-w-sm space-y-2">
          <p className="text-sm font-medium">Project deadline</p>
          <DatePicker value={deadline} onChange={(value) => value && setDeadline(value)} />
          <p className="text-xs text-muted-foreground">The date can be changed from the calendar.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <div className="w-full max-w-sm space-y-2">
          <p className="text-sm font-medium">Read-only date</p>
          <DatePicker value={addDays(new Date(), 2)} onChange={() => {}} disabled />
          <p className="text-xs text-muted-foreground">Use a disabled picker when a date is managed elsewhere.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Calendar">
        <div className="flex w-full justify-center">
          <Calendar selected={date} onSelect={setDate} />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Date range" className="xl:col-span-2">
        <div className="w-full max-w-2xl space-y-2">
          <p className="text-sm text-muted-foreground">Choose the beginning and end of the reporting period.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Start date</p>
              <DatePicker value={rangeStart} placeholder="Select start date" onChange={(value) => {
                setRangeStart(value);
                if (value && rangeEnd && startOfDay(rangeEnd) < startOfDay(value)) setRangeEnd(undefined);
              }} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">End date</p>
              <DatePicker value={rangeEnd} placeholder="Select end date" onChange={setRangeEnd} disabledDates={rangeStart ? { before: startOfDay(rangeStart) } : undefined} />
            </div>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

export default function DatePickerPage() {
  return (
    <Showcase title="Date Picker">
      <DatePickerExamples />
    </Showcase>
  );
}
