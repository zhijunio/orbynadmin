import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { cn } from "@/utils/cn";

export type CatalogPreviewLayout =
  | "inline"
  | "field"
  | "panel"
  | "wide"
  | "fullBleed"
  | "stack"
  | "fullStack"
  | "grid2"
  | "grid3"
  | "fill"
  | "anchor";

/** Width and overflow constraints for catalog preview areas (display comes from `ComponentPreview`). */
export function catalogPreviewLayoutClass(layout: CatalogPreviewLayout = "inline"): string {
  switch (layout) {
    case "field":
      return "w-full max-w-sm";
    case "panel":
      return "w-full max-w-xl";
    case "wide":
      return "w-full max-w-4xl min-w-0 overflow-x-auto";
    case "fullBleed":
      return "w-full min-w-0";
    case "stack":
      return "w-full";
    case "fullStack":
      return "w-full min-w-0";
    case "grid2":
      return "grid w-full gap-4 sm:grid-cols-2";
    case "grid3":
      return "grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3";
    case "fill":
      return "w-full [&>*]:w-full";
    case "anchor":
      return "min-w-0 w-full items-start";
    default:
      return "";
  }
}

export function ComponentPreview({
  title,
  description,
  children,
  className = "",
  previewClassName,
  layout = "inline",
  span = 1,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
  layout?: CatalogPreviewLayout;
  span?: 1 | 2;
}) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-xl border border-border bg-card p-0 py-0 shadow-none ring-0",
        span === 2 && "xl:col-span-2",
        className,
      )}
    >
      <CardHeader className="border-b border-border p-4 md:px-6">
        <CardTitle className="font-medium">{title}</CardTitle>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </CardHeader>
      <CardContent className="p-4 md:px-6">
        <div
          className={cn(
            layout === "stack" || layout === "fullStack"
              ? "flex min-w-0 w-full flex-col items-stretch gap-4"
              : layout === "grid2" || layout === "grid3"
                ? catalogPreviewLayoutClass(layout)
                : "flex min-w-0 w-full flex-wrap items-start gap-4",
            layout !== "grid2" && layout !== "grid3" ? catalogPreviewLayoutClass(layout) : "",
            previewClassName,
          )}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
