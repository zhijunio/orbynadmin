"use client";

import { useMemo, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import { IconMinus as Minus, IconPlus as Plus } from "@tabler/icons-react";

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cn } from "@/utils/cn";

export type NumberFieldProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  formatOptions?: Intl.NumberFormatOptions;
  /** Defaults to en-US so server and browser formatting are consistent. */
  locale?: string;
};

function parseFormattedNumber(value: string, options: Intl.NumberFormatOptions, locale: string): number | null {
  if (!value.trim()) return null;

  const symbols = new Intl.NumberFormat(locale, {
    useGrouping: true,
    numberingSystem: options.numberingSystem,
  }).formatToParts(-12345.6);
  const decimal = symbols.find((part) => part.type === "decimal")?.value ?? ".";
  const group = symbols.find((part) => part.type === "group")?.value;
  const minus = symbols.find((part) => part.type === "minusSign")?.value ?? "-";
  const accountingNegative = value.includes("(") && value.includes(")");
  const percent = new Intl.NumberFormat(locale, options)
    .formatToParts(1)
    .some((part) => part.type === "percentSign" && value.includes(part.value));
  const digitFormatter = new Intl.NumberFormat(locale, {
    useGrouping: false,
    numberingSystem: options.numberingSystem,
  });

  let normalized = value;
  for (let digit = 0; digit <= 9; digit += 1) {
    const localized = digitFormatter.format(digit);
    if (localized !== String(digit)) normalized = normalized.replaceAll(localized, String(digit));
  }
  if (group) normalized = normalized.replaceAll(group, "");
  if (decimal !== ".") normalized = normalized.replaceAll(decimal, ".");
  if (minus !== "-") normalized = normalized.replaceAll(minus, "-");
  normalized = normalized.replace(/[^\d+\-.]/g, "");

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return null;
  const signed = accountingNegative ? -Math.abs(parsed) : parsed;
  return percent ? signed / 100 : signed;
}

function formatEditableNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    useGrouping: false,
    maximumFractionDigits: 20,
  }).format(value);
}

export function NumberField({
  value,
  defaultValue = 0,
  onValueChange,
  step = 1,
  min,
  max,
  formatOptions,
  locale = "en-US",
  className,
  disabled,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: NumberFieldProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const current = value ?? internal;
  const formatter = useMemo(
    () => (formatOptions ? new Intl.NumberFormat(locale, formatOptions) : undefined),
    [locale, formatOptions],
  );

  function update(next: number) {
    const bounded = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
    if (value === undefined) setInternal(bounded);
    onValueChange?.(bounded);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    setDraft(formatEditableNumber(current, locale));
    setEditing(true);
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setEditing(false);
    onBlur?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || !formatOptions) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      update(current + step);
      setDraft(formatEditableNumber(Math.min(max ?? Infinity, current + step), locale));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      update(current - step);
      setDraft(formatEditableNumber(Math.max(min ?? -Infinity, current - step), locale));
    }
  }

  return (
    <div className={cn("flex h-9 w-fit items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring/40", disabled && "opacity-50", className)}>
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Decrease value" disabled={disabled || (min !== undefined && current <= min)} onClick={() => update(current - step)}><Minus /></Button>
      {formatter ? (
        <Input
          {...props}
          type="text"
          lang={locale}
          inputMode="decimal"
          role="spinbutton"
          value={editing ? draft : formatter.format(current)}
          aria-valuenow={current}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={formatter.format(current)}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            const nextDraft = event.currentTarget.value;
            setDraft(nextDraft);
            const nextValue = parseFormattedNumber(nextDraft, formatOptions!, locale);
            if (nextValue !== null) update(nextValue);
          }}
          className="h-full w-36 rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0"
        />
      ) : (
        <Input
          {...props}
          type="number"
          value={current}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={(event) => {
            const next = event.currentTarget.valueAsNumber;
            if (Number.isFinite(next)) update(next);
          }}
          className="h-full w-16 rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0"
        />
      )}
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Increase value" disabled={disabled || (max !== undefined && current >= max)} onClick={() => update(current + step)}><Plus /></Button>
    </div>
  );
}
