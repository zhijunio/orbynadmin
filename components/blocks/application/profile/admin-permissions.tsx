"use client";

import { useState } from "react";
import {
  IconBell,
  IconCheck,
  IconDotsVertical,
  IconPuzzle,
  IconSettings,
  IconShield,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tab/tabs";

const domainDefaults = [
  "harborops.app",
  "clients.harborops.app",
  "partnermail.co",
];
const permissions = [
  {
    name: "Workspace settings",
    detail: "Change shared workspace defaults.",
    owner: true,
    admin: true,
    editor: false,
  },
  {
    name: "Manage members",
    detail: "Invite, remove, and update team access.",
    owner: true,
    admin: true,
    editor: false,
  },
  {
    name: "Manage billing",
    detail: "Update invoices and payment methods.",
    owner: true,
    admin: false,
    editor: false,
  },
  {
    name: "Create integrations",
    detail: "Connect third-party workspace tools.",
    owner: true,
    admin: true,
    editor: false,
  },
];

export function AdminPermissions() {
  const [domains, setDomains] = useState(domainDefaults);
  const [newDomain, setNewDomain] = useState("");
  const [accent, setAccent] = useState("emerald");
  const [notice, setNotice] = useState("");
  const [integrations, setIntegrations] = useState([
    "Google Workspace",
    "Slack",
  ]);

  function addDomain() {
    const value = newDomain.trim().toLowerCase();
    if (!value || !value.includes(".")) return;
    setDomains((current) =>
      current.includes(value) ? current : [...current, value],
    );
    setNewDomain("");
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Admin Settings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your profile, workspace defaults, access, and connected
            tools.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setNotice("Changes canceled.")}
          >
            Cancel
          </Button>
          <Button onClick={() => setNotice("Admin settings updated.")}>
            <IconCheck />
            Update
          </Button>
        </div>
      </header>
      <Tabs defaultValue="General" className="w-full">
        <TabsList
          variant="line"
          className="w-full justify-start gap-3 overflow-x-auto rounded-none border-b p-0"
        >
          {[
            { label: "General", icon: IconSettings },
            { label: "Profile", icon: IconUser },
            { label: "Members", icon: IconUsers },
            { label: "Permissions", icon: IconShield },
            { label: "Notifications", icon: IconBell },
            { label: "Integrations", icon: IconPuzzle },
          ].map(({ label, icon: Icon }) => (
            <TabsTrigger
              key={label}
              value={label}
              className="flex-none justify-start px-2"
            >
              <Icon className="mr-1.5 size-4 text-muted-foreground" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="General" className="space-y-8 pt-5">
          <PageSection
            title="Workspace Basics"
            description="Keep your workspace identity and invite defaults tidy."
          >
            <SettingsRow
              title="Workspace Name"
              hint="Used in shared pages and invites."
            >
              <Input defaultValue="Harbor Ops" />
              <p className="text-xs text-muted-foreground">
                Appears in invite flows and the workspace switcher.
              </p>
            </SettingsRow>
            <SettingsRow
              title={
                <span className="flex items-center gap-2">
                  Workspace Domain{" "}
                  <Badge variant="success-light" size="sm">
                    Connected
                  </Badge>
                </span>
              }
              hint="Keep the public URL short and clear."
            >
              <InputGroupTextInput
                prefix="workspace.de/"
                defaultValue="harbor-ops"
              />
              <p className="text-xs text-muted-foreground">
                New invite and share links will use this slug.
              </p>
            </SettingsRow>
            <SettingsRow
              title="Invite Domains"
              hint="Allow signups from trusted company domains."
            >
              <div className="flex flex-wrap gap-1.5">
                {domains.map((domain) => (
                  <Badge key={domain} variant="secondary" className="gap-1">
                    {domain}
                    <button
                      type="button"
                      aria-label={`Remove ${domain}`}
                      onClick={() =>
                        setDomains((current) =>
                          current.filter((item) => item !== domain),
                        )
                      }
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  aria-label="Invite domain"
                  placeholder="company.com"
                  value={newDomain}
                  onChange={(event) => setNewDomain(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addDomain();
                    }
                  }}
                />
                <Button variant="outline" size="sm" onClick={addDomain}>
                  Add domain
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Only trusted company domains are auto-approved for invites.
              </p>
            </SettingsRow>
            <SettingsRow
              title="Accent Color"
              hint="Use one color for key status and links."
            >
              <div className="flex gap-2">
                {[
                  { id: "slate", className: "bg-slate-500" },
                  { id: "orange", className: "bg-orange-500" },
                  { id: "pink", className: "bg-pink-500" },
                  { id: "emerald", className: "bg-emerald-600" },
                  { id: "blue", className: "bg-blue-500" },
                  { id: "indigo", className: "bg-indigo-500" },
                ].map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={`${color.id} accent`}
                    aria-pressed={accent === color.id}
                    onClick={() => setAccent(color.id)}
                    className={`size-5 rounded-full ${color.className} ${accent === color.id ? "ring-2 ring-foreground ring-offset-2" : ""}`}
                  />
                ))}
              </div>
            </SettingsRow>
          </PageSection>
          <PageSection
            title="Regional Preferences"
            description="Choose how dates, language, and time are displayed."
          >
            <SettingsRow
              title="Language And Timezone"
              hint="Keep the workspace readable for the whole team."
            >
              <div className="grid gap-3">
                <SelectRow
                  label="Language"
                  value="English"
                  options={["English", "French", "German"]}
                />
                <SelectRow
                  label="Timezone"
                  value="(GMT+1) Berlin"
                  options={[
                    "(GMT+1) Berlin",
                    "(GMT-5) New York",
                    "(GMT+0) London",
                  ]}
                />
              </div>
            </SettingsRow>
            <SelectSettingsRow
              title="Week Start"
              hint="Match your planning cadence."
              value="Monday"
              options={["Monday", "Sunday"]}
            />
            <SelectSettingsRow
              title="Date Format"
              hint="Keep reports and summaries consistent."
              value="MM/DD/YYYY"
              options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]}
            />
          </PageSection>
          <PageSection
            title="Editor Behavior"
            description="Tighten small workflow defaults for daily operations."
            action={
              <Button variant="ghost" size="sm">
                Help Center
              </Button>
            }
          >
            <SwitchRow
              title="Send On Enter"
              hint="Post updates without opening a composer."
            />
            <SwitchRow
              title="Markdown Shortcuts"
              hint="Expand formatting while you type."
              checked
            />
            <SwitchRow
              title="Compact Tables"
              hint="Fit more rows in planning views."
              checked
            />
          </PageSection>
        </TabsContent>
        <TabsContent value="Profile" className="pt-5">
          <PageSection
            title="Personal Profile"
            description="Identity and contact details for your admin account."
          >
            <SettingsRow title="Full name">
              <Input defaultValue="Mina Ortega" />
            </SettingsRow>
            <SettingsRow title="Work email">
              <Input defaultValue="mina@harborops.app" />
            </SettingsRow>
            <SettingsRow title="Role">
              <Input defaultValue="Workspace Owner" />
            </SettingsRow>
          </PageSection>
        </TabsContent>
        <TabsContent value="Members" className="pt-5">
          <PageSection
            title="Workspace Members"
            description="Manage the people who can access this workspace."
          >
            <div className="divide-y rounded-lg border">
              {[
                ["Mina Ortega", "Owner"],
                ["Jordan Lee", "Admin"],
                ["Taylor Morgan", "Editor"],
              ].map(([name, role]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 p-3"
                >
                  <span className="text-sm font-medium">{name}</span>
                  <Badge variant="secondary">{role}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${name}`}
                      >
                        <IconDotsVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() =>
                          setNotice(`${name} member profile opened.`)
                        }
                      >
                        View profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() =>
                          setNotice(`${name} role editor opened.`)
                        }
                      >
                        Edit role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </PageSection>
        </TabsContent>
        <TabsContent value="Permissions" className="pt-5">
          <PageSection
            title="Permission Matrix"
            description="Choose the capabilities available to each role."
          >
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[620px] text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="p-3 text-left font-medium">Capability</th>
                    {["Owner", "Admin", "Editor"].map((role) => (
                      <th key={role} className="p-3 text-center font-medium">
                        {role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((row) => (
                    <tr key={row.name} className="border-b last:border-0">
                      <th className="p-3 text-left font-medium">
                        {row.name}
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {row.detail}
                        </span>
                      </th>
                      {(["owner", "admin", "editor"] as const).map((role) => (
                        <td key={role} className="p-3 text-center">
                          <Checkbox
                            aria-label={`${row.name} for ${role}`}
                            defaultChecked={row[role]}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PageSection>
        </TabsContent>
        <TabsContent value="Notifications" className="pt-5">
          <PageSection
            title="Admin Notifications"
            description="Choose which workspace events need your attention."
          >
            <SwitchRow
              title="Member requests"
              hint="Notify when someone asks to join."
              checked
            />
            <SwitchRow
              title="Billing alerts"
              hint="Send plan, payment, and invoice updates."
              checked
            />
            <SwitchRow
              title="Security notices"
              hint="Send a notice for important access changes."
              checked
            />
          </PageSection>
        </TabsContent>
        <TabsContent value="Integrations" className="pt-5">
          <PageSection
            title="Connected Integrations"
            description="Control the tools connected to Harbor Ops."
          >
            {["Google Workspace", "Slack", "Linear"].map((name) => (
              <SettingsRow
                key={name}
                title={
                  <span className="flex items-center gap-2">
                    {name}
                    <Badge
                      variant={
                        integrations.includes(name)
                          ? "success-light"
                          : "secondary"
                      }
                    >
                      {integrations.includes(name)
                        ? "Connected"
                        : "Not connected"}
                    </Badge>
                  </span>
                }
              >
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIntegrations((current) =>
                        current.includes(name)
                          ? current.filter((item) => item !== name)
                          : [...current, name],
                      );
                      setNotice(
                        `${name} ${integrations.includes(name) ? "disconnected" : "connected"}.`,
                      );
                    }}
                  >
                    {integrations.includes(name) ? "Manage" : "Connect"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`More options for ${name}`}
                      >
                        <IconDotsVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() =>
                          setNotice(`${name} integration settings opened.`)
                        }
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() =>
                          setNotice(`${name} documentation opened.`)
                        }
                      >
                        View documentation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SettingsRow>
            ))}
          </PageSection>
        </TabsContent>
      </Tabs>
      {notice && (
        <p role="status" className="text-sm text-primary">
          {notice}
        </p>
      )}
    </div>
  );
}

function PageSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
      </header>
      <div className="overflow-hidden rounded-xl border">{children}</div>
    </section>
  );
}
function SettingsRow({
  title,
  hint,
  children,
}: {
  title: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(0,1fr)]">
      <div className="text-sm font-medium">
        {title}
        {hint && (
          <p className="mt-0.5 text-sm font-normal text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}
function SwitchRow({
  title,
  hint,
  checked = false,
}: {
  title: string;
  hint: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b p-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <Switch defaultChecked={checked} aria-label={title} />
    </div>
  );
}
function SelectSettingsRow({
  title,
  hint,
  value,
  options,
}: {
  title: string;
  hint: string;
  value: string;
  options: string[];
}) {
  const [selected, setSelected] = useState(value);
  return (
    <SettingsRow title={title} hint={hint}>
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <span>{selected}</span>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsRow>
  );
}
function SelectRow({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) {
  const [selected, setSelected] = useState(value);
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <span>{selected}</span>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
function InputGroupTextInput({
  prefix,
  defaultValue,
}: {
  prefix: string;
  defaultValue: string;
}) {
  return (
    <div className="flex h-9 items-center overflow-hidden rounded-lg border bg-background">
      <span className="border-r px-3 text-sm text-muted-foreground">
        {prefix}
      </span>
      <Input
        className="h-full border-0 shadow-none focus-visible:ring-0"
        defaultValue={defaultValue}
      />
    </div>
  );
}
