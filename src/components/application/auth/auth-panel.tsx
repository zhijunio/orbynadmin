import type { ComponentProps, ReactNode } from "react";

import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { SocialButton, type SocialProvider } from "@/components/base/social-button/social-button";

export type AuthLayout = "stacked" | "inline" | "grid";

export function AuthPanel({
  title,
  description,
  children,
  variant = "standard",
  brand,
  artwork,
}: {
  title: string;
  description: string;
  children: ReactNode;
  variant?: "standard" | "split";
  brand?: ReactNode;
  artwork?: ReactNode;
}) {
  const content = (
    <>
      {brand}
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </header>
      <div className="mt-6 space-y-5">{children}</div>
    </>
  );

  if (variant === "split") {
    return (
      <section className="mx-auto grid w-full max-w-[880px] overflow-hidden rounded-3xl border bg-card shadow-xs md:grid-cols-2">
        <div className="p-6 sm:p-8">{content}</div>
        <div className="relative hidden min-h-[540px] bg-muted md:block">{artwork}</div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[400px] rounded-3xl border bg-card p-6 shadow-xs sm:p-8">
      {content}
    </section>
  );
}

export function Field({ id, label, ...props }: { id: string; label: string } & ComponentProps<typeof Input>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="relative py-0.5 text-center text-xs text-muted-foreground">
      <span className="relative z-10 bg-card px-2">{label}</span>
      <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-border" />
    </div>
  );
}

export function AuthSwitch({ lead, action, onClick }: { lead: string; action: string; onClick: () => void }) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {lead && `${lead} `}
      <button type="button" onClick={onClick} className="font-medium text-foreground hover:underline">
        {action}
      </button>
    </p>
  );
}

export function SocialProviders({
  layout,
  providers,
  onProviderSelect,
}: {
  layout: AuthLayout;
  providers: SocialProvider[];
  onProviderSelect?: (provider: SocialProvider) => void;
}) {
  return (
    <div className={layout === "stacked" ? "flex flex-col gap-2.5" : layout === "inline" ? "flex flex-wrap justify-center gap-2" : "grid grid-flow-col auto-cols-fr gap-2.5"}>
      {providers.map((provider) => (
        <SocialButton
          key={provider}
          brand={provider}
          appearance="white"
          size="small"
          iconOnly={layout !== "stacked"}
          fullWidth={layout === "stacked"}
          className={layout === "grid" ? "w-full" : undefined}
          onClick={onProviderSelect ? () => onProviderSelect(provider) : undefined}
        />
      ))}
    </div>
  );
}
