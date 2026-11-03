import ConsoleLayout from "@/components/custom/app-shell/console-layout";

export const metadata = { title: "Ribbons" };




import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";

const description = "Explore the new analytics dashboard to spot customer trends and share reports with your team.";

function LightningIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M13.2 2.8 5.9 13h5.3l-.5 8.2L18.1 11h-5.3l.4-8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function RibbonCard({ variant }: { variant: "rounded" | "hover" | "filled" | "hover-icon" }) {
  return <article className="group relative min-h-[230px] w-full overflow-hidden rounded-2xl border border-border bg-card p-8">
      {variant === "rounded" && <span className="absolute left-0 top-4 flex h-8 items-center rounded-r-full bg-primary px-4 text-xs font-semibold text-primary-foreground">Popular</span>}
      {variant === "hover" && <span className="absolute left-0 top-4 flex h-8 w-32 items-center bg-primary pl-4 pr-7 text-xs font-semibold text-primary-foreground [clip-path:polygon(0_0,100%_0,80%_50%,100%_100%,0_100%)]">Popular</span>}
      {variant === "filled" && <span className="absolute -left-9 top-5 flex h-8 w-28 -rotate-45 items-center justify-center bg-primary pb-0.5 text-xs font-semibold text-primary-foreground">New</span>}
      {variant === "hover-icon" && <span aria-label="Featured ribbon, changes on hover" className="absolute left-0 top-4 flex h-8 w-32 items-center bg-primary pl-4 pr-7 text-xs font-semibold text-primary-foreground transition-colors [clip-path:polygon(0_0,100%_0,80%_50%,100%_100%,0_100%)] group-hover:bg-primary/90"><span className="transition-opacity group-hover:opacity-0">Popular</span><span className="absolute left-4 opacity-0 transition-opacity group-hover:opacity-100"><LightningIcon /></span></span>}
      <p className="pt-16 text-sm font-medium leading-[1.65] text-muted-foreground">{description}</p>
    </article>;
}



export default function RibbonsPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Ribbons" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Rounded Ribbon"><RibbonCard variant="rounded" /></ComponentPreview>
    <ComponentPreview title="Ribbon in Hover"><RibbonCard variant="hover" /></ComponentPreview>
    <ComponentPreview title="Filled Ribbon"><RibbonCard variant="filled" /></ComponentPreview>
    <ComponentPreview title="Ribbon in Hover with Icon"><RibbonCard variant="hover-icon" /></ComponentPreview>
  </div></div>}</ConsoleLayout>;
}
