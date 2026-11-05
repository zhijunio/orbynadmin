"use client";

import { useState } from "react";
import { IconDatabase, IconFolder, IconMessages, IconUserCheck, IconUsers, IconVideo, IconCloud } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { ListCard, ListCardFooter, ListCardHeader } from "@/components/blocks/application/list/list-card";

const integrations = [
  { id: "video", name: "Video Meetings", description: "Schedule and host video meetings", Icon: IconVideo },
  { id: "chat", name: "Team Chat", description: "Send alerts and team commands", Icon: IconMessages },
  { id: "community", name: "Community", description: "Publish posts and track engagement", Icon: IconUsers },
  { id: "database", name: "Database", description: "Manage application data and access", Icon: IconDatabase },
  { id: "identity", name: "Identity", description: "Enable secure sign in and SSO", Icon: IconUserCheck },
  { id: "storage", name: "Cloud Storage", description: "Store and share team files", Icon: IconCloud },
  { id: "projects", name: "Project Tracking", description: "Sync tasks and project updates", Icon: IconFolder },
] as const;

export function IntegrationDirectory() {
  const [connected, setConnected] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const visibleIntegrations = integrations.slice(0, showAll ? integrations.length : 5);

  function toggleConnection(id: string) {
    setConnected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <ListCard aria-labelledby="integration-directory-title">
      <ListCardHeader>
        <h2 id="integration-directory-title" className="text-base font-semibold">Integrations</h2>
      </ListCardHeader>
      <ul className="px-3.5">
        {visibleIntegrations.map(({ id, name, description, Icon }, index) => {
          const isConnected = connected.includes(id);
          return (
            <li key={id} className={`flex min-h-[68px] items-center gap-2 ${index < visibleIntegrations.length - 1 ? "border-b border-dashed border-border" : ""}`}>
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{name}</p>
                <p className="truncate text-xs text-muted-foreground">{description}</p>
              </div>
              <Button size="sm" variant={isConnected ? "secondary" : "outline"} onClick={() => toggleConnection(id)} aria-pressed={isConnected} className="shrink-0">{isConnected ? "Connected" : "Connect"}</Button>
            </li>
          );
        })}
      </ul>
      <ListCardFooter>
        <Button variant="outline" className="w-full" onClick={() => setShowAll((value) => !value)}>{showAll ? "Show Fewer" : "See All Integrations"}</Button>
      </ListCardFooter>
    </ListCard>
  );
}
