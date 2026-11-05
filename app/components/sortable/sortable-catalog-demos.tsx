"use client";

import * as React from "react";
import { IconBell, IconBrandGithub, IconFileText, IconMusic, IconPhoto, IconSettings, IconVideo } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item/item";
import { Switch } from "@/components/ui/switch/switch";
import { SortableList } from "@/components/ui/sortable/sortable";

type Entry = { id: string; title: string; description: string; kind?: string; size?: string; icon?: React.ReactNode; enabled?: boolean };
const files: Entry[] = [
  { id: "spec", title: "Product specification", description: "Requirements and acceptance criteria", kind: "Document", size: "1.2 MB", icon: <IconFileText /> },
  { id: "cover", title: "Product cover image", description: "Primary campaign artwork", kind: "Image", size: "2.4 MB", icon: <IconPhoto /> },
  { id: "demo", title: "Feature walkthrough", description: "Customer demo recording", kind: "Video", size: "15.7 MB", icon: <IconVideo /> },
  { id: "guide", title: "Audio product guide", description: "Narrated setup instructions", kind: "Audio", size: "8.3 MB", icon: <IconMusic /> },
];
const tracks: Entry[] = [
  { id: "track-1", title: "Morning Briefing", description: "Northwind Studio", size: "3:42" },
  { id: "track-2", title: "Focus Session", description: "Avery Lane", size: "5:18" },
  { id: "track-3", title: "Release Notes", description: "The Workspace Band", size: "2:56" },
];
const gallery: Entry[] = [
  { id: "image-1", title: "campaign-cover.png", description: "2400 × 1600 · 2.4 MB", icon: <IconPhoto /> },
  { id: "image-2", title: "team-workshop.jpg", description: "1920 × 1280 · 1.8 MB", icon: <IconPhoto /> },
  { id: "image-3", title: "product-screen.png", description: "1600 × 1000 · 1.2 MB", icon: <IconPhoto /> },
  { id: "image-4", title: "launch-banner.webp", description: "2560 × 960 · 960 KB", icon: <IconPhoto /> },
  { id: "image-5", title: "workspace-grid.jpg", description: "1800 × 1200 · 1.5 MB", icon: <IconPhoto /> },
  { id: "image-6", title: "dashboard-preview.png", description: "2048 × 1280 · 2.1 MB", icon: <IconPhoto /> },
];


const ItemGlyph = ({ item }: { item: Entry }) => (
  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">{item.icon ?? <IconFileText className="size-4" />}</span>
);

export function SortableDemo({ index }: { index: number }) {
  const [items, setItems] = React.useState<Entry[]>(files);
  const [status, setStatus] = React.useState("Saved");
  const [groups, setGroups] = React.useState([
    { id: "colors", title: "Colors", items: [{ id: "color-indigo", title: "Indigo" }, { id: "color-coral", title: "Coral" }, { id: "color-mint", title: "Mint" }] },
    { id: "sizes", title: "Sizes", items: [{ id: "size-small", title: "Small" }, { id: "size-medium", title: "Medium" }, { id: "size-large", title: "Large" }] },
    { id: "materials", title: "Materials", items: [{ id: "material-aluminum", title: "Aluminum" }, { id: "material-glass", title: "Glass" }, { id: "material-fiber", title: "Recycled fiber" }] },
  ]);
  const [enabledChannels, setEnabledChannels] = React.useState(["email", "in-app"]);
  const [failed, setFailed] = React.useState(false);
  const [channels, setChannels] = React.useState<Entry[]>([
    { id: "email", title: "Email", description: "Daily and urgent updates", icon: <IconBell /> },
    { id: "in-app", title: "In-app", description: "Mentions and assigned work", icon: <IconBrandGithub /> },
    { id: "push", title: "Push", description: "Time-sensitive notifications", icon: <IconBell /> },
  ]);
  const [navigation, setNavigation] = React.useState<Entry[]>([
    { id: "overview", title: "Overview", description: "", icon: <IconPhoto /> },
    { id: "projects", title: "Projects", description: "", icon: <IconFileText /> },
    { id: "activity", title: "Activity", description: "", icon: <IconBell /> },
    { id: "settings", title: "Settings", description: "", icon: <IconSettings /> },
  ]);
  const [galleryItems, setGalleryItems] = React.useState(gallery);
  const updateGroup = (id: string, next: { id: string; title: string }[]) =>
    setGroups((current) => current.map((group) => (group.id === id ? { ...group, items: next } : group)));

  if (index === 0)
    return (
      <SortableList
        items={items}
        onItemsChange={setItems}
        getItemValue={(item) => item.id}
        handleLabel={(item) => `Reorder ${item.title}`}
        renderItem={(item) => (
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ItemGlyph item={item} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Badge variant="outline">{item.kind}</Badge>
              <span className="text-xs text-muted-foreground">{item.size}</span>
            </div>
          </Item>
        )}
      />
    );
  if (index === 1)
    return (
      <SortableList
        strategy="grid"
        items={items}
        onItemsChange={setItems}
        getItemValue={(item) => item.id}
        handleLabel={(item) => `Reorder ${item.title}`}
        itemClassName="min-h-28"
        renderItem={(item) => (
          <Item variant="outline" className="h-full min-h-28 flex-col items-start justify-between">
            <ItemHeader>
              <Badge variant="secondary">{item.kind}</Badge>
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Item>
        )}
      />
    );
  if (index === 2)
    return (
      <div className="grid min-w-0 gap-3 sm:grid-cols-3">
        {groups.map((group) => (
          <section key={group.id} className="min-w-0 rounded-xl border border-border bg-card p-3">
            <h3 className="mb-2 text-sm font-semibold">{group.title}</h3>
            <SortableList
              strategy="vertical"
              items={group.items}
              onItemsChange={(next) => updateGroup(group.id, next)}
              getItemValue={(item) => item.id}
              renderItem={(item) => <div className="rounded-md border border-border bg-background px-2 py-2 text-xs">{item.title}</div>}
            />
          </section>
        ))}
      </div>
    );
  if (index === 3)
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Release playlist</p>
            <p className="text-xs text-muted-foreground">{tracks.length} tracks · drag to reorder</p>
          </div>
          <Badge variant="secondary">Playing</Badge>
        </div>
        <SortableList
          items={tracks.map((track) => items.find((item) => item.id === track.id) ?? track)}
          onItemsChange={setItems}
          getItemValue={(item) => item.id}
          itemClassName="px-3"
          handleLabel={(item) => `Reorder ${item.title}`}
          renderItem={(item, itemIndex) => (
            <Item size="sm" className="rounded-md">
              <ItemMedia variant="icon">
                <IconMusic />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {item.title}
                  {itemIndex === 0 && <Badge variant="secondary">Now playing</Badge>}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <span className="text-xs tabular-nums text-muted-foreground">{item.size}</span>
            </Item>
          )}
        />
      </div>
    );
  if (index === 4)
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold">Notification priority</h3>
          <p className="text-xs text-muted-foreground">Drag channels to set delivery order.</p>
        </div>
        <SortableList
          items={channels}
          onItemsChange={setChannels}
          getItemValue={(item) => item.id}
          renderItem={(item) => (
            <Item size="sm">
              <ItemMedia variant="icon">{item.icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <Switch
                checked={enabledChannels.includes(item.id)}
                onCheckedChange={(checked) =>
                  setEnabledChannels((current) => (checked ? [...current, item.id] : current.filter((id) => id !== item.id)))
                }
                aria-label={`${item.title} notifications`}
              />
            </Item>
          )}
        />
      </div>
    );
  if (index === 5)
    return (
      <div className="rounded-xl border border-border bg-card p-2">
        <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">WORKSPACE</p>
        <SortableList
          items={navigation}
          onItemsChange={setNavigation}
          getItemValue={(item) => item.id}
          renderItem={(item) => (
            <Item size="sm" className="rounded-md px-2 py-1 hover:bg-accent">
              <ItemMedia>{item.icon}</ItemMedia>
              <ItemTitle className="flex-1">{item.title}</ItemTitle>
              {item.id === "projects" && <Badge variant="secondary">8</Badge>}
            </Item>
          )}
        />
      </div>
    );
  if (index === 6)
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold">Launch gallery</h3>
          <p className="text-xs text-muted-foreground">Reorder image assets for the campaign.</p>
        </div>
        <SortableList
          strategy="grid"
          items={galleryItems}
          onItemsChange={setGalleryItems}
          getItemValue={(item) => item.id}
          itemClassName="min-h-32"
          renderItem={(item) => (
            <div className="grid min-h-32 content-between rounded-lg border border-border bg-muted/30 p-3">
              <div className="grid size-8 place-items-center rounded-md bg-background text-muted-foreground">{item.icon}</div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{item.title}</p>
                <p className="text-[11px] text-muted-foreground">{item.description}</p>
              </div>
            </div>
          )}
        />
      </div>
    );
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Release checklist</h3>
          <p className="text-xs text-muted-foreground">Changes are saved after each reorder.</p>
        </div>
        <Badge variant={status === "Saved" ? "secondary" : "outline"}>{status}</Badge>
      </div>
      <SortableList
        items={items}
        onItemsChange={setItems}
        getItemValue={(item) => item.id}
        onValueCommit={(next, previous) => {
          setStatus("Saving…");
          window.setTimeout(() => {
            if (failed) {
              setItems(previous);
              setStatus("Save failed · order restored");
              setFailed(false);
            } else {
              setItems(next);
              setStatus("Saved");
            }
          }, 650);
        }}
        handleLabel={(item) => `Reorder ${item.title}`}
        renderItem={(item, itemIndex) => (
          <Item size="sm" className="rounded-none border-b border-border last:border-0">
            <ItemMedia variant="icon">
              <span className="grid size-6 place-items-center rounded-full bg-muted text-xs font-medium">{itemIndex + 1}</span>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Item>
        )}
      />
      <div className="border-t border-border px-4 py-2">
        <Button size="sm" variant="ghost" onClick={() => setFailed(true)}>
          Simulate next save failure
        </Button>
      </div>
    </div>
  );
}

