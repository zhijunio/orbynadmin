"use client";

import { useId, useState } from "react";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";
import { IconCalendar, IconCode, IconFile, IconPhoto, IconSelector, IconX } from "@tabler/icons-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar/avatar";
import { StatusDot, type StatusDotColor } from "@/components/ui/badge/status-dot";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog/dialog";
import { people } from "@/app/components/avatar/avatar-data";
import { cn } from "@/utils/cn";


type Option = { value: string; label: string; description?: string; group?: string; dot?: StatusDotColor; badge?: boolean; avatar?: typeof people[number]; font?: string; offset?: string };

const exampleTitles = ["Basic", "Icons", "Grouped Labels", "Large List", "Small Trigger", "Plan Picker", "Disabled Item", "Field With Label", "Invalid", "Disabled", "In Dialog", "Multiple Selection", "Inline With Input", "With Button", "Item Aligned", "Access Levels", "Status Bullets", "User Avatars", "Status Badges", "Left Indicator", "Clear Button", "Custom Chevrons", "Overlapping Dots", "Grouped Separators", "Country Flags", "Status Filter", "Option Descriptions", "Timezone Offsets", "Team Assignment", "Priority Badges", "Font Preview", "Category Icons", "Size Scale"];

function CountryFlag({ code, label }: { code: string; label: string }) {
  const Flag = flags[code.toUpperCase() as Country];
  return Flag ? <span className="w-4 overflow-hidden rounded-xs"><Flag title={label} /></span> : null;
}

export function SelectExample({ example }: { example: number }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState("");
  const [search, setSearch] = useState("");
  let options: Option[] = [{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }, { value: "monthly", label: "Monthly" }];
  if (example === 4) options = Array.from({length:100},(_,index)=>({value:String(index+1),label:`Item ${index+1}`}));
  if ([3,24].includes(example)) options = [{ value: "engineering", label: "Engineering", group: "Product teams" }, { value: "design", label: "Design", group: "Product teams" }, { value: "operations", label: "Operations", group: "Business teams" }, { value: "support", label: "Support", group: "Business teams" }];
  if ([6,27].includes(example)) options = [{ value: "starter", label: "Starter", description: "For individuals getting started" }, { value: "businessPlan", label: "Business", description: "For growing teams" }, { value: "enterprise", label: "Enterprise", description: "Advanced features for large organizations" }];
  if (example === 16) options = [{ value: "full", label: "Full access", description: "Manage access and content" }, { value: "write", label: "Read and write", description: "Edit and publish content" }, { value: "read", label: "Read only", description: "View content" }, { value: "none", label: "No access", description: "Cannot view or edit content" }];
  if ([17,19,23,26].includes(example)) options = [{ value: "active", label: "Active", dot: "success", badge: example === 19 }, { value: "pending", label: "Pending", dot: "warning", badge: example === 19 }, { value: "inactive", label: "Inactive", dot: "error", badge: example === 19 }, { value: "archived", label: "Archived", dot: "neutral", badge: example === 19 }];
  if ([18,29].includes(example)) options = people.map(person=>({value:person.id,label:person.name,avatar:person,description:example===29 ? "Team member" : undefined}));
  if (example === 25) options = [{ value: "us", label: "United States" }, { value: "gb", label: "United Kingdom" }, { value: "de", label: "Germany" }, { value: "fr", label: "France" }, { value: "jp", label: "Japan" }, { value: "au", label: "Australia" }];
  if (example === 28) options = [{value:"america",label:"New York",offset:"UTC−5",group:"Americas"},{value:"europe",label:"London",offset:"UTC+0",group:"Europe"},{value:"asia",label:"Tokyo",offset:"UTC+9",group:"Asia"}];
  if (example === 30) options = [{ value: "urgent", label: "Urgent", badge: true, dot: "error" }, { value: "high", label: "High", badge: true, dot: "warning" }, { value: "medium", label: "Medium", badge: true, dot: "info" }, { value: "low", label: "Low", badge: true, dot: "neutral" }];
  if (example === 31) options = [{ value: "sans", label: "Sans serif", font: "font-sans" }, { value: "mono", label: "Monospace", font: "font-mono" }, { value: "serif", label: "Serif", font: "font-serif" }];
  if (example === 32) options = [{ value: "documents", label: "Documents" }, { value: "images", label: "Images" }, { value: "code", label: "Code" }];
  if (example === 33) options = [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }];
  const grouped = Array.from(new Set(options.map(option=>option.group)));
  const select = <Select value={value} onValueChange={setValue} disabled={example===10}>
    <SelectTrigger id={id} aria-label={exampleTitles[example - 1]} aria-invalid={example===9 || undefined} aria-describedby={[8,9].includes(example) ? `${id}-hint` : undefined} size={[5,33].includes(example) ? "sm" : "default"} icon={example===22 ? <IconSelector className="size-4 text-muted-foreground" /> : undefined} className={cn("w-full min-w-0",example!==6 && "[&_[data-description]]:hidden")}><SelectValue placeholder={"Select an option"} /></SelectTrigger>
    <SelectContent position={[7,20].includes(example) ? "popper" : "item-aligned"} className="max-h-72 max-w-[calc(100vw-2rem)] motion-reduce:animate-none">
      {grouped.map((group,index)=><SelectGroup key={group ?? "default"}>{index>0 && <SelectSeparator />}{group && <SelectLabel>{group}</SelectLabel>}{options.filter(option=>option.group===group).map((option,optionIndex)=><SelectItem key={option.value} value={option.value} textValue={option.label} disabled={example===7 && optionIndex===2} indicatorPosition={example===20 ? "left" : "right"} className={cn(option.font,example===6 && "py-2")}>
        {option.avatar && <Avatar size="xs"><AvatarImage src={option.avatar.avatar} alt="" /><AvatarFallback>{option.label[0]}</AvatarFallback></Avatar>}
        {example===25 && <CountryFlag code={option.value} label={option.label} />}
        {example===2 && <IconCalendar aria-hidden />}
        {example===32 && (option.value==="images" ? <IconPhoto aria-hidden /> : option.value==="code" ? <IconCode aria-hidden /> : <IconFile aria-hidden />)}
        {option.dot && !option.badge && <StatusDot color={option.dot} />}
        <span className={cn(option.description && "flex flex-col",option.badge && "inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 text-xs")}>
          {option.badge && <StatusDot color={option.dot} />}<span>{option.label}</span>{option.description && <small data-description className="text-xs text-muted-foreground">{option.description}</small>}
        </span>{option.offset && <span className="ml-auto pl-4 text-xs text-muted-foreground">{option.offset}</span>}
      </SelectItem>)}</SelectGroup>)}
    </SelectContent>
  </Select>;
  if (example===11) return <Dialog><DialogTrigger asChild><Button variant="outline">{"Open dialog"}</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>{"Choose an option"}</DialogTitle><DialogDescription>{"Choose the value shown to workspace members."}</DialogDescription></DialogHeader>{select}</DialogContent></Dialog>;
  return <div className="w-full max-w-xs space-y-2">{[8,9].includes(example) && <Label htmlFor={id}>{"Display preference"}</Label>}<div className="flex min-w-0 items-center gap-2">{example===13 && <Input aria-label={"Search"} placeholder={"Search"} value={search} onChange={event=>setSearch(event.target.value)} className="min-w-0" />}{select}{example===14 && <Button onClick={()=>setFeedback(value ? options.find(option=>option.value===value)?.label ?? "" : "Please choose an option.")}>{"Apply"}</Button>}{[21,22].includes(example) && value && <Button variant="ghost" size="icon-sm" aria-label={"Clear selection"} onClick={()=>setValue("")}><IconX aria-hidden /></Button>}</div>{[8,9].includes(example) && <p id={`${id}-hint`} className={cn("text-xs text-muted-foreground",example===9 && "text-destructive")}>{(example===9 ? "Please choose an option." : "Choose the value shown to workspace members.")}</p>}{example===14 && <p role="status" className="text-xs text-muted-foreground">{feedback}</p>}</div>;
}
