import type { ComponentProps } from "react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function ListCard({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}
      {...props}
    />
  );
}

export function ListCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <header className={cn("flex h-[62px] items-center justify-between gap-3 border-b border-border px-3.5", className)}>
      {children}
    </header>
  );
}

export function ListCardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <footer className={cn("border-t border-border p-3.5", className)}>
      {children}
    </footer>
  );
}
