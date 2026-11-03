import AppShell from "@/components/blocks/application/app-shell/app-shell";

export const metadata = { title: "Divider" };




import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ContentDivider, Separator } from "@/components/ui/divider/separator";
import { Button } from "@/components/ui/buttons/button";



export default function DividerPage() {
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Divider" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Separator Orientations"><div className="flex h-16 w-full items-center gap-4"><span>General</span><Separator orientation="vertical" /><span>Security</span><Separator orientation="vertical" /><span>Billing</span></div><Separator /><p className="pt-3 text-sm text-muted-foreground">Horizontal separator</p></ComponentPreview>
    <ComponentPreview title="Content Dividers"><div className="w-full space-y-5"><ContentDivider align="start">Today</ContentDivider><ContentDivider>Latest activity</ContentDivider><ContentDivider align="end">End aligned</ContentDivider><ContentDivider variant="double">Archived</ContentDivider><ContentDivider variant="fill">A filled section break</ContentDivider><div className="flex items-center gap-3"><Separator className="flex-1" /><Button variant="outline" size="sm">Load more</Button><Separator className="flex-1" /></div></div></ComponentPreview>
    <ComponentPreview title="Vertical Menu Groups"><div className="flex h-12 items-center gap-1 rounded-lg border p-1 text-sm"><Button variant="ghost" size="sm">Overview</Button><Button variant="ghost" size="sm">Projects</Button><Separator orientation="vertical" className="mx-1 h-6" /><Button variant="ghost" size="sm">Members</Button><Button variant="ghost" size="sm">Invitations</Button><Separator orientation="vertical" className="mx-1 h-6" /><Button variant="ghost" size="sm">Settings</Button></div></ComponentPreview>
    <ComponentPreview title="Separators Between List Items"><div className="w-full max-w-lg divide-y rounded-lg border px-4">{[["API access", "3 active keys"], ["Webhook endpoints", "2 configured"], ["Audit log", "Updated 4 minutes ago"]].map(([title, detail]) => <div key={title} className="flex items-center justify-between gap-3 py-3"><div><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{detail}</p></div><span className="text-xs text-muted-foreground">Manage</span></div>)}</div></ComponentPreview>
    <ComponentPreview title="Order Summary Dividers"><div className="w-full max-w-sm space-y-3 text-sm"><p className="font-medium">Plan renewal</p><Separator /><dl className="flex justify-between"><dt className="text-muted-foreground">Workspace plan</dt><dd>$49.00</dd></dl><dl className="flex justify-between"><dt className="text-muted-foreground">Annual discount</dt><dd className="text-primary">−$5.00</dd></dl><dl className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>$3.52</dd></dl><Separator /><dl className="flex justify-between font-semibold"><dt>Total</dt><dd>$47.52</dd></dl></div></ComponentPreview>
  </div></div>}</AppShell>;
}
