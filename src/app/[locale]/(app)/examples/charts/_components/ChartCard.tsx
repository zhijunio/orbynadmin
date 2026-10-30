import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="gap-0 border border-border py-0 ring-0">
      <div className="border-b px-6 py-4">
        <h2 className="text-base font-medium">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </Card>
  );
}
