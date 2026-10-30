"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Plus as IconPlus, Pencil as IconPencil, Trash as IconTrash } from "lucide-react";

import { PageHeader } from "@/components/feature/layout/PageHeader";
import { DataTable, SortableHeader } from "@/components/feature/table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  contactInputSchema,
  contactRoles,
  contactStatuses,
  type Contact,
  type ContactInput,
} from "@/app/[locale]/(app)/examples/data-table/api-crud/contacts-data";

const EMPTY_CONTACT: ContactInput = {
  name: "",
  email: "",
  role: "Viewer",
  status: "Invited",
};

const contactsEndpoint = "/examples/data-table/api-crud/contacts";

async function readError(response: Response) {
  const body = await response.json().catch(() => null) as { error?: unknown } | null;
  return typeof body?.error === "string" ? body.error : "The request failed. Please try again.";
}

export function ApiCrudExample() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadContacts = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(contactsEndpoint, { cache: "no-store", signal });
      if (!response.ok) throw new Error(await readError(response));
      const body: { data: Contact[] } = await response.json();
      setContacts(body.data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setLoadError(error instanceof Error ? error.message : "Unable to load contacts.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  const reloadContacts = () => {
    setLoading(true);
    setLoadError(null);
    void loadContacts();
  };

  useEffect(() => {
    const controller = new AbortController();
    const request = window.setTimeout(() => void loadContacts(controller.signal), 0);
    return () => {
      window.clearTimeout(request);
      controller.abort();
    };
  }, [loadContacts]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setEditorKey((key) => key + 1);
    setEditorOpen(true);
  }, []);

  const openEdit = useCallback((contact: Contact) => {
    setEditing(contact);
    setEditorKey((key) => key + 1);
    setEditorOpen(true);
  }, []);

  const saveContact = async (input: ContactInput) => {
    const url = editing
      ? `${contactsEndpoint}/${encodeURIComponent(editing.id)}`
      : contactsEndpoint;
    const response = await fetch(url, {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error(await readError(response));
    const body: { data: Contact } = await response.json();
    setContacts((previous) => editing
      ? previous.map((contact) => contact.id === body.data.id ? body.data : contact)
      : [body.data, ...previous]
    );
    setEditorOpen(false);
    toast.success(editing ? "Contact updated" : "Contact created");
  };

  const deleteContact = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`${contactsEndpoint}/${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await readError(response));
      setContacts((previous) => previous.filter((contact) => contact.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success("Contact deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete contact.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = useMemo<ColumnDef<Contact>[]>(() => [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <SortableHeader column={column} title="Role" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <Badge variant="secondary" className={row.original.status === "Active"
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <SortableHeader column={column} title="Added" />,
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" aria-label={`Edit ${row.original.name}`} onClick={() => openEdit(row.original)}>
            <IconPencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive" aria-label={`Delete ${row.original.name}`} onClick={() => setDeleteTarget(row.original)}>
            <IconTrash className="size-4" />
          </Button>
        </div>
      ),
    },
  ], [openEdit]);

  if (loadError && contacts.length === 0) {
    return (
      <div className="space-y-5">
        <PageHeader title="API CRUD Example" description="A typed mock REST API with create, read, update, and delete flows." />
        <Card><CardContent className="py-8 text-center">
          <p className="font-medium">Could not load contacts</p>
          <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
          <Button className="mt-4" onClick={reloadContacts}>Try again</Button>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="API CRUD Example" description="A typed mock REST API with validation, loading, error, and mutation states.">
        <Button onClick={openCreate}><IconPlus className="size-4" /> Add contact</Button>
      </PageHeader>
      <Card><CardContent className="flex flex-col gap-2 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Requests use <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">{contactsEndpoint}</code>.</span>
        <span>Mock data is process-local and may reset on server restarts or serverless cold starts.</span>
      </CardContent></Card>

      {loading ? (
        <div className="space-y-3 rounded-lg border p-4" aria-label="Loading contacts">
          {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-10 w-full" />)}
        </div>
      ) : loadError ? (
        <Card><CardContent className="flex items-center justify-between gap-4 py-4">
          <p className="text-sm text-destructive">Refresh failed: {loadError}</p>
          <Button variant="outline" size="sm" onClick={reloadContacts}>Retry</Button>
        </CardContent></Card>
      ) : (
        <DataTable
          columns={columns}
          data={contacts}
          searchKey="name"
          searchPlaceholder="Search contacts…"
        />
      )}

      <ContactEditorDialog
        key={editorKey}
        open={editorOpen}
        contact={editing}
        onOpenChange={setEditorOpen}
        onSave={saveContact}
      />
      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open && !deleting) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name ?? "contact"}?</AlertDialogTitle>
            <AlertDialogDescription>This removes the contact from the mock API. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" disabled={deleting} onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" disabled={deleting} onClick={() => void deleteContact()}>{deleting ? "Deleting…" : "Delete contact"}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ContactEditorDialog({
  open,
  contact,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  contact: Contact | null;
  onOpenChange: (open: boolean) => void;
  onSave: (input: ContactInput) => Promise<void>;
}) {
  const [form, setForm] = useState<ContactInput>(contact ?? EMPTY_CONTACT);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const setField = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactInputSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactInput | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);
    setSubmitError(null);
    try {
      await onSave(result.data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to save contact.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>{contact ? "Edit contact" : "Add contact"}</DialogTitle>
            <DialogDescription>Validate the input, then save it through the REST endpoint.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <FormField id="contact-name" label="Name" error={errors.name}>
              <Input id="contact-name" value={form.name} onChange={(event) => setField("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
            </FormField>
            <FormField id="contact-email" label="Email" error={errors.email}>
              <Input id="contact-email" type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
            </FormField>
            <FormField id="contact-role" label="Role" error={errors.role}>
              <Select value={form.role} onValueChange={(value) => setField("role", value as ContactInput["role"])}>
                <SelectTrigger id="contact-role" aria-invalid={!!errors.role} aria-describedby={errors.role ? "contact-role-error" : undefined}><SelectValue /></SelectTrigger>
                <SelectContent>{contactRoles.map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent>
              </Select>
            </FormField>
            <FormField id="contact-status" label="Status" error={errors.status}>
              <Select value={form.status} onValueChange={(value) => setField("status", value as ContactInput["status"])}>
                <SelectTrigger id="contact-status" aria-invalid={!!errors.status} aria-describedby={errors.status ? "contact-status-error" : undefined}><SelectValue /></SelectTrigger>
                <SelectContent>{contactStatuses.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent>
              </Select>
            </FormField>
            {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving…" : contact ? "Save contact" : "Create contact"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
