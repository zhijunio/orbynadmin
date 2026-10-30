"use client";

import { PageHeader } from "@/components/feature/layout/PageHeader";

import { CircleAlert as IconAlertCircle, Info as IconInfoCircle, Search as IconSearch, Check as IconCheck, Clock as IconClock, Copy as IconCopy, Eye as IconEye, EyeOff as IconEyeOff, Minus as IconMinus, Plus as IconPlus, X as IconX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton, InputGroupText } from "@/components/ui/input-group";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import Image from "next/image";

const mediaAccept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "video/mp4": [".mp4"],
};

const flagImages: Record<string, string> = {
  US: "flag-us.svg",
  CN: "flag-china.svg",
  CA: "flag-canada.svg",
  FR: "flag-france.svg",
  AU: "flag-australia.svg",
  IN: "flag-india.svg",
  IT: "flag-italy.svg",
};

function InputStatesExample() {
  return <ExampleCard title="Input states"><div className="grid gap-4 sm:grid-cols-2">
    <Field label="With leading icon" id="state-icon"><InputGroup className="h-10"><InputGroupAddon><IconSearch /></InputGroupAddon><InputGroupInput id="state-icon" placeholder="Search projects..." /></InputGroup></Field>
    <Field label="Disabled" id="state-disabled"><Input className="h-10" id="state-disabled" defaultValue="Locked value" disabled /></Field>
    <Field label="With helper text" id="state-help" hint="Use 24 characters or fewer, no spaces."><Input className="h-10" id="state-help" defaultValue="nextboard-production" /></Field>
    <Field label="Error state" id="state-error" error="Enter a valid email address."><InputGroup className="h-10 border-destructive ring-3 ring-destructive/20"><InputGroupAddon><IconAlertCircle className="text-destructive" /></InputGroupAddon><InputGroupInput id="state-error" aria-invalid defaultValue="alex@nextboard" /></InputGroup></Field>
  </div></ExampleCard>;
}

function ControlsExample() {
  return <ExampleCard title="Controls"><div className="space-y-6">
    <div className="grid gap-6 sm:grid-cols-2">
      <Field label="Role" id="control-role"><Select defaultValue="admin"><SelectTrigger id="control-role" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Administrator</SelectItem><SelectItem value="editor">Editor</SelectItem><SelectItem value="viewer">Viewer</SelectItem><SelectItem value="billing">Billing manager</SelectItem></SelectContent></Select></Field>
      <Field label="Start date" id="control-date" hint="When this member gains access."><Input className="h-10" id="control-date" type="date" defaultValue="2026-08-01" /></Field>
      <div className="space-y-2.5"><p className="text-sm font-medium">Email preferences</p><div className="space-y-2.5"><CheckRow id="pref-product" label="Product updates" hint="News about features and improvements." defaultChecked /><CheckRow id="pref-security" label="Security alerts" hint="Sign-ins and unusual activity." defaultChecked /><CheckRow id="pref-marketing" label="Marketing & offers" hint="Occasional tips and promotions." /></div></div>
      <div className="space-y-2.5"><p className="text-sm font-medium">Workspace plan</p><RadioGroup defaultValue="pro" className="gap-2.5"><RadioRow id="plan-free" value="free" label="Free" hint="Up to 3 seats and 1 project." /><RadioRow id="plan-pro" value="pro" label="Pro" hint="Unlimited projects and analytics." /><RadioRow id="plan-enterprise" value="enterprise" label="Enterprise" hint="SSO, audit logs and priority support." /></RadioGroup></div>
    </div>
    <div className="space-y-4 border-t pt-5"><p className="text-sm font-medium">Notifications</p><SwitchRow id="notify-mentions" label="Mentions" hint="Notify me when someone @mentions me." defaultChecked /><SwitchRow id="notify-comments" label="Comments" hint="Notify me on replies to my threads." defaultChecked /><SwitchRow id="notify-digest" label="Weekly digest" hint="A Monday summary of activity." /></div>
    <div className="border-t pt-5"><Field label="Notes" id="control-notes" hint="Internal only — visible to your team."><Textarea id="control-notes" rows={4} placeholder="Add context for this account..." /></Field></div>
  </div></ExampleCard>;
}

function ExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card className="gap-0 border border-border py-0 ring-0"><CardHeader className="border-b px-6 py-4"><CardTitle className="text-sm font-medium">{title}</CardTitle></CardHeader><CardContent className="p-6">{children}</CardContent></Card>;
}

function Field({ label, id, hint, error, children }: { label: string; id: string; hint?: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label htmlFor={id}>{label}</Label>{children}{hint && <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><IconInfoCircle className="size-3.5" />{hint}</p>}{error && <p className="flex items-center gap-1.5 text-xs text-destructive"><IconAlertCircle className="size-3.5" />{error}</p>}</div>;
}

function CheckRow({ id, label, hint, defaultChecked }: { id: string; label: string; hint: string; defaultChecked?: boolean }) {
  return <div className="flex items-start gap-2.5"><Checkbox id={id} defaultChecked={defaultChecked} className="mt-0.5" /><div className="space-y-0.5"><Label htmlFor={id} className="font-normal">{label}</Label><p className="text-xs text-muted-foreground">{hint}</p></div></div>;
}

function RadioRow({ id, value, label, hint }: { id: string; value: string; label: string; hint: string }) {
  return <div className="flex items-start gap-2.5 rounded-lg border p-3"><RadioGroupItem id={id} value={value} className="mt-0.5" /><div className="space-y-0.5"><Label htmlFor={id} className="font-normal">{label}</Label><p className="text-xs text-muted-foreground">{hint}</p></div></div>;
}

function SwitchRow({ id, label, hint, defaultChecked }: { id: string; label: string; hint: string; defaultChecked?: boolean }) {
  return <div className="flex items-center justify-between gap-4"><div className="space-y-0.5"><Label htmlFor={id} className="font-normal">{label}</Label><p className="text-xs text-muted-foreground">{hint}</p></div><Switch id={id} defaultChecked={defaultChecked} /></div>;
}

function FormElementsExamples() {
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState<Date>();
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(["Bangladesh", "Singapore"]);
  const [quantity, setQuantity] = useState(1000);
  const [phoneCode, setPhoneCode] = useState("us");
  const fileRef = useRef<HTMLInputElement>(null);

  async function copyWebsite() {
    try {
      await navigator.clipboard.writeText("www.example.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return <div className="space-y-5"><div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
    <div className="flex flex-col gap-5">
      <ElementsExampleCard title="Input Elements">
        <div className="flex flex-col gap-5 p-6">
          <ElementsField label="Text Input"><Input className="h-10" placeholder="Jhon Smith" /></ElementsField>
          <ElementsField label="Email"><Input className="h-10" type="email" placeholder="info@gmail.com" /></ElementsField>
          <ElementsField label={<>Password <span className="text-destructive">*</span></>}><InputGroup className="h-10"><InputGroupInput type={showPassword ? "text" : "password"} placeholder="Choose a password" minLength={8} /><InputGroupButton size="icon-sm" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <IconEyeOff /> : <IconEye />}</InputGroupButton></InputGroup></ElementsField>
          <ElementsField label="Search"><InputGroup className="h-10"><InputGroupAddon><IconSearch /></InputGroupAddon><InputGroupInput placeholder="Search anything..." /><InputGroupAddon align="inline-end"><kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌘ K</kbd></InputGroupAddon></InputGroup></ElementsField>
          <ElementsField label="Placeholder"><Input className="h-10" placeholder="Type somethings..." /></ElementsField>
        </div>
      </ElementsExampleCard>

      <InputStatesExample />

      <ElementsExampleCard title="Text Area">
        <div className="flex flex-col gap-5 p-6">
          <ElementsField label="Message"><Textarea placeholder="Enter your message here..." /><p className="text-xs text-muted-foreground">Bio must be between 5 and 280 characters.</p></ElementsField>
          <ElementsField label="Message"><Textarea aria-invalid placeholder="Enter your message here..." /><p className="text-xs text-destructive">Message must be between 5 and 280 characters.</p></ElementsField>
          <ElementsField label="Message"><Textarea disabled placeholder="Enter your message here..." /></ElementsField>
        </div>
      </ElementsExampleCard>

      <ElementsExampleCard title="Upload Zone">
        <div className="space-y-6 p-6">
          <div className="flex h-10 items-center overflow-hidden rounded-lg border border-input"><Button type="button" variant="outline" className="h-full rounded-none border-0 border-r px-4" onClick={() => fileRef.current?.click()}>Choose File</Button><span className="truncate px-4 text-sm text-muted-foreground">{files[0]?.name ?? "No file chosen"}</span><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/gif,video/mp4" className="sr-only" onChange={(event) => { if (event.target.files?.[0]) setFiles([event.target.files[0]]); }} /></div>
          <FileUpload files={files} onFilesChange={setFiles} accept={mediaAccept} maxSize={50 * 1024 * 1024} />
        </div>
      </ElementsExampleCard>
    </div>

    <div className="flex flex-col gap-5">
      <ElementsExampleCard title="Input Group">
        <div className="flex flex-col gap-5 p-6">
          <ElementsField label={<>Phone Number <span className="text-destructive">*</span></>}><InputGroup className="h-10"><InputGroupAddon className="h-full border-r pr-2"><Select value={phoneCode} onValueChange={setPhoneCode}><SelectTrigger className="h-8 w-[84px] border-0 px-1 shadow-none"><SelectValue /></SelectTrigger><SelectContent>{[{ value: "us", code: "+1", flag: "US" }, { value: "cn", code: "+86", flag: "CN" }, { value: "ca", code: "+1", flag: "CA" }, { value: "fr", code: "+33", flag: "FR" }, { value: "au", code: "+61", flag: "AU" }].map((country) => <SelectItem key={country.value} value={country.value}><span className="flex items-center gap-2"><Image src={`/images/icons/${flagImages[country.flag]}`} alt="" width={21} height={14} className="h-3.5 w-[21px] rounded-sm object-cover" />{country.code}</span></SelectItem>)}</SelectContent></Select></InputGroupAddon><InputGroupInput type="tel" placeholder="6564 164 932" /></InputGroup></ElementsField>
          <ElementsField label="Website URL"><InputGroup className="h-10"><InputGroupAddon className="h-full border-r pr-3"><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput defaultValue="www.example.com" /><InputGroupButton size="icon-sm" onClick={copyWebsite} aria-label="Copy URL">{copied ? <IconCheck className="text-primary" /> : <IconCopy />}</InputGroupButton></InputGroup></ElementsField>
          <ElementsField label="Amount"><InputGroup className="h-10"><InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon><InputGroupInput placeholder="2,000.00" inputMode="decimal" /><InputGroupAddon align="inline-end" className="h-full border-l pl-2"><Select defaultValue="USD"><SelectTrigger className="h-8 w-[84px] border-0 px-1 shadow-none"><SelectValue /></SelectTrigger><SelectContent>{[{ code: "USD", flag: "US" }, { code: "CNY", flag: "CN" }, { code: "AUD", flag: "AU" }, { code: "CAD", flag: "CA" }, { code: "EUR", flag: "FR" }, { code: "INR", flag: "IN" }].map((currency) => <SelectItem key={currency.code} value={currency.code}><span className="flex items-center gap-2"><Image src={`/images/icons/${flagImages[currency.flag]}`} alt="" width={21} height={14} className="h-3.5 w-[21px] rounded-sm object-cover" />{currency.code}</span></SelectItem>)}</SelectContent></Select></InputGroupAddon></InputGroup></ElementsField>
          <ElementsField label="Card Number"><InputGroup className="h-10"><InputGroupAddon><Image src="/images/finance/mastercard.png" alt="Mastercard" width={28} height={18} className="h-auto w-7 object-contain" /></InputGroupAddon><InputGroupInput inputMode="numeric" placeholder="8400 5000 4000 3540" /></InputGroup></ElementsField>
          <ElementsField label="Quantity"><InputGroup className="h-10"><InputGroupButton aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(0, value - 1))}><IconMinus /></InputGroupButton><InputGroupInput className="text-center" type="number" min={0} value={quantity} onChange={(event) => setQuantity(Math.max(0, Number(event.target.value)))} /><InputGroupButton aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><IconPlus /></InputGroupButton></InputGroup></ElementsField>
        </div>
      </ElementsExampleCard>

      <ElementsExampleCard title="Selects">
        <div className="flex flex-col gap-5 p-6">
          <ElementsField label="Select option"><Select><SelectTrigger className="w-full"><SelectValue placeholder="Select option" /></SelectTrigger><SelectContent><SelectItem value="option-1">Option one</SelectItem><SelectItem value="option-2">Option two</SelectItem><SelectItem value="option-3">Option three</SelectItem></SelectContent></Select></ElementsField>
          <ElementsField label="Select options"><Popover><PopoverTrigger asChild><button type="button" className="flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-left"><span className="flex flex-1 flex-wrap gap-1.5">{selectedCountries.map((country) => <span key={country} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">{country}<span onClick={(event) => { event.stopPropagation(); setSelectedCountries((values) => values.filter((value) => value !== country)); }} role="button" tabIndex={0} aria-label={`Remove ${country}`}><IconX className="size-3" /></span></span>)}</span><span className="text-muted-foreground">⌄</span></button></PopoverTrigger><PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-2"><div className="space-y-1">{["Bangladesh", "Singapore", "Malaysia", "Thailand"].map((country) => <label key={country} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"><Checkbox checked={selectedCountries.includes(country)} onCheckedChange={(checked) => setSelectedCountries((values) => checked ? [...values, country] : values.filter((value) => value !== country))} />{country}</label>)}</div></PopoverContent></Popover></ElementsField>
          <ElementsField label="Select Country"><Select defaultValue="US"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{[{ code: "US", name: "United States" }, { code: "CN", name: "China" }, { code: "AU", name: "Australia" }, { code: "CA", name: "Canada" }, { code: "FR", name: "France" }, { code: "IN", name: "India" }, { code: "IT", name: "Italy" }].map((country) => <SelectItem key={country.code} value={country.code}><span className="flex items-center gap-2"><Image src={`/images/icons/${flagImages[country.code]}`} alt="" width={21} height={14} className="h-3.5 w-[21px] rounded-sm object-cover" />{country.name}</span></SelectItem>)}</SelectContent></Select></ElementsField>
        </div>
      </ElementsExampleCard>

      <ElementsExampleCard title="Time and Date">
        <div className="flex flex-col gap-5 p-6">
          <ElementsField label="Select time"><InputGroup className="h-10"><InputGroupInput type="time" defaultValue="12:00" /><InputGroupAddon align="inline-end"><IconClock /></InputGroupAddon></InputGroup></ElementsField>
          <ElementsField label="Select Date"><DatePicker value={date} onChange={setDate} placeholder="08/18/2028" /></ElementsField>
        </div>
      </ElementsExampleCard>
      <ControlsExample />
    </div>
  </div><ValidatedFormExample /></div>;
}

function ElementsExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card className="gap-0 border border-border py-0 ring-0">
    <CardHeader className="border-b p-4 md:px-6"><CardTitle className="text-sm font-medium">{title}</CardTitle></CardHeader>
    <CardContent className="p-4 md:px-6">{children}</CardContent>
  </Card>;
}

function ElementsField({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><Label className="text-sm font-medium">{label}</Label>{children}</div>;
}

type SignupValues = { name: string; email: string; password: string; acceptedTerms: boolean };
type SignupField = keyof SignupValues;

function validateSignup(values: SignupValues): Partial<Record<SignupField, string>> {
  const errors: Partial<Record<SignupField, string>> = {};
  const name = values.name.trim();
  const email = values.email.trim();
  if (name.length < 2) errors.name = "Enter at least 2 characters.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (values.password.length < 10) errors.password = "Use at least 10 characters.";
  else if (!/[A-Z]/.test(values.password)) errors.password = "Include at least one uppercase letter.";
  if (!values.acceptedTerms) errors.acceptedTerms = "Accept the terms to continue.";
  return errors;
}

function ValidatedFormExample() {
  const [values, setValues] = useState<SignupValues>({ name: "", email: "", password: "", acceptedTerms: false });
  const [errors, setErrors] = useState<Partial<Record<SignupField, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends SignupField>(field: K, value: SignupValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateSignup(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setSubmitting(false);
    toast.success("Example form submitted", { description: `Welcome, ${values.name.trim()}.` });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validated signup form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} noValidate className="max-w-xl space-y-5">
          <ValidatedField id="validated-name" label="Full name" error={errors.name}>
            <Input id="validated-name" autoComplete="name" value={values.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? "validated-name-error" : undefined} onChange={(event) => update("name", event.target.value)} />
          </ValidatedField>
          <ValidatedField id="validated-email" label="Email" error={errors.email}>
            <Input id="validated-email" type="email" autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? "validated-email-error" : undefined} onChange={(event) => update("email", event.target.value)} />
          </ValidatedField>
          <ValidatedField id="validated-password" label="Password" error={errors.password}>
            <Input id="validated-password" type="password" autoComplete="new-password" value={values.password} aria-invalid={!!errors.password} aria-describedby={errors.password ? "validated-password-error" : undefined} onChange={(event) => update("password", event.target.value)} />
          </ValidatedField>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <Checkbox id="validated-terms" checked={values.acceptedTerms} aria-invalid={!!errors.acceptedTerms} aria-describedby={errors.acceptedTerms ? "validated-terms-error" : undefined} onCheckedChange={(checked) => update("acceptedTerms", checked === true)} />
              <Label htmlFor="validated-terms" className="font-normal">I agree to the terms of service.</Label>
            </div>
            {errors.acceptedTerms && <p id="validated-terms-error" role="alert" className="flex items-center gap-1.5 text-xs text-destructive"><IconAlertCircle className="size-3.5" />{errors.acceptedTerms}</p>}
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : <><IconCheck className="size-4" /> Create account</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ValidatedField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-destructive"><IconAlertCircle className="size-3.5" />{error}</p>}
    </div>
  );
}

export default function FormElementsPage() {
  return <div className="space-y-5"><PageHeader title="Form Elements" /><FormElementsExamples /></div>;
}
