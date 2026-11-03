"use client"

import * as React from "react"
import { IconCheck, IconChevronDown, IconChevronRight, IconCopy, IconDots, IconSearch } from "@tabler/icons-react"

import { Button } from "@/components/ui/buttons/button"
import { cn } from "@/utils/cn"

export type CodeBlockProps = {
  code: string
  language?: string
  fileName?: string
  startLine?: number
  lineNumbers?: boolean
  highlightedLines?: number[]
  highlightWords?: string[]
  diffLines?: Record<number, "add" | "remove">
  focusLines?: number[]
  diagnostics?: Record<number, string>
  lineActions?: boolean
  selectableLines?: boolean
  searchable?: boolean
  wrap?: boolean
  expandable?: boolean
  initialExpanded?: boolean
  foldable?: boolean
  foldedRanges?: Array<{ start: number; end: number; label?: string }>
  dark?: boolean
  terminal?: boolean
  ansi?: boolean
  showCopy?: boolean
  className?: string
  onLineSelect?: (line: number) => void
  onLineAction?: (line: number) => void
}

function stripAnsi(value: string) { return value.replace(/\u001b\[[0-9;]*m/g, "") }

function CodeBlock({
  code,
  language = "text",
  fileName,
  startLine = 1,
  lineNumbers = true,
  highlightedLines = [],
  highlightWords = [],
  diffLines = {},
  focusLines = [],
  diagnostics = {},
  lineActions = false,
  selectableLines = false,
  searchable = false,
  wrap = false,
  expandable = false,
  initialExpanded = false,
  foldable = false,
  foldedRanges = [],
  dark = false,
  terminal = false,
  ansi = false,
  showCopy = true,
  className,
  onLineSelect,
  onLineAction,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [expanded, setExpanded] = React.useState(initialExpanded)
  const [query, setQuery] = React.useState("")
  const [selectedLines, setSelectedLines] = React.useState<number[]>([])
  const [folded, setFolded] = React.useState<number[]>(foldedRanges.map((item) => item.start))
  const lines = React.useMemo(() => (ansi ? stripAnsi(code) : code).replace(/\n$/, "").split("\n"), [code, ansi])
  const visibleCount = expandable && !expanded ? Math.min(8, lines.length) : lines.length
  const matches = query ? lines.map((line, index) => line.toLowerCase().includes(query.toLowerCase()) ? index : -1).filter((index) => index >= 0) : []

  async function copyCode() {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1400) } catch { setCopied(false) }
  }
  function renderWords(line: string) {
    if (query && line.toLowerCase().includes(query.toLowerCase())) {
      const index = line.toLowerCase().indexOf(query.toLowerCase())
      return <>{line.slice(0, index)}<mark className="rounded bg-primary/20 text-foreground">{line.slice(index, index + query.length)}</mark>{line.slice(index + query.length)}</>
    }
    if (highlightWords.length) {
      const expression = new RegExp(`(${highlightWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
      return line.split(expression).map((part, index) => highlightWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? <mark key={index} className="rounded bg-primary/20 text-foreground">{part}</mark> : part)
    }
    const tokenPattern = /(\/\/.*$|#.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|async|await|throw|new|if|else|export|import|from|default|type|interface|true|false|null|undefined|class|try|catch|for|while)\b|\b\d+(?:\.\d+)?\b)/g
    return line.split(tokenPattern).map((token, index) => {
      if (!token) return null
      const className = token.startsWith("//") || token.startsWith("#") ? "text-muted-foreground" : /^["'`]/.test(token) ? "text-emerald-700 dark:text-emerald-400" : /^(true|false|null|undefined|\d)/.test(token) ? "text-amber-700 dark:text-amber-400" : /^(const|let|var|function|return|async|await|throw|new|if|else|export|import|from|default|type|interface|class|try|catch|for|while)$/.test(token) ? "text-primary" : ""
      return className ? <span key={index} className={className}>{token}</span> : token
    })
  }
  const hiddenLines = new Set<number>()
  foldedRanges.forEach((range) => { if (folded.includes(range.start)) for (let line = range.start + 1; line <= range.end; line++) hiddenLines.add(line) })

  return <section data-slot="code-block" className={cn("w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground", dark && "border-zinc-800 bg-zinc-950 text-zinc-100", className)}>
    <header className={cn("sticky top-0 z-10 flex min-h-10 items-center gap-2 border-b border-border bg-muted/30 px-3 py-1.5", dark && "border-zinc-800 bg-zinc-900")}>
      {terminal && <span aria-hidden="true" className="flex gap-1"><i className="size-2 rounded-full bg-destructive" /><i className="size-2 rounded-full bg-muted-foreground" /><i className="size-2 rounded-full bg-primary" /></span>}
      <div className="flex min-w-0 flex-1 items-center gap-2 text-xs"><span className="truncate font-medium">{fileName ?? (terminal ? "Terminal" : language)}</span>{language && <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">{language}</span>}</div>
      {searchable && <label className="flex h-7 items-center gap-1 rounded-md border border-input px-1.5"><IconSearch className="size-3.5 text-muted-foreground" /><input aria-label="Search code" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Find" className="w-20 bg-transparent text-xs outline-none" />{query && <span className="text-[10px] text-muted-foreground">{matches.length ? `${matches[0] + startLine + 1}/${matches.length}` : "0/0"}</span>}</label>}
      {showCopy && <Button type="button" variant="ghost" size="icon-sm" aria-label={copied ? "Copied code" : "Copy code"} onClick={() => void copyCode()}>{copied ? <IconCheck /> : <IconCopy />}</Button>}
    </header>
    <div className={cn("max-h-80 overflow-auto bg-muted/10 py-2 font-mono text-xs leading-6", dark && "bg-zinc-950", terminal && "bg-zinc-950 text-zinc-100", wrap && "[&_code]:whitespace-pre-wrap")}>
      <pre className={cn("min-w-max", wrap && "min-w-0 whitespace-pre-wrap")}><code>{lines.slice(0, visibleCount).map((line, index) => {
        const lineNumber = index + startLine
        if (hiddenLines.has(lineNumber)) return null
        const diff = diffLines[lineNumber]
        const isFocused = focusLines.includes(lineNumber)
        const isHighlighted = highlightedLines.includes(lineNumber)
        const isSelected = selectedLines.includes(lineNumber)
        const fold = foldedRanges.find((range) => range.start === lineNumber)
        const displayLine = diff ? line.replace(/^[+-]\s?/, "") : line
        const toggleLine = () => { setSelectedLines((current) => current.includes(lineNumber) ? current.filter((value) => value !== lineNumber) : [...current, lineNumber]); onLineSelect?.(lineNumber) }
        return <React.Fragment key={lineNumber}><div role={selectableLines ? "button" : undefined} tabIndex={selectableLines ? 0 : undefined} aria-pressed={selectableLines ? isSelected : undefined} onKeyDown={selectableLines ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleLine() } } : undefined} className={cn("group/code-line relative flex min-w-max items-start px-3", lineNumbers && "gap-4", diff === "add" && "bg-primary/10", diff === "remove" && "bg-destructive/10", isHighlighted && "bg-primary/10", isFocused && "ring-1 ring-inset ring-primary/40", isSelected && "bg-accent", query && line.toLowerCase().includes(query.toLowerCase()) && "bg-muted", selectableLines && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")} onClick={selectableLines ? toggleLine : undefined}>
          {lineNumbers && <span className="w-8 shrink-0 select-none border-e border-border/70 pe-2 text-right text-muted-foreground/70">{diff === "add" ? "+" : diff === "remove" ? "−" : lineNumber}</span>}
          <span className="min-w-0 flex-1"><span className={cn(diff === "add" && "text-primary", diff === "remove" && "text-destructive")}>{renderWords(displayLine)}</span>{diagnostics[lineNumber] && <span className="ml-3 rounded bg-destructive/10 px-1.5 py-0.5 font-sans text-[10px] text-destructive">{diagnostics[lineNumber]}</span>}</span>
          {lineActions && <span className="sticky right-2 hidden items-center gap-1 bg-inherit pl-2 group-hover/code-line:flex"><button type="button" onClick={(event) => { event.stopPropagation(); onLineAction?.(lineNumber) }} className="rounded border border-input bg-background px-1.5 font-sans text-[10px]">Comment</button><button type="button" aria-label={`More actions for line ${lineNumber}`} onClick={(event) => { event.stopPropagation(); onLineAction?.(lineNumber) }} className="grid size-6 place-items-center rounded border border-input bg-background"><IconDots className="size-3.5" /></button></span>}
          {foldable && fold && <button type="button" aria-label={folded.includes(lineNumber) ? "Expand code" : "Fold code"} onClick={() => setFolded((current) => current.includes(lineNumber) ? current.filter((value) => value !== lineNumber) : [...current, lineNumber])} className="absolute right-2 top-0 grid size-5 place-items-center rounded hover:bg-muted"><IconChevronDown className={cn("size-3.5 transition-transform", folded.includes(lineNumber) && "-rotate-90")} /></button>}
        </div>{fold && folded.includes(lineNumber) && <button type="button" onClick={() => setFolded((current) => current.filter((value) => value !== lineNumber))} className="flex h-6 items-center gap-2 px-3 text-[10px] text-muted-foreground hover:text-foreground"><IconChevronRight className="size-3" />{fold.label ?? `${fold.end - fold.start} lines folded`}</button>}</React.Fragment>
      })}</code></pre>
    </div>
    {expandable && lines.length > 8 && <Button type="button" variant="ghost" size="sm" className="w-full rounded-none border-t" onClick={() => setExpanded((current) => !current)}>{expanded ? "Show less" : `Show all ${lines.length} lines`}</Button>}
  </section>
}

export { CodeBlock }
