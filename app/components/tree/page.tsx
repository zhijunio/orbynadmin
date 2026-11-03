"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";

import { useState } from "react";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Button } from "@/components/ui/buttons/button";
import {
  Tree,
  type TreeNode,
} from "@/components/ui/tree/tree";

const workspaceFiles: TreeNode[] = [
  {
    id: "app",
    label: "app",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "button.tsx" },
          { id: "input", label: "input.tsx" },
          { id: "tree", label: "tree.tsx" },
        ],
      },
      { id: "page", label: "page.tsx" },
      { id: "styles", label: "styles.css" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "logo", label: "logo.svg" },
      { id: "images", label: "images", children: [{ id: "avatar", label: "avatar.png" }] },
    ],
  },
  { id: "readme", label: "README.md" },
  { id: "secrets", label: "private.env", disabled: true, trailingContent: "Restricted" },
];

function findNodeLabel(nodes: TreeNode[], id: string | null): string | undefined {
  for (const node of nodes) {
    if (node.id === id) return node.label;
    const childLabel = findNodeLabel(node.children ?? [], id);
    if (childLabel) return childLabel;
  }
}

function TreeExamples() {
  const [expandedIds, setExpandedIds] = useState(["app", "components"]);
  const [selectedIds, setSelectedIds] = useState(["button"]);
  const [multipleSelectedIds, setMultipleSelectedIds] = useState(["button"]);
  const [multipleExpandedIds, setMultipleExpandedIds] = useState([
    "app",
    "components",
  ]);
  const selectedLabel = findNodeLabel(workspaceFiles, selectedIds[0] ?? null);

  return <>
    <ComponentPreview title="Workspace Files" className="xl:col-span-2">
      <div className="w-full max-w-xl space-y-3">
        <div className="flex justify-end">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setExpandedIds([])}
          >
            Collapse all
          </Button>
        </div>
        <Tree
          aria-label="Workspace files"
          items={workspaceFiles}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          className="rounded-lg border p-2"
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Selected: {selectedLabel ?? "None"}
        </p>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Multiple Selection">
      <div className="w-full max-w-sm space-y-3">
        <Tree
          aria-label="Select files to share"
          items={workspaceFiles}
          selectionMode="multiple"
          expandedIds={multipleExpandedIds}
          onExpandedChange={setMultipleExpandedIds}
          selectedIds={multipleSelectedIds}
          onSelectionChange={setMultipleSelectedIds}
          className="rounded-lg border p-2"
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {multipleSelectedIds.length} selected · Shift + arrow to select a range
        </p>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Compact Tree">
      <Tree
        aria-label="Compact project files"
        items={workspaceFiles}
        defaultExpandedIds={["public"]}
        defaultSelectedIds={["readme"]}
        size="sm"
        showGuides={false}
        className="w-full max-w-sm rounded-lg border p-2"
      />
    </ComponentPreview>

    <ComponentPreview title="Empty Search Results">
      <Tree
        aria-label="Empty file search results"
        items={[]}
        emptyState="No matching files."
        className="w-full max-w-sm rounded-lg border p-2"
      />
    </ComponentPreview>
    </>;
}

export default function TreePage() {
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Tree" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <TreeExamples />
    </div></div>}</AppShell>;
}
