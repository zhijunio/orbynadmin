"use client";

import { useState, type ReactNode } from "react";
import { IconAlertTriangle, IconInfoCircle, IconLock, IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";

type PolicyKey = "email" | "phone" | "username" | "password" | "passkeys" | "protection" | "user-model";
type PolicyTab = { id: PolicyKey; label: string; status?: "ready" | "beta"; pro?: boolean };

const policyTabs: PolicyTab[] = [
  { id: "email", label: "Email", status: "ready" },
  { id: "phone", label: "Phone", pro: true },
  { id: "username", label: "Username" },
  { id: "password", label: "Password", status: "ready" },
  { id: "passkeys", label: "Passkeys", status: "beta" },
  { id: "protection", label: "Protection" },
  { id: "user-model", label: "User Model" },
];

const defaultToggles = {
  "email-signup": true, "email-required": false, "email-verify": true, "email-restrict": false,
  "email-signin": true, "email-code": true, "email-link": false,
  "phone-signup": true, "phone-verified": true, "phone-disposable": true,
  "phone-signin": true, "phone-code": true, "phone-voice": false, "phone-whatsapp": false, "phone-fraud": false,
  "username-signup": false, "username-signin": false,
  "password-signin": true, "password-recovery": true, "password-breach": true, "password-minimum": true, "password-complexity": true,
  "passkey-signin": true, "passkey-discoverable": true, "passkey-recent": false,
  lockout: true, "bot-protection": true,
  "profile-name": true, "user-deletion": false,
};
const defaultChecks = { "email-code-method": true, "email-link-method": false, "platform-auth": true, "security-key": true };

function PolicyCard({ title, description, badge, children, className = "" }: { title?: string; description?: string; badge?: ReactNode; children: ReactNode; className?: string }) {
  return <Card className={`gap-0 py-0 shadow-none ${className}`}>
    {title && <CardHeader className="border-b px-5 py-3.5 sm:px-5"><div className="flex items-center gap-2"><CardTitle className="text-sm font-medium">{title}</CardTitle>{badge}</div>{description && <p className="text-sm text-muted-foreground">{description}</p>}</CardHeader>}
    <CardContent className="px-0 py-0">{children}</CardContent>
  </Card>;
}

function PolicyRow({ title, description, badge, disabled, children }: { title: ReactNode; description?: string; badge?: ReactNode; disabled?: boolean; children?: ReactNode }) {
  return <div className={`border-b px-5 py-3.5 last:border-b-0 ${disabled ? "text-muted-foreground" : ""}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0"><div className="flex items-center gap-2 text-sm font-medium">{title}{badge}</div>{description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}</div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  </div>;
}

function PolicyNotice({ title, description, info = false }: { title: string; description: string; info?: boolean }) {
  const Icon = info ? IconInfoCircle : IconAlertTriangle;
  return <div className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 rounded-lg border px-3 py-2.5 text-sm ${info ? "border-info/30 bg-info/5" : "border-warning/30 bg-warning/5"}`}>
    <Icon className={`mt-0.5 size-4 ${info ? "text-info" : "text-warning"}`} />
    <div><div className="font-medium">{title}</div><p className="mt-0.5 text-muted-foreground">{description}</p></div>
  </div>;
}

function SettingSwitch({ label, checked, onCheckedChange, disabled = false }: { label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean }) {
  return <Switch aria-label={label} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />;
}

function SelectField({ label, value, onValueChange, options, className = "w-full" }: { label: string; value: string; onValueChange: (value: string) => void; options: [string, string][]; className?: string }) {
  return <Select value={value} onValueChange={onValueChange}><SelectTrigger aria-label={label} className={className}><SelectValue>{options.find(([key]) => key === value)?.[1]}</SelectValue></SelectTrigger><SelectContent>{options.map(([key, text]) => <SelectItem key={key} value={key}>{text}</SelectItem>)}</SelectContent></Select>;
}

export function AuthenticationSettings() {
  const [tab, setTab] = useState<PolicyKey>("email");
  const [preview, setPreview] = useState("preview");
  const [toggles, setToggles] = useState<Record<string, boolean>>(defaultToggles);
  const [checks, setChecks] = useState<Record<string, boolean>>(defaultChecks);
  const [countryAllowlist, setCountryAllowlist] = useState("us-ca-uk-eu");
  const [verificationChannel, setVerificationChannel] = useState("sms");
  const [retryLimit, setRetryLimit] = useState("5");
  const [retryCode, setRetryCode] = useState("standard");
  const usernameMinimum = "4";
  const usernameMaximum = "48";
  const extendedSymbols = false;
  const [passwordLength, setPasswordLength] = useState("12");
  const [lockoutAttempts, setLockoutAttempts] = useState("100");
  const [lockoutMode, setLockoutMode] = useState("time");
  const [lockoutDuration, setLockoutDuration] = useState("1");
  const [lockoutUnit, setLockoutUnit] = useState("hours");
  const [enumerationMode, setEnumerationMode] = useState("bulk");
  const [identifier, setIdentifier] = useState("email");
  const [notice, setNotice] = useState("");

  function toggle(key: string, checked: boolean) { setToggles((current) => ({ ...current, [key]: checked })); }
  function check(key: string, checked: boolean) { setChecks((current) => ({ ...current, [key]: checked })); }
  function discardChanges() {
    setToggles({ ...defaultToggles });
    setChecks({ ...defaultChecks });
    setPreview("preview");
    setCountryAllowlist("us-ca-uk-eu");
    setVerificationChannel("sms");
    setRetryLimit("5");
    setRetryCode("standard");
    setPasswordLength("12");
    setLockoutAttempts("100");
    setLockoutMode("time");
    setLockoutDuration("1");
    setLockoutUnit("hours");
    setEnumerationMode("bulk");
    setIdentifier("email");
    setNotice("Draft changes discarded.");
  }
  function switchRow(title: string, description: string, key: string, badge?: ReactNode, disabled = false) {
    return <PolicyRow title={title} description={description} badge={badge} disabled={disabled}><SettingSwitch label={title} checked={toggles[key]} onCheckedChange={(value) => toggle(key, value)} disabled={disabled} /></PolicyRow>;
  }
  function checkRow(title: string, description: string, key: string) {
    return <Field orientation="horizontal" className="items-start gap-2 px-5 py-2"><Checkbox id={`auth-${key}`} checked={checks[key]} onCheckedChange={(value) => check(key, value === true)} /><FieldLabel htmlFor={`auth-${key}`} className="grid gap-0.5 font-normal"><span>{title}</span><span className="text-sm text-muted-foreground">{description}</span></FieldLabel></Field>;
  }
  function radioChoice(label: string, description: string, value: string, group: string) {
    return <Field orientation="horizontal" className="items-start gap-2"><RadioGroupItem id={`auth-${group}-${value}`} value={value} className="mt-0.5" /><FieldLabel htmlFor={`auth-${group}-${value}`} className="grid gap-0.5 font-normal"><span>{label}</span><span className="text-sm text-muted-foreground">{description}</span></FieldLabel></Field>;
  }
  function policyBody(key: PolicyKey) {
    if (key === "email") return <div className="space-y-4">
      <PolicyCard>
        {switchRow("Sign-up with email", "Allow users to create accounts with a verified email address.", "email-signup")}
        {switchRow("Require email address", "Users must keep one reachable email address on their account.", "email-required", undefined, true)}
        <div className="px-5 pb-3"><PolicyNotice title="Required method" description="Email is the only enabled sign-up option, so it remains required." info /></div>
        {switchRow("Verify at sign-up", "Require ownership verification before a new account is created.", "email-verify", <Badge variant="secondary" size="sm">Recommended</Badge>)}
        <div className="border-t px-5 pt-3"><div className="text-sm font-medium">Verification methods</div><p className="mt-0.5 text-sm text-muted-foreground">Choose how users confirm control of an email address.</p></div>
        {checkRow("One-time verification code", "Send a short passcode to the submitted address.", "email-code-method")}
        {checkRow("Verification link", "Send a secure link with an expiring session token.", "email-link-method")}
        {switchRow("Restrict email changes", "Prevent users from changing their email after sign-up.", "email-restrict", undefined, true)}
      </PolicyCard>
      <PolicyCard>
        {switchRow("Sign-in with email", "Allow returning users to sign in with their email address.", "email-signin")}
        {switchRow("Email verification code", "Users can sign in with a one-time code.", "email-code")}
        {switchRow("Email verification link", "Users can sign in by opening a magic link.", "email-link")}
      </PolicyCard>
    </div>;

    if (key === "phone") return <div className="space-y-4">
      <PolicyNotice title="SMS allowlist" description="SMS sign-in is limited to phone numbers from countries enabled in the messaging allowlist." />
      <PolicyCard>
        {switchRow("Sign-up with phone", "Allow users to create accounts with a phone number.", "phone-signup", <><Badge variant="success" size="sm">Pro</Badge><IconInfoCircle className="size-3.5 text-muted-foreground" /></>)}
        <div className="border-b px-5 py-3.5"><div className="flex items-center gap-2 text-sm font-medium">Country allowlist <IconInfoCircle className="size-3.5 text-muted-foreground" /></div><p className="mt-0.5 text-sm text-muted-foreground">Accept registrations only from supported messaging regions.</p><div className="mt-3"><SelectField label="Country allowlist" value={countryAllowlist} onValueChange={setCountryAllowlist} options={[["us-ca-uk-eu", "US, CA, UK, EU"], ["us-ca", "US, CA"], ["eu", "EU"]]} className="w-full sm:max-w-sm" /></div></div>
        <div className="border-b px-5 py-3.5"><div className="text-sm font-medium">Verification channel</div><p className="mt-0.5 text-sm text-muted-foreground">Primary channel used to confirm control of the phone number.</p><div className="mt-3"><SelectField label="Verification channel" value={verificationChannel} onValueChange={setVerificationChannel} options={[["sms", "SMS code"], ["voice", "Voice call"], ["whatsapp", "WhatsApp"]]} className="w-full sm:max-w-sm" /></div></div>
        {switchRow("Require verified phone", "Create the account only after the first code challenge succeeds.", "phone-verified")}
        {switchRow("Block disposable numbers", "Reject high-risk virtual, temporary, and relay phone numbers.", "phone-disposable")}
      </PolicyCard>
      <PolicyCard>
        {switchRow("Sign-in with phone", "Allow users to sign in with a phone number.", "phone-signin", <Badge variant="success" size="sm">Pro</Badge>)}
        {switchRow("SMS one-time code", "Send a short-lived code when the phone number is recognized.", "phone-code")}
        {switchRow("Voice fallback", "Offer a spoken code after repeated undelivered SMS attempts.", "phone-voice")}
        {switchRow("WhatsApp fallback", "Route eligible international numbers through WhatsApp templates.", "phone-whatsapp", <Badge variant="success" size="sm">Pro</Badge>, true)}
      </PolicyCard>
      <PolicyCard title="SMS Guardrails" description="Delivery and abuse defaults for phone authentication.">
        <div className="border-b px-5 py-3.5"><div className="text-sm font-medium">Retry limit <IconInfoCircle className="ml-1 inline size-3.5 text-muted-foreground" /></div><p className="mt-0.5 text-sm text-muted-foreground">Maximum code sends per number before cooldown begins.</p><div className="mt-3 flex flex-wrap gap-2"><Input aria-label="Retry limit" type="number" min="1" value={retryLimit} onChange={(event) => setRetryLimit(event.target.value)} className="w-28" /><SelectField label="Retry code" value={retryCode} onValueChange={setRetryCode} options={[["standard", "Standard login code"], ["high", "High risk code"]]} className="w-56" /></div></div>
        {switchRow("Fraud screening", "Score carrier, region, and recent delivery behavior before sending.", "phone-fraud", <Badge variant="success" size="sm">Pro</Badge>, true)}
      </PolicyCard>
    </div>;

    if (key === "username") return <div className="space-y-4">
      <PolicyCard>{switchRow("Sign-up with username", "Allow users to choose a username during account creation.", "username-signup")}</PolicyCard>
      <PolicyCard>{switchRow("Sign-in with username", "Allow users to sign in using their username.", "username-signin")}</PolicyCard>
      <PolicyCard title="Username Rules" description="Current reserved-name policy.">
        <div className="space-y-3 px-5 py-4"><div><p className="text-xs text-muted-foreground">Minimum length</p><p className="mt-1 text-sm font-medium">{usernameMinimum} characters</p></div><div><p className="text-xs text-muted-foreground">Maximum length</p><p className="mt-1 text-sm font-medium">{usernameMaximum} characters</p></div><div><p className="text-xs text-muted-foreground">Extended symbols</p><p className="mt-1 text-sm font-medium">{extendedSymbols ? "On" : "Off"}</p></div></div>
        <CardFooter className="border-t bg-muted/20 px-5 py-2.5"><Button variant="outline" disabled className="w-full"><IconLock />Update rules</Button></CardFooter>
      </PolicyCard>
    </div>;

    if (key === "password") return <div className="space-y-4">
      <PolicyNotice title="Password recovery caution" description="Recovery and breach checks should stay enabled before password sign-in is published to production." />
      <PolicyCard>{switchRow("Password sign-in", "Allow users to authenticate with a password.", "password-signin")}{switchRow("Password recovery", "Send recovery codes only to verified identifiers.", "password-recovery")}{switchRow("Compromised password check", "Block sign-in when a password appears in known breach data.", "password-breach")}</PolicyCard>
      <PolicyCard title="Password Policy" badge={<Badge variant="success-light">Enforced</Badge>}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b px-5 py-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <label htmlFor="password-minimum-length" className="text-sm font-medium">Minimum length</label>
            <Input id="password-minimum-length" type="number" min="8" value={passwordLength} onChange={(event) => setPasswordLength(event.target.value)} className="w-28" />
          </div>
          <SettingSwitch label="Enforce minimum length" checked={toggles["password-minimum"]} onCheckedChange={(value) => toggle("password-minimum", value)} />
        </div>
        {switchRow("Require complexity", "Ask for a number, symbol, uppercase, and lowercase character.", "password-complexity")}
      </PolicyCard>
    </div>;

    if (key === "passkeys") return <div className="space-y-4">
      <PolicyCard>
        {switchRow("Passkey sign-in", "Let users sign in with device-bound credentials.", "passkey-signin", <Badge variant="success-light">Beta</Badge>)}
        {switchRow("Discoverable credentials", "Allow platform passkeys without entering an identifier first.", "passkey-discoverable")}
        {switchRow("Require recent verification", "Ask for a fresh passkey challenge before sensitive changes.", "passkey-recent")}
      </PolicyCard>
      <PolicyCard title="Allowed Authenticators" description="Registration sources accepted by default.">
        {checkRow("Platform authenticators", "Face ID, Touch ID, Windows Hello, and Android screen lock.", "platform-auth")}
        {checkRow("Security keys", "Hardware keys using WebAuthn-compatible protocols.", "security-key")}
      </PolicyCard>
    </div>;

    if (key === "protection") return <div className="space-y-4">
      <PolicyNotice title="Lockout policy caution" description="Aggressive lockout rules can block legitimate users during traffic spikes. Review support coverage before publishing." />
      <PolicyCard>
        {switchRow("Lockout policy", "Limit repeated failed login attempts before accounts are locked.", "lockout")}
        <div className="border-b px-5 py-3.5"><div className="text-sm font-medium">Maximum attempt limit</div><p className="mt-0.5 text-sm text-muted-foreground">Failed login attempts before protection starts.</p><Input aria-label="Maximum attempt limit" type="number" value={lockoutAttempts} onChange={(event) => setLockoutAttempts(event.target.value)} className="mt-3 w-36" /></div>
        <div className="border-t px-5 py-3.5"><p className="text-sm font-medium">Lockout duration</p><p className="mt-0.5 text-sm text-muted-foreground">How long users are locked out after the attempt limit is reached.</p>
          <RadioGroup value={lockoutMode} onValueChange={setLockoutMode} className="mt-3 gap-2">{radioChoice("Indefinite lockout", "Unlock manually from the authentication console.", "indefinite", "lockout")}{radioChoice("Time limit", "Automatically unlock after the selected duration.", "time", "lockout")}</RadioGroup>
          {lockoutMode === "time" && <div className="ml-6 mt-2 flex gap-2"><Input aria-label="Lockout duration" type="number" value={lockoutDuration} onChange={(event) => setLockoutDuration(event.target.value)} className="w-28" /><SelectField label="Duration unit" value={lockoutUnit} onValueChange={setLockoutUnit} options={[["hours", "hours"], ["minutes", "minutes"], ["days", "days"]]} className="w-32" /></div>}
        </div>
      </PolicyCard>
      <PolicyCard>{switchRow("Bot sign-up protection", "Challenge suspicious sessions before account creation.", "bot-protection")}<div className="border-t px-5 py-3.5 text-sm text-muted-foreground">New sign-ups include browser verification for unfamiliar devices, proxy traffic, and high-frequency attempts.</div></PolicyCard>
      <PolicyCard title="User Enumeration Protection" description="Control what attackers can infer."><div className="px-5 py-3.5"><RadioGroup value={enumerationMode} onValueChange={setEnumerationMode} className="gap-3">{radioChoice("Bulk user enumeration protection", "Rate limits prevent discovery at scale while preserving clear account recovery.", "bulk", "enumeration")}{radioChoice("Strict user enumeration protection", "Use generic messaging even for single-user lookup attempts.", "strict", "enumeration")}</RadioGroup></div></PolicyCard>
    </div>;

    return <div className="space-y-4">
      <PolicyCard title="User Model" description="Profile, identity, and retention defaults.">
        <div className="border-b px-5 py-3.5"><div className="text-sm font-medium">Primary identifier</div><p className="mt-0.5 text-sm text-muted-foreground">Choose which identifier new users must provide first.</p><div className="mt-3"><SelectField label="Primary identifier" value={identifier} onValueChange={setIdentifier} options={[["email", "Email address"], ["phone", "Phone number"], ["username", "Public username"]]} className="w-full sm:max-w-sm" /></div></div>
        {switchRow("Collect profile name", "Require users to provide a display name during onboarding.", "profile-name")}
        {switchRow("Allow user deletion", "Permit users to request deletion from account settings.", "user-deletion")}
      </PolicyCard>
      <PolicyCard title="Model Summary" description="Applied to new projects." badge={<Badge variant="secondary" size="sm">4 fields</Badge>}>
        {[["Primary identifier", identifier === "email" ? "Email address" : identifier === "phone" ? "Phone number" : "Public username", "Required", "Login, recovery, and account notices."], ["Public username", "Optional", "Optional", "Reserved for profile URLs and mentions."], ["Profile name", "Required", "Required", "Shown in audits, invites, and team lists."], ["Account retention", "90 days", "", "Restore soft-deleted users before purge."]].map(([label, value, badge, description]) => <div key={label} className="border-b px-5 py-3 last:border-b-0"><div className="flex items-center justify-between gap-3"><span className="text-xs text-muted-foreground">{label}</span>{badge && (label === "Primary identifier" ? <Badge variant="warning-light" size="sm">Required</Badge> : null)}</div><p className="mt-0.5 text-sm font-medium">{label === "Profile name" && !toggles["profile-name"] ? "Optional" : value}</p><p className="mt-0.5 text-xs text-muted-foreground">{description}</p></div>)}
      </PolicyCard>
    </div>;
  }

  return <div className="mx-auto w-full max-w-4xl space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold tracking-tight">User Authentication</h2><p className="mt-1 text-sm text-muted-foreground">Configure sign-up, sign-in, and protection rules.</p></div><SelectField label="Environment preview" value={preview} onValueChange={setPreview} options={[["preview", "Preview"], ["staging", "Staging"], ["production", "Production"]]} className="w-36" /></div>
    <Tabs value={tab} onValueChange={(value) => setTab(value as PolicyKey)} className="gap-4">
      <TabsList variant="line" className="w-full justify-start gap-4 overflow-x-auto rounded-none border-b px-1">
        {policyTabs.map((item) => <TabsTrigger key={item.id} value={item.id} className="flex-none rounded-none px-1.5 py-2 data-active:after:bottom-0">
          {item.status && <span aria-hidden="true" className={`size-1.5 rounded-full ${item.status === "ready" ? "bg-emerald-500" : "bg-amber-500"}`} />}{item.label}{item.pro && <Badge variant="success" size="sm">Pro</Badge>}
        </TabsTrigger>)}
      </TabsList>
      {policyTabs.map((item) => <TabsContent key={item.id} value={item.id}>{policyBody(item.id)}</TabsContent>)}
    </Tabs>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"><span className="text-sm text-muted-foreground">{notice || "Policy changes stay in preview until published."}</span><div className="flex gap-2"><Button variant="outline" onClick={discardChanges}><IconRefresh />Discard</Button><Button onClick={() => setNotice("Authentication policy saved.")}><IconDeviceFloppy />Save policy</Button></div></div>
  </div>;
}
