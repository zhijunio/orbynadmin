import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Showcase } from "@/components/feature/example/Showcase";

import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight, Download as IconDownload, LoaderCircle as IconLoader2, Plus as IconPlus, Download, Plus, Search, Trash2, Apple as IconBrandAppleFilled, MessageCircle as IconBrandDiscord, Users as IconBrandFacebookFilled, Globe as IconBrandGoogle, Share2 as IconBrandX } from "lucide-react";
import { Button } from "@/components/ui/button";

const joinedButtons = "rounded-none px-3.5 first:rounded-l-lg last:rounded-r-lg [&:not(:first-child)]:-ml-px";

function ButtonGroupPreview() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-wrap gap-5">
        <div role="group" aria-label="Basic pagination buttons" className="flex">
          <Button variant="outline" className={joinedButtons}>Prev</Button>
          <Button variant="outline" className={joinedButtons}>10</Button>
          <Button variant="outline" className={joinedButtons}>Next</Button>
        </div>
        <div role="group" aria-label="Icon pagination buttons" className="flex">
          <Button variant="outline" size="icon" className={`${joinedButtons} px-0`} aria-label="Previous page"><IconChevronLeft className="size-4" /></Button>
          <Button variant="outline" className={joinedButtons}>10</Button>
          <Button variant="outline" size="icon" className={`${joinedButtons} px-0`} aria-label="Next page"><IconChevronRight className="size-4" /></Button>
        </div>
      </div>
      <div role="group" aria-label="Extended pagination buttons" className="flex flex-wrap">
        <Button variant="outline" className={joinedButtons}>Prev</Button>
        <Button variant="outline" className={joinedButtons} disabled aria-label="More pages">...</Button>
        <Button variant="outline" className={joinedButtons}>9</Button>
        <Button variant="outline" className={`${joinedButtons} bg-muted`}>10</Button>
        <Button variant="outline" className={joinedButtons}>11</Button>
        <Button variant="outline" className={joinedButtons} disabled aria-label="More pages">...</Button>
        <Button variant="outline" className={joinedButtons}>Next</Button>
      </div>
    </div>
  );
}

function ButtonOutlinedPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" className="h-[38px] border-zinc-300 bg-white px-3.5 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">Primary</Button>
      <Button variant="outline" className="h-[38px] border-red-500 bg-red-50 px-3.5 text-red-700 hover:bg-[#fef1f1] hover:text-red-700 dark:border-red-500 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50">Danger</Button>
      <Button variant="outline" className="h-[38px] border-green-500 bg-green-50 px-3.5 text-green-700 hover:bg-green-50 hover:text-green-700 dark:border-green-500 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50">Success</Button>
      <Button variant="ghost" className="h-[38px] px-3.5">Ghost</Button>
    </div>
  );
}

function ButtonSizesPreview() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="xs" className="h-7 px-2 text-sm">Extra Small</Button>
      <Button size="sm" className="h-8 px-3 text-sm">Small</Button>
      <Button className="h-9 px-3.5 text-sm">Medium</Button>
      <Button size="lg" className="h-10 px-3.5 text-sm">Large</Button>
    </div>
  );
}

function ButtonTypesPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="px-3.5">Primary</Button>
      <Button className="bg-red-600 px-3.5 text-white hover:bg-red-700">Danger</Button>
      <Button className="bg-emerald-600 px-3.5 text-white hover:bg-emerald-700">Success</Button>
      <Button variant="ghost" className="px-3.5">Ghost</Button>
    </div>
  );
}

function ButtonVariantsPreview() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="gap-2 px-3.5">
        <IconPlus className="size-4" />
        Add Item
      </Button>
      <Button size="icon" aria-label="Download">
        <IconDownload className="size-4" />
      </Button>
      <Button variant="outline" disabled>Disabled Button</Button>
      <Button variant="outline" disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Pending...
      </Button>
    </div>
  );
}

function IconButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon" aria-label="Search"><Search /></Button>
      <Button variant="outline" size="icon" aria-label="Download"><Download /></Button>
      <Button variant="secondary" size="icon" aria-label="Add item"><Plus /></Button>
      <Button variant="destructive" size="icon" aria-label="Delete item"><Trash2 /></Button>
      <Button variant="outline" className="gap-2"><Download />Download report</Button>
      <Button className="gap-2">Create project<Plus /></Button>
    </div>
  );
}

function SocialButtonsPreview() {
  return (
    <div className="flex w-full max-w-[21rem] flex-col gap-2">
      <Button variant="outline" className="h-10 w-full gap-2 bg-white font-normal hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <IconBrandGoogle aria-hidden="true" className="size-4 text-[#4285f4]" />
        Continue with Google
      </Button>
      <Button variant="outline" className="h-10 w-full gap-2 bg-white font-normal hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <IconBrandFacebookFilled aria-hidden="true" className="size-4 text-[#1877f2]" />
        Continue with Facebook
      </Button>
      <Button variant="outline" className="h-10 w-full gap-2 bg-white font-normal hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <IconBrandX aria-hidden="true" className="size-4" />
        Continue with X
      </Button>
      <Button variant="outline" className="h-10 w-full gap-2 bg-white font-normal hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <IconBrandAppleFilled aria-hidden="true" className="size-4" />
        Continue with Apple
      </Button>
      <Button variant="outline" className="h-10 w-full gap-2 bg-white font-normal hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <IconBrandDiscord aria-hidden="true" className="size-4" />
        Continue with Discord
      </Button>
    </div>
  );
}

export const metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return (
    <Showcase title="Buttons">
      <ComponentPreview title="Button Types"><ButtonTypesPreview /></ComponentPreview>
      <ComponentPreview title="Button Outlined"><ButtonOutlinedPreview /></ComponentPreview>
      <ComponentPreview title="Button Sizes"><ButtonSizesPreview /></ComponentPreview>
      <ComponentPreview title="Button Variants"><ButtonVariantsPreview /></ComponentPreview>
      <ComponentPreview title="Button Group"><ButtonGroupPreview /></ComponentPreview>
      <ComponentPreview title="Social Buttons"><SocialButtonsPreview /></ComponentPreview>
      <ComponentPreview title="Icon Buttons" className="xl:col-span-2"><IconButtons /></ComponentPreview>
    </Showcase>
  );
}
