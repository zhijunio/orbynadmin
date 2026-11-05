"use client";
import * as React from "react"
import { IconBookmark, IconBell, IconBold, IconHeart, IconItalic, IconPin, IconShare, IconThumbUp, IconRepeat, IconUnderline, IconStrikethrough, IconVolume, IconVolumeOff, IconCheck } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { Badge } from "@/components/ui/badge/badge"
import { Button } from "@/components/ui/button/button"
import { Toggle } from "@/components/ui/toggle/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip"

const examples = ["Basic toggle", "Toggle buttons with outline variant", "Toggle buttons in different sizes", "Toggle with button and icon", "Disabled toggle", "Toggle with icon", "Toggle with notification count badge", "Toggle size variants showcase", "Toggle with icon swap on press", "Toggle with text label that changes", "Social media reaction toggles", "Toggle with tooltip", "Disabled toggle states", "Toggle as mute/unmute button"]

function ToggleDemo({ index }: { index: number }) {
  const [bookmarked, setBookmarked] = React.useState(false)
  const [hearted, setHearted] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const [reactions, setReactions] = React.useState({ like: false, repost: false, share: false, save: false })
  const changeReaction = (key: keyof typeof reactions) => setReactions((current) => ({ ...current, [key]: !current[key] }))
  if (index === 0) return <div className="flex flex-wrap gap-1"><Toggle defaultPressed aria-label="Bold"><IconBold /></Toggle><Toggle aria-label="Italic"><IconItalic /></Toggle><Toggle aria-label="Underline"><IconUnderline /></Toggle></div>
  if (index === 1) return <div className="flex gap-2"><Toggle variant="outline" aria-label="Italic"><IconItalic />Italic</Toggle><Toggle variant="outline" aria-label="Bold"><IconBold />Bold</Toggle></div>
  if (index === 2) return <div className="flex flex-wrap items-center gap-3">{(["sm", "default", "lg"] as const).map((size) => <Toggle key={size} variant="outline" size={size}>{size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}</Toggle>)}</div>
  if (index === 3) return <div className="grid w-full max-w-xs gap-3"><div className="flex items-center gap-2"><Button variant="outline" size="sm">Assign to me</Button><Toggle variant="outline" size="sm"><IconBookmark />Bookmark</Toggle></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Mark complete"><IconCheck /></Button><Toggle variant="outline" className="size-9 p-0" aria-label="Bold"><IconBold /></Toggle></div></div>
  if (index === 4) return <div className="flex flex-wrap gap-3"><Toggle disabled>Default</Toggle><Toggle disabled variant="outline">Outline</Toggle></div>
  if (index === 5) return <Toggle variant="outline" aria-label="Bookmark"><IconBookmark />Bookmark</Toggle>
  if (index === 6) return <Toggle aria-label="Notifications" className="relative"><IconBell /><Badge variant="destructive" className="absolute -top-1.5 -right-1.5 size-4 justify-center p-0 group-aria-pressed/toggle:hidden">3</Badge></Toggle>
  if (index === 7) return <div className="grid w-full max-w-xs gap-3">{(["sm", "default", "lg"] as const).map((size) => <div key={size} className="flex items-center gap-3"><span className="w-16 text-xs text-muted-foreground">{size === "default" ? "Default" : size.toUpperCase()}</span><Toggle size={size} variant="outline" aria-label={`Bookmark ${size}`}><IconBookmark /></Toggle></div>)}</div>
  if (index === 8) return <Toggle pressed={hearted} onPressedChange={setHearted} aria-label={hearted ? "Remove like" : "Like"} className={hearted ? "text-destructive" : ""}><IconHeart className={hearted ? "fill-current" : ""} /></Toggle>
  if (index === 9) return <Toggle variant="outline" pressed={bookmarked} onPressedChange={setBookmarked}><IconBookmark />{bookmarked ? "Bookmarked" : "Bookmark"}</Toggle>
  if (index === 10) return <div className="flex flex-wrap items-center gap-2">{[{ key: "like", label: "Like", Icon: IconThumbUp, count: 24 }, { key: "repost", label: "Repost", Icon: IconRepeat, count: 8 }, { key: "share", label: "Share", Icon: IconShare, count: 3 }, { key: "save", label: "Bookmark", Icon: IconBookmark, count: 12 }].map(({ key, label, Icon, count }) => <div key={key} className="flex items-center gap-1"><Toggle variant="outline" size="sm" pressed={reactions[key as keyof typeof reactions]} onPressedChange={() => changeReaction(key as keyof typeof reactions)} aria-label={label}><Icon /></Toggle><span className="text-xs tabular-nums text-muted-foreground">{count + Number(reactions[key as keyof typeof reactions])}</span></div>)}</div>
  if (index === 11) return <TooltipProvider><Tooltip><TooltipTrigger asChild><Toggle variant="outline" aria-label="Pin to sidebar"><IconPin /></Toggle></TooltipTrigger><TooltipContent>Pin to sidebar</TooltipContent></Tooltip></TooltipProvider>
  if (index === 12) return <div className="flex flex-wrap gap-3"><div className="flex gap-1"><Toggle defaultPressed aria-label="Bold"><IconBold /></Toggle><Toggle aria-label="Italic"><IconItalic /></Toggle></div><div className="flex gap-1"><Toggle variant="outline" aria-label="Underline"><IconUnderline /></Toggle><Toggle variant="outline" aria-label="Strikethrough"><IconStrikethrough /></Toggle></div><Toggle disabled aria-label="Disabled bold"><IconBold /></Toggle><Toggle disabled variant="outline" aria-label="Disabled italic"><IconItalic /></Toggle></div>
  return <Toggle variant="outline" size="lg" pressed={muted} onPressedChange={setMuted} aria-label={muted ? "Unmute audio" : "Mute audio"}>{muted ? <IconVolumeOff /> : <IconVolume />}{muted ? "Muted" : "Sound"}</Toggle>
}

export function ToggleCatalogExamples() {
  return (
    <>
      {examples.map((title, index) => <ComponentPreview key={title} title={title} layout="anchor"> <ToggleDemo index={index} /></ComponentPreview>)}
    </>
  );
}
