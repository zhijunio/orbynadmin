import type { ReactNode } from "react";

/** Standard two-column catalog layout; direct children may use `ComponentPreview` `span={2}`. */
export function CatalogPageGrid({ children }: { children: ReactNode }) {
  return <div className="grid min-w-0 gap-5 xl:grid-cols-2 [&>*]:min-w-0">{children}</div>;
}

/** Lets a client catalog module expose multiple previews as grid items on the page grid. */
export function CatalogGridItems({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>;
}
