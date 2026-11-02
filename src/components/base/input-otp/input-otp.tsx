"use client";

import { useRef, useState, type ComponentProps, type KeyboardEvent } from "react";

import { cn } from "@/utils/cn";

const NON_DIGIT = /\D/g;

export type InputOtpProps = Omit<
  ComponentProps<"div">,
  "children" | "onChange" | "aria-invalid"
> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  isInvalid?: boolean;
  groupEvery?: number;
  inputClassName?: string;
  digitAriaLabel?: (digit: number, total: number) => string;
};

function digitsOnly(value: string, length: number) {
  return value.replace(NON_DIGIT, "").slice(0, length);
}

export function InputOtp({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  disabled = false,
  isInvalid = false,
  groupEvery,
  inputClassName,
  digitAriaLabel = (digit, total) => `Digit ${digit} of ${total}`,
  className,
  "aria-label": ariaLabel = "One-time code",
  ref,
  ...props
}: InputOtpProps) {
  const digitCount = Number.isInteger(length) && length > 0 ? length : 6;
  const [internalValue, setInternalValue] = useState(() =>
    digitsOnly(defaultValue, digitCount),
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const safeGroupEvery =
    typeof groupEvery === "number" && Number.isInteger(groupEvery) && groupEvery > 0
      ? groupEvery
      : 0;
  const controlled = value !== undefined;
  const code = digitsOnly(controlled ? value : internalValue, digitCount);

  function commit(nextValue: string) {
    const next = digitsOnly(nextValue, digitCount);
    if (next === code) return;

    if (!controlled) setInternalValue(next);
    onChange?.(next);
    if (next.length === digitCount) onComplete?.(next);
  }

  function focusBox(index: number) {
    const safeIndex = Math.max(0, Math.min(index, digitCount - 1));
    const input = inputsRef.current[safeIndex];
    input?.focus();
    input?.select();
  }

  function writeFrom(index: number, rawValue: string) {
    const incoming = digitsOnly(rawValue, digitCount);
    if (!incoming) return;

    if (incoming.length === digitCount) {
      commit(incoming);
      focusBox(digitCount - 1);
      return;
    }

    const next = code.split("");
    incoming.split("").forEach((digit, offset) => {
      if (index + offset < digitCount) next[index + offset] = digit;
    });
    commit(next.join(""));
    focusBox(Math.min(index + incoming.length, digitCount - 1));
  }

  function removeAt(index: number) {
    if (index < 0 || index >= code.length) return;
    commit(`${code.slice(0, index)}${code.slice(index + 1)}`);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusBox(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusBox(index + 1);
    } else if (event.key === "Backspace") {
      event.preventDefault();
      if (index < code.length) {
        removeAt(index);
      } else if (index > 0) {
        removeAt(index - 1);
        focusBox(index - 1);
      }
    } else if (event.key === "Delete") {
      event.preventDefault();
      removeAt(index);
    }
  }

  return (
    <div
      {...props}
      ref={ref}
      role="group"
      dir="ltr"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-1.5 sm:gap-2", className)}
    >
      {Array.from({ length: digitCount }, (_, index) => {
        const gapBefore =
          safeGroupEvery > 0 && index > 0 && index % safeGroupEvery === 0;

        return (
          <input
            key={index}
            ref={(node) => {
              inputsRef.current[index] = node;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={digitCount}
            disabled={disabled}
            aria-label={digitAriaLabel(index + 1, digitCount)}
            aria-invalid={isInvalid || undefined}
            value={code[index] ?? ""}
            onChange={(event) => {
              if (!event.target.value) {
                removeAt(index);
                return;
              }
              writeFrom(index, event.target.value);
            }}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => {
              event.preventDefault();
              writeFrom(index, event.clipboardData.getData("text"));
            }}
            onFocus={(event) => {
              if (index > code.length) {
                focusBox(code.length);
                return;
              }
              event.currentTarget.select();
            }}
            className={cn(
              "size-10 shrink-0 rounded-lg border bg-background text-center text-lg font-semibold tabular-nums shadow-sm outline-none transition-colors sm:size-12",
              "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
              isInvalid && "border-destructive focus-visible:ring-destructive/30",
              disabled && "cursor-not-allowed opacity-50",
              gapBefore && "ms-1 sm:ms-2",
              inputClassName,
            )}
          />
        );
      })}
    </div>
  );
}
