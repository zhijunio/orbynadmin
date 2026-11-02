"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { IconShieldStar } from "@tabler/icons-react";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cn } from "@/utils/cn";

export type AnnouncementProps = Omit<HTMLMotionProps<"aside">, "children" | "title"> & {
  title: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  closeLabel?: string;
};

export function Announcement({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  dismissible = false,
  onDismiss,
  closeLabel = "Dismiss announcement",
  className,
  ...props
}: AnnouncementProps) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence initial={false} onExitComplete={onDismiss}>
      {visible && (
        <motion.aside
          {...props}
          aria-label={props["aria-label"] ?? "Announcement"}
          initial={false}
          exit={{
            opacity: 0,
            scale: 0.85,
            filter: "blur(6px)",
            transition: { duration: 0.25, ease: "easeInOut" },
          }}
          className="overflow-hidden"
        >
          <div className={cn("relative flex w-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-3", className)}>
            <div className="flex w-full flex-col items-start gap-1">
              {icon === undefined ? (
                <IconShieldStar aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
              ) : (
                icon
              )}
              <div className="flex w-full flex-col items-start gap-0.5">
                <p className="w-full text-sm font-medium leading-5 text-foreground">{title}</p>
                {description && <p className="w-full text-[13px] leading-[18px] text-muted-foreground">{description}</p>}
              </div>
            </div>
            {dismissible && (
              <CloseButton
                size="xs"
                aria-label={closeLabel}
                onClick={() => setVisible(false)}
                className="absolute end-3 top-3"
              />
            )}
            {actionLabel && (
              <Button type="button" variant="secondary" size="sm" onClick={onAction} className="w-full">
                {actionLabel}
              </Button>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
