"use client";
import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/utils/cn";

export type SegmentedControlProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  dir?: "ltr" | "rtl";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
};
export type SegmentedControlItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item>;
function SegmentedControl({ className, value, defaultValue, onValueChange, ...props }: SegmentedControlProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "");
  const current = value ?? uncontrolled;
  return <ToggleGroupPrimitive.Root {...props} type="single" data-slot="segmented-control" value={current} onValueChange={(next) => { if (!next) return; if (value === undefined) setUncontrolled(next); onValueChange?.(next); }} className={cn("inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground", className)} />;
}
function SegmentedControlItem({ className, ...props }: SegmentedControlItemProps) {
  return <ToggleGroupPrimitive.Item data-slot="segmented-control-item" className={cn("inline-flex h-7 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm disabled:pointer-events-none disabled:opacity-50", className)} {...props} />;
}
export { SegmentedControl, SegmentedControlItem };
