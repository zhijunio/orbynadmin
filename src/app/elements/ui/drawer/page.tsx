"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { Button } from "@/components/base/buttons/button";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/base/sheet/sheet";

const sides = ["left", "right", "top", "bottom"] as const;
export default function DrawerPage() {
  return <ConsoleLayout>{<Showcase title="Drawer">{sides.map((side) => <ComponentPreview key={side} title={`${side[0].toUpperCase()}${side.slice(1)} drawer`}><Sheet><SheetTrigger asChild><Button variant="outline">Open {side}</Button></SheetTrigger><SheetContent side={side}><SheetHeader><SheetTitle>Workspace details</SheetTitle><SheetDescription>Review and update this workspace.</SheetDescription></SheetHeader><div className="flex-1 space-y-3 px-5 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Status</span><span>Active</span></div><div className="flex justify-between"><span className="text-muted-foreground">Members</span><span>12</span></div></div><SheetFooter><SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose><SheetClose asChild><Button>Done</Button></SheetClose></SheetFooter></SheetContent></Sheet></ComponentPreview>)}</Showcase>}</ConsoleLayout>;
}
