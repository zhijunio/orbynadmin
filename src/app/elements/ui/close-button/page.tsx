"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { CloseButton } from "@/components/base/buttons/close-button";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function CloseButtonPage() {
  return <ConsoleLayout>{<Showcase title="Close Button">
    <ComponentPreview title="Sizes"><div className="flex items-center gap-3"><CloseButton aria-label="Close small item" size="xs" /><CloseButton aria-label="Close panel" size="sm" /><CloseButton aria-label="Close dialog" size="md" /></div></ComponentPreview>
    <ComponentPreview title="Disabled"><CloseButton aria-label="Close unavailable item" disabled /></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
