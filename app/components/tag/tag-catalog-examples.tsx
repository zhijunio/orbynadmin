import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Tag, type TagColor, type TagVariant } from "@/components/ui/badge/tag";
import { StatusDot, type StatusDotColor } from "@/components/ui/badge/status-dot";

const colors: TagColor[] = ["lime", "rose", "yellow", "cyan", "neutral", "gray", "soft"];
const variants: { variant: TagVariant; label: string; sample: string }[] = [
  { variant: "bold", label: "Bold", sample: "+12.5%" },
  { variant: "subtle", label: "Subtle", sample: "$3.252" },
  { variant: "caption", label: "Caption", sample: "Backend Engineer" },
];
const statuses: { color: StatusDotColor; label: string }[] = [
  { color: "success", label: "Operational" },
  { color: "warning", label: "Needs attention" },
  { color: "error", label: "Unavailable" },
  { color: "info", label: "In progress" },
  { color: "neutral", label: "Unknown" },
];



export function TagCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Tag Variants and Colors" description="Bold, subtle, and caption styles across the palette." layout="panel">
                <div className="grid w-full gap-3">
                  {variants.map(({ variant, label, sample }) => (
                    <div key={variant} className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                      <span className="text-sm font-medium text-muted-foreground">{label}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {colors.map((color) => (
                          <Tag key={`${variant}-${color}`} variant={variant} color={color}>{sample}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ComponentPreview>

              <ComponentPreview title="Status Indicators" layout="inline">
                <div role="group" aria-label="Status indicators" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                  {statuses.map(({ color, label }) => (
                    <span key={color} className="inline-flex items-center gap-2">
                      <StatusDot color={color} />
                      {label}
                    </span>
                  ))}
                </div>
              </ComponentPreview>
    </CatalogGridItems>
  );
}
