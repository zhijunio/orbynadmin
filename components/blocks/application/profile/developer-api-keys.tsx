"use client";

import { useState } from "react";
import { IconArrowBackUp, IconCopy, IconEye, IconEyeOff, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab/tabs";

type KeyType = "Secret" | "Publishable";
type ApiKey = { id: string; name: string; key: string; secret: string; type: KeyType; scope: string; date: string; activity: string; revoked: boolean };
const initialKeys: ApiKey[] = [
  { id: "key-1", name: "Production Server", key: "nstr_live_sk…7f2a", secret: "nstr_live_sk_4z2h9j6q8m3n5p1r7t4v6x8c91", type: "Secret", scope: "Server only", date: "Aug 12", activity: "Used 2 min ago", revoked: false },
  { id: "key-2", name: "Web Checkout", key: "nstr_live_pk…c41d", secret: "nstr_live_pk_8m3r6t9w2y5a8c1e4g7j0k2m2x", type: "Publishable", scope: "app.northstar.dev +1", date: "Jul 30", activity: "Used 14 min ago", revoked: false },
  { id: "key-3", name: "Staging Worker", key: "nstr_test_sk…09be", secret: "nstr_test_sk_2p5r8t1w4y7a0c3e6g9j2m5n77", type: "Secret", scope: "Server only", date: "Jul 18", activity: "Used 3 days ago", revoked: false },
  { id: "key-4", name: "Preview Deploys", key: "nstr_test_pk…e8a3", secret: "nstr_test_pk_6a2c5e8g1j4m7p0r3t6w9y2z4b", type: "Publishable", scope: "*.preview.northstar.dev", date: "Jun 4", activity: "Never used", revoked: false },
  { id: "key-5", name: "Legacy Mobile", key: "nstr_live_pk…d7c1", secret: "nstr_live_pk_9f2h5j8m1p4r7t0v3x6z9c2b18", type: "Publishable", scope: "m.northstar.dev", date: "Mar 21", activity: "Revoked Aug 2", revoked: true },
];
const snippets: Record<string, string> = {
  Node: 'const client = new Northstar({ apiKey: process.env.NORTHSTAR_API_KEY });\nconst result = await client.events.list({ limit: 10 });',
  Python: 'from northstar import Client\nclient = Client(api_key=os.environ["NORTHSTAR_API_KEY"])\nresult = client.events.list(limit=10)',
  Ruby: 'client = Northstar::Client.new(api_key: ENV["NORTHSTAR_API_KEY"])\nresult = client.events.list(limit: 10)',
  PHP: '$client = new Northstar\\Client(getenv("NORTHSTAR_API_KEY"));\n$result = $client->events->list(["limit" => 10]);',
  cURL: 'curl https://api.northstar.io/v1/events \\\n  -H "Authorization: Bearer $NORTHSTAR_API_KEY"',
};
const resources = ["Events", "Metrics", "Webhooks"];

export function DeveloperApiKeys() {
  const [keys, setKeys] = useState(initialKeys);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [deleted, setDeleted] = useState<ApiKey | null>(null);
  const [confirm, setConfirm] = useState<{ keyId: string; action: "rotate" | "revoke" } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<KeyType>("Secret");
  const [newDomain, setNewDomain] = useState("");
  const [language, setLanguage] = useState("Node");

  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setNotice("Copied to clipboard."); }
    catch { setNotice("Clipboard access is unavailable. Select and copy the value manually."); }
  }
  function createKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prefix = newType === "Secret" ? "sk_live" : "pk_live";
    const token = `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
    const key: ApiKey = { id: crypto.randomUUID(), name: newName.trim(), key: `${token.slice(0, 10)}••••••••••••••••`, secret: token, type: newType, scope: newDomain.trim() || "All domains", date: "Today", activity: "Never used", revoked: false };
    setKeys((current) => [key, ...current]); setRevealed((current) => [...current, key.id]); setNewName(""); setNewDomain(""); setNewType("Secret"); setCreateOpen(false); setNotice("API key created. Copy the secret now and store it securely.");
  }
  function confirmAction() {
    if (!confirm) return;
    const selected = keys.find((item) => item.id === confirm.keyId);
    if (confirm.action === "rotate") {
      const prefix = selected?.type === "Publishable" ? "pk_live" : "sk_live";
      const token = `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
      setKeys((current) => current.map((item) => item.id === confirm.keyId ? { ...item, key: `${token.slice(0, 10)}••••••••••••••••`, secret: token, date: "Today" } : item));
      setNotice(`${selected?.name ?? "API key"} rotated.`);
    } else {
      setKeys((current) => current.map((item) => item.id === confirm.keyId ? { ...item, scope: "Revoked", activity: "Revoked just now", revoked: true } : item));
      setNotice(`${selected?.name ?? "API key"} revoked.`);
    }
    setConfirm(null);
  }
  function deleteKey(key: ApiKey) {
    setKeys((current) => current.filter((item) => item.id !== key.id)); setDeleted(key); setNotice(`${key.name} deleted.`);
  }
  function undoDelete() {
    if (!deleted) return;
    setKeys((current) => [deleted, ...current]); setNotice(`${deleted.name} restored.`); setDeleted(null);
  }

  return <div className="mx-auto w-full max-w-5xl space-y-5"><header className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Developer API Keys</h2><p className="mt-1 text-sm text-muted-foreground">Create and manage credentials for your Northstar integrations.</p></div><Button onClick={() => setCreateOpen(true)}><IconPlus />New key</Button></header>
    <section className="overflow-hidden rounded-xl border bg-card"><header className="border-b px-4 py-3"><h3 className="text-sm font-semibold">API Keys</h3><p className="mt-0.5 text-sm text-muted-foreground">Keep secret keys private. Rotate any key that may have been exposed.</p></header><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-muted/30 text-left text-xs text-muted-foreground"><tr>{["Name", "Key", "Type", "Domains", "Created", "Actions"].map((x) => <th key={x} className="p-3 font-medium">{x}</th>)}</tr></thead><tbody>{keys.map((key) => { const isRevealed = revealed.includes(key.id); return <tr key={key.id} className="border-t"><td className="p-3"><span className="block font-medium">{key.name}</span><span className={`mt-0.5 block text-xs ${key.revoked ? "text-destructive" : "text-muted-foreground"}`}>{key.activity}</span></td><td className="p-3"><code className={`whitespace-nowrap text-xs ${key.revoked ? "line-through text-muted-foreground" : ""}`}>{isRevealed ? key.secret : key.key}</code><Button className="ml-1" variant="ghost" size="icon-xs" aria-label={`Copy ${key.name} key`} onClick={() => copy(key.secret)}><IconCopy /></Button></td><td className="p-3"><Badge variant={key.type === "Secret" ? "warning-light" : "success-light"}>{key.type}</Badge></td><td className="p-3 text-muted-foreground">{key.scope}</td><td className="p-3 text-muted-foreground"><span className="inline-flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full border bg-muted text-[9px]">{key.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>{key.date}</span></td><td className="p-3"><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={`${isRevealed ? "Hide" : "Reveal"} ${key.name} key`} onClick={() => setRevealed((current) => isRevealed ? current.filter((id) => id !== key.id) : [...current, key.id])}>{isRevealed ? <IconEyeOff /> : <IconEye />}</Button><Button variant="ghost" size="icon" aria-label={`Rotate ${key.name} key`} disabled={key.revoked} onClick={() => setConfirm({ keyId: key.id, action: "rotate" })}><IconRefresh /></Button><Button variant="ghost" size="icon" aria-label={`Revoke ${key.name} key`} disabled={key.revoked} onClick={() => setConfirm({ keyId: key.id, action: "revoke" })}><IconTrash /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${key.name} key`} onClick={() => deleteKey(key)}><IconTrash className="text-destructive" /></Button></div></td></tr>; })}</tbody></table></div></section>
    <section className="overflow-hidden rounded-xl border bg-card"><header className="border-b px-4 py-3"><h3 className="text-sm font-semibold">Quick Start</h3><p className="mt-0.5 text-sm text-muted-foreground">Use the SDK to access events, metrics, and webhooks.</p></header><Tabs defaultValue="Events" className="p-4"><TabsList variant="line" className="w-full justify-start rounded-none border-b">{resources.map((resource) => <TabsTrigger key={resource} value={resource}>{resource}</TabsTrigger>)}</TabsList>{resources.map((resource) => <TabsContent key={resource} value={resource} className="pt-4"><Tabs value={language} onValueChange={setLanguage}><div className="flex flex-wrap items-center justify-between gap-2"><TabsList variant="line" className="justify-start rounded-none">{Object.keys(snippets).map((lang) => <TabsTrigger key={lang} value={lang}>{lang}</TabsTrigger>)}</TabsList><Button size="sm" variant="outline" onClick={() => { void copy(snippets[language]); }}><IconCopy />Copy code</Button></div>{Object.entries(snippets).map(([lang, code]) => <TabsContent key={lang} value={lang}><pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-6"><code>{code.replaceAll("events", resource.toLowerCase()).replaceAll("Events", resource)}</code></pre></TabsContent>)}</Tabs></TabsContent>)}</Tabs></section>
    {notice && <div role="status" className="flex flex-wrap items-center gap-3 text-sm text-primary"><span>{notice}</span>{deleted && <Button variant="ghost" size="sm" onClick={undoDelete}><IconArrowBackUp />Undo</Button>}</div>}
    <Dialog open={createOpen} onOpenChange={setCreateOpen}><DialogContent><DialogHeader><DialogTitle>Create API key</DialogTitle><DialogDescription>Choose the key type and allowed domain. The secret is shown once after creation.</DialogDescription></DialogHeader><form id="create-api-key" className="grid gap-4" onSubmit={createKey}><label className="grid gap-1.5 text-sm font-medium">Key name<Input required value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Production app" /></label><label className="grid gap-1.5 text-sm font-medium">Key type<Select value={newType} onValueChange={(value) => setNewType(value as KeyType)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Secret">Secret</SelectItem><SelectItem value="Publishable">Publishable</SelectItem></SelectContent></Select></label><label className="grid gap-1.5 text-sm font-medium">Allowed domain<Input value={newDomain} onChange={(event) => setNewDomain(event.target.value)} placeholder="api.example.com" /></label></form><DialogFooter><Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button><Button type="submit" form="create-api-key">Create key</Button></DialogFooter></DialogContent></Dialog>
    <Dialog open={confirm !== null} onOpenChange={(open) => { if (!open) setConfirm(null); }}><DialogContent><DialogHeader><DialogTitle>{confirm?.action === "rotate" ? "Rotate API key?" : "Revoke API key?"}</DialogTitle><DialogDescription>{confirm?.action === "rotate" ? "The current key will stop working after rotation. Update any service that uses it." : "This key will stop working immediately. Requests using it will be rejected."}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setConfirm(null)}>Cancel</Button><Button variant={confirm?.action === "revoke" ? "destructive" : "default"} onClick={confirmAction}>{confirm?.action === "rotate" ? "Rotate key" : "Revoke key"}</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
