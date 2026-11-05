import * as React from "react"
import { cn } from "@/utils/cn"

export type MessageGroupProps = React.ComponentProps<"div">
export type MessageProps = React.ComponentProps<"div"> & { align?: "start" | "end" }
export type MessageAvatarProps = React.ComponentProps<"div">
export type MessageContentProps = React.ComponentProps<"div">
export type MessageHeaderProps = React.ComponentProps<"div">
export type MessageFooterProps = React.ComponentProps<"div">

export function MessageGroup({ className, ...props }: MessageGroupProps) {
  return <div data-slot="message-group" className={cn("flex min-w-0 flex-col", className)} {...props} />
}

export function Message({ className, align = "start", ...props }: MessageProps) {
  return <div data-slot="message" data-align={align} className={cn("group/message relative flex w-full min-w-0", align === "end" && "flex-row-reverse", className)} {...props} />
}

export function MessageAvatar({ className, ...props }: MessageAvatarProps) {
  return <div data-slot="message-avatar" className={cn("flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted", className)} {...props} />
}

export function MessageContent({ className, ...props }: MessageContentProps) {
  return <div data-slot="message-content" className={cn("flex w-full min-w-0 flex-col wrap-break-word", className)} {...props} />
}

export function MessageHeader({ className, ...props }: MessageHeaderProps) {
  return <div data-slot="message-header" className={cn("flex max-w-full min-w-0 items-center", className)} {...props} />
}

export function MessageFooter({ className, ...props }: MessageFooterProps) {
  return <div data-slot="message-footer" className={cn("flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end", className)} {...props} />
}
