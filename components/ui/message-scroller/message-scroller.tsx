"use client"

import * as React from "react"
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react"
import { Button } from "@/components/ui/button/button"
import { cn } from "@/utils/cn"

type ScrollBehavior = "auto" | "smooth"
export type MessageScrollerProps = React.ComponentProps<"div">
export type MessageScrollerViewportProps = React.ComponentProps<"div">
export type MessageScrollerContentProps = React.ComponentProps<"div">
export type MessageScrollerItemProps = React.ComponentProps<"div"> & {
  scrollAnchor?: boolean
  messageId?: string
}
export type MessageScrollerButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  direction?: "start" | "end"
  children?: React.ReactNode
}
type MessageScrollerContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>
  atStart: boolean
  atEnd: boolean
  isScrollable: boolean
  updatePosition: () => void
  scrollToStart: (behavior?: ScrollBehavior) => void
  scrollToEnd: (behavior?: ScrollBehavior) => void
  scrollToMessage: (id: string, behavior?: ScrollBehavior, peek?: number) => void
}

const MessageScrollerContext = React.createContext<MessageScrollerContextValue | null>(null)

function useMessageScrollerContext() {
  const context = React.useContext(MessageScrollerContext)
  if (!context) throw new Error("MessageScroller components must be used inside MessageScroller")
  return context
}

export function MessageScroller({ className, children, ...props }: MessageScrollerProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = React.useState(true)
  const [atEnd, setAtEnd] = React.useState(true)
  const [isScrollable, setIsScrollable] = React.useState(false)
  const shouldStickToEnd = React.useRef(true)
  const previousFirstMessage = React.useRef<string | undefined>(undefined)
  const visibleAnchor = React.useRef<{ id: string; offset: number } | null>(null)

  const updatePosition = React.useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const nextAtStart = viewport.scrollTop <= 2
    const nextAtEnd = viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop <= 8
    setIsScrollable(viewport.scrollHeight > viewport.clientHeight + 1)
    shouldStickToEnd.current = nextAtEnd
    setAtStart(nextAtStart)
    setAtEnd(nextAtEnd)
    const viewportTop = viewport.getBoundingClientRect().top
    const firstVisible = [...viewport.querySelectorAll<HTMLElement>("[data-message-id]")].find((node) => node.getBoundingClientRect().bottom > viewportTop + 1)
    if (firstVisible?.dataset.messageId) visibleAnchor.current = { id: firstVisible.dataset.messageId, offset: firstVisible.getBoundingClientRect().top - viewportTop }
  }, [])

  const scrollToStart = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    viewportRef.current?.scrollTo({ top: 0, behavior })
  }, [])
  const scrollToEnd = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current
    if (viewport) viewport.scrollTo({ top: viewport.scrollHeight, behavior })
  }, [])
  const scrollToMessage = React.useCallback((id: string, behavior: ScrollBehavior = "smooth", peek = 64) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const target = [...viewport.querySelectorAll<HTMLElement>("[data-message-id]")].find((node) => node.dataset.messageId === id)
    if (target) {
      const top = target.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop
      viewport.scrollTo({ top: Math.max(0, top - peek), behavior })
    }
  }, [])

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const firstMessage = viewport.querySelector<HTMLElement>("[data-message-id]")?.dataset.messageId
    const prepended = previousFirstMessage.current !== undefined && firstMessage !== previousFirstMessage.current
    if (prepended) {
      const anchor = visibleAnchor.current
      const target = anchor && [...viewport.querySelectorAll<HTMLElement>("[data-message-id]")].find((node) => node.dataset.messageId === anchor.id)
      if (anchor && target) {
        const offset = target.getBoundingClientRect().top - viewport.getBoundingClientRect().top
        viewport.scrollTop += offset - anchor.offset
      }
    } else if (!shouldStickToEnd.current) {
      // Keep the reader's scroll position while new content is appended.
    } else {
      viewport.scrollTop = viewport.scrollHeight
    }
    previousFirstMessage.current = firstMessage
    updatePosition()
  }, [children, updatePosition])

  const value = React.useMemo(() => ({ viewportRef, atStart, atEnd, isScrollable, updatePosition, scrollToStart, scrollToEnd, scrollToMessage }), [atStart, atEnd, isScrollable, updatePosition, scrollToStart, scrollToEnd, scrollToMessage])
  return <MessageScrollerContext.Provider value={value}><div data-slot="message-scroller" className={cn("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className)} {...props}>{children}</div></MessageScrollerContext.Provider>
}

export function MessageScrollerViewport({ className, onScroll, ...props }: MessageScrollerViewportProps) {
  const { viewportRef, updatePosition } = useMessageScrollerContext()
  React.useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(updatePosition)
    observer.observe(viewport)
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild)
    return () => observer.disconnect()
  }, [viewportRef, updatePosition])
  return <div
    ref={viewportRef}
    data-slot="message-scroller-viewport"
    role={props.role ?? "log"}
    aria-live={props["aria-live"] ?? "polite"}
    className={cn("size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain", className)}
    onScroll={(event) => { onScroll?.(event); updatePosition(); }}
    {...props}
  />
}

export function MessageScrollerContent({ className, children, ...props }: MessageScrollerContentProps) {
  return <div data-slot="message-scroller-content" className={cn("flex h-max min-h-full flex-col", className)} {...props}>{children}</div>
}

export function MessageScrollerItem({ className, scrollAnchor = false, messageId, ...props }: MessageScrollerItemProps) {
  return <div data-slot="message-scroller-item" data-message-id={messageId} data-scroll-anchor={scrollAnchor || undefined} className={cn("min-w-0 shrink-0", scrollAnchor && "scroll-mt-16", className)} {...props} />
}

export function MessageScrollerButton({ direction = "end", className, variant = "outline", size = "icon-sm", children, onClick, disabled, ...props }: MessageScrollerButtonProps) {
  const context = useMessageScrollerContext()
  const visible = direction === "end" ? !context.atEnd : !context.atStart
  return <Button
    {...props}
    type="button"
    data-slot="message-scroller-button"
    aria-label={direction === "end" ? "Scroll to latest messages" : "Scroll to earlier messages"}
    aria-hidden={!visible || undefined}
    variant={variant}
    size={size}
    disabled={disabled || !visible}
    className={cn("absolute right-3 z-10 rounded-full border border-border bg-background shadow-sm transition-opacity", direction === "end" ? "bottom-3" : "top-3", !visible && "pointer-events-none opacity-0", className)}
    onClick={(event) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      if (direction === "end") context.scrollToEnd()
      else context.scrollToStart()
    }}
  >{children ?? (direction === "end" ? <IconArrowDown /> : <IconArrowUp />)}</Button>
}

export function useMessageScroller() {
  const { atEnd, atStart, scrollToEnd, scrollToStart, scrollToMessage } = useMessageScrollerContext()
  return { atEnd, atStart, scrollToEnd, scrollToStart, scrollToMessage }
}

export function useMessageScrollerScrollable() {
  return useMessageScrollerContext().isScrollable
}

export function useMessageScrollerVisibility() {
  const { atStart, atEnd } = useMessageScrollerContext()
  return { atStart, atEnd }
}
