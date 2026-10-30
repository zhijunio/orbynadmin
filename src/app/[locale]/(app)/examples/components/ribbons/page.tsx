import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";

const description = "Lorem ipsum dolor sit amet consectetur. Eget nulla suscipit arcu rutrum amet vel nec fringilla vulputate. Sed aliquam fringilla vulputate imperdiet arcu natoque purus ac nec ultricies nulla ultrices.";

function LightningIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M13.2 2.8 5.9 13h5.3l-.5 8.2L18.1 11h-5.3l.4-8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function RibbonCard({ variant }: { variant: "rounded" | "hover" | "filled" | "hover-icon" }) {
  return (
    <article className="group relative min-h-[230px] w-full overflow-hidden rounded-2xl border border-border bg-card p-8">
      {variant === "rounded" && <span className="absolute left-0 top-5 flex h-12 items-center rounded-r-full bg-primary px-6 text-sm font-semibold text-primary-foreground">Popular</span>}
      {variant === "hover" && <span className="absolute left-0 top-5 flex h-12 w-[150px] items-center bg-primary pl-6 pr-8 text-sm font-semibold text-primary-foreground [clip-path:polygon(0_0,100%_0,80%_50%,100%_100%,0_100%)]">Popular</span>}
      {variant === "filled" && <span className="absolute -left-10 top-[25px] flex h-11 w-36 -rotate-45 items-center justify-center bg-primary pb-0.5 text-sm font-semibold text-primary-foreground">New</span>}
      {variant === "hover-icon" && <span aria-label="Featured ribbon, changes on hover" className="absolute left-0 top-5 flex h-12 w-[150px] items-center bg-primary pl-6 pr-8 text-sm font-semibold text-primary-foreground transition-colors [clip-path:polygon(0_0,100%_0,80%_50%,100%_100%,0_100%)] group-hover:bg-primary/90"><span className="transition-opacity group-hover:opacity-0">Popular</span><span className="absolute left-6 opacity-0 transition-opacity group-hover:opacity-100"><LightningIcon /></span></span>}
      <p className="pt-16 text-sm font-medium leading-[1.65] text-muted-foreground">{description}</p>
    </article>
  );
}

export const metadata = { title: "Ribbons" };

export default function RibbonsPage() {
  return <Showcase title="Ribbons">
    <ComponentPreview title="Rounded Ribbon"><RibbonCard variant="rounded" /></ComponentPreview>
    <ComponentPreview title="Ribbon in Hover"><RibbonCard variant="hover" /></ComponentPreview>
    <ComponentPreview title="Filled Ribbon"><RibbonCard variant="filled" /></ComponentPreview>
    <ComponentPreview title="Ribbon in Hover"><RibbonCard variant="hover-icon" /></ComponentPreview>
  </Showcase>;
}
