"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { IconCalendarEvent as CalendarDays, IconClockHour3 as Clock3, IconWorld as Globe2, IconVideo as Video } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { DateRangePicker, type DateRangeValue } from "@/components/ui/date-picker/date-range-picker";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";

export default function DatePickerPage() {
  const t = useTranslations("DateControls");
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [range, setRange] = useState<DateRangeValue | null>(null);
  const selectedDay = today(getLocalTimeZone());

  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Date Picker" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Controlled Date Range" className="xl:col-span-2">
        <div className="w-full max-w-sm space-y-3">
          <DateRangePicker aria-label={t("reportPeriod")} value={range} onChange={setRange} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {range ? `${range.start.toString()} – ${range.end.toString()}` : t("noRangeSelected")}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Date Range with Quick Select">
        <div className="w-full max-w-sm">
          <DateRangePicker aria-label={t("chooseReportingPeriod")} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Controlled Single Date">
        <div className="w-full max-w-sm space-y-2">
          <DatePicker aria-label={t("dueDate")} value={date} onChange={setDate} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">{date ? date.toString() : t("noDateSelected")}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Inline Calendar">
        <MonthPanel date={date ?? today(getLocalTimeZone())} selected={date} onSelect={setDate} aria-label={t("selectDate")} showPrev showNext />
      </ComponentPreview>

      <ComponentPreview title="Meeting Scheduler" className="xl:col-span-2">
        <MeetingSchedulerExample />
      </ComponentPreview>

      <ComponentPreview title="Default Date">
        <div className="w-full max-w-sm">
          <DatePicker defaultValue={selectedDay.add({ days: 14 })} aria-label="Project deadline" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Date Picker">
        <DatePicker isDisabled aria-label="Locked due date" />
      </ComponentPreview>

      <ComponentPreview title="Disabled Date Range Picker">
        <DateRangePicker isDisabled aria-label="Locked reporting period" />
      </ComponentPreview>
    </div></div>}</ConsoleLayout>;
}

function MeetingSchedulerExample() {
  const [date, setDate] = useState(() => today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState("14:00");
  const times = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  return <div className="grid w-full max-w-5xl gap-3 rounded-xl border border-border bg-muted/40 p-3 lg:grid-cols-[220px_minmax(296px,1fr)_170px] lg:items-stretch">
      <Card className="gap-0 border-border py-4 shadow-sm">
        <CardContent className="flex h-full flex-col gap-4 px-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-9"><AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback></Avatar>
            <div className="min-w-0"><p className="truncate text-sm font-medium">Mertcan Esmergul</p><p className="truncate text-xs text-muted-foreground">hi@mertcan.works</p></div>
          </div>
          <div><h3 className="text-base font-semibold">30 min intro meeting</h3><p className="mt-1 text-sm text-muted-foreground">Let&apos;s discuss your needs and how we can collaborate.</p></div>
          <div className="mt-auto grid gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4" />30 minutes</span>
            <span className="inline-flex items-center gap-2"><Globe2 aria-hidden="true" className="size-4" />English</span>
            <span className="inline-flex items-center gap-2"><Video aria-hidden="true" className="size-4" />Google Meet</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex min-w-0 items-start justify-center rounded-xl border border-border bg-card p-3 shadow-sm">
        <MonthPanel date={date} selected={date} onSelect={setDate} aria-label="Choose meeting date" showPrev showNext />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="mb-1 text-sm font-medium">Available times</p>
        {times.map((time) => (
          <Button key={time} type="button" variant={selectedTime === time ? "default" : "outline"} size="sm" aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</Button>
        ))}
        <Button type="button" className="mt-auto" size="sm"><CalendarDays aria-hidden="true" className="size-4" />Continue</Button>
      </div>
    </div>;
}
