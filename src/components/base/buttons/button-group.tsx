import type { ComponentProps } from "react";

import { Button } from "@/components/base/buttons/button";
import { cn } from "@/utils/cn";

type ButtonGroupLabel =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

export type ButtonGroupProps = Omit<
  ComponentProps<"div">,
  "aria-label" | "aria-labelledby" | "role"
> &
  ButtonGroupLabel;

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="button-group"
      className={cn(
        "inline-flex w-fit items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border shadow-xs",
        "[&>[data-slot=button]]:rounded-none [&>[data-slot=button]]:border-0 [&>[data-slot=button]]:shadow-none",
        "[&>[data-slot=button]]:focus-visible:relative [&>[data-slot=button]]:focus-visible:z-10 [&>[data-slot=button]]:focus-visible:ring-inset",
        className,
      )}
    />
  );
}

export type ButtonGroupItemProps = Omit<
  ComponentProps<typeof Button>,
  "aria-pressed"
> & {
  selected?: boolean;
};

export function ButtonGroupItem({
  className,
  selected,
  type = "button",
  ...props
}: ButtonGroupItemProps) {
  return (
    <Button
      {...props}
      type={type}
      aria-pressed={selected}
      className={cn(
        selected &&
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        className,
      )}
    />
  );
}
