"use client"

import { useState } from "react"
import { IconCalendar, IconFilter, IconPlus, IconShare3 } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { Input } from "@/components/ui/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select/select"
import { demoAvatarUrl } from "@/utils/demo-avatar"

type IssueCard = { id: string; label: string; priority: "P0" | "P1" | "P2" | "P3"; state: "Queued" | "Blocked" | "At risk" | "On track"; title: string; assignee: string; due: string; progress?: number }
type IssueColumn = { id: string; title: string; tone: string; cards: IssueCard[] }

const initialColumns: IssueColumn[] = [
  { id: "open", title: "1. Open", tone: "border-border bg-muted/20", cards: [
    { id: "BUG-421", label: "Access", priority: "P1", state: "Queued", title: "User permissions block account switching", assignee: "Nora Lee", due: "Today", progress: 12 },
    { id: "BUG-426", label: "Forms", priority: "P2", state: "At risk", title: "Forms submit duplicate confirmation emails", assignee: "Omar Vale", due: "Apr 26", progress: 26 },
  ] },
  { id: "triage", title: "2. Triage", tone: "border-warning/40 bg-warning/5", cards: [
    { id: "BUG-438", label: "Auth", priority: "P0", state: "Blocked", title: "Login button does not redirect from invite links", assignee: "Mia Hart", due: "Today", progress: 8 },
    { id: "BUG-445", label: "API", priority: "P1", state: "At risk", title: "API integration returns incorrect totals", assignee: "Eli Stone", due: "Apr 25", progress: 42 },
    { id: "BUG-449", label: "Import", priority: "P1", state: "At risk", title: "Import wizard skips validation errors", assignee: "Ari Blake", due: "Apr 26", progress: 31 },
  ] },
  { id: "in-progress", title: "3. In Progress", tone: "border-foreground/20 bg-muted/40", cards: [
    { id: "BUG-452", label: "UI", priority: "P2", state: "On track", title: "Button text truncates when zoomed in", assignee: "Kai Chen", due: "Apr 27", progress: 58 },
    { id: "BUG-459", label: "Nav", priority: "P2", state: "On track", title: "Navigation menu renders inconsistent font sizes", assignee: "Rae Kim", due: "Apr 29", progress: 66 },
  ] },
  { id: "need-info", title: "4. Need Info", tone: "border-destructive/30 bg-destructive/5", cards: [
    { id: "BUG-467", label: "Mobile", priority: "P0", state: "Blocked", title: "Mobile app crashes when opening report history", assignee: "Lina Ford", due: "Waiting" },
    { id: "BUG-472", label: "Export", priority: "P1", state: "At risk", title: "Data export creates broken report links", assignee: "Theo West", due: "Apr 28", progress: 34 },
    { id: "BUG-475", label: "CSV", priority: "P1", state: "Blocked", title: "CSV upload fails for localized number formats", assignee: "Tara Quinn", due: "Waiting" },
  ] },
  { id: "testing", title: "5. Testing", tone: "border-primary/25 bg-primary/5", cards: [
    { id: "BUG-486", label: "Sync", priority: "P1", state: "On track", title: "Mobile app is not syncing with web app", assignee: "Iris Fox", due: "Today", progress: 82 },
    { id: "BUG-488", label: "Billing", priority: "P2", state: "On track", title: "Regression suite misses billing plan changes", assignee: "Sam Reed", due: "Apr 26", progress: 74 },
  ] },
  { id: "done", title: "6. Done", tone: "border-success/25 bg-success/5", cards: [
    { id: "BUG-490", label: "QA", priority: "P3", state: "On track", title: "Setup regression checklist before release", assignee: "Milo Sage", due: "Apr 23", progress: 100 },
    { id: "BUG-492", label: "Docs", priority: "P3", state: "On track", title: "Archive stale browser compatibility notes", assignee: "Dina Cruz", due: "Apr 24", progress: 100 },
  ] },
]

const priorityTone: Record<IssueCard["priority"], string> = {
  P0: "border-destructive/30 bg-destructive/10 text-destructive",
  P1: "text-muted-foreground",
  P2: "text-muted-foreground",
  P3: "text-muted-foreground",
}
const stateTone: Record<IssueCard["state"], string> = {
  Queued: "text-muted-foreground",
  Blocked: "text-destructive",
  "At risk": "text-warning-foreground",
  "On track": "text-success-foreground",
}

export function IssueTrackingKanban() {
  const [columns, setColumns] = useState(initialColumns)
  const [filterOpen, setFilterOpen] = useState(false)
  const [priority, setPriority] = useState("All priorities")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [taskColumn, setTaskColumn] = useState("open")
  const [feedback, setFeedback] = useState("")
  function moveCard(cardId: string, targetColumnId: string) {
    setColumns((current) => {
      const sourceColumn = current.find((column) => column.cards.some((card) => card.id === cardId))
      const targetColumn = current.find((column) => column.id === targetColumnId)
      if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id) return current
      const card = sourceColumn.cards.find((item) => item.id === cardId)
      if (!card) return current
      return current.map((column) => column.id === sourceColumn.id ? { ...column, cards: column.cards.filter((item) => item.id !== cardId) } : column.id === targetColumn.id ? { ...column, cards: [...column.cards, card] } : column)
    })
  }

  function createTask() {
    if (!title.trim()) return
    const newCard: IssueCard = { id: `BUG-${Date.now()}`, label: "New", priority: "P2", state: "Queued", title: title.trim(), assignee: "Unassigned", due: "Today", progress: 0 }
    setColumns((current) => current.map((column) => column.id === taskColumn ? { ...column, cards: [...column.cards, newCard] } : column))
    setTitle("")
    setDialogOpen(false)
    setFeedback("Task created")
  }

  return <section className="min-w-0 space-y-4">
    <header className="flex flex-wrap items-center gap-3"><h2 className="mr-auto text-lg font-semibold">Issue Tracking</h2><Button size="sm" variant="outline" onClick={() => setFilterOpen((open) => !open)}><IconFilter />Filters</Button><Button size="sm" variant="outline" onClick={() => setFeedback("Board link copied")}><IconShare3 />Share</Button><Button size="sm" onClick={() => setDialogOpen(true)}><IconPlus />New task</Button></header>
    {filterOpen && <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3"><label className="flex items-center gap-2 text-sm">Priority<Select value={priority} onValueChange={setPriority}><SelectTrigger className="h-8 w-36"><span>{priority}</span></SelectTrigger><SelectContent position="popper" align="start"><SelectItem value="All priorities">All priorities</SelectItem>{["P0", "P1", "P2", "P3"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></label><Button size="sm" variant="ghost" onClick={() => setPriority("All priorities")}>Clear</Button></div>}
    <div className="overflow-x-auto pb-3"><div className="grid min-w-[1712px] grid-cols-6 gap-3">{columns.map((column) => { const visibleCards = column.cards.filter((card) => priority === "All priorities" || card.priority === priority); return <section key={column.id} data-column={column.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); moveCard(event.dataTransfer.getData("text/plain"), column.id) }} className={`min-h-48 rounded-xl border p-2.5 ${column.tone}`}><header className="mb-2 flex items-center gap-2 px-0.5"><h3 className="text-sm font-semibold">{column.title}</h3><span className="grid min-w-5 place-items-center rounded border bg-background px-1 text-[11px] text-muted-foreground">{visibleCards.length}</span><span aria-hidden="true" className="ml-auto text-muted-foreground">⠿</span></header><div className="grid content-start gap-2">{visibleCards.map((card) => <article key={card.id} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", card.id)} className="rounded-xl border bg-card p-3 shadow-xs"><div className="flex flex-wrap items-center gap-1.5"><span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${card.label === "Forms" || card.label === "Mobile" || card.label === "CSV" ? "border-destructive/25 bg-destructive/10 text-destructive" : card.label === "Import" || card.label === "Export" ? "border-warning/30 bg-warning/15 text-warning-foreground" : "border-border bg-muted/60 text-muted-foreground"}`}>{card.label}</span><span className="text-[10px] text-muted-foreground">{card.id}</span><span className={`text-[10px] font-medium ${priorityTone[card.priority]}`}>{card.priority}</span><span className={`ml-auto flex shrink-0 items-center gap-1 rounded-md border bg-background px-1.5 py-0.5 text-[10px] ${stateTone[card.state]}`}><span className={`size-1.5 rounded-full ${card.state === "Blocked" ? "bg-destructive" : card.state === "At risk" ? "bg-warning" : card.state === "On track" ? "bg-success" : "bg-muted-foreground"}`} />{card.state}</span></div><p className="mt-2.5 text-sm leading-5">{card.title}</p><footer className="mt-3 flex items-center gap-2"><span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground"><Avatar className="size-6"><AvatarImage src={demoAvatarUrl(card.assignee)} alt="" /><AvatarFallback className="text-[9px]">{card.assignee.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><span className="truncate">{card.assignee}</span></span><span className="ml-auto flex shrink-0 items-center gap-1 rounded-md border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground"><IconCalendar className="size-3" />{card.due}</span><ProgressRing value={card.progress} /></footer></article>)}</div></section> })}</div></div>
    {feedback && <div role="status" className="sr-only">{feedback}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>New task</DialogTitle><DialogDescription>Add an issue to the board.</DialogDescription></DialogHeader><label className="grid gap-1.5 text-sm">Task title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" /></label><label className="grid gap-1.5 text-sm">Status<Select value={taskColumn} onValueChange={setTaskColumn}><SelectTrigger><span>{columns.find((column) => column.id === taskColumn)?.title}</span></SelectTrigger><SelectContent position="popper" align="start">{columns.map((column) => <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>)}</SelectContent></Select></label><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={createTask}>Create task</Button></DialogFooter></DialogContent></Dialog>
  </section>
}

function ProgressRing({ value }: { value?: number }) {
  const stroke = value === undefined ? "text-muted-foreground/30" : value >= 75 ? "text-success" : value >= 40 ? "text-warning" : "text-destructive"
  return <span className="relative grid size-5 shrink-0 place-items-center"><svg viewBox="0 0 20 20" className={`size-5 -rotate-90 ${stroke}`} aria-label={value === undefined ? "No progress" : `${value}% complete`}><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20"/><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={`${2 * Math.PI * 7}`} strokeDashoffset={`${2 * Math.PI * 7 * (1 - (value ?? 0) / 100)}`} strokeLinecap="round"/></svg>{value !== undefined && <span className="sr-only">{value}%</span>}</span>
}
