import type { Icon } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty/empty";

export function EmptyCatalogState({
  icon: IconComponent,
  title,
  description,
  action,
  children,
  variant = "default",
}: {
  icon: Icon;
  title: string;
  description: string;
  action?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "dashed";
}) {
  return (
    <Empty className={`min-h-40 rounded-xl ${variant === "dashed" ? "border border-dashed border-border p-5" : "p-4"}`}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconComponent aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {children}
        {action}
      </EmptyContent>
    </Empty>
  );
}

export function EmptyCatalogIconState({
  icon: IconComponent,
  title,
  description,
  action,
}: {
  icon: Icon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Empty className="min-h-40 rounded-xl p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconComponent aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{action}</EmptyContent>
    </Empty>
  );
}
