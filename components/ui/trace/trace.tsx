import * as React from "react"
import { cn } from "@/utils/cn"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible/collapsible"
import { IconChevronRight } from "@tabler/icons-react"

export type TraceProps = React.ComponentProps<"div">
export type TraceLineProps = React.ComponentProps<"span"> & {
  status?: "running" | "error" | "pending"
}
export type TraceIconProps = React.ComponentProps<"span">
export type TraceTitleProps = React.ComponentProps<"span">
export type TraceDescriptionProps = React.ComponentProps<"span">
export type TraceCollapsibleProps = Omit<React.ComponentProps<typeof Collapsible>, "asChild" | "open"> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<React.ComponentProps<typeof Collapsible>["onOpenChange"]>
      }
  )
export type TraceCollapsibleTriggerProps = Omit<React.ComponentProps<typeof CollapsibleTrigger>, "asChild">
export type TraceCollapsibleContentProps = Omit<React.ComponentProps<typeof CollapsibleContent>, "asChild">

function Trace({ className, ...props }: TraceProps) {
  return (
    <div
      data-slot="trace"
      className={cn(
        "flex w-full min-w-0 flex-col *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none",
        className
      )}
      {...props}
    />
  )
}

function TraceLine({
  className,
  status,
  ...props
}: TraceLineProps) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      className={cn(
        "flex w-fit max-w-full min-w-0 items-center gap-2 py-1.5 text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function TraceIcon({ className, ...props }: TraceIconProps) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center [&_svg]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function TraceTitle({ className, ...props }: TraceTitleProps) {
  return (
    <span
      data-slot="trace-title"
      className={cn(
        "min-w-0 truncate ",
        className
      )}
      {...props}
    />
  )
}

function TraceDescription({
  className,
  ...props
}: TraceDescriptionProps) {
  return (
    <span
      data-slot="trace-description"
      className={cn(
        "shrink-0 text-muted-foreground/70 tabular-nums",
        className
      )}
      {...props}
    />
  )
}

function TraceCollapsible({
  className,
  ...props
}: TraceCollapsibleProps) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn(
        "flex w-full min-w-0 flex-col",
        className
      )}
      {...props}
    />
  )
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: TraceCollapsibleTriggerProps) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn(
        "group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground has-[[data-status=error]]:text-destructive",
        className
      )}
      {...props}
    >
      {children}
      <TraceIcon className="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
        <IconChevronRight className="size-4" />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: TraceCollapsibleContentProps) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      className="min-w-0 overflow-hidden [--radix-accordion-content-height:var(--radix-collapsible-content-height)] motion-safe:data-open:animate-accordion-down motion-safe:data-closed:animate-accordion-up"
      {...props}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        className={cn(
          "min-w-0 border-l ml-2.5 pl-5 py-2 text-sm wrap-break-word text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
}
