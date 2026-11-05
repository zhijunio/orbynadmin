"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { convertToExcalidrawElements, exportToBlob, exportToSvg, sceneCoordsToViewportCoords, serializeAsJSON } from "@excalidraw/excalidraw";
import type { AppState, BinaryFiles, ExcalidrawImperativeAPI, ExcalidrawInitialDataState, Zoom } from "@excalidraw/excalidraw/types";
import type { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import "@excalidraw/excalidraw/index.css";

const ExcalidrawCanvas = dynamic(
  () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
  { ssr: false, loading: () => <div className="grid h-full min-h-80 place-items-center text-sm text-muted-foreground">Opening canvas…</div> },
);

export type BoardApi = ExcalidrawImperativeAPI;
export type BoardSnapshot = {
  elements: readonly OrderedExcalidrawElement[];
  appState: Pick<AppState, "viewBackgroundColor" | "theme" | "gridModeEnabled" | "gridSize">;
  files: BinaryFiles;
};

type StoredScene = {
  schemaVersion?: number;
  elements: OrderedExcalidrawElement[];
  appState: Pick<AppState, "viewBackgroundColor" | "theme" | "gridModeEnabled" | "gridSize">;
  files: BinaryFiles;
};

export function readSnapshot(api: BoardApi): BoardSnapshot {
  const appState = api.getAppState();
  return {
    elements: api.getSceneElements(),
    appState: { viewBackgroundColor: appState.viewBackgroundColor, theme: appState.theme, gridModeEnabled: appState.gridModeEnabled, gridSize: appState.gridSize },
    files: api.getFiles(),
  };
}

export function restoreSnapshot(api: BoardApi, snapshot: BoardSnapshot) {
  api.updateScene({ elements: [...snapshot.elements], appState: snapshot.appState });
  api.addFiles(Object.values(snapshot.files));
}

export function WhiteboardEditor({
  boardId,
  name,
  seed,
  onApi,
  onSaveState,
  onElementsChange,
  onScrollChange,
  presentationFrame,
  readOnly = false,
}: {
  boardId: string;
  name: string;
  seed: OrderedExcalidrawElement[];
  onApi?: (api: BoardApi) => void;
  onSaveState?: (state: "ready" | "saving" | "saved") => void;
  onElementsChange?: (elements: readonly OrderedExcalidrawElement[]) => void;
  onScrollChange?: (scrollX: number, scrollY: number, zoom: Zoom, offsetLeft: number, offsetTop: number) => void;
  presentationFrame?: string;
  readOnly?: boolean;
}) {
  const storageKey = `nextrose-whiteboard-${boardId}`;
  const apiRef = useRef<BoardApi | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number | null>(null);
  const [saveState, setSaveState] = useState<"ready" | "saving" | "saved">("ready");
  const [sceneElements, setSceneElements] = useState<readonly OrderedExcalidrawElement[]>([]);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [viewport, setViewport] = useState<{ scrollX: number; scrollY: number; zoom: Zoom; offsetLeft: number; offsetTop: number } | null>(null);
  const [loadedScene] = useState<StoredScene | null>(() => readStoredScene(storageKey));
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    };
  }, [storageKey]);

  useEffect(() => onSaveState?.(saveState), [onSaveState, saveState]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const bounds = stage.getBoundingClientRect();
      setStageSize({ width: bounds.width, height: bounds.height, left: bounds.left, top: bounds.top });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("scroll", measure, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure, true);
    };
  }, []);

  const initialData = useMemo<ExcalidrawInitialDataState>(() => ({
    elements: loadedScene?.elements ?? seed,
    appState: { viewBackgroundColor: resolvedTheme === "dark" ? "#171717" : "#ffffff", theme: resolvedTheme === "dark" ? "dark" : "light", gridModeEnabled: true, gridSize: 40, ...loadedScene?.appState },
    files: loadedScene?.files ?? {},
  }), [loadedScene, resolvedTheme, seed]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const theme = resolvedTheme === "dark" ? "dark" : "light";
    api.updateScene({ appState: { theme, viewBackgroundColor: theme === "dark" ? "#171717" : "#ffffff" } });
  }, [resolvedTheme]);

  const onChange = useCallback((elements: readonly OrderedExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
    setSceneElements(elements);
    onElementsChange?.(elements);
    setSaveState("saving");
    if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const scene: StoredScene = {
          schemaVersion: 12,
          elements: [...elements],
          appState: { viewBackgroundColor: appState.viewBackgroundColor, theme: appState.theme, gridModeEnabled: appState.gridModeEnabled, gridSize: appState.gridSize },
          files,
        };
        localStorage.setItem(storageKey, JSON.stringify(scene));
        setSaveState("saved");
      } catch {
        setSaveState("ready");
        toast.error("Board storage is full. Export a copy to keep this work.");
      }
    }, 450);
  }, [onElementsChange, storageKey]);

  const reportScrollChange = useCallback((scrollX: number, scrollY: number, zoom: Zoom) => {
    const appState = apiRef.current?.getAppState();
    if (appState) {
      const nextViewport = { scrollX, scrollY, zoom, offsetLeft: appState.offsetLeft, offsetTop: appState.offsetTop };
      setViewport(nextViewport);
      onScrollChange?.(scrollX, scrollY, zoom, appState.offsetLeft, appState.offsetTop);
      const stage = stageRef.current;
      if (stage) {
        const bounds = stage.getBoundingClientRect();
        setStageSize({ width: bounds.width, height: bounds.height, left: bounds.left, top: bounds.top });
      }
    }
  }, [onScrollChange]);

  const handleApi = useCallback((api: BoardApi) => {
    apiRef.current = api;
    window.setTimeout(() => {
      const elements = api.getSceneElements();
      setSceneElements(elements);
      if (elements.length) {
        const firstFrame = window.matchMedia("(max-width: 767px)").matches
          ? elements.find((element) => element.type === "frame")
          : undefined;
        const zoomFactor = firstFrame && firstFrame.width < 250 ? 0.6 : 0.95;
        api.scrollToContent(firstFrame ?? elements, { fitToViewport: true, viewportZoomFactor: zoomFactor, animate: false });
      }
      onElementsChange?.(elements);
    }, 100);
    const appState = api.getAppState();
    reportScrollChange(appState.scrollX, appState.scrollY, appState.zoom);
    onApi?.(api);
  }, [onApi, onElementsChange, reportScrollChange]);

  const activePresentationFrame = presentationFrame ? sceneElements.find((element) => element.type === "frame" && (element.id === presentationFrame || element.name === presentationFrame)) : undefined;
  const activeFrameBounds = activePresentationFrame && viewport ? {
    left: sceneCoordsToViewportCoords({ sceneX: activePresentationFrame.x, sceneY: activePresentationFrame.y }, viewport).x - stageSize.left,
    top: sceneCoordsToViewportCoords({ sceneX: activePresentationFrame.x, sceneY: activePresentationFrame.y }, viewport).y - stageSize.top,
    right: sceneCoordsToViewportCoords({ sceneX: activePresentationFrame.x + activePresentationFrame.width, sceneY: activePresentationFrame.y + activePresentationFrame.height }, viewport).x - stageSize.left,
    bottom: sceneCoordsToViewportCoords({ sceneX: activePresentationFrame.x + activePresentationFrame.width, sceneY: activePresentationFrame.y + activePresentationFrame.height }, viewport).y - stageSize.top,
  } : null;
  const maskId = `whiteboard-dim-${boardId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  return (
    <div ref={stageRef} className="relative h-full min-h-0 w-full overflow-hidden">
      <div className="sr-only" aria-live="polite">{saveState === "saving" ? "Saving board" : saveState === "saved" ? "Board saved in this browser" : "Board is ready"}</div>
      <ExcalidrawCanvas
        initialData={initialData}
        onChange={onChange}
        onScrollChange={reportScrollChange}
        excalidrawAPI={handleApi}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        name={name}
        viewModeEnabled={readOnly}
        autoFocus={false}
      />
      <AnimatePresence initial={false}>
      {activeFrameBounds && stageSize.width > 0 && stageSize.height > 0 && <motion.svg key={activePresentationFrame?.id} initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: "easeOut" }} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 size-full" viewBox={`0 0 ${stageSize.width} ${stageSize.height}`} preserveAspectRatio="none">
        <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={stageSize.width} height={stageSize.height}><rect width={stageSize.width} height={stageSize.height} fill="white" /><rect x={activeFrameBounds.left} y={activeFrameBounds.top} width={activeFrameBounds.right - activeFrameBounds.left} height={activeFrameBounds.bottom - activeFrameBounds.top} fill="black" /></mask></defs>
        <rect width={stageSize.width} height={stageSize.height} fill="black" fillOpacity="0.36" mask={`url(#${maskId})`} />
      </motion.svg>}
      </AnimatePresence>
    </div>
  );
}

export async function exportBoard(api: BoardApi, format: "png" | "svg", name: string) {
  const blob = await createBoardExport(api, format);
  download(blob, `${slugify(name)}.${format}`);
}

export async function createBoardExport(api: BoardApi, format: "png" | "svg", options: { elements?: readonly OrderedExcalidrawElement[]; background?: boolean; darkMode?: boolean; editable?: boolean; scale?: number } = {}) {
  const elements = options.elements ?? api.getSceneElements();
  const appState = { ...api.getAppState(), exportBackground: options.background ?? true, exportWithDarkMode: options.darkMode ?? false, exportEmbedScene: options.editable ?? false, exportScale: options.scale ?? 1 };
  const files = api.getFiles();
  if (format === "png") {
    return exportToBlob({ elements, appState, files, mimeType: "image/png", exportPadding: 24 });
  }
  const svg = await exportToSvg({ elements, appState, files, exportPadding: 24 });
  return new Blob([svg.outerHTML], { type: "image/svg+xml" });
}

export function downloadBoardExport(blob: Blob, name: string, format: "png" | "svg") {
  download(blob, `${slugify(name)}.${format}`);
}

export function saveBoardFile(api: BoardApi, name: string) {
  const json = serializeAsJSON(api.getSceneElements(), api.getAppState(), api.getFiles(), "local");
  download(new Blob([json], { type: "application/json" }), `${slugify(name)}.excalidraw`);
}

export async function openBoardFile(api: BoardApi, file: File) {
  try {
    const contents = JSON.parse(await file.text()) as Partial<StoredScene>;
    if (!Array.isArray(contents.elements)) throw new Error("Invalid scene");
    api.updateScene({ elements: contents.elements, appState: contents.appState });
    if (contents.files) api.addFiles(Object.values(contents.files));
    toast.success("Board opened");
  } catch {
    toast.error("This file could not be opened as an Excalidraw board.");
  }
}

export function addSceneElements(api: BoardApi, elements: OrderedExcalidrawElement[]) {
  api.updateScene({ elements: [...api.getSceneElements(), ...elements] });
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "whiteboard";
}

const seededTextUpdates: Record<string, { from: string; to: string }> = {
  "goal-quit": { from: "Payment quits\nMobile: 38%\nat checkout", to: "Mobile: 38% quit\nat the payment step" },
  "goal-dropoff": { from: "30% drop-off\npayment goal\nby Q4", to: "Goal: 30% drop-off\npayment by Q4" },
  "goal-scope": { from: "PCI scope\nunchanged\nOwner: Priya", to: "No new PCI scope\nMetric owner: Priya" },
  "question-wallets": { from: "Web wallets?\nin scope?\nKenji", to: "Express wallets\non web in scope?\nKenji" },
  "question-android": { from: "Android only\ncard scan?\nOmar", to: "Card scan on\nAndroid only?\nOmar" },
  "question-saved": { from: "Default card?\non checkout\nEmma", to: "Which saved card\nis the default?\nEmma" },
  "decision-wallet": { from: "Wallets ship\nfirst · Oct 8\nKenji", to: "Wallet buttons\nship first\nKenji · Oct 8" },
  "decision-pay": { from: "stays at 10%\nExpress Pay\nPriya", to: "exp_express_pay\nstays at 10%\nPriya" },
  "decision-review": { from: "Review stays\none page\nSofia · Oct 2", to: "One-page review\nstays one page\nSofia · Oct 2" },
  "checkout-wallet": { from: "Wallets above\ncard form", to: "Wallet buttons\nabove the card form" },
  "flow-note": { from: "Card form has\nmost exits", to: "Most exits happen\non the card form" },
  "sprint-goal-1": { from: "10% rollout\nExpress Pay", to: "Express Pay live for\n10% of web merchants" },
  "sprint-goal-2": { from: "Oct 9 demo", to: "Demo on Oct 9" },
  "risk-domain": { from: "Domain check\nApple Pay\nunverified", to: "Apple Pay domain\nnot verified" },
  "risk-legal": { from: "Legal review\nreceipt copy", to: "Legal review on\nreceipt copy" },
  "risk-emma": { from: "Emma away\nOct 5–6", to: "Emma away Oct 5\nand 6" },
};

const currentSeededTextUpdates: Record<string, { from: string; to: string }> = {
  "goal-dropoff": { from: "Goal: 30% drop-off\npayment by Q4", to: "Goal: 30%\npayment drop-off\nby Q4" },
  "question-saved": { from: "Which saved card\nis the default?\nEmma", to: "Which saved\ncard is the\ndefault? Emma" },
  "checkout-wallet": { from: "Wallet buttons\nabove the card form", to: "Wallet buttons\nabove the card\nform" },
};

function readStoredScene(storageKey: string): StoredScene | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return null;
    const scene = JSON.parse(stored) as StoredScene;
    if (!Array.isArray(scene.elements)) return null;
    if ((scene.schemaVersion ?? 0) >= 12) return scene;
    const schemaVersion = scene.schemaVersion ?? 0;
    const elements = scene.elements.map((element) => {
        if (schemaVersion < 7 && element.type === "arrow" && Math.abs(element.x - 544.5) < 2 && Math.abs(element.y - 257.5) < 2 && Math.abs(element.width - 99) < 2 && Math.abs(element.height - 34) < 2) {
          return { ...element, width: 1, height: 34, points: [[0, 0], [1, 34]] as [number, number][] };
        }
        if (schemaVersion < 7 && element.type === "arrow" && Math.abs(element.x - 580.5) < 2 && Math.abs(element.y - 319) < 2 && Math.abs(element.width - 109) < 2 && element.height === 0) {
          return { ...element, width: 84, points: [[0, 0], [84, 0]] as [number, number][] };
        }
        if (schemaVersion < 7 && element.type === "arrow" && Math.abs(element.x - 665.5) < 2 && Math.abs(element.y - 318.5) < 2 && Math.abs(element.width - 99) < 2 && Math.abs(element.height - 70) < 2) {
          return { ...element, width: 1, height: 70, points: [[0, 0], [1, -70]] as [number, number][] };
        }
        if (schemaVersion < 7 && element.type === "arrow" && Math.abs(element.x - 690.5) < 2 && Math.abs(element.y - 318.5) < 2 && Math.abs(element.width - 99) < 2 && Math.abs(element.height - 89) < 2) {
          return { ...element, x: 665.5, width: 1, height: 70, points: [[0, 0], [1, -70]] as [number, number][] };
        }
        if (element.type === "text") {
          const migrated = schemaVersion < 3 ? { ...element, fontSize: Math.round(element.fontSize * 1.2) } : element;
          if (schemaVersion < 11 && typeof migrated.customData?.boardItemId === "string") {
            const boardItemId = migrated.customData.boardItemId;
            const textUpdate = (schemaVersion < 9 ? seededTextUpdates[boardItemId] : undefined) ?? currentSeededTextUpdates[boardItemId];
            const contentUpdated = textUpdate?.from === migrated.text ? { ...migrated, text: textUpdate.to } : migrated;
            if (boardItemId.startsWith("decision-") || boardItemId === "checkout-wallet") return { ...contentUpdated, fontSize: 10 };
            if (boardItemId === "goal-dropoff" || boardItemId.startsWith("question-")) return { ...contentUpdated, fontSize: 11 };
            if (boardItemId.startsWith("task-SP-") && migrated.customData.boardItemPart === "label") {
              const card = scene.elements.find((candidate) => candidate.type === "rectangle" && candidate.customData?.boardItemId === boardItemId && candidate.customData?.boardItemPart === "card");
              if (card?.type === "rectangle") return { ...contentUpdated, x: card.x + card.width / 2, textAlign: "center" as const, fontFamily: 2 };
            }
            if (boardItemId.startsWith("sprint-goal-") || boardItemId.startsWith("risk-")) return { ...contentUpdated, fontFamily: 2 };
            return contentUpdated;
          }
          return migrated;
        }
        return element;
    });
    const hasUserFlowFrame = elements.some((element) => element.type === "frame" && element.customData?.boardFrameId === "frame-user-flow");
    const hasFlowContext = elements.some((element) => element.customData?.boardItemId === "flow-context");
    if (schemaVersion < 12 && hasUserFlowFrame && !hasFlowContext) {
      elements.push(...convertToExcalidrawElements([{
        type: "text",
        text: "Mobile web, signed-in shoppers",
        x: 285,
        y: 380,
        width: 220,
        height: 16,
        fontSize: 11,
        fontFamily: 1,
        strokeColor: "#202124",
        backgroundColor: "transparent",
        roughness: 0,
        customData: { boardItemId: "flow-context" },
      }]));
    }
    return { ...scene, schemaVersion: 12, elements };
  } catch {
    return null;
  }
}

function download(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
