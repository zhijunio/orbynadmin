"use client"

import * as React from "react"
import { IconChevronDown, IconClock } from "@tabler/icons-react"
import { Button } from "@/components/ui/button/button"
import { cn } from "@/utils/cn"

export type TimePickerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  label?: string
  timeZone?: string
  step?: number
  min?: string
  max?: string
  disabledTimes?: string[]
  hourCycle?: 12 | 24
  granularity?: "hour" | "minute" | "second"
  confirm?: boolean
  locale?: string
  inline?: boolean
  showNow?: boolean
  showClear?: boolean
  className?: string
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}

const pad = (n: number) => String(n).padStart(2, "0")
const normalizedTime = (value: string, end = false) => value.length === 5 ? `${value}:${end ? "59" : "00"}` : value
const parts = (value: string) => {
  const [hour = "09", minute = "00", second = "00"] = value.split(":")
  return { hour: Number(hour), minute: Number(minute), second: Number(second) }
}

export function TimePicker({
  value,
  defaultValue = "09:00",
  onValueChange,
  label,
  timeZone,
  step = 30,
  min,
  max,
  disabledTimes = [],
  hourCycle = 24,
  granularity = "minute",
  confirm = false,
  locale = "en-US",
  inline = false,
  showNow = true,
  showClear = true,
  className,
  disabled,
  invalid,
  required,
}: TimePickerProps) {
  const inputId = React.useId()
  const [internal, setInternal] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const current = value ?? internal
  const [hour, setHour] = React.useState(() => parts(current).hour)
  const [minute, setMinute] = React.useState(() => parts(current).minute)
  const [second, setSecond] = React.useState(() => parts(current).second)
  const [period, setPeriod] = React.useState<"AM" | "PM">(() => parts(current).hour >= 12 ? "PM" : "AM")
  const [pendingClear, setPendingClear] = React.useState(false)

  const commit = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  const currentForFormatting = current.length > 5 ? current : `${current}:00`
  const formatted = current ? new Intl.DateTimeFormat(locale, { hour: hourCycle === 12 ? "numeric" : "2-digit", minute: granularity === "hour" ? undefined : "2-digit", second: granularity === "second" ? "2-digit" : undefined, hour12: hourCycle === 12, timeZone: "UTC" }).format(new Date(`1970-01-01T${currentForFormatting}Z`)) : "No time selected"
  const localeKey = locale.toLowerCase().split("-")[0]
  const labels: Record<string, { hour: string; minute: string; second: string; period: string; now: string; clear: string; cancel: string; apply: string }> = { en: { hour: "Hour", minute: "Minute", second: "Second", period: "Period", now: "Now", clear: "Clear", cancel: "Cancel", apply: "OK" }, de: { hour: "Stunde", minute: "Minute", second: "Sekunde", period: "Tageszeit", now: "Jetzt", clear: "Löschen", cancel: "Abbrechen", apply: "OK" }, zh: { hour: "小时", minute: "分钟", second: "秒", period: "上午/下午", now: "现在", clear: "清除", cancel: "取消", apply: "确定" }, ar: { hour: "الساعة", minute: "الدقيقة", second: "الثانية", period: "الفترة", now: "الآن", clear: "مسح", cancel: "إلغاء", apply: "موافق" } }
  const copy = labels[localeKey] ?? labels.en
  const options = (maxValue: number, interval: number) => Array.from({ length: Math.ceil((maxValue + 1) / interval) }, (_, i) => i * interval)
  const isTimeUnavailable = (selectedHour: number, selectedMinute: number, selectedSecond: number) => {
    const hourMinute = `${pad(selectedHour)}:${pad(selectedMinute)}`
    const value = granularity === "second" ? `${hourMinute}:${pad(selectedSecond)}` : hourMinute
    const comparison = `${hourMinute}:${pad(granularity === "second" ? selectedSecond : 0)}`
    return disabledTimes.includes(value) || Boolean((min && comparison < normalizedTime(min)) || (max && comparison > normalizedTime(max, true)))
  }
  const apply = () => {
    if (pendingClear) {
      commit("")
      setPendingClear(false)
      setOpen(false)
      return
    }
    const next = `${pad(hour)}:${pad(minute)}${granularity === "second" ? `:${pad(second)}` : ""}`
    if (isTimeUnavailable(hour, minute, second)) return
    commit(next)
    setOpen(false)
  }
  const inputValue = !current ? "" : granularity === "second" && current.length === 5 ? `${current}:00` : current
  const fieldCount = 1 + (granularity === "hour" ? 0 : 1) + (granularity === "second" ? 1 : 0) + (hourCycle === 12 ? 1 : 0)
  const fieldColumns = fieldCount === 4 ? "grid-cols-4" : fieldCount === 2 ? "grid-cols-2" : fieldCount === 1 ? "grid-cols-1" : "grid-cols-3"
  const hourValues = options(hourCycle === 12 ? 11 : 23, 1).map((n) => hourCycle === 12 ? (n || 12) : n)
  const minuteValues = options(59, Math.max(1, step))
  const secondValues = options(59, Math.max(1, step))
  const isHourUnavailable = (displayHour: number) => {
    const actualHour = hourCycle === 12 ? displayHour % 12 + (period === "PM" ? 12 : 0) : displayHour
    const candidateMinutes = granularity === "hour" ? [0] : minuteValues
    return !candidateMinutes.some((minuteValue) => {
      const candidateSeconds = granularity === "second" ? secondValues : [0]
      return candidateSeconds.some((secondValue) => !isTimeUnavailable(actualHour, minuteValue, secondValue))
    })
  }

  return <div className={cn("grid w-full gap-1.5", className)}>
    {label && <label htmlFor={inputId} className="text-sm font-medium">{label}</label>}
    <div className="relative">
      <div className={cn("flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30", invalid && "border-destructive ring-3 ring-destructive/20", disabled && "pointer-events-none opacity-50")}>
        <IconClock className="size-4 text-muted-foreground" aria-hidden="true" />
        <input id={inputId} aria-label={label ?? "Time"} type="time" step={granularity === "second" ? 1 : step * 60} min={min} max={max} disabled={disabled} required={required} readOnly={confirm} aria-invalid={invalid || undefined} value={inputValue} onChange={(event) => { if (!confirm) { setPendingClear(false); commit(event.target.value) } }} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        {timeZone && <span className="max-w-24 truncate text-[10px] text-muted-foreground" title={timeZone}>{timeZone}</span>}
        <Button size="icon-xs" variant="ghost" type="button" disabled={disabled} aria-label={`Choose time (${formatted})`} aria-expanded={open || inline} onClick={() => { const parsed = parts(current); setHour(parsed.hour); setMinute(parsed.minute); setSecond(parsed.second); setPeriod(parsed.hour >= 12 ? "PM" : "AM"); setPendingClear(false); setOpen(!open) }}><IconChevronDown /></Button>
      </div>
      {(open || inline) && <div dir={localeKey === "ar" ? "rtl" : undefined} role="dialog" aria-label="Choose a time" className={cn("z-30 w-full rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-lg", inline ? "relative mt-2" : "absolute mt-2", !inline && "") }>
        <div className={cn("grid gap-2", fieldColumns)}>
          <label className="grid gap-1 text-xs text-muted-foreground">{copy.hour}<select aria-label={copy.hour} disabled={disabled} value={hourCycle === 12 ? hour % 12 || 12 : hour} onChange={(e) => { const selectedHour = Number(e.target.value); setPendingClear(false); setHour(hourCycle === 12 ? selectedHour % 12 + (period === "PM" ? 12 : 0) : selectedHour); if (granularity === "hour") { setMinute(0); setSecond(0) } }} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">{hourValues.map((n) => <option key={n} value={n} disabled={isHourUnavailable(n)}>{pad(n)}</option>)}</select></label>
          {granularity !== "hour" && <label className="grid gap-1 text-xs text-muted-foreground">{copy.minute}<select aria-label={copy.minute} disabled={disabled} value={minute} onChange={(e) => { setPendingClear(false); setMinute(Number(e.target.value)) }} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">{minuteValues.map((n) => <option key={n} value={n} disabled={granularity === "second" ? !secondValues.some((secondValue) => !isTimeUnavailable(hour, n, secondValue)) : isTimeUnavailable(hour, n, 0)}>{pad(n)}</option>)}</select></label>}
          {granularity === "second" && <label className="grid gap-1 text-xs text-muted-foreground">{copy.second}<select aria-label={copy.second} disabled={disabled} value={second} onChange={(e) => { setPendingClear(false); setSecond(Number(e.target.value)) }} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground">{secondValues.map((n) => <option key={n} value={n} disabled={isTimeUnavailable(hour, minute, n)}>{pad(n)}</option>)}</select></label>}
          {hourCycle === 12 && <label className="grid gap-1 text-xs text-muted-foreground">{copy.period}<select aria-label={copy.period} disabled={disabled} value={period} onChange={(e) => { const nextPeriod=e.target.value as "AM"|"PM"; setPendingClear(false); setPeriod(nextPeriod); setHour(hour % 12 + (nextPeriod === "PM" ? 12 : 0)) }} className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"><option>AM</option><option>PM</option></select></label>}
        </div>
        {timeZone && <p className="mt-2 text-xs text-muted-foreground">{timeZone}</p>}
        <div className="mt-3 flex items-center gap-2"><div className="flex flex-1 gap-1">{showNow && <Button size="xs" variant="ghost" disabled={disabled || isTimeUnavailable(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())} onClick={() => { const now=new Date(); setPendingClear(false); setHour(now.getHours()); setMinute(now.getMinutes()); setSecond(now.getSeconds()); setPeriod(now.getHours() >= 12 ? "PM" : "AM") }}>{copy.now}</Button>}{showClear && <Button size="xs" variant="ghost" disabled={disabled} onClick={() => { if (confirm) { setPendingClear(true); return } commit(""); setOpen(false) }}>{copy.clear}</Button>}</div>{confirm && <Button size="sm" variant="outline" onClick={() => { setPendingClear(false); setOpen(false) }}>{copy.cancel}</Button>}<Button size="sm" disabled={disabled || (!pendingClear && isTimeUnavailable(hour, minute, second))} onClick={apply}>{copy.apply}</Button></div>
      </div>}
    </div>
  </div>
}

export type TimePickerInlineProps = Omit<TimePickerProps, "label" | "timeZone">

export function TimePickerInline(props: TimePickerInlineProps) {
  return <TimePicker {...props} className={cn("max-w-sm", props.className)} />
}
