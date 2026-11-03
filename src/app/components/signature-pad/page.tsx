"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconDownload, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Badge } from "@/components/ui/badges/badge";
import { Button } from "@/components/ui/buttons/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Frame, FramePanel } from "@/components/ui/frame/frame";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Kbd, KbdGroup } from "@/components/ui/kbd/kbd";
import { Separator } from "@/components/ui/divider/separator";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadPreview, SignaturePadRedo, SignaturePadSave, SignaturePadUndo, type SignaturePadApi, type SignaturePadFormat, type SignaturePadPointerType, type SignaturePadStroke } from "@/components/ui/signature-pad/signature-pad";
import { Switch } from "@/components/ui/switch/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";

const exportFormats: { format: SignaturePadFormat; label: string; extension: string }[] = [
  { format: "png", label: "PNG", extension: "png" },
  { format: "jpeg", label: "JPEG", extension: "jpg" },
  { format: "svg", label: "SVG", extension: "svg" },
  { format: "json", label: "JSON", extension: "json" },
];

const clauses = [
  { id: "scope", number: 2, title: "Scope of work", description: "Design and build of the workspace portal." },
  { id: "payment", number: 3, title: "Payment terms", description: "Invoices are due within 30 days." },
  { id: "ownership", number: 4, title: "Ownership", description: "Source files transfer after final payment." },
  { id: "termination", number: 5, title: "Termination", description: "Either party may end the agreement with notice." },
];

function PinnedActionsExample() {
  const [saved, setSaved] = useState<SignaturePadStroke[]>([]);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <SignaturePad>
        <SignaturePadArea variant="muted" className="h-52">
          <SignaturePadGuide />
          <SignaturePadPlaceholder />
          <SignaturePadControls position="bottom-end">
            <SignaturePadClear />
            <SignaturePadSave format="json" onSave={(_, strokes) => setSaved(strokes)} />
          </SignaturePadControls>
        </SignaturePadArea>
      </SignaturePad>
      <div role="status" className="flex min-h-8 items-center gap-3 text-sm text-muted-foreground">
        {saved.length > 0 && <>Saved <SignaturePadPreview strokes={saved} className="h-8 w-auto text-primary" /></>}
      </div>
    </div>
  );
}

function HistoryToolbarExample() {
  return (
    <SignaturePad className="mx-auto w-full max-w-lg">
      <div className="flex items-center gap-2">
        <SignaturePadUndo />
        <SignaturePadRedo />
        <div className="ms-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Z</Kbd></KbdGroup>
          <span>Undo</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>Z</Kbd></KbdGroup>
          <span>Redo</span>
        </div>
        <SignaturePadClear size="sm" className="ms-1">Clear</SignaturePadClear>
      </div>
      <SignaturePadArea className="h-48">
        <SignaturePadGuide />
        <SignaturePadPlaceholder>Draw a signature</SignaturePadPlaceholder>
      </SignaturePadArea>
    </SignaturePad>
  );
}

function FormValidationExample() {
  const id = useId();
  const [invalid, setInvalid] = useState(false);
  const [submitted, setSubmitted] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signature = String(data.get("signature") ?? "");
    setInvalid(!signature);
    setSubmitted(signature ? `Signed by ${String(data.get("name") || "Unnamed signer")}` : "");
  }

  return (
    <form noValidate className="mx-auto w-full max-w-md space-y-4" onSubmit={submit} onReset={() => { setInvalid(false); setSubmitted(""); }}>
      <div className="space-y-2"><Label htmlFor={`${id}-name`}>Full name</Label><Input id={`${id}-name`} name="name" autoComplete="name" placeholder="Maya Chen" /></div>
      <div className="space-y-2">
        <Label id={`${id}-signature`}>Signature</Label>
        <SignaturePad name="signature" format="svg" required onStrokeStart={() => setInvalid(false)}>
          <SignaturePadArea aria-labelledby={`${id}-signature`} aria-describedby={`${id}-hint`} aria-invalid={invalid || undefined} className="h-36">
            <SignaturePadGuide />
          </SignaturePadArea>
        </SignaturePad>
        <p id={`${id}-hint`} className={invalid ? "text-sm text-destructive" : "text-xs text-muted-foreground"}>
          {invalid ? "Sign above before submitting." : "Use a mouse, finger, or stylus."}
        </p>
      </div>
      <div className="flex items-center gap-2"><Button type="submit">Submit</Button><Button type="reset" variant="outline">Reset</Button><p role="status" className="ms-auto text-sm text-muted-foreground">{submitted}</p></div>
    </form>
  );
}

function SigningWorkspaceExample() {
  const padRef = useRef<SignaturePadApi>(null);
  const frameRef = useRef(0);
  const [strokes, setStrokes] = useState<SignaturePadStroke[]>([]);
  const [replay, setReplay] = useState<SignaturePadStroke[] | null>(null);
  const [weight, setWeight] = useState({ label: "Medium", min: 0.8, max: 3.2 });
  const [signed, setSigned] = useState(false);
  const [downloadReady, setDownloadReady] = useState("");
  const weights = [{ label: "Fine", min: 0.5, max: 1.8 }, { label: "Medium", min: 0.8, max: 3.2 }, { label: "Bold", min: 1.6, max: 5.5 }];

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  function playBack() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const total = strokes.reduce((sum, stroke) => sum + stroke.points.length, 0);
    if (total === 0) return;
    const perFrame = Math.max(2, Math.ceil(total / 60));
    let shown = 0;
    const step = () => {
      shown += perFrame;
      let remaining = shown;
      const partial: SignaturePadStroke[] = [];
      for (const stroke of strokes) {
        if (remaining <= 0) break;
        partial.push(remaining >= stroke.points.length ? stroke : { ...stroke, points: stroke.points.slice(0, remaining) });
        remaining -= stroke.points.length;
      }
      if (shown < total) {
        setReplay(partial);
        frameRef.current = requestAnimationFrame(step);
      } else setReplay(null);
    };
    frameRef.current = requestAnimationFrame(step);
  }

  function download(format: "png" | "svg") {
    const value = padRef.current?.serialize(format);
    if (!value) return;
    const link = document.createElement("a");
    link.href = value;
    link.download = `signature.${format}`;
    link.click();
    setDownloadReady(`${format.toUpperCase()} export ready`);
  }

  const locked = signed || replay !== null;
  return (
    <Frame className="mx-auto w-full max-w-xl">
      <FramePanel className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="text-sm font-semibold">Statement of work</h3><p className="mt-1 text-xs text-muted-foreground">Harbor & Pine Design · SOW-2041</p></div>
          <div className="flex items-center gap-2">{signed && <Button variant="ghost" size="sm" onClick={() => { setSigned(false); requestAnimationFrame(() => padRef.current?.focus()); }}>Edit</Button>}<Badge variant={signed ? "default" : "secondary"}>{signed ? "Signed" : "Draft"}</Badge></div>
        </div>
        <p className="text-sm text-muted-foreground">The agreement covers project scope, payment timing, and delivery terms.</p>
        <SignaturePad apiRef={padRef} value={replay ?? strokes} onValueChange={setStrokes} minWidth={weight.min} maxWidth={weight.max} readOnly={locked}>
          <SignaturePadArea aria-label="Client signature" className="h-40"><SignaturePadGuide className="bottom-10" /><SignaturePadPlaceholder /><p aria-hidden="true" className="pointer-events-none absolute bottom-3 start-6 text-xs text-muted-foreground">Daniel Reyes, Client</p></SignaturePadArea>
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {weights.map((option) => <Button key={option.label} size="xs" variant={weight.label === option.label ? "secondary" : "ghost"} disabled={locked} onClick={() => setWeight(option)}>{option.label}</Button>)}
            <Separator orientation="vertical" className="mx-1 my-auto h-4" />
            <SignaturePadUndo variant="ghost" /><SignaturePadRedo variant="ghost" />
            <Button variant="ghost" size="icon-sm" aria-label="Replay signature" disabled={!strokes.length || locked} onClick={playBack}><IconPlayerPlay /></Button>
            <SignaturePadClear variant="ghost" />
            <div className="ms-auto flex gap-1"><Button variant="ghost" size="sm" disabled={!strokes.length || locked} onClick={() => download("png")}><IconDownload data-icon="inline-start" />PNG</Button><Button variant="ghost" size="sm" disabled={!strokes.length || locked} onClick={() => download("svg")}><IconDownload data-icon="inline-start" />SVG</Button></div>
          </div>
        </SignaturePad>
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><span role="status">{downloadReady}</span><span>{signed ? "Signed" : "Awaiting signature"}</span></div>
        <Button className="w-full" disabled={!strokes.length || signed} onClick={() => setSigned(true)}>Sign statement</Button>
      </FramePanel>
    </Frame>
  );
}

function ExportFormatsExample() {
  const [result, setResult] = useState<{ format: SignaturePadFormat; value: string; size: number } | null>(null);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <SignaturePad onValueChange={() => setResult(null)}>
        <SignaturePadArea className="h-44"><SignaturePadGuide /><SignaturePadPlaceholder /></SignaturePadArea>
        <div className="flex flex-wrap items-center gap-1.5">
          {exportFormats.map((item) => <SignaturePadSave key={item.format} format={item.format} size="sm" onSave={(value) => setResult({ format: item.format, value, size: new Blob([value]).size })}>{item.label}</SignaturePadSave>)}
          <SignaturePadClear variant="ghost" size="sm" className="ms-auto">Clear</SignaturePadClear>
        </div>
      </SignaturePad>
      {result && <Frame spacing="sm"><FramePanel className="space-y-2"><div className="flex items-center gap-2 text-sm"><span className="font-medium">{result.format.toUpperCase()}</span><span className="text-xs text-muted-foreground">{(result.size / 1024).toFixed(1)} KB</span><a href={result.format === "json" ? `data:application/json;charset=utf-8,${encodeURIComponent(result.value)}` : result.value} download={`signature.${exportFormats.find((item) => item.format === result.format)?.extension}`} className="ms-auto text-primary underline underline-offset-4">Download</a></div>{result.format === "json" ? <p className="line-clamp-3 break-all font-mono text-xs text-muted-foreground">{result.value}</p> : <Image src={result.value} alt={`Signature exported as ${result.format.toUpperCase()}`} width={320} height={112} unoptimized className="h-28 w-auto" />}</FramePanel></Frame>}
      <p className="sr-only" role="status">{result ? `${result.format.toUpperCase()} export ready` : ""}</p>
    </div>
  );
}

function DrawOrTypeExample() {
  const id = useId();
  const [mode, setMode] = useState("draw");
  const [strokes, setStrokes] = useState<SignaturePadStroke[]>([]);
  const [typed, setTyped] = useState("");
  const [adopted, setAdopted] = useState("");
  const ready = mode === "draw" ? strokes.length > 0 : typed.trim().length > 1;

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <Tabs value={mode} onValueChange={(value) => { setMode(value); setAdopted(""); }}>
        <TabsList><TabsTrigger value="draw">Draw</TabsTrigger><TabsTrigger value="type">Type</TabsTrigger></TabsList>
        <TabsContent value="draw"><SignaturePad value={strokes} onValueChange={(next) => { setStrokes(next); setAdopted(""); }}><SignaturePadArea className="h-40"><SignaturePadGuide /><SignaturePadPlaceholder /><SignaturePadControls><SignaturePadClear variant="ghost" /></SignaturePadControls></SignaturePadArea></SignaturePad></TabsContent>
        <TabsContent value="type"><div className="space-y-3"><div className="space-y-2"><Label htmlFor={`${id}-typed`}>Full name</Label><Input id={`${id}-typed`} value={typed} onChange={(event) => { setTyped(event.currentTarget.value); setAdopted(""); }} autoComplete="name" placeholder="Maya Chen" /></div><p aria-hidden="true" className="flex h-20 items-center justify-center border-b border-dashed px-4">{typed.trim() ? <span className="truncate font-serif text-3xl italic">{typed.trim()}</span> : <span className="text-sm text-muted-foreground">Your typed signature appears here</span>}</p></div></TabsContent>
      </Tabs>
      <div className="flex items-center gap-3"><Button disabled={!ready} onClick={() => setAdopted(mode)}>Adopt and sign</Button><p role="status" className="text-sm text-primary">{adopted ? `${adopted === "draw" ? "Drawn" : "Typed"} signature adopted` : ""}</p></div>
    </div>
  );
}

function AgreementSigningExample() {
  const id = useId();
  const padRef = useRef<SignaturePadApi>(null);
  const [strokes, setStrokes] = useState<SignaturePadStroke[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  return (
    <Frame className="mx-auto w-full max-w-md"><FramePanel className="space-y-4">
      <div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold">Service agreement</h3><p className="mt-1 text-xs text-muted-foreground">Northwind Studio · Annual plan</p></div><div className="flex items-center gap-2">{signedAt && <Button variant="ghost" size="xs" onClick={() => { setSignedAt(null); setStrokes([]); setAgreed(false); requestAnimationFrame(() => padRef.current?.focus()); }}>Start over</Button>}<Badge variant={signedAt ? "default" : "secondary"}>{signedAt ? "Signed" : "Awaiting signature"}</Badge></div></div>
      <p className="text-sm text-muted-foreground">Signing confirms the selected scope, payment schedule, and delivery terms.</p>
      <SignaturePad apiRef={padRef} value={strokes} onValueChange={setStrokes} readOnly={signedAt !== null}><SignaturePadArea aria-label="Client signature" className="h-36"><SignaturePadGuide /><SignaturePadPlaceholder />{!signedAt && <SignaturePadControls><SignaturePadClear variant="ghost" /></SignaturePadControls>}</SignaturePadArea><div className="flex justify-between text-xs text-muted-foreground"><span>Maya Chen, Client</span><span>{signedAt ?? "Date when signed"}</span></div></SignaturePad>
      <div className="flex items-center gap-2"><Checkbox id={`${id}-agree`} checked={agreed} disabled={signedAt !== null} onCheckedChange={(checked) => setAgreed(checked === true)} /><Label htmlFor={`${id}-agree`}>I have read and agree to the agreement</Label></div>
      {signedAt ? <p tabIndex={-1} role="status" className="text-center text-sm font-medium">Agreement signed</p> : <Button className="w-full" disabled={!agreed || strokes.length === 0} onClick={() => setSignedAt(new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date()))}>Sign agreement</Button>}
    </FramePanel></Frame>
  );
}

function ProfileSignatureDialogExample() {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<SignaturePadStroke[]>([]);
  const [draft, setDraft] = useState<SignaturePadStroke[]>([]);
  const editRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <Frame><FramePanel className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-medium">Authorized signature</h3><p className="mt-1 text-xs text-muted-foreground">Used on invoices and purchase orders.</p></div><Button ref={editRef} variant="outline" size="sm" onClick={(event) => { event.currentTarget.focus(); setDraft(signature); setOpen(true); }}>{signature.length ? "Edit" : "Add signature"}</Button>{signature.length > 0 && <div className="flex items-center gap-2"><SignaturePadPreview strokes={signature} className="h-8 w-auto text-primary" /><Button variant="ghost" size="sm" onClick={() => { setSignature([]); editRef.current?.focus(); }}>Remove</Button></div>}</FramePanel></Frame>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="md"><DialogHeader><DialogTitle>Draw your signature</DialogTitle><DialogDescription>Save it to your profile for new documents.</DialogDescription></DialogHeader>
          <SignaturePad value={draft} onValueChange={setDraft}><SignaturePadArea variant="muted" className="h-48"><SignaturePadGuide /><SignaturePadPlaceholder /><SignaturePadControls><SignaturePadUndo /><SignaturePadClear /></SignaturePadControls></SignaturePadArea></SignaturePad>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!draft.length} onClick={() => { setSignature(draft); setOpen(false); }}>Save signature</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StylusModeExample() {
  const id = useId();
  const [penOnly, setPenOnly] = useState(false);
  const [lastInput, setLastInput] = useState<SignaturePadPointerType | null>(null);
  const labels: Record<SignaturePadPointerType, string> = { pen: "Stylus", touch: "Finger", mouse: "Mouse" };

  return (
    <SignaturePad pointerTypes={penOnly ? ["pen"] : undefined} onStrokeStart={({ pointerType }) => setLastInput(pointerType)} className="mx-auto w-full max-w-lg">
      <div className="flex items-center justify-between gap-3"><div><Label htmlFor={`${id}-pen`}>Stylus only</Label><p className="mt-1 text-xs text-muted-foreground">Ignore touch input while drawing with a pen.</p></div><Switch id={`${id}-pen`} checked={penOnly} onCheckedChange={setPenOnly} /></div>
      <SignaturePadArea className="h-48"><SignaturePadGuide /><SignaturePadPlaceholder>{penOnly ? "Sign with a stylus" : "Use a stylus, finger, or mouse"}</SignaturePadPlaceholder><SignaturePadControls><SignaturePadClear variant="ghost" /></SignaturePadControls></SignaturePadArea>
      <p className="text-xs text-muted-foreground">Last input: <span className="font-medium text-foreground">{lastInput ? labels[lastInput] : "None"}</span></p>
    </SignaturePad>
  );
}

function ClauseInitialsExample() {
  const [initialed, setInitialed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const count = clauses.filter((clause) => initialed[clause.id]).length;
  const complete = count === clauses.length;

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium">Initial each clause</p><p className="text-xs text-muted-foreground">Initials confirm that you have reviewed the section.</p></div><Badge variant={complete ? "default" : "secondary"}>{count} of {clauses.length} complete</Badge></div>
      <div className="divide-y rounded-lg border">
        {clauses.map((clause) => {
          const done = initialed[clause.id] === true;
          return <div key={clause.id} className="flex items-center gap-3 px-3 py-2.5"><div className="min-w-0 flex-1"><p className="text-sm font-medium">{clause.number}. {clause.title}</p><p className="text-xs text-muted-foreground">{clause.description}</p></div><SignaturePad minWidth={0.6} maxWidth={2.4} readOnly={submitted} className="w-28" onValueChange={(value) => setInitialed((current) => ({ ...current, [clause.id]: value.length > 0 }))}><SignaturePadArea variant="muted" aria-label={`Initials for ${clause.title}`} className="h-14"><SignaturePadPlaceholder>Initials</SignaturePadPlaceholder>{done && !submitted && <SignaturePadControls position="top-end"><SignaturePadClear variant="ghost" size="icon-xs" /></SignaturePadControls>}</SignaturePadArea></SignaturePad></div>;
        })}
      </div>
      {submitted ? <p role="status" className="text-right text-sm font-medium">Initials submitted</p> : <Button disabled={!complete} className="ms-auto block" onClick={() => setSubmitted(true)}>Submit initials</Button>}
    </div>
  );
}

function ProofOfDeliveryExample() {
  const id = useId();
  const [recipient, setRecipient] = useState("");
  const [strokes, setStrokes] = useState<SignaturePadStroke[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Frame className="mx-auto w-full max-w-sm"><FramePanel className="space-y-4">
      <div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold">Proof of delivery</h3><p className="mt-1 text-xs text-muted-foreground">Order #48213 · 3 parcels</p></div>{confirmed && <Badge variant="default">Delivered</Badge>}</div>
      <div className="space-y-2"><Label htmlFor={`${id}-recipient`}>Received by</Label><Input id={`${id}-recipient`} value={recipient} disabled={confirmed} onChange={(event) => setRecipient(event.currentTarget.value)} placeholder="Recipient name" /></div>
      <div className="space-y-2"><Label id={`${id}-recipient-signature`}>Recipient signature</Label><SignaturePad value={strokes} onValueChange={setStrokes} readOnly={confirmed}><SignaturePadArea aria-labelledby={`${id}-recipient-signature`} className="h-44"><SignaturePadGuide /><SignaturePadPlaceholder>Hand the device to the recipient</SignaturePadPlaceholder>{!confirmed && <SignaturePadControls><SignaturePadUndo variant="ghost" /><SignaturePadClear variant="ghost" /></SignaturePadControls>}</SignaturePadArea></SignaturePad></div>
      {confirmed ? <p role="status" className="text-center text-sm font-medium">Delivered to {recipient.trim()}</p> : <Button className="w-full" disabled={!recipient.trim() || strokes.length === 0} onClick={() => setConfirmed(true)}>Confirm delivery</Button>}
    </FramePanel></Frame>
  );
}

function ApiRefUploadExample() {
  const padRef = useRef<SignaturePadApi>(null);
  const [upload, setUpload] = useState<{ name: string; size: number } | null>(null);
  const [empty, setEmpty] = useState(true);

  async function prepareUpload() {
    const blob = await padRef.current?.toBlob({ scale: 3 });
    if (!blob) return;
    const file = new File([blob], "signature.png", { type: "image/png" });
    setUpload({ name: file.name, size: file.size });
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <SignaturePad apiRef={padRef} onValueChange={(strokes) => { setEmpty(strokes.length === 0); setUpload(null); }}><SignaturePadArea className="h-44"><SignaturePadGuide /><SignaturePadPlaceholder /></SignaturePadArea></SignaturePad>
      <div className="flex items-center gap-2"><Button disabled={empty} onClick={prepareUpload}><IconDownload data-icon="inline-start" />Attach as PNG</Button><Button variant="ghost" disabled={empty} onClick={() => { padRef.current?.clear(); padRef.current?.focus(); }}>Clear</Button><p role="status" className="ms-auto truncate text-sm text-muted-foreground">{upload && `${upload.name} · ${(upload.size / 1024).toFixed(1)} KB`}</p></div>
    </div>
  );
}

export default function SignaturePadPage() {
  return (
    <ConsoleLayout>
      <div className="min-w-0 space-y-5">
        <PageHeader title="Signature Pad" />
        <div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
          <ComponentPreview title="Pinned clear and save actions"><PinnedActionsExample /></ComponentPreview>
          <ComponentPreview title="Undo and redo toolbar"><HistoryToolbarExample /></ComponentPreview>
          <ComponentPreview title="Signature form validation"><FormValidationExample /></ComponentPreview>
          <ComponentPreview title="Signing workspace" className="xl:col-span-2"><SigningWorkspaceExample /></ComponentPreview>
          <ComponentPreview title="Export PNG, JPEG, SVG, or JSON"><ExportFormatsExample /></ComponentPreview>
          <ComponentPreview title="Draw or type"><DrawOrTypeExample /></ComponentPreview>
          <ComponentPreview title="Agreement signing card"><AgreementSigningExample /></ComponentPreview>
          <ComponentPreview title="Signature in a dialog"><ProfileSignatureDialogExample /></ComponentPreview>
          <ComponentPreview title="Stylus mode and palm rejection"><StylusModeExample /></ComponentPreview>
          <ComponentPreview title="Initials for each clause" className="xl:col-span-2"><ClauseInitialsExample /></ComponentPreview>
          <ComponentPreview title="Proof of delivery"><ProofOfDeliveryExample /></ComponentPreview>
          <ComponentPreview title="Export through apiRef"><ApiRefUploadExample /></ComponentPreview>
        </div>
      </div>
    </ConsoleLayout>
  );
}
