"use client";

import { PageHeader } from "@/components/feature/layout/PageHeader";

import { AtSign as IconAt, CreditCard as IconCreditCard, Mail as IconMail, Search as IconSearch, Save as IconDeviceFloppy, Filter as IconFilter, RefreshCw as IconRefresh } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Checkbox } from "@/components/ui/checkbox";

function AccountBillingExamples() {
  return <div className="grid gap-5 xl:grid-cols-2">
    <ExampleCard title="Account settings" footer={<SaveFooter />}>
      <div className="space-y-5">
        <FieldRow htmlFor="acc-name" label="Display name"><Input id="acc-name" defaultValue="Wei Zhang" /></FieldRow>
        <FieldRow htmlFor="acc-email" label="Email address"><InputGroup className="h-10"><InputGroupAddon><IconMail /></InputGroupAddon><InputGroupInput id="acc-email" type="email" defaultValue="alex.morgan@orbynadmin.com" /></InputGroup></FieldRow>
        <FieldRow htmlFor="acc-username" label="Username"><InputGroup className="h-10"><InputGroupAddon><IconAt /></InputGroupAddon><InputGroupInput id="acc-username" defaultValue="alexmorgan" /></InputGroup></FieldRow>
        <FieldRow htmlFor="acc-website" label="Website"><InputGroup className="h-10"><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput id="acc-website" defaultValue="alexmorgan.design" /></InputGroup></FieldRow>
        <FieldRow htmlFor="acc-bio" label="Bio"><Textarea id="acc-bio" rows={3} defaultValue="Administrator at OrbynAdmin. Helping teams manage their operations." /></FieldRow>
      </div>
    </ExampleCard>

    <ExampleCard title="Billing details" footer={<SaveFooter saveLabel="Save billing details" />}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cardholder name" htmlFor="bill-name" className="sm:col-span-2"><Input id="bill-name" defaultValue="Alexandra Morgan" /></Field>
        <Field label="Card number" htmlFor="bill-card" className="sm:col-span-2"><InputGroup className="h-10"><InputGroupAddon><IconCreditCard /></InputGroupAddon><InputGroupInput id="bill-card" defaultValue="4242 4242 4242 4242" /><InputGroupAddon align="inline-end"><InputGroupText>Visa</InputGroupText></InputGroupAddon></InputGroup></Field>
        <Field label="Expiry date" htmlFor="bill-exp"><Input id="bill-exp" defaultValue="09 / 27" /></Field>
        <Field label="CVC" htmlFor="bill-cvc"><Input id="bill-cvc" defaultValue="123" /></Field>
        <Field label="Country" htmlFor="bill-country"><Select defaultValue="us"><SelectTrigger id="bill-country" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="us">United States</SelectItem><SelectItem value="ca">Canada</SelectItem><SelectItem value="uk">United Kingdom</SelectItem><SelectItem value="de">Germany</SelectItem><SelectItem value="au">Australia</SelectItem></SelectContent></Select></Field>
        <Field label="Postal code" htmlFor="bill-zip"><Input id="bill-zip" defaultValue="94114" /></Field>
        <Field label="Billing address" htmlFor="bill-addr" className="sm:col-span-2"><Input id="bill-addr" defaultValue="2100 Market Street, Suite 400" /></Field>
        <Field label="City" htmlFor="bill-city"><Input id="bill-city" defaultValue="San Francisco" /></Field>
        <Field label="State / Region" htmlFor="bill-state"><Input id="bill-state" defaultValue="California" /></Field>
      </div>
    </ExampleCard>
  </div>;
}

function ExampleCard({ title, children, footer }: { title: string; children: React.ReactNode; footer: React.ReactNode }) {
  return <Card className="gap-0 border border-border py-0 ring-0"><CardHeader className="border-b px-6 py-4"><CardTitle className="text-sm font-semibold">{title}</CardTitle></CardHeader><CardContent className="p-6">{children}</CardContent>{footer}</Card>;
}

function FieldRow({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="grid gap-2 border-b pb-5 last:border-0 last:pb-0 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-6"><Label htmlFor={htmlFor}>{label}</Label><div className="max-w-md">{children}</div></div>;
}

function Field({ label, htmlFor, className, children }: { label: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return <div className={`space-y-1.5 ${className ?? ""}`}><Label htmlFor={htmlFor}>{label}</Label>{children}</div>;
}

function FilterFormExample() {
  return <Card className="gap-0 border border-border py-0 ring-0"><CardHeader className="border-b px-6 py-4"><CardTitle className="text-sm font-semibold">Filter customers</CardTitle></CardHeader><CardContent className="p-6"><div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
    <div className="flex-1 space-y-1.5 sm:min-w-[220px]"><Label htmlFor="filter-search">Search</Label><InputGroup className="h-10"><InputGroupAddon><IconSearch /></InputGroupAddon><InputGroupInput id="filter-search" placeholder="Search by name or email..." /></InputGroup></div>
    <div className="space-y-1.5"><Label htmlFor="filter-status">Status</Label><Select defaultValue="all"><SelectTrigger id="filter-status" className="w-full sm:w-[150px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>
    <div className="space-y-1.5"><Label htmlFor="filter-plan">Plan</Label><Select defaultValue="all"><SelectTrigger id="filter-plan" className="w-full sm:w-[150px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All plans</SelectItem><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></SelectContent></Select></div>
    <div className="space-y-1.5"><Label htmlFor="filter-date">Joined after</Label><Input id="filter-date" type="date" defaultValue="2024-01-01" className="sm:w-[170px]" /></div>
    <FilterActions />
  </div></CardContent></Card>;
}

function SaveFooter({ saveLabel = "Save changes" }: { saveLabel?: string }) {
  return (
    <CardFooter className="justify-end gap-2">
      <Button variant="outline" onClick={() => toast("Changes discarded")}>
        Cancel
      </Button>
      <Button
        onClick={() =>
          toast.success("Saved", {
            description: "Your changes have been saved.",
          })
        }
      >
        <IconDeviceFloppy className="size-4" /> {saveLabel}
      </Button>
    </CardFooter>
  );
}

function FilterActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() =>
          toast.success("Filters applied", {
            description: "The list has been updated.",
          })
        }
      >
        <IconFilter className="size-4" /> Apply
      </Button>
      <Button variant="ghost" onClick={() => toast("Filters reset")}>
        <IconRefresh className="size-4" /> Reset
      </Button>
    </div>
  );
}

function FormLayoutExamples() {
  return <div className="space-y-5"><div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    <LayoutExampleCard title="Contact Form">
      <form className="space-y-5" onSubmit={(event) => submitDemo(event, "Contact form submitted", "This demo does not send a real message.")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <LayoutField label="First name" htmlFor="contact-first"><Input id="contact-first" /></LayoutField>
          <LayoutField label="Last name" htmlFor="contact-last"><Input id="contact-last" /></LayoutField>
          <LayoutField label="Email *" htmlFor="contact-email"><Input id="contact-email" type="email" required /></LayoutField>
          <LayoutField label="Subject" htmlFor="contact-subject"><Input id="contact-subject" /></LayoutField>
          <LayoutField label="Topic" htmlFor="contact-topic" className="sm:col-span-2"><Select defaultValue="general"><SelectTrigger id="contact-topic" className="w-full"><SelectValue placeholder="Select a topic" /></SelectTrigger><SelectContent><SelectItem value="general">General question</SelectItem><SelectItem value="billing">Billing</SelectItem><SelectItem value="support">Technical support</SelectItem></SelectContent></Select></LayoutField>
          <LayoutField label="Message" htmlFor="contact-message" className="sm:col-span-2"><Textarea id="contact-message" rows={5} /></LayoutField>
        </div>
        <div className="flex justify-end"><Button type="submit">Send Message</Button></div>
      </form>
    </LayoutExampleCard>

    <div className="flex flex-col gap-5">
      <LayoutExampleCard title="Sign In Form">
        <form className="space-y-5" onSubmit={(event) => submitDemo(event, "Sign in form submitted", "This is a layout demo; no account was signed in.")}>
          <LayoutField label="Email" htmlFor="signin-email"><Input id="signin-email" type="email" required /></LayoutField>
          <LayoutField label="Password" htmlFor="signin-password"><Input id="signin-password" type="password" required /></LayoutField>
          <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Checkbox id="signin-remember" /><Label htmlFor="signin-remember" className="font-normal">Remember me</Label></div><Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link></div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </LayoutExampleCard>

      <LayoutExampleCard title="Sign Up Form">
        <form className="space-y-5" onSubmit={(event) => submitDemo(event, "Sign up form submitted", "This is a layout demo; no account was created.")}>
          <LayoutField label="Name" htmlFor="signup-name"><Input id="signup-name" required /></LayoutField>
          <LayoutField label="Email" htmlFor="signup-email"><Input id="signup-email" type="email" required /></LayoutField>
          <LayoutField label="Password" htmlFor="signup-password"><Input id="signup-password" type="password" required minLength={8} /></LayoutField>
          <LayoutField label="Re-type Password" htmlFor="signup-password-confirm"><Input id="signup-password-confirm" type="password" required minLength={8} /></LayoutField>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </LayoutExampleCard>
    </div>
  </div><AccountBillingExamples /><FilterFormExample /></div>;
}

function submitDemo(event: React.FormEvent<HTMLFormElement>, title: string, description: string) {
  event.preventDefault();
  toast.success(title, { description });
}

function LayoutExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card className="gap-0 border border-border py-0 ring-0">
    <CardHeader className="border-b px-6 py-4"><CardTitle className="text-sm font-semibold">{title}</CardTitle></CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>;
}

function LayoutField({ label, htmlFor, className, children }: { label: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col gap-1.5 ${className ?? ""}`}><Label htmlFor={htmlFor} className="text-sm font-medium">{label}</Label>{children}</div>;
}

export default function FormLayoutPage() {
  return <div className="space-y-5"><PageHeader title="Form Layout" /><FormLayoutExamples /></div>;
}
