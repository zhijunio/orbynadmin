"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/base/dialog/alert-dialog";
import { buttonVariants } from "@/components/base/buttons/button";
import { cn } from "@/utils/cn";

/**
 * Controlled delete-confirmation dialog. Drive `open`/`onOpenChange` from the
 * caller (e.g. a dropdown menu item sets open=true). `onConfirm` runs the
 * actual removal; feedback belongs to the caller because it knows whether
 * removal completed successfully.
 */
export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  name = "item",
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  name?: string;
  description?: string;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              `This will permanently remove ${name}. This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={() => {
              onConfirm();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
