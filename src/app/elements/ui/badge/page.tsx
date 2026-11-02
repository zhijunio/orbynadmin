"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";
import { IconArrowUp as ArrowUp, IconCheck as Check } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Badge } from "@/components/base/badges/badge";
import { StatusDot } from "@/components/base/badges/status-dot";
import { Chip } from "@/components/base/badges/chip";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Kbd, KbdGroup } from "@/components/base/kbd/kbd";

function BadgeExamples() {
  const [filters, setFilters] = useState(["Operations", "Finance"]);
  return <>
      <ComponentPreview title="Variants">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Primary</Badge>
          <Badge variant="secondary">Neutral</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Attention</Badge>
          <Badge variant="ghost">Subtle</Badge>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Count Badges">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-sm">
            Notifications
            <Badge variant="secondary" className="min-w-5 justify-center rounded-full px-1.5">
              <span className="sr-only">Unread: </span>91
            </Badge>
          </span>
          <span className="inline-flex items-center gap-2 text-sm">
            Tasks
            <Badge className="min-w-5 justify-center rounded-full px-1.5">
              5
            </Badge>
          </span>
          <span className="inline-flex items-center gap-2 text-sm">
            Updated
            <Badge variant="outline" className="gap-1">
              <Check aria-hidden="true" data-icon="inline-start" />Saved
            </Badge>
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Status Dot">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2"><StatusDot color="success" />Operational</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="warning" />Needs attention</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="error" />Unavailable</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="info" />In progress</span>
          <span className="inline-flex items-center gap-2"><StatusDot color="neutral" />Unknown</span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Trend Badge">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Weekly sign-ins</span>
          <Badge variant="secondary" className="gap-1 text-emerald-700 dark:text-emerald-400">
            <ArrowUp aria-hidden="true" data-icon="inline-start" />14.8%
          </Badge>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Keyboard Shortcuts">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2">Search<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></span>
          <span className="inline-flex items-center gap-2">Save<KbdGroup><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup></span>
          <span className="inline-flex items-center gap-2">Close<Kbd>Esc</Kbd></span>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Chips"><div className="flex flex-wrap items-center gap-2">{filters.map((filter) => <Chip key={filter} onRemove={() => setFilters((current) => current.filter((item) => item !== filter))}>{filter}</Chip>)}{filters.length === 0 && <span className="text-sm text-muted-foreground">All filters removed</span>}<Chip variant="default">Active</Chip></div></ComponentPreview>
      <ComponentPreview title="Close Button"><div className="flex items-center gap-3"><CloseButton aria-label="Close compact item" size="xs" /><CloseButton aria-label="Close panel" size="sm" /><CloseButton aria-label="Close dialog" size="md" /></div></ComponentPreview>
    </>;
}

export default function BadgePage() {
  return <ConsoleLayout>{<Showcase title="Badge"><BadgeExamples /></Showcase>}</ConsoleLayout>;
}
