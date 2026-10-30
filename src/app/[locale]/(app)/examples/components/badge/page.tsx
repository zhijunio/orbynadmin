import { Showcase } from "@/components/feature/example/Showcase";

import { ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { cn } from "@/lib/utils";

const badgeColors = [
  { label: "Primary", soft: "bg-[#eff3ff] text-[#3758f9]", solid: "bg-[#3758f9]", ghost: "text-[#3758f9]" },
  { label: "Gray", soft: "bg-[#f3f4f6] text-[#374151]", solid: "bg-[#71717a]", ghost: "text-[#374151]" },
  { label: "Error", soft: "bg-red-50 text-red-700", solid: "bg-red-700", ghost: "text-red-700" },
  { label: "Warning", soft: "bg-amber-50 text-amber-700", solid: "bg-amber-700", ghost: "text-amber-700" },
  { label: "Success", soft: "bg-green-50 text-green-700", solid: "bg-green-700", ghost: "text-green-700" },
  { label: "Cyan", soft: "bg-cyan-50 text-cyan-700", solid: "bg-cyan-700", ghost: "text-cyan-700" },
  { label: "Sky", soft: "bg-sky-50 text-sky-700", solid: "bg-sky-700", ghost: "text-sky-700" },
  { label: "Blue", soft: "bg-blue-50 text-blue-700", solid: "bg-blue-700", ghost: "text-blue-700" },
  { label: "Violet", soft: "bg-violet-50 text-violet-700", solid: "bg-violet-700", ghost: "text-violet-700" },
  { label: "Purple", soft: "bg-purple-50 text-purple-700", solid: "bg-purple-700", ghost: "text-purple-700" },
  { label: "Pink", soft: "bg-pink-50 text-pink-700", solid: "bg-pink-700", ghost: "text-pink-700" },
  { label: "Rose", soft: "bg-rose-50 text-rose-700", solid: "bg-rose-700", ghost: "text-rose-700" },
  { label: "Orange", soft: "bg-orange-50 text-orange-700", solid: "bg-orange-700", ghost: "text-orange-700" },
  { label: "Light", soft: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80", solid: "bg-gray-400 dark:bg-white/10", ghost: "text-gray-700 dark:text-white/80" },
  { label: "Dark", soft: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80", solid: "bg-gray-700", ghost: "text-gray-700 dark:text-white/80" },
] as const;

type BadgeStyle = "soft" | "ghost" | "outline" | "solid";

function BadgeRow({ style, icon }: { style: BadgeStyle; icon?: "prefix" | "suffix" }) {
  return (
    <div className="flex flex-wrap gap-4">
      {badgeColors.map(({ label, soft, solid, ghost }) => {
        const color = style === "solid" ? "text-white" : style === "soft" ? soft : ghost;
        const background = style === "solid" ? solid : style === "soft" ? "" : "bg-transparent";
        const border = style === "outline" ? "border border-current" : style === "ghost" ? "border-0" : "border-transparent";

        return (
          <Badge
            key={label}
            variant="default"
            className={cn(
              "h-5 gap-2 rounded-full px-2 py-0.5 text-xs font-medium transition-none",
              color,
              background,
              border,
              icon === "prefix" && "pl-1.5 pr-2",
              icon === "suffix" && "pl-2 pr-1.5",
              "[&>svg]:size-3",
            )}
          >
            {icon === "prefix" && (
              <svg aria-hidden="true" viewBox="0 0 8 8" className="size-3 fill-current">
                <circle cx="4" cy="4" r="3" />
              </svg>
            )}
            {label}
            {icon === "suffix" && <ArrowUp aria-hidden="true" strokeWidth={1.5} />}
          </Badge>
        );
      })}
    </div>
  );
}

function BadgeExample() {
  return (
    <>
      <ComponentPreview title="Badge Soft"><BadgeRow style="soft" /></ComponentPreview>
      <ComponentPreview title="Badge Ghost"><BadgeRow style="ghost" /></ComponentPreview>
      <ComponentPreview title="Badge Outline"><BadgeRow style="outline" /></ComponentPreview>
      <ComponentPreview title="Badge Solid"><BadgeRow style="solid" /></ComponentPreview>
      <ComponentPreview title="Badge With Prefix Icon"><BadgeRow style="soft" icon="prefix" /></ComponentPreview>
      <ComponentPreview title="Badge With Suffix Icon"><BadgeRow style="soft" icon="suffix" /></ComponentPreview>
    </>
  );
}

export const metadata = { title: "Badges" };

export default function BadgePage() {
  return <Showcase title="Badges"><BadgeExample /></Showcase>;
}
