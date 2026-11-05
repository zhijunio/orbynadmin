"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import { Switch } from "@/components/ui/switch/switch";
import { cn } from "@/utils/cn";

export type SwitchCardProps = Omit<
  ComponentProps<typeof Switch>,
  "id" | "aria-label" | "aria-labelledby"
> & {
  label: ReactNode;
  description?: ReactNode;
  id?: string;
  cardClassName?: string;
};

export function SwitchCard({
  label,
  description,
  id,
  className,
  cardClassName,
  ...props
}: SwitchCardProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const labelId = `${controlId}-label`;
  const descriptionId = description ? `${controlId}-description` : undefined;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded-xl border bg-card p-4 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/[0.04] has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60",
        cardClassName,
      )}
    >
      <div className="grid min-w-0 gap-1">
        <span id={labelId} className="text-sm font-medium leading-5">
          {label}
        </span>
        {description && (
          <span
            id={descriptionId}
            className="text-xs leading-5 text-muted-foreground"
          >
            {description}
          </span>
        )}
      </div>
      <Switch
        {...props}
        id={controlId}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className={cn("mt-0.5", className)}
      />
    </div>
  );
}
