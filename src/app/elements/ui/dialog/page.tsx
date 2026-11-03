"use client";

import { useState } from "react";
import { toast } from "sonner";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { UniqueModalExamples } from "@/app/elements/ui/dialog/additional-dialog-examples";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/base/dialog/alert-dialog";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/base/dialog/dialog";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Spinner } from "@/components/base/spinner/spinner";
import { IconCircleCheck } from "@tabler/icons-react";

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

function ModalExamples() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [renameOpen, setRenameOpen] = useState(false);
  const [projectName, setProjectName] = useState("Acme Dashboard");
  const [draftName, setDraftName] = useState(projectName);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("md");

  function confirmDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDeleting(true);
    window.setTimeout(() => {
      setDeleting(false);
      setDeleteOpen(false);
      toast.success("Project deleted");
    }, 700);
  }

  function confirmTransfer(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setConfirmOpen(false);
    setConfirmation("");
    toast.success("Workspace ownership transferred");
  }

  return (
    <>
      <ComponentPreview title="Default Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Open modal</Button></DialogTrigger>
            <Modal>
              <ModalHeader title="Project details" description="Review the current project before continuing." />
              <ModalBody><p className="text-sm text-muted-foreground">Acme Dashboard has 24 files and 12 active collaborators.</p></ModalBody>
              <ModalFooter><DialogClose asChild><Button>Done</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Vertically Centered Modal">
        <div className="flex w-full justify-center">
          <Dialog>
            <DialogTrigger asChild><Button variant="secondary">Show confirmation</Button></DialogTrigger>
            <Modal>
              <DialogHeader className="items-center text-center">
                <IconCircleCheck aria-hidden="true" className="size-10 text-emerald-600" />
                <DialogTitle>Changes saved</DialogTitle>
                <DialogDescription>Your project settings are up to date.</DialogDescription>
              </DialogHeader>
              <ModalFooter className="justify-center"><DialogClose asChild><Button>Continue</Button></DialogClose></ModalFooter>
            </Modal>
          </Dialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Form In Modal">
        <div className="flex w-full justify-center">
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
        </div>
      </ComponentPreview>

      <ComponentPreview title="Alert Dialog">
        <div className="flex w-full justify-center">
          <AlertDialog
            open={deleteOpen}
            onOpenChange={(open) => {
              if (!deleting) setDeleteOpen(open);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete project?</AlertDialogTitle>
                <AlertDialogDescription>
                  Acme Dashboard and its 24 files will be deleted for everyone. You can&apos;t undo this.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" disabled={deleting} onClick={confirmDelete}>
                  {deleting ? <><Spinner size="sm" className="size-4" />Deleting…</> : "Delete project"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Confirm by Typing">
        <div className="flex w-full justify-center">
          <AlertDialog
            open={confirmOpen}
            onOpenChange={(open) => {
              setConfirmOpen(open);
              if (!open) setConfirmation("");
            }}
          >
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Transfer ownership</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Transfer workspace ownership?</AlertDialogTitle>
                <AlertDialogDescription>
                  Maya Chen becomes the owner and you become an admin. Type Acme below to confirm.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                aria-label="Workspace name"
                placeholder="Acme"
                value={confirmation}
                onChange={(event) => setConfirmation(event.currentTarget.value)}
                autoComplete="off"
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={confirmation.trim().toLowerCase() !== "acme"}
                  onClick={confirmTransfer}
                >
                  Transfer ownership
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Long Content">
        <div className="flex w-full justify-center">
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
        </div>
      </ComponentPreview>

      <ComponentPreview title="Controlled Dialog">
        <div className="grid w-full max-w-md gap-3">
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
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dialog Sizes">
        <div className="flex w-full flex-wrap gap-2">
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
        </div>
      </ComponentPreview>

    </>
  );
}

function ModalAccessibilityExample() {
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

export default function DialogsPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5"><PageHeader title="Modal" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
        <ModalExamples />
        <UniqueModalExamples />
        <ModalAccessibilityExample />
      </div></div>
    </ConsoleLayout>
  );
}
