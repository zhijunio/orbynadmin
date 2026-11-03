import {
  IconAdjustmentsHorizontal,
  IconAlertCircle,
  IconCircleCheck,
  IconClock,
  IconDatabase,
  IconFolder,
  IconPackage,
  IconPhoto,
  IconStar,
} from "@tabler/icons-react";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { IconTile } from "@/components/ui/icon-tile/icon-tile";

const variants = ["outline", "elevated", "soft", "solid", "frame"] as const;
const sizes = ["xs", "sm", "default", "lg", "xl"] as const;
const softTones = [
  { label: "Subtle", className: "text-primary/70" },
  { label: "Default", className: "text-primary" },
  { label: "Emphasized", className: "text-primary" },
];
const solidTones = [
  { label: "Subtle", className: "bg-primary/80 text-primary-foreground" },
  { label: "Default", className: "" },
  { label: "Emphasized", className: "bg-primary text-primary-foreground" },
];

export default function IconTilePage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Icon Tile" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Default icon tile">
            <div className="flex w-full items-center justify-center"><IconTile aria-hidden="true"><IconFolder /></IconTile></div>
          </ComponentPreview>
          <ComponentPreview title="Elevated icon tile">
            <div className="flex w-full items-center justify-center"><IconTile variant="elevated" aria-hidden="true"><IconPackage /></IconTile></div>
          </ComponentPreview>
          <ComponentPreview title="Framed icon tile">
            <div className="flex w-full items-center justify-center"><IconTile variant="frame" aria-hidden="true"><IconDatabase /></IconTile></div>
          </ComponentPreview>
          <ComponentPreview title="All variants" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {variants.map((variant) => <IconTile key={variant} variant={variant} aria-hidden="true"><IconPackage /></IconTile>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Sizes" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-end justify-center gap-4">
              {sizes.map((size) => <IconTile key={size} variant="elevated" size={size} aria-hidden="true"><IconPackage /></IconTile>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Circular tiles">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <IconTile variant="outline" size="lg" radius="full" aria-hidden="true"><IconDatabase /></IconTile>
              <IconTile variant="elevated" size="lg" radius="full" aria-hidden="true"><IconStar /></IconTile>
              <IconTile variant="frame" size="lg" radius="full" aria-hidden="true"><IconCircleCheck /></IconTile>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Custom sizing">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <IconTile variant="elevated" className="size-14" aria-hidden="true"><IconPhoto className="size-7" /></IconTile>
              <IconTile variant="elevated" className="[--icon-tile-icon-size:--spacing(7)] [--icon-tile-size:--spacing(14)]" aria-hidden="true"><IconAdjustmentsHorizontal /></IconTile>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Accent color" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              {[
                { label: "Subtle", className: "border-primary/10 bg-primary/10 text-primary dark:border-primary/25 dark:bg-primary/15", Icon: IconStar },
                { label: "Default", className: "border-primary/20 bg-primary/15 text-primary dark:border-primary/30 dark:bg-primary/20", Icon: IconCircleCheck },
                { label: "Emphasized", className: "border-primary bg-primary text-primary-foreground", Icon: IconClock },
              ].map(({ label, className, Icon }) => <IconTile key={label} className={className} aria-hidden="true"><Icon /></IconTile>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Text content">
            <div className="flex w-full items-center justify-center gap-3">
              <IconTile variant="elevated" className="text-xs font-medium">AK</IconTile>
              <IconTile variant="outline" radius="full" className="text-xs font-medium text-muted-foreground">12</IconTile>
            </div>
          </ComponentPreview>
          <ComponentPreview title="List row">
            <div className="flex w-full max-w-sm items-center gap-3 border-b py-2">
              <IconTile variant="elevated" size="sm" aria-hidden="true"><IconFolder /></IconTile>
              <div className="min-w-0"><p className="text-sm font-medium">Quarterly report</p><p className="text-xs text-muted-foreground">Updated 2 hours ago</p></div>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Feature card" className="xl:col-span-2">
            <Frame className="w-full max-w-md"><FramePanel className="flex flex-col gap-3">
              <IconTile variant="elevated" size="lg" aria-hidden="true"><IconDatabase /></IconTile>
              <div><h3 className="text-sm font-medium">Workspace analytics</h3><p className="text-xs text-muted-foreground">Monitor projects, usage, and team activity in one place.</p></div>
            </FramePanel></Frame>
          </ComponentPreview>
          <ComponentPreview title="Empty state" className="xl:col-span-2">
            <div className="flex w-full flex-col items-center gap-3 py-6 text-center">
              <IconTile variant="frame" size="xl" aria-hidden="true"><IconFolder /></IconTile>
              <div><h3 className="text-sm font-medium">No files yet</h3><p className="mt-1 text-sm text-muted-foreground">Upload a file to get started.</p></div>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Interactive tile">
            <div className="flex w-full items-center justify-center">
              <IconTile asChild variant="elevated" className="transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <a href="/components/button" aria-label="Open workspace settings"><IconAdjustmentsHorizontal /></a>
              </IconTile>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Status overlay">
            <div className="flex w-full items-center justify-center">
              <span className="relative inline-flex" aria-label="Service online"><IconTile variant="elevated" aria-hidden="true"><IconDatabase /></IconTile><span className="absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 border-background bg-primary" /></span>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Soft tones" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {softTones.map(({ label, className }) => <IconTile key={label} variant="soft" className={className} aria-label={label}><IconStar /></IconTile>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Solid tones" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {solidTones.map(({ label, className }) => <IconTile key={label} variant="solid" className={className} aria-label={label}><IconCircleCheck /></IconTile>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Accent shades" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {[IconStar, IconAlertCircle, IconAdjustmentsHorizontal, IconDatabase].map((Icon, index) => <IconTile key={index} variant="elevated" className={`text-primary ${index % 2 ? "bg-primary/10" : "bg-primary/20"}`} aria-hidden="true"><Icon /></IconTile>)}
            </div>
          </ComponentPreview>
        </div>
      </div>
    </ConsoleLayout>
  );
}
