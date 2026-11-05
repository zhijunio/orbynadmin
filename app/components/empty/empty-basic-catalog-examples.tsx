"use client";

import { useRef, useState } from "react";
import {
  IconBell,
  IconBookmark,
  IconChartBar,
  IconCheck,
  IconFileText,
  IconFolderOpen,
  IconInbox,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUpload,
  IconUsers,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Switch } from "@/components/ui/switch/switch";
import { EmptyCatalogState } from "@/app/components/empty/empty-catalog-state";

export function EmptyBasicCatalogExamples() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [search, setSearch] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(false);

  return (
    <>
      <ComponentPreview title="Basic Empty">
        <EmptyCatalogState
          icon={IconFolderOpen}
          title="No projects yet"
          description="Create a project to organize your team's work and reports."
          action={
            <Button>
              <IconPlus />
              Create project
            </Button>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Search Results">
        <EmptyCatalogState
          icon={IconSearch}
          title="No matching results"
          description="Try a different name or adjust your filters."
          action={<Button variant="outline">Clear filters</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Search Input">
        <EmptyCatalogState
          icon={IconSearch}
          title={search ? `No results for “${search}”` : "Search your workspace"}
          description="Search projects, reports, and team members."
        >
          <Input
            aria-label="Search workspace"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search workspace..."
          />
        </EmptyCatalogState>
      </ComponentPreview>
      <ComponentPreview title="Add Action">
        <EmptyCatalogState
          icon={IconUsers}
          title="No team members"
          description="Invite colleagues to collaborate in this workspace."
          action={
            <Button>
              <IconPlus />
              Invite members
            </Button>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Documents">
        <EmptyCatalogState
          icon={IconFileText}
          title="No documents shared"
          description="Upload a file or create a document to get started."
          action={
            <div className="flex gap-2">
              <Button variant="outline">Browse files</Button>
              <Button>
                <IconPlus />
                New document
              </Button>
            </div>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Dashed Upload">
        <EmptyCatalogState
          icon={IconUpload}
          title={fileName || "Upload workspace files"}
          description="Drop a file here or choose one from your computer. PDF, CSV, and images up to 20 MB."
          variant="dashed"
          action={
            <>
              <input
                ref={uploadRef}
                type="file"
                className="sr-only"
                onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")}
              />
              <Button variant="outline" onClick={() => uploadRef.current?.click()}>
                <IconUpload />
                Choose file
              </Button>
            </>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Inbox">
        <EmptyCatalogState
          icon={IconInbox}
          title="You're all caught up"
          description="New activity and assigned work will appear in your inbox."
          action={<Button variant="outline">View all projects</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Team Members">
        <EmptyCatalogState
          icon={IconUsers}
          title="Build your team"
          description="Invite people who need access to project updates and reports."
          action={
            <Button>
              <IconPlus />
              Invite a teammate
            </Button>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="No Notifications">
        <EmptyCatalogState
          icon={IconBell}
          title="No new notifications"
          description="You're up to date. We'll let you know when something needs your attention."
          action={<Button variant="outline">Notification settings</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="No Analytics Data">
        <EmptyCatalogState
          icon={IconChartBar}
          title="No analytics data yet"
          description="Connect a data source or expand the selected date range to see insights."
          action={<Button variant="outline">Connect data source</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="No Bookmarks">
        <EmptyCatalogState
          icon={IconBookmark}
          title="No saved reports"
          description="Bookmark reports you use often to find them here."
          action={<Button variant="outline">Browse reports</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="No Tasks">
        <EmptyCatalogState
          icon={IconCheck}
          title="No tasks assigned"
          description="Create a task or ask a teammate to assign work to you."
          action={
            <Button>
              <IconPlus />
              Create task
            </Button>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Automations Switch">
        <EmptyCatalogState
          icon={IconSettings}
          title="No automations configured"
          description="Turn on automation suggestions to get started with common workflows."
        >
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
            <Switch
              checked={automationEnabled}
              onCheckedChange={setAutomationEnabled}
              aria-label="Enable automation suggestions"
            />
            <span className="text-sm">{automationEnabled ? "Suggestions enabled" : "Enable suggestions"}</span>
          </div>
        </EmptyCatalogState>
      </ComponentPreview>
    </>
  );
}
