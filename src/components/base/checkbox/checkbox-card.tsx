"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cn } from "@/utils/cn";

export type CheckboxCardProps = Omit<
  ComponentProps<typeof Checkbox>,
  "id"
> & {
  label: ReactNode;
  description?: ReactNode;
  id?: string;
  cardClassName?: string;
};

export function CheckboxCard({
  label,
  description,
  id,
  className,
  cardClassName,
  ...props
}: CheckboxCardProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <label
      htmlFor={controlId}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/[0.04] has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60",
        cardClassName,
      )}
    >
      <Checkbox
        {...props}
        id={controlId}
        className={cn("mt-0.5", className)}
      />
      <span className="grid min-w-0 gap-1">
        <span className="text-sm font-medium leading-5">{label}</span>
        {description && (
          <span className="text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
