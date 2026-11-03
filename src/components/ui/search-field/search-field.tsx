"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconLoader2, IconSearch } from "@tabler/icons-react";

import { CloseButton } from "@/components/ui/buttons/close-button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { cn } from "@/utils/cn";

type NativeInputProps = Omit<
  ComponentProps<"input">,
  "type" | "size" | "value" | "defaultValue" | "onChange" | "onSubmit"
>;

export type SearchFieldProps = NativeInputProps & {
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  clearLabel?: string;
  loadingLabel?: string;
  shape?: "pill" | "rounded";
  size?: "default" | "small";
  isLoading?: boolean;
  inputClassName?: string;
};

export function SearchField({
  id,
  label,
  value,
  defaultValue = "",
  onChange,
  onValueChange,
  onClear,
  onSubmit,
  clearLabel = "Clear search",
  loadingLabel = "Loading",
  shape = "pill",
  size = "default",
  isLoading = false,
  inputClassName,
  disabled,
  className,
  onKeyDown,
  ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  function update(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
    onValueChange?.(nextValue);
  }

  function clear() {
    update("");
    onClear?.();
  }

  return (
    <div className={cn("grid w-full gap-1", className)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="relative w-full">
        {isLoading ? (
          <span
            role="status"
            aria-label={loadingLabel}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <IconLoader2 aria-hidden="true" className={cn("animate-spin", size === "small" ? "size-4" : "size-5")} />
          </span>
        ) : (
          <IconSearch
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              size === "small" ? "size-4" : "size-5",
            )}
          />
        )}
        <Input
          {...props}
          id={inputId}
          type="search"
          value={currentValue}
          disabled={disabled}
          aria-label={props["aria-label"] ?? (label ? undefined : props.placeholder)}
          aria-busy={isLoading || undefined}
          onChange={(event) => update(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && currentValue) {
              event.preventDefault();
              clear();
            }
            if (event.key === "Enter" && onSubmit) {
              event.preventDefault();
              onSubmit(currentValue);
            }
            onKeyDown?.(event);
          }}
          className={cn(
            "border-transparent bg-muted/50 shadow-none focus-visible:bg-muted/30 [&::-webkit-search-cancel-button]:hidden",
            size === "small" ? "h-8 ps-9 pe-9 text-xs md:text-xs" : "h-9 ps-10 pe-10 text-sm",
            shape === "pill" ? "rounded-full" : "rounded-lg",
            inputClassName,
          )}
        />
        <AnimatePresence initial={false}>
          {currentValue && (
            <motion.span
              key="clear"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.14 }}
              className="absolute end-2 top-1/2 -translate-y-1/2"
            >
              <CloseButton
                aria-label={clearLabel}
                size="xs"
                tabIndex={-1}
                disabled={disabled}
                onClick={clear}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
