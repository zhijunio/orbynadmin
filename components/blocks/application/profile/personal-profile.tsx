"use client";

import { useState } from "react";
import { IconInfoCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { PhoneInput } from "@/components/ui/phone-input/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { demoAvatarUrl } from "@/utils/demo-avatar";

export function PersonalProfile() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [avatar, setAvatar] = useState(demoAvatarUrl("shandc"));
  const [phone, setPhone] = useState<string | undefined>("+12065551243");
  const [email, setEmail] = useState("alex@nextrose.io");
  const [newEmail, setNewEmail] = useState("");
  const [notice, setNotice] = useState("");

  function reset() {
    setEmail("alex@nextrose.io"); setPhone("+12065551243"); setNotice("Profile changes reset.");
  }

  return <TooltipProvider delayDuration={0}><div className="mx-auto w-full max-w-5xl space-y-5">
    <header><h2 className="text-xl font-semibold">Profile</h2><p className="mt-1 text-sm text-muted-foreground">Manage the identity and regional details shared across your workspace memberships.</p></header>
    {alertVisible && <Alert variant="warning" className="min-h-16 items-center gap-x-3"><IconInfoCircle /><div className="min-w-0"><AlertTitle>Profile updates are shared</AlertTitle><AlertDescription>Changes sync to mentions, approvals, and people directories in every workspace you join.</AlertDescription></div><AlertAction className="top-1/2 right-3 flex -translate-y-1/2 gap-2"><Button variant="ghost" size="sm" onClick={() => setAlertVisible(false)}>Dismiss</Button><Button size="sm" onClick={() => setDetailsOpen(true)}>Review Details</Button></AlertAction></Alert>}
    <section className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-4 p-5"><Avatar className="size-16"><AvatarImage src={avatar} alt="Shandc profile" /><AvatarFallback>SC</AvatarFallback></Avatar><div className="min-w-48 flex-1"><h3 className="text-sm font-semibold">Profile Picture</h3><p className="text-sm text-muted-foreground">We only support PNGs, JPEGs and GIFs under 10MB.</p><div className="mt-2 flex gap-2"><label className="cursor-pointer"><input className="sr-only" type="file" accept="image/png,image/jpeg,image/gif" onChange={(event) => { const file = event.target.files?.[0]; if (file && file.size <= 10 * 1024 * 1024) setAvatar(URL.createObjectURL(file)); else if (file) setNotice("Choose an image under 10MB."); }} /><span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"><IconUpload className="size-4" />Upload</span></label><Button variant="ghost" size="icon-sm" aria-label="Remove profile picture" onClick={() => setAvatar("")}><IconTrash /></Button></div></div></div>
      <div className="border-t p-5"><SectionHeading title="Basic Details" description="Keep your contact and identity fields current." /><div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2"><ProfileField label="First Name"><Input defaultValue="Shandc" /></ProfileField><ProfileField label="Last Name"><Input placeholder="Optional" /></ProfileField><ProfileField label={<span className="flex flex-wrap items-center gap-2">Primary Email Address <ProfileHint label="Primary email">Used for sign-in, recovery, and workspace notices.</ProfileHint><Badge variant="success-light" size="sm">Verified</Badge></span>} hint="Used for sign-in, recovery, and workspace notices."><div className="flex gap-2"><Input aria-label="Primary Email Address" value={email} readOnly /><Button variant="outline" size="sm" onClick={() => setEmailOpen(true)}>Edit</Button></div></ProfileField><ProfileField label={<span className="flex items-center gap-1.5">Preferred Name<ProfileHint label="Preferred name">Shown in mentions and activity across your workspaces.</ProfileHint></span>}><Input defaultValue="Shandc" /></ProfileField><ProfileField label={<span className="flex items-center gap-1.5">Username<ProfileHint label="Username">Used in profile links and workspace mentions.</ProfileHint></span>}><InputGroupPrefix prefix="@" defaultValue="shandc" /></ProfileField><ProfileField label="Role"><Select defaultValue="Product Operations"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Product Operations", "Product Designer", "Software Engineer"].map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent></Select></ProfileField><ProfileField label="Phone Number" hint="Used only for urgent verification and recovery."><PhoneInput value={phone} onValueChange={setPhone} defaultCountry="US" /></ProfileField><ProfileField label="Website"><InputGroupPrefix prefix="https://" defaultValue="shandc.dev" /></ProfileField></div></div>
      <div className="border-t p-5"><SectionHeading title="Regional Preferences" description="Choose how time and scheduling fields appear." /><div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2"><ProfileSelect label="Preferred Timezone" value="(GMT-5) New York" options={["(GMT-5) New York", "(GMT+0) London", "(GMT+9) Tokyo"]} /><ProfileSelect label="Start Week On" value="Monday" options={["Monday", "Sunday"]} /><ProfileSelect label="Language" value="English" options={["English", "French", "German"]} /><ProfileSelect label="Time Format" value="24-hour" options={["24-hour", "12-hour"]} /></div></div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3"><p className="text-sm text-muted-foreground">Save once to update your shared profile across every workspace.</p><div className="flex gap-2"><Button variant="outline" onClick={reset}>Reset</Button><Button onClick={() => setNotice("Profile changes saved.")}>Save Changes</Button></div></footer>
    </section>
    {notice && <p role="status" className="text-sm text-primary">{notice}</p>}
    <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}><DialogContent><DialogHeader><DialogTitle>Shared profile details</DialogTitle><DialogDescription>Your name, profile photo, preferred name, role, and contact details appear throughout workspaces you join.</DialogDescription></DialogHeader><div className="rounded-lg border p-3 text-sm"><p><strong>Primary email:</strong> {email}</p><p className="mt-2"><strong>Phone:</strong> {phone || "Not set"}</p></div><DialogFooter><Button onClick={() => setDetailsOpen(false)}>Done</Button></DialogFooter></DialogContent></Dialog>
    <Dialog open={emailOpen} onOpenChange={setEmailOpen}><DialogContent><DialogHeader><DialogTitle>Update primary email</DialogTitle><DialogDescription>We’ll send a verification link before changing your sign-in address.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm font-medium">New email address<Input type="email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="name@company.com" /></label><DialogFooter><Button variant="outline" onClick={() => setEmailOpen(false)}>Cancel</Button><Button disabled={!newEmail.includes("@")} onClick={() => { setEmail(newEmail); setNewEmail(""); setEmailOpen(false); setNotice("A verification link was sent to your new email address."); }}>Send verification</Button></DialogFooter></DialogContent></Dialog>
  </div></TooltipProvider>;
}

function SectionHeading({ title, description }: { title: string; description: string }) { return <div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-0.5 text-sm text-muted-foreground">{description}</p></div>; }
function ProfileField({ label, hint, children }: { label: React.ReactNode; hint?: string; children: React.ReactNode }) { return <label className="grid min-w-0 gap-1.5 text-sm font-medium">{label}{children}{hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}</label>; }
function ProfileSelect({ label, value, options }: { label: string; value: string; options: string[] }) { return <label className="grid gap-1.5 text-sm font-medium">{label}<Select defaultValue={value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></label>; }
function InputGroupPrefix({ prefix, defaultValue }: { prefix: string; defaultValue: string }) { return <span className="flex h-9 overflow-hidden rounded-lg border bg-background"><span className="grid place-items-center border-r px-3 text-sm text-muted-foreground">{prefix}</span><Input className="h-full border-0 shadow-none focus-visible:ring-0" defaultValue={defaultValue} /></span>; }
function ProfileHint({ label, children }: { label: string; children: React.ReactNode }) { return <Tooltip><TooltipTrigger aria-label={`${label} information`} className="inline-flex rounded-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"><IconInfoCircle className="size-3.5" /></TooltipTrigger><TooltipContent>{children}</TooltipContent></Tooltip>; }
