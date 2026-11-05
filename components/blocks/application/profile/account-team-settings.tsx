"use client";

import { useMemo, useState } from "react";
import {
  IconBuilding,
  IconCreditCard,
  IconDotsVertical,
  IconSearch,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
};
const initialMembers: Member[] = [
  {
    id: "ava",
    name: "Ava Chen",
    email: "ava@atlashq.app",
    role: "Owner",
    status: "Active",
  },
  {
    id: "noah",
    name: "Noah Williams",
    email: "noah@atlashq.app",
    role: "Admin",
    status: "Active",
  },
  {
    id: "mia",
    name: "Mia Patel",
    email: "mia@atlashq.app",
    role: "Editor",
    status: "Active",
  },
  {
    id: "leo",
    name: "Leo Martin",
    email: "leo@northwind.dev",
    role: "Editor",
    status: "Invited",
  },
  {
    id: "sara",
    name: "Sara Kim",
    email: "sara@atlashq.app",
    role: "Viewer",
    status: "Active",
  },
  {
    id: "omar",
    name: "Omar Ali",
    email: "omar@atlashq.app",
    role: "Viewer",
    status: "Invited",
  },
];
const sections = [
  { id: "Profile", icon: IconUser },
  { id: "Workspace", icon: IconBuilding },
  { id: "Team", icon: IconUsers },
  { id: "Billing", icon: IconCreditCard },
] as const;

export function AccountTeamSettings() {
  const [section, setSection] =
    useState<(typeof sections)[number]["id"]>("Profile");
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All members");
  const [role, setRole] = useState("Staff Product Lead");
  const [timeZone, setTimeZone] = useState("(GMT-5) New York");
  const [language, setLanguage] = useState("English (US)");
  const [landingView, setLandingView] = useState("Priority inbox");
  const [digestCadence, setDigestCadence] = useState("Weekly summary");
  const [workspaceLanding, setWorkspaceLanding] = useState("Overview");
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState(demoAvatarUrl("ava-chen"));
  const [message, setMessage] = useState("");
  const [seatSize, setSeatSize] = useState("10 seats");
  const filtered = useMemo(
    () =>
      members.filter(
        (member) =>
          `${member.name} ${member.email}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "All members" || member.status === status),
      ),
    [members, query, status],
  );
  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleMembers = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-[10rem_minmax(0,1fr)]">
      <nav
        aria-label="Account settings sections"
        className="flex gap-1 overflow-x-auto md:flex-col md:gap-1.5"
      >
        {sections.map(({ id, icon: Icon }) => (
          <Button
            key={id}
            variant={section === id ? "secondary" : "ghost"}
            className="justify-start"
            aria-current={section === id ? "page" : undefined}
            onClick={() => setSection(id)}
          >
            <Icon />
            {id}
          </Button>
        ))}
      </nav>
      {section === "Profile" && (
        <div className="min-w-0 space-y-4">
          <SettingsCard
            title="Profile Details"
            description="Personal account info."
          >
            <div className="flex flex-wrap items-center gap-4 border-b p-4">
              <Avatar className="size-12">
                <AvatarImage src={photo} alt="Ava Chen" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="min-w-40 flex-1">
                <p className="text-sm font-medium">Profile Photo</p>
                <p className="text-sm text-muted-foreground">
                  Shown in comments and mentions.
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setPhoto(URL.createObjectURL(file));
                  }}
                />
                <span className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-accent">
                  Change
                </span>
              </label>
              <Button variant="outline" size="sm" onClick={() => setPhoto("")}>
                Remove
              </Button>
            </div>
            <FieldRow title="Full Name" hint="Used across Atlas.">
              <Input defaultValue="Ava Chen" />
            </FieldRow>
            <FieldRow
              title={
                <span className="flex items-center gap-2">
                  Email Address{" "}
                  <Badge variant="success-light" size="sm">
                    Verified
                  </Badge>
                </span>
              }
              hint="Primary sign-in email."
            >
              <Input type="email" defaultValue="ava@atlashq.app" />
            </FieldRow>
            <FieldRow title="Phone Number" hint="Recovery and urgent alerts.">
              <Input defaultValue="+1 718 555 0188" />
            </FieldRow>
            <FieldRow title="Username" hint="Used in mentions and links.">
              <Input defaultValue="@avachen" />
            </FieldRow>
            <FieldRow title="Public Details" hint="Shown across Atlas.">
              <div className="grid gap-3">
                <label className="grid gap-1.5 text-sm">
                  Role
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full">
                      <span>{role}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff Product Lead">
                        Staff Product Lead
                      </SelectItem>
                      <SelectItem value="Product Designer">
                        Product Designer
                      </SelectItem>
                      <SelectItem value="Software Engineer">
                        Software Engineer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <label className="grid gap-1.5 text-sm">
                  Time zone
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger className="w-full">
                      <span>{timeZone}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="(GMT-5) New York">
                        (GMT-5) New York
                      </SelectItem>
                      <SelectItem value="(GMT+0) London">
                        (GMT+0) London
                      </SelectItem>
                      <SelectItem value="(GMT+9) Tokyo">
                        (GMT+9) Tokyo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <label className="grid gap-1.5 text-sm">
                  Website
                  <Input defaultValue="https://atlashq.app" />
                </label>
              </div>
            </FieldRow>
            <FieldRow title="Bio" hint="Short profile summary.">
              <textarea
                className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                defaultValue="Leading launch systems, product operations, and internal tooling across the Atlas workspace."
              />
            </FieldRow>
            <div className="flex justify-end gap-2 border-t bg-muted/20 p-3">
              <Button
                variant="outline"
                onClick={() => setMessage("Profile changes canceled.")}
              >
                Cancel
              </Button>
              <Button onClick={() => setMessage("Profile changes saved.")}>
                Save changes
              </Button>
            </div>
          </SettingsCard>
          <SettingsCard
            title="Profile Preferences"
            description="Default workspace behavior."
          >
            <FieldRow title="Language">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <span>{language}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English (US)">English (US)</SelectItem>
                  <SelectItem value="English (UK)">English (UK)</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow title="Landing View">
              <Select value={landingView} onValueChange={setLandingView}>
                <SelectTrigger className="w-full">
                  <span>{landingView}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Priority inbox">Priority inbox</SelectItem>
                  <SelectItem value="Workspace overview">
                    Workspace overview
                  </SelectItem>
                  <SelectItem value="My tasks">My tasks</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow title="Digest Cadence">
              <Select value={digestCadence} onValueChange={setDigestCadence}>
                <SelectTrigger className="w-full">
                  <span>{digestCadence}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly summary">Weekly summary</SelectItem>
                  <SelectItem value="Daily summary">Daily summary</SelectItem>
                  <SelectItem value="Never">Never</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow
              title="Daily Briefing"
              hint="Morning recap before meetings."
            >
              <Switch defaultChecked aria-label="Daily briefing" />
            </FieldRow>
          </SettingsCard>
          {message && (
            <p role="status" className="text-sm text-primary">
              {message}
            </p>
          )}
        </div>
      )}
      {section === "Workspace" && (
        <SettingsCard
          title="Workspace"
          description="Update the identity and sharing defaults for your team."
        >
          <FieldRow title="Workspace name">
            <Input defaultValue="Atlas" />
          </FieldRow>
          <FieldRow title="Workspace URL">
            <Input defaultValue="workspace.de/atlas" />
          </FieldRow>
          <FieldRow title="Support email">
            <Input defaultValue="help@atlashq.app" />
          </FieldRow>
          <FieldRow title="Default landing view">
            <Select
              value={workspaceLanding}
              onValueChange={setWorkspaceLanding}
            >
              <SelectTrigger className="w-full">
                <span>{workspaceLanding}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Overview">Overview</SelectItem>
                <SelectItem value="Projects">Projects</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
          <FieldRow
            title="External sharing"
            hint="Allow client-safe workspace links."
          >
            <Switch />
          </FieldRow>
          <SaveFooter onSave={() => setMessage("Workspace settings saved.")} />
        </SettingsCard>
      )}
      {section === "Team" && (
        <div className="min-w-0 space-y-4">
          <SettingsCard
            title="Team Members"
            description="Search people, check access, and manage seats."
          >
            <div className="flex flex-wrap items-center gap-2 border-b p-4">
              <div className="relative min-w-48 flex-1">
                <IconSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search members"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-40">
                  <span>{status}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All members">
                    All members ({members.length})
                  </SelectItem>
                  <SelectItem value="Active">
                    Active (
                    {
                      members.filter((member) => member.status === "Active")
                        .length
                    }
                    )
                  </SelectItem>
                  <SelectItem value="Invited">
                    Invited (
                    {
                      members.filter((member) => member.status === "Invited")
                        .length
                    }
                    )
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setMembers((current) => [
                    ...current,
                    {
                      id: `member-${Date.now()}`,
                      name: "New teammate",
                      email: "new@atlashq.app",
                      role: "Viewer",
                      status: "Invited",
                    },
                  ]);
                  setMessage("Invitation sent to new@atlashq.app.");
                }}
              >
                Invite member
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-muted/30 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Member</th>
                    <th className="px-4 py-2.5 font-medium">Role</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5 font-medium">Joined</th>
                    <th className="px-4 py-2.5 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleMembers.map((member) => (
                    <tr key={member.id} className="border-t">
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2.5">
                          <Avatar className="size-8">
                            <AvatarImage
                              src={demoAvatarUrl(member.id)}
                              alt=""
                            />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            <span className="block font-medium">
                              {member.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {member.email}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select
                          value={member.role}
                          onValueChange={(role) =>
                            setMembers((current) =>
                              current.map((item) =>
                                item.id === member.id
                                  ? { ...item, role }
                                  : item,
                              ),
                            )
                          }
                        >
                          <SelectTrigger className="h-8 w-28">
                            <span>{member.role}</span>
                          </SelectTrigger>
                          <SelectContent>
                            {["Owner", "Admin", "Editor", "Viewer"].map(
                              (role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            member.status === "Active"
                              ? "success-light"
                              : "warning-light"
                          }
                        >
                          {member.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {member.status === "Active"
                          ? "Apr 18, 2025"
                          : "Invitation sent"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Actions for ${member.name}`}
                            >
                              <IconDotsVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() =>
                                setMessage(`${member.name} profile opened.`)
                              }
                            >
                              View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={member.role === "Owner"}
                              onSelect={() => {
                                setMembers((current) =>
                                  current.filter(
                                    (item) => item.id !== member.id,
                                  ),
                                );
                                setMessage(
                                  `${member.name} removed from the workspace.`,
                                );
                              }}
                            >
                              Remove member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
              <span className="text-muted-foreground">
                {filtered.length
                  ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} of ${filtered.length} members`
                  : "No members found"}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </SettingsCard>
          <SettingsCard
            title="Seat Size"
            description="Choose the workspace capacity that fits your team."
          >
            <div className="grid gap-3 p-4 sm:grid-cols-3">
              {[
                { title: "5 seats", price: "$49 / month" },
                { title: "10 seats", price: "$89 / month" },
                { title: "25 seats", price: "$199 / month" },
              ].map((option) => (
                <button
                  key={option.title}
                  type="button"
                  aria-pressed={seatSize === option.title}
                  onClick={() => setSeatSize(option.title)}
                  className={`rounded-lg border p-4 text-left ${seatSize === option.title ? "border-primary bg-primary/5" : "hover:bg-muted/40"}`}
                >
                  <span className="block text-sm font-semibold">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {option.price}
                  </span>
                </button>
              ))}
            </div>
            <SaveFooter onSave={() => setMessage(`${seatSize} selected.`)} />
          </SettingsCard>
        </div>
      )}
      {section === "Billing" && (
        <SettingsCard
          title="Billing"
          description="Review your plan and payment information."
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">Professional plan</p>
                <Badge variant="success-light">Current plan</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                $24 per seat / month · Renews May 3, 2026
              </p>
            </div>
            <Button variant="outline">Manage plan</Button>
          </div>
          <FieldRow title="Billing email">
            <Input defaultValue="billing@atlashq.app" />
          </FieldRow>
          <FieldRow title="Payment method">
            <span className="text-sm">Visa ending in 4242</span>
          </FieldRow>
          <FieldRow title="View invoices">
            <Button variant="outline" size="sm">
              Open invoices
            </Button>
          </FieldRow>
          <SaveFooter onSave={() => setMessage("Billing settings saved.")} />
        </SettingsCard>
      )}
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      <header className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </header>
      {children}
    </section>
  );
}
function FieldRow({
  title,
  hint,
  children,
}: {
  title: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(0,1fr)] sm:items-center">
      <div>
        <div className="text-sm font-medium">{title}</div>
        {hint && <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}
function SaveFooter({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end border-t bg-muted/20 p-3">
      <Button onClick={onSave}>Save changes</Button>
    </div>
  );
}
