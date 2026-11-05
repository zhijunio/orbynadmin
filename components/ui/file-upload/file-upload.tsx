"use client";

import { useRef, useState } from "react";
import { IconFile as FileIcon, IconUpload as Upload, IconX as X } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/utils/cn";

export type FileUploadAccept = Record<string, string[]>;

export type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: FileUploadAccept;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

function fileAllowed(file: File, accept?: FileUploadAccept) {
  if (!accept) return true;
  const rules = Object.entries(accept).filter(([mime, extensions]) => mime || extensions.length > 0);
  if (rules.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return rules.some(([mime, extensions]) => {
    if (extensions.some((extension) => name.endsWith(extension.toLowerCase()))) return true;
    const pattern = mime.toLowerCase();
    if (pattern.endsWith("/*")) return type.startsWith(pattern.slice(0, -1));
    return pattern.length > 0 && type === pattern;
  });
}

export function FileUpload({ files, onFilesChange, accept, multiple = false, maxSize = 5 * 1024 * 1024, disabled = false, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const extensions = accept ? Object.values(accept).flat().filter(Boolean) : [];
  const acceptValue = accept ? [...new Set([...Object.keys(accept).filter(Boolean), ...extensions])].join(",") : undefined;
  const formatSize = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(0)}MB` : `${Math.max(1, Math.round(bytes / 1024))}KB`;
  const occurrences = new Map<string, number>();
  const keyedFiles = files.map((file) => {
    const identity = JSON.stringify([file.name, file.lastModified, file.size, file.type]);
    const occurrence = occurrences.get(identity) ?? 0;
    occurrences.set(identity, occurrence + 1);
    return { file, key: JSON.stringify([identity, occurrence]) };
  });
  const handleFiles = (selected: FileList | null) => {
    if (!selected || disabled) return;
    const incoming = Array.from(selected);
    const rejectedType = incoming.find((file) => !fileAllowed(file, accept));
    const oversized = incoming.find((file) => file.size > maxSize);
    const accepted = incoming.filter((file) => fileAllowed(file, accept) && file.size <= maxSize);
    if (rejectedType) setError(`${rejectedType.name} is not an accepted file type.`);
    else if (oversized) setError(`${oversized.name} exceeds the ${formatSize(maxSize)} limit.`);
    else setError("");
    if (accepted.length === 0) return;
    onFilesChange(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <button type="button" disabled={disabled} data-dragging={dragging || undefined} onClick={(event) => { if (event.target === inputRef.current) return; inputRef.current?.click(); }} onDragEnter={(event) => { if (disabled) return; event.preventDefault(); setDragging(true); }} onDragOver={(event) => { if (disabled) return; event.preventDefault(); }} onDragLeave={(event) => { if (event.currentTarget.contains(event.relatedTarget as Node | null)) return; setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); handleFiles(event.dataTransfer.files); }} className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed px-5 py-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/30 data-[dragging=true]:border-primary data-[dragging=true]:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50">
        <input ref={inputRef} tabIndex={-1} className="sr-only" type="file" accept={acceptValue} multiple={multiple} disabled={disabled} onClick={(event) => event.stopPropagation()} onChange={(event) => { handleFiles(event.currentTarget.files); event.currentTarget.value = ""; }} />
        <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Upload className="size-5" /></span>
        <span className="text-sm font-medium">Drop files here or <span className="text-primary">browse</span></span>
        <span className="mt-1 text-xs text-muted-foreground">{extensions.length > 0 ? `${extensions.join(",").toUpperCase()} · ` : ""}Up to {formatSize(maxSize)}</span>
      </button>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {keyedFiles.length > 0 && <ul className="space-y-2">{keyedFiles.map(({ file, key }, index) => <li key={key} className="flex items-center gap-3 rounded-md border px-3 py-2"><FileIcon className="size-4 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1 truncate text-sm">{file.name}<span className="ml-2 text-xs text-muted-foreground">{formatSize(file.size)}</span></span><Button type="button" variant="ghost" size="icon" className="size-7" aria-label={`Remove ${file.name}`} disabled={disabled} onClick={() => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))}><X className="size-4" /></Button></li>)}</ul>}
    </div>
  );
}
