"use client";

import { useEffect, type ComponentType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IconAlertTriangle, IconCircleCheck, IconInfoCircle, IconX } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { cn } from "@/utils/cn";

type NotificationStatus = "information" | "success" | "warning" | "error";
type NotificationAction = {
  label: string;
  variant: "primary" | "secondary" | "danger";
  onClick: () => void;
};
type NotificationAvatar = { src: string; alt: string; presence?: "online" | "busy" | "offline" };

const statusStyles: Record<NotificationStatus, { icon: typeof IconInfoCircle; color: string }> = {
  information: { icon: IconInfoCircle, color: "text-primary" },
  success: { icon: IconCircleCheck, color: "text-emerald-600 dark:text-emerald-400" },
  warning: { icon: IconAlertTriangle, color: "text-amber-600 dark:text-amber-400" },
  error: { icon: IconAlertTriangle, color: "text-destructive" },
};

const actionVariants = {
  primary: "default",
  secondary: "outline",
  danger: "destructive",
} as const;

function initials(value: string) {
  return value.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function Notification({
  status = "information",
  icon: CustomIcon,
  avatar,
  title,
  description,
  timestamp,
  actions = [],
  onDismiss,
  autoDismissDuration,
  introDelay = 0,
  className,
}: {
  status?: NotificationStatus;
  icon?: ComponentType<{ className?: string }>;
  avatar?: NotificationAvatar;
  title: string;
  description?: string;
  timestamp?: string;
  actions?: NotificationAction[];
  onDismiss?: () => void;
  autoDismissDuration?: number;
  introDelay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const config = statusStyles[status];
  const StatusIcon = CustomIcon ?? config.icon;

  useEffect(() => {
    if (autoDismissDuration === undefined || !onDismiss) return;
    const timer = window.setTimeout(onDismiss, autoDismissDuration + introDelay);
    return () => window.clearTimeout(timer);
  }, [autoDismissDuration, introDelay, onDismiss]);

  return (
    <motion.div
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.22, delay: prefersReducedMotion ? 0 : introDelay / 1000, ease: "easeOut" }}
      className={cn("relative w-full overflow-hidden rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg", className)}
    >
      <div className="flex items-start gap-3">
        {avatar ? (
          <div className="relative shrink-0">
            <Avatar className="size-9">
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{initials(avatar.alt)}</AvatarFallback>
            </Avatar>
            {avatar.presence && <span aria-label={avatar.presence} className={cn("absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-popover", avatar.presence === "online" ? "bg-emerald-500" : avatar.presence === "busy" ? "bg-amber-500" : "bg-muted-foreground")} />}
          </div>
        ) : (
          <StatusIcon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", config.color)} />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-5 font-semibold">{title}</p>
            {timestamp && <time className="shrink-0 text-xs text-muted-foreground">{timestamp}</time>}
          </div>
          {description && <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>}
          {actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map((action) => (
                <Button key={action.label} size="sm" variant={actionVariants[action.variant]} onClick={action.onClick}>{action.label}</Button>
              ))}
            </div>
          )}
        </div>
        {onDismiss && (
          <Button variant="ghost" size="icon-xs" className="-mr-1 -mt-1 text-muted-foreground" aria-label="Dismiss notification" onClick={onDismiss}>
            <IconX className="size-4" />
          </Button>
        )}
      </div>
      {autoDismissDuration !== undefined && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-primary/60"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : autoDismissDuration / 1000, delay: prefersReducedMotion ? 0 : introDelay / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

function NotificationViewport({ children, position = "bottom-right" }: { children: ReactNode; position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" }) {
  const positions = {
    "top-left": "left-4 top-4 items-start",
    "top-center": "left-1/2 top-4 -translate-x-1/2 items-center",
    "top-right": "right-4 top-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end",
  };
  return <div className={cn("pointer-events-none fixed z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 [&>*]:pointer-events-auto", positions[position])}>{children}</div>;
}

export { Notification, NotificationViewport };
export type { NotificationAction, NotificationAvatar, NotificationStatus };
