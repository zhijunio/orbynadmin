import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type StatusDotColor =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type StatusDotProps = Omit<ComponentProps<"span">, "children"> & {
  color?: StatusDotColor;
};

const colors: Record<StatusDotColor, { halo: string; dot: string }> = {
  success: { halo: "bg-success/15", dot: "bg-success" },
  warning: { halo: "bg-warning/15", dot: "bg-warning" },
  error: { halo: "bg-destructive/15", dot: "bg-destructive" },
  info: { halo: "bg-info/15", dot: "bg-info" },
  neutral: { halo: "bg-muted", dot: "bg-muted-foreground" },
};

export function StatusDot({
  color = "neutral",
  className,
  "aria-hidden": ariaHidden,
  ...props
}: StatusDotProps) {
  const palette = colors[color];

  return (
    <span
      {...props}
      aria-hidden={ariaHidden ?? true}
      className={cn(
        "inline-flex size-3 shrink-0 items-center justify-center rounded-full",
        palette.halo,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", palette.dot)} />
    </span>
  );
}
