"use client";

import { useState } from "react";
import { IconArrowRight, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

type Invitee = { id: number; email: string; role: string };
const progress = [{ title: "Members", help: "Add emails and roles." }, { title: "Delivery", help: "Set message and expiry." }, { title: "Review", help: "Send the invite batch." }];
export function TeamInvitationsWizard() {
  const [step, setStep] = useState(1);
  const [invitees, setInvitees] = useState<Invitee[]>([{ id: 1, email: "mira@northstar.studio", role: "Editor" }, { id: 2, email: "jon@northstar.studio", role: "Viewer" }, { id: 3, email: "ari@northstar.studio", role: "Viewer" }]);
  const [sender, setSender] = useState("Mara Chen");
  const [expiry, setExpiry] = useState("7 days");
  const [message, setMessage] = useState("Welcome to the workspace. You can get started as soon as you accept this invitation.");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const validCount = invitees.filter((invite) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email)).length;

  function advance() {
    if (step === 1 && (invitees.length === 0 || validCount !== invitees.length)) return setError("Add at least one valid email address.");
    setError("");
    if (step < 3) setStep((current) => current + 1);
    else setSent(true);
  }

  return <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-card">
    <header className="px-4 py-3"><h3 className="text-sm font-semibold">Team Invitations</h3><p className="text-sm text-muted-foreground">Prepare workspace access before the invites go out.</p></header>
    <nav aria-label="Invitation progress" className="grid grid-cols-3 border-y px-4 py-4">{progress.map((item, index) => <div key={item.title} className="relative flex flex-col items-center text-center"><div className="absolute left-1/2 top-3 h-px w-full bg-border last:hidden" /><span className={`relative flex size-6 items-center justify-center rounded-full border text-xs ${index + 1 === step ? "border-foreground bg-muted" : index + 1 < step ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}>{index + 1 < step ? <IconCheck className="size-3.5" /> : index + 1}</span><span className="mt-1.5 text-sm font-medium">{item.title}</span><span className="text-xs text-muted-foreground">{item.help}</span></div>)}</nav>
    <div className="m-1 rounded-xl border bg-background p-4 sm:p-5">
      {step === 1 && <><div className="mb-4"><h4 className="text-sm font-semibold">Invite Members</h4><p className="text-sm text-muted-foreground">Enter each teammate’s email and starting role.</p></div><div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-muted/30 text-xs text-muted-foreground"><tr><th className="px-3 py-2 font-medium">Email</th><th className="w-52 px-3 py-2 font-medium">Role</th><th className="w-28 px-3 py-2 font-medium">Status</th><th className="w-10" /></tr></thead><tbody>{invitees.map((invite) => { const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email); return <tr key={invite.id} className="border-t"><td className="p-2"><Input aria-label="Invite email" type="email" value={invite.email} onChange={(event) => update(invite.id, { email: event.target.value })} /></td><td className="p-2"><Select value={invite.role} onValueChange={(role) => update(invite.id, { role })}><SelectTrigger aria-label={`Role for ${invite.email}`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Editor">Editor</SelectItem><SelectItem value="Viewer">Viewer</SelectItem><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Billing">Billing</SelectItem></SelectContent></Select></td><td className="px-3">{valid ? <Badge variant="success-light">Ready</Badge> : <Badge variant="destructive-light">Invalid email</Badge>}</td><td className="pr-2"><Button aria-label={`Remove ${invite.email}`} variant="ghost" size="icon-sm" onClick={() => setInvitees((rows) => rows.filter((row) => row.id !== invite.id))}><IconTrash /></Button></td></tr>; })}</tbody></table></div><div className="mt-3 flex justify-end"><Button variant="outline" size="sm" onClick={() => setInvitees((rows) => [...rows, { id: Math.max(0, ...rows.map((row) => row.id)) + 1, email: "", role: "Viewer" }])}><IconPlus />Add member</Button></div></>}
      {step === 2 && <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-4"><div><h4 className="text-sm font-semibold">Delivery settings</h4><p className="text-sm text-muted-foreground">Customize the invitation message and access window.</p></div><label className="space-y-1.5 text-sm font-medium">Sender name<Input value={sender} onChange={(event) => setSender(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">Invitation expires<Select value={expiry} onValueChange={setExpiry}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{["1 day", "7 days", "14 days", "30 days"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></label><label className="space-y-1.5 text-sm font-medium">Personal message<textarea className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50" value={message} onChange={(event) => setMessage(event.target.value)} /></label></div><div className="rounded-lg bg-muted/30 p-4"><p className="text-sm font-medium">Invitation preview</p><div className="mt-3 rounded-lg border bg-card p-4 text-sm"><p className="font-semibold">You’re invited to join Northstar Studio</p><p className="mt-2 text-muted-foreground">{message}</p><p className="mt-4 text-xs text-muted-foreground">Sent by {sender} · Expires in {expiry}</p></div></div></div>}
      {step === 3 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Review invitations</h4><p className="text-sm text-muted-foreground">Check recipients and access before sending.</p></div><div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><thead className="bg-muted/30 text-xs text-muted-foreground"><tr><th className="px-3 py-2 font-medium">Recipient</th><th className="px-3 py-2 font-medium">Role</th><th className="px-3 py-2 font-medium">Access</th></tr></thead><tbody>{invitees.map((invite) => <tr key={invite.id} className="border-t"><td className="px-3 py-2.5">{invite.email}</td><td className="px-3 py-2.5">{invite.role}</td><td className="px-3 py-2.5"><Badge variant={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email) ? "success-light" : "destructive-light"}>{/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email) ? "Ready" : "Invalid email"}</Badge></td></tr>)}</tbody></table></div><div className="grid gap-3 sm:grid-cols-3">{[["Recipients", `${validCount} valid`], ["Access", "Workspace members"], ["Expiry", expiry]].map(([label, value]) => <div key={label} className="rounded-lg bg-muted/30 p-3"><span className="block text-xs text-muted-foreground">{label}</span><span className="text-sm font-medium">{value}</span></div>)}</div></div>}
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}{sent && <p role="status" className="mt-3 text-sm text-primary">{validCount} invitations queued.</p>}
    </div>
    <footer className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5"><p className="text-sm text-muted-foreground">Step {step} of 3: {progress[step - 1].help}</p><div className="flex gap-2"><Button variant="outline" disabled={step === 1 || sent} onClick={() => { setError(""); setStep((current) => current - 1); }}>Previous</Button><Button disabled={sent} onClick={advance}>{sent ? "Invitations queued" : step === 3 ? "Send invitations" : "Continue"}<IconArrowRight /></Button></div></footer>
  </section>;

  function update(id: number, patch: Partial<Invitee>) { setInvitees((rows) => rows.map((row) => row.id === id ? { ...row, ...patch } : row)); }
}
