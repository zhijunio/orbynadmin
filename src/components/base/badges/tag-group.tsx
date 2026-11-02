"use client";

import { Chip } from "@/components/base/badges/chip";
import { IconX as X } from "@tabler/icons-react";

export type TagGroupProps = {
  values: string[];
  onValuesChange?: (values: string[]) => void;
  removeLabel?: string;
  "aria-label": string;
};

export function TagGroup({ values, onValuesChange, removeLabel = "Remove", "aria-label": ariaLabel }: TagGroupProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap items-center gap-2">
      {values.map((value) => (
        <span key={value} className="inline-flex items-center gap-1">
          <Chip variant="caption" color="gray">{value}</Chip>
          {onValuesChange && (
            <button
              type="button"
              aria-label={`${removeLabel}: ${value}`}
              onClick={() => onValuesChange(values.filter((item) => item !== value))}
              className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
