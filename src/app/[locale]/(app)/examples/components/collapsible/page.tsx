"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { ChevronDown, FileText, Folder, FolderOpen } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

function CollapsibleExamples() {
  return (
    <>
      <ComponentPreview title="Collapsible Details">
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
      <ComponentPreview title="Nested File Tree">
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
    </>
  );
}

export default function CollapsiblePage() {
  return <Showcase title="Collapsible"><CollapsibleExamples /></Showcase>;
}
