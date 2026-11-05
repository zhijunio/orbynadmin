"use client";

import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { IconBuilding, IconInfoCircle, IconMessage, IconPlus, IconSend, IconTrash, IconX } from "@tabler/icons-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Combobox } from "@/components/ui/combobox/combobox";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { Separator } from "@/components/ui/divider/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input/input-group";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip/tooltip";

type Customer = { id: string; name: string; taxId: string; billingAddress: string };
type Product = { id: string; name: string; rate: number; taxRate: number; detail: string };
type Line = { id: string; productId: string; qty: number; rate: number; taxRate: number };

const customers: Customer[] = [
  { id: "orchid", name: "Orchid Ledger Group", taxId: "US-88-2947135", billingAddress: "14 Warren Street, Suite 620, New York, NY" },
  { id: "northwind", name: "Northwind Studio", taxId: "US-41-8821044", billingAddress: "88 King Street, Suite 12, San Francisco, CA" },
  { id: "harborline", name: "Harborline Systems", taxId: "US-17-3309182", billingAddress: "410 Wacker Drive, Chicago, IL" },
];

const products: Product[] = [
  { id: "retainer", name: "Implementation retainer", rate: 4800, taxRate: 0.0825, detail: "One-time rollout fee. Taxed at 8.25%." },
  { id: "support", name: "Priority support block", rate: 950, taxRate: 0, detail: "Reserved response hours. No tax." },
  { id: "workshop", name: "Discovery workshop", rate: 2400, taxRate: 0.0825, detail: "Facilitated planning session. Taxed at 8.25%." },
];

const paymentTerms = ["Due on receipt", "Net 14", "Net 30"];
const collections = ["ACH transfer", "Card", "Wire transfer"];
const currencies = ["USD", "EUR", "GBP"];
const taxChoices = [
  { value: "0", label: "No tax" },
  { value: "0.0825", label: "8.25%" },
];

const currencySymbol: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function HelpTip({ label }: { label: string }) {
  return <Tooltip>
    <TooltipTrigger asChild>
      <button type="button" aria-label={label} className="text-muted-foreground hover:text-foreground">
        <IconInfoCircle className="size-3.5" />
      </button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>;
}

function FieldLabel({ htmlFor, children, help }: { htmlFor?: string; children: string; help?: string }) {
  return <div className="mb-1.5 flex items-center gap-1 text-sm font-medium">
    <label htmlFor={htmlFor}>{children}</label>
    {help && <HelpTip label={help} />}
  </div>;
}

export function InvoiceCreator() {
  const [customerId, setCustomerId] = useState("orchid");
  const [billingAddress, setBillingAddress] = useState(customers[0].billingAddress);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2048");
  const [poReference, setPoReference] = useState("PO-7418");
  const [issueDate, setIssueDate] = useState<CalendarDate | null>(new CalendarDate(2026, 4, 24));
  const [dueDate, setDueDate] = useState<CalendarDate | null>(new CalendarDate(2026, 5, 8));
  const [currency, setCurrency] = useState("USD");
  const [terms, setTerms] = useState("Net 14");
  const [collection, setCollection] = useState("ACH transfer");
  const [notes, setNotes] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [lines, setLines] = useState<Line[]>([
    { id: "line-1", productId: "retainer", qty: 1, rate: 4800, taxRate: 0.0825 },
    { id: "line-2", productId: "support", qty: 2, rate: 950, taxRate: 0 },
  ]);
  const [nextLine, setNextLine] = useState(3);

  const customer = customers.find((item) => item.id === customerId);
  const symbol = currencySymbol[currency] ?? "$";
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
  const discount = subtotal * (discountPercent / 100);
  const tax = lines.reduce((sum, line) => sum + line.qty * line.rate * line.taxRate, 0);
  const total = subtotal - discount + tax;

  function chooseCustomer(value: string | string[]) {
    const id = Array.isArray(value) ? value[0] ?? "" : value;
    const next = customers.find((item) => item.id === id);
    setCustomerId(id);
    setBillingAddress(next?.billingAddress ?? "");
  }

  function updateLine(id: string, patch: Partial<Line>) {
    setLines((current) => current.map((line) => line.id === id ? { ...line, ...patch } : line));
  }

  function chooseProduct(id: string, productId: string) {
    const product = products.find((item) => item.id === productId);
    updateLine(id, { productId, rate: product?.rate ?? 0, taxRate: product?.taxRate ?? 0 });
  }

  function addLine() {
    setLines((current) => [...current, { id: `line-${nextLine}`, productId: "", qty: 1, rate: 0, taxRate: 0 }]);
    setNextLine((current) => current + 1);
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!customer) {
      toast.error("Choose a customer before sending.");
      return;
    }
    toast.success("Invoice sent", { description: `${invoiceNumber} for ${customer.name} is ready to collect.` });
  }

  return <form onSubmit={send} className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
    <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2.5">
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Close invoice editor"><IconX /></Button>
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-sm font-medium">Create invoice</span>
        <Badge variant="warning-light">Draft</Badge>
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={() => toast("Thanks for the feedback.")}><IconMessage />Feedback</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => toast("Draft saved")}>Save draft</Button>
        <Button type="submit" size="sm"><IconSend />Send invoice</Button>
      </div>
    </div>
    <Card className="mx-auto my-6 w-full max-w-4xl gap-0 border-0 py-0 shadow-none ring-1 ring-foreground/10">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b px-5 py-4">
        <div className="space-y-0.5">
          <CardTitle>Invoice Details</CardTitle>
          <p className="text-sm text-muted-foreground">Customer, terms, items, and payment notes.</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="warning-light">Draft</Badge>
          <Badge variant="outline">{currency}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-5 py-5">
        <section className="space-y-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2"><h3 className="text-sm font-semibold">Customer</h3><Badge variant="success-light">Required</Badge></div>
            <p className="text-sm text-muted-foreground">Billable account and invoice reference.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel help="Billable account for this invoice.">Customer</FieldLabel>
              <Combobox aria-label="Customer" className="w-full" clearable options={customers.map((item) => ({ value: item.id, label: item.name }))} value={customerId} onValueChange={chooseCustomer} placeholder="Select a customer" />
            </div>
            <div>
              <FieldLabel help="Filled from the selected customer.">Tax ID</FieldLabel>
              <InputGroup>
                <InputGroupAddon><IconBuilding /></InputGroupAddon>
                <InputGroupInput readOnly aria-label="Tax ID" value={customer?.taxId ?? ""} />
              </InputGroup>
            </div>
            <div>
              <FieldLabel htmlFor="invoice-number" help="Shown on the invoice and payment reference.">Invoice Number</FieldLabel>
              <InputGroup>
                <InputGroupAddon>#</InputGroupAddon>
                <InputGroupInput id="invoice-number" value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} />
              </InputGroup>
            </div>
            <div>
              <FieldLabel htmlFor="po-reference">PO Reference</FieldLabel>
              <Input id="po-reference" value={poReference} onChange={(event) => setPoReference(event.target.value)} />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2"><h3 className="text-sm font-semibold">Terms</h3><Badge variant="info-light">{terms}</Badge></div>
            <p className="text-sm text-muted-foreground">Dates, currency, and collection method.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><FieldLabel>Issue Date</FieldLabel><DatePicker aria-label="Issue date" value={issueDate} onChange={setIssueDate} /></div>
            <div><FieldLabel>Due Date</FieldLabel><DatePicker aria-label="Due date" value={dueDate} onChange={setDueDate} /></div>
            <div>
              <FieldLabel>Currency</FieldLabel>
              <Select value={currency} onValueChange={setCurrency}><SelectTrigger className="w-full" aria-label="Currency"><SelectValue>{currency}</SelectValue></SelectTrigger><SelectContent>{currencies.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <FieldLabel>Payment Terms</FieldLabel>
              <Select value={terms} onValueChange={setTerms}><SelectTrigger className="w-full" aria-label="Payment terms"><SelectValue>{terms}</SelectValue></SelectTrigger><SelectContent>{paymentTerms.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <FieldLabel>Collection</FieldLabel>
              <Select value={collection} onValueChange={setCollection}><SelectTrigger className="w-full" aria-label="Collection"><SelectValue>{collection}</SelectValue></SelectTrigger><SelectContent>{collections.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <FieldLabel htmlFor="billing-address">Billing Address</FieldLabel>
              <Input id="billing-address" value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2"><h3 className="text-sm font-semibold">Line Items</h3><Badge variant="secondary">{lines.length} {lines.length === 1 ? "item" : "items"}</Badge></div>
              <p className="text-sm text-muted-foreground">Products, services, quantity, tax, and amount.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addLine}><IconPlus />Add item</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="w-24">Qty</TableHead>
                <TableHead className="w-36">Rate</TableHead>
                <TableHead className="w-32">Tax</TableHead>
                <TableHead className="w-32 text-right">Amount</TableHead>
                <TableHead className="w-12"><span className="sr-only">Remove</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => {
                const product = products.find((item) => item.id === line.productId);
                const amount = line.qty * line.rate;
                return <TableRow key={line.id}>
                  <TableCell>
                    <div className="flex min-w-48 items-center gap-1.5">
                      <Combobox aria-label="Line item" className="w-full min-w-0" options={products.map((item) => ({ value: item.id, label: item.name }))} value={line.productId} onValueChange={(value) => chooseProduct(line.id, Array.isArray(value) ? value[0] ?? "" : value)} placeholder="Select item" />
                      {product && <HelpTip label={product.detail} />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input aria-label="Quantity" inputMode="numeric" className="w-20" value={line.qty} onChange={(event) => updateLine(line.id, { qty: Math.max(0, Number(event.target.value) || 0) })} />
                  </TableCell>
                  <TableCell>
                    <InputGroup className="w-32">
                      <InputGroupAddon>{symbol}</InputGroupAddon>
                      <InputGroupInput aria-label="Rate" inputMode="decimal" value={line.rate} onChange={(event) => updateLine(line.id, { rate: Math.max(0, Number(event.target.value) || 0) })} />
                    </InputGroup>
                  </TableCell>
                  <TableCell>
                    <Select value={String(line.taxRate)} onValueChange={(value) => updateLine(line.id, { taxRate: Number(value) })}>
                      <SelectTrigger className="w-28" aria-label="Tax"><SelectValue>{taxChoices.find((item) => item.value === String(line.taxRate))?.label}</SelectValue></SelectTrigger>
                      <SelectContent>{taxChoices.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right font-medium">{money(amount, currency)}</TableCell>
                  <TableCell>
                    <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${product?.name ?? "line"}`} onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}><IconTrash /></Button>
                  </TableCell>
                </TableRow>;
              })}
            </TableBody>
          </Table>
        </section>

        <section className="grid gap-6 border-t pt-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <FieldLabel htmlFor="payment-notes">Payment notes</FieldLabel>
            <Textarea id="payment-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Payment instructions or a note for the customer." />
          </div>
          <div className="space-y-3 rounded-lg bg-muted/40 p-4 text-sm">
            <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">Subtotal</span><span>{money(subtotal, currency)}</span></div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Discount</span>
              <div className="flex items-center gap-2">
                <InputGroup className="w-24">
                  <InputGroupInput id="invoice-discount" aria-label="Discount percent" inputMode="decimal" value={discountPercent} onChange={(event) => setDiscountPercent(Math.min(100, Math.max(0, Number(event.target.value) || 0)))} />
                  <InputGroupAddon align="inline-end">%</InputGroupAddon>
                </InputGroup>
                <span className="w-20 text-right">-{money(discount, currency)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">Tax</span><span>{money(tax, currency)}</span></div>
            <Separator />
            <div className="flex items-center justify-between gap-3 text-base font-semibold"><span>Total</span><span>{money(total, currency)}</span></div>
          </div>
        </section>
      </CardContent>
    </Card>
  </form>;
}
