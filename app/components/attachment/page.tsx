"use client";

import { useId, useRef, useState } from "react";
import {
  IconAlertTriangle,
  IconArrowUp,
  IconCheck,
  IconClock,
  IconCode,
  IconDownload,
  IconFileSpreadsheet,
  IconFileText,
  IconPaperclip,
  IconPhoto,
  IconRefresh,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { PageHeader } from "@/components/custom/docs/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  type AttachmentState,
} from "@/components/ui/attachment/attachment";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input/input-group";
import { Spinner } from "@/components/ui/spinner/spinner";

const filePool = [
  { id: "report", name: "Quarterly summary.pdf", type: "PDF", size: "1.9 MB", icon: IconFileText },
  { id: "metrics", name: "Usage metrics.csv", type: "CSV", size: "96 KB", icon: IconFileSpreadsheet },
  { id: "snapshot", name: "Project snapshot.png", type: "Image", size: "2.1 MB", icon: IconPhoto },
  { id: "policy", name: "Access policy.md", type: "Document", size: "18 KB", icon: IconFileText },
  { id: "query", name: "Workspace query.sql", type: "SQL", size: "8 KB", icon: IconCode },
];

const imageShots = [
  { id: "one", src: "/images/carousel/carousel-01.png", alt: "Project workspace preview", dimensions: "1600 × 900" },
  { id: "two", src: "/images/carousel/carousel-02.png", alt: "Dashboard overview preview", dimensions: "1600 × 900" },
  { id: "three", src: "/images/carousel/carousel-03.png", alt: "Analytics page preview", dimensions: "1600 × 900" },
  { id: "four", src: "/images/carousel/carousel-04.png", alt: "Team settings preview", dimensions: "1600 × 900" },
];

type UploadRow = {
  id: string;
  name: string;
  note: string;
  detail: string;
  state: AttachmentState;
};

const initialQueue: UploadRow[] = [
  { id: "queued", name: "Workspace guide.pdf", note: "Ready to upload", detail: "1.2 MB", state: "idle" },
  { id: "uploading", name: "Team presentation.mp4", note: "Uploading", detail: "62%", state: "uploading" },
  { id: "processing", name: "Activity export.csv", note: "Scanning", detail: "3.1 MB", state: "processing" },
  { id: "error", name: "Billing summary.xlsx", note: "Connection interrupted", detail: "Retry available", state: "error" },
  { id: "done", name: "Release notes.pdf", note: "Uploaded", detail: "840 KB", state: "done" },
];

const queueIcons = {
  idle: <IconClock />,
  uploading: <Spinner size="sm" />,
  processing: <IconFileText />,
  error: <IconAlertTriangle />,
  done: <IconCheck />,
} satisfies Record<AttachmentState, React.ReactNode>;

function SingleAttachmentExample() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <p className="text-sm">Here is the workspace snapshot from the latest review.</p>
      <Attachment className="w-full">
        <AttachmentMedia><IconPhoto /></AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{filePool[2].name}</AttachmentTitle>
          <AttachmentDescription>{filePool[2].type}<span aria-hidden="true" className="mx-1.5 inline-block size-1 rounded-full bg-muted-foreground/40 align-middle" />{filePool[2].size}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction asChild size="icon-sm" variant="secondary">
            <a href={imageShots[0].src} download aria-label="Download project snapshot"><IconDownload /></a>
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}

function ComposerTrayExample() {
  const id = useId();
  const [attachedIds, setAttachedIds] = useState(["report", "metrics", "snapshot"]);
  const attached = filePool.filter((file) => attachedIds.includes(file.id));
  const next = filePool.find((file) => !attachedIds.includes(file.id));
  const summary = `${attached.length} of ${filePool.length} attached`;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={id} className="sr-only">Message your team</label>
        <InputGroup>
          {attached.length > 0 && <InputGroupAddon align="block-start">
            <AttachmentGroup role="group" aria-label="Attached files">
              {attached.map((file) => {
                const Icon = file.icon;
                return <Attachment key={file.id} size="xs" className="max-w-52">
                  <AttachmentMedia><Icon /></AttachmentMedia>
                  <AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle></AttachmentContent>
                  <AttachmentActions><AttachmentAction type="button" aria-label={`Remove ${file.name}`} onClick={() => setAttachedIds((current) => current.filter((value) => value !== file.id))}><IconX /></AttachmentAction></AttachmentActions>
                </Attachment>;
              })}
            </AttachmentGroup>
          </InputGroupAddon>}
          <InputGroupTextarea id={id} placeholder="Write an update…" className="field-sizing-content max-h-32 min-h-12" />
          <InputGroupAddon align="block-end">
            <InputGroupButton type="button" size="icon-sm" aria-label="Attach a file" disabled={!next} onClick={() => next && setAttachedIds((current) => [...current, next.id])}><IconPaperclip /></InputGroupButton>
            <span className="text-xs text-muted-foreground">{summary}</span>
            <InputGroupButton type="submit" size="icon-sm" variant="default" className="ms-auto" aria-label="Send update"><IconArrowUp /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <span className="sr-only" aria-live="polite">{summary}</span>
    </div>
  );
}

function ImageAttachmentStrip() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = imageShots.find((shot) => shot.id === selectedId);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
      <AttachmentGroup role="group" aria-label="Workspace screenshots">
        {imageShots.map((shot) => <Attachment key={shot.id} orientation="vertical" className="w-32 has-data-[slot=attachment-content]:w-32">
          <AttachmentMedia variant="image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} width={128} height={128} loading="lazy" decoding="async" />
          </AttachmentMedia>
          <AttachmentContent><AttachmentTitle>{shot.alt}</AttachmentTitle></AttachmentContent>
          <AttachmentTrigger type="button" aria-label={`Preview ${shot.alt}`} aria-pressed={selectedId === shot.id} onClick={() => setSelectedId(shot.id)} />
        </Attachment>)}
      </AttachmentGroup>
      <p className="text-xs text-muted-foreground" aria-live="polite">{selected ? `${selected.alt} · ${selected.dimensions}` : "Select a screenshot to view its dimensions."}</p>
    </div>
  );
}

function AttachmentSizesExample() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="space-y-2"><p className="text-xs font-medium text-muted-foreground">Primary deliverable</p><Attachment className="w-full"><AttachmentMedia><IconFileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>Quarterly report.pdf</AttachmentTitle><AttachmentDescription>PDF · 2.3 MB</AttachmentDescription></AttachmentContent></Attachment></div>
      <div className="space-y-2"><p className="text-xs font-medium text-muted-foreground">Supporting files</p><Attachment size="sm" className="w-full"><AttachmentMedia><IconFileSpreadsheet /></AttachmentMedia><AttachmentContent><AttachmentTitle>Usage metrics.csv</AttachmentTitle><AttachmentDescription>CSV · 96 KB</AttachmentDescription></AttachmentContent></Attachment><Attachment size="sm" className="w-full"><AttachmentMedia><IconCode /></AttachmentMedia><AttachmentContent><AttachmentTitle>Data query.sql</AttachmentTitle><AttachmentDescription>SQL · 8 KB</AttachmentDescription></AttachmentContent></Attachment></div>
      <div className="space-y-2"><p className="text-xs font-medium text-muted-foreground">Related items</p><AttachmentGroup tabIndex={0} role="group" aria-label="Related documents"><Attachment size="xs"><AttachmentMedia><IconCode /></AttachmentMedia><AttachmentContent><AttachmentTitle>report-query.sql</AttachmentTitle></AttachmentContent></Attachment><Attachment size="xs"><AttachmentMedia><IconFileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>review-notes.md</AttachmentTitle></AttachmentContent></Attachment><Attachment size="xs"><AttachmentMedia><IconFileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>release-notes.pdf</AttachmentTitle></AttachmentContent></Attachment></AttachmentGroup></div>
    </div>
  );
}

function UploadQueueExample() {
  const [rows, setRows] = useState(initialQueue);
  const uploadedCount = rows.filter((row) => row.state === "done").length;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
      <p className="text-xs text-muted-foreground" aria-live="polite">{uploadedCount} of {rows.length} uploaded</p>
      {rows.map((row) => <Attachment key={row.id} state={row.state} className="w-full">
        <AttachmentMedia>{queueIcons[row.state]}</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{row.name}</AttachmentTitle>
          <AttachmentDescription title={`${row.note} · ${row.detail}`}>{row.note}<span aria-hidden="true" className="mx-1.5 inline-block size-1 rounded-full bg-muted-foreground/40 align-middle" />{row.detail}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          {row.state === "error" && <AttachmentAction type="button" aria-label={`Retry ${row.name}`} onClick={() => setRows((current) => current.map((item) => item.id === row.id ? { ...item, state: "done", note: "Uploaded", detail: "640 KB" } : item))}><IconRefresh /></AttachmentAction>}
          <AttachmentAction type="button" aria-label={row.state === "uploading" || row.state === "processing" ? `Cancel ${row.name}` : `Remove ${row.name}`} onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}><IconX /></AttachmentAction>
        </AttachmentActions>
      </Attachment>)}
      {rows.length === 0 && <p className="text-xs text-muted-foreground">The upload queue is empty.</p>}
    </div>
  );
}

function FilePickerExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const selected = Array.from(fileList);
    if (files.length + selected.length > 5) {
      setError("You can attach up to five files.");
      return;
    }
    if (selected.some((file) => file.size > 10 * 1024 * 1024)) {
      setError("Each attachment must be 10 MB or smaller.");
      return;
    }
    setError("");
    setFiles((current) => [...current, ...selected].slice(0, 5));
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <Attachment state="idle" className="w-full">
        <AttachmentMedia><IconUpload /></AttachmentMedia>
        <AttachmentContent><AttachmentTitle>Choose attachments</AttachmentTitle><AttachmentDescription>Images, PDF, or CSV · up to 10 MB each</AttachmentDescription></AttachmentContent>
        <AttachmentTrigger type="button" aria-haspopup="dialog" aria-label="Choose attachments" onClick={() => inputRef.current?.click()} />
        <input ref={inputRef} className="sr-only" tabIndex={-1} type="file" accept="image/*,.pdf,.csv" multiple aria-label="Choose attachments" onChange={(event) => { handleFiles(event.currentTarget.files); event.currentTarget.value = ""; }} />
      </Attachment>
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
      {files.length > 0 ? <div className="flex flex-col gap-1.5">
        {files.map((file) => <Attachment key={`${file.name}-${file.lastModified}-${file.size}`} state="idle" size="sm" className="w-full">
          <AttachmentMedia><IconFileText /></AttachmentMedia>
          <AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle><AttachmentDescription>{Math.max(1, Math.round(file.size / 1024))} KB</AttachmentDescription></AttachmentContent>
          <AttachmentActions><AttachmentAction type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><IconX /></AttachmentAction></AttachmentActions>
        </Attachment>)}
      </div> : <p className="text-xs text-muted-foreground" aria-live="polite">No attachments selected.</p>}
    </div>
  );
}

export default function AttachmentPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Attachment" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Single attachment in an update"><SingleAttachmentExample /></ComponentPreview>
          <ComponentPreview title="Composer tray with removable attachments" className="xl:col-span-2"><ComposerTrayExample /></ComponentPreview>
          <ComponentPreview title="Image thumbnails in a scrollable strip" className="xl:col-span-2"><ImageAttachmentStrip /></ComponentPreview>
          <ComponentPreview title="Three attachment sizes"><AttachmentSizesExample /></ComponentPreview>
          <ComponentPreview title="Upload queue with all five states" className="xl:col-span-2"><UploadQueueExample /></ComponentPreview>
          <ComponentPreview title="File picker that fills an attachment tray"><FilePickerExample /></ComponentPreview>
        </div>
      </div>
    </AppShell>
  );
}
