import Link from "next/link";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { ContentDivider, Separator } from "@/components/ui/divider/separator";
export function DividerCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title={"Horizontal"}><div className="w-full space-y-3 text-sm"><p className="font-medium">{"Design system"}</p><p className="text-xs text-muted-foreground">{"The foundation for your interface."}</p><Separator /><p className="text-muted-foreground">{"Reusable components for a consistent workspace."}</p></div></ComponentPreview>
          <ComponentPreview title={"Vertical"}><div className="flex h-6 items-center gap-4 text-sm">{[["general", "General"], ["security", "Security"], ["billing", "Billing"]].map(([key, label],index)=><span key={key} className="flex h-full items-center gap-4">{index>0 && <Separator orientation="vertical" />}{label}</span>)}</div></ComponentPreview>
          <ComponentPreview title={"Grouped Menu Items"}><nav aria-label={"Workspace menu"} className="flex max-w-full flex-wrap items-center gap-3 text-sm">{[[["overview", "Overview"], ["projects", "Projects"]], [["members", "Members"], ["settings", "Settings"]]].map((group,index)=><div key={index} className="flex h-7 items-center gap-3">{index>0 && <Separator orientation="vertical" />}{group.map(([key, label])=><Link key={key} href={`/components/${key==="settings" ? "select" : "button"}`} className="rounded hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">{label}</Link>)}</div>)}</nav></ComponentPreview>
          <ComponentPreview title={"List Rows"}><ul className="w-full text-sm">{[["api", "API access"], ["webhooks", "Webhook endpoints"], ["audit", "Audit log"]].map(([key, label],index)=><li key={key}>{index>0 && <Separator />}<p className="py-3">{label}</p></li>)}</ul></ComponentPreview>
          <ComponentPreview title={"Centered Label"}><ContentDivider>{"Or continue with"}</ContentDivider></ComponentPreview>
          <ComponentPreview title={"Order Summary"}><div className="w-full space-y-3 text-sm"><p className="font-medium">{"Order summary"}</p><Separator />{[["subtotal", "Subtotal", "$49.00"], ["discount", "Discount", "−$5.00"], ["tax", "Tax", "$3.52"]].map(([key, label, value])=><dl key={key} className="flex justify-between"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></dl>)}<Separator /><dl className="flex justify-between font-semibold"><dt>{"Total"}</dt><dd>$47.52</dd></dl></div></ComponentPreview>
    </CatalogGridItems>
  );
}
