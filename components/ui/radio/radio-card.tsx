"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio/radio-group";
import { cn } from "@/utils/cn";

export type RadioCardGroupProps = ComponentProps<typeof RadioGroup>;

export function RadioCardGroup({ className, ...props }: RadioCardGroupProps) {
  return (
    <RadioGroup
      {...props}
      className={cn("gap-3", className)}
    />
  );
}

export type RadioCardProps = Omit<
  ComponentProps<typeof RadioGroupItem>,
  "id"
> & {
  label: ReactNode;
  description?: ReactNode;
  id?: string;
  cardClassName?: string;
};

export function RadioCard({
  label,
  description,
  id,
  className,
  cardClassName,
  ...props
}: RadioCardProps) {
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
      <RadioGroupItem
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
