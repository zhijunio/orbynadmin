"use client";

import { useMemo, useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { DatePicker } from "@/components/ui/date-picker/date-picker";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

type Line = { id: number; description: string; quantity: number; rate: number; tax: number };
const initialLines: Line[] = [{ id: 1, description: "Platform subscription", quantity: 1, rate: 2400, tax: 8.25 }, { id: 2, description: "Implementation support", quantity: 6, rate: 150, tax: 8.25 }];
export function SendInvoiceWizard() {
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState(initialLines);
  const [discount, setDiscount] = useState(5);
  const [customer, setCustomer] = useState("Orchid Ledger Group");
  const [taxId, setTaxId] = useState("US-88-2947135");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2048");
  const [poReference, setPoReference] = useState("PO-7418");
  const [issueDate, setIssueDate] = useState<CalendarDate | null>(new CalendarDate(2026, 4, 24));
  const [dueDate, setDueDate] = useState<CalendarDate | null>(new CalendarDate(2026, 5, 8));
  const [currency, setCurrency] = useState("USD");
  const [paymentTerms, setPaymentTerms] = useState("Net 14");
  const [collection, setCollection] = useState("ACH transfer");
  const [billingAddress, setBillingAddress] = useState("14 Warren Street, Suite 620, New York, NY");
  const [message, setMessage] = useState("Thank you for your business. Please contact us if you have any questions about this invoice.");
  const [delivery, setDelivery] = useState("Email invoice");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.quantity * line.rate, 0), [lines]);
  const tax = useMemo(() => lines.reduce((sum, line) => sum + line.quantity * line.rate * line.tax / 100, 0), [lines]);
  const total = subtotal + tax - subtotal * discount / 100;

  function advance() {
    if (step === 1 && (!customer.trim() || !invoiceNumber.trim() || !issueDate || !dueDate)) {
      setError("Complete the required customer, invoice, and date fields before continuing.");
      return;
    }
    if (step === 2 && (!lines.length || lines.some((line) => !line.description.trim() || line.quantity <= 0))) {
      setError("Add a description and positive quantity for each invoice item.");
      return;
    }
    setError("");
    setNotice("");
    if (step < 4) setStep((current) => current + 1);
    else setNotice(`Invoice ${invoiceNumber} sent to ${customer}.`);
  }

  return <section className="mx-auto w-full min-w-0 max-w-5xl overflow-hidden rounded-xl border bg-card">
    <header className="grid grid-cols-[1fr_minmax(6rem,18rem)_3rem] items-center gap-4 border-b bg-background px-4 py-3"><div className="flex items-center gap-3"><Button aria-label="Close invoice wizard" variant="ghost" size="icon-sm" onClick={() => setNotice("Invoice draft closed.")}><IconX /></Button><span className="h-5 border-l" /><h3 className="text-sm font-medium">Send invoice</h3></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${step * 25}%` }} /></div><span className="text-right text-xs text-muted-foreground">{step} / 4</span></header>
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex items-center justify-between gap-4"><div><h4 className="text-base font-semibold">{["Customer Details", "Invoice Items", "Notes & Delivery", "Review Invoice"][step - 1]}</h4><p className="mt-1 text-sm text-muted-foreground">{["Customer, invoice references, and billing terms.", "Add line items and review tax and discount totals.", "Add a note and choose how the invoice is delivered.", "Check the final invoice before sending."][step - 1]}</p></div>{step === 1 && <Badge variant="outline">USD</Badge>}</div>
      {step === 1 && <div className="space-y-5"><section className="space-y-3"><div><h5 className="text-sm font-semibold">Customer <Badge className="ml-1" variant="success-light">Required</Badge></h5><p className="text-sm text-muted-foreground">Billable account and invoice reference.</p></div><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1.5 text-sm font-medium">Customer<Input value={customer} onChange={(event) => setCustomer(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">Tax ID<Input value={taxId} onChange={(event) => setTaxId(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">Invoice Number<Input value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">PO Reference<Input value={poReference} onChange={(event) => setPoReference(event.target.value)} /></label></div></section><div className="border-t" /><section className="space-y-3"><div><h5 className="text-sm font-semibold">Terms <Badge className="ml-1" variant="warning-light">{paymentTerms}</Badge></h5><p className="text-sm text-muted-foreground">Dates, currency, and collection method.</p></div><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1.5 text-sm font-medium">Issue Date<DatePicker aria-label="Issue Date" value={issueDate} onChange={setIssueDate} /></label><label className="space-y-1.5 text-sm font-medium">Due Date<DatePicker aria-label="Due Date" value={dueDate} onChange={setDueDate} /></label><SelectField label="Currency" value={currency} onValueChange={setCurrency} options={["USD", "EUR", "GBP"]} /><SelectField label="Payment Terms" value={paymentTerms} onValueChange={setPaymentTerms} options={["Net 14", "Net 30", "Due on receipt"]} /><SelectField label="Collection" value={collection} onValueChange={setCollection} options={["ACH transfer", "Credit card", "Bank transfer"]} /><label className="space-y-1.5 text-sm font-medium">Billing Address<Input value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} /></label></div></section></div>}
      {step === 2 && <div className="space-y-4"><div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-muted/30 text-xs text-muted-foreground"><tr>{["Description", "Qty", "Rate", "Tax", "Amount", ""].map((label) => <th key={label} className="px-3 py-2 font-medium">{label}</th>)}</tr></thead><tbody>{lines.map((line) => <tr key={line.id} className="border-t"><td className="px-3 py-2"><Input aria-label="Line item description" value={line.description} onChange={(event) => updateLine(line.id, { description: event.target.value })} /></td><td className="w-20 px-2"><Input aria-label="Quantity" type="number" min="1" value={line.quantity} onChange={(event) => updateLine(line.id, { quantity: Number(event.target.value) })} /></td><td className="w-28 px-2"><Input aria-label="Rate" type="number" min="0" value={line.rate} onChange={(event) => updateLine(line.id, { rate: Number(event.target.value) })} /></td><td className="w-24 px-2"><Input aria-label="Tax percent" type="number" min="0" value={line.tax} onChange={(event) => updateLine(line.id, { tax: Number(event.target.value) })} /></td><td className="whitespace-nowrap px-3">${(line.quantity * line.rate).toFixed(2)}</td><td className="px-2"><Button aria-label="Remove line item" variant="ghost" size="icon-sm" onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}><IconX /></Button></td></tr>)}</tbody></table></div><Button variant="outline" size="sm" onClick={() => setLines((current) => [...current, { id: Math.max(0, ...current.map((item) => item.id)) + 1, description: "", quantity: 1, rate: 0, tax: 0 }])}>Add line item</Button><div className="ml-auto grid w-full max-w-sm gap-2 border-t pt-3 text-sm"><SummaryRow label="Subtotal" value={subtotal} /><label className="flex items-center justify-between gap-3">Discount<Input aria-label="Discount percent" className="w-24" type="number" min="0" max="100" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} /></label><SummaryRow label="Tax" value={tax} /><SummaryRow label="Total" value={total} strong /></div></div>}
      {step === 3 && <div className="space-y-3"><label className="space-y-1.5 text-sm font-medium">Message to customer<textarea className="min-h-32 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50" value={message} onChange={(event) => setMessage(event.target.value)} /></label><SelectField label="Send by" value={delivery} onValueChange={setDelivery} options={["Email invoice", "Copy share link", "Save as draft"]} /><p className="text-xs text-muted-foreground">The customer will receive a secure link to view and pay this invoice.</p></div>}
      {step === 4 && <div className="space-y-4"><dl className="divide-y rounded-lg border">{[["Customer", customer], ["Invoice", invoiceNumber], ["Due", formatInvoiceDate(dueDate)], ["Payment terms", paymentTerms]].map(([label, value]) => <ReviewRow key={label} label={label} value={value} />)}</dl><div className="space-y-2 rounded-lg bg-muted/30 p-4"><SummaryRow label="Subtotal" value={subtotal} currency={currency} /><SummaryRow label={`Discount (${discount}%)`} value={-subtotal * discount / 100} currency={currency} /><SummaryRow label="Tax" value={tax} currency={currency} /><div className="border-t pt-2"><SummaryRow label="Total due" value={total} currency={currency} strong /></div><p className="border-t pt-2 text-sm text-muted-foreground">Delivery · {delivery}</p></div></div>}
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}{notice && <p role="status" className="mt-4 text-sm text-muted-foreground">{notice}</p>}
    </div>
    <footer className="flex justify-end gap-2 border-t bg-background px-4 py-3">{step > 1 && <Button variant="outline" onClick={() => { setNotice(""); setStep((current) => current - 1); }}><IconArrowLeft />Previous</Button>}<Button onClick={advance}>{step === 4 ? "Send invoice" : "Continue"}<IconArrowRight /></Button></footer>
  </section>;

  function updateLine(id: number, patch: Partial<Line>) { setLines((current) => current.map((line) => line.id === id ? { ...line, ...patch } : line)); }
}
function SelectField({ label, value, onValueChange, options }: { label: string; value: string; onValueChange: (value: string) => void; options: string[] }) { return <label className="space-y-1.5 text-sm font-medium">{label}<Select value={value} onValueChange={onValueChange}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></label>; }
function SummaryRow({ label, value, currency = "USD", strong = false }: { label: string; value: number; currency?: string; strong?: boolean }) { return <div className={`flex justify-between ${strong ? "font-semibold" : "text-muted-foreground"}`}><span>{label}</span><span className={strong ? "text-foreground" : ""}>{new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value)}</span></div>; }
function ReviewRow({ label, value }: { label: string; value: string }) { return <div className="grid grid-cols-2 gap-2 px-3 py-2.5 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-medium">{value}</dd></div>; }
function formatInvoiceDate(date: CalendarDate | null) { return date ? new Date(date.year, date.month - 1, date.day).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"; }
