"use client";

import { useState } from "react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Label } from "@/components/ui/input/label";
import { Textarea } from "@/components/ui/textarea/textarea";

export default function TextareaPage() {
  const [bio, setBio] = useState("Design engineer. I build dashboards for a living.");

  return (
    <AppShell>
      <div className="min-w-0 space-y-5"><PageHeader title="Textarea" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Textarea Sizes">
          <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="notes">Description</Label>
              <Textarea id="notes" rows={3} autoResize={false} placeholder="Tell us about this workspace" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="short-notes">Description</Label>
              <Textarea id="short-notes" size="small" rows={3} autoResize={false} placeholder="Tell us about this workspace" />
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Auto resize">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="release-notes">Message</Label>
            <Textarea
              id="release-notes"
              rows={2}
              maxRows={8}
              autoResize
              placeholder="Write as much as you need"
              aria-describedby="release-notes-hint"
            />
            <p id="release-notes-hint" className="text-xs text-muted-foreground">The field grows to eight lines, then scrolls.</p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Character count">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              value={bio}
              maxLength={160}
              onChange={(event) => setBio(event.currentTarget.value)}
              placeholder="Write a short bio"
            />
            <div className="flex justify-between gap-4 text-xs text-muted-foreground">
              <span>Appears on your public profile.</span>
              <span className="shrink-0 tabular-nums">{bio.length}/160</span>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Required Empty Field">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="cover-letter-empty">Cover letter <span aria-hidden="true" className="text-destructive">*</span></Label>
            <Textarea id="cover-letter-empty" rows={3} required placeholder="Why are you a good fit?" />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Filled Field with Hint">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="cover-letter-filled">Cover letter <span aria-hidden="true" className="text-destructive">*</span></Label>
            <Textarea id="cover-letter-filled" rows={3} required defaultValue="I have shipped design systems for six years." aria-describedby="cover-letter-filled-hint" />
            <p id="cover-letter-filled-hint" className="text-xs text-muted-foreground">This is a hint about this field.</p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Disabled Textarea">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="disabled-textarea">Cover letter <span aria-hidden="true" className="text-destructive">*</span></Label>
            <Textarea id="disabled-textarea" rows={3} required disabled placeholder="Why are you a good fit?" aria-describedby="disabled-textarea-hint" />
            <p id="disabled-textarea-hint" className="text-xs text-muted-foreground">This is a hint about this field.</p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Invalid Textarea">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="invalid-textarea">Cover letter <span aria-hidden="true" className="text-destructive">*</span></Label>
            <Textarea id="invalid-textarea" rows={3} required aria-invalid defaultValue="Too short." aria-describedby="invalid-textarea-hint" />
            <p id="invalid-textarea-hint" className="text-xs text-destructive">Please write at least 200 characters.</p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Read-only Textarea">
          <div className="grid w-full max-w-md gap-2">
            <Label htmlFor="published-summary">Published summary</Label>
            <Textarea id="published-summary" rows={3} readOnly defaultValue="This summary has been published and can no longer be edited." />
          </div>
        </ComponentPreview>
      </div></div>
    </AppShell>
  );
}
