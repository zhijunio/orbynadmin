"use client";

import { useState } from "react";
import {
  IconBell,
  IconCircleCheck,
  IconCircleDashed,
  IconChevronRight,
  IconClock,
  IconCreditCard,
  IconLock,
  IconMinus,
  IconPlus,
  IconQrcode,
  IconSettings,
} from "@tabler/icons-react";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badges/badge";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { Input } from "@/components/ui/input/input";

const styles = {
  plain: {
    root: "gap-0",
    item: "",
    trigger: "px-4",
    content: "px-4",
  },
  bordered: {
    root: "gap-0",
    item: "overflow-hidden rounded-xl border border-border bg-card",
    trigger: "px-4",
    content: "px-4",
  },
  divided: {
    root: "gap-0",
    item: "border-b border-border last:border-b-0",
    trigger: "px-4",
    content: "px-4",
  },
  muted: {
    root: "gap-3",
    item: "overflow-hidden rounded-xl bg-muted/40",
    content: "border-t border-border px-4",
  },
} as const;

const accordionData = [
  { id: "1", title: "What can I manage from this dashboard?", content: "Review workspace activity, manage records, and open common administration tools from one place." },
  { id: "2", title: "How do I get started?", content: "Invite your team, configure access, and add the records your workspace needs to manage." },
  { id: "3", title: "Can I customize dashboard widgets?", content: "Choose the metrics and summaries that are most useful for your day-to-day administration." },
  { id: "4", title: "Does the dashboard support dark mode?", content: "Use the appearance control in the header to switch between light and dark themes." },
  { id: "5", title: "Where can I review workspace activity?", content: "Open the activity page to review recent changes and actions across the workspace." },
];

const multipleAccordionData = [
  { id: "email", title: "Email alerts", content: "Send immediate updates for access changes and account security events." },
  { id: "reports", title: "Weekly reports", content: "Email a weekly summary of workspace activity to administrators." },
  { id: "mentions", title: "Member mentions", content: "Notify members when someone mentions them in a project update." },
];

const controlledItems = [
  { value: "billing", title: "How does billing work?", content: "Plans are billed monthly for every active seat." },
  { value: "plans", title: "Can I change plans later?", content: "Upgrades apply right away. Downgrades take effect at the end of the billing period." },
  { value: "data", title: "What happens to my data?", content: "Your workspace stays readable for 30 days, so you can export your data." },
];

const nestedDetails = [
  { value: "roles", title: "Workspace roles", content: "Admins manage workspace settings. Editors update shared records. Viewers can read reports and project activity." },
  { value: "scopes", title: "Data access", content: "Access to customer, billing, and audit data follows each member’s assigned role." },
];

const members = [
  { id: "maya", initials: "MC", name: "Maya Chen", email: "maya@example.com", role: "Admin", access: "Can manage members, billing, security settings, and all workspace records." },
  { id: "elias", initials: "ER", name: "Elias Rivera", email: "elias@example.com", role: "Editor", access: "Can create and update projects, contacts, and shared reports." },
  { id: "nina", initials: "NP", name: "Nina Patel", email: "nina@example.com", role: "Viewer", access: "Can view dashboards and project activity without changing workspace data." },
];

const setupSteps = [
  { value: "profile", title: "Set workspace profile", status: "Complete", state: "complete", content: "Workspace name, time zone, and contact details are ready." },
  { value: "directory", title: "Connect team directory", status: "In progress", state: "current", content: "Choose the identity provider and sync the members who need access." },
  { value: "policies", title: "Review access policies", status: "Next", state: "next", content: "Confirm sign-in requirements and default roles for new members." },
] as const;

function AccordionExample({
  variant,
  multiple = false,
  plusMinus = false,
}: {
  variant: keyof typeof styles;
  multiple?: boolean;
  plusMinus?: boolean;
}) {
  const style = styles[variant];
  const items = multiple ? multipleAccordionData : accordionData;
  const accordionProps = multiple
    ? { type: "multiple" as const, defaultValue: ["email"] }
    : { type: "single" as const, collapsible: true, defaultValue: "1" };

  return (
    <Accordion {...accordionProps} className={`w-full max-w-lg ${style.root}`}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className={style.item}>
          <AccordionTrigger className={`${"trigger" in style ? style.trigger : "px-4"} text-sm text-foreground ${plusMinus ? "hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden" : ""}`}>
            {plusMinus ? (
              <>
                <span>{item.title}</span>
                <IconPlus aria-hidden="true" className="ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
                <IconMinus aria-hidden="true" className="ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline" />
              </>
            ) : item.title}
          </AccordionTrigger>
          <AccordionContent className={`${"content" in style ? style.content : "px-4"} text-sm leading-6`}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ControlledAccordionExample() {
  const [openItems, setOpenItems] = useState<string[]>(["billing"]);
  const itemIds = controlledItems.map((item) => item.value);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpenItems(itemIds)}>Expand all</Button>
        <Button variant="outline" size="sm" onClick={() => setOpenItems([])}>Collapse all</Button>
      </div>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="gap-3">
        {controlledItems.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="rounded-lg border px-3">
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function AccordionInCardExample() {
  return (
    <Card className="w-full max-w-lg gap-0 shadow-none">
      <CardHeader className="border-b"><CardTitle>Workspace security</CardTitle></CardHeader>
      <CardContent className="pt-2">
        <Accordion type="multiple" defaultValue={["sessions"]}>
          <AccordionItem value="sessions">
            <AccordionTrigger>Active sessions</AccordionTrigger>
            <AccordionContent>Review signed-in devices and end sessions that are no longer in use.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="authentication">
            <AccordionTrigger>Authentication requirements</AccordionTrigger>
            <AccordionContent>Require multi-factor authentication for workspace administrators and sensitive actions.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="audit">
            <AccordionTrigger>Audit log retention</AccordionTrigger>
            <AccordionContent>Choose how long workspace activity remains available to administrators.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function SettingsAccordionExample() {
  const sections = [
    { value: "notifications", title: "Notifications", summary: "Email, push, and Slack", detail: "Choose which workspace events are sent to each channel.", icon: IconBell, badge: "3 channels" },
    { value: "security", title: "Security", summary: "Two-factor sign-in and sessions", detail: "Review authentication requirements and active sessions.", icon: IconLock, badge: "MFA" },
    { value: "billing", title: "Billing", summary: "Managed by your workspace owner", detail: "View the billing contact and current plan for this workspace.", icon: IconCreditCard },
  ];

  return (
    <Accordion type="multiple" defaultValue={["notifications"]} className="w-full max-w-lg gap-3">
      {sections.map(({ value, title, summary, detail, icon: Icon, badge }) => (
        <AccordionItem key={value} value={value} className="rounded-lg border px-3">
          <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span className="grid min-w-0 flex-1 gap-0.5 text-left">
              <span className="font-medium">{title}</span>
              <span className="text-xs font-normal text-muted-foreground">{summary}</span>
            </span>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </AccordionTrigger>
          <AccordionContent className="pl-7 text-muted-foreground">{detail}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function NestedAccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue="access" className="w-full max-w-lg gap-2">
      <AccordionItem value="overview" className="rounded-lg border px-4">
        <AccordionTrigger>Workspace overview</AccordionTrigger>
        <AccordionContent>Review the workspace profile, member count, and recent activity.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="access" className="rounded-lg border px-4">
        <AccordionTrigger>Access configuration</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="gap-2">
            {nestedDetails.map((item) => (
              <AccordionItem key={item.value} value={item.value} className="rounded-md border px-3">
                <AccordionTrigger className="text-sm">{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function MemberAccessAccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue={members[0].id} className="w-full max-w-lg gap-2">
      {members.map((member) => (
        <AccordionItem key={member.id} value={member.id} className="rounded-lg border px-3">
          <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
            <Avatar aria-hidden="true" className="size-8"><AvatarFallback className="text-xs">{member.initials}</AvatarFallback></Avatar>
            <span className="grid min-w-0 flex-1 gap-0.5 text-left">
              <span className="flex flex-wrap items-center gap-2 font-medium">
                {member.name}
                <Badge variant={member.role === "Admin" ? "default" : "secondary"}>{member.role}</Badge>
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">{member.email}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pl-11 text-muted-foreground">{member.access}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function SetupStepsAccordionExample() {
  const [linkSent, setLinkSent] = useState(false);

  return (
    <Accordion type="single" collapsible defaultValue="directory" className="w-full max-w-lg">
      {setupSteps.map((step) => (
        <AccordionItem key={step.value} value={step.value} className="px-3">
          <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
            {step.state === "complete" ? (
              <IconCircleCheck aria-hidden="true" className="size-4 shrink-0 text-primary" />
            ) : step.state === "current" ? (
              <IconClock aria-hidden="true" className="size-4 shrink-0 text-primary" />
            ) : (
              <IconCircleDashed aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="min-w-0 flex-1 text-left">{step.title}</span>
            <Badge variant={step.state === "current" ? "default" : "secondary"}>{step.status}</Badge>
          </AccordionTrigger>
          <AccordionContent className="pl-7 text-muted-foreground">
            {step.state === "current" ? (
              <div className="flex flex-col gap-4 pb-2 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <p>{step.content} Scan the code or send an access link to a teammate.</p>
                  <div className="flex flex-wrap gap-2">
                    <Input aria-label="Team member email" placeholder="name@company.com" className="min-w-0 flex-1" />
                    <Button type="button" variant="outline" size="sm" onClick={() => setLinkSent(true)}>Send link</Button>
                  </div>
                  <span role="status" aria-live="polite" className="text-xs">{linkSent ? "Invite link sent." : ""}</span>
                </div>
                <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30">
                  <IconQrcode aria-hidden="true" className="size-20 text-foreground/80" strokeWidth={1.5} />
                </div>
              </div>
            ) : step.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function FrameAccordionExample() {
  const sections = [
    { value: "profile", title: "Workspace profile", summary: "Organization details", detail: "Manage the workspace name, region, and contact information.", icon: IconSettings, badge: "Updated" },
    { value: "security", title: "Access policies", summary: "Roles and sign-in requirements", detail: "Review role assignments and authentication requirements for workspace members.", icon: IconLock },
    { value: "notifications", title: "Notifications", summary: "Team update preferences", detail: "Choose which workspace events are sent to each channel.", icon: IconBell },
  ];

  return (
    <Frame className="w-full max-w-lg" stacked spacing="sm">
      {sections.map(({ value, title, summary, detail, icon: Icon, badge }) => (
        <FramePanel key={value}>
          <Accordion type="single" collapsible defaultValue={sections[0].value}>
            <AccordionItem value={value} className="border-none bg-transparent">
              <AccordionTrigger className="items-center px-1 py-1 font-semibold hover:no-underline">
                <span className="flex min-w-0 items-center gap-3 text-left">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted"><Icon className="size-4 text-muted-foreground" /></span>
                  <span className="min-w-0"><span className="block">{title}</span><span className="block text-xs font-normal text-muted-foreground">{summary}</span></span>
                  {badge && <Badge variant="secondary" className="ms-1">{badge}</Badge>}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-12 text-muted-foreground">{detail}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </FramePanel>
      ))}
    </Frame>
  );
}

function RotatingArrowAccordionExample() {
  const items = [
    { value: "project", title: "Can I change project settings?", content: "Project owners can update team access, notifications, and default views at any time." },
    { value: "roles", title: "How are workspace roles assigned?", content: "Administrators assign roles from the member directory and can update them as responsibilities change." },
    { value: "history", title: "Where can I review recent changes?", content: "Open the activity page to see a time-ordered record of workspace updates." },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="project" className="w-full max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="flex-row-reverse items-center justify-end gap-3 py-3 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
            <span className="font-medium text-foreground/90">{item.title}</span>
            <IconChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-90" />
          </AccordionTrigger>
          <AccordionContent className="pl-7 leading-relaxed text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function DisabledAccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue="billing" className="w-full max-w-lg overflow-hidden rounded-xl border border-border">
      <AccordionItem value="billing" className="px-4 data-[state=open]:bg-muted/40">
        <AccordionTrigger>Billing settings</AccordionTrigger>
        <AccordionContent>Workspace administrators can review the billing contact, invoices, and current plan.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="advanced" disabled className="px-4 data-[disabled]:opacity-50">
        <AccordionTrigger>Advanced access policy</AccordionTrigger>
        <AccordionContent>Only organization owners can change this policy.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionExamples() {
  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="A basic single-expand accordion"><AccordionExample variant="plain" /></ComponentPreview>
      <ComponentPreview title="Multiple items with plus and minus indicators"><AccordionExample variant="divided" multiple plusMinus /></ComponentPreview>
      <ComponentPreview title="Controlled expansion" className="xl:col-span-2"><ControlledAccordionExample /></ComponentPreview>
      <ComponentPreview title="Accordion with borders and rounded corners"><AccordionExample variant="bordered" /></ComponentPreview>
      <ComponentPreview title="Muted panels"><AccordionExample variant="muted" /></ComponentPreview>
      <ComponentPreview title="Accordion inside a settings card"><AccordionInCardExample /></ComponentPreview>
      <ComponentPreview title="Settings with icons and badges"><SettingsAccordionExample /></ComponentPreview>
      <ComponentPreview title="Nested access details"><NestedAccordionExample /></ComponentPreview>
      <ComponentPreview title="Member access by role"><MemberAccessAccordionExample /></ComponentPreview>
      <ComponentPreview title="Workspace setup steps"><SetupStepsAccordionExample /></ComponentPreview>
      <ComponentPreview title="Disabled item and expanded state"><DisabledAccordionExample /></ComponentPreview>
      <ComponentPreview title="Accordion items inside Frame panels"><FrameAccordionExample /></ComponentPreview>
      <ComponentPreview title="Accordion with a rotating arrow"><RotatingArrowAccordionExample /></ComponentPreview>
    </div>
  );
}
