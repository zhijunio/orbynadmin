"use client";
import * as React from "react"
import { IconCheck, IconInfoCircle, IconPencil, IconX } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/custom/docs/component-preview"
import { Badge } from "@/components/ui/badge/badge"
import { Button } from "@/components/ui/button/button"
import { Checkbox } from "@/components/ui/checkbox/checkbox"
import { Input } from "@/components/ui/input/input"
import { Label } from "@/components/ui/input/label"
import { Textarea } from "@/components/ui/textarea/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip/tooltip"

const examples = ["Basic label", "Label paired with a checkbox", "Label for a textarea field", "Label in a disabled state", "Label with required indicator", "Label with optional indicator", "Label with tooltip info icon", "Label with badge indicator", "Label with character counter", "Label with helper description text", "Label with error state", "Label with inline edit toggle", "Label with status indicator dot"]

function LabelDemo({ index }: { index: number }) {
  const [bio, setBio] = React.useState("")
  const [editing, setEditing] = React.useState(false)
  const [name, setName] = React.useState("Platform refresh")
  const [invalid, setInvalid] = React.useState(true)

  if (index === 0) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-username">Username</Label><Input id="label-username" placeholder="Enter username" /></div>
  if (index === 1) return <label className="flex items-center gap-2 text-sm"><Checkbox name="terms" id="label-terms" /><span>I agree to the workspace terms</span></label>
  if (index === 2) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-message">Message</Label><Textarea id="label-message" placeholder="Write a message for your team…" /></div>
  if (index === 3) return <div data-disabled="true" className="grid w-full max-w-sm gap-2"><Label htmlFor="label-locked">Workspace ID</Label><Input id="label-locked" disabled defaultValue="ws_84f2c1" /></div>
  if (index === 4) return <form className="grid w-full max-w-sm gap-2" onSubmit={(event) => { event.preventDefault(); event.currentTarget.reportValidity() }}><Label htmlFor="label-required">Work email <span className="text-destructive">*</span></Label><Input id="label-required" type="email" required placeholder="name@company.com" /><Button type="submit" size="sm" className="w-fit">Continue</Button></form>
  if (index === 5) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-optional">Phone number <span className="font-normal text-muted-foreground">(optional)</span></Label><Input id="label-optional" type="tel" placeholder="Add a contact number" /></div>
  if (index === 6) return <TooltipProvider><div className="grid w-full max-w-sm gap-2"><div className="flex items-center gap-1.5"><Label htmlFor="label-api-key">API key</Label><Tooltip><TooltipTrigger type="button" aria-label="Where to find the API key" className="rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"><IconInfoCircle className="size-4" /></TooltipTrigger><TooltipContent>Find this under Developer settings → API keys.</TooltipContent></Tooltip></div><Input id="label-api-key" placeholder="sk_live_…" /></div></TooltipProvider>
  if (index === 7) return <div className="grid w-full max-w-sm gap-2"><div className="flex items-center gap-2"><Label htmlFor="label-webhook">Webhook URL</Label><Badge variant="secondary">Active</Badge></div><Input id="label-webhook" readOnly value="https://api.nextrose.dev/hooks/deploy" /></div>
  if (index === 8) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-bio" className="justify-between">Bio<span className="text-xs tabular-nums text-muted-foreground">{bio.length}/200</span></Label><Textarea id="label-bio" value={bio} maxLength={200} onChange={(event) => setBio(event.target.value)} placeholder="Tell your team what you work on" /></div>
  if (index === 9) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-token">Access token</Label><p id="label-token-help" className="text-xs text-muted-foreground">Create a token in Developer settings. Keep it private.</p><Input id="label-token" aria-describedby="label-token-help" placeholder="Paste a token" /></div>
  if (index === 10) return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-error" className={invalid ? "text-destructive" : ""}>Work email</Label><Input id="label-error" type="email" aria-invalid={invalid} defaultValue="alex@" />{invalid && <p role="alert" className="text-xs text-destructive">Enter a complete work email address.</p>}<Button size="sm" variant="outline" className="w-fit" onClick={() => setInvalid((value) => !value)}>Toggle error state</Button></div>
  if (index === 11) return <div className="grid w-full max-w-sm gap-2"><div className="flex items-center justify-between gap-2"><Label htmlFor="label-project-name">Project name</Label>{editing ? <div className="flex gap-1"><Button size="icon-xs" variant="ghost" aria-label="Save project name" onClick={() => setEditing(false)}><IconCheck /></Button><Button size="icon-xs" variant="ghost" aria-label="Cancel editing" onClick={() => { setName("Platform refresh"); setEditing(false) }}><IconX /></Button></div> : <Button size="icon-xs" variant="ghost" aria-label="Edit project name" onClick={() => setEditing(true)}><IconPencil /></Button>}</div><Input id="label-project-name" value={name} readOnly={!editing} onChange={(event) => setName(event.target.value)} /></div>
  return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-server-status" className="gap-2">Primary API <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span></Label><Input id="label-server-status" readOnly value="Online · 99.98% uptime" /></div>
}

export function LabelCatalogExamples() {
  return (
    <>
      {examples.map((title, index) => <ComponentPreview key={title} title={title} layout="anchor"><LabelDemo index={index} /></ComponentPreview>)}
    </>
  );
}
