"use client";

import { useState } from "react";
import { IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Button } from "@/components/base/buttons/button";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Modal, ModalBody, ModalFooter } from "@/components/base/dialog/dialog";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";

export function UniqueModalExamples() {
  const [alert, setAlert] = useState<null | "success" | "info" | "warning" | "danger">(null);
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

      <ComponentPreview title="Fullscreen Modal">
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

      <ComponentPreview title="Modal Alerts">
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
    </>
  );
}
