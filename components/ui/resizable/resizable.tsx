"use client"

import * as React from "react"
import { cn } from "@/utils/cn"

type ResizableProps = {
  first: React.ReactNode
  second: React.ReactNode
  orientation?: "horizontal" | "vertical"
  initialSize?: number
  minSize?: number
  maxSize?: number
  onSizeChange?: (size: number) => void
  className?: string
  handleClassName?: string
}

/** A dependency-free, keyboard accessible two-panel splitter. */
export function Resizable({
  first,
  second,
  orientation = "horizontal",
  initialSize = 50,
  minSize = 15,
  maxSize = 85,
  onSizeChange,
  className,
  handleClassName,
}: ResizableProps) {
  const [size, setSize] = React.useState(initialSize)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const vertical = orientation === "vertical"

  const updateSize = React.useCallback((next: number) => {
    const value = Math.max(minSize, Math.min(maxSize, next))
    setSize(value)
    onSizeChange?.(value)
  }, [minSize, maxSize, onSizeChange])

  const resizeFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    const coordinate = vertical ? event.clientY : event.clientX
    const origin = vertical ? rect.top : rect.left
    const extent = vertical ? rect.height : rect.width
    const move = (pointer: PointerEvent) => {
      const point = vertical ? pointer.clientY : pointer.clientX
      updateSize(((point - origin) / extent) * 100)
    }
    const stop = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", stop)
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    move({ clientX: event.clientX, clientY: event.clientY } as PointerEvent)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", stop, { once: true })
    void coordinate
  }

  return (
    <div
      ref={rootRef}
      data-orientation={orientation}
      className={cn("flex min-h-48 min-w-0 overflow-hidden rounded-lg border border-border", vertical ? "flex-col" : "flex-row", className)}
    >
      <div className="min-h-0 min-w-0 overflow-auto" style={{ flexBasis: `${size}%`, flexGrow: 0, flexShrink: 0 }}>{first}</div>
      <div
        role="separator"
        aria-label="Resize panels"
        aria-orientation={vertical ? "horizontal" : "vertical"}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        aria-valuenow={Math.round(size)}
        tabIndex={0}
        onPointerDown={resizeFromPointer}
        onKeyDown={(event) => {
          const negative = vertical ? "ArrowUp" : "ArrowLeft"
          const positive = vertical ? "ArrowDown" : "ArrowRight"
          if (event.key === negative) { event.preventDefault(); updateSize(size - 3) }
          if (event.key === positive) { event.preventDefault(); updateSize(size + 3) }
          if (event.key === "Home") { event.preventDefault(); updateSize(minSize) }
          if (event.key === "End") { event.preventDefault(); updateSize(maxSize) }
        }}
        className={cn("group relative z-10 flex shrink-0 touch-none items-center justify-center bg-border outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", vertical ? "h-px w-full cursor-row-resize" : "w-px cursor-col-resize", handleClassName)}
      >
        <span className={cn("rounded-full bg-muted-foreground/50 transition-all duration-300 group-hover:bg-primary group-focus-visible:bg-primary motion-reduce:transition-none", vertical ? "h-1 w-10" : "h-10 w-1")} />
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{second}</div>
    </div>
  )
}

