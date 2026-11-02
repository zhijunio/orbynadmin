"use client";
import type { ReactNode } from "react";
import { Time } from "@internationalized/date";
import { cn } from "@/utils/cn";
export type TimeFieldProps = { label?:ReactNode; value?:Time|null; defaultValue?:Time|null; onChange?:(value:Time|null)=>void; className?:string; isDisabled?:boolean; isReadOnly?:boolean; minValue?:Time; maxValue?:Time; "aria-label"?:string };
const toValue=(time:Time|undefined|null)=>time?`${String(time.hour).padStart(2,"0")}:${String(time.minute).padStart(2,"0")}`:"";
const fromValue=(value:string)=>{if(!value)return null;const [hour,minute]=value.split(":").map(Number);return new Time(hour,minute)};
export function TimeField({label,value,defaultValue,onChange,className,isDisabled,isReadOnly,minValue,maxValue,"aria-label":ariaLabel}:TimeFieldProps){return <label className={cn("grid gap-1.5",isDisabled&&"opacity-50",isReadOnly&&"opacity-80",className)}>{label&&<span className="text-sm font-medium">{label}</span>}<input type="time" step={60} value={value===undefined?undefined:toValue(value)} defaultValue={value===undefined?toValue(defaultValue):undefined} onChange={e=>onChange?.(fromValue(e.currentTarget.value))} disabled={isDisabled} readOnly={isReadOnly} min={toValue(minValue)||undefined} max={toValue(maxValue)||undefined} aria-label={ariaLabel} className="h-10 min-w-28 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed" style={{colorScheme:"light dark"}}/></label>}
