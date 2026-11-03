"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { IconCheck, IconSelector, IconX } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { cn } from "@/utils/cn";

export type ComboboxOption = { value: string; label: string; disabled?: boolean; group?: string; icon?: ReactNode; description?: string };
export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  allowCustomValue?: boolean;
  clearable?: boolean;
  autoHighlight?: boolean;
  displayValue?: ReactNode;
  leadingIcon?: ReactNode;
  triggerIcon?: ReactNode;
  renderOption?: (option: ComboboxOption, selected: boolean) => ReactNode;
  className?: string;
  "aria-label": string;
};

export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled,
  isInvalid,
  allowCustomValue,
  clearable,
  autoHighlight,
  displayValue,
  leadingIcon,
  triggerIcon,
  renderOption,
  className,
  "aria-label": ariaLabel,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ""));
  const listId = useId();
  const currentValue = value === undefined ? internalValue : value;
  const values = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
  const selected = options.filter((option) => values.includes(option.value));
  const filtered = useMemo(() => {
    const search = query.toLocaleLowerCase();
    return options.filter((option) => `${option.label} ${option.description ?? ""}`.toLocaleLowerCase().includes(search));
  }, [options, query]);
  const groups = useMemo(() => {
    const map = new Map<string, ComboboxOption[]>();
    for (const option of filtered) {
      const group = option.group ?? "";
      map.set(group, [...(map.get(group) ?? []), option]);
    }
    return map;
  }, [filtered]);
  const emit = (next: string | string[]) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  const choose = (next: string) => {
    if (multiple) {
      emit(values.includes(next) ? values.filter((item) => item !== next) : [...values, next]);
      setQuery("");
      return;
    }
    emit(next);
    setOpen(false);
    setQuery("");
  };
  const clear = () => emit(multiple ? [] : "");
  const selectedLabel = selected.length > 1 ? `${selected.length} selected` : selected[0]?.label ?? (values[0] && !options.some((option) => option.value === values[0]) ? values[0] : "");
  const triggerValue = displayValue ?? selectedLabel;
  const optionNodes = <>{[...groups].map(([group, items]) => <div key={group || "ungrouped"} role="group" aria-label={group || undefined} className="not-first:border-t not-first:border-border">{group && <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{group}</div>}{items.map((option, index) => {
    const isSelected = values.includes(option.value);
    return <button key={option.value} type="button" role="option" aria-selected={isSelected} disabled={option.disabled} onClick={() => choose(option.value)} onKeyDown={(event) => {
      const buttons = [...(event.currentTarget.closest("[role=listbox]")?.querySelectorAll<HTMLButtonElement>("[role=option]:not(:disabled)") ?? [])];
      const currentIndex = buttons.indexOf(event.currentTarget);
      const nextIndex = event.key === "ArrowDown" ? currentIndex + 1 : event.key === "ArrowUp" ? currentIndex - 1 : -1;
      if (nextIndex >= 0) { event.preventDefault(); buttons[Math.max(0, Math.min(nextIndex, buttons.length - 1))]?.focus(); }
    }} className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent focus:bg-accent disabled:pointer-events-none disabled:opacity-50", autoHighlight && index === 0 && "bg-accent/50")}>
      {renderOption ? renderOption(option, isSelected) : <>{option.icon}{<span className="min-w-0 flex-1">{option.label}{option.description && <span className="block truncate text-xs text-muted-foreground">{option.description}</span>}</span>}<IconCheck aria-hidden="true" className={cn("size-4", isSelected ? "opacity-100" : "opacity-0")} /></>}
    </button>;
  })}</div>)}</>;

  return <div className={cn("flex w-56 items-center gap-1", className)}><Popover open={open} onOpenChange={(next) => { setOpen(next); if (!next) setQuery(""); }}><PopoverTrigger asChild><button type="button" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-invalid={isInvalid || undefined} disabled={disabled} role="combobox" className={cn("relative flex h-9 min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", isInvalid && "border-destructive focus-visible:ring-destructive")}><span className="flex min-w-0 items-center gap-2 truncate">{leadingIcon}<span className={cn("truncate", !triggerValue && "text-muted-foreground")}>{triggerValue || placeholder}</span></span>{triggerIcon ?? <IconSelector aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}</button></PopoverTrigger><PopoverContent align="start" className="w-56 p-1"><input autoFocus aria-label={`${ariaLabel} search`} placeholder={searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
    const first = event.currentTarget.parentElement?.querySelector<HTMLButtonElement>("[role=option]:not(:disabled)");
    if (event.key === "ArrowDown" && first) { event.preventDefault(); first.focus(); }
    if (event.key === "Enter" && allowCustomValue && query.trim() && filtered.length === 0) { event.preventDefault(); choose(query.trim()); }
  }} className="mb-1 h-8 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /><div id={listId} role="listbox" aria-label={ariaLabel} aria-multiselectable={multiple || undefined} className="max-h-60 overflow-auto">{filtered.length ? optionNodes : <div className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>}{!filtered.length && allowCustomValue && query.trim() && <button type="button" role="option" aria-selected={false} onClick={() => choose(query.trim())} className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent focus:bg-accent">Use “{query.trim()}”</button>}</div>{multiple && values.length > 0 && <button type="button" onClick={clear} className="mt-1 w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-accent">Clear selections</button>}</PopoverContent></Popover>{clearable && values.length > 0 && <button type="button" aria-label={`Clear ${ariaLabel}`} onClick={clear} disabled={disabled} className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"><IconX className="size-4" /></button>}</div>;
}
