"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { CalendarFrame, SelectionStatus } from "@/app/components/date-calendar/date-calendar-catalog-demos";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";

const locale = "en-US";

export function DateCalendarSurfaceCatalogExamples() {
  const now = today(getLocalTimeZone());
  const [selected, setSelected] = useState(() => {
    let first = now;
    while (isWeekend(first, locale)) first = first.add({ days: 1 });
    return first;
  });
  const [range, setRange] = useState<{ start: CalendarDate; end: CalendarDate } | null>(null);
  const [selectedDates, setSelectedDates] = useState<CalendarDate[]>([]);
  const [month, setMonth] = useState(() => new CalendarDate(now.year, now.month, 1));

  const chooseRange = (date: CalendarDate) =>
    setRange((current) =>
      !current || current.start.compare(current.end) !== 0 || date.compare(current.start) < 0
        ? { start: date, end: date }
        : { start: current.start, end: date },
    );

  const toggleMulti = (day: CalendarDate) =>
    setSelectedDates((current) =>
      current.some((item) => item.compare(day) === 0) ? current.filter((item) => item.compare(day) !== 0) : [...current, day],
    );

  return (
    <CatalogGridItems>
      <ComponentPreview title="Basic Month" layout="panel">
        <div className="grid gap-3">
          <CalendarFrame>
            <MonthPanel date={selected} selected={selected} onSelect={setSelected} aria-label="Choose a delivery date" />
          </CalendarFrame>
          <SelectionStatus>Selected: {selected.toString()}</SelectionStatus>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Range Selection" layout="panel">
        <div className="grid gap-3">
          <CalendarFrame>
            <MonthPanel
              date={now}
              selected={range?.start}
              rangeEnd={range?.end}
              onSelect={chooseRange}
              aria-label="Choose a date range"
            />
          </CalendarFrame>
          <SelectionStatus>{range ? `${range.start.toString()} – ${range.end.toString()}` : "Select a start and end date."}</SelectionStatus>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Weekends" description="Weekends cannot be selected." layout="panel">
        <CalendarFrame>
          <MonthPanel
            date={now}
            selected={selected}
            onSelect={setSelected}
            isDateUnavailable={(day) => isWeekend(day, locale)}
            aria-label="Choose a date except on weekends"
          />
        </CalendarFrame>
      </ComponentPreview>

      <ComponentPreview title="Multiple Days" layout="panel">
        <div className="grid gap-3">
          <CalendarFrame>
            <MonthPanel date={now} selectedDates={selectedDates} onSelect={toggleMulti} aria-label="Choose multiple dates" />
          </CalendarFrame>
          <SelectionStatus>{selectedDates.length ? `${selectedDates.length} dates selected` : "Select one or more dates."}</SelectionStatus>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Two-Month Range" layout="panel">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-3">
            <CalendarFrame>
              <MonthPanel date={month} onMonthChange={setMonth} selected={range?.start} rangeEnd={range?.end} onSelect={chooseRange} aria-label="Choose range start" />
            </CalendarFrame>
            <CalendarFrame>
              <MonthPanel
                date={month.add({ months: 1 })}
                selected={range?.start}
                rangeEnd={range?.end}
                onSelect={chooseRange}
                showPrev={false}
                aria-label="Choose range end"
              />
            </CalendarFrame>
          </div>
          <SelectionStatus>{range ? `${range.start.toString()} – ${range.end.toString()}` : "Select a start and end date."}</SelectionStatus>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Month and Year" description="Native month and year selects with week numbers." layout="panel">
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="calendar-month">
              Month
            </label>
            <select
              id="calendar-month"
              aria-label="Choose month"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={month.month}
              onChange={(event) => setMonth(new CalendarDate(month.year, Number(event.currentTarget.value), 1))}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2020, index, 1))}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="calendar-year">
              Year
            </label>
            <select
              id="calendar-year"
              aria-label="Choose year"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={month.year}
              onChange={(event) => setMonth(new CalendarDate(Number(event.currentTarget.value), month.month, 1))}
            >
              {Array.from({ length: 21 }, (_, index) => now.year - 10 + index).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <CalendarFrame>
            <MonthPanel date={month} onMonthChange={setMonth} selected={selected} onSelect={setSelected} showWeekNumbers aria-label="Calendar with week numbers" />
          </CalendarFrame>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Today Highlight" layout="panel">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setMonth(new CalendarDate(now.year, now.month, 1))}>
              Current month
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMonth(new CalendarDate(now.year, now.month, 1));
                setSelected(now);
              }}
            >
              Today
            </Button>
          </div>
          <CalendarFrame>
            <MonthPanel
              date={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={setSelected}
              dayClassName={(day) => (day.compare(now) === 0 ? "ring-1 ring-primary" : undefined)}
              aria-label="Calendar with today highlighted"
            />
          </CalendarFrame>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
