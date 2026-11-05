import * as React from "react";
import { IconChevronLeft as ChevronLeft, IconChevronRight as ChevronRight, IconDots as MoreHorizontal } from "@tabler/icons-react";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/utils/cn";

export type PaginationProps = React.ComponentProps<"nav">
export type PaginationContentProps = React.ComponentProps<"ul">
export type PaginationItemProps = React.ComponentProps<"li">
export type PaginationLinkProps = {
  isActive?: boolean
  size?: React.ComponentProps<typeof Button>["size"]
} & React.ComponentProps<"a">
export type PaginationPreviousProps = PaginationLinkProps & {
  text?: string
  showIcon?: boolean
}
export type PaginationNextProps = PaginationLinkProps & {
  text?: string
  showIcon?: boolean
}
export type PaginationEllipsisProps = React.ComponentProps<"span">

function Pagination({ className, ...props }: PaginationProps) {
  return <nav aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}
function PaginationContent({ className, ...props }: PaginationContentProps) {
  return <ul className={cn("flex items-center gap-0.5", className)} {...props} />;
}
function PaginationItem(props: PaginationItemProps) { return <li {...props} />; }
function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return <Button asChild variant={isActive ? "outline" : "ghost"} size={size} className={className}><a aria-current={isActive ? "page" : undefined} {...props} /></Button>;
}
function PaginationPrevious({ className, text = "Previous", showIcon = true, ...props }: PaginationPreviousProps) {
  return <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5", className)} {...props}>{showIcon && <ChevronLeft aria-hidden="true" />}{text && <span className={showIcon ? "hidden sm:block" : undefined}>{text}</span>}</PaginationLink>;
}
function PaginationNext({ className, text = "Next", showIcon = true, ...props }: PaginationNextProps) {
  return <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5", className)} {...props}>{text && <span className={showIcon ? "hidden sm:block" : undefined}>{text}</span>}{showIcon && <ChevronRight aria-hidden="true" />}</PaginationLink>;
}
function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return <span className={cn("flex size-9 items-center justify-center", className)} {...props}><MoreHorizontal aria-hidden="true" className="size-4" /><span className="sr-only">More pages</span></span>;
}
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
