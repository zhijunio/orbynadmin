"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/utils/cn"

export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  spacing?: number
}

const sizeClasses = { sm: "h-8 px-2 text-xs", default: "h-9 px-2.5 text-sm", lg: "h-11 px-3 text-sm" } as const
const ToggleGroupContext = React.createContext<{ variant: "default" | "outline"; size: "sm" | "default" | "lg"; connected: boolean }>({ variant: "default", size: "default", connected: true })

function ToggleGroup({ className, variant = "default", size = "default", spacing = 0, orientation = "horizontal", ...props }: ToggleGroupProps) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" data-variant={variant} data-size={size} data-spacing={spacing} orientation={orientation} style={{ "--toggle-group-gap": `${spacing * 0.25}rem` } as React.CSSProperties} className={cn("group/toggle-group flex w-fit items-center gap-[var(--toggle-group-gap)] data-[orientation=vertical]:flex-col", className)} {...props}><ToggleGroupContext.Provider value={{ variant, size, connected: spacing === 0 }}>{props.children}</ToggleGroupContext.Provider></ToggleGroupPrimitive.Root>
}
export type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: ToggleGroupProps["variant"]
  size?: ToggleGroupProps["size"]
}

function ToggleGroupItem({ className, variant, size, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const currentVariant = variant ?? context.variant
  const currentSize = size ?? context.size
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" data-variant={currentVariant} data-size={currentSize} className={cn("inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", sizeClasses[currentSize], currentVariant === "outline" && "border border-input bg-background hover:bg-muted/70", currentVariant === "default" && "hover:bg-muted", context.connected && "rounded-none first:rounded-s-md last:rounded-e-md group-data-[orientation=vertical]/toggle-group:first:rounded-t-md group-data-[orientation=vertical]/toggle-group:first:rounded-s-none group-data-[orientation=vertical]/toggle-group:last:rounded-b-md group-data-[orientation=vertical]/toggle-group:last:rounded-e-none group-data-[orientation=horizontal]/toggle-group:[&+*]:-ms-px group-data-[orientation=vertical]/toggle-group:[&+*]:-mt-px", className)} {...props} />
}

export { ToggleGroup, ToggleGroupItem }
