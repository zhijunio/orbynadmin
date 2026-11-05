"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/utils/cn"

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>

function Progress({
  className,
  value,
  max = 100,
  ...props
}: ProgressProps) {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100
  const currentValue = typeof value === "number" && Number.isFinite(value)
    ? Math.min(maximum, Math.max(0, value))
    : null
  const percentage = currentValue === null ? 0 : currentValue / maximum * 100

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={currentValue}
      max={maximum}
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary motion-safe:transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
