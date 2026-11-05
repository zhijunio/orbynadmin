"use client";

import { useState } from "react";
import { IconCheck, IconHelpCircle, IconPlus, IconShieldCheck } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

type CheckoutOption = { id: string; label: string; checked?: boolean; disabled?: boolean; badge?: string };

const customerDetails: CheckoutOption[] = [
  { id: "customer-name", label: "Collect customer name", checked: true },
  { id: "company-name", label: "Ask for company name" },
  { id: "delivery-address", label: "Collect delivery address" },
];
const checkoutRules: CheckoutOption[] = [
  { id: "managed-authorization", label: "Run managed authorization", checked: true, badge: "Live" },
  { id: "purchase-limit", label: "Limit completed purchases" },
  { id: "phone-verification", label: "Require phone verification" },
];
const receiptDetails: CheckoutOption[] = [
  { id: "branded-receipt", label: "Send branded receipt", checked: true },
  { id: "follow-up-offers", label: "Allow follow-up offers" },
  { id: "terms-acceptance", label: "Require terms acceptance", disabled: true },
];

export function CheckoutSetup() {
  const [checked, setChecked] = useState(() => [...customerDetails, ...checkoutRules, ...receiptDetails].filter((option) => option.checked).map((option) => option.id));
  const [offerType, setOfferType] = useState("Product bundle");
  const [offer, setOffer] = useState("Growth seat bundle");
  const [buttonCopy, setButtonCopy] = useState("Reserve access");
  const [handoff, setHandoff] = useState("Show confirmation");
  const [returnUrl, setReturnUrl] = useState("https://northstar.studio/welcome");
  const [notice, setNotice] = useState("");

  function toggle(id: string, value: boolean) {
    setChecked((current) => value ? [...new Set([...current, id])] : current.filter((item) => item !== id));
  }

  function optionRows(title: string, options: CheckoutOption[]) {
    return <FieldSet className="grid gap-2 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-4">
      <h3 className="pt-0.5 text-sm font-medium">{title}</h3>
      <FieldGroup className="gap-2">
        {options.map((option) => <Field key={option.id} orientation="horizontal" disabled={option.disabled} className="items-center gap-2">
          <Checkbox id={`checkout-${option.id}`} checked={checked.includes(option.id)} disabled={option.disabled} onCheckedChange={(value) => toggle(option.id, value === true)} />
          <FieldLabel htmlFor={`checkout-${option.id}`} className="flex min-w-0 items-center gap-1.5 font-normal">
            {option.label}
            {option.badge && <Badge variant="success-light" className="px-1.5 py-0 text-[10px]">{option.badge}</Badge>}
            {option.disabled && <IconHelpCircle aria-label="Connect legal terms to enable" className="size-3.5 text-muted-foreground" />}
          </FieldLabel>
        </Field>)}
      </FieldGroup>
    </FieldSet>;
  }

  function controlRow(label: string, control: React.ReactNode, help = false) {
    return <div className="grid gap-2 sm:grid-cols-[16rem_minmax(0,1fr)] sm:items-center sm:gap-4">
      <div className="flex items-center gap-1.5 text-sm font-medium">{label}{help && <IconHelpCircle aria-label={`${label} help`} className="size-3.5 text-muted-foreground" />}</div>
      {control}
    </div>;
  }

  return <Card className="mx-auto w-full max-w-2xl gap-0 shadow-none">
    <CardHeader className="gap-3 border-b bg-muted/20 px-5 py-4 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-0.5"><CardTitle className="text-base">Checkout Setup</CardTitle><CardDescription>Hosted checkout settings.</CardDescription></div>
        <Badge variant="success-light" className="gap-1"><IconCheck className="size-3.5" />Ready to publish</Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-5 px-5 py-4 sm:px-6">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Checkout setup</h2>
        <p className="text-sm text-muted-foreground">Configure offer, checkout requirements, and post-purchase handoff.</p>
      </div>
      {controlRow("Offer Type", <Select value={offerType} onValueChange={setOfferType}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{["Product bundle", "Subscription", "Single product"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>, true)}
      <div className="grid gap-2 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-4">
        <label htmlFor="checkout-offer" className="text-sm font-medium">Offer</label>
        <div className="grid gap-2"><Input id="checkout-offer" value={offer} onChange={(event) => setOffer(event.target.value)} className="w-full" /><Button type="button" variant="outline" className="w-fit" onClick={() => setNotice("Add-ons are ready to configure.")}><IconPlus />Add add-ons</Button></div>
      </div>
      {optionRows("Customer Details", customerDetails)}
      {optionRows("Checkout Rules", checkoutRules)}
      {controlRow("Button Copy", <Select value={buttonCopy} onValueChange={setButtonCopy}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{["Reserve access", "Pay now", "Complete order"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>)}
      {controlRow("Handoff", <Select value={handoff} onValueChange={setHandoff}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{["Show confirmation", "Redirect to URL", "Show download"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>)}
      {controlRow("Return URL", <Input value={returnUrl} onChange={(event) => setReturnUrl(event.target.value)} aria-label="Return URL" />, true)}
      {optionRows("Receipt Details", receiptDetails)}
      {notice && <p role="status" className="text-xs text-muted-foreground">{notice}</p>}
    </CardContent>
    <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3 sm:px-6">
      <span className="text-xs text-muted-foreground">Draft stays private.</span>
      <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setNotice("Draft saved.")}>Save draft</Button><Button type="button" onClick={() => setNotice("Checkout published.")}><IconShieldCheck />Publish checkout</Button></div>
    </CardFooter>
  </Card>;
}
