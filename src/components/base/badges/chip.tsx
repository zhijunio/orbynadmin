import type { ComponentProps, ReactNode } from "react";
import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

export type ChipProps = Omit<ComponentProps<"span">, "children"> & {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  variant?: "default" | "subtle" | "outline";
};

export function Chip({ children, onRemove, removeLabel = "Remove", variant = "subtle", className, ...props }: ChipProps) {
  return <span className={cn("inline-flex h-6 max-w-full items-center gap-1 rounded-full px-2 text-xs font-medium", variant === "default" && "bg-primary text-primary-foreground", variant === "subtle" && "bg-secondary text-secondary-foreground", variant === "outline" && "border bg-background text-foreground", className)} {...props}>
    <span className="truncate">{children}</span>
    {onRemove && <button type="button" aria-label={`${removeLabel}: ${typeof children === "string" ? children : "tag"}`} onClick={onRemove} className="-mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full opacity-70 hover:bg-foreground/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X aria-hidden="true" className="size-3" /></button>}
  </span>;
}
