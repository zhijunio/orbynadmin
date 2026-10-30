import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}
function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center gap-0.5", className)} {...props} />;
}
function PaginationItem(props: React.ComponentProps<"li">) { return <li {...props} />; }
type LinkProps = { isActive?: boolean; size?: React.ComponentProps<typeof Button>["size"] } & React.ComponentProps<"a">;
function PaginationLink({ className, isActive, size = "icon", ...props }: LinkProps) {
  return <Button asChild variant={isActive ? "outline" : "ghost"} size={size} className={className}><a aria-current={isActive ? "page" : undefined} {...props} /></Button>;
}
function PaginationPrevious({ className, text = "Previous", ...props }: LinkProps & { text?: string }) {
  return <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5", className)} {...props}><ChevronLeft aria-hidden="true" /><span className="hidden sm:block">{text}</span></PaginationLink>;
}
function PaginationNext({ className, text = "Next", ...props }: LinkProps & { text?: string }) {
  return <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5", className)} {...props}><span className="hidden sm:block">{text}</span><ChevronRight aria-hidden="true" /></PaginationLink>;
}
function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-hidden="true" className={cn("flex size-9 items-center justify-center", className)} {...props}><MoreHorizontal className="size-4" /><span className="sr-only">More pages</span></span>;
}
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
