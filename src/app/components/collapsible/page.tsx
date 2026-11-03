"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { useState } from "react";

import { PageHeader } from "@/components/custom/app-shell/page-header";

import { IconChevronDown as ChevronDown, IconFileText as FileText, IconFolder as Folder, IconFolderOpen as FolderOpen } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible/collapsible";
import { Button } from "@/components/ui/buttons/button";

function CollapsibleExamples() {
  const [isOpen, setIsOpen] = useState(false);

  return <>
      <ComponentPreview title="Single Collapsible Section">
        <Collapsible className="w-full rounded-lg border border-border px-4">
          <CollapsibleTrigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-medium">
            Deployment details
            <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t border-border pb-4 pt-3 text-sm leading-6 text-muted-foreground">
            Production deployment completed successfully. The latest release is live in all regions and no follow-up actions are required.
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>
      <ComponentPreview title="Controlled Open State">
        <div className="w-full max-w-lg space-y-3">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="rounded-lg border px-4">
            <CollapsibleTrigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-medium">
              Release notes
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t pb-4 pt-3 text-sm text-muted-foreground">
              Version 2.4 adds project filters and keyboard navigation.
            </CollapsibleContent>
          </Collapsible>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span aria-live="polite">{isOpen ? "Release notes expanded" : "Release notes collapsed"}</span>
            <Button type="button" size="sm" variant="outline" onClick={() => setIsOpen((open) => !open)}>
              {isOpen ? "Collapse" : "Expand"} externally
            </Button>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled Collapsible">
        <Collapsible disabled className="w-full max-w-lg rounded-lg border px-4 opacity-60">
          <CollapsibleTrigger className="w-full py-4 text-left text-sm font-medium">
            Managed by your administrator
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t pb-4 pt-3 text-sm text-muted-foreground">
            This section is currently unavailable.
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>
      <ComponentPreview title="Nested Sections">
        <div className="w-full space-y-1 text-sm">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted">
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=closed]:-rotate-90" />
              <FolderOpen className="size-4 text-primary" />
              <span className="font-medium">src</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 border-l pl-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted">
                  <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=closed]:-rotate-90" />
                  <Folder className="size-4 text-muted-foreground" />
                  <span>components</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1 border-l py-1 pl-4">
                  <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground"><FileText className="size-4" />button.tsx</div>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground"><FileText className="size-4" />dialog.tsx</div>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ComponentPreview>
    </>;
}

export default function CollapsiblePage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Collapsible" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2"><CollapsibleExamples /></div></div>}</ConsoleLayout>;
}
