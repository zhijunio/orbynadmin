"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "radix-ui"
import { cn } from "@/utils/cn"

export type ToggleVariant = "default" | "outline"
export type ToggleSize = "sm" | "default" | "lg"
export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant
  size?: ToggleSize
}

export function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  return <TogglePrimitive.Root
    data-slot="toggle"
    data-variant={variant}
    data-size={size}
    className={cn(
      "group/toggle inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-accent aria-pressed:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      variant === "default" && "bg-transparent hover:bg-muted",
      variant === "outline" && "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      size === "sm" && "h-8 min-w-8 px-2",
      size === "default" && "h-9 min-w-9 px-2.5",
      size === "lg" && "h-10 min-w-10 px-3",
      className,
    )}
    {...props}
  />
}
