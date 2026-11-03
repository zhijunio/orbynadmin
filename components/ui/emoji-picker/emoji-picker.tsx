"use client"

import * as React from "react"
import { IconSearch, IconX } from "@tabler/icons-react"

import { Button } from "@/components/ui/buttons/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover"
import { cn } from "@/utils/cn"

export type EmojiCategory = "people" | "nature" | "food" | "activity" | "travel" | "objects" | "symbols"
export type EmojiOption = { emoji: string; name: string; category: EmojiCategory; shortcode: string; safe?: boolean; custom?: boolean }

export const emojiOptions: EmojiOption[] = [
  { emoji: "😀", name: "grinning face", category: "people", shortcode: ":grinning:", safe: true }, { emoji: "🙂", name: "slightly smiling face", category: "people", shortcode: ":slight_smile:", safe: true }, { emoji: "😎", name: "smiling face with sunglasses", category: "people", shortcode: ":sunglasses:", safe: true }, { emoji: "👏", name: "clapping hands", category: "people", shortcode: ":clap:", safe: true }, { emoji: "🙌", name: "raising hands", category: "people", shortcode: ":raised_hands:", safe: true }, { emoji: "👍", name: "thumbs up", category: "people", shortcode: ":+1:", safe: true },
  { emoji: "🐶", name: "dog face", category: "nature", shortcode: ":dog:", safe: true }, { emoji: "🌱", name: "seedling", category: "nature", shortcode: ":seedling:", safe: true }, { emoji: "🌈", name: "rainbow", category: "nature", shortcode: ":rainbow:", safe: true }, { emoji: "🌟", name: "glowing star", category: "nature", shortcode: ":star2:", safe: true },
  { emoji: "☕", name: "hot beverage", category: "food", shortcode: ":coffee:", safe: true }, { emoji: "🍕", name: "pizza", category: "food", shortcode: ":pizza:", safe: true }, { emoji: "🍺", name: "beer mug", category: "food", shortcode: ":beer:", safe: false }, { emoji: "🎉", name: "party popper", category: "activity", shortcode: ":tada:", safe: true }, { emoji: "🚀", name: "rocket", category: "travel", shortcode: ":rocket:", safe: true }, { emoji: "💡", name: "light bulb", category: "objects", shortcode: ":bulb:", safe: true }, { emoji: "✅", name: "check mark button", category: "symbols", shortcode: ":white_check_mark:", safe: true },
]

const categoryNames: Record<EmojiCategory, { en: string; zh: string }> = {
  people: { en: "People", zh: "人物" }, nature: { en: "Nature", zh: "自然" }, food: { en: "Food", zh: "食物" }, activity: { en: "Activity", zh: "活动" }, travel: { en: "Travel", zh: "旅行" }, objects: { en: "Objects", zh: "物品" }, symbols: { en: "Symbols", zh: "符号" },
}

export function EmojiPickerPanel({ onSelect, value, onValueChange, safeOnly = false, locale = "en", customEmojis = [], className }: {
  onSelect?: (emoji: EmojiOption) => void
  value?: string
  onValueChange?: (emoji: string) => void
  safeOnly?: boolean
  locale?: "en" | "zh"
  customEmojis?: EmojiOption[]
  className?: string
}) {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<EmojiCategory | "custom">("people")
  const [recent, setRecent] = React.useState<string[]>([])
  const available = [...(category === "custom" ? customEmojis : emojiOptions.filter((item) => item.category === category)), ...((category === "people" && customEmojis.length) ? customEmojis : [])].filter((item) => !safeOnly || item.safe)
  const filtered = available.filter((item) => `${item.name} ${item.shortcode}`.toLowerCase().includes(query.toLowerCase().replaceAll(":", "")))
  function choose(item: EmojiOption) { onValueChange?.(item.emoji); onSelect?.(item); setRecent((current) => [item.emoji, ...current.filter((emoji) => emoji !== item.emoji)].slice(0, 6)) }
  const categories: (EmojiCategory | "custom")[] = ["people", "nature", "food", "activity", "travel", "objects", "symbols", ...(customEmojis.length ? ["custom" as const] : [])]
  return <div className={cn("w-72 rounded-xl border border-border bg-popover text-popover-foreground shadow-sm", className)}>
    <div className="flex items-center gap-2 border-b px-3"><IconSearch className="size-4 text-muted-foreground" /><input aria-label={locale === "zh" ? "搜索表情" : "Search emoji"} value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder={locale === "zh" ? "搜索表情" : "Search emoji"} className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><IconX className="size-4 text-muted-foreground" /></button>}</div>
    <div className="flex gap-1 overflow-x-auto border-b px-2 py-1">{categories.map((id) => <button key={id} type="button" aria-label={id === "custom" ? "Custom emoji" : categoryNames[id][locale]} aria-pressed={category === id} onClick={() => setCategory(id)} className={cn("shrink-0 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted", category === id && "bg-muted text-foreground")}>{id === "custom" ? "Team" : categoryNames[id][locale]}</button>)}</div>
    {recent.length > 0 && !query && <div className="flex gap-1 border-b px-2 py-1" aria-label="Recently used emoji">{recent.map((emoji) => <span key={emoji} className="text-xs">{emoji}</span>)}</div>}
    <div className="grid max-h-48 grid-cols-8 gap-1 overflow-y-auto p-2" role="listbox" aria-label={locale === "zh" ? "表情" : "Emoji"}>{filtered.map((item) => <button key={`${item.shortcode}-${item.name}`} type="button" role="option" aria-selected={value === item.emoji} aria-label={`${item.name} ${item.shortcode}`} title={`${item.name} ${item.shortcode}`} onClick={() => choose(item)} className={cn("grid size-8 place-items-center rounded-md text-xl hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === item.emoji && "bg-accent")}>{item.emoji}</button>)}</div>
    <div className="min-h-8 border-t px-3 py-2 text-xs text-muted-foreground" aria-live="polite">{filtered.length ? `${filtered.length} ${locale === "zh" ? "个表情" : "emoji"}` : locale === "zh" ? "没有匹配的表情" : "No matching emoji"}</div>
  </div>
}

export function EmojiPicker({ value, defaultValue, onValueChange, triggerLabel = "Choose emoji", safeOnly, locale, customEmojis, className }: {
  value?: string
  defaultValue?: string
  onValueChange?: (emoji: string) => void
  triggerLabel?: string
  safeOnly?: boolean
  locale?: "en" | "zh"
  customEmojis?: EmojiOption[]
  className?: string
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value ?? internal
  function change(next: string) { if (value === undefined) setInternal(next); onValueChange?.(next) }
  return <Popover><PopoverTrigger asChild><Button type="button" variant="outline" size="icon" aria-label={triggerLabel} className={className}>{current || "☺"}</Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0"><EmojiPickerPanel value={current} onValueChange={change} safeOnly={safeOnly} locale={locale} customEmojis={customEmojis} /></PopoverContent></Popover>
}

export function EmojiShortcodeSuggestions({ query, onSelect, className }: { query: string; onSelect: (emoji: EmojiOption) => void; className?: string }) {
  const normalized = query.trim().replace(/^:/, "").toLowerCase()
  const matches = emojiOptions.filter((item) => item.shortcode.replaceAll(":", "").includes(normalized) || item.name.includes(normalized)).slice(0, 5)
  if (!normalized || matches.length === 0) return null
  return <div role="listbox" aria-label="Emoji suggestions" className={cn("grid gap-1 rounded-lg border bg-popover p-1 shadow-md", className)}>{matches.map((item) => <button key={item.shortcode} type="button" role="option" aria-selected="false" onClick={() => onSelect(item)} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"><span className="text-lg">{item.emoji}</span><span className="flex-1">{item.name}</span><span className="text-xs text-muted-foreground">{item.shortcode}</span></button>)}</div>
}
