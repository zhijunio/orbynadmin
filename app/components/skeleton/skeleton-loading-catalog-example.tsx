"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
export function SkeletonLoadingCatalogExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      <div aria-busy={loading} className="min-h-20">
        {loading ? (
          <div aria-hidden="true" className="flex items-center gap-4 py-1">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36 max-w-full" />
              <Skeleton className="h-3 w-24 max-w-full" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 py-1">
            <div aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">MC</div>
            <div>
              <p className="text-sm font-medium">Maya Chen</p>
              <p className="text-sm text-muted-foreground">{"Design lead"}</p>
            </div>
          </div>
        )}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => setLoading((current) => !current)}>
        {(loading ? "Show loaded content" : "Show loading state")}
      </Button>
    </div>
  );
}
