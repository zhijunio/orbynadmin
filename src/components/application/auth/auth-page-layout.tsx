import Image from "next/image";
import { IconSparkles } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";

export async function AuthPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations("AuthLayout");

  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <main className="flex min-h-svh items-center justify-center px-6 py-10 sm:px-10">
        <div className="flex w-full max-w-[400px] flex-col">
          <div className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <IconSparkles aria-hidden="true" className="size-5" />
            </span>
            OrbynAdmin
          </div>
          <div className="mt-12">{children}</div>
        </div>
      </main>

      <aside className="relative hidden min-h-svh overflow-hidden bg-zinc-950 lg:block">
        <Image src="/images/models/building-model-1.jpg" alt="" fill priority sizes="50vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="relative flex min-h-svh items-end p-12 text-white xl:p-16">
          <div className="max-w-lg space-y-3">
            <p className="text-sm font-medium text-white/75">OrbynAdmin</p>
            <h2 className="text-3xl font-semibold tracking-tight">{t("headline")}</h2>
            <p className="max-w-md text-sm leading-6 text-white/75">{t("description")}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
