"use client";

import { useState } from "react";
import { IconArrowRight, IconCheck, IconFlag, IconPlus, IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

type Owner = { id: number; name: string; address: string; share: string };
export function VendorOnboarding() {
  const [step, setStep] = useState(2);
  const [owners, setOwners] = useState<Owner[]>([{ id: 1, name: "Maya Chen", address: "214 Mission Street, San Francisco, CA", share: "52%" }, { id: 2, name: "Kai Morgan", address: "18 King Street, Seattle, WA", share: "28%" }]);
  const [taxId, setTaxId] = useState("US-82-4917721");
  const [date, setDate] = useState("08/08/2025");
  const [reviewed, setReviewed] = useState(true);
  const [docs, setDocs] = useState([true, true]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const toggleDoc = (index: number) => setDocs((current) => current.map((checked, position) => position === index ? !checked : checked));
  function next() {
    if (step === 2 && (!taxId.trim() || !date.trim() || !reviewed || owners.some((owner) => !owner.name.trim() || !owner.address.trim() || !owner.share.trim()))) return setError("Complete the required ownership and tax information.");
    if (step === 3 && docs.filter(Boolean).length < 2) return setError("Select both required compliance documents.");
    setError("");
    if (step < 3) setStep(step + 1);
    else setNotice("Vendor documents submitted for review.");
  }

  return <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-card">
    <header className="flex items-start justify-between gap-3 px-4 py-3"><div><h3 className="text-sm font-semibold">Procurement Vendor Setup</h3><p className="text-sm text-muted-foreground">VEN-2048 · Software subscription</p></div><Badge variant="warning-light">Review file</Badge></header>
    <div className="border-y bg-background">
      <nav aria-label="Vendor setup progress" className="flex items-center gap-2 px-4 py-3">{["Company Details", "Compliance", "Submit"].map((title, index) => <div key={title} className="flex min-w-0 flex-1 items-center gap-2"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs ${index + 1 < step ? "border-primary bg-primary text-primary-foreground" : index + 1 === step ? "border-foreground" : "text-muted-foreground"}`}>{index + 1 < step ? <IconCheck className="size-3.5" /> : index + 1}</span><span className="truncate text-xs font-medium">{title}</span>{index < 2 && <span className="h-px flex-1 bg-border" />}</div>)}</nav>
      <div className="border-t p-4 sm:p-5">
        {step === 1 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Company Details</h4><p className="text-sm text-muted-foreground">Business and primary contact.</p></div><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1.5 text-sm font-medium">Legal company name<Input defaultValue="Kepler Works, Inc." /></label><label className="space-y-1.5 text-sm font-medium">Website<Input defaultValue="kepler.works" /></label><label className="space-y-1.5 text-sm font-medium">Primary contact<Input defaultValue="Mara Chen" /></label><label className="space-y-1.5 text-sm font-medium">Contact email<Input type="email" defaultValue="mara@kepler.works" /></label></div><label className="block space-y-1.5 text-sm font-medium">Service category<Select defaultValue="Software subscription"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Software subscription">Software subscription</SelectItem><SelectItem value="Professional services">Professional services</SelectItem><SelectItem value="Hardware">Hardware</SelectItem></SelectContent></Select></label></div>}
        {step === 2 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Compliance</h4><p className="text-sm text-muted-foreground">Confirm ownership and tax records.</p></div><div className="space-y-2">{owners.map((owner) => <div key={owner.id} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_4.5rem_2rem]"><Input aria-label="Owner name" value={owner.name} onChange={(event) => setOwners((rows) => rows.map((row) => row.id === owner.id ? { ...row, name: event.target.value } : row))} /><Input aria-label="Owner address" value={owner.address} onChange={(event) => setOwners((rows) => rows.map((row) => row.id === owner.id ? { ...row, address: event.target.value } : row))} /><Input aria-label="Ownership percentage" value={owner.share} onChange={(event) => setOwners((rows) => rows.map((row) => row.id === owner.id ? { ...row, share: event.target.value } : row))} /><Button variant="ghost" size="icon-sm" aria-label={`Remove ${owner.name}`} onClick={() => setOwners((rows) => rows.filter((row) => row.id !== owner.id))}><IconTrash /></Button></div>)}</div><div className="flex justify-end"><Button variant="outline" size="sm" onClick={() => setOwners((rows) => [...rows, { id: Math.max(0, ...rows.map((row) => row.id)) + 1, name: "", address: "", share: "" }])}><IconPlus />Add owner</Button></div><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1.5 text-sm font-medium">Tax/VAT ID <span className="text-destructive">*</span><Input value={taxId} onChange={(event) => setTaxId(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">Date Incorporated <span className="text-destructive">*</span><Input value={date} onChange={(event) => setDate(event.target.value)} /></label></div><label className="flex items-start gap-2 text-sm"><Checkbox checked={reviewed} onCheckedChange={(value) => setReviewed(value === true)} /><span><span className="font-medium">Ownership reviewed</span><span className="block text-muted-foreground">Records match company documents.</span></span></label></div>}
        {step === 3 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Documents & review</h4><p className="text-sm text-muted-foreground">Choose the compliance documents received.</p></div><div className="divide-y rounded-lg border">{["W-9 tax form", "Proof of business registration", "Bank verification letter"].map((name, index) => <label key={name} className="flex items-center gap-3 p-3 text-sm"><Checkbox checked={docs[index] ?? false} onCheckedChange={() => toggleDoc(index)} /><span className="min-w-0 flex-1">{name}</span><Badge variant={docs[index] ? "success-light" : "secondary"}>{docs[index] ? "Received" : "Requested"}</Badge></label>)}</div><div className="rounded-lg bg-muted/30 p-3 text-sm"><p className="font-medium">Ownership summary</p><p className="mt-1 text-muted-foreground">{owners.map((owner) => `${owner.name} (${owner.share})`).join(" · ")}</p><p className="mt-1 text-muted-foreground">Tax/VAT ID · {taxId}</p></div></div>}
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}{notice && <p role="status" className="mt-3 text-sm text-primary">{notice}</p>}
      </div>
    </div>
    <footer className="flex flex-wrap items-center justify-between gap-3 bg-muted/20 px-4 py-2.5"><p className="flex items-center gap-1.5 text-sm text-muted-foreground"><IconFlag className="size-4" />{step === 2 ? "Owners and tax IDs." : step === 3 ? "Required documents: 2." : "Company and contact details."}</p><div className="flex gap-2"><Button variant="outline" disabled={step === 1} onClick={() => { setError(""); setStep(step - 1); }}>Previous</Button><Button onClick={next}>{step === 3 ? "Submit vendor" : "Next Step"}<IconArrowRight /></Button></div></footer>
  </section>;
}
