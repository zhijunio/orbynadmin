"use client";

import { useState, type ComponentProps } from "react";
import { IconStar } from "@tabler/icons-react";

import { cn } from "@/utils/cn";

export type RatingSize = "sm" | "default" | "lg";

export type RatingProps = Omit<ComponentProps<"div">, "onChange"> & {
  rating: number;
  maxRating?: number;
  size?: RatingSize;
  showValue?: boolean;
  editable?: boolean;
  disabled?: boolean;
  step?: 0.5 | 1;
  onRatingChange?: (rating: number) => void;
  starClassName?: string;
};

const sizeClasses: Record<RatingSize, { gap: string; star: string; value: string }> = {
  sm: { gap: "gap-1", star: "size-4", value: "text-xs" },
  default: { gap: "gap-1.5", star: "size-5", value: "text-sm" },
  lg: { gap: "gap-2", star: "size-6", value: "text-base" },
};

function Rating({
  rating,
  maxRating = 5,
  size = "default",
  showValue = false,
  editable = false,
  disabled = false,
  step = 1,
  onRatingChange,
  className,
  starClassName,
  "aria-label": ariaLabel,
  ...props
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const maximum = Number.isFinite(maxRating) ? Math.max(1, Math.floor(maxRating)) : 5;
  const value = Number.isFinite(rating) ? Math.min(maximum, Math.max(0, rating)) : 0;
  const interactive = editable && onRatingChange !== undefined && !disabled;
  const displayRating = interactive && hoveredRating !== null ? hoveredRating : value;
  const classes = sizeClasses[size];
  const accessibleLabel = ariaLabel ?? (interactive ? "Choose a rating" : `${value.toFixed(1)} out of ${maximum} stars`);

  function chooseRating(nextRating: number) {
    if (interactive) onRatingChange?.(Math.min(maximum, Math.max(0, nextRating)));
  }

  function getPointerRating(clientX: number, element: HTMLButtonElement, index: number) {
    if (step === 1) return index + 1;
    const { left, width } = element.getBoundingClientRect();
    const fraction = (clientX - left) / width;
    return index + (fraction < 0.5 ? 0.5 : 1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      chooseRating(Math.min(maximum, value + step));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      chooseRating(Math.max(0, value - step));
    }
  }

  return (
    <div
      {...props}
      data-slot="rating"
      role={interactive ? "group" : "img"}
      aria-label={accessibleLabel}
      className={cn("inline-flex min-w-0 items-center", classes.gap, className)}
      onPointerLeave={() => setHoveredRating(null)}
    >
      <div className={cn("inline-flex items-center", classes.gap)}>
        {Array.from({ length: maximum }, (_, index) => {
          const fill = Math.min(100, Math.max(0, (displayRating - index) * 100));
          const star = (
            <span className={cn("relative inline-flex shrink-0", classes.star)}>
              <IconStar aria-hidden="true" className={cn("size-full fill-muted/50 text-muted-foreground/40", starClassName)} />
              {fill > 0 && (
                <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${fill}%` }}>
                  <IconStar aria-hidden="true" className={cn("size-full max-w-none fill-primary text-primary", starClassName)} />
                </span>
              )}
            </span>
          );

          if (!interactive) return <span key={index}>{star}</span>;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Set rating to ${index + 1} out of ${maximum}`}
              aria-pressed={displayRating === index + 1}
              className={cn("inline-flex shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", classes.star)}
              onPointerMove={(event) => setHoveredRating(getPointerRating(event.clientX, event.currentTarget, index))}
              onClick={(event) => chooseRating(event.detail === 0 ? index + 1 : getPointerRating(event.clientX, event.currentTarget, index))}
              onKeyDown={handleKeyDown}
            >
              {star}
            </button>
          );
        })}
      </div>
      {showValue && <span data-slot="rating-value" className={cn("w-8 tabular-nums text-muted-foreground", classes.value)}>{displayRating.toFixed(1)}</span>}
    </div>
  );
}

export { Rating };
