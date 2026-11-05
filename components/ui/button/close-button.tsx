import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

export type CloseButtonProps = Omit<React.ComponentProps<"button">, "children" | "aria-label"> & {
  "aria-label": string;
  size?: "xs" | "sm" | "default";
};

export function CloseButton({ className, size = "sm", ...props }: CloseButtonProps) {
  return <button {...props} type="button" className={cn("inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", size === "xs" && "size-5 [&_svg]:size-3", size === "sm" && "size-6 [&_svg]:size-3.5", size === "default" && "size-8 [&_svg]:size-4", className)}><X aria-hidden="true" /></button>;
}
