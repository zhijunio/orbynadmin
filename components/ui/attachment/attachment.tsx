import { Slot } from "radix-ui";

import { Button } from "@/components/ui/button/button";
import { cn } from "@/utils/cn";

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";
export type AttachmentSize = "default" | "sm" | "xs";
export type AttachmentOrientation = "horizontal" | "vertical";
export type AttachmentProps = React.ComponentProps<"div"> & {
  state?: AttachmentState
  size?: AttachmentSize
  orientation?: AttachmentOrientation
}
export type AttachmentMediaProps = React.ComponentProps<"div"> & {
  variant?: "icon" | "image"
}
export type AttachmentContentProps = React.ComponentProps<"div">
export type AttachmentTitleProps = React.ComponentProps<"span">
export type AttachmentDescriptionProps = React.ComponentProps<"span">
export type AttachmentActionsProps = React.ComponentProps<"div">
export type AttachmentActionProps = React.ComponentProps<typeof Button>
export type AttachmentTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean
}
export type AttachmentGroupProps = React.ComponentProps<"div">

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: AttachmentProps) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border border-border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
        orientation === "horizontal" && "min-w-40 items-center",
        orientation === "vertical" && "w-24 flex-col has-data-[slot=attachment-content]:w-[7.5rem]",
        size === "default" && "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        size === "sm" && "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        size === "xs" && "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
        className,
      )}
      {...props}
    />
  );
}

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(
        "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:[&_svg:not([class*=size-])]:size-6 [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4",
        variant === "image" && "opacity-60 group-data-[state=idle]/attachment:opacity-100 group-data-[state=done]/attachment:opacity-100 [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
        "group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function AttachmentContent({ className, ...props }: AttachmentContentProps) {
  return <div data-slot="attachment-content" className={cn("min-w-0 max-w-full flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1", className)} {...props} />;
}

function AttachmentTitle({ className, ...props }: AttachmentTitleProps) {
  return <span data-slot="attachment-title" className={cn("block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:animate-pulse", className)} {...props} />;
}

function AttachmentDescription({ className, ...props }: AttachmentDescriptionProps) {
  return <span data-slot="attachment-description" className={cn("mt-0.5 block max-w-full min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80", className)} {...props} />;
}

function AttachmentActions({ className, ...props }: AttachmentActionsProps) {
  return <div data-slot="attachment-actions" className={cn("relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1", className)} {...props} />;
}

function AttachmentAction({ className, size = "icon-xs", variant = "ghost", ...props }: AttachmentActionProps) {
  return <Button data-slot="attachment-action" variant={variant} size={size} className={cn("shrink-0", className)} {...props} />;
}

function AttachmentTrigger({
  className,
  asChild = false,
  type = "button",
  ...props
}: AttachmentTriggerProps) {
  const Component = asChild ? Slot.Root : "button";

  return <Component data-slot="attachment-trigger" {...(asChild ? {} : { type })} className={cn("absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props} />;
}

function AttachmentGroup({ className, ...props }: AttachmentGroupProps) {
  return <div data-slot="attachment-group" className={cn("flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&>*]:flex-none [&>*]:snap-start", className)} {...props} />;
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
};
