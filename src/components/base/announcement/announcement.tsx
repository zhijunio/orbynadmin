"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cn } from "@/utils/cn";

export type AnnouncementProps = Omit<HTMLMotionProps<"aside">, "children" | "title"> & {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export function Announcement({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: AnnouncementProps) {
  const [visible, setVisible] = useState(true);

  function dismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.aside
          {...props}
          aria-label={props["aria-label"] ?? "Announcement"}
          initial={{ opacity: 0, height: 0, y: 6 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn("overflow-hidden", className)}
        >
          <div className="relative rounded-xl border bg-card p-4 shadow-sm">
            {dismissible && (
              <CloseButton
                aria-label={`Dismiss ${title}`}
                onClick={dismiss}
                className="absolute top-3 right-3 rounded-md"
              />
            )}
            <div className="flex items-start gap-3">
              {icon && (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icon}
                </span>
              )}
              <div className="min-w-0 flex-1 space-y-1">
                <h2 className="pr-7 text-sm font-semibold leading-5">{title}</h2>
                {description && (
                  <p className="text-xs leading-5 text-muted-foreground">{description}</p>
                )}
                {actionLabel && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onAction}
                    className="mt-2 w-full"
                  >
                    {actionLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
