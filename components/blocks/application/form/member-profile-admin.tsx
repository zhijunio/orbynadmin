"use client";

import { useRef, useState } from "react";
import {
  IconActivity, IconArrowLeft, IconAt, IconBuilding, IconCalendarEvent, IconCheck,
  IconCircleCheck, IconCopy, IconDotsVertical, IconEye, IconGlobe, IconKey,
  IconLock, IconMail, IconPlus, IconRefresh, IconShield,
  IconUpload, IconUser,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input/input-group";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Progress } from "@/components/ui/progress/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Profile = { firstName: string; lastName: string; handle: string; role: string; country: string; locale: string; timeZone: string; bio: string; visibility: string };
type EmailEntry = { id: string; address: string; description: string; state: string; age: string; primary: boolean };
type AccountEntry = { id: string; name: string; description: string; state: string; age: string; icon: "key" | "globe"; managed?: boolean };

const initialProfile: Profile = {
  firstName: "Iris", lastName: "Kwon", handle: "iris-kwon", role: "product-ops", country: "CA", locale: "en-CA", timeZone: "America/Toronto",
  bio: "Coordinates launch approvals, customer handoffs, and product readiness across the Atlas Lane workspace.", visibility: "workspace",
};
const roleOptions = [["product-ops", "Product operations lead"], ["admin", "Administrator"], ["designer", "Product designer"], ["engineer", "Software engineer"], ["analyst", "Operations analyst"]] as const;
const countryOptions = [["CA", "🇨🇦 Canada"], ["US", "🇺🇸 United States"], ["GB", "🇬🇧 United Kingdom"], ["AU", "🇦🇺 Australia"]] as const;
const localeOptions = [["en-CA", "English (Canada)"], ["en-US", "English (United States)"], ["fr-CA", "Français (Canada)"], ["en-GB", "English (United Kingdom)"]] as const;
const timeZoneOptions = [["America/Toronto", "Eastern Time (UTC-5)"], ["America/Vancouver", "Pacific Time (UTC-8)"], ["America/Chicago", "Central Time (UTC-6)"], ["Europe/London", "London (UTC+0)"]] as const;
const activityCounts: Record<string, number> = {
  "2025-12-28": 7, "2026-1-28": 3, "2026-2-9": 3, "2026-2-28": 3, "2026-3-5": 8, "2026-3-11": 8, "2026-3-24": 3, "2026-3-26": 14, "2026-3-27": 14, "2026-3-28": 14, "2026-3-29": 14, "2026-3-31": 3,
  "2026-4-22": 14, "2026-5-1": 3, "2026-5-6": 3, "2026-5-11": 7, "2026-5-14": 14, "2026-5-15": 14, "2026-5-16": 14, "2026-5-23": 7, "2026-6-1": 3, "2026-6-18": 3, "2026-7-2": 3, "2026-7-8": 14, "2026-7-17": 8, "2026-7-31": 3,
  "2026-8-2": 3, "2026-8-4": 8, "2026-8-26": 14, "2026-9-2": 3, "2026-9-12": 3, "2026-9-22": 7, "2026-10-3": 3, "2026-10-16": 7, "2026-10-25": 3, "2026-11-3": 3, "2026-11-28": 8, "2026-12-4": 3, "2026-12-7": 3,
};
const emailSeed: EmailEntry[] = [
  { id: "primary", address: "iris.kwon@atlaslane.dev", description: "Primary sign-in, recovery, and workspace notification email.", state: "Primary", age: "Added 3h ago", primary: true },
  { id: "launches", address: "launches@atlaslane.dev", description: "Shared launch review alias for customer-facing updates.", state: "", age: "Linked 2d ago", primary: false },
];
const accountSeed: AccountEntry[] = [
  { id: "sso", name: "Atlas Lane SSO", description: "SAML identity source with profile sync enabled.", state: "Managed", age: "Synced 12m ago", icon: "key", managed: true },
  { id: "docs", name: "Customer docs portal", description: "Public author profile for changelogs and launch notes.", state: "Visible", age: "", icon: "globe" },
];

function SelectField({ label, value, onValueChange, options, disabled }: { label: string; value: string; onValueChange: (value: string) => void; options: readonly (readonly [string, string])[]; disabled?: boolean }) {
  return <Select value={value} onValueChange={onValueChange} disabled={disabled}><SelectTrigger aria-label={label} className="w-full"><SelectValue>{options.find(([key]) => key === value)?.[1]}</SelectValue></SelectTrigger><SelectContent>{options.map(([key, text]) => <SelectItem key={key} value={key}>{text}</SelectItem>)}</SelectContent></Select>;
}

function Info({ label, text }: { label: string; text: string }) {
  return <Tooltip><TooltipTrigger aria-label={label} className="inline-flex text-muted-foreground"><IconEye className="size-3.5" /></TooltipTrigger><TooltipContent>{text}</TooltipContent></Tooltip>;
}

function ActivityHeatmap({ selectedYear, selectedDate, onDateChange }: { selectedYear: string; selectedDate: string; onDateChange: (date: string) => void }) {
  const year = Number(selectedYear);
  const yearStart = new Date(year, 0, 1);
  const gridStart = new Date(year, 0, 1 - yearStart.getDay());
  const daysInYear = (new Date(year + 1, 0, 1).getTime() - gridStart.getTime()) / 86_400_000;
  const weekCount = Math.ceil(daysInYear / 7);
  const dates = Array.from({ length: daysInYear }, (_, index) => new Date(gridStart.getTime() + index * 86_400_000));
  const monthStarts = Array.from({ length: 12 }, (_, month) => {
    const first = new Date(year, month, 1);
    return { name: first.toLocaleDateString("en-US", { month: "short" }), week: Math.floor((first.getTime() - gridStart.getTime()) / (7 * 86_400_000)) + 1 };
  });
  const activeDays = year === 2026 ? 41 : dates.filter((date) => date.getFullYear() === year && activityCounts[`${year}-${date.getMonth() + 1}-${date.getDate()}`]).length;
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return <>
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <Badge variant="outline">{activeDays} active days</Badge><Badge variant="outline">{selectedDate}</Badge><Badge variant="warning-light"><IconRefresh className="size-3" />Syncing</Badge><Badge variant="success-light">Synced 20m ago</Badge>
    </div>
    <div className="overflow-x-auto pb-1">
      <div className="min-w-[700px]">
        <div className="grid grid-cols-[12px_minmax(0,1fr)] gap-1.5">
          <div className="grid grid-rows-7 gap-[3px] text-[9px] leading-[10px] text-muted-foreground">{weekdays.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))` }}>
            {dates.map((date, index) => {
              const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
              const count = activityCounts[key] ?? 0;
              const color = count === 0 ? "bg-muted" : count <= 3 ? "bg-muted-foreground/30" : count <= 8 ? "bg-muted-foreground/55" : "bg-foreground";
              const label = `${date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}: ${count} ${count === 1 ? "event" : "events"}`;
              return <button key={index} type="button" aria-label={label} title={label} onClick={() => onDateChange(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))} className={`size-[10px] rounded-full ${color}`} />;
            })}
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-[12px_minmax(0,1fr)] gap-1.5">
          <span />
          <div className="grid h-5 border-b-4 border-muted-foreground/25" style={{ gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))` }}>
            {monthStarts.map(({ name, week }, index) => <span key={name} style={{ gridColumn: `${week} / span ${monthStarts[index + 1] ? monthStarts[index + 1].week - week : weekCount - week + 1}` }} className="text-[10px] text-muted-foreground">{name}</span>)}
          </div>
        </div>
      </div>
    </div>
  </>;
}

function ActivitySection({ selectedYear, selectedDate, onYearChange, onDateChange }: { selectedYear: string; selectedDate: string; onYearChange: (value: string) => void; onDateChange: (date: string) => void }) {
  return <section className="space-y-2.5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className="text-sm font-semibold">User Activity</h3><p className="text-sm text-muted-foreground">A lightweight trace of recent profile and workspace activity.</p></div><div className="w-[108px] shrink-0"><SelectField label="Activity year" value={selectedYear} onValueChange={onYearChange} options={[["2026", "2026"], ["2025", "2025"], ["2024", "2024"]]} /></div></div>
    <Card className="shadow-none"><CardContent className="p-3"><ActivityHeatmap selectedYear={selectedYear} selectedDate={selectedDate} onDateChange={onDateChange} /></CardContent></Card>
  </section>;
}

function ProfileField({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return <div className="grid gap-3 border-b py-4 last:border-b-0 sm:grid-cols-[minmax(0,36%)_minmax(0,1fr)] sm:gap-5"><div><p className="text-sm font-medium">{label}</p><p className="mt-0.5 text-sm leading-5 text-muted-foreground">{description}</p></div><div className="min-w-0">{children}</div></div>;
}

function AuditRail({ notify }: { notify: (message: string) => void }) {
  const auditRows = [
    { label: "User ID", value: "usr_8R4m...KX92", hint: "Stable identifier", icon: IconUser, copy: true },
    { label: "Primary Email", value: "iris.kwon@atlaslane.dev", hint: "Verified contact", icon: IconMail, copy: true },
    { label: "User Since", value: "March 18, 2026", hint: "Created by admin invite", icon: IconCalendarEvent },
    { label: "Profile Updated", value: "Updated 3h ago", hint: "Identity sync complete", icon: IconActivity },
  ];
  async function copy(value: string, label: string) {
    try { await navigator.clipboard.writeText(value); notify(`${label} copied.`); }
    catch { notify("Clipboard access is unavailable in this preview."); }
  }
  return <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
    <Card className="gap-0 shadow-none"><CardHeader className="border-b px-4 py-3"><CardTitle className="text-sm">Audit Rail</CardTitle><p className="text-sm text-muted-foreground">Stable identifiers and profile timestamps.</p></CardHeader><CardContent className="p-0">{auditRows.map(({ label, value, hint, icon: Icon, copy: canCopy }) => <div key={label} className="border-b px-4 py-3 last:border-b-0"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="size-4 text-foreground" /><span>{label}</span><Info label={`${label}: ${hint}`} text={hint} /></div><div className="mt-1 flex items-center justify-between gap-2 pl-6"><span className="min-w-0 truncate text-sm font-medium">{value}</span>{canCopy && <Button size="icon-xs" variant="ghost" aria-label={`Copy ${label}`} onClick={() => copy(value, label)}><IconCopy /></Button>}</div></div>)}</CardContent></Card>
    <Card className="gap-0 shadow-none"><CardHeader className="border-b px-4 py-3"><CardTitle className="text-sm">Profile Health</CardTitle><p className="text-sm text-muted-foreground">Identity quality and access readiness.</p></CardHeader><CardContent className="space-y-3 p-4"><div className="flex justify-between text-sm"><span>Completion</span><span className="font-medium">92%</span></div><Progress value={92} className="bg-muted" /><div className="space-y-2 pt-1 text-sm"><div className="flex items-center justify-between gap-2"><span className="text-muted-foreground">Identity Sync</span><Badge variant="warning-light" size="sm"><IconRefresh />Syncing</Badge></div><div className="flex justify-between gap-2"><span className="text-muted-foreground">Access Review</span><span className="font-medium">Due May 02</span></div><div className="flex justify-between gap-2"><span className="text-muted-foreground">Recovery</span><span className="font-medium">Configured</span></div></div></CardContent></Card>
  </aside>;
}

function SectionHeading({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex items-end justify-between gap-3"><div><h3 className="text-sm font-semibold">{title}</h3><p className="text-sm text-muted-foreground">{description}</p></div>{action}</div>;
}

function EmailRow({ email, onAction, notify }: { email: EmailEntry; onAction: (action: string) => void; notify: (message: string) => void }) {
  return <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3 last:border-b-0"><IconMail className="size-4 shrink-0 text-muted-foreground" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-1.5"><span className="text-sm font-medium">{email.address}</span>{email.primary && <Badge variant="success-light" size="sm">Primary</Badge>}{email.primary && <IconCircleCheck className="size-3.5 text-success" />}</div><p className="mt-0.5 text-sm text-muted-foreground">{email.description}</p></div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">{email.age}</span><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon-sm" variant="ghost" aria-label={`Open actions for ${email.address}`}><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{!email.primary && <DropdownMenuItem onClick={() => onAction(`primary:${email.id}`)}>Set as primary</DropdownMenuItem>}<DropdownMenuItem onClick={() => { onAction(`verify:${email.id}`); notify(`Verification sent to ${email.address}.`); }}>Send verification</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onClick={() => onAction(`remove:${email.id}`)} disabled={email.primary}>Remove email</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div>;
}

function AccountRow({ account, onAction }: { account: AccountEntry; onAction: (action: string) => void }) {
  const Icon = account.icon === "key" ? IconKey : IconGlobe;
  return <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3 last:border-b-0"><Icon className="size-4 shrink-0 text-muted-foreground" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-1.5"><span className="text-sm font-medium">{account.name}</span>{account.managed ? <Badge variant="secondary" size="sm">Managed</Badge> : null}{account.managed && <IconCircleCheck className="size-3.5 text-success" />}</div><p className="mt-0.5 text-sm text-muted-foreground">{account.description}</p></div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">{account.age || account.state}</span><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon-sm" variant="ghost" aria-label={`Open actions for ${account.name}`}><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => onAction(`refresh:${account.id}`)}>{account.managed ? "Refresh identity data" : "Open profile"}</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" disabled={account.managed} onClick={() => onAction(`remove:${account.id}`)}>Disconnect</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div>;
}

function ProfileTab({ profile, onProfileChange, emails, onEmailAction, accounts, onAccountAction, onAddEmail, avatarUrl, onAvatarChange, onAvatarRemove, locked, notify, selectedYear, onYearChange, selectedDate, onDateChange }: {
  profile: Profile; onProfileChange: (key: keyof Profile, value: string) => void; emails: EmailEntry[]; onEmailAction: (action: string) => void; accounts: AccountEntry[]; onAccountAction: (action: string) => void; onAddEmail: () => void; avatarUrl: string; onAvatarChange: (file: File | undefined) => void; onAvatarRemove: () => void; locked: boolean; notify: (message: string) => void; selectedYear: string; onYearChange: (value: string) => void; selectedDate: string; onDateChange: (date: string) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  return <div className="space-y-5">
    <ActivitySection selectedYear={selectedYear} selectedDate={selectedDate} onYearChange={onYearChange} onDateChange={onDateChange} />
    <section className="space-y-2.5"><SectionHeading title="Personal Information" description="Edit the identity shown across assignments and handoffs." /><Card className="shadow-none"><CardContent className="px-4 py-1">
      <ProfileField label="Profile Image" description="Used in mentions, activity rows, and directory previews."><div className="flex flex-wrap items-center gap-3"><Avatar className="size-16"><AvatarImage src={avatarUrl} alt="Iris Kwon" /><AvatarFallback>IK</AvatarFallback></Avatar><div className="flex flex-wrap items-center gap-2"><Button variant="outline" size="sm" disabled={locked} onClick={() => fileInput.current?.click()}><IconUpload />Replace image</Button><input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event) => onAvatarChange(event.target.files?.[0])} /><Button variant="ghost" size="sm" disabled={locked} onClick={onAvatarRemove}>Remove</Button><p className="basis-full text-xs text-muted-foreground">Recommended size 1:1. PNG, JPEG, or WebP up to 4MB.</p></div></div></ProfileField>
      <ProfileField label="Name" description="Keep legal and display naming aligned."><div className="grid gap-2 sm:grid-cols-2"><div><Label htmlFor="profile-first-name" className="text-xs text-muted-foreground">First Name</Label><Input id="profile-first-name" value={profile.firstName} disabled={locked} onChange={(event) => onProfileChange("firstName", event.target.value)} className="mt-1" /></div><div><Label htmlFor="profile-last-name" className="text-xs text-muted-foreground">Last Name</Label><Input id="profile-last-name" value={profile.lastName} disabled={locked} onChange={(event) => onProfileChange("lastName", event.target.value)} className="mt-1" /></div></div></ProfileField>
      <ProfileField label="Public Handle" description="Used for mentions, profile links, and compact owner labels."><InputGroup><InputGroupAddon><InputGroupText><IconAt /></InputGroupText></InputGroupAddon><InputGroupInput aria-label="Public handle" value={profile.handle} disabled={locked} onChange={(event) => onProfileChange("handle", event.target.value)} /></InputGroup></ProfileField>
      <ProfileField label="Role" description="Controls assignment labels and operational scope."><SelectField label="Role" value={profile.role} disabled={locked} onValueChange={(value) => onProfileChange("role", value)} options={roleOptions} /></ProfileField>
      <ProfileField label="Country" description="Sets the regional profile context."><SelectField label="Country" value={profile.country} disabled={locked} onValueChange={(value) => onProfileChange("country", value)} options={countryOptions} /></ProfileField>
      <ProfileField label="Locale" description="Controls date, number, and interface formatting."><SelectField label="Locale" value={profile.locale} disabled={locked} onValueChange={(value) => onProfileChange("locale", value)} options={localeOptions} /></ProfileField>
      <ProfileField label="Time Zone" description="Used for activity timestamps and notifications."><SelectField label="Time Zone" value={profile.timeZone} disabled={locked} onValueChange={(value) => onProfileChange("timeZone", value)} options={timeZoneOptions} /></ProfileField>
      <ProfileField label="Bio" description="Short internal context for admins and collaborators."><Textarea value={profile.bio} disabled={locked} onChange={(event) => onProfileChange("bio", event.target.value)} rows={3} /></ProfileField>
      <ProfileField label="Profile Visibility" description="Decide who can see extended profile details."><SelectField label="Profile visibility" value={profile.visibility} disabled={locked} onValueChange={(value) => onProfileChange("visibility", value)} options={[["workspace", "Visible to workspace"], ["admins", "Admins only"], ["private", "Private"]]} /></ProfileField>
    </CardContent></Card></section>
    <section className="space-y-2.5"><SectionHeading title="Email Addresses" description="Verified addresses used for sign-in and notifications." action={<Button variant="ghost" size="sm" disabled={locked} onClick={onAddEmail}><IconPlus />Add Email</Button>} /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0">{emails.map((email) => <EmailRow key={email.id} email={email} onAction={onEmailAction} notify={notify} />)}</CardContent></Card></section>
    <section className="space-y-2.5"><SectionHeading title="Connected Accounts" description="Identity sources and public destinations linked to this user." /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0">{accounts.map((account) => <AccountRow key={account.id} account={account} onAction={onAccountAction} />)}</CardContent></Card></section>
  </div>;
}

function OrganizationTab({ notify }: { notify: (message: string) => void }) {
  const [defaultOrg, setDefaultOrg] = useState("atlas-lane");
  const [membershipRole, setMembershipRole] = useState("owner");
  const [organizations, setOrganizations] = useState([{ id: "atlas-lane", name: "Atlas Lane", description: "Production workspace with billing and user admin access.", role: "Owner", isDefault: true }, { id: "launch-council", name: "Launch Council", description: "Cross-functional approval group for customer releases.", role: "Admin", isDefault: false }]);
  return <div className="space-y-5">
    <section className="space-y-2.5"><SectionHeading title="Organization Membership" description="Control workspace ownership, role, and operational scope." /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0"><div className="grid gap-3 border-b px-4 py-3 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:items-center"><div><p className="text-sm font-medium">Default Organization</p><p className="text-sm text-muted-foreground">Used when creating new records and reports.</p></div><SelectField label="Default Organization" value={defaultOrg} onValueChange={setDefaultOrg} options={[["atlas-lane", "Atlas Lane"], ["launch-council", "Launch Council"]]} /></div><div className="grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:items-center"><div><p className="text-sm font-medium">Membership Role</p><p className="text-sm text-muted-foreground">Sets admin access for billing, teams, and releases.</p></div><SelectField label="Membership Role" value={membershipRole} onValueChange={setMembershipRole} options={[["owner", "Workspace owner"], ["admin", "Admin"], ["member", "Member"]]} /></div></CardContent></Card></section>
    <section className="space-y-2.5"><SectionHeading title="Workspace Access" description="Active organizations and groups connected to this user." /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0">{organizations.map((org) => <div key={org.id} className="flex flex-wrap items-center gap-3 border-b px-4 py-3 last:border-b-0"><IconBuilding className="size-4 shrink-0 text-muted-foreground" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-1.5"><span className="text-sm font-medium">{org.name}</span>{org.isDefault && <Badge variant="primary-outline" size="sm">Default</Badge>}</div><p className="mt-0.5 text-sm text-muted-foreground">{org.description}</p></div><span className="text-xs text-muted-foreground">{org.role}</span><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon-sm" variant="ghost" aria-label={`Open actions for ${org.name}`}><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => { setDefaultOrg(org.id); setOrganizations((current) => current.map((item) => ({ ...item, isDefault: item.id === org.id }))); notify(`${org.name} set as default organization.`); }}>Set as default</DropdownMenuItem><DropdownMenuItem onClick={() => { setMembershipRole(org.role.toLowerCase()); notify(`${org.name} membership selected.`); }}>Review membership</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onClick={() => { setOrganizations((current) => current.filter((item) => item.id !== org.id)); notify(`${org.name} access removed.`); }}>Remove access</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>)}</CardContent></Card></section>
  </div>;
}

function SecurityTab() {
  const [recoveryEmail, setRecoveryEmail] = useState("recovery.iris@atlaslane.dev");
  const [mfaMethod, setMfaMethod] = useState("passkey");
  const [sessionDuration, setSessionDuration] = useState("30-days");
  const [security, setSecurity] = useState({ requirePasskey: true, trustedDevice: true, hideEmail: false });
  const toggle = (key: keyof typeof security, checked: boolean) => setSecurity((current) => ({ ...current, [key]: checked }));
  const switches = [
    { key: "requirePasskey" as const, title: "Require passkey on privileged actions", description: "Recommended for billing, role, and export changes." },
    { key: "trustedDevice" as const, title: "Notify on new trusted device", description: "Send a profile alert when a device is approved." },
    { key: "hideEmail" as const, title: "Hide personal email from workspace members", description: "Show only the workspace alias outside admin views." },
  ];
  return <div className="space-y-5"><section className="space-y-2.5"><SectionHeading title="Sign-In Controls" description="Set recovery and session controls for this profile." /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0"><div className="grid gap-3 border-b px-4 py-3 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:items-center"><div><p className="text-sm font-medium">Recovery Email</p><p className="text-sm text-muted-foreground">Where admins can send secure reset notices.</p></div><Input aria-label="Recovery email" type="email" value={recoveryEmail} onChange={(event) => setRecoveryEmail(event.target.value)} /></div><div className="grid gap-3 border-b px-4 py-3 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:items-center"><div><p className="text-sm font-medium">MFA Method</p><p className="text-sm text-muted-foreground">Required method for privileged actions.</p></div><SelectField label="MFA method" value={mfaMethod} onValueChange={setMfaMethod} options={[["passkey", "Passkey and authenticator"], ["authenticator", "Authenticator app"], ["sms", "SMS code"]]} /></div><div className="grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:items-center"><div><p className="text-sm font-medium">Session Duration</p><p className="text-sm text-muted-foreground">Maximum session age before re-authentication.</p></div><SelectField label="Session duration" value={sessionDuration} onValueChange={setSessionDuration} options={[["1-day", "1 day"], ["7-days", "7 days"], ["30-days", "30 days"], ["90-days", "90 days"]]} /></div></CardContent></Card></section><section className="space-y-2.5"><SectionHeading title="Security Notifications" description="Account alerts and privacy defaults for this user." /><Card className="gap-0 py-0 shadow-none"><CardContent className="p-0">{switches.map((item, index) => <div key={item.key} className={`flex items-center justify-between gap-4 px-4 py-3 ${index < switches.length - 1 ? "border-b" : ""}`}><div><p className="text-sm font-medium">{item.title}</p><p className="text-sm text-muted-foreground">{item.description}</p></div><Switch aria-label={item.title} checked={security[item.key]} onCheckedChange={(checked) => toggle(item.key, checked)} /></div>)}</CardContent></Card></section></div>;
}

export function MemberProfileAdmin() {
  const [profile, setProfile] = useState(initialProfile);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedDate, setSelectedDate] = useState("Apr 22");
  const [emails, setEmails] = useState(emailSeed);
  const [accounts, setAccounts] = useState(accountSeed);
  const [avatarUrl, setAvatarUrl] = useState(demoAvatarUrl("Iris Kwon"));
  const [locked, setLocked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [addEmailOpen, setAddEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [payloadOpen, setPayloadOpen] = useState(false);

  const updateProfile = (key: keyof Profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };
  const handleEmailAction = (action: string) => {
    const [kind, id] = action.split(":");
    if (kind === "primary") setEmails((current) => current.map((email) => ({ ...email, primary: email.id === id, state: email.id === id ? "Primary" : "" })));
    if (kind === "remove") setEmails((current) => current.filter((email) => email.id !== id));
  };
  const handleAccountAction = (action: string) => {
    const [kind, id] = action.split(":");
    if (kind === "remove") setAccounts((current) => current.filter((account) => account.id !== id));
    if (kind === "refresh") setNotice("Identity data refresh requested.");
  };
  const handleAvatarFile = (file?: File) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { setNotice("Choose an image under 4MB."); return; }
    setAvatarUrl(URL.createObjectURL(file));
    setNotice("Profile image updated.");
  };
  const save = () => { setSaved(true); setNotice("Profile changes saved."); };
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return <TooltipProvider delayDuration={0}><div className="mx-auto w-full max-w-6xl space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0"><Button variant="ghost" size="sm" className="mb-3 -ml-2 text-muted-foreground"><IconArrowLeft />Users</Button><div className="flex items-center gap-3"><Avatar className="size-14"><AvatarImage src={avatarUrl} alt={fullName} /><AvatarFallback>{`${profile.firstName[0]}${profile.lastName[0]}`}</AvatarFallback></Avatar><div className="min-w-0"><h2 className="truncate text-xl font-semibold tracking-tight">{fullName}</h2><p className="text-sm text-muted-foreground">{roleOptions.find(([key]) => key === profile.role)?.[1] ?? profile.role}<span className="mx-1.5">•</span>Active today</p></div></div></div>
      <div className="flex items-center gap-2"><Button aria-label={locked ? "Unlock profile" : "Lock profile"} variant="outline" size="icon" onClick={() => { setLocked((current) => !current); setNotice(locked ? "Profile editing unlocked." : "Profile editing locked."); }}><IconLock /></Button><DropdownMenu><DropdownMenuTrigger asChild><Button aria-label="Open profile actions" variant="outline" size="icon"><IconDotsVertical /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => { navigator.clipboard.writeText("usr_8R4m...KX92").then(() => setNotice("User ID copied.")).catch(() => setNotice("Clipboard access is unavailable in this preview.")); }}>Copy user ID</DropdownMenuItem><DropdownMenuItem onClick={() => setPayloadOpen(true)}>View profile payload</DropdownMenuItem><DropdownMenuItem onClick={() => setNotice("Identity data refresh requested.")}>Refresh identity data</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onClick={() => setNotice("Access suspension requested.")}>Suspend access</DropdownMenuItem></DropdownMenuContent></DropdownMenu><Button onClick={save}><IconCheck />{saved ? "Saved" : "Save Profile"}</Button></div>
    </header>

    <Tabs defaultValue="profile" className="gap-5">
      <TabsList variant="line" className="w-full justify-start rounded-none border-b"><TabsTrigger value="profile" className="flex-none px-3"><IconUser />Profile</TabsTrigger><TabsTrigger value="organizations" className="flex-none px-3"><IconBuilding />Organizations</TabsTrigger><TabsTrigger value="security" className="flex-none px-3"><IconShield />Security</TabsTrigger></TabsList>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17.25rem]">
        <div className="min-w-0">
          <TabsContent value="profile"><ProfileTab profile={profile} onProfileChange={updateProfile} emails={emails} onEmailAction={handleEmailAction} accounts={accounts} onAccountAction={handleAccountAction} onAddEmail={() => setAddEmailOpen(true)} avatarUrl={avatarUrl} onAvatarChange={handleAvatarFile} onAvatarRemove={() => { setAvatarUrl(""); setNotice("Profile image removed."); }} locked={locked} notify={setNotice} selectedYear={selectedYear} onYearChange={setSelectedYear} selectedDate={selectedDate} onDateChange={setSelectedDate} /></TabsContent>
          <TabsContent value="organizations"><OrganizationTab notify={setNotice} /></TabsContent>
          <TabsContent value="security"><SecurityTab /></TabsContent>
        </div>
        <AuditRail notify={setNotice} />
      </div>
    </Tabs>
    {notice && <p role="status" className="text-xs text-muted-foreground">{notice}</p>}

    <Dialog open={addEmailOpen} onOpenChange={setAddEmailOpen}><DialogContent size="sm"><DialogHeader><DialogTitle>Add Email Address</DialogTitle><DialogDescription>Add a verified sign-in or notification address to this profile.</DialogDescription></DialogHeader><div><Label htmlFor="new-profile-email">Email address</Label><Input id="new-profile-email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="name@example.com" type="email" className="mt-1.5" /></div><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button disabled={!newEmail.includes("@") } onClick={() => { const id = `email-${Date.now()}`; setEmails((current) => [...current, { id, address: newEmail, description: "Additional sign-in and notification email.", state: "", age: "Added just now", primary: false }]); setNewEmail(""); setAddEmailOpen(false); setNotice(`${newEmail} added.`); }}>Add Email</Button></DialogFooter></DialogContent></Dialog>
    <Dialog open={payloadOpen} onOpenChange={setPayloadOpen}><DialogContent size="md"><DialogHeader><DialogTitle>Profile payload</DialogTitle><DialogDescription>Current profile and access values.</DialogDescription></DialogHeader><pre className="max-h-80 overflow-auto rounded-lg bg-muted p-3 text-xs">{JSON.stringify({ id: "usr_8R4m...KX92", ...profile, emails: emails.map((email) => email.address), organizations: ["Atlas Lane", "Launch Council"] }, null, 2)}</pre><DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter></DialogContent></Dialog>
  </div></TooltipProvider>;
}
