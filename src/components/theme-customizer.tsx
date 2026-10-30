"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  IconCopy,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconPalette,
} from "@tabler/icons-react";

import {
  accents,
  radii,
  fonts,
  sidebarVariants,
  collapsibleModes,
  contentLayouts,
  buildThemeCss,
} from "@/lib/theme-config";
import { useThemeConfigStore } from "@/stores/theme-config-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function useThemeConfig() {
  return {
    config: useThemeConfigStore((state) => state.config),
    setConfig: useThemeConfigStore((state) => state.setConfig),
    reset: useThemeConfigStore((state) => state.reset),
    open: useThemeConfigStore((state) => state.open),
    setOpen: useThemeConfigStore((state) => state.setOpen),
  };
}

export function ThemeConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = useThemeConfigStore((state) => state.config);
  const configLoaded = useThemeConfigStore((state) => state.hydrated);

  React.useEffect(() => {
    void useThemeConfigStore.persist.rehydrate();
  }, []);

  // Apply config to the document + persist.
  React.useLayoutEffect(() => {
    if (!configLoaded) return;

    const root = document.documentElement;
    const accent = accents.find((a) => a.key === config.accent);
    const props = [
      "--primary",
      "--primary-foreground",
      "--ring",
      "--sidebar-primary",
      "--sidebar-ring",
      "--chart-1",
    ];
    if (accent?.primary) {
      root.style.setProperty("--primary", accent.primary);
      root.style.setProperty("--primary-foreground", accent.fg);
      root.style.setProperty("--ring", accent.primary);
      root.style.setProperty("--sidebar-primary", accent.primary);
      root.style.setProperty("--sidebar-ring", accent.primary);
      root.style.setProperty("--chart-1", accent.primary);
    } else {
      props.forEach((p) => root.style.removeProperty(p));
    }

    root.style.setProperty("--radius", `${config.radius}rem`);

    const font = fonts.find((f) => f.key === config.font);
    if (font?.stack) root.style.setProperty("--font-sans", font.stack);
    else root.style.removeProperty("--font-sans");

    root.dataset.content = config.contentLayout;

  }, [config, configLoaded]);
  return children;
}

/** Colorful color-wheel button for the header, next to the theme toggle. */
export function CustomizerButton() {
  const { setOpen } = useThemeConfig();
  const t = useTranslations("ThemeCustomizer");
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label={t("customize")}
      onClick={() => setOpen(true)}
    >
      <IconPalette className="size-5" />
    </Button>
  );
}

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-9 items-center justify-center gap-1.5 rounded-md border px-2 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

export function ThemeCustomizer() {
  const { config, setConfig, reset, open, setOpen } = useThemeConfig();
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeCustomizer");

  function copyConfig() {
    const css = buildThemeCss(config);
    navigator.clipboard.writeText(css).then(
      () => toast.success(t("copied"), { description: t("copyHint") }),
      () => toast.error(t("copyFailed"))
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="shrink-0 border-b">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>
            {t("description")}
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-6 p-4">
            <Section label={t("mode")}>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={theme === "light"} onClick={() => setTheme("light")}>
                  <IconSun className="size-4" /> {t("light")}
                </OptionButton>
                <OptionButton active={theme === "dark"} onClick={() => setTheme("dark")}>
                  <IconMoon className="size-4" /> {t("dark")}
                </OptionButton>
                <OptionButton active={theme === "system"} onClick={() => setTheme("system")}>
                  <IconDeviceDesktop className="size-4" /> {t("auto")}
                </OptionButton>
              </div>
            </Section>

            <Section label={t("accentColor")}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {accents.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setConfig((c) => ({ ...c, accent: a.key }))}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                      config.accent === a.key
                        ? "border-primary"
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <span
                      className="size-4 shrink-0 rounded-full"
                      style={{ background: a.swatch }}
                    />
                    <span className="truncate">{t.has(a.label) ? t(a.label) : a.label}</span>
                  </button>
                ))}
              </div>
            </Section>

            <Section label={t("radius")}>
              <div className="grid grid-cols-6 gap-2">
                {radii.map((r) => (
                  <OptionButton
                    key={r.value}
                    active={config.radius === r.value}
                    onClick={() => setConfig((c) => ({ ...c, radius: r.value }))}
                  >
                    {r.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label={t("font")}>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((f) => (
                  <OptionButton
                    key={f.key}
                    active={config.font === f.key}
                    onClick={() => setConfig((c) => ({ ...c, font: f.key }))}
                  >
                    {t.has(f.label) ? t(f.label) : f.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Separator />

            <Section label={t("sidebarStyle")}>
              <div className="grid grid-cols-3 gap-2">
                {sidebarVariants.map((v) => (
                  <OptionButton
                    key={v.key}
                    active={config.sidebarVariant === v.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, sidebarVariant: v.key }))
                    }
                  >
                    {t.has(v.label) ? t(v.label) : v.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label={t("sidebarCollapse")}>
              <div className="grid grid-cols-2 gap-2">
                {collapsibleModes.map((m) => (
                  <OptionButton
                    key={m.key}
                    active={config.sidebarCollapsible === m.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, sidebarCollapsible: m.key }))
                    }
                  >
                    {m.key === "icon" ? t("icon") : t("offCanvas")}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label={t("contentLayout")}>
              <div className="grid grid-cols-2 gap-2">
                {contentLayouts.map((l) => (
                  <OptionButton
                    key={l.key}
                    active={config.contentLayout === l.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, contentLayout: l.key }))
                    }
                  >
                    {l.key === "full" ? t("fullWidth") : t("centered")}
                  </OptionButton>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 border-t p-4">
          <Button variant="outline" className="flex-1" onClick={reset}>
            {t("reset")}
          </Button>
          <Button className="flex-1" onClick={copyConfig}>
            <IconCopy className="size-4" /> {t("copyConfig")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
