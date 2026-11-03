import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Chip, type ChipColor, type ChipVariant } from "@/components/ui/badges/chip";
import { StatusDot, type StatusDotColor } from "@/components/ui/badges/status-dot";

const colors: ChipColor[] = ["lime", "rose", "yellow", "cyan", "neutral", "gray", "soft"];
const variants: { variant: ChipVariant; label: string; sample: string }[] = [
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

export default function ChipPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Chip" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Chip Variants and Colors">
          <div className="grid w-full gap-3">
            {variants.map(({ variant, label, sample }) => (
              <div key={variant} className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <div className="flex flex-wrap items-center gap-2">
                  {colors.map((color) => (
                    <Chip key={`${variant}-${color}`} variant={variant} color={color}>{sample}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>

        <ComponentPreview title="Status Indicators">
          <div role="group" aria-label="Status indicators" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {statuses.map(({ color, label }) => (
              <span key={color} className="inline-flex items-center gap-2">
                <StatusDot color={color} />
                {label}
              </span>
            ))}
          </div>
        </ComponentPreview>
      </div></div>
    </ConsoleLayout>
  );
}
