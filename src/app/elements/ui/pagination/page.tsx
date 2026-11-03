"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { PageHeader } from "@/components/application/app-shell/page-header";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Button } from "@/components/base/buttons/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/base/pagination/pagination";

type PaginationRowProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  previous?: "label" | "text" | "icon";
  next?: "label" | "text" | "icon";
  variant?: "default" | "outlined";
  joined?: boolean;
};

function PaginationRow({
  currentPage,
  setCurrentPage,
  maxPage,
  previous = "label",
  next = "label",
  variant = "default",
  joined = false,
}: PaginationRowProps) {
  const siblingStart = Math.max(2, currentPage - 1);
  const siblingEnd = Math.min(maxPage - 1, currentPage + 1);
  const pageItems: (number | "leading-ellipsis" | "trailing-ellipsis")[] = [1];

  if (siblingStart > 2) {
    pageItems.push("leading-ellipsis");
  } else {
    for (let page = 2; page < siblingStart; page += 1) pageItems.push(page);
  }

  for (let page = siblingStart; page <= siblingEnd; page += 1) pageItems.push(page);

  if (siblingEnd < maxPage - 1) {
    pageItems.push("trailing-ellipsis");
  } else {
    for (let page = siblingEnd + 1; page < maxPage; page += 1) pageItems.push(page);
  }

  if (maxPage > 1) pageItems.push(maxPage);
  return <Pagination className="mx-0 w-full min-w-0 sm:min-w-[34rem]">
      <PaginationContent className={joined ? "gap-0 overflow-hidden rounded-lg border border-input" : "w-full flex-wrap justify-between gap-1"}>
        <PaginationItem className={joined ? "border-r" : undefined}>
          <PaginationPrevious
            href="#"
            text={previous === "icon" ? "" : "Previous"}
            showIcon={previous !== "text"}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={`${previous === "text" ? "h-10" : "h-10 max-sm:size-8 max-sm:justify-center max-sm:px-0"} aria-disabled:pointer-events-none aria-disabled:opacity-50`}
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(Math.max(1, currentPage - 1));
            }}
          />
        </PaginationItem>
        <PaginationItem className="flex max-w-full flex-wrap items-center gap-1">
          {pageItems.map((item) => typeof item === "number" ? (
              <PaginationLink
                key={item}
                href="#"
                isActive={currentPage === item}
                aria-label={`Go to page ${item}`}
                className={`size-10 max-sm:size-8 ${joined ? "rounded-none border-r" : "rounded-[10px]"} ${currentPage === item ? "bg-primary font-medium text-primary-foreground hover:bg-primary/90" : variant === "outlined" ? "border border-input text-foreground hover:bg-muted" : "border border-transparent text-muted-foreground hover:bg-muted/60"}`}
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage(item);
                }}
              >
                {item}
              </PaginationLink>
            ) : <PaginationEllipsis key={item} className="max-sm:size-8" />)}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            text={next === "icon" ? "" : "Next"}
            showIcon={next !== "text"}
            aria-disabled={currentPage >= maxPage}
            tabIndex={currentPage >= maxPage ? -1 : undefined}
            className={`${next === "text" ? "h-10" : "h-10 max-sm:size-8 max-sm:justify-center max-sm:px-0"} aria-disabled:pointer-events-none aria-disabled:opacity-50`}
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(Math.min(maxPage, currentPage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>;
}

function TextPagination() {
  const [page, setPage] = useState(1);
  const total = 10;
  return <div className="flex w-full flex-wrap items-center justify-between gap-4">
    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button>
    <span className="text-sm text-muted-foreground" aria-live="polite">Page {page} of {total}</span>
    <Button variant="outline" size="sm" disabled={page === total} onClick={() => setPage((value) => Math.min(total, value + 1))}>Next</Button>
  </div>;
}

function PaginationExample() {
  const [second, setSecond] = useState(3);
  const [third, setThird] = useState(6);
  const [fourth, setFourth] = useState(2);

  return <>
    <ComponentPreview title="Default Pagination"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} /></div></div></ComponentPreview>
    <ComponentPreview title="Outlined Pagination"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={fourth} setCurrentPage={setFourth} maxPage={10} variant="outlined" /></div></div></ComponentPreview>
    <ComponentPreview title="Pagination with Text"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} previous="text" next="text" /></div></div></ComponentPreview>
    <ComponentPreview title="Pagination with Text and Icon"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} variant="outlined" /></div></div></ComponentPreview>
    <ComponentPreview title="Pagination with Icon"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={third} setCurrentPage={setThird} maxPage={181} previous="icon" next="icon" /></div></div></ComponentPreview>
    <ComponentPreview title="Joined Pagination"><div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={fourth} setCurrentPage={setFourth} maxPage={15} joined /></div></div></ComponentPreview>
    <ComponentPreview title="Text Summary Pagination"><TextPagination /></ComponentPreview>
  </>;
}

export default function PaginationPage() {
  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Pagination" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0"><PaginationExample /></div></div>}</ConsoleLayout>;
}
