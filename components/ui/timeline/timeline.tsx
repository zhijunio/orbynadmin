"use client"

import * as React from "react"
import { IconCheck } from "@tabler/icons-react"
import { cn } from "@/utils/cn"

type TimelineOrientation = "vertical" | "horizontal"
type TimelineContextValue = { activeStep: number; orientation: TimelineOrientation }
const TimelineContext = React.createContext<TimelineContextValue>({ activeStep: 0, orientation: "vertical" })

export function Timeline({
  children,
  className,
  orientation = "vertical",
  value = 1,
  ...props
}: React.ComponentProps<"ol"> & { orientation?: TimelineOrientation; value?: number }) {
  return <TimelineContext.Provider value={{ activeStep: value, orientation }}><ol data-orientation={orientation} className={cn("flex", orientation === "horizontal" ? "w-full flex-row" : "flex-col", className)} {...props}>{children}</ol></TimelineContext.Provider>
}

export function TimelineItem({ step, children, className, ...props }: React.ComponentProps<"li"> & { step: number }) {
  const { activeStep, orientation } = React.useContext(TimelineContext)
  const horizontal = orientation === "horizontal"
  const complete = step <= activeStep
  const current = step === activeStep
  return <li data-step={step} data-completed={complete || undefined} data-current={current || undefined} className={cn("group/timeline-item relative flex min-w-0 flex-col gap-1", horizontal ? "mt-8 flex-1 px-2" : "ms-8 pb-6 last:pb-0", className)} {...props}>{children}</li>
}

export function TimelineHeader({ children, className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("relative flex min-w-0 flex-col gap-0.5", className)} {...props}>{children}</div>
}

export function TimelineTitle({ children, className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-sm font-medium text-foreground", className)} {...props}>{children}</h3>
}

export function TimelineDate({ children, className, ...props }: React.ComponentProps<"time">) {
  return <time className={cn("mb-1 block text-xs text-muted-foreground", className)} {...props}>{children}</time>
}

export function TimelineIndicator({ children, className, ...props }: React.ComponentProps<"span">) {
  const { orientation } = React.useContext(TimelineContext)
  return <span aria-hidden="true" className={cn("absolute z-10 grid size-4 place-items-center rounded-full border-2 border-primary/30 bg-card text-primary [&>svg]:size-2.5 [&>svg]:shrink-0", orientation === "horizontal" ? "-top-8 left-0" : "-left-8 top-0", "group-data-[completed]/timeline-item:border-primary group-data-[completed]/timeline-item:bg-primary group-data-[completed]/timeline-item:text-primary-foreground group-data-[current]/timeline-item:border-primary", className)} {...props}>{children ?? <IconCheck className="size-2.5 opacity-0 group-data-[completed]/timeline-item:opacity-100" />}</span>
}

export function TimelineSeparator({ className, ...props }: React.ComponentProps<"span">) {
  const { orientation } = React.useContext(TimelineContext)
  return <span aria-hidden="true" className={cn("absolute bg-primary/15 group-data-[completed]/timeline-item:bg-primary", orientation === "horizontal" ? "-top-[1.625rem] left-4 h-0.5 w-[calc(100%+1rem)] group-last/timeline-item:hidden" : "-left-[1.625rem] top-4 h-[calc(100%+0.5rem)] w-0.5 group-last/timeline-item:hidden", className)} {...props} />
}

export function TimelineContent({ children, className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</div>
}
