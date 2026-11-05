"use client";
import * as React from "react"
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconLoader2 } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Badge } from "@/components/ui/badge/badge"
import { Bubble, BubbleContent, bubbleVariantClass } from "@/components/ui/bubble/bubble"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message/message"
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerViewport } from "@/components/ui/message-scroller/message-scroller"
import { Spinner } from "@/components/ui/spinner/spinner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tabs"

const examples = ["Chat transcript with jump to latest", "Streaming reply that follows the edge", "Anchored turn with a previous peek", "Opening position for a saved thread", "Load earlier without losing your place", "Thread navigator for stepping turns"]
type Turn = { id: string; role: "user" | "assistant"; text: string; author?: string; anchor?: boolean }
const seedTurns: Turn[] = [
  { id: "t1", role: "user", text: "Why did the export miss Friday's data?", author: "Morgan" },
  { id: "t2", role: "assistant", text: "A saved date range excluded the latest rows, and the export inherited that view." },
  { id: "t3", role: "user", text: "Was any customer data lost?", author: "Morgan" },
  { id: "t4", role: "assistant", text: "No. The underlying records are intact; only that export was empty." },
  { id: "t5", role: "user", text: "How do we prevent it happening again?", author: "Morgan" },
  { id: "t6", role: "assistant", text: "We are adding a warning when an export contains no rows after a workspace previously exported data." },
  { id: "t7", role: "user", text: "Please include the alert in the incident review.", author: "Morgan" },
  { id: "t8", role: "assistant", text: "Done. I added the alert, the owner, and the proposed threshold to the review notes." },
  { id: "t9", role: "assistant", text: "The churn breakdown is ready for Thursday's pricing review. Starter accounts account for most cancellations, but only a small share of revenue. The evidence points to an activation problem in the first month rather than a broad pricing issue.\n\nI added the cohort table, first-week invite rate, and median time to cancellation to the review notes. Growth and Scale remain stable, so the proposed action is to improve onboarding for Starter and keep the existing renewal plan for larger accounts.\n\nThe team can review the updated analysis with Product on Thursday, then decide whether to run an onboarding experiment for the next cohort." },
]
const replies = ["The export job was healthy, but the saved view had a date range that left out the newest records.", "I checked the audit log. The active filter changed shortly before the export started.", "No records were deleted. I have added a zero-row warning to the follow-up plan."]
const streamReply = "The anomaly is isolated to the export view. Records remain available, and the zero-row guard is now in the incident plan."

function jumpToMessage(exampleIndex: number, id: string, peek = 64) {
  window.requestAnimationFrame(() => {
    const root = document.querySelector<HTMLElement>(`[data-scroll-demo="${exampleIndex}"]`)
    const viewport = root?.querySelector<HTMLElement>("[data-slot=message-scroller-viewport]")
    const target = [...(viewport?.querySelectorAll<HTMLElement>("[data-message-id]") ?? [])].find((node) => node.dataset.messageId === id)
    if (viewport && target) {
      const top = target.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop
      viewport.scrollTo({ top: Math.max(0, top - peek), behavior: "smooth" })
    }
  })
}

function ThreadTurn({ turn }: { turn: Turn }) {
  const outgoing = turn.role === "user"
  return <Message align={outgoing ? "end" : "start"} className="gap-2 px-3 py-1">{!outgoing && <MessageAvatar><Avatar size="xs"><AvatarFallback>NR</AvatarFallback></Avatar></MessageAvatar>}<MessageContent className="max-w-[85%]"><Bubble variant={outgoing ? "default" : "muted"} align={outgoing ? "end" : "start"}><BubbleContent className={`${bubbleVariantClass(outgoing ? "default" : "muted")} whitespace-pre-wrap`}>{turn.text}</BubbleContent></Bubble><span className="px-2 pt-1 text-[10px] text-muted-foreground">{turn.author ?? "NextRose Assistant"}</span></MessageContent></Message>
}

function Transcript({ turns, busy = false, ariaLabel }: { turns: Turn[]; busy?: boolean; ariaLabel: string }) {
  return <MessageScroller className="h-72 w-full max-w-lg rounded-xl border border-border bg-card sm:h-80"><MessageScrollerViewport aria-label={ariaLabel} className="scroll-smooth"><MessageScrollerContent aria-busy={busy} className="justify-end py-3">{turns.map((turn) => <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.anchor}><ThreadTurn turn={turn} /></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" size="sm"><IconArrowDown /></MessageScrollerButton></MessageScroller>
}

function ScrollDemo({ index }: { index: number }) {
  const [turns, setTurns] = React.useState<Turn[]>(seedTurns)
  const [streaming, setStreaming] = React.useState(true)
  const [streamText, setStreamText] = React.useState("")
  const [question, setQuestion] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [opening, setOpening] = React.useState("last-anchor")
  const [visibleCount, setVisibleCount] = React.useState(6)
  const [historyLoading, setHistoryLoading] = React.useState(false)
  const [questionIndex, setQuestionIndex] = React.useState(0)

  React.useEffect(() => {
    if (index !== 1 || !streaming) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => { setStreamText(streamReply); setStreaming(false) }, 0)
      return () => window.clearTimeout(timer)
    }
    let cursor = 0
    let interval: number | undefined
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        cursor = Math.min(cursor + 4, streamReply.length)
        setStreamText(streamReply.slice(0, cursor))
        if (cursor >= streamReply.length) { window.clearInterval(interval); setStreaming(false) }
      }, 28)
    }, 900)
    return () => { window.clearTimeout(timer); if (interval !== undefined) window.clearInterval(interval) }
  }, [index, streaming])

  React.useEffect(() => {
    if (index === 3) {
      const target = opening === "start" ? "t1" : opening === "last-anchor" ? "t7" : "t9"
      jumpToMessage(3, target, 0)
    }
  }, [index, opening])

  React.useEffect(() => {
    if (index !== 2) return
    jumpToMessage(2, "t5", 64)
  }, [index])

  React.useEffect(() => {
    if (index !== 4 || !historyLoading) return
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 5, 16))
      setHistoryLoading(false)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [index, historyLoading])

  if (index === 0) return <div className="relative w-full max-w-lg"><Transcript turns={seedTurns} ariaLabel="Incident review conversation" /></div>
  if (index === 1) return <div data-scroll-demo="1" className="grid w-full max-w-lg gap-2"><div className="flex items-center justify-between"><Badge variant={streaming ? "secondary" : "outline"}>{streaming ? <><IconLoader2 className="animate-spin" />Working</> : "Complete"}</Badge><Button size="sm" variant="outline" onClick={() => { setStreamText(""); setStreaming(true) }}>Replay stream</Button></div><MessageScroller className="h-72 w-full rounded-xl border border-border bg-card"><MessageScrollerViewport aria-label="Streaming incident conversation"><MessageScrollerContent aria-busy={streaming} className="justify-end py-3"><MessageScrollerItem messageId="stream-question"><ThreadTurn turn={{ id: "stream-question", role: "user", author: "Morgan", text: "What is the export incident impact?" }} /></MessageScrollerItem><MessageScrollerItem messageId="stream-reply"><Message align="start" className="gap-2 px-3 py-1"><MessageAvatar><Avatar size="xs"><AvatarFallback>NR</AvatarFallback></Avatar></MessageAvatar><MessageContent className="max-w-[85%]"><Bubble variant="muted" aria-busy={streaming}><BubbleContent className={`${bubbleVariantClass("muted")} whitespace-pre-wrap`}><span role="status" aria-live="polite">{streaming && !streamText ? <span className="flex items-center gap-2 text-muted-foreground"><Spinner size="sm" label="Generating response" />Generating response…</span> : <>{streamText}{streaming && <span className="ml-0.5 animate-pulse motion-reduce:animate-none" aria-hidden="true">▍</span>}</>}</span></BubbleContent></Bubble></MessageContent></Message></MessageScrollerItem></MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" /></MessageScroller></div>
  if (index === 2) return <div data-scroll-demo="2" className="grid w-full max-w-lg gap-3"><MessageScroller className="h-72 w-full rounded-xl border border-border bg-card"><MessageScrollerViewport aria-label="Support conversation"><MessageScrollerContent className="justify-end py-3">{turns.map((turn) => <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.role === "user"}><ThreadTurn turn={turn} /></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" /></MessageScroller><form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); const text = question.trim(); if (!text || loading) return; const id = `q-${Date.now()}`; setTurns((current) => [...current, { id, role: "user", author: "Morgan", text, anchor: true }]); setQuestion(""); setLoading(true); jumpToMessage(2, id); window.setTimeout(() => { setTurns((current) => [...current, { id: `a-${id}`, role: "assistant", text: replies[(current.length - seedTurns.length) % replies.length] }]); setLoading(false) }, 900) }}><Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the incident…" aria-label="Your message" /><Button type="submit" disabled={loading || !question.trim()}>{loading ? "Sending…" : "Send"}</Button></form></div>
  if (index === 3) return <div data-scroll-demo="3" className="grid w-full max-w-lg gap-3"><Tabs value={opening} onValueChange={setOpening}><TabsList><TabsTrigger value="start">Start</TabsTrigger><TabsTrigger value="last-anchor">Last anchor</TabsTrigger><TabsTrigger value="end">Latest</TabsTrigger></TabsList></Tabs><MessageScroller className="h-72 w-full rounded-xl border border-border bg-card"><MessageScrollerViewport aria-label="Saved incident thread"><MessageScrollerContent className="justify-end py-3"><MessageScrollerItem className="px-3 py-2 text-center text-xs text-muted-foreground">Tuesday, November 3</MessageScrollerItem>{seedTurns.map((turn) => <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.role === "user"}><ThreadTurn turn={turn} /></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" /></MessageScroller></div>
  if (index === 4) {
    const history = Array.from({ length: 16 }, (_, index) => ({ id: `history-${index + 1}`, role: index % 2 === 0 ? "user" as const : "assistant" as const, author: index % 2 === 0 ? "Morgan" : undefined, text: index % 2 === 0 ? `Follow-up question ${index + 1}: what changed in the export workflow?` : `Update ${index + 1}: the export now reports its active filter and records written.` }))
    const shown = history.slice(16 - visibleCount)
    return <div data-scroll-demo="4" className="grid w-full max-w-lg gap-2"><div className="flex items-center justify-between"><Button size="sm" variant="outline" disabled={visibleCount >= history.length || historyLoading} onClick={() => setHistoryLoading(true)}>{historyLoading ? <><Spinner size="sm" label="Loading earlier messages" />Loading…</> : "Load earlier"}</Button><Badge variant="outline">{visibleCount === history.length ? `All ${history.length} messages loaded` : `${visibleCount} of ${history.length} messages`}</Badge></div><MessageScroller className="h-72 w-full rounded-xl border border-border bg-card"><MessageScrollerViewport aria-label="Earlier support conversation"><MessageScrollerContent aria-busy={historyLoading} className="justify-end py-3">{shown.map((turn) => <MessageScrollerItem key={turn.id} messageId={turn.id}><ThreadTurn turn={turn} /></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" /></MessageScroller></div>
  }
  const anchors = turns.filter((turn) => turn.role === "user")
  const current = Math.min(questionIndex, Math.max(anchors.length - 1, 0))
  return <div data-scroll-demo="5" className="grid w-full max-w-lg gap-2"><div className="flex items-center justify-between"><Button size="sm" variant="outline" disabled={current === 0} onClick={() => { const next = Math.max(0, current - 1); setQuestionIndex(next); jumpToMessage(5, anchors[next]?.id ?? "") }}><IconArrowLeft />Previous</Button><span className="text-xs tabular-nums text-muted-foreground">Question {current + 1} of {anchors.length}</span><Button size="sm" variant="outline" disabled={current >= anchors.length - 1} onClick={() => { const next = Math.min(anchors.length - 1, current + 1); setQuestionIndex(next); jumpToMessage(5, anchors[next]?.id ?? "") }}>Next<IconArrowRight /></Button></div><MessageScroller className="h-72 w-full rounded-xl border border-border bg-card"><MessageScrollerViewport aria-label="Navigable incident conversation"><MessageScrollerContent className="justify-end py-3">{turns.map((turn) => <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.role === "user"}><ThreadTurn turn={turn} /></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="end" /></MessageScroller><p className="line-clamp-2 text-xs text-muted-foreground">{anchors[current]?.text}</p></div>
}

export function MessageScrollerCatalogExamples() {
  return (
    <>
      {examples.map((title, index) => <ComponentPreview key={title} title={title} layout="anchor"><ScrollDemo index={index} /></ComponentPreview>)}
    </>
  );
}
