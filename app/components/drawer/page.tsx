"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { toast } from "sonner";
import { Button } from "@/components/ui/buttons/button";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet/sheet";

export default function DrawerPage() {
  return <AppShell>
    <div className="min-w-0 space-y-5"><PageHeader title="Drawer" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
      <ComponentPreview title="Navigation Drawer">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open navigation</Button></SheetTrigger>
          <SheetContent side="left" swipeDirection="left">
            <SheetHeader><SheetTitle>Workspace</SheetTitle><SheetDescription>Navigate to a workspace area.</SheetDescription></SheetHeader>
            <nav aria-label="Workspace" className="flex-1 space-y-1 px-4">
              {["Overview", "Projects", "Reports", "Team"].map((item) => <button key={item} type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">{item}</button>)}
            </nav>
            <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <ComponentPreview title="Edit Form Drawer">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Edit workspace</Button></SheetTrigger>
          <SheetContent side="right" swipeDirection="right">
            <SheetHeader><SheetTitle>Edit workspace</SheetTitle><SheetDescription>Update the workspace name and status.</SheetDescription></SheetHeader>
            <div className="flex-1 space-y-4 px-5">
              <div className="grid gap-2"><Label htmlFor="drawer-workspace-name">Workspace name</Label><Input id="drawer-workspace-name" defaultValue="Product Design" /></div>
              <div className="grid gap-1 text-sm"><span className="text-muted-foreground">Status</span><span className="font-medium">Active</span></div>
            </div>
            <SheetFooter><SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose><SheetClose asChild><Button>Save changes</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <ComponentPreview title="Bottom Quick Actions">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open quick actions</Button></SheetTrigger>
          <SheetContent side="bottom" swipeDirection="down">
            <SheetHeader><SheetTitle>Quick actions</SheetTitle><SheetDescription>Choose an action for this project.</SheetDescription></SheetHeader>
            <div className="grid gap-2 px-5 sm:grid-cols-3">
              <Button variant="outline">Create task</Button><Button variant="outline">Invite teammate</Button><Button variant="outline">Share project</Button>
            </div>
            <SheetFooter><SheetClose asChild><Button variant="outline">Done</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <ComponentPreview title="Top Announcement Drawer">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open announcement</Button></SheetTrigger>
          <SheetContent side="top" swipeDirection="up">
            <SheetHeader><SheetTitle>Scheduled maintenance</SheetTitle><SheetDescription>Workspace reports will be unavailable on Saturday from 10:00 to 10:30 UTC.</SheetDescription></SheetHeader>
            <SheetFooter className="sm:flex-row sm:justify-end"><SheetClose asChild><Button>Got it</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>
      <ComponentPreview title="Scrollable Drawer with Sticky Actions">
        <Sheet><SheetTrigger asChild><Button variant="outline">Review activity</Button></SheetTrigger><SheetContent side="bottom" swipeDirection="down" className="max-h-[80vh]"><SheetHeader><SheetTitle>Recent workspace activity</SheetTitle><SheetDescription>Review updates before sharing the monthly report.</SheetDescription></SheetHeader><div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5">{["Project created · Platform refresh", "Maya updated the deployment guide", "Three new API keys were issued", "Quarterly report exported", "Alex invited two collaborators", "Workspace retention changed", "Incident review completed", "Billing contact updated", "New integration connected", "Audit log downloaded"].map((activity, index) => <div key={activity} className="flex items-start gap-3 rounded-lg border p-3"><span className="mt-1 size-2 shrink-0 rounded-full bg-primary" /><div className="min-w-0"><p className="text-sm">{activity}</p><p className="mt-1 text-xs text-muted-foreground">{index + 2} minutes ago</p></div></div>)}</div><SheetFooter><SheetClose asChild><Button variant="outline">Close activity</Button></SheetClose><Button onClick={() => toast.success("Activity report exported")}>Export report</Button></SheetFooter></SheetContent></Sheet>
      </ComponentPreview>
      <ComponentPreview title="Drawers from Every Side">
        <div className="flex flex-wrap gap-2">{(["top", "right", "bottom", "left"] as const).map((side) => <Sheet key={side}><SheetTrigger asChild><Button variant="outline" size="sm">{side[0].toUpperCase() + side.slice(1)}</Button></SheetTrigger><SheetContent side={side} swipeDirection={side === "top" ? "up" : side === "bottom" ? "down" : side}><SheetHeader><SheetTitle>{side[0].toUpperCase() + side.slice(1)} drawer</SheetTitle><SheetDescription>Open and close a workspace panel from the {side} edge.</SheetDescription></SheetHeader><SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter></SheetContent></Sheet>)}</div>
      </ComponentPreview>
    </div></div>
  </AppShell>;
}
