"use client";

import { useMemo, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import { IconMinus as Minus, IconPlus as Plus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { cn } from "@/utils/cn";

export type NumberFieldProps = Omit<React.ComponentProps<"input">, "type" | "size" | "value" | "defaultValue" | "onChange"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  formatOptions?: Intl.NumberFormatOptions;
  /** Defaults to en-US so server and browser formatting are consistent. */
  locale?: string;
  size?: "sm" | "default" | "lg";
  layout?: "inline" | "right";
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
  size = "default",
  layout = "inline",
  className,
  disabled,
  readOnly,
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
    if (event.defaultPrevented || readOnly || !formatOptions) return;
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
    <div className={cn("flex w-fit items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring/40",  size === "sm" && "h-7", size === "default" && "h-9", size === "lg" && "h-11", disabled && "opacity-50", className)}>
      {layout === "inline" && <Button type="button" variant="ghost" size={size === "lg" ? "icon" : "icon-sm"} aria-label="Decrease value" disabled={disabled || readOnly || (min !== undefined && current <= min)} onClick={() => update(current - step)}><Minus /></Button>}
      {formatter ? (
        <Input
          {...props}
          type="text"
          lang={locale}
          inputMode="decimal"
          role="spinbutton"
          readOnly={readOnly}
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
          className={cn("h-full rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0",size === "sm" ? "w-28 text-sm" : size === "lg" ? "w-44" : "w-36")}
        />
      ) : (
        <Input
          {...props}
          type="number"
          readOnly={readOnly}
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
          className={cn("h-full rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0",size === "sm" ? "w-12 text-sm" : size === "lg" ? "w-24" : "w-16")}
        />
      )}
      {layout === "inline" ? <Button type="button" variant="ghost" size={size === "lg" ? "icon" : "icon-sm"} aria-label="Increase value" disabled={disabled || readOnly || (max !== undefined && current >= max)} onClick={() => update(current + step)}><Plus /></Button> : <div className="flex h-full flex-col border-l"><Button type="button" variant="ghost" size="icon-xs" aria-label="Increase value" disabled={disabled || readOnly || (max !== undefined && current >= max)} onClick={() => update(current + step)}><Plus /></Button><Button type="button" variant="ghost" size="icon-xs" aria-label="Decrease value" disabled={disabled || readOnly || (min !== undefined && current <= min)} onClick={() => update(current - step)}><Minus /></Button></div>}
    </div>
  );
}
