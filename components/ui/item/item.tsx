import * as React from "react"
import { cn } from "@/utils/cn"
import { Separator } from "@/components/ui/divider/separator"

export type ItemVariant = "default" | "outline" | "muted"
export type ItemSize = "default" | "sm" | "xs"
export type ItemGroupProps = React.ComponentProps<"div">
export type ItemSeparatorProps = React.ComponentProps<typeof Separator>
export type ItemProps = React.ComponentProps<"div"> & {
  variant?: ItemVariant
  size?: ItemSize
}
export type ItemMediaProps = React.ComponentProps<"div"> & {
  variant?: "default" | "icon" | "image"
}
export type ItemContentProps = React.ComponentProps<"div">
export type ItemTitleProps = React.ComponentProps<"div">
export type ItemDescriptionProps = React.ComponentProps<"p">
export type ItemActionsProps = React.ComponentProps<"div">
export type ItemHeaderProps = React.ComponentProps<"div">
export type ItemFooterProps = React.ComponentProps<"div">

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return <div role="list" data-slot="item-group" className={cn("flex w-full flex-col", className)} {...props} />
}

export function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn("my-1", className)} {...props} />
}

export function Item({ className, variant = "default", size = "default", ...props }: ItemProps) {
  return <div role="listitem" data-slot="item" data-variant={variant} data-size={size} className={cn("group/item flex min-w-0 flex-wrap items-center gap-3 rounded-lg transition-colors focus-within:ring-2 focus-within:ring-ring/50", variant === "default" && "bg-transparent", variant === "outline" && "border border-border bg-card", variant === "muted" && "bg-muted/60", size === "default" && "min-h-16 p-3", size === "sm" && "min-h-12 p-2.5", size === "xs" && "min-h-10 gap-2 p-2", className)} {...props} />
}

export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return <div data-slot="item-media" data-variant={variant} className={cn("flex shrink-0 items-center justify-center", variant === "default" && "text-muted-foreground", variant === "icon" && "size-9 rounded-md bg-muted text-muted-foreground [&_svg]:size-4", variant === "image" && "size-10 overflow-hidden rounded-full [&_img]:size-full [&_img]:object-cover", className)} {...props} />
}

export function ItemContent({ className, ...props }: ItemContentProps) {
  return <div data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />
}

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return <div data-slot="item-title" className={cn("flex min-w-0 items-center gap-2 truncate text-sm font-medium", className)} {...props} />
}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return <p data-slot="item-description" className={cn("line-clamp-2 text-sm text-muted-foreground", className)} {...props} />
}

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
}

export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return <div data-slot="item-header" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}

export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return <div data-slot="item-footer" className={cn("flex basis-full items-center justify-between gap-3", className)} {...props} />
}
