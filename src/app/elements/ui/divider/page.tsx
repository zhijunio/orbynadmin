import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Divider" };




import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { ContentDivider, Separator } from "@/components/base/divider/separator";
import { Button } from "@/components/base/buttons/button";



export default function DividerPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Divider" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Separator Orientations"><div className="flex h-16 w-full items-center gap-4"><span>General</span><Separator orientation="vertical" /><span>Security</span><Separator orientation="vertical" /><span>Billing</span></div><Separator /><p className="pt-3 text-sm text-muted-foreground">Horizontal separator</p></ComponentPreview>
    <ComponentPreview title="Content Dividers"><div className="w-full space-y-5"><ContentDivider align="start">Today</ContentDivider><ContentDivider>Latest activity</ContentDivider><ContentDivider align="end">End aligned</ContentDivider><ContentDivider variant="double">Archived</ContentDivider><ContentDivider variant="fill">A filled section break</ContentDivider><div className="flex items-center gap-3"><Separator className="flex-1" /><Button variant="outline" size="sm">Load more</Button><Separator className="flex-1" /></div></div></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
