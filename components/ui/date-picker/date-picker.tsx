"use client";
import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { DateChipInput, MonthPanel, formatTriggerDate, triggerButtonClassName } from "@/components/ui/date-picker/calendar-shared";
import { cn } from "@/utils/cn";
function sameDate(left: CalendarDate | null, right: CalendarDate | null) {
  if (!left || !right) return left === right;
  return left.compare(right) === 0;
}
export type DatePickerProps = { value?: CalendarDate | null; defaultValue?: CalendarDate | null; onChange?: (date: CalendarDate | null) => void; placeholder?: string; className?: string; disabled?: boolean; "aria-label"?: string };
export function DatePicker({ value, defaultValue = null, onChange, placeholder, className, disabled, "aria-label": ariaLabel }: DatePickerProps) {
 const locale="en-US"; const controlled=value!==undefined; const [internal,setInternal]=useState<CalendarDate|null>(defaultValue); const committed=controlled ? value??null : internal; const [pending,setPending]=useState<CalendarDate|null>(committed); const [open,setOpen]=useState(false); const [month,setMonth]=useState(committed ?? new CalendarDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()));
 const commit=(next:CalendarDate|null)=>{if(!controlled)setInternal(next);onChange?.(next)};
 return <Popover open={open} onOpenChange={nextOpen=>{setOpen(nextOpen);if(nextOpen){setPending(committed);setMonth(committed??new CalendarDate(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()))}}}><PopoverTrigger asChild><button type="button" disabled={disabled} aria-label={ariaLabel ?? "Date"} className={cn(triggerButtonClassName,"w-full",className)}><IconCalendarEvent aria-hidden="true" className="size-4 shrink-0 text-muted-foreground"/><span className="truncate">{committed?formatTriggerDate(committed,locale):(placeholder??"Select date")}</span></button></PopoverTrigger><PopoverContent align="start" className="w-auto max-w-[calc(100vw-1rem)] p-0"><div className="p-3"><MonthPanel date={month} onMonthChange={setMonth} selected={pending} onSelect={setPending} disabled={disabled}/><div className="mt-3 flex items-center justify-between gap-3 border-t pt-3"><div>{pending&&<DateChipInput date={pending} label={"Date"} onCommit={setPending} disabled={disabled}/>}</div><div className="flex gap-2"><Button variant="ghost" size="sm" disabled={disabled || !pending} onClick={()=>setPending(null)}>{"Clear"}</Button><Button variant="outline" size="sm" onClick={()=>{setPending(committed);setOpen(false)}}>{"Cancel"}</Button><Button size="sm" disabled={disabled || sameDate(pending, committed)} onClick={()=>{commit(pending);setOpen(false)}}>{"Apply"}</Button></div></div></div></PopoverContent></Popover>;
}
