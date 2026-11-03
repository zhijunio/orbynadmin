import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { AspectRatio } from "@/components/ui/aspect-ratio/aspect-ratio";

const examples = [
  { title: "16:9 widescreen aspect ratio", label: "16:9", ratio: 16 / 9, width: "max-w-md" },
  { title: "4:3 standard aspect ratio", label: "4:3", ratio: 4 / 3, width: "max-w-md" },
  { title: "1:1 square aspect ratio", label: "1:1", ratio: 1, width: "max-w-xs" },
  { title: "21:9 ultrawide aspect ratio", label: "21:9", ratio: 21 / 9, width: "max-w-md" },
  { title: "9:16 portrait aspect ratio", label: "9:16", ratio: 9 / 16, width: "max-w-48" },
  { title: "3:2 classic photography aspect ratio", label: "3:2", ratio: 3 / 2, width: "max-w-md" },
  { title: "4:5 social media portrait aspect ratio", label: "4:5", ratio: 4 / 5, width: "max-w-xs" },
  { title: "16:10 computer monitor aspect ratio", label: "16:10", ratio: 16 / 10, width: "max-w-md" },
] as const;

export default function AspectRatioPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Aspect Ratio" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          {examples.map(({ title, label, ratio, width }) => (
            <ComponentPreview key={label} title={title}>
              <div className="flex w-full justify-center">
                <AspectRatio ratio={ratio} className={`overflow-hidden rounded-xl border bg-muted ${width}`}>
                  <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">{label}</div>
                </AspectRatio>
              </div>
            </ComponentPreview>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
