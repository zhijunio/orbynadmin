"use client";

import {
  IconCalendarEvent,
  IconChartBar,
  IconCreditCard,
  IconMessageCircle,
  IconPackage,
  IconPlugConnected,
  IconPlus,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty/empty";

import { EmptyCatalogIconState } from "@/app/components/empty/empty-catalog-state";

export function EmptyIllustrationCatalogExamples() {
  return (
    <>
      <ComponentPreview title="Comments Board">
        <Empty className="min-h-52 rounded-xl p-4">
          <div className="relative mb-3 flex h-16 w-full max-w-48 items-end justify-center gap-2">
            <div className="h-8 w-12 -rotate-6 rounded-md border bg-muted" />
            <div className="h-12 w-16 rounded-md border bg-card shadow-sm" />
            <div className="h-9 w-12 rotate-6 rounded-md border bg-muted" />
            <span className="absolute right-6 top-0 grid size-7 place-items-center rounded-full border bg-background">
              <IconMessageCircle className="size-4" />
            </span>
          </div>
          <EmptyHeader>
            <EmptyTitle>No comments yet</EmptyTitle>
            <EmptyDescription>Start a discussion on this project board.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">Add a comment</Button>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
      <ComponentPreview title="Layered Products">
        <Empty className="min-h-52 rounded-xl p-4">
          <div className="relative mb-3 h-14 w-24">
            <div className="absolute left-1 top-1 size-12 rotate-[-12deg] rounded-lg border bg-muted" />
            <div className="absolute left-8 top-0 size-12 rotate-6 rounded-lg border bg-card shadow-sm" />
            <IconPackage className="absolute left-10 top-3 size-7 text-primary" />
          </div>
          <EmptyHeader>
            <EmptyTitle>No products in catalog</EmptyTitle>
            <EmptyDescription>Add your first product to start managing inventory.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>
              <IconPlus />
              Add product
            </Button>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
      <ComponentPreview title="File Search">
        <Empty className="min-h-52 rounded-xl p-4">
          <div className="relative mb-3 h-14 w-28">
            <div className="absolute left-2 top-1 h-12 w-9 rotate-[-12deg] rounded border bg-muted" />
            <div className="absolute left-10 top-0 h-12 w-9 rotate-6 rounded border bg-card shadow-sm" />
            <IconSearch className="absolute left-[4.25rem] top-3 size-6 text-primary" />
          </div>
          <EmptyHeader>
            <EmptyTitle>No files found</EmptyTitle>
            <EmptyDescription>Check the spelling or search another folder.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">Browse all files</Button>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
      <ComponentPreview title="Chat Messages">
        <Empty className="min-h-52 rounded-xl p-4">
          <div className="mb-3 flex h-14 items-center gap-2">
            <span className="rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs">Hello!</span>
            <span className="mb-5 rounded-xl rounded-br-sm bg-primary/10 px-3 py-2 text-xs">Welcome</span>
            <IconMessageCircle className="size-5 text-primary" />
          </div>
          <EmptyHeader>
            <EmptyTitle>No messages yet</EmptyTitle>
            <EmptyDescription>Start a conversation with your project team.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>
              <IconPlus />
              New message
            </Button>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
      <ComponentPreview title="Payments">
        <EmptyCatalogIconState
          icon={IconCreditCard}
          title="No payments recorded"
          description="Completed invoices and payment history will appear here."
          action={<Button variant="outline">View billing settings</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Integrations">
        <Empty className="min-h-52 rounded-xl p-4">
          <div className="relative mb-3 flex h-12 w-36 items-center justify-between">
            <span className="grid size-9 place-items-center rounded-lg border bg-card">
              <IconPlugConnected className="size-4" />
            </span>
            <span className="h-px flex-1 border-t border-dashed" />
            <span className="grid size-9 place-items-center rounded-lg border bg-muted">
              <IconSettings className="size-4" />
            </span>
            <span className="h-px flex-1 border-t border-dashed" />
            <span className="grid size-9 place-items-center rounded-lg border bg-card">
              <IconChartBar className="size-4" />
            </span>
          </div>
          <EmptyHeader>
            <EmptyTitle>No integrations connected</EmptyTitle>
            <EmptyDescription>Connect the tools your team uses to sync activity.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Browse integrations</Button>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
      <ComponentPreview title="Calendar Events">
        <EmptyCatalogIconState
          icon={IconCalendarEvent}
          title="No upcoming events"
          description="Schedule a review or check another date for upcoming team events."
          action={<Button variant="outline">Open calendar</Button>}
        />
      </ComponentPreview>
    </>
  );
}
