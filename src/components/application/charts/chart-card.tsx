import type { ReactNode } from "react";

import { Card } from "@/components/base/card/card";
import { cn } from "@/utils/cn";

export function ChartCard({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <Card role="group" aria-label={title} className={cn("gap-0 rounded-2xl border-0 bg-muted/45 p-4 ring-0", className)}>
      {children}
    </Card>
  );
}
