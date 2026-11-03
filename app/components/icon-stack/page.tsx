import {
  IconBell,
  IconCheck,
  IconCloud,
  IconDatabase,
  IconInbox,
  IconPackage,
  IconUserPlus,
} from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { IconStack } from "@/components/ui/icon-stack/icon-stack";

const sizes = [
  { label: "Small", className: "h-12 w-11", iconClassName: "size-3" },
  { label: "Default", className: "h-20 w-[4.5rem]", iconClassName: "size-4" },
  { label: "Large", className: "h-24 w-[5.5rem]", iconClassName: "size-6" },
];
const tones = [
  { label: "Neutral", className: "text-foreground", iconClassName: "text-muted-foreground", Icon: IconDatabase },
  { label: "Primary", className: "text-primary", iconClassName: "text-primary", Icon: IconPackage },
  { label: "Accent", className: "text-primary/80", iconClassName: "text-primary", Icon: IconCheck },
  { label: "Accent soft", className: "text-primary/60", iconClassName: "text-primary", Icon: IconBell },
];

export default function IconStackPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Icon Stack" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Isometric icon stack">
            <div className="flex w-full items-center justify-center"><IconStack aria-hidden="true"><IconPackage className="size-4" /></IconStack></div>
          </ComponentPreview>
          <ComponentPreview title="Icon stack sizes" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-end justify-center gap-8">
              {sizes.map((size) => <div key={size.label} className="flex flex-col items-center gap-2"><IconStack aria-hidden="true" className={size.className}><IconPackage className={size.iconClassName} /></IconStack><span className="text-sm text-muted-foreground">{size.label}</span></div>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Icon stack colors" className="xl:col-span-2">
            <div className="flex w-full flex-wrap items-end justify-center gap-7">
              {tones.map(({ label, className, iconClassName, Icon }) => <div key={label} className="flex flex-col items-center gap-2"><IconStack aria-hidden="true" className={className}><Icon className={`size-4 ${iconClassName}`} /></IconStack><span className="text-sm text-muted-foreground">{label}</span></div>)}
            </div>
          </ComponentPreview>
          <ComponentPreview title="Icon badge stack">
            <div className="flex w-full items-center justify-center"><IconStack aria-hidden="true" className="h-24 w-[5.5rem] text-primary"><span className="flex size-8 items-center justify-center rounded-full border bg-background text-primary shadow-xs"><IconUserPlus className="size-4" /></span></IconStack></div>
          </ComponentPreview>
          <ComponentPreview title="Empty state illustration" className="xl:col-span-2">
            <div className="flex w-full flex-col items-center gap-4 py-6 text-center">
              <IconStack aria-hidden="true" className="h-24 w-[5.5rem] text-primary"><IconInbox className="size-5 text-primary" /></IconStack>
              <div className="max-w-sm"><h3 className="text-sm font-semibold">Workspace is ready</h3><p className="mt-1 text-sm text-muted-foreground">Invite teammates or connect a data source to start filling this view.</p></div>
              <div className="flex flex-wrap justify-center gap-2"><Button size="sm"><IconUserPlus data-icon="inline-start" />Invite team</Button><Button variant="outline" size="sm"><IconCloud data-icon="inline-start" />Connect source</Button></div>
            </div>
          </ComponentPreview>
          <ComponentPreview title="Item media stack" className="xl:col-span-2">
            <div className="mx-auto flex w-full max-w-md items-center gap-3 rounded-lg border p-4">
              <IconStack aria-hidden="true" className="h-12 w-11 text-primary"><IconPackage className="size-3 text-primary" /></IconStack>
              <div className="min-w-0"><h3 className="text-sm font-medium">Registry package ready</h3><p className="text-sm text-muted-foreground">12 deployments use this package.</p></div>
            </div>
          </ComponentPreview>
        </div>
      </div>
    </AppShell>
  );
}
