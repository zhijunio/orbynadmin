import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/buttons/button-group";
import { CloseButton } from "@/components/base/buttons/close-button";
import { LinkButton } from "@/components/base/buttons/link-button";
import { ActionGroup, ButtonGroupIconExamples, IconButtonStates, LinkButtonActions, SegmentedSelection, ViewSwitcher } from "@/app/elements/ui/button-interactive-examples";
import {
  IconArrowRight,
  IconBell,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconFilter,
  IconHeart,
  IconLoader2,
  IconLayoutGrid,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

export const metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return (
    <ConsoleLayout>
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

        <ComponentPreview title="Button Group with Variants">
          <ButtonGroup aria-label="Primary actions">
            <ButtonGroupItem>Overview</ButtonGroupItem>
            <ButtonGroupItem selected>Activity</ButtonGroupItem>
            <ButtonGroupItem>Settings</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup aria-label="Secondary actions">
            <ButtonGroupItem variant="secondary">Draft</ButtonGroupItem>
            <ButtonGroupItem variant="secondary">Review</ButtonGroupItem>
            <ButtonGroupItem variant="secondary">Published</ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>

        <ComponentPreview title="Button Group with Icons">
          <ButtonGroup aria-label="Primary actions with icons">
            <ButtonGroupItem><IconChevronLeft />Back</ButtonGroupItem>
            <ButtonGroupItem><IconLayoutGrid />Projects</ButtonGroupItem>
            <ButtonGroupItem><IconChevronRight />Continue</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroupIconExamples />
        </ComponentPreview>

        <ComponentPreview title="Button Group with Segmented Selection">
          <SegmentedSelection />
        </ComponentPreview>

        <ComponentPreview title="Button Group with Pagination Controls">
          <ButtonGroup aria-label="Pagination">
            <ButtonGroupItem variant="outline">Previous</ButtonGroupItem>
            <ButtonGroupItem variant="outline" aria-current="page" selected>1</ButtonGroupItem>
            <ButtonGroupItem variant="outline">2</ButtonGroupItem>
            <ButtonGroupItem variant="outline">3</ButtonGroupItem>
            <ButtonGroupItem variant="outline">Next</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup aria-label="Compact pagination">
            <ButtonGroupItem variant="outline" size="icon" aria-label="Previous"><IconChevronLeft /></ButtonGroupItem>
            <ButtonGroupItem variant="outline" className="px-4">Page 2 of 8</ButtonGroupItem>
            <ButtonGroupItem variant="outline" size="icon" aria-label="Next"><IconChevronRight /></ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>

        <ComponentPreview title="Button Group with View Switcher">
          <ViewSwitcher />
        </ComponentPreview>

        <ComponentPreview title="Button Group with Actions">
          <ActionGroup />
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
          <LinkButton href="/elements/ui/button" trailingIcon={<IconExternalLink />}>View button examples</LinkButton>
          <LinkButton variant="secondary" href="/elements/ui/input">Browse inputs</LinkButton>
          <LinkButton size="xs" trailingIcon={<IconArrowRight />} href="/elements/ui/accordion">See all</LinkButton>
          <LinkButton size="sm" leadingIcon={<IconDownload />} href="/elements/ui/file-upload">Download report</LinkButton>
          <LinkButton variant="secondary" size="sm" href="/account/settings">Open settings</LinkButton>
          <LinkButton href="/elements/ui/card" trailingIcon={<IconExternalLink />}>View cards</LinkButton>
          <LinkButtonActions />
        </ComponentPreview>

        <ComponentPreview title="Disabled Button">
          <Button variant="outline" disabled>Unavailable</Button>
        </ComponentPreview>

        <ComponentPreview title="Loading Button">
          <Button disabled><IconLoader2 className="animate-spin" />Saving</Button>
        </ComponentPreview>
      </div></div>
    </ConsoleLayout>
  );
}
