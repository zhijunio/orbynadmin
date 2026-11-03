import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { cn } from "@/utils/cn";

export function ComponentPreview({
  title,
  children,
  className = "",
  previewClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
}) {
  return (
    <Card className={`gap-0 rounded-xl border border-border bg-card p-0 py-0 shadow-none ring-0 ${className}`}>
      <CardHeader className="border-b border-border p-4 md:px-6">
        <CardTitle className="font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:px-6">
        <div className={cn("flex flex-wrap items-center gap-4", previewClassName)}>{children}</div>
      </CardContent>
    </Card>
  );
}
