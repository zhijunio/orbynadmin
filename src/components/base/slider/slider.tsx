"use client";

import { useState, type ComponentProps } from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/utils/cn";

type SliderRootProps = Omit<
  ComponentProps<typeof SliderPrimitive.Root>,
  | "value"
  | "defaultValue"
  | "onChange"
  | "onValueChange"
  | "onValueCommit"
>;

type SliderDisplayProps = {
  label?: string;
  formatValue?: (value: number) => string;
  showTooltip?: boolean;
  thumbClassName?: string;
};

export type SliderProps = SliderRootProps &
  SliderDisplayProps & {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
  };

export type RangeSliderProps = SliderRootProps &
  SliderDisplayProps & {
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    onChangeEnd?: (value: [number, number]) => void;
  };

const rootClassName =
  "relative flex w-full touch-none select-none items-center py-2 disabled:opacity-50 data-[disabled]:pointer-events-none";
const trackClassName =
  "relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted shadow-inner";
const rangeClassName =
  "absolute h-full rounded-full bg-gradient-to-r from-primary/80 to-primary";
const thumbClassName =
  "relative z-10 block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-md shadow-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50";

function ValueThumb({
  value,
  label,
  formatValue,
  showTooltip,
  className,
}: {
  value: number;
  label: string;
  formatValue: (value: number) => string;
  showTooltip: boolean;
  className?: string;
}) {
  return (
    <SliderPrimitive.Thumb
      aria-label={label}
      aria-valuetext={formatValue(value)}
      className={cn(thumbClassName, className)}
    >
      {showTooltip && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium tabular-nums text-background shadow-sm"
        >
          {formatValue(value)}
        </span>
      )}
    </SliderPrimitive.Thumb>
  );
}

export function Slider({
  value,
  defaultValue = 50,
  onChange,
  onChangeEnd,
  label = "Value",
  formatValue = String,
  showTooltip = true,
  className,
  thumbClassName: customThumbClassName,
  min = 0,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  function handleValueChange(values: number[]) {
    const nextValue = values[0] ?? min;
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  function handleValueCommit(values: number[]) {
    onChangeEnd?.(values[0] ?? min);
  }

  return (
    <SliderPrimitive.Root
      {...props}
      min={min}
      value={value === undefined ? undefined : [value]}
      defaultValue={value === undefined ? [defaultValue] : undefined}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      className={cn(rootClassName, className)}
    >
      <SliderPrimitive.Track className={trackClassName}>
        <SliderPrimitive.Range className={rangeClassName} />
      </SliderPrimitive.Track>
      <ValueThumb
        value={currentValue}
        label={label}
        formatValue={formatValue}
        showTooltip={showTooltip}
        className={customThumbClassName}
      />
    </SliderPrimitive.Root>
  );
}

export function RangeSlider({
  value,
  defaultValue = [25, 75],
  onChange,
  onChangeEnd,
  label = "Range",
  formatValue = String,
  showTooltip = true,
  className,
  thumbClassName: customThumbClassName,
  min = 0,
  ...props
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const currentValue = value ?? internalValue;

  function handleValueChange(values: number[]) {
    const nextValue: [number, number] = [values[0] ?? min, values[1] ?? min];
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  function handleValueCommit(values: number[]) {
    onChangeEnd?.([values[0] ?? min, values[1] ?? min]);
  }

  return (
    <SliderPrimitive.Root
      {...props}
      min={min}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      className={cn(rootClassName, className)}
    >
      <SliderPrimitive.Track className={trackClassName}>
        <SliderPrimitive.Range className={rangeClassName} />
      </SliderPrimitive.Track>
      {currentValue.map((thumbValue, index) => (
        <ValueThumb
          key={index}
          value={thumbValue}
          label={`${label} ${index === 0 ? "minimum" : "maximum"}`}
          formatValue={formatValue}
          showTooltip={showTooltip}
          className={customThumbClassName}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
