import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { IconLoader2 } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner/spinner";

export default function SpinnersPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Spinners" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
    <ComponentPreview title="Circular Spinner Sizes"><div className="flex min-h-20 items-center gap-8 py-2">{[
      { label: "Small", className: "size-5 border-2" },
      { label: "Default", className: "size-6 border-2" },
      { label: "Large", className: "size-8 border-[3px]" },
    ].map((size) => <div key={size.label} className="flex items-center gap-3"><span role="status" aria-label={`${size.label} loading`} className={`${size.className} animate-spin rounded-full border-muted border-t-primary`} /><span className="text-sm text-muted-foreground">{size.label}</span></div>)}</div></ComponentPreview>
    <ComponentPreview title="Icon Spinner Sizes"><div className="flex min-h-20 items-center gap-8 py-2">{[
      { label: "Small", size: "sm" as const },
      { label: "Default", size: "default" as const },
      { label: "Large", size: "lg" as const },
    ].map((item) => <div key={item.label} className="flex items-center gap-3"><Spinner size={item.size} className="text-primary" /><span className="text-sm text-muted-foreground">{item.label}</span></div>)}</div></ComponentPreview>
    <ComponentPreview title="Bouncing Dots"><div className="flex min-h-16 items-center"><span role="status" aria-label="Loading" className="flex items-center gap-1.5">{[0, 1, 2].map((item) => <span key={item} aria-hidden="true" className="size-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${item * 120}ms` }} />)}</span></div></ComponentPreview>
    <ComponentPreview title="Loading Buttons"><div className="flex flex-wrap items-center gap-3"><Button disabled><IconLoader2 aria-hidden="true" className="size-4 animate-spin" /> Saving…</Button><Button variant="outline" disabled><IconLoader2 aria-hidden="true" className="size-4 animate-spin" /> Loading</Button></div></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
