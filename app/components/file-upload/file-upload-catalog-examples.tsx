"use client";
import { useEffect, useRef, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload/file-upload";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";

const imageAccept = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
};
const documentAccept = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
};

function FileUploadExamples() {
  const [documents, setDocuments] = useState<File[]>([]);
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [validatedFiles, setValidatedFiles] = useState<File[]>([]);
  const [extraFiles, setExtraFiles] = useState<Record<string, File[]>>({});
  const setExtra = (key: string) => (files: File[]) => setExtraFiles((current) => ({ ...current, [key]: files }));

  return <>
      <ComponentPreview title="Files" layout="stack">
        <FileUpload files={documents} onFilesChange={setDocuments} accept={documentAccept} multiple maxSize={10 * 1024 * 1024} />
        <FileUpload files={singleFile} onFilesChange={setSingleFile} accept={documentAccept} maxSize={2 * 1024 * 1024} />
      </ComponentPreview>
    <ComponentPreview title="Validation" layout="stack">

        <div className="w-full space-y-2">
          <p className="text-xs text-muted-foreground">PNG or JPEG, up to 1 MB. Try a larger file to see the rejection message.</p>
          <FileUpload files={validatedFiles} onFilesChange={setValidatedFiles} accept={imageAccept} maxSize={1 * 1024 * 1024} />
        </div>
</ComponentPreview>
    <ComponentPreview title="Images" layout="stack">

        <div className="grid w-full gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
          <FileUpload files={previewFiles} onFilesChange={setPreviewFiles} accept={imageAccept} maxSize={5 * 1024 * 1024} />
          <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted/20 p-3">
            {previewFiles[0] ? (
              <ImagePreview file={previewFiles[0]} />
            ) : (
              <p className="text-center text-sm text-muted-foreground">Image preview appears here</p>
            )}
          </div>
        </div>

<div className="grid w-full max-w-sm justify-items-center gap-3"><div className="grid size-20 place-items-center rounded-full border bg-muted text-xs text-muted-foreground">Avatar</div><FileUpload files={extraFiles.avatar ?? []} onFilesChange={setExtra("avatar")} accept={imageAccept} maxSize={2 * 1024 * 1024}/></div>

<div className="grid w-full gap-3"><FileUpload files={extraFiles.gallery ?? []} onFilesChange={setExtra("gallery")} accept={imageAccept} multiple/><div className="grid grid-cols-3 gap-2">{(extraFiles.gallery ?? []).map((file)=><div key={`${file.name}-${file.lastModified}`} className="truncate rounded-md border p-2 text-xs">{file.name}</div>)}</div></div>

<FileUpload files={extraFiles.product ?? []} onFilesChange={setExtra("product")} accept={imageAccept} multiple maxSize={5 * 1024 * 1024}/>

<div className="grid w-full gap-3"><p className="text-xs text-muted-foreground">Select product photos; use the current order as the display order.</p><FileUpload files={extraFiles.sortable ?? []} onFilesChange={setExtra("sortable")} accept={imageAccept} multiple/><ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">{(extraFiles.sortable ?? []).map((file,index)=><li className="rounded-md border p-2 text-xs" key={`${file.name}-${file.lastModified}`}>{index+1}. {file.name}</li>)}</ol></div>

<div className="grid w-full gap-3"><FileUpload files={extraFiles.cards ?? []} onFilesChange={setExtra("cards")} accept={imageAccept} multiple/><div className="grid gap-2 sm:grid-cols-2">{(extraFiles.cards ?? []).map((file)=><div key={`${file.name}-${file.lastModified}`} className="rounded-lg border p-3"><p className="truncate text-sm font-medium">{file.name}</p><p className="mt-1 text-xs text-muted-foreground">{Math.ceil(file.size/1024)} KB · ready to upload</p></div>)}</div></div>

<div className="grid w-full gap-3"><div className="grid aspect-[3/1] place-items-center rounded-lg border bg-muted/40 text-sm text-muted-foreground">Workspace cover preview</div><FileUpload files={extraFiles.cover ?? []} onFilesChange={setExtra("cover")} accept={imageAccept} maxSize={10 * 1024 * 1024}/></div>
</ComponentPreview>
    <ComponentPreview title="Drop" layout="stack">
<div className="w-full max-w-xl"><p className="mb-2 text-sm text-muted-foreground">Drop one or more project assets below.</p><FileUpload files={extraFiles.drop ?? []} onFilesChange={setExtra("drop")} accept={imageAccept} multiple maxSize={8 * 1024 * 1024}/></div>
</ComponentPreview>
    <ComponentPreview title="Progress" layout="stack">
<div className="grid w-full gap-3"><FileUpload files={extraFiles.progress ?? []} onFilesChange={setExtra("progress")} multiple/><ul className="grid gap-2">{(extraFiles.progress ?? []).map((file)=><li key={`${file.name}-${file.lastModified}`} className="grid gap-1 text-xs"><span>{file.name}</span><progress className="h-2 w-full accent-primary" value="100" max="100">100%</progress></li>)}</ul></div>

<div className="grid w-full gap-3"><FileUpload files={extraFiles.table ?? []} onFilesChange={setExtra("table")} multiple/><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b text-muted-foreground"><th className="p-2">File</th><th className="p-2">Type</th><th className="p-2">Size</th></tr></thead><tbody>{(extraFiles.table ?? []).map((file)=><tr className="border-b" key={`${file.name}-${file.lastModified}`}><td className="p-2">{file.name}</td><td className="p-2">{file.type || "File"}</td><td className="p-2">{Math.ceil(file.size / 1024)} KB</td></tr>)}</tbody></table></div></div>
</ComponentPreview>
    </>;
}

function ImagePreview({ file }: { file: File }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const image = imageRef.current;
    image?.setAttribute("src", url);
    return () => {
      URL.revokeObjectURL(url);
      image?.removeAttribute("src");
    };
  }, [file]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={imageRef} alt={`Preview of ${file.name}`} className="max-h-64 w-full rounded-md object-contain" />
  );
}

export function FileUploadCatalogExamples() {
  return (
    <CatalogGridItems>
      <FileUploadExamples />
    </CatalogGridItems>
  );
}
