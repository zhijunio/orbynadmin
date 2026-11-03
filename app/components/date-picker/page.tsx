"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { IconCalendarEvent as CalendarDays, IconClockHour3 as Clock3, IconWorld as Globe2, IconVideo as Video } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { DateRangePicker, type DateRangeValue } from "@/components/ui/date-picker/date-range-picker";
import { MonthPanel } from "@/components/ui/date-picker/calendar-shared";
import { DateSelector, type DateSelectorValue, formatDateSelectorValue } from "@/components/ui/date-picker/date-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";

export default function DatePickerPage() {
  const t = useTranslations("DateControls");
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [range, setRange] = useState<DateRangeValue | null>(null);
  const [selectorValue, setSelectorValue] = useState<DateSelectorValue>();
  const [selectorDraft, setSelectorDraft] = useState<DateSelectorValue>();
  const [selectorPopoverOpen, setSelectorPopoverOpen] = useState(false);
  const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);
  const [selectorLocale, setSelectorLocale] = useState("en-US");
  const selectedDay = today(getLocalTimeZone());

  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Date Picker" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
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

      <ComponentPreview title="Period-Based Date Selector">
        <DateSelector value={selectorValue} onChange={setSelectorValue} label="Due date" inputHint="Try: 2025, Q4, 05/10/2025" />
      </ComponentPreview>

      <ComponentPreview title="Date Selector in a Popover">
        <div className="grid w-full max-w-lg gap-3"><Popover open={selectorPopoverOpen} onOpenChange={(open) => { setSelectorPopoverOpen(open); if (open) setSelectorDraft(selectorValue); }}><PopoverTrigger asChild><Button type="button" variant="outline" className="w-full justify-start">{selectorValue ? formatDateSelectorValue(selectorValue) : "Select a reporting period"}</Button></PopoverTrigger><PopoverContent align="start" className="w-[min(28rem,calc(100vw-2rem))] p-3"><DateSelector value={selectorDraft} onChange={setSelectorDraft} allowRange label="Reporting period" /><div className="mt-3 flex justify-end gap-2 border-t pt-3"><Button type="button" variant="outline" size="sm" onClick={() => { setSelectorDraft(selectorValue); setSelectorPopoverOpen(false); }}>Cancel</Button><Button type="button" size="sm" onClick={() => { setSelectorValue(selectorDraft); setSelectorPopoverOpen(false); }}>Apply</Button></div></PopoverContent></Popover><p className="text-xs text-muted-foreground">Changes stay in draft until Apply; Cancel discards them.</p></div>
      </ComponentPreview>

      <ComponentPreview title="Date Selector in a Dialog">
        <div className="grid gap-3"><Button type="button" variant="outline" className="w-fit" onClick={() => { setSelectorDraft(selectorValue); setSelectorDialogOpen(true); }}>Choose due date</Button><Dialog open={selectorDialogOpen} onOpenChange={setSelectorDialogOpen}><DialogContent size="md"><DialogHeader><DialogTitle>Select due date</DialogTitle></DialogHeader><DateSelector value={selectorDraft} onChange={setSelectorDraft} showInput /><div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => { setSelectorDraft(selectorValue); setSelectorDialogOpen(false); }}>Cancel</Button><Button type="button" onClick={() => { setSelectorValue(selectorDraft); setSelectorDialogOpen(false); }}>Apply</Button></div></DialogContent></Dialog><p className="text-xs text-muted-foreground" aria-live="polite">{selectorValue ? formatDateSelectorValue(selectorValue) : "No due date selected."}</p></div>
      </ComponentPreview>

      <ComponentPreview title="Localized Date Selector">
        <div className="grid gap-3"><label className="grid max-w-xs gap-1 text-sm font-medium">Language and date format<select value={selectorLocale} onChange={(event) => setSelectorLocale(event.currentTarget.value)} className="h-9 rounded-lg border border-input bg-background px-3 text-sm"><option value="en-US">English</option><option value="es-ES">Español</option><option value="fr-FR">Français</option><option value="de-DE">Deutsch</option><option value="zh-CN">简体中文</option></select></label><DateSelector value={selectorValue} onChange={setSelectorValue} locale={selectorLocale} label="Reporting date" /><p className="text-xs text-muted-foreground">The selected date preview follows the chosen locale.</p></div>
      </ComponentPreview>
    </div></div>}</AppShell>;
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
