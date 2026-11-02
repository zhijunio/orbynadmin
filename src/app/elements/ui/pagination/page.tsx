"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { Showcase } from "@/components/application/docs/showcase";

import { useState } from "react";
import { ComponentPreview } from "@/components/application/docs/component-preview";
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
  previous?: "label" | "icon";
  next?: "label" | "icon";
  activeStyle?: "filled" | "soft";
  joined?: boolean;
};

function PaginationRow({
  currentPage,
  setCurrentPage,
  maxPage,
  previous = "label",
  next = "label",
  activeStyle = "soft",
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
            text={previous === "label" ? "Previous" : ""}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className="h-10 max-sm:size-8 max-sm:justify-center max-sm:px-0 aria-disabled:pointer-events-none aria-disabled:opacity-50"
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
                className={`size-10 max-sm:size-8 ${joined ? "rounded-none border-r" : ""} ${currentPage === item ? activeStyle === "filled" ? "bg-muted font-medium" : "bg-muted/70 font-medium" : "text-muted-foreground"}`}
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
            text={next === "label" ? "Next" : ""}
            aria-disabled={currentPage >= maxPage}
            tabIndex={currentPage >= maxPage ? -1 : undefined}
            className="h-10 max-sm:size-8 max-sm:justify-center max-sm:px-0 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(Math.min(maxPage, currentPage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>;
}

function PaginationExample() {
  const [first, setFirst] = useState(1);
  const [second, setSecond] = useState(3);
  const [third, setThird] = useState(6);
  const [fourth, setFourth] = useState(2);

  return <ComponentPreview title="Pagination Variants" className="lg:col-span-2">
      <div className="min-w-0 w-full max-w-full overflow-x-auto">
        <div className="flex min-w-0 flex-col gap-5 py-1 sm:min-w-[42rem]">
          <PaginationRow
            currentPage={first}
            setCurrentPage={setFirst}
            maxPage={15}
          />
          <PaginationRow
            currentPage={second}
            setCurrentPage={setSecond}
            maxPage={10}
            previous="icon"
            next="icon"
            activeStyle="filled"
          />
          <PaginationRow
            currentPage={third}
            setCurrentPage={setThird}
            maxPage={181}
          />
          <PaginationRow
            currentPage={fourth}
            setCurrentPage={setFourth}
            maxPage={15}
            joined
          />
        </div>
      </div>
    </ComponentPreview>;
}

export default function PaginationPage() {
  return <ConsoleLayout>{<Showcase title="Pagination"><PaginationExample /></Showcase>}</ConsoleLayout>;
}
