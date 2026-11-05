import type { ReactNode } from "react";
import { ComponentPreview, type CatalogPreviewLayout } from "@/components/custom/docs/component-preview";
import { CatalogGridItems, CatalogPageGrid } from "@/components/custom/docs/catalog-page-grid";

export { CatalogGridItems, CatalogPageGrid };

export function CatalogSections({
  sections,
  render,
  exampleLabel,
}: {
  sections: {
    title: string;
    description?: string;
    examples: number[];
    stack?: boolean;
    columns?: 2 | 3;
    layout?: CatalogPreviewLayout;
    span?: 1 | 2;
  }[];
  render: (example: number) => ReactNode;
  exampleLabel?: (example: number) => string | undefined;
}) {
  return (
    <CatalogGridItems>
      {sections.map((section) => {
        const layout = section.layout ?? (section.stack ? "stack" : "inline");
        const previewClassName =
          section.columns === 3
            ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : section.columns === 2
              ? "grid items-stretch gap-4 sm:grid-cols-2"
              : section.stack
                ? "flex-col flex-nowrap items-stretch gap-6"
                : undefined;

        return (
          <ComponentPreview
            key={section.title}
            title={section.title}
            description={section.description}
            span={section.span ?? 1}
            layout={layout}
            previewClassName={previewClassName}
          >
            {section.examples.map((example) => (
              <div key={example} className={section.stack ? "min-w-0 w-full space-y-2" : "min-w-0"}>
                {section.stack && exampleLabel?.(example) ? (
                  <p className="text-xs font-medium text-muted-foreground">{exampleLabel(example)}</p>
                ) : null}
                {render(example)}
              </div>
            ))}
          </ComponentPreview>
        );
      })}
    </CatalogGridItems>
  );
}
