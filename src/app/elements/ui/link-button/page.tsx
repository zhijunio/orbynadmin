"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { IconArrowRight, IconExternalLink, IconDownload } from "@tabler/icons-react";
import { LinkButton } from "@/components/base/buttons/link-button";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

export default function LinkButtonPage() {
  return <ConsoleLayout>{<Showcase title="Link Button">
    <ComponentPreview title="Variants"><div className="flex flex-wrap items-center gap-5"><LinkButton href="/elements/ui/button" trailingIcon={<IconExternalLink />}>View button examples</LinkButton><LinkButton variant="secondary" href="/elements/ui/input">Browse inputs</LinkButton><LinkButton variant="secondary" disabled onClick={() => undefined}>Unavailable action</LinkButton></div></ComponentPreview>
    <ComponentPreview title="Sizes and actions"><div className="flex flex-wrap items-center gap-5"><LinkButton size="xs" trailingIcon={<IconArrowRight />} href="/elements/ui/accordion">See all</LinkButton><LinkButton size="sm" leadingIcon={<IconDownload />} onClick={() => undefined}>Download report</LinkButton><LinkButton onClick={() => undefined}>Open details</LinkButton></div></ComponentPreview>
  </Showcase>}</ConsoleLayout>;
}
