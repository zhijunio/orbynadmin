import type { ReactNode } from "react";

export function CalendarFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`w-fit max-w-full ${className ?? ""}`}>{children}</div>;
}

export function SelectionStatus({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground" aria-live="polite">
      {children}
    </p>
  );
}
