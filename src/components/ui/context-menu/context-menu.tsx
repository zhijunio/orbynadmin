"use client";

import * as React from "react";
import { ContextMenu as Primitive } from "radix-ui";
import { IconCheck as Check, IconChevronRight as ChevronRight, IconCircle as Circle } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

const ContextMenu = Primitive.Root;
const ContextMenuTrigger = Primitive.Trigger;
const ContextMenuGroup = Primitive.Group;
const ContextMenuPortal = Primitive.Portal;
const ContextMenuSub = Primitive.Sub;
const ContextMenuRadioGroup = Primitive.RadioGroup;

const ContextMenuContent = React.forwardRef<React.ComponentRef<typeof Primitive.Content>, React.ComponentPropsWithoutRef<typeof Primitive.Content>>(({ className, ...props }, ref) => <Primitive.Portal><Primitive.Content ref={ref} className={cn("z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none", className)} {...props} /></Primitive.Portal>);
ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = React.forwardRef<React.ComponentRef<typeof Primitive.Item>, React.ComponentPropsWithoutRef<typeof Primitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }>(({ className, inset, variant = "default", ...props }, ref) => <Primitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", variant === "destructive" && "text-destructive focus:bg-destructive/10", className)} {...props} />);
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuCheckboxItem = React.forwardRef<React.ComponentRef<typeof Primitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof Primitive.CheckboxItem>>(({ className, children, checked, ...props }, ref) => <Primitive.CheckboxItem ref={ref} checked={checked} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center">{checked === "indeterminate" ? <span className="h-0.5 w-2 bg-current" /> : <Primitive.ItemIndicator><Check className="size-4" /></Primitive.ItemIndicator>}</span>{children}</Primitive.CheckboxItem>);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioItem = React.forwardRef<React.ComponentRef<typeof Primitive.RadioItem>, React.ComponentPropsWithoutRef<typeof Primitive.RadioItem>>(({ className, children, ...props }, ref) => <Primitive.RadioItem ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><Primitive.ItemIndicator><Circle className="size-2 fill-current" /></Primitive.ItemIndicator></span>{children}</Primitive.RadioItem>);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuSubTrigger = React.forwardRef<React.ComponentRef<typeof Primitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof Primitive.SubTrigger> & { inset?: boolean }>(({ className, inset, children, ...props }, ref) => <Primitive.SubTrigger ref={ref} className={cn("flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className)} {...props}>{children}<ChevronRight className="ml-auto size-4" /></Primitive.SubTrigger>);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
const ContextMenuSubContent = React.forwardRef<React.ComponentRef<typeof Primitive.SubContent>, React.ComponentPropsWithoutRef<typeof Primitive.SubContent>>(({ className, ...props }, ref) => <Primitive.SubContent ref={ref} className={cn("z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props} />);
ContextMenuSubContent.displayName = "ContextMenuSubContent";
const ContextMenuSeparator = React.forwardRef<React.ComponentRef<typeof Primitive.Separator>, React.ComponentPropsWithoutRef<typeof Primitive.Separator>>(({ className, ...props }, ref) => <Primitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />);
ContextMenuSeparator.displayName = "ContextMenuSeparator";
const ContextMenuLabel = React.forwardRef<React.ComponentRef<typeof Primitive.Label>, React.ComponentPropsWithoutRef<typeof Primitive.Label> & { inset?: boolean }>(({ className, inset, ...props }, ref) => <Primitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", inset && "pl-8", className)} {...props} />);
ContextMenuLabel.displayName = "ContextMenuLabel";

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuGroup, ContextMenuLabel, ContextMenuSeparator, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuPortal };
