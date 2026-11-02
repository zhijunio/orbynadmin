import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export type ChipVariant = "bold" | "subtle" | "caption";
export type ChipColor = "lime" | "rose" | "yellow" | "cyan" | "neutral" | "gray" | "soft";

export type ChipProps = ComponentProps<"span"> & {
  variant?: ChipVariant;
  color?: ChipColor;
};

const variants: Record<ChipVariant, string> = {
  bold: "py-0.5 text-sm font-medium leading-5",
  subtle: "py-1 text-sm font-medium leading-5",
  caption: "py-1 text-xs font-medium leading-4 tracking-[0.15px]",
};

const colors: Record<ChipColor, string> = {
  lime: "bg-lime-200 text-lime-800 dark:bg-lime-950/60 dark:text-lime-500",
  rose: "bg-rose-200 text-rose-800 dark:bg-rose-950/60 dark:text-rose-500",
  yellow: "bg-yellow-200 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-500",
  cyan: "bg-cyan-200 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-400",
  neutral: "bg-muted text-muted-foreground",
  gray: "bg-secondary text-secondary-foreground",
  soft: "bg-secondary text-muted-foreground",
};

export function Chip({ variant = "bold", color = "neutral", className, ...props }: ChipProps) {
  return (
    <span
      data-slot="chip"
      data-variant={variant}
      data-color={color}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 whitespace-nowrap transition-[padding,font-size] duration-200 ease",
        variants[variant],
        colors[color],
        className,
      )}
      {...props}
    />
  );
}
