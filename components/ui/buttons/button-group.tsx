import type { ComponentProps } from "react";

import { Button } from "@/components/ui/buttons/button";
import { cn } from "@/utils/cn";

type ButtonGroupLabel =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

export type ButtonGroupProps = Omit<
  ComponentProps<"div">,
  "aria-label" | "aria-labelledby" | "role"
> & ButtonGroupLabel & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex w-fit items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border shadow-xs",
        orientation === "vertical" && "flex-col",
        "[&>[data-slot=button]]:rounded-none [&>[data-slot=button]]:border-0 [&>[data-slot=button]]:shadow-none",
        "[&>[data-slot=button]]:focus-visible:relative [&>[data-slot=button]]:focus-visible:z-10 [&>[data-slot=button]]:focus-visible:ring-inset",
        className,
      )}
    />
  );
}

export function ButtonGroupText({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="button-group-text" className={cn("inline-flex items-center bg-background px-3 text-sm text-muted-foreground", className)} {...props} />;
}

export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return <div role="separator" aria-orientation={orientation} data-slot="button-group-separator" className={cn("shrink-0 bg-border", orientation === "vertical" ? "my-1 w-px" : "mx-1 h-px", className)} {...props} />;
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
