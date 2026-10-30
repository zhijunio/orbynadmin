"use client";

import { useRef, useState } from "react";
import { File as FileIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Accept = Record<string, string[]>;

export function FileUpload({ files, onFilesChange, accept, multiple = false, maxSize = 5 * 1024 * 1024, className }: {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  maxSize?: number;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const acceptValue = accept ? Object.values(accept).flat().join(",") : undefined;
  const formatSize = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(0)}MB` : `${Math.max(1, Math.round(bytes / 1024))}KB`;
  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const incoming = Array.from(selected);
    const oversized = incoming.find((file) => file.size > maxSize);
    if (oversized) {
      setError(`${oversized.name} exceeds the ${formatSize(maxSize)} limit.`);
      return;
    }
    setError("");
    onFilesChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }} className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed px-5 py-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/30">
        <input ref={inputRef} className="sr-only" type="file" accept={acceptValue} multiple={multiple} onChange={(event) => handleFiles(event.currentTarget.files)} />
        <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Upload className="size-5" /></span>
        <span className="text-sm font-medium">Drop files here or <span className="text-primary">browse</span></span>
        <span className="mt-1 text-xs text-muted-foreground">{acceptValue ? `${acceptValue.toUpperCase()} · ` : ""}Up to {formatSize(maxSize)}</span>
      </button>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {files.length > 0 && <ul className="space-y-2">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center gap-3 rounded-md border px-3 py-2"><FileIcon className="size-4 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1 truncate text-sm">{file.name}<span className="ml-2 text-xs text-muted-foreground">{formatSize(file.size)}</span></span><Button type="button" variant="ghost" size="icon" className="size-7" aria-label={`Remove ${file.name}`} onClick={() => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))}><X className="size-4" /></Button></li>)}</ul>}
    </div>
  );
}
