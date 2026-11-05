"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "@/utils/cn"

export type NavigationMenuListProps = React.ComponentProps<typeof NavigationMenuPrimitive.List>
export type NavigationMenuItemProps = React.ComponentProps<typeof NavigationMenuPrimitive.Item>
export type NavigationMenuTriggerProps = React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>
export type NavigationMenuContentProps = React.ComponentProps<typeof NavigationMenuPrimitive.Content>
export type NavigationMenuLinkProps = React.ComponentProps<typeof NavigationMenuPrimitive.Link>
export type NavigationMenuIndicatorProps = React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>


export type NavigationMenuProps = React.ComponentProps<typeof NavigationMenuPrimitive.Root>

function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  return <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>{children}<NavigationMenuPrimitive.Viewport className="absolute left-0 top-full mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg transition-[width,height] duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 md:left-auto" /></NavigationMenuPrimitive.Root>
}
function NavigationMenuList({ className, ...props }: NavigationMenuListProps) { return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("m-0 flex list-none items-center gap-1 p-1", className)} {...props} /> }
function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) { return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} /> }
function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuTriggerProps) {
  return <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn("group inline-flex h-8 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium outline-none transition-colors hover:bg-accent focus:bg-accent data-[state=open]:bg-accent", className)} {...props}>{children}<IconChevronDown aria-hidden="true" className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" /></NavigationMenuPrimitive.Trigger>
}
function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn("left-0 top-0 w-full p-2 data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-3 data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-3 data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-3 data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-3 md:absolute md:w-auto", className)} {...props} />
}
function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) { return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" className={cn("block rounded-md p-3 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props} /> }
function NavigationMenuIndicator({ className, ...props }: NavigationMenuIndicatorProps) { return <NavigationMenuPrimitive.Indicator data-slot="navigation-menu-indicator" className={cn("top-full z-10 flex h-2 items-end justify-center overflow-hidden", className)} {...props}><div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" /></NavigationMenuPrimitive.Indicator> }

export { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger }
