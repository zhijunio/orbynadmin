"use client";

import { useId, useState } from "react";
import { cn } from "@/utils/cn";

export type DateSelectorPeriodType = "day" | "month" | "quarter" | "half-year" | "year";
export type DateSelectorFilterType = "is" | "before" | "after" | "between";
export interface DateSelectorValue {
  period: DateSelectorPeriodType;
  operator: DateSelectorFilterType;
  startDate?: Date;
  endDate?: Date;
  year?: number;
  month?: number;
  quarter?: number;
  halfYear?: number;
  rangeStart?: { year: number; value: number };
  rangeEnd?: { year: number; value: number };
}

export type DateSelectorLabels = Record<"period" | "filter" | "from" | "to" | "choose" | "quick" | "hint" | "empty" | "today" | "clear" | DateSelectorPeriodType | DateSelectorFilterType, string>;

export type DateSelectorProps = {
  labels?: DateSelectorLabels;
  value?: DateSelectorValue;
  defaultValue?: DateSelectorValue;
  onChange?: (value: DateSelectorValue | undefined) => void;
  defaultPeriodType?: DateSelectorPeriodType;
  defaultFilterType?: DateSelectorFilterType;
  allowRange?: boolean;
  disabled?: boolean;
  showInput?: boolean;
  label?: string;
  inputHint?: string;
  locale?: string;
  className?: string;
};

const periods: { value: DateSelectorPeriodType; label: string }[] = [
  { value: "day", label: "Day" }, { value: "month", label: "Month" },
  { value: "quarter", label: "Quarter" }, { value: "half-year", label: "Half-year" },
  { value: "year", label: "Year" },
];
const filters: { value: DateSelectorFilterType; label: string }[] = [
  { value: "is", label: "is" }, { value: "before", label: "before" },
  { value: "after", label: "after" }, { value: "between", label: "between" },
];
const fieldClass = "h-9 min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function parseDate(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateInput(date?: Date) {
  return date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";
}

function tokenFor(value: DateSelectorValue | undefined, period: DateSelectorPeriodType, edge: 0 | 1) {
  if (!value) return "";
  if (period === "day") return dateInput(edge === 1 && value.operator === "between" ? value.endDate : value.startDate);
  if (value.operator === "between") {
    const range = edge === 0 ? value.rangeStart : value.rangeEnd;
    if (!range) return "";
    return period === "month" ? `${range.year}-${String(range.value + 1).padStart(2, "0")}` : period === "quarter" ? `${range.year}-Q${range.value + 1}` : period === "half-year" ? `${range.year}-H${range.value + 1}` : String(range.year);
  }
  if (period === "month") return value.year && value.month !== undefined ? `${value.year}-${String(value.month + 1).padStart(2, "0")}` : "";
  if (period === "quarter") return value.year && value.quarter !== undefined ? `${value.year}-Q${value.quarter + 1}` : "";
  if (period === "half-year") return value.year && value.halfYear !== undefined ? `${value.year}-H${value.halfYear + 1}` : "";
  return value.year?.toString() ?? "";
}

function valueFromToken(token: string, period: DateSelectorPeriodType, operator: DateSelectorFilterType): DateSelectorValue {
  if (period === "day") return { period, operator, startDate: parseDate(token) };
  if (period === "month") {
    const [year, month] = token.split("-").map(Number);
    return { period, operator, year: year || undefined, month: Number.isFinite(month) ? month - 1 : undefined };
  }
  if (period === "quarter" || period === "half-year") {
    const match = (period === "quarter" ? /^(\d{4})-Q([1-4])$/i : /^(\d{4})-H([12])$/i).exec(token);
    return period === "quarter"
      ? { period, operator, year: match ? Number(match[1]) : undefined, quarter: match ? Number(match[2]) - 1 : undefined }
      : { period, operator, year: match ? Number(match[1]) : undefined, halfYear: match ? Number(match[2]) - 1 : undefined };
  }
  return { period, operator, year: Number(token) || undefined };
}

export function formatDateSelectorValue(value: DateSelectorValue, locale = "en-US", operatorLabels?: Partial<Record<DateSelectorFilterType, string>>) {
  const formatDate = (date: Date) => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date);
  const formatPart = (year: number, index: number) => value.period === "month"
    ? `${new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(year, index, 1))} ${year}`
    : value.period === "quarter" ? `Q${index + 1} ${year}`
      : value.period === "half-year" ? `H${index + 1} ${year}` : String(year);
  if (value.operator === "between") {
    if (value.period === "day" && value.startDate && value.endDate) return `${formatDate(value.startDate)} – ${formatDate(value.endDate)}`;
    if (value.rangeStart && value.rangeEnd) return `${formatPart(value.rangeStart.year, value.rangeStart.value)} – ${formatPart(value.rangeEnd.year, value.rangeEnd.value)}`;
  }
  let text = "";
  if (value.period === "day" && value.startDate) text = formatDate(value.startDate);
  else if (value.period === "month" && value.year && value.month !== undefined) text = formatPart(value.year, value.month);
  else if (value.period === "quarter" && value.year && value.quarter !== undefined) text = formatPart(value.year, value.quarter);
  else if (value.period === "half-year" && value.year && value.halfYear !== undefined) text = formatPart(value.year, value.halfYear);
  else if (value.period === "year" && value.year) text = String(value.year);
  return value.operator === "is" ? text : `${operatorLabels?.[value.operator] ?? value.operator} ${text}`;
}

function anchorDate(value: DateSelectorValue | undefined) {
  if (!value) return undefined;
  if (value.startDate) return value.startDate;
  if (value.rangeStart) {
    const month = value.period === "month" ? value.rangeStart.value : value.period === "quarter" ? value.rangeStart.value * 3 : value.period === "half-year" ? value.rangeStart.value * 6 : 0;
    return new Date(value.rangeStart.year, month, 1);
  }
  if (value.year === undefined) return undefined;
  if (value.period === "month" && value.month !== undefined) return new Date(value.year, value.month, 1);
  if (value.period === "quarter" && value.quarter !== undefined) return new Date(value.year, value.quarter * 3, 1);
  if (value.period === "half-year" && value.halfYear !== undefined) return new Date(value.year, value.halfYear * 6, 1);
  return new Date(value.year, 0, 1);
}

function withPeriod(current: DateSelectorValue | undefined, period: DateSelectorPeriodType, operator: DateSelectorFilterType): DateSelectorValue {
  const anchor = anchorDate(current);
  if (!anchor) return { period, operator };
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  if (period === "day") return { period, operator, startDate: anchor, ...(operator === "between" ? { endDate: current?.endDate ?? anchor } : {}) };
  if (operator === "between") {
    const start = { year, value: period === "month" ? month : period === "quarter" ? Math.floor(month / 3) : period === "half-year" ? (month < 6 ? 0 : 1) : year };
    const end = current?.period === period ? current.rangeEnd ?? start : start;
    return { period, operator, rangeStart: start, rangeEnd: end };
  }
  if (period === "month") return { period, operator, year, month };
  if (period === "quarter") return { period, operator, year, quarter: Math.floor(month / 3) };
  if (period === "half-year") return { period, operator, year, halfYear: month < 6 ? 0 : 1 };
  return { period, operator, year };
}

function parseShortcut(text: string): DateSelectorValue | undefined {
  const value = text.trim();
  const year = /^(\d{4})$/.exec(value);
  if (year) return { period: "year", operator: "is", year: Number(year[1]) };
  const quarter = /^Q([1-4])\s*(\d{4})$/i.exec(value);
  if (quarter) return { period: "quarter", operator: "is", year: Number(quarter[2]), quarter: Number(quarter[1]) - 1 };
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (date) return { period: "day", operator: "is", startDate: new Date(Number(date[3]), Number(date[1]) - 1, Number(date[2])) };
  return undefined;
}

export function DateSelector(props: DateSelectorProps) {
  const { value, defaultValue, onChange, defaultPeriodType = "day", defaultFilterType = "is", allowRange = true, disabled = false, showInput = true, label = "Date", inputHint = "Try: 2025, Q4, 05/10/2025", locale, className, labels } = props;
  const [internalValue, setInternalValue] = useState<DateSelectorValue | undefined>(defaultValue);
  const [shortcut, setShortcut] = useState("");
  const shortcutId = useId();
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;
  const period = current?.period ?? defaultPeriodType;
  const operator = current?.operator ?? defaultFilterType;
  const update = (next: DateSelectorValue | undefined) => { if (!isControlled) setInternalValue(next); onChange?.(next); };
  const setToken = (token: string, edge: 0 | 1) => {
    if (operator !== "between") { update(valueFromToken(token, period, operator)); return; }
    if (period === "day") {
      update({ period, operator, startDate: edge === 0 ? parseDate(token) : current?.startDate, endDate: edge === 1 ? parseDate(token) : current?.endDate });
      return;
    }
    const parsed = valueFromToken(token, period, operator);
    const part = { year: parsed.year ?? new Date().getFullYear(), value: period === "month" ? parsed.month ?? 0 : period === "quarter" ? parsed.quarter ?? 0 : period === "half-year" ? parsed.halfYear ?? 0 : parsed.year ?? new Date().getFullYear() };
    update({ period, operator, rangeStart: edge === 0 ? part : current?.rangeStart, rangeEnd: edge === 1 ? part : current?.rangeEnd });
  };
  const inputType = period === "day" ? "date" : period === "month" ? "month" : period === "year" ? "number" : "text";
  const fieldLabel = (edge: 0 | 1) => operator === "between" ? (edge === 0 ? labels?.from ?? "From" : labels?.to ?? "To") : label;
  const periodInput = (edge: 0 | 1) => {
    const currentToken = tokenFor(current, period, edge);
    if (period === "quarter" || period === "half-year") {
      const startYear = new Date().getFullYear() - 5;
      const tokens = Array.from({ length: 11 }, (_, offset) => startYear + offset).flatMap((year) => Array.from({ length: period === "quarter" ? 4 : 2 }, (_, index) => `${year}-${period === "quarter" ? "Q" : "H"}${index + 1}`));
      return <select aria-label={fieldLabel(edge)} value={currentToken} disabled={disabled} onChange={(event) => setToken(event.currentTarget.value, edge)} className={fieldClass}><option value="">{labels?.choose ?? `Choose ${period}`}</option>{tokens.map((token) => <option key={token} value={token}>{token}</option>)}</select>;
    }
    return <input aria-label={fieldLabel(edge)} type={inputType} min={period === "year" ? 1900 : undefined} max={period === "year" ? 2200 : undefined} value={currentToken} disabled={disabled} onChange={(event) => setToken(event.currentTarget.value, edge)} className={fieldClass} />;
  };

  return <div className={cn("grid w-full gap-3", className)}>
    <div className="grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs font-medium text-muted-foreground">{labels?.period ?? "Period"}<select aria-label={labels?.period ?? "Date period"} value={period} disabled={disabled} onChange={(event) => update(withPeriod(current, event.currentTarget.value as DateSelectorPeriodType, operator))} className={fieldClass}>{periods.map((item) => <option key={item.value} value={item.value}>{labels?.[item.value] ?? item.label}</option>)}</select></label><label className="grid gap-1 text-xs font-medium text-muted-foreground">{labels?.filter ?? "Filter"}<select aria-label={labels?.filter ?? "Date filter"} value={operator} disabled={disabled} onChange={(event) => { const next = event.currentTarget.value as DateSelectorFilterType; update({ ...(current ?? { period }), operator: next === "between" && !allowRange ? "is" : next }); }} className={fieldClass}>{filters.filter((item) => allowRange || item.value !== "between").map((item) => <option key={item.value} value={item.value}>{labels?.[item.value] ?? item.label}</option>)}</select></label></div>
    <div className={cn("grid gap-2", operator === "between" && "sm:grid-cols-2")}>{periodInput(0)}{operator === "between" && periodInput(1)}</div>
    {showInput && <div className="grid gap-1"><label htmlFor={shortcutId} className="text-xs font-medium text-muted-foreground">{labels?.quick ?? "Quick date entry"}</label><input id={shortcutId} value={shortcut} disabled={disabled} onChange={(event) => setShortcut(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); const parsed = parseShortcut(shortcut); if (parsed) { update(parsed); setShortcut(""); } } }} placeholder={inputHint} className={fieldClass} /><span className="text-xs text-muted-foreground">{labels?.hint ?? "Press Enter to apply a year, quarter, or date."}</span></div>}
    <div className="flex flex-wrap items-center justify-between gap-2"><output aria-live="polite" className="min-h-9 flex-1 rounded-md bg-muted/40 px-3 py-2 text-sm">{current ? formatDateSelectorValue(current, locale, labels) : labels?.empty ?? "No date selected."}</output><div className="flex gap-1"><button type="button" disabled={disabled} onClick={() => update({ period: "day", operator: "is", startDate: new Date() })} className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-50">{labels?.today ?? "Today"}</button><button type="button" disabled={disabled} onClick={() => update(undefined)} className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-50">{labels?.clear ?? "Clear"}</button></div></div>
  </div>;
}
