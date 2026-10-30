import { Showcase } from "@/components/feature/example/Showcase";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Button } from "@/components/ui/button";
import { LoaderCircle as IconLoader2 } from "lucide-react";

export default function SpinnersPage() {
  return <Showcase title="Spinners">
    <ComponentPreview title="Border Spinner"><div className="flex items-center gap-4"><span role="status" aria-label="Loading" className="size-8 animate-spin rounded-full border-[3px] border-muted border-t-primary" /><span role="status" aria-label="Loading" className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" /><span className="sr-only">Loading</span></div></ComponentPreview>
    <ComponentPreview title="Dots Spinner"><div role="status" aria-label="Loading" className="flex items-center gap-1.5">{[0, 1, 2].map((item) => <span key={item} className="size-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${item * 120}ms` }} />)}</div></ComponentPreview>
    <ComponentPreview title="Icon Spinner"><IconLoader2 aria-hidden="true" className="size-7 animate-spin text-primary" /><IconLoader2 aria-hidden="true" className="size-5 animate-spin text-muted-foreground" /></ComponentPreview>
    <ComponentPreview title="Loading Buttons"><Button disabled><IconLoader2 className="size-4 animate-spin" /> Saving…</Button><Button variant="outline" disabled><IconLoader2 className="size-4 animate-spin" /> Loading</Button></ComponentPreview>
  </Showcase>;
}
