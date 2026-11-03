import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

type CloseButtonProps = Omit<React.ComponentProps<"button">, "children" | "aria-label"> & {
  "aria-label": string;
  size?: "xs" | "sm" | "md";
};

export function CloseButton({ className, size = "sm", ...props }: CloseButtonProps) {
  return <button type="button" className={cn("inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", size === "xs" && "size-5 [&_svg]:size-3", size === "sm" && "size-6 [&_svg]:size-3.5", size === "md" && "size-8 [&_svg]:size-4", className)} {...props}><X aria-hidden="true" /></button>;
}
