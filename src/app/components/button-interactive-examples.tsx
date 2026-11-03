"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDownload, IconHeart, IconLayoutGrid, IconList, IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/buttons/button-group";
import { LinkButton } from "@/components/ui/buttons/link-button";

export function ButtonGroupIconExamples() {
  return <ButtonGroup aria-label="Secondary view actions">
    <ButtonGroupItem variant="outline"><IconList />List</ButtonGroupItem>
    <ButtonGroupItem variant="outline"><IconLayoutGrid />Grid</ButtonGroupItem>
    <ButtonGroupItem variant="outline"><IconDownload />Export</ButtonGroupItem>
  </ButtonGroup>;
}

export function SegmentedSelection() {
  const [period, setPeriod] = useState("Month");
  return <div className="flex flex-wrap items-center gap-3">
    <ButtonGroup aria-label="Date range">
      {["Week", "Month", "Year"].map((item) => <ButtonGroupItem key={item} variant="outline" selected={period === item} onClick={() => setPeriod(item)}>{item}</ButtonGroupItem>)}
    </ButtonGroup>
    <span className="text-sm text-muted-foreground">Selected range: {period}</span>
  </div>;
}

export function ViewSwitcher() {
  const [view, setView] = useState("Grid");
  return <div className="flex flex-wrap items-center gap-3">
      <ButtonGroup aria-label="View mode">
        <ButtonGroupItem variant="outline" size="icon" selected={view === "Grid"} onClick={() => setView("Grid")} aria-label="Grid view"><IconLayoutGrid /></ButtonGroupItem>
        <ButtonGroupItem variant="outline" size="icon" selected={view === "List"} onClick={() => setView("List")} aria-label="List view"><IconList /></ButtonGroupItem>
      </ButtonGroup>
      <span className="text-sm text-muted-foreground">{view} view</span>
  </div>;
}

export function ActionGroup() {
  return <ButtonGroup aria-label="Export actions">
      <ButtonGroupItem variant="outline">Export</ButtonGroupItem>
      <ButtonGroupItem variant="outline" size="icon" aria-label="Download"><IconDownload /></ButtonGroupItem>
      <ButtonGroupItem variant="outline">Share</ButtonGroupItem>
  </ButtonGroup>;
}

export function IconButtonStates() {
  const [favorite, setFavorite] = useState(false);

  return <div className="flex flex-wrap items-center gap-3">
    <Button variant="outline" aria-label="Favorite" aria-pressed={favorite} onClick={() => setFavorite((current) => !current)}>
      <IconHeart className={favorite ? "fill-current" : undefined} />
    </Button>
    <span className="text-sm text-muted-foreground" aria-live="polite">{favorite ? "Added to favorites" : "Not favorited"}</span>
    <Button asChild variant="outline" size="icon" aria-label="Open settings"><Link href="/account/profile"><IconSettings /></Link></Button>
    <Button variant="outline" aria-label="Download unavailable" disabled><IconDownload /></Button>
  </div>;
}

export function LinkButtonActions() {
  return <div className="flex flex-wrap items-center gap-5">
    <LinkButton size="sm" leadingIcon={<IconDownload />} onClick={() => undefined}>Download report</LinkButton>
    <LinkButton variant="secondary" disabled onClick={() => undefined}>Unavailable action</LinkButton>
    <LinkButton onClick={() => undefined}>Open details</LinkButton>
  </div>;
}
