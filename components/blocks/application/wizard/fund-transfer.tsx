"use client";

import { useMemo, useState } from "react";
import { IconArrowRight, IconCheck, IconChevronRight, IconSearch, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import { InputOtp } from "@/components/ui/input-otp/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Payee = { id: string; name: string; bank: string; account: string; country: string; flag: string; initials: string; lastPaid?: string };
const payees: Payee[] = [
  { id: "emma", name: "Emma Clarke", bank: "Mercury Bank · Consulting", account: "3508", country: "USD", flag: "US", initials: "EC", lastPaid: "Paid Apr 18" },
  { id: "mason", name: "Mason Reed", bank: "Aster Bank · Contractor", account: "1184", country: "USD", flag: "US", initials: "MR", lastPaid: "Paid May 03" },
  { id: "oliver", name: "Oliver Bennett", bank: "Barclays Business · Supplier", account: "7420", country: "GBP", flag: "GB", initials: "OB" },
  { id: "helio", name: "Helio Parts Co.", bank: "Commerzbank · Parts invoice", account: "4318", country: "EUR", flag: "DE", initials: "HP" },
  { id: "keystone", name: "Keystone Systems", bank: "Chase Business · Services", account: "2206", country: "USD", flag: "US", initials: "KS" },
  { id: "lauren", name: "Lauren Patel", bank: "Monzo Business · Design", account: "9012", country: "GBP", flag: "GB", initials: "LP" },
];
const progress = ["Payee", "Amount", "Details", "Authorize"];
const flags: Record<string, string> = { US: "🇺🇸", GB: "🇬🇧", DE: "🇩🇪" };
export function FundTransferWizard() {
  const [step, setStep] = useState(1);
  const [payee, setPayee] = useState<Payee | null>(payees[0]);
  const [search, setSearch] = useState("");
  const [walletOnly, setWalletOnly] = useState(false);
  const [amount, setAmount] = useState("2400");
  const [currency, setCurrency] = useState("USD");
  const [source, setSource] = useState("Operating wallet · 8842");
  const [memo, setMemo] = useState("April design services");
  const [code, setCode] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const filtered = useMemo(() => payees.filter((item) => `${item.name} ${item.bank} ${item.account} ${item.country}`.toLowerCase().includes(search.toLowerCase()) && (!walletOnly || item.id === "emma" || item.id === "mason")), [search, walletOnly]);
  const insufficient = Number(amount) > 8450;

  function advance() {
    if (step === 1 && !payee) return setError("Select a payee to continue.");
    if (step === 2 && (Number(amount) <= 0 || insufficient)) return setError(insufficient ? "The transfer exceeds the available balance." : "Enter an amount greater than zero.");
    if (step === 4 && (code.length !== 6 || !terms)) return setError("Enter the 6-digit authorization code and accept the terms.");
    setError("");
    if (step < 4) setStep((current) => current + 1);
    else setComplete(true);
  }

  return <section className="mx-auto flex min-h-[42rem] w-full min-w-0 max-w-5xl flex-col overflow-hidden rounded-xl border bg-card">
    <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b px-4 py-3"><h3 className="text-sm font-semibold">Fund Transfer</h3><nav aria-label="Transfer progress" className="flex items-center gap-2">{progress.map((title, index) => <div key={title} className="flex items-center gap-2"><span className={`flex size-6 items-center justify-center rounded-full border text-xs ${step === index + 1 ? "border-foreground" : index + 1 < step ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{index + 1 < step ? <IconCheck className="size-3.5" /> : index + 1}</span><span className={`hidden text-sm sm:inline ${step === index + 1 ? "font-medium" : "text-muted-foreground"}`}>{title}</span>{index < 3 && <span className="h-px w-4 bg-border" />}</div>)}</nav><Button className="justify-self-end" aria-label="Close transfer" variant="ghost" size="icon-sm" onClick={() => setComplete(false)}><IconX /></Button></header>
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-5">
      {step === 1 && <><div className="mb-4"><h4 className="text-sm font-semibold">Recent payees</h4><div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">{payees.map((item) => <button key={item.id} type="button" aria-pressed={payee?.id === item.id} onClick={() => setPayee(item)} className={`min-w-0 rounded-lg p-1.5 text-center ${payee?.id === item.id ? "bg-muted" : "hover:bg-muted/50"}`}><span className="relative mx-auto block w-fit"><Avatar className="size-10"><AvatarImage src={demoAvatarUrl(item.id)} alt="" /><AvatarFallback>{item.initials}</AvatarFallback></Avatar><span role="img" aria-label={`${item.flag} country`} className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-background text-[11px] leading-none shadow-sm">{flags[item.flag]}</span></span><span className="mt-2 block truncate text-xs font-medium">{item.name}</span><span className="block truncate text-[10px] text-muted-foreground">{item.bank.split(" · ")[0]}</span></button>)}</div></div><div className="mb-3"><h4 className="text-sm font-semibold">Saved accounts</h4><div className="relative mt-2"><IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" aria-label="Search accounts" placeholder="Name, bank, ending, or country" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="mt-2 flex gap-2"><Button size="sm" variant={!walletOnly ? "secondary" : "outline"} onClick={() => setWalletOnly(false)}>All</Button><Button size="sm" variant={walletOnly ? "secondary" : "outline"} onClick={() => setWalletOnly(true)}>My wallets</Button></div></div><div className="min-h-0 flex-1 divide-y overflow-y-auto">{filtered.map((item) => <button key={item.id} type="button" aria-pressed={payee?.id === item.id} onClick={() => setPayee(item)} className={`flex w-full items-center gap-3 py-3 text-left ${payee?.id === item.id ? "bg-muted/50" : "hover:bg-muted/30"}`}><Avatar className="size-10"><AvatarImage src={demoAvatarUrl(item.id)} alt="" /><AvatarFallback>{item.initials}</AvatarFallback></Avatar><span role="img" aria-label={`${item.flag} country`} className="-ml-5 mt-5 grid size-4 shrink-0 place-items-center rounded-full bg-background text-[11px] leading-none shadow-sm">{flags[item.flag]}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{item.name}</span><span className="block truncate text-sm text-muted-foreground">{item.bank} ending {item.account}</span></span><span className="hidden text-xs text-muted-foreground sm:inline">{item.lastPaid}</span><IconChevronRight className="size-4 text-muted-foreground" /></button>)}</div></>}
      {step === 2 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Transfer amount</h4><p className="text-sm text-muted-foreground">Enter an amount and choose a funding source.</p></div><div className="flex gap-2"><label className="min-w-0 flex-1 space-y-1.5 text-sm font-medium">Amount<Input type="number" min="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} /></label><label className="w-28 space-y-1.5 text-sm font-medium">Currency<Select value={currency} onValueChange={setCurrency}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="USD">US · USD</SelectItem><SelectItem value="EUR">EU · EUR</SelectItem><SelectItem value="GBP">GB · GBP</SelectItem></SelectContent></Select></label></div><label className="space-y-1.5 text-sm font-medium">From account<Select value={source} onValueChange={setSource}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Operating wallet · 8842">Operating wallet · 8842 · $8,450 available</SelectItem><SelectItem value="Reserve account · 1120">Reserve account · 1120 · $22,100 available</SelectItem></SelectContent></Select></label>{insufficient && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">Amount is above the available $8,450 balance.</p>}</div>}
      {step === 3 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Transfer details</h4><p className="text-sm text-muted-foreground">Add a reference for the recipient.</p></div><div className="rounded-lg border p-3"><span className="text-xs text-muted-foreground">Paying</span><div className="mt-2 flex items-center gap-3"><Avatar><AvatarFallback>{payee?.initials}</AvatarFallback></Avatar><span><span className="block text-sm font-medium">{payee?.name}</span><span className="text-sm text-muted-foreground">{payee?.bank} ending {payee?.account}</span></span></div></div><label className="space-y-1.5 text-sm font-medium">Memo<Input value={memo} onChange={(event) => setMemo(event.target.value)} /></label><label className="space-y-1.5 text-sm font-medium">Reference<Input defaultValue="INV-2048" /></label><div className="flex justify-between rounded-lg bg-muted/30 p-3 text-sm"><span>Transfer total</span><strong>{currency} {Number(amount).toLocaleString()}</strong></div></div>}
      {step === 4 && <div className="space-y-4"><div><h4 className="text-sm font-semibold">Authorize transfer</h4><p className="text-sm text-muted-foreground">Enter the security code sent to your device.</p></div><div className="rounded-lg border p-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Recipient</span><strong>{payee?.name}</strong></div><div className="mt-2 flex justify-between"><span className="text-muted-foreground">Amount</span><strong>{currency} {Number(amount).toLocaleString()}</strong></div><div className="mt-2 flex justify-between"><span className="text-muted-foreground">From</span><strong>{source}</strong></div></div><fieldset className="space-y-2"><legend className="text-sm font-medium">6-digit security code</legend><InputOtp aria-label="6-digit security code" length={6} value={code} onChange={setCode} /></fieldset><label className="flex items-start gap-2 text-sm"><Checkbox checked={terms} onCheckedChange={(value) => setTerms(value === true)} /><span>I confirm the recipient and transfer details are correct.</span></label></div>}
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}{complete && <p role="status" className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">Transfer submitted successfully.</p>}
    </div><footer className="flex justify-end gap-2 border-t px-5 py-3"><Button variant="outline" disabled={step === 1 || complete} onClick={() => { setError(""); setStep((current) => current - 1); }}>Previous</Button><Button disabled={complete} onClick={advance}>{complete ? "Transfer submitted" : step === 4 ? "Authorize transfer" : "Continue"}<IconArrowRight /></Button></footer>
  </section>;
}
