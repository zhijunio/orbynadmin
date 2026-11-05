"use client";

import { useId, useMemo, useState } from "react";
import { IconChevronDown, IconLoader2, IconX } from "@tabler/icons-react";
import { Input } from "@/components/ui/input/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover/popover";
import { cn } from "@/utils/cn";

export type AutocompleteItem = {
  value: string;
  label?: string;
  group?: string;
  description?: string;
  disabled?: boolean;
};

export type AutocompleteProps = {
  items: AutocompleteItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (item: AutocompleteItem) => void;
  placeholder?: string;
  "aria-label": string;
  disabled?: boolean;
  invalid?: boolean;
  autoHighlight?: boolean;
  clearable?: boolean;
  showTrigger?: boolean;
  size?: "sm" | "default" | "lg";
  loading?: boolean;
  error?: string;
  emptyText?: string;
  className?: string;
  id?: string;
};

export function Autocomplete({
  items,
  value,
  defaultValue = "",
  onValueChange,
  onSelect,
  placeholder = "Search options...",
  "aria-label": ariaLabel,
  disabled = false,
  invalid = false,
  autoHighlight = false,
  clearable = false,
  showTrigger = false,
  size = "default",
  loading = false,
  error,
  emptyText = "No results found.",
  className,
  id: providedId,
}: AutocompleteProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const currentValue = value ?? uncontrolledValue;
  const filteredItems = useMemo(() => {
    const query = currentValue.trim().toLocaleLowerCase();
    return items.filter((item) => `${item.label ?? item.value} ${item.group ?? ""} ${item.description ?? ""}`.toLocaleLowerCase().includes(query));
  }, [currentValue, items]);
  const groups = useMemo(() => {
    const result = new Map<string, AutocompleteItem[]>();
    for (const item of filteredItems) {
      const group = item.group ?? "";
      result.set(group, [...(result.get(group) ?? []), item]);
    }
    return result;
  }, [filteredItems]);

  function updateValue(next: string) {
    if (disabled) return;
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
    setActiveIndex(0);
    setMoved(false);
  }

  function choose(item: AutocompleteItem) {
    if (disabled || item.disabled) return;
    updateValue(item.value);
    onSelect?.(item);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const available = filteredItems.filter((item) => !item.disabled);
    if (event.key === "ArrowDown" && available.length) {
      event.preventDefault();
      setOpen(true);
      setMoved(true);
      setActiveIndex((index) => (index + 1) % available.length);
    } else if (event.key === "ArrowUp" && available.length) {
      event.preventDefault();
      setOpen(true);
      setMoved(true);
      setActiveIndex((index) => (index - 1 + available.length) % available.length);
    } else if (event.key === "Enter" && open && available.length) {
      event.preventDefault();
      choose(available[Math.min(activeIndex, available.length - 1)]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  let optionIndex = -1;
  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverAnchor asChild><div className={cn("relative w-full", className)}>
        <Input
          id={id}
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          aria-invalid={invalid || Boolean(error) || undefined}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          value={currentValue}
          data-size={size}
          className={cn("pr-16", size === "sm" && "h-7 text-xs", size === "lg" && "h-9", (clearable || showTrigger) && "pr-16")}
          onFocus={() => { if (currentValue || showTrigger) setOpen(true); }}
          onChange={(event) => { updateValue(event.currentTarget.value); setOpen(true); }}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-1 flex items-center gap-0.5">
          {clearable && currentValue && <button type="button" aria-label="Clear input" disabled={disabled} className="rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50" onClick={() => updateValue("")}><IconX className="size-4" /></button>}
          {showTrigger && <button type="button" aria-label="Show suggestions" aria-expanded={open} disabled={disabled} className="rounded p-1 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50" onClick={() => setOpen((state) => !state)}><IconChevronDown className="size-4" /></button>}
        </div>
        <PopoverContent id={`${id}-listbox`} role="listbox" aria-label={`${ariaLabel} suggestions`} align="start" className="max-h-64 w-(--radix-popover-trigger-width) overflow-auto p-1" onOpenAutoFocus={(event) => event.preventDefault()}>
          {loading ? <div role="status" className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground"><IconLoader2 className="size-4 motion-safe:animate-spin" />Searching…</div> : error ? <p role="alert" className="px-3 py-3 text-sm text-destructive">{error}</p> : filteredItems.length === 0 ? <p className="px-3 py-3 text-sm text-muted-foreground">{emptyText}</p> : [...groups].map(([group, groupItems]) => <div key={group || "ungrouped"} role="group" aria-label={group || undefined}>{group && <div className="sticky top-0 bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground">{group}</div>}{groupItems.map((item) => { optionIndex += 1; const index = optionIndex; const highlighted = index === (autoHighlight && !moved && currentValue.length > 0 ? 0 : activeIndex); return <button key={`${group}:${item.value}`} type="button" role="option" aria-selected={highlighted} disabled={item.disabled} className={cn("flex w-full flex-col rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent focus:bg-accent disabled:pointer-events-none disabled:opacity-50", highlighted && "bg-accent")} onMouseEnter={() => { setMoved(true); setActiveIndex(index); }} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(item)}><span>{item.label ?? item.value}</span>{item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}</button>; })}</div>)}
        </PopoverContent>
      </div></PopoverAnchor>
    </Popover>
  );
}
