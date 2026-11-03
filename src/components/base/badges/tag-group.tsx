"use client";

import { useId, type ReactNode } from "react";

import { Chip, type ChipColor } from "@/components/base/badges/chip";
import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

type TagGroupSharedProps = {
  values: string[];
  onValuesChange?: (values: string[]) => void;
  removeLabel?: string;
  color?: ChipColor;
  size?: "sm" | "md";
  icon?: ReactNode;
  "aria-label": string;
};

export type TagGroupProps = TagGroupSharedProps & (
  | { selectionMode?: undefined; options?: never }
  | {
      selectionMode: "single" | "multiple";
      options: string[];
      onValuesChange: (values: string[]) => void;
    }
);

const sizeClasses = {
  sm: "h-6 px-2 py-0",
  md: "h-7 px-2.5 py-0",
} as const;

export function TagGroup(props: TagGroupProps) {
  const groupId = useId();
  const color = props.color ?? "gray";
  const size = props.size ?? "md";
  const icon = props.icon;

  if (props.selectionMode) {
    const { values, options, selectionMode, onValuesChange } = props;
    return (
      <div
        role={selectionMode === "single" ? "radiogroup" : "group"}
        aria-label={props["aria-label"]}
        className="flex flex-wrap items-center gap-2"
      >
        {options.map((option, index) => {
          const selected = values.includes(option);
          const id = `${groupId}-${index}`;
          return (
            <label key={option} htmlFor={id} className="cursor-pointer">
              <input
                id={id}
                className="peer sr-only"
                type={selectionMode === "single" ? "radio" : "checkbox"}
                name={groupId}
                value={option}
                checked={selected}
                onChange={() => {
                  if (selectionMode === "single") {
                    onValuesChange([option]);
                  } else {
                    onValuesChange(selected
                      ? values.filter((value) => value !== option)
                      : [...values, option]);
                  }
                }}
              />
              <Chip
                color={selected ? color : "gray"}
                variant="caption"
                className={cn(sizeClasses[size], "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2")}
              >
                <span className="inline-flex items-center gap-1.5">
                  {icon}
                  {option}
                </span>
              </Chip>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div role="group" aria-label={props["aria-label"]} className="flex flex-wrap items-center gap-2">
      {props.values.map((value) => (
        <span key={value} className="inline-flex items-center gap-1">
          <Chip variant="caption" color={color} className={sizeClasses[size]}>
            <span className="inline-flex items-center gap-1.5">{icon}{value}</span>
          </Chip>
          {props.onValuesChange && (
            <button
              type="button"
              aria-label={`${props.removeLabel ?? "Remove"}: ${value}`}
              onClick={() => props.onValuesChange?.(props.values.filter((item) => item !== value))}
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
