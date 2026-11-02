"use client";

import { useState } from "react";
import { IconSearch as Search } from "@tabler/icons-react";
import { Input } from "@/components/base/input/input";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cn } from "@/utils/cn";

export type SearchFieldProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
};

export function SearchField({ value, defaultValue = "", onValueChange, onClear, className, ...props }: SearchFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  function update(next: string) { if (value === undefined) setInternalValue(next); onValueChange?.(next); }
  return <div className="relative w-full"><Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input {...props} type="search" value={current} onChange={(event) => update(event.currentTarget.value)} className={cn("pl-9 pr-9", className)} />{current && <CloseButton aria-label="Clear search" size="xs" onClick={() => { if (onClear) onClear(); else update(""); }} className="absolute top-1/2 right-2 -translate-y-1/2" />}</div>;
}
