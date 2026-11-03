"use client"

import { useRef, useState } from "react"
import { IconMessageCircle, IconPaperclip, IconSend, IconSparkles } from "@tabler/icons-react"

import AppShell from "@/components/blocks/application/app-shell/app-shell"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { PageHeader } from "@/components/custom/docs/page-header"
import { Button } from "@/components/ui/buttons/button"
import { EmojiPicker, EmojiPickerPanel, EmojiShortcodeSuggestions, emojiOptions, type EmojiOption } from "@/components/ui/emoji-picker/emoji-picker"

const teamEmojis: EmojiOption[] = [
  { emoji: "🧑‍🚀", name: "Platform explorer", category: "people", shortcode: ":platform_explorer:", custom: true, safe: true },
  { emoji: "🛠️", name: "Ops toolkit", category: "objects", shortcode: ":ops_toolkit:", custom: true, safe: true },
  { emoji: "🐙", name: "Octo helper", category: "nature", shortcode: ":octo_helper:", custom: true, safe: true },
]

export default function EmojiPickerPageContent() {
  const [reaction, setReaction] = useState("")
  const [reactions, setReactions] = useState<Record<string, number>>({ "🎉": 4, "👍": 2, "🚀": 1 })
  const [icon, setIcon] = useState("📊")
  const [message, setMessage] = useState("")
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  const [sent, setSent] = useState<string[]>([])
  const [shortcode, setShortcode] = useState(":cel")
  const [locale, setLocale] = useState<"en" | "zh">("en")
  function sendMessage() { if (!message.trim()) return; setSent((current) => [...current, message.trim()]); setMessage("") }
  function insertEmoji(emoji: string) {
    const input = messageInputRef.current
    const start = input?.selectionStart ?? message.length
    const end = input?.selectionEnd ?? start
    const next = `${message.slice(0, start)}${emoji}${message.slice(end)}`
    setMessage(next)
    requestAnimationFrame(() => { input?.focus(); input?.setSelectionRange(start + emoji.length, start + emoji.length) })
  }

  return <AppShell><div className="min-w-0 space-y-5"><PageHeader title="Emoji Picker" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
    <ComponentPreview title="Inline Emoji Picker"><EmojiPickerPanel onValueChange={setReaction} value={reaction} /><p className="text-xs text-muted-foreground" aria-live="polite">{reaction ? `Selected ${reaction}` : "Choose a reaction."}</p></ComponentPreview>
    <ComponentPreview title="Chat Composer"><div className="grid w-full max-w-xl gap-3"><div className="flex min-h-11 items-center gap-2 rounded-xl border px-2"><Button variant="ghost" size="icon" aria-label="Attach file"><IconPaperclip /></Button><textarea ref={messageInputRef} rows={1} aria-label="Write a message" value={message} onChange={(event) => setMessage(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage() } }} placeholder="Message the project team..." className="min-w-0 flex-1 resize-none bg-transparent py-2 text-sm outline-none" /><EmojiPicker triggerLabel="Insert emoji" onValueChange={insertEmoji} /><Button size="icon" aria-label="Send message" onClick={sendMessage} disabled={!message.trim()}><IconSend /></Button></div><div className="space-y-1 text-sm">{sent.map((item, index) => <p key={`${item}-${index}`} className="rounded-lg bg-muted px-3 py-2">{item}</p>)}</div></div></ComponentPreview>
    <ComponentPreview title="Message Reactions"><div className="grid w-full gap-3"><div className="flex items-start gap-2 rounded-lg border p-3"><IconMessageCircle className="mt-0.5 size-4 text-muted-foreground" /><p className="text-sm">The release dashboard is ready for review.</p></div><div className="flex flex-wrap items-center gap-2">{Object.entries(reactions).map(([emoji, count]) => <button key={emoji} type="button" aria-pressed={reaction === emoji} onClick={() => { const wasSelected = reaction === emoji; setReaction(wasSelected ? "" : emoji); setReactions((current) => ({ ...current, [emoji]: Math.max(0, current[emoji] + (wasSelected ? -1 : 1)) })) }} className="rounded-full border bg-muted/50 px-2.5 py-1 text-sm hover:bg-muted">{emoji} <span className="text-xs text-muted-foreground">{count}</span></button>)}<EmojiPicker triggerLabel="Add reaction" onValueChange={(emoji) => setReactions((current) => ({ ...current, [emoji]: (current[emoji] ?? 0) + 1 }))} /></div></div></ComponentPreview>
    <ComponentPreview title="Page Icon Picker"><div className="flex w-full items-center gap-3"><div className="grid size-12 place-items-center rounded-xl border bg-muted/40 text-2xl">{icon}</div><div className="min-w-0 flex-1"><p className="text-sm font-medium">Usage overview</p><p className="text-xs text-muted-foreground">Choose an emoji to identify this saved dashboard.</p></div><EmojiPicker value={icon} triggerLabel="Change page icon" onValueChange={setIcon} /></div></ComponentPreview>
    <ComponentPreview title="Custom Team Emoji"><div className="grid w-full gap-3"><EmojiPickerPanel customEmojis={teamEmojis} onSelect={(item) => setReaction(item.emoji)} /><p className="text-xs text-muted-foreground" aria-live="polite">{reaction ? `Selected ${teamEmojis.find((item) => item.emoji === reaction)?.shortcode ?? reaction}` : "Team emoji appear alongside frequently used reactions."}</p></div></ComponentPreview>
    <ComponentPreview title="Shortcode Suggestions"><div className="relative grid w-full max-w-sm gap-2"><label htmlFor="emoji-shortcode" className="text-sm font-medium">Write a comment</label><textarea id="emoji-shortcode" rows={3} value={shortcode} onChange={(event) => setShortcode(event.currentTarget.value)} className="rounded-lg border border-input bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /><EmojiShortcodeSuggestions query={shortcode.split(/\s/).at(-1) ?? ""} className="absolute left-0 top-full z-10 w-full" onSelect={(item) => setShortcode((current) => current.replace(/:[^\s]*$/, item.emoji))} /><p className="text-xs text-muted-foreground">Type a colon shortcode such as <code>:cel</code> and choose a suggestion.</p></div></ComponentPreview>
    <ComponentPreview title="Workplace-Safe Emoji"><div className="grid w-full gap-3"><EmojiPickerPanel safeOnly onValueChange={setReaction} /><p className="text-xs text-muted-foreground">Filters out emoji marked as unsuitable for the company workspace.</p></div></ComponentPreview>
    <ComponentPreview title="Localized Emoji Data and Labels"><div className="grid w-full gap-3"><div className="flex gap-2"><Button size="sm" variant={locale === "en" ? "default" : "outline"} onClick={() => setLocale("en")}>English</Button><Button size="sm" variant={locale === "zh" ? "default" : "outline"} onClick={() => setLocale("zh")}>简体中文</Button></div><EmojiPickerPanel locale={locale} onValueChange={setReaction} value={reaction} /><p className="flex items-center gap-2 text-xs text-muted-foreground"><IconSparkles className="size-4" />{locale === "zh" ? `已选择 ${reaction || "暂无"}，共 ${emojiOptions.length} 个本地表情。` : `Selected ${reaction || "none"}; ${emojiOptions.length} local emoji are available.`}</p></div></ComponentPreview>
  </div></div></AppShell>
}
