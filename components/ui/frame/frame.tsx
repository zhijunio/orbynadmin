import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type FrameProps = ComponentProps<"div"> & {
  variant?: "default" | "inverse" | "ghost";
  spacing?: "xs" | "sm" | "default" | "lg";
  stacked?: boolean;
  dense?: boolean;
};

function Frame({
  className,
  variant = "default",
  spacing = "default",
  stacked = false,
  dense = false,
  ...props
}: FrameProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-xl bg-muted/50 p-3",
        "[--frame-radius:var(--radius-xl)] [--frame-gap:--spacing(3)] [--frame-px:--spacing(3)] [--frame-py:--spacing(3)]",
        "[--frame-panel-bg:var(--color-card)] [--frame-panel-border-color:var(--color-border)] [--frame-border-color:var(--color-border)]",
        "[--frame-panel-radius:calc(var(--frame-radius)-var(--frame-px)-1px)]",
        variant === "default" && "border border-[var(--frame-border-color)] bg-clip-padding",
        variant === "inverse" && "border border-[var(--frame-border-color)] bg-background [--frame-panel-bg:color-mix(in_oklch,var(--color-muted)_40%,transparent)] bg-clip-padding",
        variant === "ghost" && "[--frame-panel-radius:calc(var(--frame-radius)-var(--frame-px))]",
        spacing === "xs" && "[--frame-panel-px:--spacing(2)] [--frame-panel-py:--spacing(2)] [--frame-panel-header-py:--spacing(0.5)] [--frame-panel-footer-py:--spacing(0.5)]",
        spacing === "sm" && "[--frame-panel-px:--spacing(3)] [--frame-panel-py:--spacing(3.5)] [--frame-panel-header-py:--spacing(1.5)] [--frame-panel-footer-py:--spacing(1.5)]",
        spacing === "default" && "[--frame-panel-px:--spacing(4)] [--frame-panel-py:--spacing(4)] [--frame-panel-header-py:--spacing(2)] [--frame-panel-footer-py:--spacing(2)]",
        spacing === "lg" && "[--frame-panel-px:--spacing(5)] [--frame-panel-py:--spacing(5)] [--frame-panel-header-py:--spacing(2.5)] [--frame-panel-footer-py:--spacing(2.5)]",
        stacked && "gap-0 [&>*:has(+[data-slot=frame-panel])]:rounded-b-none [&>*:has(+[data-slot=frame-panel])]:before:hidden [&>[data-slot=frame-panel]+[data-slot=frame-panel]]:rounded-t-none [&>[data-slot=frame-panel]+[data-slot=frame-panel]]:border-t-0",
        dense && "gap-0 border-[var(--frame-border-color)] p-0 [--frame-panel-radius:var(--frame-radius)] [&_[data-slot=frame-panel]]:-mx-px [&_[data-slot=frame-panel]]:before:hidden [&_[data-slot=frame-panel]:last-child]:-mb-px",
        className,
      )}
      data-slot="frame"
      data-spacing={spacing}
      {...props}
    />
  );
}

export type FramePanelProps = ComponentProps<"div"> & { fit?: boolean }
export type FrameHeaderProps = ComponentProps<"header">
export type FrameTitleProps = ComponentProps<"div">
export type FrameDescriptionProps = ComponentProps<"div">
export type FrameFooterProps = ComponentProps<"footer">

function FramePanel({
  className,
  fit = false,
  ...props
}: FramePanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-(--frame-panel-radius) border border-(--frame-panel-border-color) bg-(--frame-panel-bg) bg-clip-padding shadow-xs",
        !fit && "grow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--frame-panel-radius)-1px)] dark:bg-clip-border",
        "px-(--frame-panel-px) py-(--frame-panel-py)",
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

function FrameHeader({ className, ...props }: FrameHeaderProps) {
  return (
    <header
      className={cn("flex flex-col gap-0 px-(--frame-panel-px) py-(--frame-panel-header-py)", className)}
      data-slot="frame-panel-header"
      {...props}
    />
  );
}

function FrameTitle({ className, ...props }: FrameTitleProps) {
  return <div className={cn("text-sm font-semibold", className)} data-slot="frame-panel-title" {...props} />;
}

function FrameDescription({ className, ...props }: FrameDescriptionProps) {
  return <div className={cn("text-sm text-muted-foreground", className)} data-slot="frame-panel-description" {...props} />;
}

function FrameFooter({ className, ...props }: FrameFooterProps) {
  return (
    <footer
      className={cn("flex flex-col gap-4 px-(--frame-panel-px) py-(--frame-panel-footer-py)", className)}
      data-slot="frame-panel-footer"
      {...props}
    />
  );
}

export { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle };
