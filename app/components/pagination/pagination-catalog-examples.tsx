"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select/native-select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination/pagination";

type PaginationRowProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  previous?: "label" | "text" | "icon";
  next?: "label" | "text" | "icon";
  variant?: "default" | "outlined";
  joined?: boolean;
  circle?: boolean;
};

function PaginationRow({
  currentPage,
  setCurrentPage,
  maxPage,
  previous = "label",
  next = "label",
  variant = "default",
  joined = false,
  circle = false,
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
  return <Pagination className="mx-0 w-full min-w-0 max-w-full">
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
                className={`size-10 max-sm:size-8 ${joined ? "rounded-none border-r" : circle ? "rounded-full" : "rounded-[10px]"} ${currentPage === item ? "bg-primary font-medium text-primary-foreground hover:bg-primary/90" : variant === "outlined" ? "border border-input text-foreground hover:bg-muted" : "border border-transparent text-muted-foreground hover:bg-muted/60"}`}
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

function PageSelectPagination() {
  const [page, setPage] = useState(1);
  const total = 10;
  const goTo = (nextPage: number) => setPage(Math.min(total, Math.max(1, nextPage)));
  return <Pagination className="mx-0 w-full">
    <PaginationContent className="flex-wrap justify-center gap-1">
      <PaginationItem><PaginationLink href="#" aria-label="Go to first page" onClick={(event) => { event.preventDefault(); goTo(1); }}><IconChevronsLeft aria-hidden="true" className="size-4" /></PaginationLink></PaginationItem>
      <PaginationItem><PaginationLink href="#" aria-label="Go to previous page" onClick={(event) => { event.preventDefault(); goTo(page - 1); }}><IconChevronLeft aria-hidden="true" className="size-4" /></PaginationLink></PaginationItem>
      <PaginationItem><NativeSelect aria-label="Select page" className="w-28" value={String(page)} onChange={(event) => goTo(Number(event.currentTarget.value))}>{Array.from({ length: total }, (_, index) => <NativeSelectOption key={index + 1} value={String(index + 1)}>Page {index + 1}</NativeSelectOption>)}</NativeSelect></PaginationItem>
      <PaginationItem><PaginationLink href="#" aria-label="Go to next page" onClick={(event) => { event.preventDefault(); goTo(page + 1); }}><IconChevronRight aria-hidden="true" className="size-4" /></PaginationLink></PaginationItem>
      <PaginationItem><PaginationLink href="#" aria-label="Go to last page" onClick={(event) => { event.preventDefault(); goTo(total); }}><IconChevronsRight aria-hidden="true" className="size-4" /></PaginationLink></PaginationItem>
    </PaginationContent>
    <span className="sr-only" aria-live="polite">Page {page} of {total}</span>
  </Pagination>;
}

export function PaginationCatalogExamples() {
  const [second, setSecond] = useState(3);
  const [third, setThird] = useState(6);
  const [fourth, setFourth] = useState(2);
  const [goToPage, setGoToPage] = useState(4);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return <>
    <ComponentPreview title="Style" description="Default, outlined, joined, and circular page links." layout="stack">
<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} /></div></div>

<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={fourth} setCurrentPage={setFourth} maxPage={10} variant="outlined" /></div></div>

<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={fourth} setCurrentPage={setFourth} maxPage={15} joined /></div></div>

<div className="w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={third} setCurrentPage={setThird} maxPage={10} circle/></div></div>
</ComponentPreview>
    <ComponentPreview title="Labels" description="Text-only, icon-only, and compact previous/next labels." layout="stack">
<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} previous="text" next="text" /></div></div>

<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} variant="outlined" /></div></div>

<div className="min-w-0 w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={third} setCurrentPage={setThird} maxPage={181} previous="icon" next="icon" /></div></div>

<TextPagination />

<div className="w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} previous="icon" next="icon"/></div></div>

<div className="w-full max-w-md"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10} previous="icon" next="icon" variant="outlined"/></div>
</ComponentPreview>
    <ComponentPreview title="Summary" layout="stack">
<div className="grid w-full max-w-xl justify-items-center gap-3"><p className="text-sm text-muted-foreground">Page {second} of 10</p><div className="overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={second} setCurrentPage={setSecond} maxPage={10}/></div></div></div>

<div className="w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={2} setCurrentPage={setSecond} maxPage={24}/></div></div>

<div className="w-full max-w-xl rounded-xl border bg-card p-4"><p className="mb-4 text-sm text-muted-foreground">Showing 21–30 of 128 projects</p><div className="overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={fourth} setCurrentPage={setFourth} maxPage={13}/></div></div></div>
</ComponentPreview>
    <ComponentPreview title="Controls" description="Jump to page, rows per page, and page select." layout="stack">
<div className="flex w-full max-w-md items-center gap-3"><span className="text-sm">Go to page</span><input type="number" min={1} max={10} value={goToPage} onChange={(event)=>setGoToPage(Math.min(10,Math.max(1,Number(event.currentTarget.value))))} className="h-9 w-20 rounded-md border bg-background px-2 text-sm"/><Button size="sm" variant="outline" onClick={()=>setFourth(goToPage)}>Go</Button></div>

<div className="flex w-full max-w-xl flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm">Rows per page<select value={rowsPerPage} onChange={(event)=>setRowsPerPage(Number(event.currentTarget.value))} className="h-9 rounded-md border bg-background px-2">{[10,20,50].map((value)=><option key={value}>{value}</option>)}</select></label><span className="text-xs text-muted-foreground">{rowsPerPage} rows shown</span><div className="w-full overflow-x-auto"><div className="min-w-[34rem]"><PaginationRow currentPage={third} setCurrentPage={setThird} maxPage={12}/></div></div></div>

<PageSelectPagination />
</ComponentPreview>
  </>;
}

