"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button/button"
import { CloseButton } from "@/components/ui/button/close-button"

export type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>
export type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>
export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>
export type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>
export type DialogBodyProps = React.ComponentProps<"div">
export type ModalProps = React.ComponentProps<typeof DialogContent>
export type ModalTriggerProps = DialogTriggerProps
export type ModalBodyProps = DialogBodyProps
export type ModalFooterProps = React.ComponentProps<"div">
export type DialogHeaderProps = React.ComponentProps<"div">
export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>
export type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>


export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>
export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
  showOverlay?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  closeLabel?: string
  overlayClassName?: string
}
export type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}
export type ModalHeaderProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
}

function Dialog({
  ...props
}: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-200 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  showOverlay = true,
  size,
  closeLabel = "Close dialog",
  overlayClassName,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      {showOverlay && <DialogOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-size={size ?? "default"}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-200 outline-none data-[size=default]:sm:max-w-sm data-[size=sm]:sm:max-w-[400px] data-[size=md]:sm:max-w-[480px] data-[size=lg]:sm:max-w-[640px] data-[size=xl]:sm:max-w-[800px] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <CloseButton aria-label={closeLabel} className="absolute end-3 top-3" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
      {...props}
    />
  )
}

function Modal({ size = "md", ...props }: ModalProps) {
  return <DialogContent size={size} {...props} />
}

function ModalHeader({
  title,
  description,
  children,
  className,
  ...props
}: ModalHeaderProps) {
  return (
    <DialogHeader className={className} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
      {children}
    </DialogHeader>
  )
}

function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end [&>button]:w-full sm:[&>button]:w-auto",
        className
      )}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogTrigger as ModalTrigger,
  Modal,
  DialogBody as ModalBody,
  ModalFooter,
  ModalHeader,
}
