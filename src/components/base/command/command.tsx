"use client";

import * as React from "react";
import { IconCheck as CheckIcon, IconSearch as SearchIcon } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog";
import { InputGroup, InputGroupAddon } from "@/components/base/input/input-group";

type CommandContextValue = {
  query: string;
  setQuery: (query: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  empty: boolean;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);
const useCommand = () => React.useContext(CommandContext);

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function countMatches(children: React.ReactNode, query: string): number {
  return React.Children.toArray(children).reduce<number>((count, child) => {
    if (!React.isValidElement<{ children?: React.ReactNode; value?: string; textValue?: string }>(child)) return count;
    if (child.type === CommandItem) {
      const text = child.props.textValue ?? child.props.value ?? textFromChildren(child.props.children);
      return count + (normalize(text).includes(normalize(query)) ? 1 : 0);
    }
    return count + countMatches(child.props.children, query);
  }, 0);
}

function Command({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [query, setQuery] = React.useState("");
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const empty = countMatches(children, query) === 0;

  return (
    <CommandContext.Provider value={{ query, setQuery, activeValue, setActiveValue, empty }}>
      <div data-slot="command" className={cn("flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className)}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogContent className={cn("top-[20vh] translate-y-0 overflow-hidden rounded-xl p-0 sm:max-w-xl", className)} showCloseButton={showCloseButton}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, onChange, onKeyDown, ...props }: Omit<React.ComponentProps<"input">, "className"> & { className?: string }) {
  const context = useCommand();

  return (
    <div data-slot="command-input-wrapper" className="border-b border-border px-3 py-2">
      <InputGroup className="h-9 rounded-lg border-0 bg-transparent shadow-none *:data-[slot=input-group-addon]:pl-0">
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        </InputGroupAddon>
        <input
          data-slot="command-input"
          aria-label={props["aria-label"] ?? props.placeholder ?? "Search commands"}
          className={cn("w-full bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
          {...props}
          onChange={(event) => {
            context?.setQuery(event.currentTarget.value);
            context?.setActiveValue(null);
            onChange?.(event);
          }}
          onKeyDown={(event) => {
            const items = Array.from(
              event.currentTarget.closest("[data-slot=command]")?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])') ?? [],
            );
            if (event.key === "ArrowDown" && items.length) {
              event.preventDefault();
              items[0].focus();
            } else if (event.key === "ArrowUp" && items.length) {
              event.preventDefault();
              items[items.length - 1]?.focus();
            }
            onKeyDown?.(event);
          }}
        />
      </InputGroup>
    </div>
  );
}

function CommandEmpty({ children }: { children: React.ReactNode }) {
  return useCommand()?.empty ? <div role="status" aria-live="polite" className="px-3 py-8 text-center text-sm text-muted-foreground">{children}</div> : null;
}

function CommandList({ className, children, "aria-label": ariaLabel = "Commands", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      data-slot="command-list"
      className={cn("no-scrollbar max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto p-1 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandGroup({ className, heading, children, ...props }: React.ComponentProps<"div"> & { heading?: React.ReactNode }) {
  const context = useCommand();
  const visible = countMatches(children, context?.query ?? "") > 0;
  if (!visible) return null;

  return (
    <div role="group" aria-label={typeof heading === "string" ? heading : undefined} className={cn("overflow-hidden py-1 not-first:border-t not-first:border-border", className)} {...props}>
      {heading && <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{heading}</div>}
      {children}
    </div>
  );
}

function CommandItem({
  className,
  children,
  value,
  onSelect,
  textValue,
  onClick,
  onFocus,
  onKeyDown,
  ...props
}: React.ComponentProps<"button"> & { value?: string; textValue?: string; onSelect?: () => void }) {
  const context = useCommand();
  const itemId = React.useId();
  const text = textValue ?? value ?? textFromChildren(children);
  const selected = context?.activeValue === itemId;
  if (context && !normalize(text).includes(normalize(context.query))) return null;

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-selected={selected ? "true" : undefined}
      data-slot="command-item"
      data-value={value ?? text}
      className={cn("group/command-item relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
      onFocus={(event) => {
        context?.setActiveValue(itemId);
        onFocus?.(event);
      }}
      onClick={(event) => {
        onSelect?.();
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        const command = event.currentTarget.closest<HTMLElement>('[data-slot="command"]');
        const options = Array.from(command?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])') ?? []);
        const index = options.indexOf(event.currentTarget);
        if ((event.key === "ArrowDown" || event.key === "ArrowUp") && options.length) {
          event.preventDefault();
          const step = event.key === "ArrowDown" ? 1 : -1;
          options[(index + step + options.length) % options.length]?.focus();
        } else if (event.key === "Home" && options.length) {
          event.preventDefault();
          options[0].focus();
        } else if (event.key === "End" && options.length) {
          event.preventDefault();
          options[options.length - 1]?.focus();
        }
        onKeyDown?.(event);
      }}
    >
      {children}
      <CheckIcon aria-hidden="true" className="ml-auto size-4 opacity-0 group-data-[selected=true]/command-item:opacity-100" />
    </button>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut };
