import Link from "next/link";
import { IconSparkles } from "@tabler/icons-react";

import { ErrorState as BaseErrorState, type ErrorStateProps } from "@/components/application/feedback/error-state";

type Props = Omit<ErrorStateProps, "brand" | "footer" | "primaryHref" | "primaryLabel">;

export function ErrorState(props: Props) {
  return (
    <BaseErrorState
      {...props}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      brand={(
        <header className="flex items-center px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><IconSparkles className="size-5" /></span>
            <span className="tracking-tight">OrbynAdmin</span>
          </Link>
        </header>
      )}
      footer={<footer className="px-6 py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} OrbynAdmin. All rights reserved.</footer>}
    />
  );
}
