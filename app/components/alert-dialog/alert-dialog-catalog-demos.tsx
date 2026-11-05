"use client";

import { useState } from "react";
import {
  IconBellRinging,
  IconBluetooth,
  IconCircleCheck,
  IconDeviceDesktop,
  IconLogout,
  IconShieldCheck,
  IconTrash,
  IconUserOff,
} from "@tabler/icons-react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialog/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame/frame";
import { Input } from "@/components/ui/input/input";

function Example({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </AlertDialogTrigger>
      {children}
    </AlertDialog>
  );
}

export function AlertDialogCatalogExamples() {
  const [nestedOpen, setNestedOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skipUnsavedPrompt, setSkipUnsavedPrompt] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <CatalogGridItems>
      <ComponentPreview title="Confirmation" layout="grid3" span={2}>
        <div className="min-w-0">
          <Example trigger="Publish changes">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish these changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  The updated dashboard will be visible to all workspace members.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Publish</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Grant access">
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Grant viewer access?</AlertDialogTitle>
                <AlertDialogDescription>
                  This member will be able to view reports in this workspace.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Not now</AlertDialogCancel>
                <AlertDialogAction>Grant access</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Pair device">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <IconBluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>Pair this device?</AlertDialogTitle>
                <AlertDialogDescription>
                  Connect the reporting display to the workspace.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Pair device</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Connect display">
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <IconDeviceDesktop />
                </AlertDialogMedia>
                <AlertDialogTitle>Connect this display?</AlertDialogTitle>
                <AlertDialogDescription>
                  It will receive the live operations dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Connect</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Sign out">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out of this account?</AlertDialogTitle>
                <AlertDialogDescription>You can sign in again at any time.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:grid sm:grid-cols-2 sm:p-0 sm:[&>*]:m-0 sm:[&>*]:rounded-none sm:[&>*:first-child]:border-r">
                <AlertDialogCancel>
                  <IconLogout />
                  No, stay
                </AlertDialogCancel>
                <AlertDialogAction>Yes, sign out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Destructive" layout="grid2" span={2}>
        <div className="min-w-0">
          <Example trigger="Delete report">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <IconTrash />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete this report?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the report and its saved views.{" "}
                  <a href="#">Learn about data retention</a>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Deactivate account">
            <AlertDialogContent>
              <AlertDialogHeader className="sm:grid-cols-[auto_1fr] sm:items-start sm:text-left">
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <IconUserOff />
                </AlertDialogMedia>
                <AlertDialogTitle>Deactivate this account?</AlertDialogTitle>
                <AlertDialogDescription className="sm:col-start-2">
                  Jordan Lee will lose access immediately. Their activity history will remain available to
                  workspace admins.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Deactivate</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Transfer ownership</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Transfer workspace ownership?</AlertDialogTitle>
                <AlertDialogDescription>
                  Type Northwind below to confirm. The new owner will control billing and member access.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                aria-label="Workspace name"
                autoComplete="off"
                placeholder="Northwind"
                value={confirmation}
                onChange={(event) => setConfirmation(event.currentTarget.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmation("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={confirmation.trim().toLowerCase() !== "northwind"}
                  onClick={() => setConfirmation("")}
                >
                  Transfer ownership
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="min-w-0">
          <AlertDialog
            open={deleteOpen}
            onOpenChange={(open) => {
              if (!deleting) setDeleteOpen(open);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  The project and its saved reports will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={deleting}
                  onClick={(event) => {
                    event.preventDefault();
                    setDeleting(true);
                    window.setTimeout(() => {
                      setDeleting(false);
                      setDeleteOpen(false);
                    }, 600);
                  }}
                >
                  {deleting ? "Deleting…" : "Delete project"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentPreview>

      <ComponentPreview title="In Context" layout="stack" span={2}>
        <div className="w-full min-w-0 max-w-lg">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open workspace settings</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Workspace settings</DialogTitle>
                <DialogDescription>Manage workspace access and ownership.</DialogDescription>
              </DialogHeader>
              <AlertDialog open={nestedOpen} onOpenChange={setNestedOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Remove workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this workspace?</AlertDialogTitle>
                    <AlertDialogDescription>Members will lose access to its projects.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep workspace</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => setNestedOpen(false)}>
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogContent>
          </Dialog>
        </div>
        <Frame className="w-full min-w-0 max-w-lg">
          <FramePanel>
            <FrameHeader>
              <FrameTitle>Report editor</FrameTitle>
              <FrameDescription>Draft changes have not been saved.</FrameDescription>
            </FrameHeader>
            <FrameFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Navigate away</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your edits to the quarterly report will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={skipUnsavedPrompt}
                      onCheckedChange={(value) => setSkipUnsavedPrompt(value === true)}
                    />
                    Don’t ask again
                  </label>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Stay here</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Discard changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FrameFooter>
          </FramePanel>
        </Frame>
      </ComponentPreview>

      <ComponentPreview title="Notice" layout="grid3" span={2}>
        <div className="min-w-0">
          <Example trigger="Show completion">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-success/10 text-success-foreground">
                  <IconCircleCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Import completed</AlertDialogTitle>
                <AlertDialogDescription>All 128 records were imported successfully.</AlertDialogDescription>
              </AlertDialogHeader>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={saved} onCheckedChange={(value) => setSaved(value === true)} />
                Don’t show this confirmation again
              </label>
              <AlertDialogFooter>
                <AlertDialogCancel>Done</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="View receipt">
            <AlertDialogContent className="gap-5">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-success/10 text-success-foreground">
                  <IconCircleCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Registration complete</AlertDialogTitle>
                <AlertDialogDescription>Your workspace is ready.</AlertDialogDescription>
              </AlertDialogHeader>
              <dl className="grid grid-cols-[1fr_auto] gap-2 text-sm">
                <dt className="text-muted-foreground">Workspace</dt>
                <dd>Northwind</dd>
                <dt className="text-muted-foreground">Plan</dt>
                <dd>Business</dd>
                <dt className="text-muted-foreground">Members</dt>
                <dd>12</dd>
                <dt className="text-muted-foreground">Reference</dt>
                <dd>WS-2048</dd>
                <dt className="text-muted-foreground">Status</dt>
                <dd>Active</dd>
              </dl>
              <AlertDialogFooter className="sm:justify-stretch">
                <AlertDialogCancel className="w-full">Back to workspace</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Review update">
            <AlertDialogContent className="overflow-hidden p-0">
              <AlertDialogHeader className="p-5">
                <AlertDialogMedia>
                  <IconDeviceDesktop />
                </AlertDialogMedia>
                <AlertDialogTitle>Update available</AlertDialogTitle>
                <AlertDialogDescription>A new version is ready to install.</AlertDialogDescription>
                <Badge variant="secondary" className="mt-2 w-fit">
                  Version 4.8.2
                </Badge>
              </AlertDialogHeader>
              <div className="border-t bg-muted/50 p-5">
                <p className="mb-4 text-sm text-muted-foreground">
                  The update includes security improvements and requires restarting the console.
                </p>
                <AlertDialogFooter className="-mx-5 -mb-5">
                  <AlertDialogCancel>Later</AlertDialogCancel>
                  <AlertDialogAction>Restart now</AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Review subscription">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <IconBellRinging />
                </AlertDialogMedia>
                <AlertDialogTitle>Payment method expired</AlertDialogTitle>
                <AlertDialogDescription>
                  Your subscription expires soon. Update payment details to keep reports and integrations
                  active.
                </AlertDialogDescription>
                <Badge variant="destructive" className="mt-2 w-fit">
                  Expires in 2 days
                </Badge>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Dismiss</AlertDialogCancel>
                <AlertDialogAction>Update payment</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Run security audit">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-primary/10 text-primary">
                  <IconShieldCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Security review</AlertDialogTitle>
                <AlertDialogDescription>
                  Review the checks before applying the recommended changes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  Two-factor authentication <Badge variant="secondary">Done</Badge>
                </li>
                <li className="flex justify-between">
                  Admin access review <Badge variant="outline">Pending</Badge>
                </li>
                <li className="flex justify-between">
                  API key rotation <Badge variant="secondary">Done</Badge>
                </li>
              </ul>
              <AlertDialogFooter className="flex-col sm:flex-col">
                <AlertDialogAction className="w-full">Apply recommendations</AlertDialogAction>
                <AlertDialogCancel className="w-full">Review later</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
