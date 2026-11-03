import { IconLoader2 as LoaderCircle } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

export type SpinnerProps = {
  size?: "sm" | "default" | "lg";
  label?: string;
  className?: string;
};

export function Spinner({ size = "default", label = "Loading", className }: SpinnerProps) {
  return <span role="status" aria-label={label} className="inline-flex items-center gap-2"><LoaderCircle aria-hidden="true" className={cn("animate-spin text-current", size === "sm" && "size-4", size === "default" && "size-5", size === "lg" && "size-7", className)} /><span className="sr-only">{label}</span></span>;
}
