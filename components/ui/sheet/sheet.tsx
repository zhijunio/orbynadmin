"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/utils/cn"
import { CloseButton } from "@/components/ui/button/close-button"

export type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>
export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>
export type SheetHeaderProps = React.ComponentProps<"div">
export type SheetFooterProps = React.ComponentProps<"div">
export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>
export type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>


const SheetContext = React.createContext<{ close: () => void } | null>(null)

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>
export type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  showOverlay?: boolean
  swipeDirection?: "up" | "right" | "down" | "left"
  swipeThreshold?: number
  overlayClassName?: string
}

function Sheet({ open, defaultOpen, onOpenChange, ...props }: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : internalOpen
  const changeOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }
  return <SheetContext.Provider value={{ close: () => changeOpen(false) }}><SheetPrimitive.Root data-slot="sheet" open={currentOpen} onOpenChange={changeOpen} {...props} /></SheetContext.Provider>
}

function SheetTrigger({
  ...props
}: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-200 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  showOverlay = true,
  swipeDirection,
  swipeThreshold = 72,
  overlayClassName,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: SheetContentProps) {
  const sheet = React.useContext(SheetContext)
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null)
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event)
    if (event.defaultPrevented || !swipeDirection || (event.pointerType === "mouse" && event.button !== 0)) return
    const target = event.target as HTMLElement
    if (target.closest("[data-sheet-no-swipe],input,textarea,select,[contenteditable=true]")) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(event)
    const start = pointerStart.current
    pointerStart.current = null
    if (!start || !swipeDirection || event.defaultPrevented) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const distance = swipeDirection === "left" ? -dx : swipeDirection === "right" ? dx : swipeDirection === "up" ? -dy : dy
    const crossAxis = swipeDirection === "left" || swipeDirection === "right" ? Math.abs(dy) : Math.abs(dx)
    if (distance >= swipeThreshold && distance > crossAxis) sheet?.close()
  }
  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = null
    onPointerCancel?.(event)
  }
  return (
    <SheetPortal>
      {showOverlay && <SheetOverlay className={overlayClassName} />}
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <CloseButton aria-label="Close panel" className="absolute top-3 right-3" />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
