"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { Showcase } from "@/components/application/docs/showcase";

import { useEffect, useRef, useState } from "react";
import { FileUpload } from "@/components/base/file-upload/file-upload";
import { ComponentPreview } from "@/components/application/docs/component-preview";

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [validatedFiles, setValidatedFiles] = useState<File[]>([]);

  return <>
      <ComponentPreview title="Single image">
        <FileUpload files={imageFiles} onFilesChange={setImageFiles} accept={imageAccept} maxSize={5 * 1024 * 1024} />
      </ComponentPreview>
      <ComponentPreview title="Multiple documents">
        <FileUpload files={documents} onFilesChange={setDocuments} accept={documentAccept} multiple maxSize={10 * 1024 * 1024} />
      </ComponentPreview>
      <ComponentPreview title="File size validation">
        <div className="w-full space-y-2">
          <p className="text-xs text-muted-foreground">PNG or JPEG, up to 1 MB. Try a larger file to see the rejection message.</p>
          <FileUpload files={validatedFiles} onFilesChange={setValidatedFiles} accept={imageAccept} maxSize={1 * 1024 * 1024} />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Single file">
        <FileUpload files={singleFile} onFilesChange={setSingleFile} accept={documentAccept} maxSize={2 * 1024 * 1024} />
      </ComponentPreview>
      <ComponentPreview title="Image upload with preview" className="xl:col-span-2">
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

export default function FileUploadPage() {
  return <ConsoleLayout>{<Showcase title="File Upload">
      <FileUploadExamples />
    </Showcase>}</ConsoleLayout>;
}
