"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import Link from "next/link";
import { useState } from "react";
import {
  IconBell,
  IconDownload,
  IconFilter,
  IconHeart,
  IconPencil,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Button } from "@/components/base/buttons/button";

function IconButtonSizes() {
  return <div className="flex flex-wrap items-end gap-3">
      <Button size="icon-xs" variant="outline" aria-label="Search, extra small"><IconSearch /></Button>
      <Button size="icon-sm" variant="outline" aria-label="Search, small"><IconSearch /></Button>
      <Button size="icon" variant="outline" aria-label="Search, default"><IconSearch /></Button>
    </div>;
}

function IconButtonVariants() {
  return <div className="flex flex-wrap items-center gap-2">
      <Button aria-label="Notifications"><IconBell /></Button>
      <Button variant="secondary" aria-label="Filter"><IconFilter /></Button>
      <Button variant="outline" aria-label="Edit"><IconPencil /></Button>
      <Button variant="ghost" aria-label="Settings"><IconSettings /></Button>
      <Button variant="destructive" aria-label="Delete"><IconTrash /></Button>
    </div>;
}

function IconButtonStates() {
  const [favorite, setFavorite] = useState(false);

  return <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={favorite ? "secondary" : "outline"}
        aria-label="Favorite"
        aria-pressed={favorite}
        onClick={() => setFavorite((current) => !current)}
      >
        <IconHeart className={favorite ? "fill-current" : undefined} />
      </Button>
      <Button variant="outline" aria-label="Download" disabled><IconDownload /></Button>
      <p className="text-sm text-muted-foreground" aria-live="polite">{favorite ? "Added to favorites" : "Not favorited"}</p>
    </div>;
}

function IconButtonLink() {
  return <Button asChild variant="outline" size="icon" aria-label="Open settings">
      <Link href="/account/settings"><IconSettings /></Link>
    </Button>;
}

export default function IconButtonPage() {
  return <ConsoleLayout>{<Showcase title="Icon Button">
      <p className="text-sm text-muted-foreground">Use an accessible name for every icon-only action. Use a pressed state for toggle actions.</p>
      <ComponentPreview title="Sizes"><IconButtonSizes /></ComponentPreview>
      <ComponentPreview title="Variants"><IconButtonVariants /></ComponentPreview>
      <ComponentPreview title="States"><IconButtonStates /></ComponentPreview>
      <ComponentPreview title="Navigation"><IconButtonLink /></ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
