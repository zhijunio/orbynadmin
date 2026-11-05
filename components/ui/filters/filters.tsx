"use client";

import { useState, type ReactNode } from "react";
import { IconFilter, IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { NativeSelect } from "@/components/ui/native-select/native-select";
import { Badge } from "@/components/ui/badge/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { cn } from "@/utils/cn";
import type { FilterField, FilterOperator, FilterQuery, FilterRule, FilterValue } from "./filters-query";

export type FiltersLabels = {
  add: string; addGroup: string; remove: string; field: string; operator: string; value: string;
  and: string; or: string; contains: string; is: string; "is-not": string; gt: string; lt: string;
  between: string; in: string; apply: string; cancel: string; true: string; false: string; advanced: string; invalid: string;
};
export type FilterEditorProps = { field: FilterField; value: FilterValue; onChange: (value: FilterValue) => void; labels: FiltersLabels };
export type FiltersProps = {
  fields: readonly FilterField[]; value: FilterQuery; onChange: (query: FilterQuery) => void; labels: FiltersLabels;
  disabled?: boolean; nested?: boolean; variant?: "bar" | "inline" | "popover"; size?: "sm" | "default" | "lg";
  renderEditor?: (props: FilterEditorProps) => ReactNode; className?: string;
};
function operatorsFor(field: FilterField): FilterOperator[] {
  return field.type === "number" ? ["is", "is-not", "gt", "lt", "between"] : field.type === "text" ? ["contains", "is", "is-not"] : field.type === "date-range" ? ["between"] : field.type === "multi-select" ? ["in"] : ["is", "is-not"];
}
function initialRule(field: FilterField): FilterRule {
  return { id: crypto.randomUUID(), field: field.id, operator: operatorsFor(field)[0], value: field.type === "multi-select" || field.type === "date-range" ? [] : field.type === "select" ? field.options[0]?.value ?? "" : field.type === "boolean" ? "true" : "" };
}
function DefaultEditor({ field, value, onChange, labels }: FilterEditorProps) {
  const scalar = typeof value === "string" ? value : value[0] ?? "";
  if (field.type === "multi-select") return <div className="space-y-2">{field.options.map((option) => <label key={option.value} className="flex items-center gap-2 text-sm"><Checkbox checked={typeof value !== "string" && value.includes(option.value)} onCheckedChange={(checked) => { const current = typeof value === "string" ? [] : value; onChange(checked ? [...current, option.value] : current.filter((item) => item !== option.value)); }} />{option.label}</label>)}</div>;
  if (field.type === "select") return <NativeSelect className="w-full" aria-label={labels.value} value={scalar} onChange={(event) => onChange(event.target.value)}>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</NativeSelect>;
  if (field.type === "boolean") return <NativeSelect aria-label={labels.value} value={scalar} onChange={(event) => onChange(event.target.value)}><option value="true">{labels.true}</option><option value="false">{labels.false}</option></NativeSelect>;
  return <Input autoFocus aria-label={labels.value} type={field.type === "date" || field.type === "date-range" ? "date" : field.type === "number" ? "number" : "text"} value={scalar} onChange={(event) => onChange(event.target.value)} />;
}
function RuleEditor({ rule, fields, onApply, onCancel, labels, renderEditor }: { rule: FilterRule; fields: readonly FilterField[]; onApply: (rule: FilterRule) => void; onCancel: () => void; labels: FiltersLabels; renderEditor?: FiltersProps["renderEditor"] }) {
  const [draft, setDraft] = useState(rule);
  const field = fields.find((item) => item.id === draft.field) ?? fields[0];
  if (!field) return null;
  const values = typeof draft.value === "string" ? [draft.value] : draft.value;
  const range = draft.operator === "between";
  const complete = values.length >= (range ? 2 : 1) && values.every((value) => value.trim() !== "");
  const numeric = field.type === "number";
  const ordered = !range || (numeric ? Number(values[0]) <= Number(values[1]) : values[0] <= values[1]);
  const valid = complete && ordered && (!numeric || values.every((value) => Number.isFinite(Number(value))));
  const editorProps: FilterEditorProps = { field, value: draft.value, labels, onChange: (value) => setDraft((current) => ({ ...current, value })) };
  return <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (valid) onApply(draft); }}>
    <NativeSelect aria-label={labels.field} value={draft.field} onChange={(event) => { const next = fields.find((item) => item.id === event.target.value); if (next) setDraft({ ...initialRule(next), id: draft.id }); }}>{fields.map((item) => <option key={item.id} value={item.id}>{[...(item.path ?? []), item.label].join(" / ")}</option>)}</NativeSelect>
    <NativeSelect aria-label={labels.operator} value={draft.operator} onChange={(event) => { const operator = event.target.value as FilterOperator; setDraft({ ...draft, operator, value: operator === "between" ? ["", ""] : operator === "in" ? [] : "" }); }}>{operatorsFor(field).map((operator) => <option key={operator} value={operator}>{labels[operator]}</option>)}</NativeSelect>
    {draft.operator === "between" ? <div className="grid grid-cols-2 gap-2">{[0, 1].map((index) => <Input key={index} type={field.type === "date-range" || field.type === "date" ? "date" : "number"} aria-label={`${labels.value} ${index + 1}`} value={typeof draft.value === "string" ? "" : draft.value[index] ?? ""} onChange={(event) => { const values = typeof draft.value === "string" ? ["", ""] : [...draft.value]; values[index] = event.target.value; setDraft({ ...draft, value: values }); }} />)}</div> : renderEditor?.(editorProps) ?? <DefaultEditor {...editorProps} />}
    {complete && !ordered && <p role="alert" className="text-xs text-destructive">{labels.invalid}</p>}<div className="flex justify-end gap-2 border-t pt-3"><Button variant="outline" size="sm" onClick={onCancel}>{labels.cancel}</Button><Button type="submit" size="sm" disabled={!valid}>{labels.apply}</Button></div>
  </form>;
}
function FilterChip({ rule, fields, labels, onChange, onRemove, renderEditor, size }: { rule: FilterRule; fields: readonly FilterField[]; labels: FiltersLabels; onChange: (rule: FilterRule) => void; onRemove: () => void; renderEditor?: FiltersProps["renderEditor"]; size: FiltersProps["size"] }) {
  const [open, setOpen] = useState(false);
  const field = fields.find((item) => item.id === rule.field);
  const options = field && "options" in field ? field.options : [];
  const values = typeof rule.value === "string" ? [rule.value] : rule.value;
  const valueText = values.map((value) => options.find((item) => item.value === value)?.label ?? (value === "true" ? labels.true : value === "false" ? labels.false : value)).filter(Boolean).join(rule.operator === "between" ? " – " : ", ");
  const avatar = options.find((option) => option.value === values[0])?.avatar;
  return <div className="inline-flex max-w-full items-center rounded-md border border-border bg-card">
    <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button size={size ?? "default"} variant="ghost" className="max-w-full gap-2 rounded-r-none"><span className="truncate text-muted-foreground">{field?.label ?? rule.field}</span><span className="text-xs text-muted-foreground">{labels[rule.operator]}</span>{avatar && <Avatar size="sm"><AvatarImage src={avatar} alt="" /><AvatarFallback>{valueText[0]}</AvatarFallback></Avatar>}<Badge variant={values[0] === "overdue" || values[0] === "high" ? "destructive" : "secondary"} className="max-w-48 truncate">{valueText || labels.value}</Badge></Button></PopoverTrigger><PopoverContent className="motion-reduce:animate-none w-[min(24rem,calc(100vw-2rem))]" align="start"><RuleEditor key={open ? "open" : "closed"} rule={rule} fields={fields} labels={labels} renderEditor={renderEditor} onApply={(next) => { onChange(next); setOpen(false); }} onCancel={() => setOpen(false)} /></PopoverContent></Popover>
    <Button variant="ghost" size="icon-sm" aria-label={`${labels.remove} ${field?.label ?? rule.field}`} onClick={onRemove}><IconX /></Button>
  </div>;
}
export function Filters({ fields, value, onChange, labels, disabled, nested = false, variant = "bar", size = "default", renderEditor, className }: FiltersProps) {
  const [adding, setAdding] = useState(false);
  const [newRule, setNewRule] = useState<FilterRule | null>(null);
  const update = (id: string, rule: FilterRule | FilterQuery) => onChange({ ...value, rules: value.rules.map((item) => item.id === id ? rule : item) });
  const body = <fieldset disabled={disabled} data-slot="filters" className={cn("min-w-0 space-y-3 disabled:opacity-50", variant === "inline" && "rounded-lg border p-3", className)}><legend className="sr-only">{labels.advanced}</legend><div className="flex min-w-0 flex-wrap items-center gap-2">
    {(nested || value.rules.length > 1) && <NativeSelect size="sm" aria-label={labels.operator} value={value.combinator} onChange={(event) => onChange({ ...value, combinator: event.target.value as "and" | "or" })}><option value="and">{labels.and}</option><option value="or">{labels.or}</option></NativeSelect>}
    {value.rules.map((rule) => "rules" in rule ? <div key={rule.id} className="flex w-full min-w-0 items-start gap-2"><Filters fields={fields} value={rule} onChange={(query) => update(rule.id, query)} labels={labels} nested variant="inline" renderEditor={renderEditor} size={size} className="flex-1" /><Button variant="ghost" size="icon" aria-label={labels.remove} onClick={() => onChange({ ...value, rules: value.rules.filter((item) => item.id !== rule.id) })}><IconX /></Button></div> : <FilterChip key={rule.id} rule={rule} fields={fields} labels={labels} onChange={(next) => update(rule.id, next)} onRemove={() => onChange({ ...value, rules: value.rules.filter((item) => item.id !== rule.id) })} renderEditor={renderEditor} size={size} />)}
    <Popover open={adding} onOpenChange={setAdding}><PopoverTrigger asChild><Button variant="outline" size={size ?? "default"} disabled={!fields.length} onClick={() => { if (fields[0]) setNewRule(initialRule(fields[0])); }}><IconPlus />{labels.add}</Button></PopoverTrigger><PopoverContent className="motion-reduce:animate-none w-[min(24rem,calc(100vw-2rem))]" align="start">{newRule && <RuleEditor key={newRule.id} rule={newRule} fields={fields} labels={labels} renderEditor={renderEditor} onApply={(rule) => { onChange({ ...value, rules: [...value.rules, rule] }); setAdding(false); }} onCancel={() => setAdding(false)} />}</PopoverContent></Popover>
    {nested && <Button variant="ghost" size="sm" onClick={() => onChange({ ...value, rules: [...value.rules, { id: crypto.randomUUID(), combinator: "or", rules: [] }] })}><IconPlus />{labels.addGroup}</Button>}
  </div></fieldset>;
  return variant === "popover" ? <Popover><PopoverTrigger asChild><Button variant="outline" disabled={disabled}><IconFilter />{labels.advanced}<Badge variant="secondary">{value.rules.length}</Badge></Button></PopoverTrigger><PopoverContent className="motion-reduce:animate-none w-[min(40rem,calc(100vw-2rem))]" align="start">{body}</PopoverContent></Popover> : body;
}
