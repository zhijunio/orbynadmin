"use client"

import { useState } from "react"
import { IconSquareCheck, IconColumns, IconCircle, IconClock, IconFile, IconFilter, IconMessage, IconPlus, IconPin, IconUser, IconX, IconCircleCheck } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"
import { demoAvatarUrl } from "@/utils/demo-avatar"

type WorkflowCardData = { id: string; title: string; owner: string; budget: number; description: string; files: number; tasks: number; comments: number; days: number; avatars: string[] }
type WorkflowColumn = { id: string; title: string; cards: WorkflowCardData[] }

const initialWorkflowColumns: WorkflowColumn[] = [
  { id: "backlog", title: "Backlog", cards: [
    { id: "WF-102", title: "Draft partner intake workflow for multi-region implementation teams", owner: "Elena Torres", budget: 12800, description: "Define approval path...", files: 1, tasks: 3, comments: 2, days: 24, avatars: ["ET", "NL"] },
    { id: "WF-118", title: "Map renewal risk signals", owner: "Omar Haddad", budget: 32500, description: "Choose data sources...", files: 2, tasks: 5, comments: 4, days: 21, avatars: ["OH", "PS"] },
  ] },
  { id: "todo", title: "Todo", cards: [
    { id: "WF-121", title: "Prepare workspace launch checklist for enterprise tenant provisioning", owner: "Nora Lee", budget: 24000, description: "Set adoption target...", files: 2, tasks: 4, comments: 3, days: 18, avatars: ["NL", "ET"] },
    { id: "WF-125", title: "Create account health scorecard with renewal risk weighting", owner: "Priya Shah", budget: 16900, description: "Confirm scoring weights...", files: 3, tasks: 6, comments: 2, days: 14, avatars: ["PS", "OH"] },
    { id: "WF-129", title: "Review procurement handoff notes for multi-region vendor approval", owner: "Liam Carter", budget: 9600, description: "Attach vendor terms...", files: 2, tasks: 2, comments: 1, days: 12, avatars: ["LC", "NL"] },
  ] },
  { id: "in-progress", title: "In Progress", cards: [
    { id: "WF-132", title: "Automate invoice approval queue", owner: "Omar Haddad", budget: 41200, description: "Connect approval rules...", files: 4, tasks: 7, comments: 6, days: 8, avatars: ["OH", "ET"] },
    { id: "WF-135", title: "Build segment sync audit trail", owner: "Priya Shah", budget: 27400, description: "Log sync failures...", files: 2, tasks: 5, comments: 4, days: 5, avatars: ["PS", "LC"] },
  ] },
  { id: "blocked", title: "Blocked", cards: [
    { id: "WF-139", title: "Confirm data residency exception", owner: "Mia Hart", budget: 18300, description: "Waiting on legal...", files: 1, tasks: 2, comments: 3, days: 4, avatars: ["MH", "PS"] },
    { id: "WF-142", title: "Resolve vendor access request", owner: "Eli Stone", budget: 11600, description: "Request permissions...", files: 2, tasks: 3, comments: 1, days: 2, avatars: ["ES", "LC"] },
  ] },
  { id: "reviewing", title: "Reviewing", cards: [
    { id: "WF-144", title: "Review onboarding sequence", owner: "Nora Lee", budget: 22100, description: "Verify completion events...", files: 3, tasks: 5, comments: 4, days: 6, avatars: ["NL", "ET"] },
    { id: "WF-147", title: "Approve renewal forecast", owner: "Omar Haddad", budget: 36500, description: "Check account assumptions...", files: 2, tasks: 4, comments: 2, days: 3, avatars: ["OH", "PS"] },
    { id: "WF-149", title: "Validate data import map", owner: "Liam Carter", budget: 14200, description: "Confirm field mapping...", files: 1, tasks: 3, comments: 2, days: 1, avatars: ["LC", "ES"] },
  ] },
  { id: "done", title: "Done", cards: [
    { id: "WF-152", title: "Publish Q2 client playbook", owner: "Elena Torres", budget: 19800, description: "Share final copy...", files: 4, tasks: 4, comments: 5, days: 0, avatars: ["ET", "NL"] },
    { id: "WF-155", title: "Complete billing migration", owner: "Priya Shah", budget: 28600, description: "Archive migration notes...", files: 5, tasks: 8, comments: 6, days: 0, avatars: ["PS", "OH"] },
  ] },
  { id: "closed", title: "Closed", cards: [] },
  { id: "cancelled", title: "Cancelled", cards: [
    { id: "WF-158", title: "Retire legacy webhook", owner: "Eli Stone", budget: 7200, description: "Superseded by event bus...", files: 1, tasks: 2, comments: 2, days: 0, avatars: ["ES", "LC"] },
    { id: "WF-160", title: "Pause regional export update", owner: "Mia Hart", budget: 15400, description: "Revisit next quarter...", files: 2, tasks: 2, comments: 3, days: 0, avatars: ["MH", "NL"] },
  ] },
]

const collapsedInitially = new Set(["blocked", "reviewing", "done", "closed", "cancelled"])

export function WorkflowKanban() {
  const [columns, setColumns] = useState(initialWorkflowColumns)
  const [collapsed, setCollapsed] = useState(collapsedInitially)
  const [columnsMenu, setColumnsMenu] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [ownerFilter, setOwnerFilter] = useState("All owners")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [budget, setBudget] = useState("0")
  const [targetColumn, setTargetColumn] = useState("backlog")
  const [feedback, setFeedback] = useState("")
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null)

  function moveCard(cardId: string, columnId: string) {
    setColumns((current) => {
      const source = current.find((column) => column.cards.some((card) => card.id === cardId))
      const target = current.find((column) => column.id === columnId)
      const card = source?.cards.find((item) => item.id === cardId)
      if (!source || !target || !card || source.id === target.id) return current
      return current.map((column) => column.id === source.id ? { ...column, cards: column.cards.filter((item) => item.id !== cardId) } : column.id === target.id ? { ...column, cards: [...column.cards, card] } : column)
    })
  }

  function reorderColumn(targetId: string) {
    if (!draggedColumn || draggedColumn === targetId) return
    setColumns((current) => {
      const from = current.findIndex((column) => column.id === draggedColumn)
      const to = current.findIndex((column) => column.id === targetId)
      if (from < 0 || to < 0) return current
      const next = [...current]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
    setDraggedColumn(null)
  }

  function createCard() {
    if (!title.trim()) return
    const card: WorkflowCardData = { id: `WF-${Date.now()}`, title: title.trim(), owner: "Unassigned", budget: Number(budget) || 0, description: "Add details...", files: 0, tasks: 0, comments: 0, days: 0, avatars: [] }
    setColumns((current) => current.map((column) => column.id === targetColumn ? { ...column, cards: [...column.cards, card] } : column))
    setTitle("")
    setDialogOpen(false)
    setFeedback("Card created")
  }

  const allOwners = Array.from(new Set(columns.flatMap((column) => column.cards.map((card) => card.owner))))

  return <section className="min-w-0 space-y-3">
    <header className="flex flex-wrap items-center gap-2"><h2 className="mr-auto text-base font-semibold">Workflow Board</h2><Button size="sm" variant="outline" onClick={() => setFiltersOpen((open) => !open)}><IconFilter />Filters</Button><Button size="sm" variant="outline" onClick={() => setColumnsMenu((open) => !open)}><IconColumns />Columns</Button><Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />New card</Button></header>
    {filtersOpen && <div className="flex items-center gap-2 rounded-lg border bg-card p-3"><span className="text-sm">Owner</span><Select value={ownerFilter} onValueChange={setOwnerFilter}><SelectTrigger className="h-8 w-40"><span>{ownerFilter}</span></SelectTrigger><SelectContent position="popper" align="start"><SelectItem value="All owners">All owners</SelectItem>{allOwners.map((owner) => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}</SelectContent></Select></div>}
    {columnsMenu && <div className="flex flex-wrap gap-2 rounded-lg border bg-card p-3">{columns.map((column) => <Button key={column.id} size="xs" variant={collapsed.has(column.id) ? "outline" : "secondary"} onClick={() => setCollapsed((current) => { const next = new Set(current); if (next.has(column.id)) next.delete(column.id); else next.add(column.id); return next })}>{column.title}</Button>)}</div>}
    <div className="overflow-x-auto pb-3"><div className="flex min-h-[620px] min-w-max items-stretch gap-2.5">{columns.map((column) => collapsed.has(column.id) ? <button key={column.id} type="button" draggable onDragStart={(event) => { setDraggedColumn(column.id); event.dataTransfer.setData("column-id", column.id) }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (event.dataTransfer.getData("column-id")) reorderColumn(column.id); else moveCard(event.dataTransfer.getData("text/plain"), column.id) }} onClick={() => setCollapsed((current) => new Set([...current].filter((id) => id !== column.id)))} className="flex w-10 shrink-0 flex-col items-center gap-3 rounded-xl border bg-muted/40 py-3 text-muted-foreground"><ColumnIcon id={column.id} /><span className="text-xs font-medium" style={{ writingMode: "vertical-rl" }}>{column.title}</span><span className="text-xs">{column.cards.length}</span></button> : <section key={column.id} data-column={column.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (event.dataTransfer.getData("column-id")) reorderColumn(column.id); else moveCard(event.dataTransfer.getData("text/plain"), column.id) }} className="flex w-[344px] shrink-0 flex-col rounded-xl border bg-card p-2.5"><header draggable onDragStart={(event) => { setDraggedColumn(column.id); event.dataTransfer.setData("column-id", column.id) }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); event.stopPropagation(); reorderColumn(column.id) }} className="flex cursor-grab items-center gap-2 px-1 py-1.5"><ColumnIcon id={column.id} /><span className="text-sm font-medium">{column.title}</span><span className="rounded border bg-muted/50 px-1.5 text-[11px] text-muted-foreground">{column.cards.length}</span><button type="button" aria-label={`Collapse ${column.title}`} onClick={() => setCollapsed((current) => new Set(current).add(column.id))} className="ml-auto rounded p-1 text-muted-foreground hover:bg-muted">−</button></header><div className="grid content-start gap-2">{column.cards.filter((card) => ownerFilter === "All owners" || card.owner === ownerFilter).map((card) => <article key={card.id} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", card.id)} className="rounded-xl border bg-card px-3 py-2.5"><div className="flex items-start gap-2"><IconPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" /><p className="truncate text-sm font-medium leading-5">{card.title}</p></div><div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><IconUser className="size-3.5" /><Avatar className="size-5"><AvatarImage src={demoAvatarUrl(card.owner)} alt=""/><AvatarFallback className="text-[8px]">{card.owner.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><span className="truncate">{card.owner}</span></div><div className="mt-2 flex items-center gap-1.5 text-sm font-medium"><span className="text-muted-foreground">$</span>{card.budget.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div><p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground"><IconSquareCheck className="size-3.5 shrink-0" />{card.description}</p><footer className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><IconFile className="size-3.5" />{card.files}</span><span className="flex items-center gap-1"><IconSquareCheck className="size-3.5" />{card.tasks}</span><span className="flex items-center gap-1"><IconMessage className="size-3.5" />{card.comments}</span><span className="ml-auto flex items-center gap-1">{card.avatars.slice(0, 2).map((initials) => <Avatar key={initials} className="size-5 border border-background"><AvatarImage src={demoAvatarUrl(initials)} alt=""/><AvatarFallback className="text-[8px]">{initials}</AvatarFallback></Avatar>)}<IconClock className="size-3.5" />{card.days}d</span></footer></article>)}</div></section>)}</div></div>
    {feedback && <div role="status" className="sr-only">{feedback}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New card</DialogTitle><DialogDescription>Add a card to the workflow board.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Card title" /></label><label className="grid gap-1.5 text-sm">Budget<Input type="number" value={budget} onChange={(event) => setBudget(event.target.value)} /></label><label className="grid gap-1.5 text-sm">Column<Select value={targetColumn} onValueChange={setTargetColumn}><SelectTrigger><span>{columns.find((column) => column.id === targetColumn)?.title}</span></SelectTrigger><SelectContent position="popper" align="start">{columns.map((column) => <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>)}</SelectContent></Select></label><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createCard}>Create card</Button></DialogFooter></DialogContent></Dialog>
  </section>
}

function ColumnIcon({ id }: { id: string }) {
  const className = "size-4 shrink-0"
  if (id === "blocked") return <IconX className={`${className} text-destructive`} />
  if (id === "reviewing") return <IconClock className={`${className} text-violet-500`} />
  if (id === "done" || id === "closed") return <IconCircleCheck className={`${className} text-success`} />
  if (id === "in-progress") return <IconCircle className={`${className} text-warning`} />
  if (id === "todo") return <IconCircle className={`${className} text-info`} />
  return <IconCircle className={`${className} text-muted-foreground`} />
}
