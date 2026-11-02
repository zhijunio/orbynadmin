"use client";

import { useState } from "react";
import { IconMinus as Minus, IconPlus as Plus } from "@tabler/icons-react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { cn } from "@/utils/cn";

export type NumberFieldProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
};

export function NumberField({ value, defaultValue = 0, onValueChange, step = 1, min, max, className, disabled, ...props }: NumberFieldProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  function update(next: number) {
    const bounded = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
    if (value === undefined) setInternal(bounded);
    onValueChange?.(bounded);
  }
  return <div className={cn("flex h-9 w-fit items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring/40", disabled && "opacity-50", className)}>
    <Button type="button" variant="ghost" size="icon-sm" aria-label="Decrease value" disabled={disabled || (min !== undefined && current <= min)} onClick={() => update(current - step)}><Minus /></Button>
    <Input {...props} type="number" value={current} min={min} max={max} step={step} disabled={disabled} onChange={(event) => { const next = event.currentTarget.valueAsNumber; if (Number.isFinite(next)) update(next); }} className="h-full w-16 rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0" />
    <Button type="button" variant="ghost" size="icon-sm" aria-label="Increase value" disabled={disabled || (max !== undefined && current >= max)} onClick={() => update(current + step)}><Plus /></Button>
  </div>;
}
