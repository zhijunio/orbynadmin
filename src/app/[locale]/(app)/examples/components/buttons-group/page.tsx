"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/examples/ComponentPreview";
import { Showcase } from "@/components/application/examples/Showcase";
import { Button } from "@/components/base/buttons/button";
import {
  ButtonGroup,
  ButtonGroupItem,
} from "@/components/base/buttons/button-group";
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight, Download as IconDownload, LayoutGrid as IconLayoutGrid, List as IconList } from "lucide-react";

function ButtonGroupExamples() {
  const [period, setPeriod] = useState("Month");
  const [view, setView] = useState("Grid");
  return (
    <>
      <ComponentPreview title="Primary Button Group">
        <ButtonGroup aria-label="Primary actions">
          <ButtonGroupItem>Overview</ButtonGroupItem>
          <ButtonGroupItem>Activity</ButtonGroupItem>
          <ButtonGroupItem>Settings</ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Primary Group with Icons">
        <ButtonGroup aria-label="Primary navigation actions">
          <ButtonGroupItem><IconChevronLeft />Back</ButtonGroupItem>
          <ButtonGroupItem><IconLayoutGrid />Projects</ButtonGroupItem>
          <ButtonGroupItem><IconChevronRight />Continue</ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Secondary Button Group">
        <ButtonGroup aria-label="Secondary actions">
          <ButtonGroupItem variant="secondary">Draft</ButtonGroupItem>
          <ButtonGroupItem variant="secondary">Review</ButtonGroupItem>
          <ButtonGroupItem variant="secondary">Published</ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Secondary Group with Icons">
        <ButtonGroup aria-label="Secondary view actions">
          <ButtonGroupItem variant="outline"><IconList />List</ButtonGroupItem>
          <ButtonGroupItem variant="outline"><IconLayoutGrid />Grid</ButtonGroupItem>
          <ButtonGroupItem variant="outline"><IconDownload />Export</ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Pagination Controls">
        <div className="flex flex-wrap items-center gap-5">
          <ButtonGroup aria-label="Pagination">
            <ButtonGroupItem variant="outline">Previous</ButtonGroupItem>
            <Button variant="outline" aria-current="page" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">1</Button>
            <ButtonGroupItem variant="outline">2</ButtonGroupItem>
            <ButtonGroupItem variant="outline">3</ButtonGroupItem>
            <ButtonGroupItem variant="outline">Next</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup aria-label="Compact pagination">
            <ButtonGroupItem variant="outline" size="icon" aria-label="Previous"><IconChevronLeft /></ButtonGroupItem>
            <ButtonGroupItem variant="outline" className="px-4">Page 2 of 8</ButtonGroupItem>
            <ButtonGroupItem variant="outline" size="icon" aria-label="Next"><IconChevronRight /></ButtonGroupItem>
          </ButtonGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Segmented Selection">
        <ButtonGroup aria-label="Date range">
          {["Week", "Month", "Year"].map((item) => (
            <ButtonGroupItem
              key={item}
              variant="outline"
              selected={period === item}
              onClick={() => setPeriod(item)}
            >
              {item}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
        <p className="mt-3 text-xs text-muted-foreground">Selected range: {period}</p>
      </ComponentPreview>

      <ComponentPreview title="View Switcher">
        <div className="flex items-center gap-4">
          <ButtonGroup aria-label="View mode">
            <ButtonGroupItem
              variant="outline"
              size="icon"
              selected={view === "Grid"}
              onClick={() => setView("Grid")}
              aria-label="Grid view"
            >
              <IconLayoutGrid />
            </ButtonGroupItem>
            <ButtonGroupItem
              variant="outline"
              size="icon"
              selected={view === "List"}
              onClick={() => setView("List")}
              aria-label="List view"
            >
              <IconList />
            </ButtonGroupItem>
          </ButtonGroup>
          <span className="text-sm text-muted-foreground">{view} view</span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Action Group">
        <ButtonGroup aria-label="Export actions">
          <ButtonGroupItem variant="outline">Export</ButtonGroupItem>
          <ButtonGroupItem variant="outline" size="icon" aria-label="Download"><IconDownload /></ButtonGroupItem>
          <ButtonGroupItem variant="outline">Share</ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>
    </>
  );
}

export default function ButtonsGroupPage() {
  return <Showcase title="Buttons Group"><ButtonGroupExamples /></Showcase>;
}
