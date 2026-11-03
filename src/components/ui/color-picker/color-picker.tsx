"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { cn } from "@/utils/cn";

export type ColorPickerProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export function ColorPicker({ value, defaultValue = "#2563eb", onValueChange, className, ...props }: ColorPickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  return <div className="flex w-fit items-center gap-2 rounded-lg border bg-background p-1.5"><Input {...props} type="color" value={current} onChange={(event) => { const next = event.currentTarget.value; if (value === undefined) setInternalValue(next); onValueChange?.(next); }} className={cn("size-8 cursor-pointer rounded-md border-0 p-0", className)} /><output className="min-w-18 font-mono text-xs uppercase text-muted-foreground">{current}</output></div>;
}

export type ColorWellProps = { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; label: string; swatches?: string[]; className?: string; disabled?: boolean };
export function ColorWell({ value, defaultValue = "#2563eb", onValueChange, label, swatches = [], className, disabled }: ColorWellProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const current = value ?? internalValue;
  const update = (next: string) => { if (value === undefined) setInternalValue(next); onValueChange?.(next); };
  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><button type="button" aria-label={label} aria-expanded={open} disabled={disabled} className={cn("inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-2.5 text-sm shadow-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}><span aria-hidden="true" className="size-5 rounded-full border border-foreground/15" style={{ backgroundColor: current }} />{current}</button></PopoverTrigger><PopoverContent align="start" className="w-auto"><ColorPicker aria-label={label} value={current} onValueChange={update} /><div className="flex flex-wrap gap-1.5">{swatches.map((swatch) => <button key={swatch} type="button" aria-label={`${label}: ${swatch}`} aria-pressed={swatch.toLowerCase() === current.toLowerCase()} onClick={() => update(swatch)} className="size-6 rounded-full border border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:ring-2 aria-pressed:ring-ring" style={{ backgroundColor: swatch }} />)}</div></PopoverContent></Popover>;
}
