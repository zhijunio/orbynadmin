"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconCheck,
  IconCircleCheck,
  IconCloudUpload,
  IconGitBranch,
  IconHistory,
  IconPencil,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconX,
} from "@tabler/icons-react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Badge } from "@/components/ui/badge/badge";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker/marker";
import { Spinner } from "@/components/ui/spinner/spinner";

const activities = [
  { id: "policy", label: "Access policy updated", icon: IconSettings },
  { id: "search", label: "Reviewed 214 workspace records", icon: IconSearch },
  { id: "release", label: "Release candidate deployed", icon: IconCloudUpload },
  { id: "branch", label: "A review was requested", icon: IconGitBranch },
  { id: "history", label: "Audit history exported", icon: IconHistory },
];
const phases = [
  { title: "Plan", steps: ["Workspace settings reviewed", "Change request prepared"] },
  { title: "Apply", steps: ["Access rules updated", "Changes published"] },
  { title: "Verify", steps: ["Health checks passed"] },
];
const changes = [
  { label: "Access rules updated", status: "modified", delta: "+3 changes", Icon: IconPencil },
  { label: "New team added", status: "added", delta: "+1 team", Icon: IconCheck },
  { label: "Legacy role removed", status: "removed", delta: "−1 role", Icon: IconX },
];

function MarkerActionExample() {
  const [reverted, setReverted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Marker asChild className="underline-offset-4 hover:text-foreground hover:underline">
        <Link href="/components/button"><MarkerIcon><IconGitBranch /></MarkerIcon><MarkerContent>Review a pending project change</MarkerContent></Link>
      </Marker>
      <Marker asChild className="underline-offset-4 hover:text-foreground hover:underline">
        <Link href="/components/button"><MarkerIcon><IconHistory /></MarkerIcon><MarkerContent>Open recent workspace activity</MarkerContent></Link>
      </Marker>
      <Marker asChild>
        <button type="button" className="transition-colors hover:text-foreground" onClick={() => setReverted((value) => !value)}>
          <MarkerIcon>{reverted ? <IconCheck /> : <IconRefresh />}</MarkerIcon>
          <MarkerContent>{reverted ? "Undo the change" : "Revert this change"}</MarkerContent>
        </button>
      </Marker>
      <span role="status" aria-live="polite" className="sr-only">{reverted ? "Change reverted" : ""}</span>
    </div>
  );
}

export function MarkerCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Default, Separator, and Border Markers">
                  <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                    <Marker><MarkerContent>Deployment checks completed</MarkerContent></Marker>
                    <Marker variant="separator"><MarkerContent>Workspace activity</MarkerContent></Marker>
                    <Marker variant="border"><MarkerContent>3 settings were updated</MarkerContent></Marker>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Activity Log with Icon Markers">
                  <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
                    {activities.map(({ id, label, icon: Icon }) => <Marker key={id}><MarkerIcon><Icon /></MarkerIcon><MarkerContent>{label}</MarkerContent></Marker>)}
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Run Status Markers with Live Step" span={2}>
                  <div className="mx-auto flex w-full max-w-md flex-col gap-3">
                    <p className="mb-1 text-sm font-medium">Policy update</p>
                    <Marker><MarkerIcon><IconCircleCheck className="text-primary" /></MarkerIcon><MarkerContent>Reviewed current access rules</MarkerContent></Marker>
                    <Marker><MarkerIcon><IconCircleCheck className="text-primary" /></MarkerIcon><MarkerContent>Updated team permissions</MarkerContent></Marker>
                    <Marker><MarkerIcon><IconX className="text-destructive" /></MarkerIcon><MarkerContent>One approval is still required</MarkerContent><Badge variant="destructive">Pending</Badge></Marker>
                    <Marker role="status"><MarkerIcon><Spinner size="sm" /></MarkerIcon><MarkerContent><span className="sr-only">In progress: </span><span className="animate-pulse">Checking connected services</span></MarkerContent></Marker>
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Activity Grouped by Phase Separators" span={2}>
                  <div className="mx-auto flex w-full max-w-md flex-col gap-3">
                    {phases.map((phase) => <div key={phase.title} className="contents"><Marker variant="separator"><MarkerContent>{phase.title}</MarkerContent></Marker>{phase.steps.map((step) => <Marker key={step}><MarkerIcon><IconCircleCheck /></MarkerIcon><MarkerContent>{step}</MarkerContent></Marker>)}</div>)}
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Change Summary with Border Markers" span={2}>
                  <div className="mx-auto flex w-full max-w-md flex-col gap-2">
                    {changes.map(({ label, status, delta, Icon }, index) => <Marker key={label} variant={index < changes.length - 1 ? "border" : "default"}><MarkerIcon><Icon /></MarkerIcon><MarkerContent>{label}</MarkerContent><Badge className="ms-auto" variant={status === "added" ? "secondary" : status === "removed" ? "destructive" : "outline"}>{status}</Badge><span className="shrink-0 text-xs tabular-nums">{delta}</span></Marker>)}
                  </div>
                </ComponentPreview>

                <ComponentPreview title="Markers as Links and Action Button" span={2}>
                  <MarkerActionExample />
                </ComponentPreview>
    </CatalogGridItems>
  );
}
