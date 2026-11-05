"use client";
import { useState } from "react";
import { toast } from "sonner";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Kbd } from "@/components/ui/kbd/kbd";
import { Switch } from "@/components/ui/switch/switch";
import { IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle, IconX } from "@tabler/icons-react";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeOptions: { size: ModalSize; label: string }[] = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
  { size: "xl", label: "Extra large" },
];

const terms = [
  "Your use of this workspace is subject to the terms below. Please review them before continuing.",
  "You are responsible for keeping account credentials private and for activity performed by members you invite.",
  "Workspace data must be accurate, lawful, and handled in accordance with the policies that apply to your organization.",
  "We may update the service to improve reliability, security, and compatibility. Material changes will be communicated to workspace owners.",
  "You can export your workspace data at any time. After a workspace is closed, retained data is handled according to the retention policy.",
  "Access may be suspended when activity creates a security risk or violates these terms. We will contact the workspace owner when action is required.",
  "The service is provided as available. We work to keep it reliable and will publish notices when scheduled maintenance affects access.",
  "These terms are effective from 1 October 2026 and apply to all members of the workspace.",
  "Workspace owners must review member access regularly and remove accounts that no longer need access. You are responsible for assigning permissions that match each member's role.",
  "Do not upload information that you do not have permission to share. Personal information should be limited to what is needed for the workspace purpose.",
  "Integrations may exchange data with services you enable. Review their permissions and terms before connecting an external account.",
  "Usage limits and billing details are shown in workspace settings. The owner is responsible for keeping payment details current and reviewing invoices.",
  "You may not interfere with service operation, probe accounts without permission, or use the workspace to distribute malicious content.",
  "We may process diagnostics and usage data to protect the service, investigate faults, and improve performance. We do not sell workspace content.",
  "If you believe an account has been compromised, notify your workspace owner and contact support promptly so access can be secured.",
  "You may export records for backup or migration. Exports are available only to members with the appropriate permission and should be stored securely.",
  "Service notices are sent to the contact details in workspace settings. Keep those details current so owners receive important security and billing updates.",
  "Where a third-party service is connected, its availability and handling of data are governed by its own terms and privacy policy.",
  "Either you or your organization may stop using the service at any time. Workspace closure may remove access for all members after the export window ends.",
  "If a provision of these terms cannot be enforced, the remaining provisions continue to apply to your use of the service.",
  "Questions about these terms or workspace data can be sent to the support team through the help center.",
];

export function DialogModalExamples() {
  const [renameOpen, setRenameOpen] = useState(false);
  const [projectName, setProjectName] = useState("Acme Dashboard");
  const [draftName, setDraftName] = useState(projectName);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("md");


  return (
    <CatalogGridItems>
      <ComponentPreview title="Layout" layout="grid2">
<div className="min-w-0"><div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Open modal</Button></DialogTrigger>
            <Modal>
              <ModalHeader title="Project details" description="Review the current project before continuing." />
              <ModalBody><p className="text-sm text-muted-foreground">Acme Dashboard has 24 files and 12 active collaborators.</p></ModalBody>
              <ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
<div className="min-w-0"><div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Show confirmation</Button></DialogTrigger>
            <Modal>
              <DialogHeader className="items-center text-center">
                <IconCircleCheck aria-hidden="true" className="size-10 text-success-foreground" />
                <DialogTitle>Changes saved</DialogTitle>
                <DialogDescription>Your project settings are up to date.</DialogDescription>
              </DialogHeader>
              <ModalFooter className="justify-center"><DialogClose asChild><Button>Continue</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
<div className="min-w-0"><div className="flex w-full flex-wrap gap-2">
          {sizeOptions.map((option) => (
            <Button
              key={option.size}
              variant="secondary"
              size="sm"
              onClick={() => {
                setSize(option.size);
                setSizeOpen(true);
              }}
            >
              {option.label}
            </Button>
          ))}
          <Dialog open={sizeOpen} onOpenChange={setSizeOpen}>
            <Modal size={size}>
              <ModalHeader title={`${sizeOptions.find((option) => option.size === size)?.label} modal`} />
              <ModalBody>
                <p className="text-sm text-muted-foreground">This modal is capped at the selected width and the available viewport size.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setSizeOpen(false)}>Close</Button>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
</ComponentPreview>
<ComponentPreview title="Stack Content Layout" layout="stack">
<div className="min-w-0 w-full"><div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Invite teammates</Button>
            </DialogTrigger>
            <Modal>
              <ModalHeader
                title="Invite teammates"
                description="They will receive an email with a link to join your workspace."
              />
              <ModalBody className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="invite-name">Name</Label>
                  <Input id="invite-name" placeholder="Taylor Morgan" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invite-email">Email address</Label>
                  <Input id="invite-email" type="email" placeholder="taylor@company.com" />
                </div>
              </ModalBody>
              <ModalFooter>
                <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => toast.success("Invitation sent")}>Send invitation</Button>
                </DialogClose>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
<div className="min-w-0 w-full"><div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Review terms</Button></DialogTrigger>
            <Modal
              size="lg"
              className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0"
            >
              <ModalHeader
                className="shrink-0 border-b p-6"
                title="Terms of service"
                description="Last updated 1 October 2026"
              />
              <ModalBody className="space-y-4 p-6">
                {terms.map((term, index) => <p key={term}>{index + 1}. {term}</p>)}
              </ModalBody>
              <ModalFooter className="shrink-0 border-t p-4">
                <DialogClose asChild><Button variant="secondary">Decline</Button></DialogClose>
                <DialogClose asChild><Button>Accept</Button></DialogClose>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
</ComponentPreview>
<ComponentPreview title="State">
<div className="min-w-0"><div className="grid w-full max-w-md gap-3">
          <p className="text-sm text-muted-foreground">Project: {projectName}</p>
          <Button
            variant="secondary"
            className="justify-self-start"
            onClick={() => {
              setDraftName(projectName);
              setRenameOpen(true);
            }}
          >
            Rename project
          </Button>
          <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
            <Modal size="sm">
              <ModalHeader title="Rename project" />
              <ModalBody>
                <form
                  id="rename-project-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setProjectName(draftName.trim() || projectName);
                    setRenameOpen(false);
                  }}
                >
                  <Input
                    aria-label="Project name"
                    value={draftName}
                    onChange={(event) => setDraftName(event.currentTarget.value)}
                    autoFocus
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setRenameOpen(false)}>Cancel</Button>
                <Button type="submit" form="rename-project-form">Save</Button>
              </ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
</ComponentPreview>

    </CatalogGridItems>
  );
}

export function DialogAccessibilityExamples() {
  return (
    <ComponentPreview title="Keyboard and Accessibility">
      <ul className="grid list-disc gap-2 pl-5 text-sm leading-6 text-muted-foreground">
        <li>Opening a modal moves focus inside; Tab and Shift+Tab stay within it.</li>
        <li>Escape closes the modal and focus returns to its trigger.</li>
        <li>The page behind the modal is hidden from assistive technology and cannot scroll.</li>
        <li>The title names the dialog and the description is announced with it.</li>
      </ul>
    </ComponentPreview>
  );
}

export function DialogVariantExamples() {
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
    <CatalogGridItems>
      <ComponentPreview title="Chrome" layout="grid2">
<div className="min-w-0"><div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Show success</Button></DialogTrigger>
            <Modal showOverlay={false}>
              <DialogHeader className="items-center text-center">
                <IconCircleCheck className="size-10 text-success-foreground" aria-hidden="true" />
                <DialogTitle>Payment complete</DialogTitle>
                <DialogDescription>Your invoice has been paid successfully.</DialogDescription>
              </DialogHeader>
              <ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div></div>
<div className="min-w-0"><div className="flex w-full justify-center">
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
        </div></div>
<div className="min-w-0"><div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="secondary">Open details</Button></DialogTrigger><Modal showCloseButton={false}><DialogHeader><DialogTitle>Release details</DialogTitle><DialogDescription>Version 2.4.1 is ready for your workspace.</DialogDescription></DialogHeader><ModalBody><p className="text-sm text-muted-foreground">The release includes improved project filters and keyboard navigation.</p></ModalBody><DialogClose asChild><Button type="button" variant="ghost" size="icon-sm" aria-label="Close release details" className="absolute right-3 top-3"><IconX className="size-4" /></Button></DialogClose><ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter></Modal></Dialog></div></div>
<div className="min-w-0"><div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Re-authenticate</Button></DialogTrigger><Modal size="sm"><ModalHeader title="Session expired" description="Sign in again to continue working in this workspace." /><ModalFooter className="w-full"><DialogClose asChild><Button className="w-full" onClick={() => toast.success("Sign-in flow started")}>Sign in again</Button></DialogClose></ModalFooter></Modal></Dialog></div></div>
</ComponentPreview>
<ComponentPreview title="Layout">
<div className="min-w-0"><div className="flex w-full justify-center">
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
        </div></div>
</ComponentPreview>
<ComponentPreview title="Grid Content Layout" layout="grid2">
<div className="min-w-0"><div className="flex w-full flex-wrap justify-center gap-2">
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
        </div></div>
<div className="min-w-0"><div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="destructive">Delete workspace</Button></DialogTrigger><Modal><DialogHeader><DialogTitle>Delete this workspace?</DialogTitle><DialogDescription>This removes its projects and member access. This action cannot be undone.</DialogDescription></DialogHeader><ModalFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button variant="destructive" onClick={() => toast.error("Workspace deleted")}>Delete workspace</Button></DialogClose></ModalFooter></Modal></Dialog></div></div>
<div className="min-w-0"><div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Cookie preferences</Button></DialogTrigger><Modal><ModalHeader title="Cookie preferences" description="Choose which optional cookies this workspace can use." /><ModalBody className="grid gap-4"><div className="flex items-center justify-between gap-4"><div><Label htmlFor="essential-cookies">Essential cookies</Label><p className="text-xs text-muted-foreground">Required for sign-in and security.</p></div><Switch id="essential-cookies" checked disabled /></div><div className="flex items-center justify-between gap-4"><div><Label htmlFor="analytics-cookies">Analytics cookies</Label><p className="text-xs text-muted-foreground">Help improve workspace features.</p></div><Switch id="analytics-cookies" checked={analyticsCookies} onCheckedChange={setAnalyticsCookies} /></div></ModalBody><ModalFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><DialogClose asChild><Button onClick={() => toast.success("Cookie preferences saved")}>Save preferences</Button></DialogClose></ModalFooter></Modal></Dialog></div></div>
<div className="min-w-0"><div className="flex w-full justify-center"><Dialog><DialogTrigger asChild><Button variant="outline">Keyboard shortcuts</Button></DialogTrigger><Modal size="lg"><ModalHeader title="Keyboard shortcuts" description="Quick reference for common workspace actions." /><ModalBody className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{[["Search", "⌘", "K"], ["Save", "⌘", "S"], ["New project", "⌘", "N"], ["Undo", "⌘", "Z"], ["Quick open", "⌘", "P"], ["Toggle comment", "⌘", "/"]].map(([action, ...keys]) => <div key={action} className="flex items-center justify-between gap-3"><span className="text-sm text-muted-foreground">{action}</span><span className="flex gap-1">{keys.map((key, index) => <Kbd key={`${action}-${index}`}>{key}</Kbd>)}</span></div>)}</ModalBody><ModalFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></ModalFooter></Modal></Dialog></div></div>
</ComponentPreview>
    </CatalogGridItems>
  );
}

export function DialogCatalogExamples() {
  return (
    <>
      <DialogModalExamples />
      <DialogVariantExamples />
      <DialogAccessibilityExamples />
    </>
  );
}
