"use client";

import { useState } from "react";
import { IconCheck, IconExternalLink, IconEye, IconInfoCircle, IconPencil, IconPlus, IconShieldCheck, IconStar } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip";

type SectionKey = "business" | "public" | "management";
type ProfileData = Record<string, string>;
type FieldConfig = { key: string; label: string; type?: "text" | "email" | "url" | "textarea" | "select"; options?: readonly (readonly [string, string])[]; description?: string; info?: string; layout?: "full" | "half" | "third" };

const businessFields: FieldConfig[] = [
  { key: "legalName", label: "Legal name", info: "Must match the entity name on tax and banking records.", layout: "full" },
  { key: "businessType", label: "Business type", type: "select", options: [["llc", "Limited liability company"], ["corporation", "Corporation"], ["sole-proprietor", "Sole proprietorship"], ["partnership", "Partnership"]], layout: "half", info: "Choose the legal structure on file." },
  { key: "industry", label: "Industry", type: "select", options: [["digital-services", "Digital services"], ["software", "Software"], ["retail", "Retail"], ["consulting", "Consulting"]], layout: "half", info: "Select the primary business activity." },
  { key: "website", label: "Website", type: "url", layout: "full", info: "A public website associated with the business." },
  { key: "street", label: "Street address", layout: "full" },
  { key: "city", label: "City", layout: "third" },
  { key: "state", label: "State", layout: "third" },
  { key: "postal", label: "Postal code", layout: "third" },
  { key: "country", label: "Country", type: "select", options: [["US", "United States"], ["CA", "Canada"], ["GB", "United Kingdom"]], layout: "half" },
  { key: "taxId", label: "Tax ID", layout: "half", info: "Sensitive tax identifiers are masked in this preview." },
  { key: "productDescription", label: "Product description", type: "textarea", description: "Shown to reviewers when the business profile is checked.", layout: "full" },
];

const publicFields: FieldConfig[] = [
  { key: "publicName", label: "Public name", layout: "full", info: "This appears on receipts and hosted payment pages." },
  { key: "descriptor", label: "Statement descriptor", layout: "half", info: "Text customers see on payment statements." },
  { key: "supportPhone", label: "Support phone", layout: "half" },
  { key: "supportEmail", label: "Support email", type: "email", layout: "half" },
  { key: "businessWebsite", label: "Business website", type: "url", layout: "half", info: "Your customer-facing website." },
  { key: "supportUrl", label: "Support URL", type: "url", layout: "full" },
  { key: "supportNote", label: "Customer support note", type: "textarea", layout: "full", info: "Instructions customers see when they need help." },
];

const managementFields: FieldConfig[] = [
  { key: "representative", label: "Representative name", layout: "full", info: "The representative should be authorized to act for this business." },
  { key: "representativeRole", label: "Representative role", type: "select", options: [["executive-owner", "Executive, owner, and representative"], ["owner", "Owner"], ["executive", "Executive"], ["representative", "Representative"]], layout: "half", info: "The person's relationship to this business." },
  { key: "representativeEmail", label: "Representative email", type: "email", layout: "half" },
  { key: "dateOfBirth", label: "Date of birth", layout: "half", info: "Date of birth is used for identity verification." },
  { key: "phone", label: "Phone", layout: "half" },
  { key: "ownerStreet", label: "Street address", layout: "full" },
  { key: "ownerCity", label: "City", layout: "third" },
  { key: "ownerState", label: "State", layout: "third" },
  { key: "ownerPostal", label: "Postal code", layout: "third" },
  { key: "ownerCountry", label: "Country", type: "select", options: [["US", "United States"], ["CA", "Canada"], ["GB", "United Kingdom"]], layout: "half" },
  { key: "identity", label: "Identity number", layout: "half", info: "Personal identity information is masked in this preview." },
  { key: "additionalOwner", label: "Additional owner", layout: "half" },
  { key: "ownerEmail", label: "Owner email", type: "email", layout: "half" },
  { key: "ownerRole", label: "Owner role", type: "select", options: [["owner", "Owner"], ["director", "Director"], ["executive", "Executive"]], layout: "half" },
  { key: "ownerStatus", label: "Owner status", type: "select", options: [["provided", "Information provided"], ["pending", "Pending verification"]], layout: "half", info: "Whether this owner has submitted the required details." },
];

const initialData: ProfileData = {
  legalName: "Cedar & Volt Studio LLC", businessType: "llc", industry: "digital-services", website: "https://cedarvolt.studio", street: "418 Market Street, Floor 6", city: "Portland", state: "OR", postal: "97205", country: "US", taxId: "US EIN ending 2146", productDescription: "Digital workspace templates, implementation support, and design system services.",
  publicName: "Cedar & Volt Studio", descriptor: "CEDARVOLT.STUDIO", supportPhone: "+1 503 555 0184", supportEmail: "support@cedarvolt.studio", businessWebsite: "https://cedarvolt.studio", supportUrl: "https://cedarvolt.studio/help", supportNote: "Customers see this profile on receipts, hosted invoices, and payment links.",
  representative: "Mira Coleman", representativeRole: "executive-owner", representativeEmail: "mira@cedarvolt.studio", dateOfBirth: "Born on May 18, 1987", phone: "+1 503 555 0171", ownerStreet: "730 Alder Way", ownerCity: "Portland", ownerState: "OR", ownerPostal: "97209", ownerCountry: "US", identity: "Last 4 SSN ending 4481", additionalOwner: "Elliot Reyes", ownerEmail: "elliot@cedarvolt.studio", ownerRole: "owner", ownerStatus: "provided",
};

const sectionConfig: Record<SectionKey, { title: string; description: string; modalTitle: string; modalDescription: string; fields: FieldConfig[] }> = {
  business: { title: "Business Details", description: "Legal identity and address.", modalTitle: "Edit Business Details", modalDescription: "Update the legal profile used for account review.", fields: businessFields },
  public: { title: "Public Details", description: "Customer-facing profile.", modalTitle: "Edit Public Details", modalDescription: "Update the customer-facing information shown after payment.", fields: publicFields },
  management: { title: "Management and Ownership", description: "People authorized to represent the business.", modalTitle: "Edit Management", modalDescription: "Update the representative and owner information on file.", fields: managementFields },
};

const displayOptions: Record<string, readonly (readonly [string, string])[]> = Object.fromEntries([...businessFields, ...managementFields].filter((field) => field.options).map((field) => [field.key, field.options!])) as Record<string, readonly (readonly [string, string])[]>;

function displayValue(field: string, value: string) {
  return displayOptions[field]?.find(([key]) => key === value)?.[1] ?? value;
}

function Info({ label, children }: { label: string; children: string }) {
  return <Tooltip><TooltipTrigger aria-label={`${label} info`} className="inline-flex text-muted-foreground"><IconInfoCircle className="size-3.5" /></TooltipTrigger><TooltipContent>{children}</TooltipContent></Tooltip>;
}

function ValueInfo({ label, children }: { label: string; children: string }) {
  return <Tooltip><TooltipTrigger aria-label={`${label} value info`} className="ml-1 inline-flex text-muted-foreground"><IconInfoCircle className="size-3.5" /></TooltipTrigger><TooltipContent>{children}</TooltipContent></Tooltip>;
}

function ProfileDialog({ section, values, open, onOpenChange, onSave }: { section: SectionKey; values: ProfileData; open: boolean; onOpenChange: (open: boolean) => void; onSave: (values: ProfileData) => void }) {
  const config = sectionConfig[section];
  const [draft, setDraft] = useState<ProfileData>(values);
  const update = (key: string, value: string) => setDraft((current) => ({ ...current, [key]: value }));

  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent size="xl" className="max-h-[min(90vh,52rem)] overflow-hidden sm:!max-w-[672px]">
    <DialogHeader className="-mx-4 -mt-4 border-b px-5 py-4"><DialogTitle>{config.modalTitle}</DialogTitle><DialogDescription>{config.modalDescription}</DialogDescription></DialogHeader>
    <DialogBody className="space-y-4 py-1">
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-6">{config.fields.map((field) => <div key={field.key} className={field.layout === "full" ? "sm:col-span-6" : field.layout === "third" ? "sm:col-span-2" : "sm:col-span-3"}>
        <div className="flex items-center gap-1"><Label htmlFor={`${section}-${field.key}`}>{field.label}</Label>{field.info && <Info label={field.label}>{field.info}</Info>}</div>
        {field.type === "select" ? <Select value={draft[field.key]} onValueChange={(value) => update(field.key, value)}><SelectTrigger id={`${section}-${field.key}`} aria-label={field.label} className="mt-1.5 w-full"><SelectValue /></SelectTrigger><SelectContent>{field.options?.map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent></Select> : field.type === "textarea" ? <Textarea id={`${section}-${field.key}`} value={draft[field.key]} onChange={(event) => update(field.key, event.target.value)} rows={4} className="mt-1.5 min-h-24" /> : <Input id={`${section}-${field.key}`} type={field.type ?? "text"} value={draft[field.key]} onChange={(event) => update(field.key, event.target.value)} className="mt-1.5" />}
        {field.description && <p className="mt-1 text-xs text-muted-foreground">{field.description}</p>}
      </div>)}</div>
    </DialogBody>
    <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={() => { onSave(draft); onOpenChange(false); }}>Save changes</Button></DialogFooter>
  </DialogContent></Dialog>;
}

function DetailRow({ label, value, info, valueInfo }: { label: string; value: React.ReactNode; info?: string; valueInfo?: string }) {
  return <div className="grid min-h-[49px] grid-cols-[minmax(0,38%)_minmax(0,1fr)] items-center gap-3 border-b px-4 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,40%)_minmax(0,1fr)]">
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">{label}{info && <Info label={label}>{info}</Info>}</div>
    <div className="min-w-0 break-words text-sm text-foreground">{value}{valueInfo && <ValueInfo label={label}>{valueInfo}</ValueInfo>}</div>
  </div>;
}

function SectionFrame({ actions, children }: { actions: React.ReactNode; children: React.ReactNode }) {
  return <div className="space-y-3"><div className="flex justify-end gap-2">{actions}</div>{children}</div>;
}

function BusinessVerification({ section }: { section: SectionKey }) {
  const [values, setValues] = useState(initialData);
  const [editing, setEditing] = useState<SectionKey | null>(null);
  const [showOwners, setShowOwners] = useState(false);
  const [extraOwners, setExtraOwners] = useState([{ name: "Elliot Reyes", email: "elliot@cedarvolt.studio", role: "Owner", status: "Information provided" }]);
  const [notice, setNotice] = useState("");

  const editButton = (section: SectionKey) => <Button variant="outline" size="sm" aria-label={`Edit ${sectionConfig[section].title.toLowerCase()}`} onClick={() => setEditing(section)}><IconPencil />Edit</Button>;
  return <TooltipProvider delayDuration={0}><div className="w-full space-y-4">
    {section === "business" && <SectionFrame actions={editButton("business")}>
      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3"><div><p className="text-sm font-medium">{values.legalName}</p><p className="mt-0.5 text-sm text-muted-foreground">Domain confirmed for review.</p></div><Badge variant="success-light"><IconShieldCheck />Verified domain</Badge></div>
        <DetailRow label="URL" info="Website associated with this business." value={<a href={values.website} className="inline-flex items-center gap-1.5 hover:underline" target="_blank" rel="noreferrer">{values.website.replace(/^https?:\/\//, "")}<IconExternalLink className="size-3.5" /></a>} valueInfo="The submitted website domain has been verified." />
        <DetailRow label="Address" info="Registered business address." value={<span className="whitespace-pre-line">{`${values.street}\n${values.city}, ${values.state} ${values.postal}\n${displayValue("country", values.country)}`}</span>} />
        <DetailRow label="Business type" info="Legal structure registered for this business." value={displayValue("businessType", values.businessType)} />
        <DetailRow label="Other information provided" value={`${values.taxId}, ${displayValue("industry", values.industry)}, Product description`} valueInfo={values.productDescription} />
      </div>
    </SectionFrame>}

    {section === "public" && <SectionFrame actions={editButton("public")}>
      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3"><div><p className="text-sm font-medium">Customer Support Information</p><p className="mt-0.5 text-sm text-muted-foreground">Receipt and invoice profile.</p></div><Badge variant="primary-outline"><IconEye />Customer visible</Badge></div>
        <DetailRow label="Business name" info="Name customers see on receipts." value={<span className="inline-flex flex-wrap items-center gap-2">{values.publicName}<span className="font-semibold tracking-tight text-primary">stripe</span></span>} />
        <DetailRow label="Support phone" value={values.supportPhone} />
        <DetailRow label="Support email" value={values.supportEmail} valueInfo="Customers can reach your support team at this address." />
        <DetailRow label="Statement descriptor" info="Text shown on a customer's payment statement." value={<span className="inline-flex flex-wrap items-center gap-2">{values.descriptor}<span className="font-semibold italic text-primary">PayPal</span></span>} />
        <DetailRow label="Also provided" value="Business website, Support URL, Customer support note" />
      </div>
    </SectionFrame>}

    {section === "management" && <SectionFrame actions={<><Button variant="outline" size="sm" onClick={() => setEditing("management")}><IconPlus />Add owner</Button>{editButton("management")}</>}>
      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3"><div><p className="text-sm font-medium">{values.representative}</p><p className="mt-0.5 text-sm text-muted-foreground">Account representative</p></div><Badge variant="secondary"><IconStar />Primary</Badge></div>
        <DetailRow label="Role" info="Relationship to the business." value={displayValue("representativeRole", values.representativeRole)} />
        <DetailRow label="Email" value={values.representativeEmail} />
        <DetailRow label="Date of birth" value={values.dateOfBirth} valueInfo="Date of birth is shown to reviewers only." />
        <DetailRow label="Address" value={<span className="whitespace-pre-line">{`${values.ownerStreet}\n${values.ownerCity}, ${values.ownerState} ${values.ownerPostal}\n${displayValue("ownerCountry", values.ownerCountry)}`}</span>} />
        <DetailRow label="Other information provided" value={`${values.identity}, Phone`} valueInfo="Sensitive identity details are masked in this preview." />
        {extraOwners.length > 0 && <div className="border-t px-4 py-3"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm font-medium">Beneficial ownership</p><p className="mt-0.5 text-sm text-muted-foreground">{extraOwners.length} additional owner{extraOwners.length === 1 ? "" : "s"} provided.</p></div><Button variant="ghost" size="sm" onClick={() => setShowOwners((value) => !value)}>{showOwners ? "Hide owners" : `Show ${extraOwners.length} more owner${extraOwners.length === 1 ? "" : "s"}`}</Button></div>
          {showOwners && <div className="mt-3 space-y-2">{extraOwners.map((owner) => <div key={owner.email} className="rounded-lg border p-3"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm font-medium">{owner.name}</p><p className="text-sm text-muted-foreground">Additional owner</p></div><Badge variant="success-light"><IconCheck />{owner.status}</Badge></div><div className="mt-3 grid gap-2 border-t pt-3 text-sm sm:grid-cols-2"><div><span className="text-muted-foreground">Role</span><p>{owner.role}</p></div><div><span className="text-muted-foreground">Email</span><p className="break-all">{owner.email}</p></div></div></div>)}</div>}
        </div>}
      </div>
    </SectionFrame>}

    {notice && <p role="status" className="text-xs text-muted-foreground">{notice}</p>}
    {editing && <ProfileDialog key={editing} section={editing} values={values} open onOpenChange={(open) => setEditing(open ? editing : null)} onSave={(next) => { setValues(next); if (editing === "management") setExtraOwners((current) => current.map((owner, index) => index === 0 ? { name: next.additionalOwner, email: next.ownerEmail, role: displayValue("ownerRole", next.ownerRole), status: displayValue("ownerStatus", next.ownerStatus) } : owner)); setNotice(`${sectionConfig[editing].title} saved.`); }} />}
  </div></TooltipProvider>;
}

export function BusinessDetailsVerification() { return <BusinessVerification section="business" />; }
export function PublicBusinessDetails() { return <BusinessVerification section="public" />; }
export function ManagementOwnershipDetails() { return <BusinessVerification section="management" />; }
