"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { Button } from "@/components/base/buttons/button";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/base/sheet/sheet";

export default function DrawerPage() {
  return <ConsoleLayout>
    <div className="min-w-0 space-y-5"><PageHeader title="Drawer" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
      <ComponentPreview title="Navigation Drawer">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open navigation</Button></SheetTrigger>
          <SheetContent side="left">
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
          <SheetContent side="right">
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
          <SheetContent side="bottom">
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
          <SheetContent side="top">
            <SheetHeader><SheetTitle>Scheduled maintenance</SheetTitle><SheetDescription>Workspace reports will be unavailable on Saturday from 10:00 to 10:30 UTC.</SheetDescription></SheetHeader>
            <SheetFooter className="sm:flex-row sm:justify-end"><SheetClose asChild><Button>Got it</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>
    </div></div>
  </ConsoleLayout>;
}
