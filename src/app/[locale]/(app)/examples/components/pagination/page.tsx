"use client";

import { Showcase } from "@/components/feature/example/Showcase";

import { Fragment, useState } from "react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const lastPages = [maxPage - 2, maxPage - 1, maxPage];
  const firstPages = currentPage >= 4 && currentPage < maxPage - 2
    ? [currentPage, currentPage + 1, currentPage + 2]
    : [1, 2, 3];
  const visiblePages = [...firstPages, ...lastPages.filter((page) => !firstPages.includes(page))];
  const showEllipsis = firstPages[firstPages.length - 1] < lastPages[0] - 1;
  return (
    <Pagination className="mx-0 w-full min-w-[34rem]">
      <PaginationContent className={joined ? "gap-0 overflow-hidden rounded-lg border border-input" : "w-full justify-between gap-1"}>
        <PaginationItem className={joined ? "border-r" : undefined}>
          <PaginationPrevious
            href="#"
            text={previous === "label" ? "Previous" : ""}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className="h-10 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(Math.max(1, currentPage - 1));
            }}
          />
        </PaginationItem>
        <PaginationItem className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <Fragment key={page}>
              {showEllipsis && index === firstPages.length && <PaginationEllipsis />}
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                aria-label={`Go to page ${page}`}
                className={`size-10 ${joined ? "rounded-none border-r" : ""} ${currentPage === page ? activeStyle === "filled" ? "bg-muted font-medium" : "bg-muted/70 font-medium" : "text-muted-foreground"}`}
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </Fragment>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            text={next === "label" ? "Next" : ""}
            aria-disabled={currentPage >= maxPage}
            tabIndex={currentPage >= maxPage ? -1 : undefined}
            className="h-10 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(Math.min(maxPage, currentPage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PaginationExample() {
  const [first, setFirst] = useState(1);
  const [second, setSecond] = useState(3);
  const [third, setThird] = useState(4);
  const [fourth, setFourth] = useState(2);

  return (
    <ComponentPreview title="Pagination Variants" className="lg:col-span-2">
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-[42rem] flex-col gap-5 py-1">
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
            maxPage={10}
          />
          <PaginationRow
            currentPage={fourth}
            setCurrentPage={setFourth}
            maxPage={15}
            joined
          />
        </div>
      </div>
    </ComponentPreview>
  );
}

export default function PaginationPage() {
  return <Showcase title="Pagination"><PaginationExample /></Showcase>;
}
