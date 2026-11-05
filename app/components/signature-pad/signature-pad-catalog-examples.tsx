"use client";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import {
  AgreementSigningExample,
  ApiRefUploadExample,
  ClauseInitialsExample,
  DrawOrTypeExample,
  ExportFormatsExample,
  FormValidationExample,
  HistoryToolbarExample,
  PinnedActionsExample,
  ProfileSignatureDialogExample,
  ProofOfDeliveryExample,
  SigningWorkspaceExample,
  StylusModeExample,
} from "@/app/components/signature-pad/signature-pad-catalog-demos";

export function SignaturePadCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Actions" layout="grid2">
        <div className="min-w-0">
          <PinnedActionsExample />
        </div>
        <div className="min-w-0">
          <HistoryToolbarExample />
        </div>
        <div className="min-w-0">
          <ExportFormatsExample />
        </div>
        <div className="min-w-0">
          <ApiRefUploadExample />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Modes" layout="grid3">
        <div className="min-w-0">
          <DrawOrTypeExample />
        </div>
        <div className="min-w-0">
          <StylusModeExample />
        </div>
        <div className="min-w-0">
          <ProfileSignatureDialogExample />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Form" span={2} layout="grid2">
        <div className="min-w-0">
          <FormValidationExample />
        </div>
        <div className="min-w-0">
          <AgreementSigningExample />
        </div>
        <div className="min-w-0">
          <ClauseInitialsExample />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Workspace" span={2} layout="stack">
        <div className="min-w-0 w-full">
          <SigningWorkspaceExample />
        </div>
        <div className="min-w-0 w-full">
          <ProofOfDeliveryExample />
        </div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
