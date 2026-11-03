import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export type BubbleVariant = "default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive";
const variants: Record<BubbleVariant, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-foreground",
  tinted: "bg-primary/10 text-foreground dark:bg-primary/20",
  outline: "border-border bg-background text-foreground",
  ghost: "border-transparent bg-transparent p-0 text-foreground",
  destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20",
};

export function BubbleGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="bubble-group" className={cn("flex min-w-0 flex-col gap-2", className)} {...props} />;
}

export function Bubble({ variant = "default", align = "start", className, ...props }: ComponentProps<"div"> & { variant?: BubbleVariant; align?: "start" | "end" }) {
  return <div data-slot="bubble" data-variant={variant} data-align={align} className={cn("group/bubble relative flex w-fit min-w-0 max-w-[80%] flex-col", align === "end" && "self-end", variant === "ghost" && "max-w-full", className)} {...props} />;
}

export function BubbleContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="bubble-content" className={cn("w-fit min-w-0 max-w-full overflow-hidden wrap-break-word rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed", className)} {...props} />;
}

export function BubbleReactions({ side = "bottom", align = "end", className, ...props }: ComponentProps<"div"> & { side?: "top" | "bottom"; align?: "start" | "end" }) {
  return <div data-slot="bubble-reactions" data-side={side} data-align={align} className={cn("absolute z-10 flex w-fit items-center gap-1 rounded-full border bg-card px-1.5 py-1 text-xs shadow-sm", side === "top" ? "-top-3" : "-bottom-3", align === "end" ? "right-2" : "left-2", className)} {...props} />;
}

export const bubbleVariantClass = (variant: BubbleVariant) => variants[variant];
