import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";

export function MetricTile({
  label,
  value,
  hint,
  icon: Icon,
  compact = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ComponentType<{ className?: string }>;
  compact?: boolean;
}) {
  return (
    <Card>
      <CardContent className={compact ? "space-y-2" : "space-y-2.5"}>
        <div className={Icon ? "flex items-center justify-between" : undefined}>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon && (
            <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Icon className="size-4" />
            </span>
          )}
        </div>
        <p className="text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
