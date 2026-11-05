"use client";

import { useState } from "react";
import { IconAlertTriangle, IconCopy, IconEye, IconEyeOff, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

type ApiKey = { id: string; name: string; status: "Active" | "Rotating" | "Restricted"; team: string; environment: string; stack: string; lastUsed: string; value: string; browser?: boolean };

const initialKeys: ApiKey[] = [
  { id: "browser", name: "Browser publishable key", status: "Active", team: "Frontend Platform", environment: "Production", stack: "Next.js", lastUsed: "4m ago", value: "pk_live_nextrose_7X9m...R2qA", browser: true },
  { id: "server", name: "Server default", status: "Active", team: "Core API", environment: "Production", stack: "Node API", lastUsed: "11m ago", value: "sk_live_nextrose_demo_server_8f4d" },
  { id: "worker", name: "Usage sync worker", status: "Rotating", team: "Data Jobs", environment: "Production", stack: "Python", lastUsed: "22m ago", value: "sk_live_nextrose_demo_worker_3c2a" },
  { id: "webhook", name: "Webhook verifier", status: "Restricted", team: "Integrations", environment: "Production", stack: "Webhooks", lastUsed: "2h ago", value: "rk_live_nextrose_demo_hook_6b10" },
];

const stackOptions = [["next", "Next.js"], ["node", "Node API"], ["python", "Python"], ["webhooks", "Webhooks"]] as const;
const scopeOptions = [["read-users", "Read users"], ["write-users", "Write users"], ["read-billing", "Read billing"], ["write-billing", "Write billing"], ["send-events", "Send events"], ["verify-webhooks", "Verify webhooks"]] as const;
const ownerOptions = ["Mira Stone", "Leo Grant", "Ari Bennett"];

function SelectField({ label, value, onValueChange, options, className = "w-full" }: { label: string; value: string; onValueChange: (value: string) => void; options: readonly (readonly [string, string])[]; className?: string }) {
  return <Select value={value} onValueChange={onValueChange}><SelectTrigger aria-label={label} className={className}><SelectValue>{options.find(([key]) => key === value)?.[1]}</SelectValue></SelectTrigger><SelectContent>{options.map(([key, title]) => <SelectItem key={key} value={key}>{title}</SelectItem>)}</SelectContent></Select>;
}

export function ApiKeys() {
  const [keys, setKeys] = useState(initialKeys);
  const [stack, setStack] = useState("next");
  const [visible, setVisible] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [securityNotice, setSecurityNotice] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState("Usage sync worker");
  const [newStack, setNewStack] = useState("next");
  const [environment, setEnvironment] = useState("production");
  const [expiration, setExpiration] = useState("90");
  const [owners, setOwners] = useState(["Mira Stone", "Leo Grant"]);
  const [scopes, setScopes] = useState(["read-users", "write-users"]);

  const snippetLines = stack === "next"
    ? [["NEXT_PUBLIC_NEXTROSE_PUBLISHABLE_KEY", "pk_live_nrose_...R2qA"], ["NEXTROSE_SECRET_KEY", "sk_live_••••••••••••••••••••"], ["NEXTROSE_API_URL", "https://api.nextrose.dev/v1"]]
    : stack === "node"
      ? [["NEXTROSE_API_KEY", "sk_live_••••••••••••••••••••"], ["NEXTROSE_API_URL", "https://api.nextrose.dev/v1"]]
      : stack === "python"
        ? [["NEXTROSE_API_KEY", "sk_live_••••••••••••••••••••"], ["NEXTROSE_API_URL", "https://api.nextrose.dev/v1"]]
        : [["NEXTROSE_WEBHOOK_SECRET", "whsec_••••••••••••••••••"], ["NEXTROSE_API_URL", "https://api.nextrose.dev/v1"]];

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice(`${label} copied.`);
    } catch {
      setNotice("Clipboard access is unavailable in this preview.");
    }
  }

  function toggleVisible(id: string) {
    setVisible((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function rotateKey(id: string) {
    setKeys((current) => current.map((key) => key.id === id ? { ...key, value: `${key.value.split("_").slice(0, 3).join("_")}_rotated_5d31`, status: "Rotating", lastUsed: "Rotated just now" } : key));
    setNotice("Key rotation queued. The old key remains available in this preview until dependent services are updated.");
  }

  function revokeKey(id: string) {
    const key = keys.find((item) => item.id === id);
    setKeys((current) => current.filter((item) => item.id !== id));
    setNotice(`${key?.name ?? "Key"} revoked.`);
  }

  function createKey() {
    const id = `key-${Date.now()}`;
    const stackName = stackOptions.find(([key]) => key === newStack)?.[1] ?? "Next.js";
    const environmentName = environment === "production" ? "Production" : environment === "preview" ? "Preview" : "Development";
    setKeys((current) => [...current, { id, name: keyName.trim() || "New API key", status: "Active", team: owners.join(", "), environment: environmentName, stack: stackName, lastUsed: "Never", value: `sk_live_nextrose_demo_${id.slice(-6)}` }]);
    setCreateOpen(false);
    setNotice("API key created.");
  }

  function toggleScope(value: string, checked: boolean) { setScopes((current) => checked ? [...new Set([...current, value])] : current.filter((item) => item !== value)); }
  function toggleOwner(value: string, checked: boolean) { setOwners((current) => checked ? [...new Set([...current, value])] : current.filter((item) => item !== value)); }

  return <div className="mx-auto w-full max-w-3xl space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h2 className="text-2xl font-semibold tracking-tight">API Keys</h2><p className="mt-1 text-sm text-muted-foreground">Manage credentials and copy stack-ready environment values.</p></div>
      <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground">{keys.length} keys</span><Button onClick={() => setCreateOpen(true)}><IconPlus />Create Key</Button></div>
    </div>

    <Card className="gap-0 bg-muted/20 py-0 shadow-none">
      <CardContent className="px-1 py-1">
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
          <div><CardTitle className="text-sm">Quick Copy</CardTitle><p className="mt-0.5 text-sm text-muted-foreground">Choose a stack and paste the environment block.</p></div>
          <div className="flex gap-1.5"><SelectField label="Select framework stack" value={stack} onValueChange={setStack} options={stackOptions} className="w-44" /><Button variant="outline" onClick={() => copy(snippetLines.map(([name, value]) => `${name}=${value}`).join("\n"), "Environment snippet")}><IconCopy />Copy</Button></div>
        </div>
        <div className="overflow-x-auto rounded-lg bg-foreground px-3 py-2.5 font-mono text-xs text-background">
          {snippetLines.map(([name, value], index) => <div key={name} className="flex min-w-max gap-4 py-0.5"><span className="w-4 select-none text-background/40">{index + 1}</span><code><span className="text-success">{name}</span>={value}</code></div>)}
        </div>
      </CardContent>
    </Card>

    <Card className="gap-0 py-0 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b px-4 py-3">
        <div><CardTitle className="text-sm">Keys</CardTitle><p className="mt-0.5 text-sm text-muted-foreground">Copy, reveal, rotate, or revoke workspace keys.</p></div>
        <Button variant="outline" size="sm" onClick={() => setCreateOpen(true)}><IconPlus />Add Key</Button>
      </CardHeader>
      <CardContent className="space-y-0 px-1 py-1">
        {keys.map((key) => {
          const revealed = visible.includes(key.id);
          const statusVariant = key.status === "Active" ? "success-light" : key.status === "Rotating" ? "warning-light" : "info-light";
          return <div key={key.id} className="grid gap-3 border-b px-4 py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_21rem] sm:items-center">
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-medium">{key.name}</span><Badge variant={statusVariant} size="sm">{key.status}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{key.team}<span className="mx-1.5 text-muted-foreground/50">•</span>{key.environment}<span className="mx-1.5 text-muted-foreground/50">•</span>{key.stack}</p></div>
            <div className="min-w-0"><div className="flex h-8 items-center gap-1 rounded-lg border border-input bg-background px-2 font-mono text-xs"><span className="min-w-0 flex-1 truncate">{key.browser || revealed ? key.value : `sk_live_${"•".repeat(18)}`}</span><Button aria-label={`Copy ${key.name}`} variant="ghost" size="icon-sm" onClick={() => copy(key.value, key.name)}><IconCopy /></Button>{!key.browser && <><Button aria-label={`${revealed ? "Hide" : "Reveal"} ${key.name}`} variant="ghost" size="icon-sm" onClick={() => toggleVisible(key.id)}>{revealed ? <IconEyeOff /> : <IconEye />}</Button><Button aria-label={`Rotate ${key.name}`} variant="ghost" size="icon-sm" onClick={() => rotateKey(key.id)}><IconRefresh /></Button><Button aria-label={`Revoke ${key.name}`} variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => revokeKey(key.id)}><IconTrash /></Button></>}</div><p className="mt-1 text-right text-xs text-muted-foreground">Last used {key.lastUsed}</p></div>
          </div>;
        })}
        {keys.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No keys yet.</div>}
      </CardContent>
    </Card>

    {notice && <p role="status" className="text-xs text-muted-foreground">{notice}</p>}
    {securityNotice && <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm"><div className="flex gap-2"><IconAlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" /><div><p className="font-medium">Keep secret keys server-side</p><p className="mt-0.5 text-muted-foreground">Rotate immediately if a key appears in client code, logs, or shared screenshots.</p></div></div><Button variant="destructive" size="sm" onClick={() => setSecurityNotice(false)}>Dismiss</Button></div>}

    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent size="lg" className="flex max-h-[min(42rem,calc(100vh-2rem))] flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b px-5 py-4"><DialogTitle>Create API Key</DialogTitle><DialogDescription>Generate a stack-scoped key with only the permissions it needs.</DialogDescription></DialogHeader>
        <DialogBody className="space-y-4 px-5 py-4">
          <div><label htmlFor="new-api-key-name" className="text-sm font-medium">Key name</label><Input id="new-api-key-name" value={keyName} onChange={(event) => setKeyName(event.target.value)} placeholder="Usage sync worker" className="mt-1.5" /><p className="mt-1 text-xs text-muted-foreground">Use a service or workflow name.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium">Stack</label><SelectField label="Key stack" value={newStack} onValueChange={setNewStack} options={stackOptions} className="mt-1.5 w-full" /><p className="mt-1 text-xs text-muted-foreground">{newStack === "next" ? "App Router, route handlers, and server actions." : newStack === "node" ? "Node services and API workers." : newStack === "python" ? "Python services and data jobs." : "Incoming webhook verification."}</p></div>
            <div><label className="text-sm font-medium">Environment</label><SelectField label="Key environment" value={environment} onValueChange={setEnvironment} options={[["production", "Production"], ["preview", "Preview"], ["development", "Development"]]} className="mt-1.5 w-full" /><p className="mt-1 text-xs text-muted-foreground">{environment === "production" ? "Live keys with customer traffic." : environment === "preview" ? "Keys for preview deployments." : "Local development only."}</p></div>
          </div>
          <div><label className="text-sm font-medium">Expiration</label><SelectField label="Key expiration" value={expiration} onValueChange={setExpiration} options={[["30", "30 days"], ["90", "90 days"], ["180", "180 days"], ["never", "Never"]]} className="mt-1.5 w-full sm:max-w-sm" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Access owners</span><span className="text-xs text-muted-foreground">{owners.length} assigned</span></div>{ownerOptions.map((owner) => <Field key={owner} orientation="horizontal" className="items-center gap-2"><Checkbox id={`key-owner-${owner}`} checked={owners.includes(owner)} onCheckedChange={(value) => toggleOwner(owner, value === true)} /><FieldLabel htmlFor={`key-owner-${owner}`} className="font-normal">{owner}</FieldLabel></Field>)}<p className="text-xs text-muted-foreground">People who can view, rotate, or revoke this key.</p></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Scopes</span><span className="text-xs text-muted-foreground">{scopes.length} selected</span></div><div className="grid gap-2 sm:grid-cols-2">{scopeOptions.map(([value, label]) => <Field key={value} orientation="horizontal" className="items-center gap-2"><Checkbox id={`key-scope-${value}`} checked={scopes.includes(value)} onCheckedChange={(checked) => toggleScope(value, checked === true)} /><FieldLabel htmlFor={`key-scope-${value}`} className="font-normal">{label}</FieldLabel></Field>)}</div></div>
        </DialogBody>
        <DialogFooter className="shrink-0 bg-muted/20 px-5 py-3"><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={createKey}><IconPlus />Create Key</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>;
}
