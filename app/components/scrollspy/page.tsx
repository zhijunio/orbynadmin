"use client";

import { useRef } from "react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/buttons/button";
import { ScrollArea } from "@/components/ui/scroll-area/scroll-area";
import { Scrollspy } from "@/components/ui/scrollspy/scrollspy";

const sectionContent = [
  { key: "overview", label: "Overview", title: "Workspace overview", detail: "Review active projects, recent changes, and the current operating status." },
  { key: "access", label: "Access", title: "Access and roles", detail: "Manage team membership, assigned roles, and workspace permissions." },
  { key: "members", label: "Members", title: "Team members", detail: "See who has access and invite teammates to collaborate." },
  { key: "audit", label: "Audit log", title: "Audit activity", detail: "Track important changes made across the workspace." },
  { key: "billing", label: "Billing", title: "Billing settings", detail: "Review the current plan, invoices, and payment details." },
] as const;

function createSections(prefix: string) {
  return sectionContent.map((section) => ({ ...section, id: `${prefix}-${section.key}` }));
}

function VerticalNavigationExample() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sections = createSections("vertical-workspace");

  return (
    <div className="grid w-full gap-4 md:grid-cols-[9rem_minmax(0,1fr)]">
      <Scrollspy targetRef={scrollRef} offset={12} className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
        {sections.map((section) => (
          <Button
            key={section.id}
            type="button"
            variant="outline"
            size="sm"
            data-scrollspy-anchor={section.id}
            className="justify-start data-[active=true]:border-primary/30 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          >
            {section.label}
          </Button>
        ))}
      </Scrollspy>
      <ScrollArea ref={scrollRef} className="h-72 rounded-lg border">
        <div className="space-y-4 p-4">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="min-h-40 scroll-mt-3 border-b pb-4 last:border-b-0">
              <h2 className="text-sm font-semibold">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{section.detail}</p>
              <p className="mt-5 text-xs text-muted-foreground">Workspace settings · Updated today</p>
            </section>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function HorizontalNavigationExample() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sections = createSections("horizontal-workspace");

  return (
    <div className="w-full space-y-3">
      <Scrollspy targetRef={scrollRef} offset={12} className="flex w-full gap-2 overflow-x-auto pb-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            type="button"
            variant="outline"
            size="sm"
            data-scrollspy-anchor={section.id}
            className="shrink-0 data-[active=true]:border-primary/30 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          >
            {section.label}
          </Button>
        ))}
      </Scrollspy>
      <ScrollArea ref={scrollRef} className="h-64 rounded-lg border">
        <div className="space-y-4 p-4">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="min-h-40 scroll-mt-3 border-b pb-4 last:border-b-0">
              <h2 className="text-sm font-semibold">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{section.detail}</p>
              <p className="mt-5 text-xs text-muted-foreground">Workspace settings · Updated today</p>
            </section>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function ScrollspyPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Scrollspy" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0">
          <ComponentPreview title="Vertical section navigation">
            <VerticalNavigationExample />
          </ComponentPreview>
          <ComponentPreview title="Horizontal section navigation">
            <HorizontalNavigationExample />
          </ComponentPreview>
        </div>
      </div>
    </AppShell>
  );
}
