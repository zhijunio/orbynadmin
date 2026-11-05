





import { IconTrash as IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover/popover";

function AlignmentPopovers() {
  return <div className="flex flex-wrap items-center justify-center gap-2">{(["start", "center", "end"] as const).map((align) => <Popover key={align}><PopoverTrigger asChild><Button variant="outline" size="sm">{align[0].toUpperCase() + align.slice(1)}</Button></PopoverTrigger><PopoverContent align={align} className="w-auto"><p>Aligned to {align}</p></PopoverContent></Popover>)}</div>;
}

function PopoverInDialog() {
  return <Dialog><DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger><DialogContent className="p-4"><DialogHeader><DialogTitle>Popover Example</DialogTitle><DialogDescription>Click the button below to see the popover.</DialogDescription></DialogHeader><Popover><PopoverTrigger asChild><Button variant="outline" className="w-fit">Open Popover</Button></PopoverTrigger><PopoverContent align="start" className="w-64"><PopoverHeader><PopoverTitle>Popover in Dialog</PopoverTitle><PopoverDescription>This popover appears inside a dialog. Click the button to open it.</PopoverDescription></PopoverHeader></PopoverContent></Popover></DialogContent></Dialog>;
}

const directions = ["top", "left", "bottom", "right"] as const;
const popoverDescription = "Popovers are great for showing small bits of context without navigating away from the current page.";

function DirectionalPopovers({ showArrow = true }: { showArrow?: boolean }) {
  return <div className="flex w-full flex-wrap items-center gap-5">
      {directions.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 w-fit px-4">Open {side[0].toUpperCase() + side.slice(1)} Popover</Button>
          </PopoverTrigger>
          <PopoverContent side={side} sideOffset={8} showArrow={showArrow} className="w-80 border border-border bg-card p-4 shadow-lg">
            <PopoverHeader className="gap-1">
              <PopoverTitle className="text-sm font-semibold">{side[0].toUpperCase() + side.slice(1)} Popover</PopoverTitle>
              <PopoverDescription className="text-sm leading-5 text-muted-foreground">{popoverDescription}</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>;
}

function ActionsPopover() {
  return <Popover>
      <PopoverTrigger asChild><Button className="px-4">Item Actions</Button></PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="w-[21rem] border border-border bg-card p-4 shadow-lg">
        <PopoverHeader className="gap-1">
          <PopoverTitle className="text-sm font-semibold">Manage this item</PopoverTitle>
          <PopoverDescription className="text-xs leading-4 text-muted-foreground">Choose an action to perform on the selected record.</PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2 pt-2">
          <PopoverClose asChild><Button variant="outline" size="sm">Cancel</Button></PopoverClose>
          <PopoverClose asChild><Button variant="destructive" size="sm"><IconTrash className="size-4" />Delete</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>;
}

function ButtonPopoverSupplement() {
  return <Popover>
      <PopoverTrigger asChild><Button variant="outline">Popover Text</Button></PopoverTrigger>
      <PopoverContent className="w-72 border border-border bg-card p-4">
        <PopoverHeader>
          <PopoverTitle>Popover Text</PopoverTitle>
        </PopoverHeader>
        <Button size="sm" className="mt-1">Action</Button>
      </PopoverContent>
    </Popover>;
}

function FormPopover() {
  return <Popover>
      <PopoverTrigger asChild><Button variant="outline">Invite teammate</Button></PopoverTrigger>
      <PopoverContent align="start" className="w-80 border border-border bg-card p-4">
        <PopoverHeader className="gap-1">
          <PopoverTitle className="text-sm font-semibold">Invite a teammate</PopoverTitle>
          <PopoverDescription className="text-sm leading-5 text-muted-foreground">Send an invitation to join this workspace.</PopoverDescription>
        </PopoverHeader>
        <div className="mt-4 grid gap-2">
          <Label htmlFor="invite-email">Email address</Label>
          <Input id="invite-email" type="email" placeholder="name@company.com" />
          <PopoverClose asChild><Button size="sm" className="mt-1 w-full">Send invitation</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>;
}

function LinkPopover() {
  return <Popover>
    <PopoverTrigger asChild><Button variant="outline">What is a popover?</Button></PopoverTrigger>
    <PopoverContent className="w-72 border border-border bg-card p-4">
      <PopoverHeader className="gap-1">
        <PopoverTitle className="text-sm font-semibold">Helpful context</PopoverTitle>
        <PopoverDescription className="text-sm leading-5 text-muted-foreground">Show related information without leaving this page.</PopoverDescription>
      </PopoverHeader>
      <Link href="/components/popover" className="mt-3 inline-flex text-sm font-medium text-primary underline underline-offset-4">Learn more</Link>
    </PopoverContent>
  </Popover>;
}

function PopoversExample() {
  return <>
      <ComponentPreview title="Trigger">

        <DirectionalPopovers />


        <ButtonPopoverSupplement />

<LinkPopover />
</ComponentPreview>
    <ComponentPreview title="Placement">
<DirectionalPopovers showArrow={false} />

<AlignmentPopovers />
</ComponentPreview>
    <ComponentPreview title="Content Variants">
<ActionsPopover />


        <FormPopover />

<Popover><PopoverTrigger asChild><Button variant="outline">View profile</Button></PopoverTrigger><PopoverContent className="w-72 border bg-card p-4"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary/10 text-sm font-medium text-primary">MC</span><div><p className="text-sm font-medium">Morgan Chen</p><p className="text-xs text-muted-foreground">Product designer</p></div></div><p className="mt-3 text-xs text-muted-foreground">Design systems and workspace experience.</p><Button size="sm" className="mt-3 w-full">Message</Button></PopoverContent></Popover>

<Popover><PopoverTrigger asChild><Button variant="outline">Explore analytics</Button></PopoverTrigger><PopoverContent className="w-72 border bg-card p-4"><PopoverHeader><PopoverTitle>Advanced analytics</PopoverTitle><PopoverDescription>Track workspace activity with custom reports and saved views.</PopoverDescription></PopoverHeader><Button size="sm" className="mt-3">View plans</Button></PopoverContent></Popover>

<Popover><PopoverTrigger asChild><Button variant="outline">Preview attachment</Button></PopoverTrigger><PopoverContent className="w-72 border bg-card p-3"><div className="grid aspect-video place-items-center rounded-md bg-muted text-3xl" aria-label="Image preview">▧</div><p className="mt-2 text-sm font-medium">workspace-overview.png</p><p className="text-xs text-muted-foreground">PNG · 1.8 MB</p></PopoverContent></Popover>

<Popover><PopoverTrigger asChild><Button variant="ghost" size="sm">Updated 12 minutes ago</Button></PopoverTrigger><PopoverContent className="w-56 border bg-card p-3"><PopoverTitle className="text-sm">Last updated</PopoverTitle><p className="mt-1 text-xs text-muted-foreground">Today at 10:42 AM · by Morgan Chen</p></PopoverContent></Popover>

<Popover><PopoverTrigger asChild><Button variant="outline">Display controls</Button></PopoverTrigger><PopoverContent className="w-64 border bg-card p-4"><PopoverHeader><PopoverTitle>Chart options</PopoverTitle></PopoverHeader><div className="mt-3 grid gap-2"><Label htmlFor="show-legend">Show legend</Label><Input id="show-legend" type="checkbox" defaultChecked className="size-4"/><Label htmlFor="chart-style">Chart style</Label><select id="chart-style" className="h-9 rounded-md border bg-background px-2 text-sm"><option>Line</option><option>Area</option><option>Bar</option></select></div></PopoverContent></Popover>

<Popover><PopoverTrigger asChild><Button>Continue setup</Button></PopoverTrigger><PopoverContent className="w-72 border bg-card p-4"><p className="text-xs font-medium text-primary">STEP 2 OF 4</p><PopoverTitle className="mt-1">Invite your team</PopoverTitle><PopoverDescription className="mt-1">Collaborators can review projects and share updates.</PopoverDescription><div className="mt-3 flex justify-between"><Button variant="ghost" size="sm">Back</Button><PopoverClose asChild><Button size="sm">Next</Button></PopoverClose></div></PopoverContent></Popover>
</ComponentPreview>
    <ComponentPreview title="Dialog">
<PopoverInDialog />
</ComponentPreview>
  </>;
}

export function PopoverCatalogExamples() {
  return (
    <CatalogGridItems>
      <PopoversExample />
    </CatalogGridItems>
  );
}
