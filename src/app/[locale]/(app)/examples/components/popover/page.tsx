import { Showcase } from "@/components/feature/example/Showcase";

import { Trash as IconTrash } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const directions = ["top", "left", "bottom", "right"] as const;
const popoverDescription = "Popovers are great for showing small bits of context without navigating away from the current page.";

function DirectionalPopovers({ showArrow = true }: { showArrow?: boolean }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-5">
      {directions.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 w-fit px-4">Open {side[0].toUpperCase() + side.slice(1)} Popover</Button>
          </PopoverTrigger>
          <PopoverContent side={side} sideOffset={8} showArrow={showArrow} className="w-80 border border-border bg-card p-4 shadow-lg">
            <PopoverHeader className="gap-1">
              <PopoverTitle className="text-sm font-semibold">{side[0].toUpperCase() + side.slice(1)} Popover</PopoverTitle>
              <PopoverDescription className="text-sm leading-5 text-muted-foreground">{popoverDescription}</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

function ActionsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button className="px-4">Item Actions</Button></PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="w-[21rem] border border-border bg-card p-4 shadow-lg">
        <PopoverHeader className="gap-1">
          <PopoverTitle className="text-sm font-semibold">Manage this item</PopoverTitle>
          <PopoverDescription className="text-xs leading-4 text-muted-foreground">Choose an action to perform on the selected record.</PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2 pt-2">
          <PopoverClose asChild><Button variant="outline" size="sm">Cancel</Button></PopoverClose>
          <PopoverClose asChild><Button variant="destructive" size="sm"><IconTrash className="size-4" />Delete</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ButtonPopoverSupplement() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Popover Text</Button></PopoverTrigger>
      <PopoverContent className="w-72 border border-border bg-card p-4">
        <PopoverHeader>
          <PopoverTitle>Popover Text</PopoverTitle>
        </PopoverHeader>
        <Button size="sm" className="mt-1">Action</Button>
      </PopoverContent>
    </Popover>
  );
}

function FormPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Invite teammate</Button></PopoverTrigger>
      <PopoverContent align="start" className="w-80 border border-border bg-card p-4">
        <PopoverHeader className="gap-1">
          <PopoverTitle className="text-sm font-semibold">Invite a teammate</PopoverTitle>
          <PopoverDescription className="text-sm leading-5 text-muted-foreground">Send an invitation to join this workspace.</PopoverDescription>
        </PopoverHeader>
        <div className="mt-4 grid gap-2">
          <Label htmlFor="invite-email">Email address</Label>
          <Input id="invite-email" type="email" placeholder="name@company.com" />
          <PopoverClose asChild><Button size="sm" className="mt-1 w-full">Send invitation</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PopoversExample() {
  return (
    <>
      <ComponentPreview title="Popover Positions">
        <DirectionalPopovers />
      </ComponentPreview>
      <ComponentPreview title="Without Arrow">
        <DirectionalPopovers showArrow={false} />
      </ComponentPreview>
      <ComponentPreview title="With Actions">
        <ActionsPopover />
      </ComponentPreview>
      <ComponentPreview title="Popover With Button">
        <ButtonPopoverSupplement />
      </ComponentPreview>
      <ComponentPreview title="Popover With Form" className="xl:col-span-2">
        <FormPopover />
      </ComponentPreview>
    </>
  );
}

export const metadata = { title: "Popovers" };

export default function PopoversPage() {
  return <Showcase title="Popovers"><PopoversExample /></Showcase>;
}
