import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Chip, type ChipColor, type ChipVariant } from "@/components/base/badges/chip";
import { StatusDot, type StatusDotColor } from "@/components/base/badges/status-dot";

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
      <Showcase title="Chip" columns={1}>
        <ComponentPreview title="Variants & colors">
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

        <ComponentPreview title="StatusDot">
          <div role="group" aria-label="Status indicators" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {statuses.map(({ color, label }) => (
              <span key={color} className="inline-flex items-center gap-2">
                <StatusDot color={color} />
                {label}
              </span>
            ))}
          </div>
        </ComponentPreview>
      </Showcase>
    </ConsoleLayout>
  );
}
