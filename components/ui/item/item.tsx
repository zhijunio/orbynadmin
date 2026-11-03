import * as React from "react"
import { cn } from "@/utils/cn"
import { Separator } from "@/components/ui/divider/separator"

type ItemVariant = "default" | "outline" | "muted"
type ItemSize = "default" | "sm" | "xs"

export function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="list" data-slot="item-group" className={cn("flex w-full flex-col", className)} {...props} />
}

export function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn("my-1", className)} {...props} />
}

export function Item({ className, variant = "default", size = "default", ...props }: React.ComponentProps<"div"> & { variant?: ItemVariant; size?: ItemSize }) {
  return <div role="listitem" data-slot="item" data-variant={variant} data-size={size} className={cn("group/item flex min-w-0 flex-wrap items-center gap-3 rounded-lg transition-colors focus-within:ring-2 focus-within:ring-ring/50", variant === "default" && "bg-transparent", variant === "outline" && "border border-border bg-card", variant === "muted" && "bg-muted/60", size === "default" && "min-h-16 p-3", size === "sm" && "min-h-12 p-2.5", size === "xs" && "min-h-10 gap-2 p-2", className)} {...props} />
}

export function ItemMedia({ className, variant = "default", ...props }: React.ComponentProps<"div"> & { variant?: "default" | "icon" | "image" }) {
  return <div data-slot="item-media" data-variant={variant} className={cn("flex shrink-0 items-center justify-center", variant === "default" && "text-muted-foreground", variant === "icon" && "size-9 rounded-md bg-muted text-muted-foreground [&_svg]:size-4", variant === "image" && "size-10 overflow-hidden rounded-full [&_img]:size-full [&_img]:object-cover", className)} {...props} />
}

export function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />
}

export function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn("flex min-w-0 items-center gap-2 truncate text-sm font-medium", className)} {...props} />
}

export function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-description" className={cn("line-clamp-2 text-sm text-muted-foreground", className)} {...props} />
}

export function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
}

export function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}

export function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}
