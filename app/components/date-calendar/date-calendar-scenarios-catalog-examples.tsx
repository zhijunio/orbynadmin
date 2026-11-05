"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { CalendarFrame, SelectionStatus } from "@/app/components/date-calendar/date-calendar-catalog-demos";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";

const locale = "en-US";

export function DateCalendarScenariosCatalogExamples() {
  const now = today(getLocalTimeZone());
  const [selected, setSelected] = useState(() => {
    let first = now;
    while (isWeekend(first, locale)) first = first.add({ days: 1 });
    return first;
  });
  const [range, setRange] = useState<{ start: CalendarDate; end: CalendarDate } | null>(null);
  const [month, setMonth] = useState(() => new CalendarDate(now.year, now.month, 1));
  const [calendarLocale, setCalendarLocale] = useState("en-US");
  const [appointmentTime, setAppointmentTime] = useState("14:00");
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const chooseRange = (date: CalendarDate) =>
    setRange((current) =>
      !current || current.start.compare(current.end) !== 0 || date.compare(current.start) < 0
        ? { start: date, end: date }
        : { start: current.start, end: date },
    );

  return (
    <CatalogGridItems>
      <ComponentPreview title="Right Navigation" description="Month controls align to the trailing edge." layout="panel">
        <CalendarFrame>
          <MonthPanel date={month} onMonthChange={setMonth} selected={selected} onSelect={setSelected} navigationPosition="right" aria-label="Calendar with right-side navigation" />
        </CalendarFrame>
      </ComponentPreview>

      <ComponentPreview title="Pricing" layout="panel">
        <div className="grid gap-3">
          <CalendarFrame>
            <MonthPanel
              date={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={setSelected}
              dayContent={(day) => {
                const price = 68 + (day.day % 8) * 12;
                return (
                  <>
                    <span>{day.day}</span>
                    <span className="text-[9px] font-normal text-muted-foreground">${price}</span>
                  </>
                );
              }}
              aria-label="Choose a date by daily price"
            />
          </CalendarFrame>
          <SelectionStatus>Selected date estimate: ${68 + (selected.day % 8) * 12}</SelectionStatus>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Appointment" layout="panel">
        <div className="grid w-fit max-w-full gap-4 lg:grid-cols-[auto_minmax(11rem,14rem)] lg:items-start">
          <CalendarFrame>
            <MonthPanel
              date={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={(day) => {
                setSelected(day);
                setAppointmentConfirmed(false);
              }}
              minValue={now}
              aria-label="Choose an appointment date"
            />
          </CalendarFrame>
          <div className="grid max-w-md content-start gap-2">
            <p className="text-sm font-medium">Available half-hour slots</p>
            {["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "14:00", "15:00"].map((time) => {
              const unavailable = time === "10:30" || time === "13:00";
              return (
                <Button
                  key={time}
                  type="button"
                  size="sm"
                  variant={appointmentTime === time ? "default" : "outline"}
                  disabled={unavailable}
                  aria-pressed={appointmentTime === time}
                  onClick={() => {
                    setAppointmentTime(time);
                    setAppointmentConfirmed(false);
                  }}
                >
                  {time}
                  {unavailable ? " · booked" : ""}
                </Button>
              );
            })}
            <SelectionStatus>
              {selected.toString()} at {appointmentTime}
            </SelectionStatus>
            <Button type="button" className="w-fit" onClick={() => setAppointmentConfirmed(true)}>
              {appointmentConfirmed ? "Appointment confirmed" : "Confirm appointment"}
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Event List" layout="panel">
        <div className="grid gap-4 sm:grid-cols-[auto_minmax(12rem,16rem)] sm:items-start">
          <CalendarFrame>
            <MonthPanel date={month} onMonthChange={setMonth} selected={selected} onSelect={setSelected} aria-label="Choose a date to see events" />
          </CalendarFrame>
          <div className="space-y-3">
            <p className="text-sm font-medium">{selected.toString()}</p>
            <ul className="space-y-2 text-sm">
              <li className="rounded-lg border border-border p-2">Quarterly review · 10:30 AM</li>
              <li className="rounded-lg border border-border p-2">Release planning · 2:00 PM</li>
            </ul>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Localized" description="Locale and RTL direction for the month grid." layout="panel">
        <div className="grid gap-3">
          <label className="grid max-w-xs gap-1 text-sm font-medium">
            Calendar locale
            <select
              value={calendarLocale}
              onChange={(event) => setCalendarLocale(event.currentTarget.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="en-US">English (US)</option>
              <option value="zh-CN">简体中文</option>
              <option value="de-DE">Deutsch</option>
              <option value="ar-SA">العربية</option>
            </select>
          </label>
          <div dir={calendarLocale === "ar-SA" ? "rtl" : "ltr"}>
            <CalendarFrame>
              <MonthPanel
                date={month}
                onMonthChange={setMonth}
                selected={selected}
                onSelect={setSelected}
                locale={calendarLocale}
                dir={calendarLocale === "ar-SA" ? "rtl" : "ltr"}
                aria-label="Localized calendar"
              />
            </CalendarFrame>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Range Presets" description="Quick ranges, then refine on the dual-month view." layout="panel">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Last 7 days", days: 7 },
              { label: "Last 30 days", days: 30 },
            ].map(({ label, days }) => (
              <Button key={label} type="button" size="sm" variant="outline" onClick={() => setRange({ start: now.subtract({ days: days - 1 }), end: now })}>
                {label}
              </Button>
            ))}
          </div>
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
          <SelectionStatus>{range ? `${range.start.toString()} – ${range.end.toString()}` : "Select a preset or choose a custom range."}</SelectionStatus>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
