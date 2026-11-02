import type { ReactNode } from "react";
import { Card } from "@/components/base/card/card";

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border border-border bg-card py-0 ring-0">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-base font-medium">{title}</h2>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </Card>
  );
}
