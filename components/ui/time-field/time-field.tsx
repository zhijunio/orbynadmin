"use client";

import { useState, type ReactNode } from "react";
import { Time } from "@internationalized/date";

import { cn } from "@/utils/cn";

export type TimeFieldProps = {
  label?: ReactNode;
  value?: Time | null;
  defaultValue?: Time | null;
  onChange?: (value: Time | null) => void;
  className?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  minValue?: Time;
  maxValue?: Time;
  hourCycle?: 12 | 24;
  granularity?: "minute" | "second";
  "aria-label"?: string;
};

function toValue(time: Time | undefined | null, granularity: "minute" | "second") {
  if (!time) return "";
  const hours = String(time.hour).padStart(2, "0");
  const minutes = String(time.minute).padStart(2, "0");
  if (granularity === "minute") return `${hours}:${minutes}`;
  return `${hours}:${minutes}:${String(time.second).padStart(2, "0")}`;
}

function fromValue(value: string): Time | null {
  if (!value) return null;
  const [hour, minute, second = 0] = value.split(":").map(Number);
  return new Time(hour, minute, second);
}

function formatTwelveHourTime(time: Time | null, granularity: "minute" | "second") {
  if (!time) return "";
  const hour = time.hour % 12 || 12;
  const minutes = String(time.minute).padStart(2, "0");
  const seconds = granularity === "second" ? `:${String(time.second).padStart(2, "0")}` : "";
  const period = time.hour < 12 ? "AM" : "PM";
  return `${String(hour).padStart(2, "0")}:${minutes}${seconds} ${period}`;
}

function parseTwelveHourTime(value: string, granularity: "minute" | "second"): Time | null {
  const match = value.trim().match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?\s*(AM|PM)$/i);
  if (!match) return null;

  const hour12 = Number(match[1]);
  if (
    hour12 < 1 ||
    hour12 > 12 ||
    (granularity === "second" && match[3] === undefined) ||
    (granularity === "minute" && match[3] !== undefined)
  ) return null;

  const period = match[4].toUpperCase();
  const hour = (hour12 % 12) + (period === "PM" ? 12 : 0);
  return new Time(hour, Number(match[2]), Number(match[3] ?? 0));
}

function isWithinRange(time: Time, minValue?: Time, maxValue?: Time) {
  const seconds = time.hour * 3600 + time.minute * 60 + time.second;
  const minSeconds = minValue && minValue.hour * 3600 + minValue.minute * 60 + minValue.second;
  const maxSeconds = maxValue && maxValue.hour * 3600 + maxValue.minute * 60 + maxValue.second;
  return (minSeconds === undefined || seconds >= minSeconds) && (maxSeconds === undefined || seconds <= maxSeconds);
}

export function TimeField({
  label,
  value,
  defaultValue,
  onChange,
  className,
  isDisabled,
  isReadOnly,
  minValue,
  maxValue,
  hourCycle,
  granularity = "minute",
  "aria-label": ariaLabel,
}: TimeFieldProps) {
  const [internalTime, setInternalTime] = useState<Time | null>(defaultValue ?? null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const currentTime = value === undefined ? internalTime : value;
  const parsedDraft = hourCycle === 12 ? parseTwelveHourTime(draft, granularity) : null;
  const invalidDraft = editing && draft.length > 0 && (!parsedDraft || !isWithinRange(parsedDraft, minValue, maxValue));

  function update(time: Time | null) {
    if (value === undefined) setInternalTime(time);
    onChange?.(time);
  }

  return (
    <label className={cn("grid gap-1.5", isDisabled && "opacity-50", isReadOnly && "opacity-80", className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      {hourCycle === 12 ? (
        <input
          type="text"
          inputMode="text"
          lang="en-US"
          value={editing ? draft : formatTwelveHourTime(currentTime, granularity)}
          onFocus={() => {
            setDraft(formatTwelveHourTime(currentTime, granularity));
            setEditing(true);
          }}
          onBlur={() => setEditing(false)}
          onChange={(event) => {
            const nextDraft = event.currentTarget.value;
            setDraft(nextDraft);
            const nextTime = parseTwelveHourTime(nextDraft, granularity);
            if (nextTime && isWithinRange(nextTime, minValue, maxValue)) update(nextTime);
          }}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-label={ariaLabel}
          aria-invalid={invalidDraft || undefined}
          className="h-10 min-w-32 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed aria-invalid:border-destructive"
        />
      ) : (
        <input
          type="time"
          step={granularity === "second" ? 1 : 60}
          lang={hourCycle === 24 ? "en-GB" : undefined}
          value={toValue(currentTime, granularity)}
          onChange={(event) => update(fromValue(event.currentTarget.value))}
          disabled={isDisabled}
          readOnly={isReadOnly}
          min={toValue(minValue, granularity) || undefined}
          max={toValue(maxValue, granularity) || undefined}
          aria-label={ariaLabel}
          className="h-10 min-w-28 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
          style={{ colorScheme: "light dark" }}
        />
      )}
    </label>
  );
}
