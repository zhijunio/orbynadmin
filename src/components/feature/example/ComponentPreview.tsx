import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ComponentPreview({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`gap-0 rounded-xl border border-border bg-card p-0 py-0 shadow-none ring-0 ${className}`}>
      <CardHeader className="border-b border-border p-4 md:px-6">
        <CardTitle className="font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:px-6">
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </CardContent>
    </Card>
  );
}
