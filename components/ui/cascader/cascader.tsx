"use client"

import * as React from "react"
import { IconCheck, IconChevronDown, IconChevronRight, IconSearch, IconX } from "@tabler/icons-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover"
import { cn } from "@/utils/cn"

export type CascaderNode = {
  value: string
  label: string
  children?: CascaderNode[]
  parentId?: string | null
  description?: string
  disabled?: boolean
  hasChildren?: boolean
  badge?: string
  tone?: "default" | "success" | "warning" | "destructive"
  icon?: React.ReactNode
}

export type CascaderProps = {
  options: CascaderNode[]
  selectedPaths?: string[][]
  defaultSelectedPaths?: string[][]
  onSelectionChange?: (paths: string[][]) => void
  multiple?: boolean
  maxSelections?: number
  mode?: "drill" | "columns" | "tree"
  searchable?: boolean
  searchScope?: "level" | "deep" | "global"
  query?: string
  onQueryChange?: (query: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  searchPlaceholder?: string
  name?: string
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  valueDisplay?: "path" | "leaf" | "count"
  collapsePath?: "middle" | "start" | "none"
  virtualize?: boolean
  onLoadChildren?: (node: CascaderNode) => Promise<CascaderNode[]>
  renderOption?: (node: CascaderNode, state: { selected: boolean; expanded: boolean }) => React.ReactNode
  footer?: React.ReactNode
  className?: string
  "aria-label"?: string
}

type OptionListProps = {
  nodes: CascaderNode[]
  render: (node: CascaderNode) => React.ReactNode
  virtualize?: boolean
}

function OptionList({ nodes, render, virtualize = false }: OptionListProps) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const rowHeight = 38
  const windowSize = 12
  const start = virtualize ? Math.max(0, Math.floor(scrollTop / rowHeight) - 2) : 0
  const visible = virtualize ? nodes.slice(start, start + windowSize) : nodes
  return <div role="listbox" className="max-h-64 overflow-y-auto p-1" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
    {start > 0 && <div aria-hidden="true" style={{ height: start * rowHeight }} />}
    {visible.map(render)}
    {start + visible.length < nodes.length && <div aria-hidden="true" style={{ height: (nodes.length - start - visible.length) * rowHeight }} />}
  </div>
}

function buildTree(flat: CascaderNode[]) {
  const nodes = new Map(flat.map((node) => [node.value, { ...node, children: [] as CascaderNode[] }]));
  const roots: CascaderNode[] = [];
  for (const source of flat) {
    const node = nodes.get(source.value)!;
    if (source.parentId && nodes.has(source.parentId)) nodes.get(source.parentId)!.children!.push(node);
    else roots.push(node);
  }
  return roots;
}

function allPaths(nodes: CascaderNode[], parent: CascaderNode[] = []): CascaderNode[][] {
  return nodes.flatMap((node) => {
    const path = [...parent, node];
    return node.children?.length ? allPaths(node.children, path) : [path];
  });
}

function Cascader({
  options,
  selectedPaths,
  defaultSelectedPaths = [],
  onSelectionChange,
  multiple = false,
  maxSelections,
  mode = "drill",
  searchable = true,
  searchScope = "global",
  query: queryProp,
  onQueryChange,
  open: openProp,
  onOpenChange,
  placeholder = "Choose a value...",
  searchPlaceholder = "Search options...",
  name,
  disabled = false,
  readOnly = false,
  clearable = true,
  valueDisplay = "path",
  collapsePath = "middle",
  virtualize = false,
  onLoadChildren,
  renderOption,
  footer,
  className,
  "aria-label": ariaLabel = "Choose a value",
}: CascaderProps) {
  const [internalPaths, setInternalPaths] = React.useState(defaultSelectedPaths)
  const paths = selectedPaths ?? internalPaths
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isOpen = openProp ?? internalOpen
  const [internalQuery, setInternalQuery] = React.useState("")
  const query = queryProp ?? internalQuery
  const [activePath, setActivePath] = React.useState<string[]>([])
  const [expanded, setExpanded] = React.useState<string[]>([])
  const [loaded, setLoaded] = React.useState<Record<string, CascaderNode[]>>({})
  const [loading, setLoading] = React.useState<string | null>(null)
  const tree = React.useMemo(() => {
    const source = options.some((node) => node.parentId !== undefined) ? buildTree(options) : options
    const mergeLoaded = (nodes: CascaderNode[]): CascaderNode[] => nodes.map((node) => ({ ...node, children: loaded[node.value] ?? (node.children ? mergeLoaded(node.children) : undefined) }))
    return mergeLoaded(source)
  }, [options, loaded])
  const leaves = React.useMemo(() => allPaths(tree), [tree])
  const selectedNodePaths = paths.map((path) => path.at(-1) ? findNodePath(tree, path.at(-1)!) : undefined).filter(Boolean) as CascaderNode[][]

  function setOpen(next: boolean) {
    if (openProp === undefined) setInternalOpen(next)
    onOpenChange?.(next)
    if (!next) { setActivePath([]); setQuery("") }
  }
  function setQuery(next: string) {
    if (queryProp === undefined) setInternalQuery(next)
    onQueryChange?.(next)
  }
  function updatePaths(next: string[][]) {
    if (selectedPaths === undefined) setInternalPaths(next)
    onSelectionChange?.(next)
  }
  function labelFor(path: CascaderNode[]) {
    const labels = path.map((node) => node.label)
    if (valueDisplay === "leaf") return labels.at(-1) ?? ""
    if (valueDisplay === "count") return `${labels.at(-1)}${path.length > 1 ? ` · ${path.length} levels` : ""}`
    if (collapsePath === "none" || labels.length < 4) return labels.join(" / ")
    return collapsePath === "start" ? `… / ${labels.slice(-2).join(" / ")}` : `${labels[0]} / … / ${labels.at(-1)}`
  }
  function selectPath(path: CascaderNode[]) {
    if (readOnly) return
    const key = path.map((node) => node.value).join("/")
    const exists = paths.some((current) => current.join("/") === key)
    if (multiple) {
      if (exists) updatePaths(paths.filter((current) => current.join("/") !== key))
      else if (maxSelections === undefined || paths.length < maxSelections) updatePaths([...paths, path.map((node) => node.value)])
    } else {
      updatePaths([path.map((node) => node.value)])
      setOpen(false)
    }
  }
  async function activate(node: CascaderNode, parent: CascaderNode[]) {
    const path = [...parent, node]
    if (node.disabled || readOnly) return
    if (mode === "tree" && node.children?.length) {
      setExpanded((current) => current.includes(node.value) ? current.filter((id) => id !== node.value) : [...current, node.value])
      return
    }
    if (node.children?.length || node.hasChildren) {
      setActivePath(path.map((item) => item.value))
      if (!node.children?.length && onLoadChildren && !loaded[node.value]) {
        setLoading(node.value)
        const children = await onLoadChildren(node)
        setLoaded((current) => ({ ...current, [node.value]: children }))
        setLoading(null)
      }
      return
    }
    selectPath(path)
  }
  const activeNodes = activePath.map((id) => findNode(tree, id)).filter(Boolean) as CascaderNode[]
  const currentLevel = activeNodes.length ? activeNodes.at(-1)?.children ?? [] : tree
  const deepResults = leaves.filter((path) => path.map((node) => node.label).join(" ").toLowerCase().includes(query.toLowerCase()))
  const filteredResults = searchScope === "level" ? currentLevel.filter((node) => node.label.toLowerCase().includes(query.toLowerCase())).map((node) => [node]) : deepResults
  const picked = selectedNodePaths.map(labelFor)
  const triggerValue = paths.length === 0 ? placeholder : multiple ? `${paths.length} selected` : labelFor(selectedNodePaths[0] ?? [])

  function row(node: CascaderNode, parent: CascaderNode[], isSelected: boolean, isExpanded: boolean) {
    return <button key={node.value} type="button" role="option" aria-selected={isSelected} disabled={node.disabled || (multiple && !isSelected && maxSelections !== undefined && paths.length >= maxSelections)} onClick={() => void activate(node, parent)} className="flex min-h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45 aria-selected:bg-accent">
      {multiple && <span aria-hidden="true" className={cn("grid size-4 shrink-0 place-items-center rounded border border-input", isSelected && "border-primary bg-primary text-primary-foreground")}>{isSelected && <IconCheck className="size-3" />}</span>}
      {renderOption ? renderOption(node, { selected: isSelected, expanded: isExpanded }) : <><span className="min-w-0 flex-1"><span className="block truncate">{node.icon}{node.icon && " "}{node.label}</span>{node.description && <span className="block truncate text-xs text-muted-foreground">{node.description}</span>}</span>{node.badge && <span className={cn("rounded-full bg-muted px-1.5 py-0.5 text-[10px]", node.tone === "success" && "bg-primary/10 text-primary", node.tone === "warning" && "bg-muted text-foreground", node.tone === "destructive" && "bg-destructive/10 text-destructive")}>{node.badge}</span>}</>}
      {node.children?.length || node.hasChildren ? <IconChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" /> : null}
    </button>
  }
  function treeRows(nodes: CascaderNode[], parent: CascaderNode[] = []): React.ReactNode {
    return nodes.map((node) => {
      const path = [...parent, node]
      const isSelected = paths.some((current) => current.join("/") === path.map((item) => item.value).join("/"))
      const isExpanded = expanded.includes(node.value)
      return <React.Fragment key={node.value}><div className="flex items-center gap-1">{multiple && <button type="button" aria-label={`Select ${node.label}`} disabled={node.disabled} onClick={() => selectPath(path)} className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-accent disabled:opacity-50">{isSelected && <IconCheck className="size-4 text-primary" />}</button>}<button type="button" onClick={() => void activate(node, parent)} className="flex min-h-9 flex-1 items-center gap-2 rounded-md px-2 text-left text-sm hover:bg-accent"><span className="min-w-0 flex-1 truncate">{node.label}</span>{node.children?.length ? <IconChevronRight className={cn("size-4 transition-transform", isExpanded && "rotate-90")} /> : null}</button></div>{isExpanded && node.children?.length ? <div className="ml-4 border-l pl-2">{treeRows(node.children, path)}</div> : null}</React.Fragment>
    })
  }

  return <>
    <Popover open={isOpen} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild><button type="button" disabled={disabled} aria-label={ariaLabel} aria-expanded={isOpen} className={cn("flex h-9 w-full min-w-48 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-left text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", paths.length === 0 && "text-muted-foreground", clearable && paths.length > 0 && "pr-14", className)}><span className="min-w-0 truncate">{triggerValue}</span><IconChevronDown className="size-4 shrink-0 text-muted-foreground" /></button></PopoverTrigger>
        {clearable && paths.length > 0 && !readOnly && <button type="button" aria-label="Clear selection" onClick={() => updatePaths([])} className="absolute right-8 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"><IconX className="size-3.5" /></button>}
      </div>
      <PopoverContent align="start" className="w-[min(42rem,calc(100vw-2rem))] p-0" onOpenAutoFocus={(event) => event.preventDefault()}>
    {searchable && <div className="flex items-center gap-2 border-b px-3"><IconSearch className="size-4 text-muted-foreground" /><input aria-label="Search options" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder={searchPlaceholder} className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><IconX className="size-4 text-muted-foreground" /></button>}</div>}
    {query ? <OptionList nodes={filteredResults.map((path) => ({ value: path.at(-1)!.value, label: `${path.map((node) => node.label).join(" / ")}`, children: undefined, disabled: path.at(-1)!.disabled }))} virtualize={virtualize} render={(result) => { const path = leaves.find((item) => item.at(-1)?.value === result.value) ?? [result]; const key = path.map((node) => node.value).join("/"); return <button key={key} type="button" role="option" aria-selected={paths.some((current) => current.join("/") === key)} onClick={() => selectPath(path)} className="flex min-h-9 w-full items-center rounded-md px-2 text-left text-sm hover:bg-accent"><span className="truncate">{path.map((node) => node.label).join(" / ")}</span></button> }} /> : mode === "tree" ? <div className="max-h-72 overflow-y-auto p-1">{treeRows(tree)}</div> : <div className="flex max-h-72 min-h-40 overflow-x-auto">{(mode === "columns" ? [tree, ...activeNodes.map((node) => node.children ?? [])] : [currentLevel]).map((nodes, columnIndex) => <OptionList key={columnIndex} nodes={nodes} virtualize={virtualize} render={(node) => { const nodePath = mode === "columns" ? activeNodes.slice(0, columnIndex) : activeNodes; const isSelected = paths.some((path) => path.at(-1) === node.value); const isExpanded = activePath.includes(node.value); return <React.Fragment key={node.value}>{row(node, nodePath, isSelected, isExpanded)}</React.Fragment> }} />)}</div>}
        {loading && <p className="border-t px-3 py-2 text-xs text-muted-foreground" aria-live="polite">Loading {loading}…</p>}
        {(footer || multiple || picked.length > 0) && <div className="border-t p-2">{picked.length > 0 && <div className="mb-2 flex flex-wrap gap-1">{selectedNodePaths.map((path, index) => <button key={paths[index].join("/")} type="button" aria-label={`Remove ${labelFor(path)}`} disabled={readOnly} onClick={() => updatePaths(paths.filter((_, i) => i !== index))} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">{labelFor(path)}<IconX className="size-3" /></button>)}</div>}{footer}</div>}
      </PopoverContent>
    </Popover>
    {name && <input type="hidden" name={name} value={paths.map((path) => path.join("/")).join(",")} />}
  </>
}

function findNode(nodes: CascaderNode[], value: string): CascaderNode | undefined {
  for (const node of nodes) { if (node.value === value) return node; const found = findNode(node.children ?? [], value); if (found) return found }
}
function findNodePath(nodes: CascaderNode[], value: string, parent: CascaderNode[] = []): CascaderNode[] | undefined {
  for (const node of nodes) { const path = [...parent, node]; if (node.value === value) return path; const found = findNodePath(node.children ?? [], value, path); if (found) return found }
}

function CascaderPanel({ options, selectedPath, onSelect, className }: { options: CascaderNode[]; selectedPath?: string[]; onSelect?: (path: string[]) => void; className?: string }) {
  const [active, setActive] = React.useState<string[]>([])
  const path = active.map((id) => findNode(options, id)).filter(Boolean) as CascaderNode[]
  const levels = [options, ...path.map((node) => node.children ?? [])]
  return <div className={cn("flex min-h-40 max-w-full overflow-x-auto rounded-lg border", className)}>{levels.map((nodes, index) => <div key={index} role="listbox" className="min-w-44 flex-1 border-r p-1 last:border-r-0">{nodes.map((node) => { const nodePath = [...path.slice(0, index), node]; const isSelected = selectedPath?.at(-1) === node.value; return <button key={node.value} type="button" role="option" aria-selected={isSelected} disabled={node.disabled} onClick={() => { if (node.children?.length) setActive(nodePath.map((item) => item.value)); else onSelect?.(nodePath.map((item) => item.value)) }} className={cn("flex min-h-9 w-full items-center justify-between rounded-md px-2 text-left text-sm hover:bg-accent disabled:opacity-50", isSelected && "bg-accent")}>{node.label}{node.children?.length ? <IconChevronRight className="size-4 text-muted-foreground" /> : null}</button>})}</div>)}</div>
}

export { Cascader, CascaderPanel, buildTree }
