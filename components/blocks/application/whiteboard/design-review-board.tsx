"use client";

import { useCallback, useId, useRef, useState, type DragEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { convertToExcalidrawElements, viewportCoordsToSceneCoords } from "@excalidraw/excalidraw";
import type { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/data/transform";
import type { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import {
  IconArrowLeft as IconPrevious, IconArrowRight, IconArrowRight as IconNext, IconCheck,
  IconClock, IconDeviceMobile, IconDownload, IconEye, IconFileImport, IconFlag, IconFrame, IconLayoutBoard,
  IconCopy, IconLibrary, IconMessageCircle, IconPlus, IconSearch, IconShare3, IconTarget, IconTemplate, IconUsers, IconX,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover/popover";
import { Switch } from "@/components/ui/switch/switch";
import { WhiteboardEditor, addSceneElements, createBoardExport, downloadBoardExport, readSnapshot, restoreSnapshot, saveBoardFile, openBoardFile, type BoardApi, type BoardSnapshot } from "@/components/blocks/application/whiteboard/excalidraw-editor";
import { createReviewScene, reviewTemplates } from "@/components/blocks/application/whiteboard/whiteboard-data";

type BoardVersion = { id: string; label: string; savedAt: string; snapshot: BoardSnapshot };
type SavedLibraryItem = { id: string; name: string; elements: OrderedExcalidrawElement[] };
type SidebarTab = "frames" | "library" | "history";
type ExportScope = "board" | "frame" | "selection";
type ExportPreview = { format: "png" | "svg"; scope: ExportScope; blob: Blob; url: string };

const viewers = [
  { name: "Maya Chen", initials: "MC", tone: "bg-primary text-primary-foreground" },
  { name: "Owen Diaz", initials: "OD", tone: "bg-info text-info-foreground" },
  { name: "Jules Park", initials: "JP", tone: "bg-success text-success-foreground" },
];
const frames = [
  { name: "Goals", items: 3, icon: IconTarget },
  { name: "User Flow", items: 14, icon: IconArrowRight },
  { name: "Checkout v2", items: 5, icon: IconDeviceMobile },
  { name: "Open Questions", items: 4, icon: IconMessageCircle },
  { name: "Decisions", items: 3, icon: IconFlag },
];
const versionsKey = "nextrose-whiteboard-design-review-versions-v2";
const libraryKey = "nextrose-whiteboard-design-review-library-v2";

export function DesignReviewBoard() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [api, setApi] = useState<BoardApi | null>(null);
  const [saveState, setSaveState] = useState<"ready" | "saving" | "saved">("ready");
  const [activeFrame, setActiveFrame] = useState("Whole Board");
  const [activeTab, setActiveTab] = useState<SidebarTab>("frames");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth >= 1024);
  const [presenting, setPresenting] = useState(false);
  const [viewOnlyLink] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("access") === "view");
  const [shareReadOnly, setShareReadOnly] = useState(viewOnlyLink);
  const readOnly = presenting || viewOnlyLink;
  const [seed] = useState(() => createReviewScene());
  const [boardElements, setBoardElements] = useState<readonly OrderedExcalidrawElement[]>(seed);
  const [versions, setVersions] = useState<BoardVersion[]>(() => readVersions(seed));
  const [pendingVersion, setPendingVersion] = useState<BoardVersion | null>(null);
  const [saveVersionOpen, setSaveVersionOpen] = useState(false);
  const [versionLabel, setVersionLabel] = useState("");
  const [libraryItems, setLibraryItems] = useState<SavedLibraryItem[]>(() => readLibraryItems());
  const [exportPreview, setExportPreview] = useState<ExportPreview | null>(null);
  const [exportBackground, setExportBackground] = useState(true);
  const [exportDarkMode, setExportDarkMode] = useState(false);
  const [exportEditable, setExportEditable] = useState(false);
  const [exportScale, setExportScale] = useState("1");

  const handleElementsChange = useCallback((elements: readonly OrderedExcalidrawElement[]) => {
    setBoardElements(elements);
    const frameIds = new Set(elements.flatMap((element) => element.type === "frame" ? [element.id] : []));
    setActiveFrame((current) => current === "Whole Board" || frameIds.has(current) ? current : "Whole Board");
  }, []);

  const boardFrames = boardElements.filter((element) => element.type === "frame").map((element) => {
    if (element.type !== "frame") return null;
    const preset = frames.find((frame) => frame.name === element.name);
    const members = boardElements.filter((candidate) => candidate.id !== element.id && (
      candidate.frameId === element.id || (candidate.x + candidate.width / 2 >= element.x && candidate.x + candidate.width / 2 <= element.x + element.width && candidate.y + candidate.height / 2 >= element.y && candidate.y + candidate.height / 2 <= element.y + element.height)
    ));
    const itemCount = preset?.items ?? new Set(members.map((member) => typeof member.customData?.boardItemId === "string" ? member.customData.boardItemId : member.id)).size;
    return { name: element.name ?? "Untitled frame", id: element.id, items: itemCount, icon: preset?.icon ?? IconFrame };
  }).filter((frame): frame is NonNullable<typeof frame> => Boolean(frame));
  const totalBoardItems = boardFrames.reduce((total, frame) => total + frame.items, 0);
  const activeFrameLabel = activeFrame === "Whole Board" ? "Whole Board" : boardFrames.find((frame) => frame.id === activeFrame)?.name ?? activeFrame;

  const saveVersion = () => {
    setVersionLabel("");
    setSaveVersionOpen(true);
  };

  const commitSaveVersion = useCallback(() => {
    if (!api || readOnly) return;
    const label = versionLabel.trim();
    if (!label) return;
    const next: BoardVersion = { id: crypto.randomUUID(), label, savedAt: new Date().toISOString(), snapshot: readSnapshot(api) };
    const updated = [next, ...versions].slice(0, 12);
    try {
      localStorage.setItem(versionsKey, JSON.stringify(updated));
      setVersions(updated);
      setSaveVersionOpen(false);
      toast.success("Version saved in this browser");
    } catch {
      toast.error("This version could not be saved. Export a board file instead.");
    }
  }, [api, readOnly, versionLabel, versions]);

  const restoreVersion = useCallback((version: BoardVersion) => {
    if (!api || readOnly) return;
    const previous = readSnapshot(api);
    restoreSnapshot(api, version.snapshot);
    setPendingVersion(null);
    toast.success(`${version.label} restored`, { action: { label: "Undo", onClick: () => restoreSnapshot(api, previous) } });
  }, [api, readOnly]);

  const focusFrame = (identifier: string) => {
    if (identifier === "Whole Board") setActiveFrame(identifier);
    if (!api) { if (identifier !== "Whole Board") setActiveFrame(identifier); return; }
    const elements = api.getSceneElements();
    if (identifier === "Whole Board") api.scrollToContent(elements, { fitToContent: true, animate: true });
    else {
      const target = elements.find((element) => element.type === "frame" && (element.id === identifier || element.name === identifier));
      if (target?.type === "frame") { setActiveFrame(target.id); api.scrollToContent(target, { fitToContent: true, animate: true }); }
    }
  };

  const insertTemplate = (templateId: string, viewportPoint?: { x: number; y: number }) => {
    if (!api || readOnly) return;
    const template = reviewTemplates.find((item) => item.id === templateId);
    if (!template) return;
    const appState = api.getAppState();
    const point = viewportPoint
      ? viewportCoordsToSceneCoords({ clientX: viewportPoint.x, clientY: viewportPoint.y }, appState)
      : null;
    const bounds = getTemplateBounds(template.elements);
    const currentBounds = getSceneBounds(api.getSceneElements());
    const position = point ?? { x: Number.isFinite(currentBounds.right) ? currentBounds.right + 80 : bounds.left, y: Number.isFinite(currentBounds.top) ? currentBounds.top : bounds.top };
    const offsetX = point ? position.x - (bounds.left + bounds.right) / 2 : position.x - bounds.left;
    const offsetY = point ? position.y - (bounds.top + bounds.bottom) / 2 : position.y - bounds.top;
    const idPrefix = `template-${crypto.randomUUID()}`;
    const translated = template.elements.map((element, index) => ({ ...element, id: `${idPrefix}-${element.id ?? index}`, x: (element.x ?? 0) + offsetX, y: (element.y ?? 0) + offsetY }));
    const inserted = convertToExcalidrawElements(translated);
    addSceneElements(api, inserted);
    const firstFrame = inserted.find((element) => element.type === "frame");
    if (firstFrame?.type === "frame") setActiveFrame(firstFrame.id);
    api.scrollToContent(inserted, { fitToContent: true, animate: true });
    toast.success(`${template.name} added to the canvas`);
  };

  const handleTemplateDrop = (event: DragEvent<HTMLElement>) => {
    const templateId = event.dataTransfer.getData("application/x-nextrose-whiteboard-template");
    if (!templateId) return;
    event.preventDefault();
    event.stopPropagation();
    insertTemplate(templateId, { x: event.clientX, y: event.clientY });
  };

  const saveSelection = async () => {
    if (!api || readOnly) return;
    const selectedIds = api.getAppState().selectedElementIds;
    const elements = api.getSceneElements().filter((element) => selectedIds[element.id]);
    if (!elements.length) {
      toast.message("Select one or more shapes on the canvas first");
      return;
    }
    const item = { id: crypto.randomUUID(), name: `Selection ${libraryItems.length + 1}`, elements: [...elements] };
    try {
      await api.updateLibrary({
        libraryItems: [{ id: item.id, created: Date.now(), status: "unpublished", name: item.name, elements: item.elements }],
        merge: true,
      });
      const updated = [item, ...libraryItems];
      setLibraryItems(updated);
      localStorage.setItem(libraryKey, JSON.stringify(updated));
      setActiveTab("library");
      toast.success("Selection saved to the shape library");
    } catch {
      toast.error("Selection could not be added to the library");
    }
  };

  const shareView = async () => {
    try {
      const query = shareReadOnly ? "?access=view" : "";
      await navigator.clipboard.writeText(`${window.location.origin}${pathname}${query}`);
      toast.success(shareReadOnly ? "View-only board link copied" : "Board link copied");
    } catch {
      toast.error("Clipboard access is unavailable. Copy the page URL instead.");
    }
  };

  const handleOpenFile = async (file?: File) => {
    if (!readOnly && file && api) await openBoardFile(api, file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const togglePresentation = () => {
    if (presenting) {
      setPresenting(false);
      return;
    }
    if (activeFrame === "Whole Board" && boardFrames[0]) focusFrame(boardFrames[0].id);
    setPresenting(true);
  };

  const previewExport = async (format: "png" | "svg", scope: ExportScope = "board") => {
    if (!api) return;
    try {
      const allElements = api.getSceneElements();
      const selectedIds = api.getAppState().selectedElementIds;
      const frame = allElements.find((element) => element.type === "frame" && (element.id === activeFrame || ("name" in element && element.name === activeFrame)));
      const frameElements = frame?.type === "frame" ? getFrameElements(allElements, frame) : [];
      const elements = scope === "selection"
        ? allElements.filter((element) => selectedIds[element.id])
        : scope === "frame" && frame?.type === "frame"
          ? frameElements
          : allElements;
      if (scope === "selection" && !elements.length) {
        toast.message("Select canvas shapes before exporting a selection");
        return;
      }
      const blob = await createBoardExport(api, format, { elements, background: exportBackground, darkMode: exportDarkMode, editable: exportEditable, scale: Number(exportScale) });
      if (exportPreview) URL.revokeObjectURL(exportPreview.url);
      setExportPreview({ format, scope, blob, url: URL.createObjectURL(blob) });
    } catch {
      toast.error("The board preview could not be created.");
    }
  };

  const closeExportPreview = () => {
    if (exportPreview) URL.revokeObjectURL(exportPreview.url);
    setExportPreview(null);
  };

  const copyExportPreview = async () => {
    if (!exportPreview) return;
    try {
      if (exportPreview.format === "png") await navigator.clipboard.write([new ClipboardItem({ "image/png": exportPreview.blob })]);
      else await navigator.clipboard.writeText(await exportPreview.blob.text());
      toast.success("Export copied to clipboard");
    } catch {
      toast.error("Clipboard access is unavailable. Download the export instead.");
    }
  };

  const filteredFrames = boardFrames.filter((frame) => frame.name.toLowerCase().includes(search.toLowerCase()));
  const searchMatches = search.trim() ? boardElements.filter((element): element is Extract<OrderedExcalidrawElement, { type: "text" }> => element.type === "text" && element.text.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 8) : [];

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="min-w-0"><h1 className="truncate text-sm font-medium">Checkout Review</h1></div>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><IconCheck className="size-3.5" /><span className="hidden sm:inline">{saveState === "saving" ? "Saving…" : "Saved"}</span></span>
          {viewOnlyLink && <Badge variant="outline" size="sm">View only</Badge>}
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden -space-x-2 lg:flex" aria-label="Demo board participants">{viewers.map((viewer) => <Avatar key={viewer.initials} className="size-7 border-2 border-background" title={viewer.name}><AvatarFallback className={`text-[9px] ${viewer.tone}`}>{viewer.initials}</AvatarFallback></Avatar>)}</div>
          <Popover><PopoverTrigger asChild><Button variant="outline" size="sm" className="px-2 lg:px-3" aria-label="Share board"><IconShare3 /><span className="hidden lg:inline">Share</span></Button></PopoverTrigger><PopoverContent align="end" className="gap-3"><PopoverHeader><PopoverTitle>Share board</PopoverTitle><PopoverDescription>Copy a link to this board.</PopoverDescription></PopoverHeader><label className="flex items-center justify-between gap-3 rounded-md border p-2.5 text-xs"><span><span className="block font-medium">View only</span><span className="mt-0.5 block text-muted-foreground">Prevent editing from this link</span></span><Switch checked={shareReadOnly} onCheckedChange={setShareReadOnly} aria-label="View only link" /></label><Button size="sm" onClick={() => void shareView()}><IconShare3 />Copy link</Button></PopoverContent></Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="px-2 lg:px-3" aria-label="Export board"><IconDownload /><span className="hidden lg:inline">Export</span></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled={!api} onSelect={() => void previewExport("png", "board")}>Preview board PNG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api} onSelect={() => void previewExport("svg", "board")}>Preview board SVG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api || activeFrame === "Whole Board"} onSelect={() => void previewExport("png", "frame")}>Preview current frame PNG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api || activeFrame === "Whole Board"} onSelect={() => void previewExport("svg", "frame")}>Preview current frame SVG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api} onSelect={() => void previewExport("png", "selection")}>Preview selection PNG</DropdownMenuItem>
              <DropdownMenuItem disabled={!api} onSelect={() => void previewExport("svg", "selection")}>Preview selection SVG</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={!api} onSelect={() => api && saveBoardFile(api, "checkout-review")}>Save board file</DropdownMenuItem>
              <DropdownMenuItem disabled={readOnly} onSelect={() => fileInputRef.current?.click()}><IconFileImport />Open board file</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input ref={fileInputRef} className="sr-only" type="file" accept=".excalidraw,.json,application/json" onChange={(event) => void handleOpenFile(event.currentTarget.files?.[0])} />
          <Button variant={presenting ? "secondary" : "ghost"} size="icon-sm" aria-label={presenting ? "Exit presentation" : "Present board"} aria-pressed={presenting} onClick={togglePresentation}><IconEye /></Button>
          <Button variant="ghost" size="icon-sm" aria-label={sidebarOpen ? "Hide board sidebar" : "Show board sidebar"} aria-pressed={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}><IconLayoutBoard /></Button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <section aria-label="Design review canvas" className="relative min-h-0 min-w-0 flex-1" onDragOver={(event) => { if (event.dataTransfer.types.includes("application/x-nextrose-whiteboard-template")) { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; } }} onDrop={handleTemplateDrop}>
          <WhiteboardEditor boardId="design-review-v2" name="Checkout Review" seed={seed} onApi={setApi} onSaveState={setSaveState} onElementsChange={handleElementsChange} presentationFrame={presenting ? activeFrame : undefined} readOnly={readOnly} />
          <div className="absolute bottom-3 right-4 z-10 flex h-8 items-center gap-2 rounded-lg border bg-background/95 px-2 shadow-sm">
            <button type="button" className="grid size-6 place-items-center rounded hover:bg-muted" aria-label="Previous frame" onClick={() => moveFrame(-1)}><IconPrevious className="size-4" /></button>
            <button type="button" className="inline-flex min-w-28 items-center justify-center gap-1 text-xs text-muted-foreground" onClick={() => focusFrame("Whole Board")}><IconFrame className="size-3.5" />{activeFrame === "Whole Board" ? `${boardFrames.length} Frames` : activeFrameLabel}</button>
            <button type="button" className="grid size-6 place-items-center rounded hover:bg-muted" aria-label="Next frame" onClick={() => moveFrame(1)}><IconNext className="size-4" /></button>
          </div>
        </section>

        {sidebarOpen && <aside className="absolute inset-y-0 right-0 z-20 flex w-[min(19rem,88vw)] shrink-0 flex-col border-l bg-background lg:static lg:w-[18rem]">
          <div className="flex h-11 shrink-0 items-center gap-1 border-b px-2">
            {(["frames", "library", "history"] as SidebarTab[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`flex h-8 flex-1 items-center justify-center rounded-md text-xs font-medium capitalize transition-colors ${activeTab === tab ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{tab}</button>)}
            <button type="button" className="ml-1 grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted lg:hidden" aria-label="Close board sidebar" onClick={() => setSidebarOpen(false)}><IconX className="size-4" /></button>
          </div>

          <AnimatePresence initial={false} mode="wait">
          {activeTab === "frames" && <motion.div key="frames-panel" initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }} className="min-h-0 flex-1 overflow-y-auto p-3">
            <label className="relative mb-3 block"><IconSearch className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="h-9 w-full rounded-lg border bg-background pl-8 pr-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Search frames and board text" /></label>
            {search.trim() && <div className="mb-3 grid gap-1" aria-label="Board text matches">{searchMatches.length ? searchMatches.map((element) => <button key={element.id} type="button" onClick={() => { const frame = api?.getSceneElements().find((item) => item.id === element.frameId); if (frame?.type === "frame") setActiveFrame(frame.id); api?.scrollToContent(element, { fitToContent: true, animate: true }); }} className="rounded-md px-2 py-1.5 text-left hover:bg-muted"><span className="block truncate text-xs">{element.text.replaceAll("\n", " · ")}</span><span className="text-[10px] text-muted-foreground">Board text</span></button>) : <p className="px-2 py-1 text-xs text-muted-foreground">No matching board text</p>}</div>}
            <button type="button" onClick={() => focusFrame("Whole Board")} className={`mb-2 flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${activeFrame === "Whole Board" ? "bg-muted" : "hover:bg-muted/60"}`}><span className="grid size-8 place-items-center rounded-md border bg-background"><IconLayoutBoard className="size-4" /></span><span className="min-w-0"><span className="block text-xs font-medium">Whole Board</span><span className="block text-[11px] text-muted-foreground">{boardFrames.length} frames · {totalBoardItems} items</span></span></button>
            <div className="grid gap-0.5">{filteredFrames.map((frame) => { const FrameIcon = frame.icon; return <button key={frame.id} type="button" onClick={() => focusFrame(frame.id)} className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${activeFrame === frame.id ? "bg-primary/5 text-primary" : "hover:bg-muted/60"}`}><span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground"><FrameIcon className="size-4" /></span><span className="min-w-0"><span className="block truncate text-xs font-medium text-foreground">{frame.name}</span><span className="block text-[11px] text-muted-foreground">{frame.items} items</span></span></button>; })}</div>
          </motion.div>}

          {activeTab === "library" && <motion.div key="library-panel" initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }} className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="mb-2 flex items-center justify-between"><h2 className="text-xs font-semibold">Templates</h2><span className="text-[10px] text-muted-foreground">{reviewTemplates.length}</span></div>
            <div className="mb-4 grid gap-2">{reviewTemplates.map((template) => <div key={template.id} draggable={!readOnly && Boolean(api)} onDragStart={(event) => { event.dataTransfer.setData("application/x-nextrose-whiteboard-template", template.id); event.dataTransfer.effectAllowed = "copy"; }} className={`rounded-lg border p-2.5 ${readOnly || !api ? "" : "cursor-grab active:cursor-grabbing"}`}><TemplateThumbnail elements={template.elements} /><p className="text-xs font-medium">{template.name}</p><p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">{template.description}</p><Button className="mt-2 w-full" variant="outline" size="xs" disabled={readOnly || !api} onClick={() => insertTemplate(template.id)}><IconPlus />Add to canvas</Button></div>)}</div>
            <div className="mb-3 flex items-center justify-between border-t pt-3"><h2 className="text-xs font-semibold">Personal library</h2><Button variant="ghost" size="icon-sm" aria-label="Save selected shapes" disabled={readOnly} onClick={() => void saveSelection()}><IconPlus /></Button></div>
            {libraryItems.length === 0 ? <div className="grid min-h-48 place-items-center rounded-lg border border-dashed p-5 text-center"><div><IconLibrary className="mx-auto mb-2 size-5 text-muted-foreground" /><p className="text-xs font-medium">Your library is empty</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Select canvas items, then save them here for reuse.</p><Button className="mt-3" variant="outline" size="sm" disabled={readOnly} onClick={() => void saveSelection()}>Save selection</Button></div></div> : <div className="grid gap-2">{libraryItems.map((item) => <div key={item.id} className="rounded-lg border p-3"><p className="text-xs font-medium">{item.name}</p><p className="mt-1 text-[11px] text-muted-foreground">{item.elements.length} shapes</p><Button className="mt-2 w-full" variant="outline" size="xs" onClick={() => api?.toggleSidebar({ name: "library" })}><IconLibrary />Open canvas library</Button></div>)}</div>}
          </motion.div>}

          {activeTab === "history" && <motion.div key="history-panel" initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -3 }} transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }} className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-semibold">Saved versions</h2><Button variant="ghost" size="icon-sm" aria-label="Save version" disabled={readOnly || !api} onClick={saveVersion}><IconPlus /></Button></div>
            <div className="grid gap-2">{versions.length ? versions.map((version) => <button key={version.id} type="button" disabled={readOnly} onClick={() => setPendingVersion(version)} className="rounded-lg border p-3 text-left transition-colors hover:bg-muted/60 disabled:cursor-default"><span className="flex items-center justify-between gap-2"><span className="text-xs font-medium">{version.label}</span><IconClock className="size-3.5 text-muted-foreground" /></span><span className="mt-1 block text-[11px] text-muted-foreground">{new Date(version.savedAt).toLocaleString()}</span></button>) : <p className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">No saved versions</p>}</div>
          </motion.div>}
          </AnimatePresence>

          <div className="flex h-11 shrink-0 items-center justify-between border-t px-3"><span className="flex items-center gap-2 text-[11px] text-muted-foreground"><IconUsers className="size-3.5" />3 people here</span><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Board templates"><IconTemplate /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{reviewTemplates.map((template) => <DropdownMenuItem key={template.id} disabled={readOnly} onSelect={() => insertTemplate(template.id)}><span className="grid"><span>{template.name}</span><span className="text-[11px] text-muted-foreground">{template.description}</span></span></DropdownMenuItem>)}<DropdownMenuSeparator /><DropdownMenuItem disabled={readOnly} onSelect={saveVersion}><IconClock />Save version</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
        </aside>}
      </div>
      <Dialog open={Boolean(exportPreview)} onOpenChange={(open) => { if (!open) closeExportPreview(); }}>
        <DialogContent size="xl" className="max-h-[90svh] overflow-y-auto">
          <DialogHeader><DialogTitle>Export preview</DialogTitle><DialogDescription>Review the {exportPreview?.scope ?? "board"} before downloading it as {exportPreview?.format.toUpperCase()}.</DialogDescription></DialogHeader>
          <div className="flex flex-wrap items-center gap-4 rounded-lg border p-3">
            <label className="flex items-center gap-2 text-xs"><Switch checked={exportBackground} onCheckedChange={setExportBackground} />Background</label>
            <label className="flex items-center gap-2 text-xs"><Switch checked={exportDarkMode} onCheckedChange={setExportDarkMode} />Dark</label>
            <label className="flex items-center gap-2 text-xs"><Switch checked={exportEditable} onCheckedChange={setExportEditable} />Editable scene</label>
            {exportPreview?.format === "png" && <label className="flex items-center gap-2 text-xs">Scale<select value={exportScale} onChange={(event) => setExportScale(event.target.value)} className="h-8 rounded-md border bg-background px-2"><option value="1">1×</option><option value="2">2×</option><option value="3">3×</option></select></label>}
            <Button variant="outline" size="xs" onClick={() => exportPreview && void previewExport(exportPreview.format, exportPreview.scope)}>Refresh preview</Button>
          </div>
          {exportPreview && <div role="img" aria-label="Whiteboard export preview" className="min-h-64 rounded-lg border bg-muted/20 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${exportPreview.url}")`, height: "min(60svh, 40rem)" }} />}
          <DialogFooter><Button variant="outline" onClick={closeExportPreview}>Cancel</Button><Button variant="outline" disabled={!exportPreview} onClick={() => void copyExportPreview()}><IconCopy />Copy</Button><Button disabled={!exportPreview} onClick={() => { if (exportPreview) downloadBoardExport(exportPreview.blob, "checkout-review", exportPreview.format); closeExportPreview(); }}><IconDownload />Download</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={saveVersionOpen} onOpenChange={setSaveVersionOpen}>
        <DialogContent>
          <form onSubmit={(event) => { event.preventDefault(); commitSaveVersion(); }}>
            <DialogHeader><DialogTitle>Save board version</DialogTitle><DialogDescription>Name this snapshot so you can find it in history later.</DialogDescription></DialogHeader>
            <label className="mt-4 block text-xs font-medium">Version name<input autoFocus value={versionLabel} onChange={(event) => setVersionLabel(event.target.value)} maxLength={60} placeholder="e.g. Checkout review ready" className="mt-1.5 h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            <DialogFooter className="mt-5"><Button type="button" variant="outline" onClick={() => setSaveVersionOpen(false)}>Cancel</Button><Button type="submit" disabled={!versionLabel.trim() || !api || readOnly}>Save version</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={Boolean(pendingVersion)} onOpenChange={(open) => { if (!open) setPendingVersion(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Restore {pendingVersion?.label}?</DialogTitle><DialogDescription>The current canvas will be replaced with this saved version.</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setPendingVersion(null)}>Cancel</Button><Button disabled={!pendingVersion} onClick={() => pendingVersion && restoreVersion(pendingVersion)}>Restore version</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function moveFrame(step: -1 | 1) {
    const index = boardFrames.findIndex((frame) => frame.id === activeFrame);
    const next = index < 0 ? (step > 0 ? 0 : boardFrames.length - 1) : (index + step + boardFrames.length) % boardFrames.length;
    if (boardFrames[next]) focusFrame(boardFrames[next].id);
  }
}

function readVersions(seed: OrderedExcalidrawElement[]): BoardVersion[] {
  const snapshot = (elements: OrderedExcalidrawElement[]): BoardSnapshot => ({ elements, appState: { viewBackgroundColor: "#ffffff", theme: "light", gridModeEnabled: true, gridSize: 40 }, files: {} });
  const fallback: BoardVersion[] = [
    { id: "initial", label: "Starting board", savedAt: new Date(2026, 8, 28, 9, 42).toISOString(), snapshot: snapshot(seed) },
    { id: "flow-approved", label: "Flow approved", savedAt: new Date(2026, 8, 29, 14, 10).toISOString(), snapshot: snapshot(seed.map((element) => element.id === "label-flow-note" ? { ...element, text: "Card form has\nmost exits · reviewed" } : element)) },
    { id: "checkout-pass", label: "Checkout pass", savedAt: new Date(2026, 8, 30, 16, 35).toISOString(), snapshot: snapshot(seed.map((element) => element.id === "label-checkout-errors" ? { ...element, text: "Card errors are\neasy to recover" } : element)) },
  ];
  if (typeof window === "undefined") return fallback;
  try {
    const stored = JSON.parse(localStorage.getItem(versionsKey) ?? "[]") as BoardVersion[];
    if (!stored.length) return fallback;
    return [...stored, ...fallback.filter((version) => !stored.some((saved) => saved.id === version.id))];
  } catch {
    return fallback;
  }
}

function readLibraryItems(): SavedLibraryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(localStorage.getItem(libraryKey) ?? "[]") as SavedLibraryItem[];
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function getTemplateBounds(elements: ExcalidrawElementSkeleton[]) {
  return elements.reduce((bounds, element) => ({
    left: Math.min(bounds.left, element.x ?? 0),
    top: Math.min(bounds.top, element.y ?? 0),
    right: Math.max(bounds.right, (element.x ?? 0) + (element.width ?? 0)),
    bottom: Math.max(bounds.bottom, (element.y ?? 0) + (element.height ?? 0)),
  }), { left: Number.POSITIVE_INFINITY, top: Number.POSITIVE_INFINITY, right: Number.NEGATIVE_INFINITY, bottom: Number.NEGATIVE_INFINITY });
}

function getSceneBounds(elements: readonly OrderedExcalidrawElement[]) {
  return elements.reduce((bounds, element) => ({
    left: Math.min(bounds.left, element.x),
    top: Math.min(bounds.top, element.y),
    right: Math.max(bounds.right, element.x + element.width),
    bottom: Math.max(bounds.bottom, element.y + element.height),
  }), { left: Number.POSITIVE_INFINITY, top: Number.POSITIVE_INFINITY, right: Number.NEGATIVE_INFINITY, bottom: Number.NEGATIVE_INFINITY });
}

function getFrameElements(elements: readonly OrderedExcalidrawElement[], frame: Extract<OrderedExcalidrawElement, { type: "frame" }>) {
  const assignedElements = elements.filter((element) => element.id !== frame.id && element.frameId === frame.id);
  const frameElements = assignedElements.length ? assignedElements : elements.filter((element) => element.id !== frame.id && element.x + element.width / 2 >= frame.x && element.x + element.width / 2 <= frame.x + frame.width && element.y + element.height / 2 >= frame.y && element.y + element.height / 2 <= frame.y + frame.height);
  return [frame, ...frameElements];
}

function TemplateThumbnail({ elements }: { elements: ExcalidrawElementSkeleton[] }) {
  const markerId = useId().replaceAll(":", "");
  const bounds = getTemplateBounds(elements);
  const width = Math.max(1, bounds.right - bounds.left);
  const height = Math.max(1, bounds.bottom - bounds.top);
  return (
    <svg viewBox={`${bounds.left} ${bounds.top} ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="mb-2 h-14 w-full rounded-md border bg-muted/40" aria-hidden="true">
      <defs><marker id={markerId} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#737373" strokeWidth="1" /></marker></defs>
      {elements.map((element) => {
        const x = element.x ?? 0;
        const y = element.y ?? 0;
        const w = element.width ?? 0;
        const h = element.height ?? 0;
        const stroke = element.strokeColor ?? "#a3a3a3";
        const fill = element.type === "frame" ? "none" : element.backgroundColor ?? "none";
        const common = { stroke, fill, strokeWidth: element.type === "frame" ? 1 : element.strokeWidth ?? 1 };
        if (element.type === "arrow" || element.type === "line") return <line key={element.id} x1={x} y1={y} x2={x + w} y2={y + h} {...common} markerEnd={element.type === "arrow" ? `url(#${markerId})` : undefined} />;
        if (element.type === "diamond") return <polygon key={element.id} points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`} {...common} />;
        if (element.type === "ellipse") return <ellipse key={element.id} cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} {...common} />;
        if (element.type === "rectangle" || element.type === "frame") return <rect key={element.id} x={x} y={y} width={w} height={h} rx={element.type === "frame" ? 5 : 3} {...common} />;
        return null;
      })}
    </svg>
  );
}
