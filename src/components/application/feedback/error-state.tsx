import type { ReactNode } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  type TablerIcon,
} from "@tabler/icons-react";

import { Button } from "@/components/base/buttons/button";

export type ErrorStateProps = {
  /** The HTTP status code shown as the large faded hero number. */
  code: string;
  /** Bold headline under the code. */
  title: string;
  /** Muted supporting copy. */
  description: string;
  /** Optional accent icon rendered in a rounded card above the code. */
  icon?: TablerIcon;
  /** Caller-provided branding or application navigation. */
  brand?: ReactNode;
  /** Primary action link. */
  primaryHref: string;
  primaryLabel: string;
  /** Optional caller-provided footer. */
  footer?: ReactNode;
  /** Optional secondary action link. */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Optional icon for the secondary action. */
  secondaryIcon?: TablerIcon;
};

export function ErrorState({
  code,
  title,
  description,
  icon: Icon,
  brand,
  primaryHref,
  primaryLabel,
  footer,
  secondaryHref,
  secondaryLabel,
  secondaryIcon: SecondaryIcon,
}: ErrorStateProps) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      {/* Background — subtle grid + soft brand glow, tuned for light & dark */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)]" />
        <div
          className="absolute left-1/2 top-1/3 h-[480px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--chart-1), transparent), radial-gradient(closest-side at 65% 60%, var(--chart-5), transparent)",
          }}
        />
      </div>

      {brand}

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg text-center">
          {Icon ? (
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm">
              <Icon className="size-8 text-primary" />
            </div>
          ) : null}

          <p className="mt-8 select-none text-[6.5rem] leading-none font-bold tracking-tighter text-foreground tabular-nums sm:text-[9rem]">
            {code}
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 gap-2 px-6 text-sm" asChild>
              <Link href={primaryHref}>
                <IconArrowLeft className="size-4" />
                {primaryLabel}
              </Link>
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button
                size="lg"
                variant="outline"
                className="h-11 gap-2 px-6 text-sm"
                asChild
              >
              <Link href={secondaryHref}>
                  {SecondaryIcon ? <SecondaryIcon className="size-4" /> : null}
                  {secondaryLabel}
              </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </main>

      {footer}
    </div>
  );
}
