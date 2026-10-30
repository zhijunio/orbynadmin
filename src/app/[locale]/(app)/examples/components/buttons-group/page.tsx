"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";
import { Button } from "@/components/ui/button";
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight, Download as IconDownload, LayoutGrid as IconLayoutGrid, List as IconList } from "lucide-react";

const joined = "rounded-none first:rounded-l-lg last:rounded-r-lg [&:not(:first-child)]:-ml-px";

function ButtonGroupExamples() {
  const [period, setPeriod] = useState("Month");
  const [view, setView] = useState("Grid");
  return <>
    <ComponentPreview title="Primary Button Group"><div role="group" aria-label="Primary actions" className="flex"><Button className={joined}>Overview</Button><Button className={joined}>Activity</Button><Button className={joined}>Settings</Button></div></ComponentPreview>
    <ComponentPreview title="Primary Group with Icons"><div role="group" aria-label="Primary navigation actions" className="flex"><Button className={joined}><IconChevronLeft className="size-4" />Back</Button><Button className={joined}><IconLayoutGrid className="size-4" />Projects</Button><Button className={joined}><IconChevronRight className="size-4" />Continue</Button></div></ComponentPreview>
    <ComponentPreview title="Secondary Button Group"><div role="group" aria-label="Secondary actions" className="flex"><Button variant="secondary" className={joined}>Draft</Button><Button variant="secondary" className={joined}>Review</Button><Button variant="secondary" className={joined}>Published</Button></div></ComponentPreview>
    <ComponentPreview title="Secondary Group with Icons"><div role="group" aria-label="Secondary view actions" className="flex"><Button variant="outline" className={joined}><IconList className="size-4" />List</Button><Button variant="outline" className={joined}><IconLayoutGrid className="size-4" />Grid</Button><Button variant="outline" className={joined}><IconDownload className="size-4" />Export</Button></div></ComponentPreview>
    <ComponentPreview title="Pagination Controls"><div className="flex flex-wrap items-center gap-5"><div role="group" aria-label="Pagination" className="flex"><Button variant="outline" className={joined}>Previous</Button><Button variant="outline" className={`${joined} bg-primary/10 text-primary`}>1</Button><Button variant="outline" className={joined}>2</Button><Button variant="outline" className={joined}>3</Button><Button variant="outline" className={joined}>Next</Button></div><div role="group" aria-label="Compact pagination" className="flex"><Button variant="outline" size="icon" className={`${joined} size-9`} aria-label="Previous"><IconChevronLeft className="size-4" /></Button><Button variant="outline" className={`${joined} px-4`}>Page 2 of 8</Button><Button variant="outline" size="icon" className={`${joined} size-9`} aria-label="Next"><IconChevronRight className="size-4" /></Button></div></div></ComponentPreview>
    <ComponentPreview title="Segmented Selection"><div role="group" aria-label="Date range" className="inline-flex"><Button variant="outline" className={joined}>Week</Button>{["Month", "Year"].map((item) => <Button key={item} variant="outline" aria-pressed={period === item} onClick={() => setPeriod(item)} className={`${joined} ${period === item ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}`}>{item}</Button>)}</div><p className="mt-3 text-xs text-muted-foreground">Selected range: {period}</p></ComponentPreview>
    <ComponentPreview title="View Switcher"><div className="flex items-center gap-4"><div role="group" aria-label="View mode" className="flex"><Button variant="outline" size="icon" aria-pressed={view === "Grid"} onClick={() => setView("Grid")} className={`${joined} ${view === "Grid" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}`}><IconLayoutGrid className="size-4" /></Button><Button variant="outline" size="icon" aria-pressed={view === "List"} onClick={() => setView("List")} className={`${joined} ${view === "List" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}`}><IconList className="size-4" /></Button></div><span className="text-sm text-muted-foreground">{view} view</span></div></ComponentPreview>
    <ComponentPreview title="Action Group"><div role="group" aria-label="Export actions" className="flex"><Button variant="outline" className={joined}>Export</Button><Button variant="outline" size="icon" className={joined} aria-label="Download"><IconDownload className="size-4" /></Button><Button variant="outline" className={joined}>Share</Button></div></ComponentPreview>
  </>;
}

export default function ButtonsGroupPage() {
  return <Showcase title="Buttons Group"><ButtonGroupExamples /></Showcase>;
}
