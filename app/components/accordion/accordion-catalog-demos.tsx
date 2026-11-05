"use client";

import { useState } from "react";
import {
  IconBell,
  IconChevronRight,
  IconCreditCard,
  IconLock,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion/accordion";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";

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

export function AccordionExample({
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

export function ControlledAccordionExample() {
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


export function SettingsAccordionExample() {
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





export function RotatingArrowAccordionExample() {
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

export function DisabledAccordionExample() {
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
