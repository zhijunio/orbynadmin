import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
import { Button } from "@/components/ui/buttons/button";
import { CloseButton } from "@/components/ui/buttons/close-button";
import { LinkButton } from "@/components/ui/buttons/link-button";
import { IconButtonStates, LinkButtonActions } from "@/app/components/button-interactive-examples";
import {
  IconArrowRight,
  IconBell,
  IconDownload,
  IconExternalLink,
  IconFilter,
  IconHeart,
  IconLoader2,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

export const metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return (
    <AppShell>
      <div className="min-w-0 space-y-5"><PageHeader title="Buttons" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Button Variants">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Danger</Button>
          <Button variant="link">Link</Button>
        </ComponentPreview>

        <ComponentPreview title="Button Sizes">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>

        <ComponentPreview title="Button with Icon">
          <Button><IconPlus data-icon="inline-start" />Primary with left icon</Button>
          <Button>Primary with right icon<IconArrowRight data-icon="inline-end" /></Button>
          <Button variant="outline"><IconDownload data-icon="inline-start" />Outline with left icon</Button>
          <Button variant="outline">Outline with right icon<IconArrowRight data-icon="inline-end" /></Button>
        </ComponentPreview>

        <ComponentPreview title="Close Button">
          <CloseButton aria-label="Close small item" size="xs" />
          <CloseButton aria-label="Close panel" size="sm" />
          <CloseButton aria-label="Close dialog" size="md" />
          <CloseButton aria-label="Close unavailable item" disabled />
        </ComponentPreview>

        <ComponentPreview title="Icon Button">
          <Button size="icon-xs" aria-label="Add small item"><IconPlus /></Button>
          <Button size="icon-sm" variant="outline" aria-label="Download"><IconDownload /></Button>
          <Button size="icon" aria-label="Add item"><IconPlus /></Button>
          <Button size="icon-lg" variant="secondary" aria-label="Open link"><IconExternalLink /></Button>
          <Button variant="secondary" aria-label="Filter"><IconFilter /></Button>
          <Button variant="outline" aria-label="Edit"><IconPencil /></Button>
          <Button variant="ghost" aria-label="Settings"><IconSettings /></Button>
          <Button variant="destructive" aria-label="Delete"><IconTrash /></Button>
          <Button variant="outline" aria-label="Notifications"><IconBell /></Button>
          <Button variant="outline" aria-label="Search"><IconSearch /></Button>
          <Button variant="outline" aria-label="Favorite" aria-pressed="false"><IconHeart /></Button>
          <Button variant="outline" aria-label="Download unavailable" disabled><IconDownload /></Button>
          <IconButtonStates />
        </ComponentPreview>

        <ComponentPreview title="Link Button">
          <LinkButton href="/components/button" trailingIcon={<IconExternalLink />}>View button examples</LinkButton>
          <LinkButton variant="secondary" href="/components/input">Browse inputs</LinkButton>
          <LinkButton size="xs" trailingIcon={<IconArrowRight />} href="/components/accordion">See all</LinkButton>
          <LinkButton size="sm" leadingIcon={<IconDownload />} href="/components/file-upload">Download report</LinkButton>
          <LinkButton variant="secondary" size="sm" href="/components/button">Open settings</LinkButton>
          <LinkButton href="/components/card" trailingIcon={<IconExternalLink />}>View cards</LinkButton>
          <LinkButtonActions />
        </ComponentPreview>

        <ComponentPreview title="Disabled Button">
          <Button variant="outline" disabled>Unavailable</Button>
        </ComponentPreview>

        <ComponentPreview title="Loading Button">
          <Button disabled><IconLoader2 className="animate-spin" />Saving</Button>
        </ComponentPreview>
      </div></div>
    </AppShell>
  );
}
