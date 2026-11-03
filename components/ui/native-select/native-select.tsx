"use client"

import * as React from "react"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "@/utils/cn"

function NativeSelect({ className, size = "default", ...props }: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return <span className="relative inline-flex w-fit max-w-full items-center">
    <select data-slot="native-select" data-size={size} className={cn("h-9 w-full min-w-40 appearance-none rounded-lg border border-input bg-background py-2 pr-9 pl-3 text-sm text-foreground shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-7 data-[size=sm]:min-w-32 data-[size=sm]:py-1", className)} {...props} />
    <IconChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
  </span>
}

function NativeSelectOption(props: React.ComponentProps<"option">) { return <option {...props} /> }
function NativeSelectOptGroup(props: React.ComponentProps<"optgroup">) { return <optgroup {...props} /> }

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup }
