"use client";
import { useState } from "react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { DateSelector, formatDateSelectorValue, type DateSelectorLabels, type DateSelectorValue } from "@/components/ui/date-picker/date-selector";
import { Button } from "@/components/ui/button/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
function DateSelectorExample({ presentation }: { presentation: "inline" | "popover" | "dialog" | "dropdown" }) {
  const locale = "en-US";
  const [value, setValue] = useState<DateSelectorValue>();
  const [draft, setDraft] = useState<DateSelectorValue>();
  const [open, setOpen] = useState(false);
  const labels: DateSelectorLabels = {
    period: "Period",
    filter: "Filter",
    from: "From",
    to: "To",
    choose: "Choose period",
    quick: "Quick date entry",
    hint: "Press Enter to apply a year, quarter, or date.",
    empty: "No date selected.",
    today: "Today",
    clear: "Clear",
    day: "Day",
    month: "Month",
    quarter: "Quarter",
    "half-year": "Half-year",
    year: "Year",
    is: "is",
    before: "before",
    after: "after",
    between: "between",
  };
  const selector = <DateSelector value={presentation === "inline" ? value : draft} onChange={presentation === "inline" ? setValue : setDraft} labels={labels} locale={locale} label={"Date"} inputHint={"Try: 2026, Q4 2026, 05/10/2026"} />;
  function changeOpen(next: boolean) { if (next) setDraft(value); setOpen(next); }
  const trigger = <Button variant="outline" className="max-w-full justify-start"><IconCalendarEvent />{value ? formatDateSelectorValue(value, locale, labels) : "Select a date"}</Button>;
  const editor = <div className="w-full min-w-0 space-y-4 p-3">{selector}<div className="flex justify-end gap-2 border-t pt-3"><Button variant="outline" onClick={() => { setDraft(value); setOpen(false); }}>{"Cancel"}</Button><Button onClick={() => { setValue(draft); setOpen(false); }}>{"Apply"}</Button></div></div>;
  if (presentation === "inline") return selector;
  if (presentation === "popover") return <Popover open={open} onOpenChange={changeOpen}><PopoverTrigger asChild>{trigger}</PopoverTrigger><PopoverContent align="start" className="motion-reduce:animate-none w-[min(28rem,calc(100vw-2rem))] p-0">{editor}</PopoverContent></Popover>;
  if (presentation === "dialog") return <Dialog open={open} onOpenChange={changeOpen}><DialogTrigger asChild>{trigger}</DialogTrigger><DialogContent className="max-w-lg motion-reduce:animate-none"><DialogHeader><DialogTitle>{"Select a date"}</DialogTitle><DialogDescription>{"Select a date or period, then apply your changes."}</DialogDescription></DialogHeader>{editor}</DialogContent></Dialog>;
  return <DropdownMenu open={open} onOpenChange={changeOpen}><DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger><DropdownMenuContent align="start" className="motion-reduce:animate-none w-[min(28rem,calc(100vw-2rem))] p-0">{editor}</DropdownMenuContent></DropdownMenu>;
}

export function DateSelectorCatalogExamples() {
  return (
    <>
      {(["inline", "popover", "dialog", "dropdown"] as const).map((presentation, index) => <ComponentPreview key={presentation} title={["Basic date selector", "Date selector with popover", "Date selector with dialog", "Date selector with dropdown menu"][index]} layout="anchor" previewClassName="min-h-28"><DateSelectorExample presentation={presentation} /></ComponentPreview>)}
    </>
  );
}
