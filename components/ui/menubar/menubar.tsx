"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"
import { IconCheck, IconChevronRight, IconCircle } from "@tabler/icons-react"

import { cn } from "@/utils/cn"

function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root data-slot="menubar" className={cn("flex h-9 items-center gap-1 rounded-lg border border-border bg-background p-1", className)} {...props} />
}
function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) { return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} /> }
function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return <MenubarPrimitive.Trigger data-slot="menubar-trigger" className={cn("flex h-7 items-center rounded-md px-2 text-sm font-medium outline-none hover:bg-accent focus:bg-accent data-[state=open]:bg-accent", className)} {...props} />
}
function MenubarPortal(props: React.ComponentProps<typeof MenubarPrimitive.Portal>) { return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} /> }
function MenubarContent({ className, align = "start", sideOffset = 6, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return <MenubarPrimitive.Portal><MenubarPrimitive.Content data-slot="menubar-content" align={align} sideOffset={sideOffset} className={cn("z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className)} {...props} /></MenubarPrimitive.Portal>
}
function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) { return <MenubarPrimitive.Group data-slot="menubar-group" {...props} /> }
function MenubarLabel({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label>) { return <MenubarPrimitive.Label data-slot="menubar-label" className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props} /> }
function MenubarItem({ className, inset, variant = "default", ...props }: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return <MenubarPrimitive.Item data-slot="menubar-item" data-inset={inset} data-variant={variant} className={cn("relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive", className)} {...props} />
}
function MenubarCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return <MenubarPrimitive.CheckboxItem data-slot="menubar-checkbox-item" className={cn("relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"><MenubarPrimitive.ItemIndicator><IconCheck className="size-3.5" /></MenubarPrimitive.ItemIndicator></span>{children}</MenubarPrimitive.CheckboxItem>
}
function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) { return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} /> }
function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return <MenubarPrimitive.RadioItem data-slot="menubar-radio-item" className={cn("relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"><MenubarPrimitive.ItemIndicator><IconCircle className="size-2 fill-current" /></MenubarPrimitive.ItemIndicator></span>{children}</MenubarPrimitive.RadioItem>
}
function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) { return <MenubarPrimitive.Separator data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} /> }
function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) { return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} /> }
function MenubarSubTrigger({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger>) {
  return <MenubarPrimitive.SubTrigger data-slot="menubar-sub-trigger" className={cn("flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", className)} {...props}>{children}<IconChevronRight className="ml-auto size-4" /></MenubarPrimitive.SubTrigger>
}
function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return <MenubarPrimitive.Portal><MenubarPrimitive.SubContent data-slot="menubar-sub-content" className={cn("z-50 min-w-36 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0", className)} {...props} /></MenubarPrimitive.Portal>
}
function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) { return <span data-slot="menubar-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} /> }

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarLabel, MenubarItem, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarShortcut, MenubarPortal }
