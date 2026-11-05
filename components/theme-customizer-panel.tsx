"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  IconCopy,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconChevronDown,
} from "@tabler/icons-react";

import {
  accents,
  radii,
  fonts,
  sidebarVariants,
  collapsibleModes,
  contentLayouts,
  buildThemeCss,
} from "@/components/theme-config";
import { useThemeConfig } from "@/components/theme-customizer";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button/button";
import { Label } from "@/components/ui/input/label";
import { Separator } from "@/components/ui/divider/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
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
  className,
  style,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={style}
      className={cn(
        "flex h-9 items-center justify-center gap-1.5 rounded-md border px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:bg-accent",
        className
      )}
    >
      {children}
    </button>
  );
}

export function ThemeCustomizer() {
  const { config, setConfig, reset, open, setOpen } = useThemeConfig();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [accentPickerOpen, setAccentPickerOpen] = React.useState(false);
  const selectedAccent = accents.find((accent) => accent.key === config.accent) ?? accents[0];

  function copyConfig() {
    const css = buildThemeCss(config);
    navigator.clipboard.writeText(css).then(
      () => toast.success("Theme copied", { description: "Paste it into your globals.css" }),
      () => toast.error("Could not copy to clipboard")
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={isMobile}>
      <SheetContent
        showOverlay={isMobile}
        onOpenAutoFocus={(event) => {
          if (!isMobile) event.preventDefault();
        }}
        onInteractOutside={(event) => {
          if (!isMobile) event.preventDefault();
        }}
        className="flex w-[min(24rem,calc(100vw-3rem))] flex-col gap-0 p-0 sm:max-w-sm md:!inset-y-3 md:!right-3 md:!top-16 md:!bottom-3 md:!h-auto md:!w-80 md:!rounded-xl md:!border"
      >
        <SheetHeader className="shrink-0 border-b">
          <SheetTitle>{"Customize"}</SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-6 p-4">
            <Section label={"Mode"}>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={theme === "light"} onClick={() => setTheme("light")}>
                  <IconSun className="size-4" /> {"Light"}
                </OptionButton>
                <OptionButton active={theme === "dark"} onClick={() => setTheme("dark")}>
                  <IconMoon className="size-4" /> {"Dark"}
                </OptionButton>
                <OptionButton active={theme === "system"} onClick={() => setTheme("system")}>
                  <IconDeviceDesktop className="size-4" /> {"Auto"}
                </OptionButton>
              </div>
            </Section>

            <Section label={"Accent color"}>
              <Popover open={accentPickerOpen} onOpenChange={setAccentPickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-4 shrink-0 rounded-full"
                        style={{ background: resolvedTheme === "dark" ? selectedAccent.darkPrimary ?? selectedAccent.swatch : selectedAccent.swatch }}
                      />
                      <span className="truncate">{selectedAccent.label}</span>
                    </span>
                    <IconChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[min(18rem,calc(100vw-1rem))]">
                  <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto" role="group" aria-label={"Accent color"}>
                    {accents.map((accent) => (
                      <button
                        key={accent.key}
                        type="button"
                        onClick={() => {
                          setConfig((current) => ({ ...current, accent: accent.key }));
                          setAccentPickerOpen(false);
                        }}
                        aria-pressed={config.accent === accent.key}
                        className={cn(
                          "flex min-w-0 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          config.accent === accent.key
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="size-5 shrink-0 rounded-full"
                          style={{ background: resolvedTheme === "dark" ? accent.darkPrimary ?? accent.swatch : accent.swatch }}
                        />
                        <span className="w-full truncate text-center">{accent.label}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </Section>

            <Section label={"Radius"}>
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

            <Section label={"Font"}>
              <div className="grid grid-cols-3 gap-2">
                {fonts.map((f) => (
                  <OptionButton
                    key={f.key}
                    active={config.font === f.key}
                    onClick={() => setConfig((c) => ({ ...c, font: f.key }))}
                    className="h-auto min-h-9 whitespace-normal break-words px-1 py-2 leading-tight"
                    style={{ fontFamily: f.stack ?? "var(--font-geist-sans), ui-sans-serif, sans-serif" }}
                  >
                    {f.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Separator />

            <Section label={"Sidebar style"}>
              <div className="grid grid-cols-3 gap-2">
                {sidebarVariants.map((v) => (
                  <OptionButton
                    key={v.key}
                    active={config.sidebarVariant === v.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, sidebarVariant: v.key }))
                    }
                  >
                    {v.label}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label={"Sidebar collapse"}>
              <div className="grid grid-cols-2 gap-2">
                {collapsibleModes.map((m) => (
                  <OptionButton
                    key={m.key}
                    active={config.sidebarCollapsible === m.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, sidebarCollapsible: m.key }))
                    }
                  >
                    {m.key === "icon" ? "Icon" : "Off-canvas"}
                  </OptionButton>
                ))}
              </div>
            </Section>

            <Section label={"Content layout"}>
              <div className="grid grid-cols-2 gap-2">
                {contentLayouts.map((l) => (
                  <OptionButton
                    key={l.key}
                    active={config.contentLayout === l.key}
                    onClick={() =>
                      setConfig((c) => ({ ...c, contentLayout: l.key }))
                    }
                  >
                    {l.key === "full" ? "Full width" : "Centered"}
                  </OptionButton>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 border-t p-4">
          <Button variant="outline" className="flex-1" onClick={reset}>
            {"Reset"}
          </Button>
          <Button className="flex-1" onClick={copyConfig}>
            <IconCopy className="size-4" /> {"Copy config"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
