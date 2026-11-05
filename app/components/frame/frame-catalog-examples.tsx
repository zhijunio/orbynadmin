import { IconChevronRight } from "@tabler/icons-react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible/collapsible";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame/frame";


const examples = [
  { title: "Basic Frame", heading: "Workspace overview", description: "Summary of your team's current workspace.", panelTitle: "Active projects", panelDescription: "12 projects are active across 4 teams.", footer: "Updated just now" },
  { title: "Frame with Separated Panels", heading: "Workspace overview", description: "Keep related sections visually distinct.", panels: [{ title: "Active projects", description: "12 projects are active across 4 teams." }, { title: "Open tasks", description: "8 tasks are waiting for review." }] },
  { title: "Frame with Stacked Panels", heading: "Workspace overview", description: "Join adjacent panels into one continuous surface.", stacked: true, panels: [{ title: "Active projects", description: "12 projects are active across 4 teams." }, { title: "Open tasks", description: "8 tasks are waiting for review." }] },
  { title: "Frame with Stacked Panels and Dense Style", heading: "Workspace overview", description: "Compact stacked sections for dense dashboard content.", stacked: true, dense: true, panels: [{ title: "Active projects", description: "12 projects are active across 4 teams." }, { title: "Open tasks", description: "8 tasks are waiting for review." }] },
  { title: "Frame with Ghost (No Outer Border) Variant", variant: "ghost" as const, heading: "Connected services", description: "The outer surface has no border; individual panels remain defined.", panelTitle: "Service status", panelDescription: "All connected services are operational." },
  { title: "Frame with Dense Layout", dense: true, heading: "Inventory status", description: "Compact layout for high-density dashboard content.", panelTitle: "Warehouse A", panelDescription: "Stock levels are within the expected range." },
  { title: "Frame with Stacked Panels (Activity Rows)", stacked: true, heading: "Recent activity", description: "Latest changes across the workspace.", panels: [{ title: "Access policy updated", description: "Security team · 8 minutes ago" }, { title: "Release candidate deployed", description: "Platform team · 24 minutes ago" }, { title: "New member invited", description: "Operations team · 1 hour ago" }] },
  { title: "Frame with Extra Small Spacing", spacing: "xs" as const, heading: "Environment settings", description: "Compact spacing for property panels.", panelTitle: "Production", panelDescription: "Last configuration update: today", footer: "View settings" },
  { title: "Frame with Small Spacing", spacing: "sm" as const, heading: "Database health", description: "A compact layout for secondary dashboard content.", panelTitle: "Connections", panelDescription: "128 active connections · within limits", footer: "Operational" },
  { title: "Frame with Default Spacing", spacing: "default" as const, heading: "Account security", description: "Standard spacing for primary workspace content.", panelTitle: "Recent sign-in", panelDescription: "Last sign-in was today from a recognized device.", footer: "Review security" },
  { title: "Frame with Large Spacing", spacing: "lg" as const, heading: "System analytics", description: "More breathing room around a focused summary.", panelTitle: "Traffic overview", panelDescription: "Usage is stable across all regions.", footer: "Open analytics" },
  { title: "Frame with Small Border Radius", radius: "var(--radius-sm)", heading: "Network diagnostics", description: "A tighter radius for technical dashboards.", panelTitle: "Connection status", panelDescription: "All monitored endpoints are responding.", footer: "Scan completed" },
  { title: "Frame with Medium Border Radius", radius: "var(--radius-md)", heading: "Media library", description: "A moderate radius for general workspace content.", panelTitle: "Storage capacity", panelDescription: "75% of the available storage is in use.", footer: "Manage files" },
  { title: "Frame with Large Border Radius", radius: "var(--radius-lg)", heading: "Team collaboration", description: "A softer radius for people and collaboration views.", panelTitle: "Active members", panelDescription: "3 teammates are online.", footer: "View team" },
  { title: "Frame with Default Border Radius", heading: "Default layout", description: "Uses the shared radius from the design system.", panelTitle: "Workspace settings", panelDescription: "The component follows the default frame radius.", footer: "Defaults applied" },
  { title: "Frame with Extra Large Border Radius", radius: "var(--radius-2xl)", heading: "Project portfolio", description: "A softer radius for broad, visual content.", panelTitle: "Current initiatives", panelDescription: "Review milestones and ownership across active work.", footer: "Browse projects" },
] as const;

function FrameSample({
  example,
}: {
  example: (typeof examples)[number];
}) {
  return (
    <ComponentPreview title={example.title} span={2}>
      <Frame
        className="w-full"
        variant={"variant" in example ? example.variant : "default"}
        spacing={"spacing" in example ? example.spacing : "default"}
        stacked={"stacked" in example ? example.stacked : false}
        dense={"dense" in example ? example.dense : false}
        style={"radius" in example ? ({ "--frame-radius": example.radius } as React.CSSProperties) : undefined}
      >
        <FrameHeader>
          <FrameTitle>{example.heading}</FrameTitle>
          <FrameDescription>{example.description}</FrameDescription>
        </FrameHeader>
        {"panels" in example ? example.panels.map((panel) => (
          <FramePanel key={panel.title}>
            <h2 className="text-sm font-semibold">{panel.title}</h2>
            <p className="text-sm text-muted-foreground">{panel.description}</p>
          </FramePanel>
        )) : (
          <FramePanel>
            <h2 className="text-sm font-semibold">{example.panelTitle}</h2>
            <p className="text-sm text-muted-foreground">{example.panelDescription}</p>
          </FramePanel>
        )}
        {"footer" in example && <FrameFooter><p className="text-sm text-muted-foreground">{example.footer}</p></FrameFooter>}
      </Frame>
    </ComponentPreview>
  );
}

function CollapsibleFrameExample() {
  return (
    <ComponentPreview title="Collapsible Panels" span={2}>
      <Frame className="w-full" stacked>
        <Collapsible defaultOpen className="group/frame-collapsible">
          <CollapsibleTrigger className="w-full text-left">
            <FrameHeader className="flex flex-row items-center justify-between gap-2">
              <FrameTitle>Deployment checklist</FrameTitle>
              <IconChevronRight className="size-4 text-muted-foreground transition-transform group-data-[state=open]/frame-collapsible:rotate-90" />
            </FrameHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FramePanel>
              <p className="text-sm text-muted-foreground">Review pending approvals, confirm the release window, and verify the production health checks before deployment.</p>
            </FramePanel>
          </CollapsibleContent>
        </Collapsible>
      </Frame>
    </ComponentPreview>
  );
}

function ContentOnlyExamples() {
  const panels = [
    { title: "Account snapshot", description: "Active seats, usage limits, and billing status are ready for review." },
    { title: "Team activity", description: "24 members signed in this week with no unresolved security alerts." },
  ];

  return (
    <>
      <ComponentPreview title="Content-Only Panels" span={2}>
        <Frame className="w-full">
          {panels.map((panel) => <FramePanel key={panel.title}><h2 className="text-sm font-semibold">{panel.title}</h2><p className="text-sm text-muted-foreground">{panel.description}</p></FramePanel>)}
        </Frame>
      </ComponentPreview>
      <ComponentPreview title="Stacked Content Panels" span={2}>
        <Frame className="w-full" stacked>
          {panels.map((panel) => <FramePanel key={panel.title}><h2 className="text-sm font-semibold">{panel.title}</h2><p className="text-sm text-muted-foreground">{panel.description}</p></FramePanel>)}
        </Frame>
      </ComponentPreview>
    </>
  );
}

export function FrameCatalogExamples() {
  return (
    <CatalogGridItems>
      {examples.slice(0, 4).map((example) => <FrameSample key={example.title} example={example} />)}
                <CollapsibleFrameExample />
                {examples.slice(4).map((example) => <FrameSample key={example.title} example={example} />)}
                <ContentOnlyExamples />
    </CatalogGridItems>
  );
}
