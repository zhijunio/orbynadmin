import { useId, type ReactNode } from "react";

import { cn } from "@/utils/cn";

export type MeterTone = "accent" | "success" | "warning" | "error";

export type MeterProps = {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  valueLabel?: string;
  description?: ReactNode;
  tone?: MeterTone;
  className?: string;
  trackClassName?: string;
};

const toneClasses: Record<MeterTone, string> = {
  accent: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
};

export function Meter({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  valueLabel,
  description,
  tone = "accent",
  className,
  trackClassName,
}: MeterProps) {
  const id = useId();
  const minimum = Number.isFinite(minValue) ? minValue : 0;
  const maximum = Number.isFinite(maxValue) && maxValue > minimum ? maxValue : minimum + 100;
  const currentValue = Number.isFinite(value) ? value : minimum;
  const range = maximum - minimum;
  const clampedValue = Math.min(maximum, Math.max(minimum, currentValue));
  const percentage = ((clampedValue - minimum) / range) * 100;
  const displayValue = valueLabel ?? `${Math.round(percentage)}%`;

  return (
    <div
      role="meter"
      aria-labelledby={`${id}-label`}
      aria-describedby={description ? `${id}-description` : undefined}
      aria-valuemin={minimum}
      aria-valuemax={maximum}
      aria-valuenow={clampedValue}
      aria-valuetext={valueLabel}
      className={cn("grid w-full gap-2", className)}
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <span id={`${id}-label`} className="font-medium text-foreground">
          {label}
        </span>
        <span className="shrink-0 tabular-nums text-muted-foreground">
          {displayValue}
        </span>
      </div>
      <div
        aria-hidden="true"
        className={cn("flex h-1.5 w-full overflow-hidden rounded-full bg-muted", trackClassName)}
      >
        <div
          className={cn("h-full shrink-0 rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none", toneClasses[tone])}
          style={{ width: `${percentage}%`, marginInlineEnd: "auto" }}
        />
      </div>
      {description && (
        <p id={`${id}-description`} className="text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
