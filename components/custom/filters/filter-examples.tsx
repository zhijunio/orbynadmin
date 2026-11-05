"use client";

import { useState } from "react";
import { Filters, type FiltersLabels, type FilterEditorProps } from "@/components/ui/filters/filters";
import { matchesFilterQuery, type FilterField, type FilterQuery } from "@/components/ui/filters/filters-query";
import { invoices } from "@/components/custom/table/invoices";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table/table";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { InputOtp } from "@/components/ui/input-otp/input-otp";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Slider } from "@/components/ui/slider/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Switch } from "@/components/ui/switch/switch";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { demoAvatarUrl } from "@/utils/demo-avatar";


function CustomValueEditor({ example, ...props }: FilterEditorProps & { example: number }) {
  const value = typeof props.value === "string" ? props.value : "";
  if (example === 6 && props.field.type === "number") return <div className="space-y-2"><Slider min={0} max={2000} step={50} value={Number(value) || 0} onValueChange={(next) => props.onChange(String(next))} label={props.field.label} /><output className="text-xs tabular-nums">{value || 0}</output></div>;
  if (example === 8) {
    if (props.field.type === "boolean") return <label className="flex items-center justify-between gap-3 text-sm">{props.field.label}<Switch checked={value === "true"} onCheckedChange={(checked) => props.onChange(String(checked))} /></label>;
    if (props.field.type === "select") return <RadioGroup value={value} onValueChange={props.onChange} aria-label={props.field.label}>{props.field.options.map((option) => <label key={option.value} className="flex items-center gap-2 text-sm"><RadioGroupItem value={option.value} />{option.label}</label>)}</RadioGroup>;
    if (props.field.type === "text") return <ToggleGroup type="single" value={value} onValueChange={props.onChange} aria-label={props.field.label}>{["design", "hosting", "support"].map((key) => <ToggleGroupItem key={key} value={key === "design" ? "Design audit" : key === "hosting" ? "Cloud hosting" : "Support plan"}>{key === "design" ? "Design audit" : key === "hosting" ? "Cloud hosting" : "Support plan"}</ToggleGroupItem>)}</ToggleGroup>;
  }
  if (example === 9 && props.field.id === "code") return <InputOtp length={4} value={value} onChange={props.onChange} digitAriaLabel={(digit, total) => `Code digit ${digit} of ${total}`} />;
  if (example === 9 && props.field.id === "notes") return <Textarea value={value} onChange={(event) => props.onChange(event.target.value)} aria-label={props.field.label} />;
  if (example === 9 && props.field.id === "email") return <Input type="email" value={value} onChange={(event) => props.onChange(event.target.value)} aria-label={props.field.label} />;
  return null;
}
export function FilterExample({ example }: { example: number }) {
  const [size, setSize] = useState<"sm" | "default" | "lg">("default");
  const [page, setPage] = useState(0);
  const [restored, setRestored] = useState(false);
  const initial: FilterQuery = { id: "root", combinator: "and", rules: example === 5 ? [{ id: "date", field: "dateRange", operator: "between", value: ["2026-11-01", "2026-11-15"] }] : example === 6 ? [{ id: "amount", field: "amount", operator: "gt", value: "500" }] : example === 4 ? [{ id: "owner", field: "owner", operator: "is", value: "alex" }] : example === 9 ? [{ id: "email", field: "email", operator: "contains", value: "alex@example.test" }] : [{ id: "status", field: "status", operator: "is", value: "paid" }, ...([1, 3].includes(example) ? [{ id: "priority", field: "priority", operator: "is" as const, value: "high" }] : []), ...(example === 1 ? [{ id: "owner", field: "owner", operator: "is" as const, value: "alex" }, { id: "amount", field: "amount", operator: "gt" as const, value: "1000" }] : []), ...(example === 10 || example === 11 ? [{ id: "group", combinator: "or" as const, rules: [{ id: "amount", field: "amount", operator: "gt" as const, value: "500" }] }] : [])] };
  const [query, setQuery] = useState<FilterQuery>(initial);
  const options = ["paid", "pending", "overdue"].map((value) => ({ value, label: value === "paid" ? "Paid" : value === "pending" ? "Pending" : "Overdue" }));
  const fields: FilterField[] = [
    { id: "name", label: "Name", type: "text", path: example === 2 ? ["Workspace", "Project"] : undefined },
    { id: "status", label: "Status", type: "select", options, path: example === 2 ? ["Workspace", "Billing"] : undefined },
    { id: "amount", label: "Amount", type: "number" },
    { id: "priority", label: "Priority", type: "select", options: [{ value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }] },
    { id: "owner", label: "Owner", type: "select", options: [{ value: "alex", label: "Alex Morgan", avatar: demoAvatarUrl("Alex Morgan") }, { value: "sam", label: "Sam Chen", avatar: demoAvatarUrl("Sam Chen") }] },
    { id: "date", label: "Created date", type: "date" }, { id: "dateRange", label: "Date range", type: "date-range" },
    { id: "verified", label: "Verified", type: "boolean" }, { id: "statuses", label: "Statuses", type: "multi-select", options },
    ...(example === 9 ? [{ id: "email", label: "Email", type: "text" as const }, { id: "code", label: "Code", type: "text" as const }, { id: "notes", label: "Notes", type: "text" as const }] : []),
  ];
  const labels: FiltersLabels = {
    add: "Add filter",
    addGroup: "Add group",
    remove: "Remove condition",
    field: "Field",
    operator: "Condition",
    value: "Value",
    and: "Match all conditions",
    or: "Match any condition",
    contains: "contains",
    is: "is",
    "is-not": "is not",
    gt: "greater than",
    lt: "less than",
    between: "between",
    in: "is any of",
    apply: "Apply",
    cancel: "Cancel",
    true: "Yes",
    false: "No",
    advanced: "Advanced filters",
    invalid: "The range end must not precede its start.",
  };
  const rows = invoices.filter((row, index) => matchesFilterQuery({ ...row, name: row.name, priority: index % 2 ? "medium" : "high", owner: index % 2 ? "sam" : "alex", date: "2026-11-03", dateRange: "2026-11-03", verified: index % 2 === 0, statuses: row.status, email: "alex@example.test" }, query));
  return <div className="w-full min-w-0 space-y-4">
    {example === 4 && <Button size="sm" variant="outline" onClick={() => { setQuery(initial); setRestored(true); setPage(0); }}>{"Restore saved view"}</Button>}
    {example === 12 && <NativeSelect aria-label={"Filter size"} value={size} onChange={(event) => setSize(event.target.value as typeof size)}>{[["sm", "Small"], ["default", "Default"], ["lg", "Large"]].map(([key, label]) => <option key={key} value={key}>{label}</option>)}</NativeSelect>}
    <Filters fields={fields} value={query} onChange={(next) => { setQuery(next); setPage(0); setRestored(false); }} labels={labels} variant={example === 10 ? "popover" : example === 11 ? "inline" : "bar"} nested={[1, 10, 11].includes(example)} size={size} renderEditor={[6, 8, 9].includes(example) ? (props) => (example === 6 && props.field.type === "number" || example === 8 && ["boolean", "select", "text"].includes(props.field.type) || example === 9 && ["email", "code", "notes"].includes(props.field.id)) ? <CustomValueEditor {...props} example={example} /> : null : undefined} />
    <output aria-live="polite" className="block text-xs text-muted-foreground">{`${rows.length} matching records`}{restored ? ` · ${"Saved view restored"}` : ""}</output>
    {example === 7 && <Table><TableCaption className="sr-only">{"Filtering a table"}</TableCaption><TableHeader><TableRow><TableHead>{"Invoice"}</TableHead><TableHead>{"Name"}</TableHead><TableHead>{"Status"}</TableHead><TableHead>{"Amount"}</TableHead></TableRow></TableHeader><TableBody>{rows.length ? rows.map((row) => <TableRow key={row.id}><TableCell>{row.id}</TableCell><TableCell>{row.name}</TableCell><TableCell>{row.status === "paid" ? "Paid" : row.status === "pending" ? "Pending" : "Overdue"}</TableCell><TableCell>{row.amount}</TableCell></TableRow>) : <TableRow><TableCell colSpan={4}>{"No matching records."}</TableCell></TableRow>}</TableBody></Table>}
    {example === 4 && <><ul className="divide-y rounded-lg border px-3">{rows.slice(page * 3, page * 3 + 3).map((row) => <li key={row.id} className="flex items-center gap-3 py-3 text-sm"><Avatar size="sm"><AvatarImage src={demoAvatarUrl("Alex Morgan")} alt="" /><AvatarFallback>AM</AvatarFallback></Avatar><span>{row.id} · {row.name}</span></li>)}</ul><div className="flex gap-2"><Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((value) => value - 1)}>{"Previous"}</Button><Button size="sm" variant="outline" disabled={(page + 1) * 3 >= rows.length} onClick={() => setPage((value) => value + 1)}>{"Next"}</Button></div></>}
  </div>;
}
