"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const placements = [
  { side: "right", label: "Right Sheet", trigger: "Open Inspector", title: "Project details", description: "Review the current project summary and ownership." },
  { side: "left", label: "Left Sheet", trigger: "Open Navigation", title: "Workspace navigation", description: "Quick links for common workspace areas." },
  { side: "bottom", label: "Bottom Sheet", trigger: "Open Quick Actions", title: "Quick actions", description: "Choose an action to continue." },
  { side: "top", label: "Top Sheet", trigger: "Open Announcement", title: "Workspace announcement", description: "A compact panel can also enter from the top edge." },
] as const;

function SheetExamples() {
  return <>
    {placements.map(({ side, label, trigger, title, description }) => (
      <ComponentPreview key={side} title={label}>
        <div className="flex w-full justify-center">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">{trigger}</Button></SheetTrigger>
            <SheetContent side={side} className="gap-0 p-0">
              <SheetHeader className="border-b p-5 pr-12">
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>{description}</SheetDescription>
              </SheetHeader>
              <div className="flex-1 space-y-4 p-5 text-sm">
                {side === "left" ? <div className="space-y-1">{["Overview", "Projects", "Reports", "Team"].map((item) => <button key={item} className="block w-full rounded-md px-3 py-2 text-left hover:bg-muted">{item}</button>)}</div> : <><div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">In progress</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Owner</span><span className="font-medium">Wei Zhang</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Due date</span><span className="font-medium">Oct 24, 2026</span></div></>}
              </div>
              <SheetFooter className="border-t p-5 sm:flex-row sm:justify-end">
                <SheetClose asChild><Button variant="outline">Close</Button></SheetClose>
                <SheetClose asChild><Button>Done</Button></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </ComponentPreview>
    ))}
  </>;
}

export default function SheetsPage() {
  return <Showcase title="Sheets"><SheetExamples /></Showcase>;
}
