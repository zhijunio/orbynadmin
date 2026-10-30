"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { CircleCheck, Info, CircleAlert as IconAlertCircle, TriangleAlert as IconAlertTriangle, CircleCheck as IconCircleCheck, CircleX as IconCircleX } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const dialogContentClass = "w-[calc(100%-2rem)] gap-0 border border-border bg-background p-6 shadow-lg ring-0 max-w-[calc(100%-2rem)] sm:w-[480px] sm:max-w-[480px]";
const footerClass = "mx-0 mb-0 border-0 bg-transparent p-0 pt-4";

function DialogsExample() {
  return (
    <>
      <ComponentPreview title="Regular Dialog">
        <div className="flex w-full justify-center">
        <Dialog>
          <DialogTrigger asChild><Button>Show Information</Button></DialogTrigger>
          <DialogContent className={dialogContentClass} overlayClassName="bg-black/50 backdrop-blur-sm">
            <DialogHeader className="gap-1.5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Info aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <DialogTitle className="text-base font-semibold">Update Available</DialogTitle>
              </div>
              <DialogDescription className="mt-2">
                A new version of the application is available. Please update to enjoy the latest features and improvements.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-sm">
              <div className="rounded-lg bg-muted/60 p-4">
                <h3 className="mb-2 font-medium">What&apos;s new in v2.4.0</h3>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Improved performance and stability</li>
                  <li>New dashboard layout</li>
                  <li>Enhanced security features</li>
                  <li>Bug fixes and minor improvements</li>
                </ul>
              </div>
            </div>
            <DialogFooter className={footerClass}>
              <DialogClose asChild><Button variant="outline">Remind Me Later</Button></DialogClose>
              <DialogClose asChild><Button>Update Now</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Without Overlay">
        <div className="flex w-full justify-center">
        <Dialog>
          <DialogTrigger asChild><Button>Complete Order</Button></DialogTrigger>
          <DialogContent showOverlay={false} className={`${dialogContentClass} sm:w-96 sm:max-w-sm`}>
            <DialogHeader className="items-center gap-3 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                <CircleCheck aria-hidden="true" className="size-7" strokeWidth={1.5} />
              </span>
              <DialogTitle className="text-base font-semibold">Order Confirmed!</DialogTitle>
              <DialogDescription>
                Your order has been placed successfully. You will receive a confirmation email shortly with your order details and tracking information.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-sm">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-medium">#ORD-20260223</span>
                </div>
                <div className="my-2 border-t border-dashed" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">Feb 28, 2026</span>
                </div>
              </div>
            </div>
            <DialogFooter className={`${footerClass} mx-auto w-fit pt-0`}>
              <DialogClose asChild><Button variant="outline" size="sm">View Order</Button></DialogClose>
              <DialogClose asChild><Button size="sm">Continue Shopping</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Without Close Button">
        <div className="flex w-full justify-center">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Share</Button></DialogTrigger>
          <DialogContent showCloseButton={false} className={`${dialogContentClass} p-10 sm:w-[560px] sm:max-w-[560px]`} overlayClassName="bg-black/50 backdrop-blur-sm">
            <DialogHeader className="gap-1.5">
              <DialogTitle className="text-base font-semibold">Share link</DialogTitle>
              <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
            </DialogHeader>
            <div className="grid flex-1 gap-2 py-4">
              <Label htmlFor="share-link" className="sr-only">Link</Label>
              <Input id="share-link" autoFocus value="https://example.com" readOnly className="h-12" />
            </div>
            <DialogFooter className={`${footerClass} sm:justify-start`}>
              <DialogClose asChild><Button variant="outline" size="sm">Close</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Form in Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Invite a teammate</Button></DialogTrigger>
            <DialogContent className={dialogContentClass} overlayClassName="bg-black/50 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-base">Invite a teammate</DialogTitle>
                <DialogDescription>They will receive an email with a link to join your workspace.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4 py-2" onSubmit={(event) => event.preventDefault()}>
                <div className="space-y-2"><Label htmlFor="invite-name">Name</Label><Input id="invite-name" placeholder="Taylor Morgan" /></div>
                <div className="space-y-2"><Label htmlFor="invite-email">Email address</Label><Input id="invite-email" type="email" placeholder="taylor@company.com" /></div>
                <DialogFooter className={footerClass}>
                  <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                  <DialogClose asChild><Button type="submit">Send Invitation</Button></DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Fullscreen Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open workspace details</Button></DialogTrigger>
            <DialogContent className="fixed inset-3 left-3 top-3 h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-xl p-0 sm:inset-8 sm:left-8 sm:top-8 sm:h-[calc(100dvh-4rem)] sm:w-[calc(100vw-4rem)]" overlayClassName="bg-black/50 backdrop-blur-sm">
              <div className="flex min-h-full flex-col">
                <DialogHeader className="border-b p-6 pr-14"><DialogTitle className="text-base">Workspace details</DialogTitle><DialogDescription>Review the workspace configuration and member access.</DialogDescription></DialogHeader>
                <div className="grid flex-1 gap-6 p-6 md:grid-cols-2"><div className="rounded-xl border p-5"><p className="text-sm font-medium">NextBoard Studio</p><p className="mt-2 text-sm text-muted-foreground">A shared place for product planning, design reviews, and delivery updates.</p></div><div className="rounded-xl border p-5"><p className="text-sm font-medium">Workspace members</p><p className="mt-2 text-sm text-muted-foreground">12 active members · 3 pending invitations</p></div></div>
                <DialogFooter className="mt-auto"><DialogClose asChild><Button variant="outline">Close</Button></DialogClose><DialogClose asChild><Button>Save changes</Button></DialogClose></DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Confirmation Dialog">
        <div className="flex w-full justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive">Delete Project</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. The project and its associated data will be permanently removed.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete project</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Vertically Centered Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open Modal</Button></DialogTrigger>
            <DialogContent className={`${dialogContentClass} sm:w-[507px] sm:max-w-[507px]`} overlayClassName="bg-black/50 backdrop-blur-sm">
              <DialogHeader className="items-center gap-2 text-center">
                <DialogTitle className="text-lg font-semibold">All Done! Success Confirmed</DialogTitle>
                <DialogDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis mauris lacinia pharetra.</DialogDescription>
              </DialogHeader>
              <DialogFooter className={`${footerClass} mt-5 justify-center`}>
                <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
                <DialogClose asChild><Button>Save Changes</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Modal Alerts">
        <div className="flex w-full flex-wrap justify-center gap-3">
          {[
            { label: "Success", title: "Changes saved", description: "Your workspace settings have been updated successfully.", icon: IconCircleCheck, tone: "bg-emerald-500/10 text-emerald-600" },
            { label: "Information", title: "New update available", description: "A new version is ready with performance improvements and bug fixes.", icon: IconAlertCircle, tone: "bg-sky-500/10 text-sky-600" },
            { label: "Warning", title: "Storage nearly full", description: "Your workspace has used 90% of the available storage.", icon: IconAlertTriangle, tone: "bg-amber-500/10 text-amber-600" },
            { label: "Danger", title: "Delete workspace?", description: "This will permanently delete the workspace and all of its data.", icon: IconCircleX, tone: "bg-destructive/10 text-destructive" },
          ].map((alert) => <Dialog key={alert.label}>
            <DialogTrigger asChild><Button variant={alert.label === "Danger" ? "destructive" : "outline"}>{alert.label} alert</Button></DialogTrigger>
            <DialogContent className={`${dialogContentClass} sm:w-[420px] sm:max-w-[420px]`} overlayClassName="bg-black/50 backdrop-blur-sm">
              <DialogHeader className="items-center gap-3 text-center">
                <span className={`flex size-12 items-center justify-center rounded-full ${alert.tone}`}><alert.icon className="size-6" /></span>
                <DialogTitle className="text-base font-semibold">{alert.title}</DialogTitle>
                <DialogDescription>{alert.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter className={`${footerClass} mt-5 sm:justify-center`}>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <DialogClose asChild><Button variant={alert.label === "Danger" ? "destructive" : "default"}>{alert.label === "Danger" ? "Delete" : "Continue"}</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>)}
        </div>
      </ComponentPreview>
    </>
  );
}

export default function DialogsPage() {
  return <Showcase title="Modals"><DialogsExample /></Showcase>;
}
