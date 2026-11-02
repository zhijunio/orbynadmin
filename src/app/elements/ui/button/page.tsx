import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { IconArrowRight, IconDownload, IconLoader2, IconPlus } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Button } from "@/components/base/buttons/button";

export const metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return <ConsoleLayout>{<Showcase title="Buttons">
      <ComponentPreview title="Variants">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Danger</Button>
        <Button variant="link">Link</Button>
      </ComponentPreview>

      <ComponentPreview title="Sizes">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </ComponentPreview>

      <ComponentPreview title="Icon Placement">
        <Button><IconPlus data-icon="inline-start" />Create project</Button>
        <Button variant="outline">Download report<IconDownload data-icon="inline-end" /></Button>
      </ComponentPreview>

      <ComponentPreview title="Icon-only and Disabled States">
        <Button size="icon" aria-label="Create"><IconPlus /></Button>
        <Button size="icon-sm" variant="outline" aria-label="Download"><IconDownload /></Button>
        <Button variant="outline" disabled>Unavailable</Button>
        <Button disabled><IconLoader2 className="animate-spin" />Saving</Button>
        <Button variant="outline">Continue<IconArrowRight data-icon="inline-end" /></Button>
      </ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
