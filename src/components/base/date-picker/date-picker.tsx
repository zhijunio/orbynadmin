"use client";
import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/base/popover/popover";
import { DateChipInput, MonthPanel, formatTriggerDate, triggerButtonClassName } from "@/components/base/date-picker/calendar-shared";
import { cn } from "@/utils/cn";
export type DatePickerProps = { value?: CalendarDate | null; defaultValue?: CalendarDate | null; onChange?: (date: CalendarDate | null) => void; placeholder?: string; className?: string; isDisabled?: boolean; "aria-label"?: string };
export function DatePicker({ value, defaultValue = null, onChange, placeholder, className, isDisabled, "aria-label": ariaLabel }: DatePickerProps) {
 const locale=useLocale(); const t=useTranslations("DateControls"); const controlled=value!==undefined; const [internal,setInternal]=useState<CalendarDate|null>(defaultValue); const committed=controlled ? value??null : internal; const [pending,setPending]=useState<CalendarDate|null>(committed); const [open,setOpen]=useState(false); const [month,setMonth]=useState(committed ?? new CalendarDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()));
 const commit=(next:CalendarDate|null)=>{if(!controlled)setInternal(next);onChange?.(next)};
 return <Popover open={open} onOpenChange={nextOpen=>{setOpen(nextOpen);if(nextOpen){setPending(committed);setMonth(committed??new CalendarDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()))}}}><PopoverTrigger asChild><button type="button" disabled={isDisabled} aria-label={ariaLabel ?? t("date")} className={cn(triggerButtonClassName,"w-full",className)}><IconCalendarEvent aria-hidden="true" className="size-4 shrink-0 text-muted-foreground"/><span className="truncate">{committed?formatTriggerDate(committed,locale):(placeholder??t("selectDate"))}</span></button></PopoverTrigger><PopoverContent align="start" className="w-auto max-w-[calc(100vw-1rem)] p-0"><div className="p-3"><MonthPanel date={month} onMonthChange={setMonth} selected={pending} onSelect={setPending}/><div className="mt-3 flex items-center justify-between gap-3 border-t pt-3"><div>{pending&&<DateChipInput date={pending} label={t("date")} onCommit={setPending}/>}</div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={()=>{setPending(committed);setOpen(false)}}>{t("cancel")}</Button><Button size="sm" disabled={!pending} onClick={()=>{commit(pending);setOpen(false)}}>{t("apply")}</Button></div></div></div></PopoverContent></Popover>;
}
