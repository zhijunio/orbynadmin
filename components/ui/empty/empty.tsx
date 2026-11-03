import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Empty({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="empty" className={cn("flex w-full min-w-0 flex-col items-center justify-center text-center text-balance", className)} {...props} />
}
function EmptyHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-1.5", className)} {...props} />
}
function EmptyMedia({ className, variant = "default", ...props }: ComponentProps<"div"> & { variant?: "default" | "icon" }) {
  return <div data-slot="empty-media" data-variant={variant} className={cn("flex shrink-0 items-center justify-center", variant === "icon" && "mb-1 size-11 rounded-xl bg-muted text-muted-foreground [&_svg]:size-5", className)} {...props} />
}
function EmptyTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 data-slot="empty-title" className={cn("text-base font-semibold tracking-tight", className)} {...props} />
}
function EmptyDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="empty-description" className={cn("text-sm leading-relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className)} {...props} />
}
function EmptyContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("mt-3 flex w-full max-w-sm min-w-0 flex-col items-center gap-2", className)} {...props} />
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
