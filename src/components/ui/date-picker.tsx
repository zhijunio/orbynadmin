"use client";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

type DisabledDateRule = Date | Date[] | { before?: Date; after?: Date } | ((date: Date) => boolean);

export function DatePicker({ value, onChange, placeholder = "Select date", className, disabled, disabledDates }: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  disabledDates?: DisabledDateRule;
}) {
  const toInputDate = (date?: Date) => date ? format(date, "yyyy-MM-dd") : "";
  const min = disabledDates && !Array.isArray(disabledDates) && !(disabledDates instanceof Date) && typeof disabledDates === "object" && disabledDates.before
    ? toInputDate(disabledDates.before)
    : undefined;
  const max = disabledDates && !Array.isArray(disabledDates) && !(disabledDates instanceof Date) && typeof disabledDates === "object" && disabledDates.after
    ? toInputDate(disabledDates.after)
    : undefined;

  return (
    <span className={cn("relative block w-full", className)}>
      <input
        type="date"
        aria-label={placeholder}
        value={toInputDate(value)}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value ? new Date(`${event.target.value}T00:00:00`) : undefined)}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <CalendarDays aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  );
}
