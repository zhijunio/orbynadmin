"use client";

import { useState } from "react";
import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card/card";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper/stepper";
import { Switch } from "@/components/ui/switch/switch";

const steps = [
  { title: "Information", description: "Billing owner" },
  { title: "Payment", description: "Billing controls" },
  { title: "Completed", description: "Review and activate" },
];

export function BillingSetupWizard() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("Mara");
  const [lastName, setLastName] = useState("Chen");
  const [company, setCompany] = useState("Kepler Works");
  const [handle, setHandle] = useState("kepler-works");
  const [role, setRole] = useState("Procurement owner");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("mara@kepler.works");
  const [mobile, setMobile] = useState("+1 415 5151");
  const [receiptCopies, setReceiptCopies] = useState(["billing@kepler.works"]);
  const [receiptDraft, setReceiptDraft] = useState("");
  const [cycle, setCycle] = useState("Quarterly");
  const [taxId, setTaxId] = useState("US-82-4917721");
  const [spendLimit, setSpendLimit] = useState("25000");
  const [poNumber, setPoNumber] = useState("PO-2026-184");
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  function next() {
    if (step === 1 && (!firstName.trim() || !lastName.trim() || !company.trim() || !email.trim())) return setError("Complete the required billing owner information to continue.");
    if (step === 2 && (!spendLimit || Number(spendLimit) <= 0)) return setError("Enter a spend limit greater than zero.");
    setError("");
    if (step < 3) setStep(step + 1);
    else setComplete(true);
  }

  function addReceiptCopy() {
    const value = receiptDraft.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setError("Enter a valid receipt email address.");
    setReceiptCopies((current) => current.includes(value) ? current : [...current, value]);
    setReceiptDraft("");
    setError("");
  }

  return <Card className="mx-auto w-full max-w-5xl gap-0 shadow-none">
    <CardContent className="space-y-5 px-4 py-4 sm:px-4">
      <Stepper value={step} className="w-full">
        <StepperNav className="-mx-4 -mt-4 items-start border-b px-4 py-3 sm:-mx-4">
          {steps.map((item, index) => <StepperItem key={item.title} step={index + 1} className="flex-1">
            <StepperTrigger className="flex-row items-center gap-2 text-left"><StepperIndicator className="size-6 text-xs">{index < step - 1 ? <IconCheck className="size-3.5" /> : index + 1}</StepperIndicator><span className="min-w-0"><StepperTitle className="text-sm">{item.title}</StepperTitle></span></StepperTrigger>
            {index < steps.length - 1 && <StepperSeparator className="absolute left-[calc(1.125rem+0.5rem)] right-0 top-[1.125rem] -z-10 sm:left-[calc(50%+1.25rem)]" />}
          </StepperItem>)}
        </StepperNav>
        <StepperContent value={1} className="mt-6 space-y-4">
          <div className="space-y-0.5"><h3 className="text-sm font-semibold">Your Information</h3><p className="text-sm text-muted-foreground">Billing owner details.</p></div>
          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2"><RequiredText label="First Name" value={firstName} onChange={setFirstName} /><RequiredText label="Last Name" value={lastName} onChange={setLastName} /><RequiredText label="Company" value={company} onChange={setCompany} /><label className="space-y-1.5 text-sm font-medium">Public Handle<InputGroup><InputGroupAddon>@</InputGroupAddon><InputGroupInput aria-label="Public Handle" value={handle} onChange={(event) => setHandle(event.target.value)} /></InputGroup></label><label className="space-y-1.5 text-sm font-medium">Role<Select value={role} onValueChange={setRole}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Procurement owner">Procurement owner</SelectItem><SelectItem value="Finance lead">Finance lead</SelectItem><SelectItem value="Workspace admin">Workspace admin</SelectItem></SelectContent></Select></label><label className="space-y-1.5 text-sm font-medium">Country<Select value={country} onValueChange={setCountry}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="United States">United States</SelectItem><SelectItem value="Canada">Canada</SelectItem><SelectItem value="United Kingdom">United Kingdom</SelectItem></SelectContent></Select></label><RequiredText label="Email Address" value={email} onChange={setEmail} type="email" /><label className="space-y-1.5 text-sm font-medium">Mobile<Input type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)} /></label></div><p className="text-sm text-muted-foreground">Receipts go here.</p>
        </StepperContent>
        <StepperContent value={2} className="mt-6 space-y-4">
          <div className="space-y-0.5"><h3 className="text-sm font-semibold">Payment Details</h3><p className="text-sm text-muted-foreground">Billing controls.</p></div>
          <label className="space-y-1.5 text-sm font-medium">Billing Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <div className="space-y-1.5"><label htmlFor="receipt-copy-input" className="text-sm font-medium">Receipt Copies</label><div className="flex gap-2"><Input id="receipt-copy-input" type="email" placeholder="Add receipt email" value={receiptDraft} onChange={(event) => setReceiptDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addReceiptCopy(); } }} /><Button type="button" variant="outline" onClick={addReceiptCopy}>Add</Button></div><div className="flex flex-wrap gap-1.5">{receiptCopies.map((address) => <Badge key={address} variant="secondary" className="gap-1">{address}<button type="button" aria-label={`Remove ${address}`} className="ml-1" onClick={() => setReceiptCopies((current) => current.filter((item) => item !== address))}><IconX className="size-3" /></button></Badge>)}</div></div>
          <label className="space-y-1.5 text-sm font-medium">Billing Cycle<Select value={cycle} onValueChange={setCycle}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem><SelectItem value="Annually">Annually</SelectItem></SelectContent></Select></label>
          <label className="space-y-1.5 text-sm font-medium">Tax ID<Input value={taxId} onChange={(event) => setTaxId(event.target.value)} /></label>
          <label className="space-y-1.5 text-sm font-medium">PO Number<Input value={poNumber} onChange={(event) => setPoNumber(event.target.value)} /></label>
          <label className="space-y-1.5 text-sm font-medium">Spend Limit<InputGroup><InputGroupAddon>$</InputGroupAddon><InputGroupInput aria-label="Spend Limit" type="number" min="1" value={spendLimit} onChange={(event) => setSpendLimit(event.target.value)} /></InputGroup></label>
          <Field orientation="horizontal" className="items-center justify-between gap-3 rounded-lg border p-3"><div><FieldLabel htmlFor="billing-alerts">Billing alerts</FieldLabel><p className="text-xs text-muted-foreground">Email the billing owner about invoices and spend limits.</p></div><Switch id="billing-alerts" checked={billingAlerts} onCheckedChange={setBillingAlerts} /></Field>
        </StepperContent>
        <StepperContent value={3} className="mt-6 space-y-4">
          <div className="space-y-1"><h3 className="text-sm font-semibold">Review billing setup</h3><p className="text-sm text-muted-foreground">Check these details before saving.</p></div>
          <section><h4 className="mb-2 text-sm font-semibold">Account</h4><dl className="divide-y rounded-lg border"><ReviewRow label="Owner" value={`${firstName} ${lastName}`} /><ReviewRow label="Company" value={company} /><ReviewRow label="Handle" value={`@${handle}`} /><ReviewRow label="Role" value={role} /></dl></section>
          <section><h4 className="mb-2 text-sm font-semibold">Billing</h4><dl className="divide-y rounded-lg border"><ReviewRow label="Email" value={email || "—"} /><ReviewRow label="Cycle" value={cycle} /><ReviewRow label="Limit" value={`$${Number(spendLimit || 0).toLocaleString()}`} /><ReviewRow label="Receipts" value={receiptCopies.join(", ") || "No copies"} /></dl></section>
          <section><h4 className="mb-2 text-sm font-semibold">Activation</h4><dl className="divide-y rounded-lg border"><ReviewRow label="Country" value={country} /><ReviewRow label="Billing alerts" value={billingAlerts ? "Enabled" : "Disabled"} /><ReviewRow label="Tax ID" value={taxId} /><ReviewRow label="PO Number" value={poNumber || "Not set"} /></dl></section>
        </StepperContent>
      </Stepper>
      {complete && <p role="status" className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">Billing setup saved for {firstName} {lastName}.</p>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </CardContent>
    {!complete && <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 px-5 py-3 sm:px-4">{step > 1 && <Button type="button" variant="outline" onClick={() => { setError(""); setStep(Math.max(1, step - 1)); }}><IconArrowLeft />Previous Step</Button>}<Button type="button" onClick={next}>{step === 3 ? <>Complete Setup<IconCheck /></> : <>Next Step<IconArrowRight /></>}</Button></CardFooter>}
  </Card>;
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="break-words text-sm font-medium">{value}</dd></div>;
}

function RequiredText({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: "text" | "email" }) {
  return <label className="space-y-1.5 text-sm font-medium">{label}<span className="ml-1 text-destructive">*</span><Input type={type} value={value} onChange={(event) => onChange(event.target.value)} required /></label>;
}
