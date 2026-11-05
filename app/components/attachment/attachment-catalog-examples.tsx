"use client";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import {
  AttachmentSizesExample,
  ComposerTrayExample,
  FilePickerExample,
  ImageAttachmentStrip,
  SingleAttachmentExample,
  UploadQueueExample,
} from "@/app/components/attachment/attachment-catalog-demos";

export function AttachmentCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Single File">
        <SingleAttachmentExample />
      </ComponentPreview>
      <ComponentPreview title="Composer Tray">
        <ComposerTrayExample />
      </ComponentPreview>
      <ComponentPreview title="Image Thumbnails">
        <ImageAttachmentStrip />
      </ComponentPreview>
      <ComponentPreview title="Size Variants">
        <AttachmentSizesExample />
      </ComponentPreview>
      <ComponentPreview title="Upload States">
        <UploadQueueExample />
      </ComponentPreview>
      <ComponentPreview title="File Picker Tray">
        <FilePickerExample />
      </ComponentPreview>
    </CatalogGridItems>
  );
}
