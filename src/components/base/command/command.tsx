"use client"

import * as React from "react"
import { cn } from "@/utils/cn"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog"
import { InputGroup, InputGroupAddon } from "@/components/base/input/input-group"
import { IconSearch as SearchIcon, IconCheck as CheckIcon } from "@tabler/icons-react"

type CommandContextValue = { query: string; setQuery: (query: string) => void; empty: boolean }
const CommandContext = React.createContext<CommandContextValue | null>(null)
const useCommand = () => React.useContext(CommandContext)

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textFromChildren).join(" ")
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) return textFromChildren(children.props.children)
  return ""
}
function countMatches(children: React.ReactNode, query: string): number {
  return React.Children.toArray(children).reduce<number>((count, child) => {
    if (!React.isValidElement<{ children?: React.ReactNode; value?: string; textValue?: string }>(child)) return count
    if (child.type === CommandItem) {
      const text = child.props.textValue ?? child.props.value ?? textFromChildren(child.props.children)
      return count + (text.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ? 1 : 0)
    }
    return count + countMatches(child.props.children, query)
  }, 0)
}
function Command({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [query, setQuery] = React.useState("")
  const empty = countMatches(children, query) === 0
  return <CommandContext.Provider value={{ query, setQuery, empty }}><div data-slot="command" className={cn("flex size-full flex-col overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground", className)}>{children}</div></CommandContext.Provider>
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, showCloseButton = false, ...props }: React.ComponentProps<typeof Dialog> & { title?: string; description?: string; className?: string; showCloseButton?: boolean }) {
  return <Dialog {...props}><DialogContent className={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl p-0", className)} showCloseButton={showCloseButton}><DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><Command>{children}</Command></DialogContent></Dialog>
}
function CommandInput({ className, onChange, onKeyDown, ...props }: Omit<React.ComponentProps<"input">, "className"> & { className?: string }) {
  const context = useCommand()
  return <div data-slot="command-input-wrapper" className="p-1 pb-0"><InputGroup className="h-8 rounded-lg border-input/30 bg-input/30 shadow-none *:data-[slot=input-group-addon]:pl-2"><input data-slot="command-input" aria-label={props["aria-label"] ?? "Search commands"} className={cn("w-full text-base outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} {...props} onChange={event => { context?.setQuery(event.currentTarget.value); onChange?.(event) }} onKeyDown={event => { const items = event.currentTarget.closest("[data-slot=command]")?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])'); if (event.key === "ArrowDown" && items?.length) { event.preventDefault(); items[0].focus() } onKeyDown?.(event) }} /><InputGroupAddon><SearchIcon aria-hidden="true" className="size-4 shrink-0 opacity-50" /></InputGroupAddon></InputGroup></div>
}
function CommandEmpty({ children }: { children: React.ReactNode }) { return useCommand()?.empty ? <div className="py-6 text-center text-sm text-muted-foreground">{children}</div> : null }
function CommandList({ className, children, ...props }: React.ComponentProps<"div">) {
  const context = useCommand()
  if (!context) return <div {...props} className={cn("no-scrollbar max-h-72 overflow-x-hidden overflow-y-auto outline-none", className)}>{children}</div>
  return <div role="listbox" aria-label="Commands" data-slot="command-list" className={cn("no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", className)} {...props}>{children}</div>
}
function CommandGroup({ className, heading, children, ...props }: React.ComponentProps<"div"> & { heading?: React.ReactNode }) {
  const context = useCommand(); const visible = countMatches(children, context?.query ?? "") > 0
  if (!visible) return null
  return <div role="group" aria-label={typeof heading === "string" ? heading : undefined} className={cn("overflow-hidden p-1 not-first:border-t not-first:border-border", className)} {...props}>{heading && <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{heading}</div>}{children}</div>
}
function CommandItem({ className, children, value, onSelect, textValue, onKeyDown, ...props }: React.ComponentProps<"button"> & { value?: string; textValue?: string; onSelect?: () => void }) {
  const context = useCommand(); const text = textValue ?? value ?? textFromChildren(children)
  if (context && !text.toLocaleLowerCase().includes(context.query.toLocaleLowerCase())) return null
  return <button type="button" role="option" data-slot="command-item" aria-selected="false" data-value={value ?? text} className={cn("group/command-item relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden focus:bg-muted focus:text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)} {...props} onClick={() => onSelect?.()} onKeyDown={event => { const items = event.currentTarget.closest("[data-slot=command]")?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])'); if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); const index = Array.from(items ?? []).indexOf(event.currentTarget); const next = event.key === "ArrowDown" ? index + 1 : index - 1; items?.[Math.max(0, Math.min(next, items.length - 1))]?.focus() } onKeyDown?.(event) }}>{children}<CheckIcon aria-hidden="true" className="ml-auto opacity-0 group-data-[selected=true]/command-item:opacity-100" /></button>
}
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) { return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} /> }
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut }
