"use client";

import { useId, type ReactNode } from "react";

import { Tag, type TagColor } from "@/components/ui/badge/tag";
import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

type TagGroupSharedProps = {
  values: string[];
  onValuesChange?: (values: string[]) => void;
  removeLabel?: string;
  color?: TagColor;
  size?: "sm" | "default";
  icon?: ReactNode;
  disabled?: boolean;
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
  default: "h-7 px-2.5 py-0",
} as const;

export function TagGroup(props: TagGroupProps) {
  const groupId = useId();
  const color = props.color ?? "gray";
  const size = props.size ?? "default";
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
              disabled={props.disabled}
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
              <Tag
                color={selected ? color : "gray"}
                variant="caption"
                className={cn(sizeClasses[size], "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2")}
              >
                <span className="inline-flex items-center gap-1.5">
                  {icon}
                  {option}
                </span>
              </Tag>
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
          <Tag variant="caption" color={color} className={sizeClasses[size]}>
            <span className="inline-flex items-center gap-1.5">{icon}{value}</span>
          </Tag>
          {props.onValuesChange && (
            <button
              type="button"
              aria-label={`${props.removeLabel ?? "Remove"}: ${value}`}
              disabled={props.disabled}
              onClick={() => props.onValuesChange?.(props.values.filter((item) => item !== value))}
              className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
