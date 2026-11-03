"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Kbd } from "@/components/ui/kbd/kbd";
import { Switch } from "@/components/ui/switch/switch";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";

export function UniqueModalExamples() {
  const [alert, setAlert] = useState<null | "success" | "info" | "warning" | "danger">(null);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const alertContent = {
    success: { title: "Changes saved", description: "Your workspace settings have been updated.", icon: IconCircleCheck },
    info: { title: "New update available", description: "A new version is ready to install.", icon: IconInfoCircle },
    warning: { title: "Storage almost full", description: "Your workspace is using 90% of its storage.", icon: IconAlertTriangle },
    danger: { title: "Connection lost", description: "We could not reach the service. Try again shortly.", icon: IconCircleX },
  };
  const currentAlert = alert ? alertContent[alert] : null;
  const AlertIcon = currentAlert?.icon;

  return (
    <>
      <ComponentPreview title="Without Overlay">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Show success</Button></DialogTrigger>
            <Modal showOverlay={false}>
              <DialogHeader className="items-center text-center">
                <IconCircleCheck className="size-10 text-emerald-600" aria-hidden="true" />
                <DialogTitle>Payment complete</DialogTitle>
                <DialogDescription>Your invoice has been paid successfully.</DialogDescription>
              </DialogHeader>
              <ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Without Close Button">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Share link</Button></DialogTrigger>
            <Modal showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Share this project</DialogTitle>
                <DialogDescription>Anyone with this link can view the project.</DialogDescription>
              </DialogHeader>
              <ModalBody className="grid gap-2">
                <Label htmlFor="share-link">Project link</Label>
                <Input id="share-link" readOnly value="https://example.com/projects/acme" />
              </ModalBody>
              <ModalFooter>
                <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                <DialogClose asChild><Button onClick={() => navigator.clipboard?.writeText("https://example.com/projects/acme")}>Copy link</Button></DialogClose>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Full Screen Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Open workspace details</Button></DialogTrigger>
            <Modal className="inset-3 top-3 left-3 h-[calc(100dvh-1.5rem)] max-h-none w-[calc(100%-1.5rem)] max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden p-0 sm:inset-6 sm:top-6 sm:left-6 sm:h-[calc(100dvh-3rem)] sm:w-[calc(100%-3rem)]">
              <DialogHeader className="shrink-0 border-b p-6">
                <DialogTitle>Acme workspace</DialogTitle>
                <DialogDescription>Workspace overview and member access.</DialogDescription>
              </DialogHeader>
              <ModalBody className="space-y-4 p-6">
                <p className="text-sm text-muted-foreground">Manage workspace settings, review members, and keep project resources in one place.</p>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Members</p>
                  <p className="mt-1 text-sm text-muted-foreground">12 active members · 2 pending invitations</p>
                </div>
              </ModalBody>
              <ModalFooter className="shrink-0 border-t p-4">
                <DialogClose asChild><Button variant="secondary">Close</Button></DialogClose>
                <DialogClose asChild><Button>Open settings</Button></DialogClose>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Modal Based Alerts">
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Button variant="secondary" onClick={() => setAlert("success")}>Success</Button>
          <Button variant="secondary" onClick={() => setAlert("info")}>Information</Button>
          <Button variant="secondary" onClick={() => setAlert("warning")}>Warning</Button>
          <Button variant="destructive" onClick={() => setAlert("danger")}>Error</Button>
          <Dialog open={alert !== null} onOpenChange={(open) => !open && setAlert(null)}>
            <Modal size="sm">
              {currentAlert && AlertIcon && (
                <>
                  <DialogHeader className="items-center text-center">
                    <AlertIcon className="size-10 text-primary" aria-hidden="true" />
                    <DialogTitle>{currentAlert.title}</DialogTitle>
                    <DialogDescription>{currentAlert.description}</DialogDescription>
                  </DialogHeader>
                  <ModalFooter><DialogClose asChild><Button>Got it</Button></DialogClose></ModalFooter>
                </>
              )}
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom Close Button">
        <div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="secondary">Open details</Button></DialogTrigger><Modal showCloseButton={false}><DialogHeader><DialogTitle>Release details</DialogTitle><DialogDescription>Version 2.4.1 is ready for your workspace.</DialogDescription></DialogHeader><ModalBody><p className="text-sm text-muted-foreground">The release includes improved project filters and keyboard navigation.</p></ModalBody><DialogClose asChild><Button type="button" variant="ghost" size="icon-sm" aria-label="Close release details" className="absolute right-3 top-3"><IconX className="size-4" /></Button></DialogClose><ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter></Modal></Dialog></div>
      </ComponentPreview>

      <ComponentPreview title="Destructive Confirmation">
        <div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="destructive">Delete workspace</Button></DialogTrigger><Modal><DialogHeader><DialogTitle>Delete this workspace?</DialogTitle><DialogDescription>This removes its projects and member access. This action cannot be undone.</DialogDescription></DialogHeader><ModalFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button variant="destructive" onClick={() => toast.error("Workspace deleted")}>Delete workspace</Button></DialogClose></ModalFooter></Modal></Dialog></div>
      </ComponentPreview>

      <ComponentPreview title="Cookie Preferences">
        <div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Cookie preferences</Button></DialogTrigger><Modal><ModalHeader title="Cookie preferences" description="Choose which optional cookies this workspace can use." /><ModalBody className="grid gap-4"><div className="flex items-center justify-between gap-4"><div><Label htmlFor="essential-cookies">Essential cookies</Label><p className="text-xs text-muted-foreground">Required for sign-in and security.</p></div><Switch id="essential-cookies" checked disabled /></div><div className="flex items-center justify-between gap-4"><div><Label htmlFor="analytics-cookies">Analytics cookies</Label><p className="text-xs text-muted-foreground">Help improve workspace features.</p></div><Switch id="analytics-cookies" checked={analyticsCookies} onCheckedChange={setAnalyticsCookies} /></div></ModalBody><ModalFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button onClick={() => toast.success("Cookie preferences saved")}>Save preferences</Button></DialogClose></ModalFooter></Modal></Dialog></div>
      </ComponentPreview>

      <ComponentPreview title="Keyboard Shortcut Reference">
        <div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Keyboard shortcuts</Button></DialogTrigger><Modal size="lg"><ModalHeader title="Keyboard shortcuts" description="Quick reference for common workspace actions." /><ModalBody className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{[["Search", "⌘", "K"], ["Save", "⌘", "S"], ["New project", "⌘", "N"], ["Undo", "⌘", "Z"], ["Quick open", "⌘", "P"], ["Toggle comment", "⌘", "/"]].map(([action, ...keys]) => <div key={action} className="flex items-center justify-between gap-3"><span className="text-sm text-muted-foreground">{action}</span><span className="flex gap-1">{keys.map((key, index) => <Kbd key={`${action}-${index}`}>{key}</Kbd>)}</span></div>)}</ModalBody><ModalFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></ModalFooter></Modal></Dialog></div>
      </ComponentPreview>

      <ComponentPreview title="Full-Width Dialog Action">
        <div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Re-authenticate</Button></DialogTrigger><Modal size="sm"><ModalHeader title="Session expired" description="Sign in again to continue working in this workspace." /><ModalFooter className="w-full"><DialogClose asChild><Button className="w-full" onClick={() => toast.success("Sign-in flow started")}>Sign in again</Button></DialogClose></ModalFooter></Modal></Dialog></div>
      </ComponentPreview>
    </>
  );
}
