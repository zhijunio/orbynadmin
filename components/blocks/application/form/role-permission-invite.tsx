"use client";

import { useMemo, useState } from "react";
import { IconMessage, IconSend } from "@tabler/icons-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Combobox } from "@/components/ui/combobox/combobox";
import { Input } from "@/components/ui/input/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Tree, type TreeNode } from "@/components/ui/tree/tree";

const invitees = [
  { value: "iris.kwon@atlaslane.dev", label: "iris.kwon@atlaslane.dev" },
  { value: "jordan.lee@atlaslane.dev", label: "jordan.lee@atlaslane.dev" },
  { value: "sam.rivera@atlaslane.dev", label: "sam.rivera@atlaslane.dev" },
];

const roleGroups: TreeNode[] = [
  { id: "admin", label: "Admin roles", children: [{ id: "workspace-admin", label: "Workspace admin", trailingContent: <Badge variant="warning-light" size="sm">Privileged</Badge> }, { id: "billing-admin", label: "Billing admin", trailingContent: <Badge variant="warning-light" size="sm">Privileged</Badge> }] },
  { id: "developer-group", label: "Developer roles", children: [{ id: "developer", label: "Developer" }, { id: "secret-manager", label: "Secret manager", trailingContent: <Badge variant="warning-light" size="sm">MFA</Badge> }, { id: "release-engineer", label: "Release engineer" }] },
  { id: "finance", label: "Finance roles", children: [{ id: "finance-analyst", label: "Finance analyst", trailingContent: <Badge variant="info-light" size="sm">Export</Badge> }, { id: "refund-analyst", label: "Refund analyst" }, { id: "dispute-analyst", label: "Dispute analyst" }] },
  { id: "support", label: "Support roles", children: [{ id: "support-lead", label: "Support lead" }, { id: "support-agent", label: "Support agent" }] },
  { id: "operations", label: "Operations roles", children: [{ id: "operations-manager", label: "Operations manager" }, { id: "workspace-operator", label: "Workspace operator" }] },
  { id: "integrations", label: "Integration roles", children: [{ id: "integration-manager", label: "Integration manager" }, { id: "integration-viewer", label: "Integration viewer" }] },
  { id: "view-only", label: "View only roles", children: [{ id: "workspace-viewer", label: "Workspace viewer" }, { id: "project-viewer", label: "Project viewer" }] },
];

function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  if (!query) return nodes;
  return nodes.flatMap((node) => {
    const children = node.children ? filterTree(node.children, query) : [];
    return node.label.toLocaleLowerCase().includes(query) || children.length
      ? [{ ...node, children: node.children ? children : undefined }]
      : [];
  });
}

function FieldRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return <div className="grid gap-3 border-b border-dashed py-4 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:gap-5"><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-sm text-muted-foreground">{description}</p></div><div className="min-w-0">{children}</div></div>;
}

export function RolePermissionInvite() {
  const [selectedInvitees, setSelectedInvitees] = useState(["iris.kwon@atlaslane.dev"]);
  const [selectedRoles, setSelectedRoles] = useState(["developer", "finance-analyst", "support-agent"]);
  const [query, setQuery] = useState("");
  const [memberType, setMemberType] = useState("employee");
  const [requireSso, setRequireSso] = useState(true);
  const [notifyManager, setNotifyManager] = useState(false);
  const [notice, setNotice] = useState("");
  const visibleRoleGroups = useMemo(() => filterTree(roleGroups, query.trim().toLocaleLowerCase()), [query]);
  const selectableRoleGroups = useMemo(() => {
    const addCheckboxes = (nodes: TreeNode[]): TreeNode[] => nodes.map((node) => ({
      ...node,
      icon: <Checkbox checked={selectedRoles.includes(node.id)} aria-hidden="true" tabIndex={-1} />,
      children: node.children ? addCheckboxes(node.children) : undefined,
    }));
    return addCheckboxes(visibleRoleGroups);
  }, [selectedRoles, visibleRoleGroups]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedInvitees.length) {
      setNotice("Add at least one recipient.");
      return;
    }
    setNotice(`Invite ready for ${selectedInvitees.length} recipient${selectedInvitees.length === 1 ? "" : "s"}.`);
  }

  return <Card className="mx-auto w-full max-w-3xl gap-0 shadow-none">
    <CardHeader className="border-b px-5 py-4">
      <div className="flex items-start justify-between gap-3"><div><CardTitle className="text-base">Member Access</CardTitle><p className="mt-0.5 text-sm text-muted-foreground">Add people and assign scoped workspace roles.</p></div><Badge variant="success-light" className="shrink-0"><span className="size-2 rounded-sm border border-current" />Policy Checked</Badge></div>
    </CardHeader>
    <CardContent className="px-5 py-1">
      <form onSubmit={submit}>
        <FieldRow label="Recipients" description="Directory email addresses.">
          <Combobox aria-label="Recipients" multiple allowCustomValue options={invitees} value={selectedInvitees} onValueChange={(value) => setSelectedInvitees(Array.isArray(value) ? value : [value])} placeholder="Add email" searchPlaceholder="Search or add email..." className="w-full" />
        </FieldRow>
        <FieldRow label="Workspace" description="Workspace and expiry window.">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid min-w-0 gap-1.5 text-sm"><span>Workspace</span><Select defaultValue="global"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="global">Global Operations</SelectItem><SelectItem value="product">Product workspace</SelectItem><SelectItem value="launch">Launch Council</SelectItem></SelectContent></Select></label>
            <label className="grid min-w-0 gap-1.5 text-sm"><span>Invite Expires</span><Select defaultValue="14"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days</SelectItem><SelectItem value="14">14 days</SelectItem><SelectItem value="30">30 days</SelectItem></SelectContent></Select></label>
          </div>
        </FieldRow>
        <FieldRow label="Member Type" description="How the account is governed.">
          <RadioGroup value={memberType} onValueChange={setMemberType} className="gap-3">
            {[["employee", "Employee", "SSO managed."], ["contractor", "Contractor", "Time-bound access."], ["service", "Service account", "Automation owner."]].map(([value, title, description]) => <label key={value} className="flex items-start gap-2.5"><RadioGroupItem value={value} className="mt-0.5" /><span><span className="block text-sm font-medium leading-5">{title}</span><span className="text-sm text-muted-foreground">{description}</span></span></label>)}
          </RadioGroup>
        </FieldRow>
        <FieldRow label="Guardrails" description="Sign-in and access-owner notice.">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium">Require SSO</p><p className="text-sm text-muted-foreground">Block password login.</p></div><Switch aria-label="Require SSO" checked={requireSso} onCheckedChange={setRequireSso} /></div>
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium">Notify Manager</p><p className="text-sm text-muted-foreground">Copy the access owner.</p></div><Switch aria-label="Notify Manager" checked={notifyManager} onCheckedChange={setNotifyManager} /></div>
          </div>
        </FieldRow>
        <FieldRow label="Find Roles" description="Function or risk hint.">
          <Input aria-label="Search roles" placeholder="Search roles..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </FieldRow>
        <FieldRow label="Permissions" description="Choose minimum access.">
          <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between gap-3 border-b bg-muted/20 px-3 py-2"><div><p className="text-sm font-medium">Role groups</p><p className="text-xs text-muted-foreground">7 groups available</p></div><Badge variant="outline">{selectedRoles.length} selected roles</Badge></div>
            <div className="p-1"><Tree aria-label="Role groups" items={selectableRoleGroups} defaultExpandedIds={roleGroups.map((group) => group.id)} selectionMode="multiple" selectedIds={selectedRoles} onSelectionChange={setSelectedRoles} size="sm" showGuides={false} /></div>
          </div>
        </FieldRow>
        <FieldRow label="Internal Note" description="Visible to workspace admins only.">
          <Textarea aria-label="Internal note" placeholder="Add a note" rows={2} />
        </FieldRow>
        <footer className="flex flex-wrap items-center justify-between gap-3 py-4"><p role="status" className="text-sm text-muted-foreground">{notice}</p><div className="flex flex-wrap gap-2"><Button type="button" variant="ghost" size="sm" onClick={() => toast("Thanks for the feedback.")}><IconMessage />Feedback</Button><Button type="button" variant="outline" size="sm" onClick={() => { setNotice("Draft saved locally."); toast("Draft saved"); }}>Save Draft</Button><Button type="submit" size="sm"><IconSend />Send Invite</Button></div></footer>
      </form>
    </CardContent>
  </Card>;
}
