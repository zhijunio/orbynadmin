import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { AspectRatio } from "@/components/ui/aspect-ratio/aspect-ratio";


const examples = [
  { title: "16:9 Widescreen Aspect Ratio", label: "16:9", ratio: 16 / 9, width: "max-w-md" },
  { title: "4:3 Standard Aspect Ratio", label: "4:3", ratio: 4 / 3, width: "max-w-md" },
  { title: "1:1 Square Aspect Ratio", label: "1:1", ratio: 1, width: "max-w-xs" },
  { title: "21:9 Ultrawide Aspect Ratio", label: "21:9", ratio: 21 / 9, width: "max-w-md" },
  { title: "9:16 Portrait Aspect Ratio", label: "9:16", ratio: 9 / 16, width: "max-w-48" },
  { title: "3:2 Classic Photography Aspect Ratio", label: "3:2", ratio: 3 / 2, width: "max-w-md" },
  { title: "4:5 Social Media Portrait Aspect Ratio", label: "4:5", ratio: 4 / 5, width: "max-w-xs" },
  { title: "16:10 Computer Monitor Aspect Ratio", label: "16:10", ratio: 16 / 10, width: "max-w-md" },
] as const;

export function AspectRatioCatalogExamples() {
  return (
    <>
      {examples.map(({ title, label, ratio, width }) => (
                  <ComponentPreview key={label} title={title}>
                    <div className="flex w-full justify-center">
                      <AspectRatio ratio={ratio} className={`overflow-hidden rounded-xl border bg-muted ${width}`}>
                        <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">{label}</div>
                      </AspectRatio>
                    </div>
                  </ComponentPreview>
                ))}
    </>
  );
}
