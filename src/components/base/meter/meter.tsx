import { cn } from "@/utils/cn";

export type MeterProps = Omit<React.ComponentProps<"meter">, "children" | "value" | "min" | "max" | "low" | "high" | "optimum"> & {
  label?: string;
  showValue?: boolean;
  value?: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
};

export function Meter({ className, label, showValue = false, value = 0, min = 0, max = 100, low, high, optimum, ...props }: MeterProps) {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, ((value - min) / range) * 100)) : 0;
  const state = low !== undefined && value < low ? "low" : high !== undefined && value > high ? "high" : "optimum";
  return <div className="w-full space-y-1.5">
    {(label || showValue) && <div className="flex items-center justify-between gap-3 text-sm"><span className="font-medium">{label}</span>{showValue && <span className="tabular-nums text-muted-foreground">{value}{max === 100 && min === 0 ? "%" : ` / ${max}`}</span>}</div>}
    <meter className="sr-only" value={value} min={min} max={max} low={low} high={high} optimum={optimum} {...props} />
    <div aria-hidden="true" className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}><div className={cn("h-full rounded-full transition-[width]", state === "low" ? "bg-amber-500" : state === "high" ? "bg-destructive" : "bg-primary")} style={{ width: `${percentage}%` }} /></div>
  </div>;
}
