"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IconPalette } from "@tabler/icons-react";
import {
  accents,
  fonts,
} from "@/components/theme-config";
import { useThemeConfigStore } from "@/components/theme-config-store";
import { Button } from "@/components/ui/button/button";

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
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    void useThemeConfigStore.persist.rehydrate();
  }, []);

  React.useLayoutEffect(() => {
    if (!configLoaded) return;

    const root = document.documentElement;
    const accent = accents.find((item) => item.key === config.accent);
    const properties = [
      "--primary",
      "--primary-foreground",
      "--ring",
      "--sidebar-primary",
      "--sidebar-ring",
      "--chart-1",
    ];

    if (accent) {
      const dark = resolvedTheme === "dark";
      const primary = dark ? accent.darkPrimary ?? accent.primary : accent.primary;
      const foreground = dark ? accent.darkFg ?? accent.fg : accent.fg;
      root.style.setProperty("--primary", primary);
      root.style.setProperty("--primary-foreground", foreground);
      root.style.setProperty("--ring", primary);
      root.style.setProperty("--sidebar-primary", primary);
      root.style.setProperty("--sidebar-ring", primary);
      root.style.setProperty("--chart-1", primary);
    } else {
      properties.forEach((property) => root.style.removeProperty(property));
    }

    root.style.setProperty("--radius", `${config.radius}rem`);

    const font = fonts.find((item) => item.key === config.font);
    if (font?.stack) {
      root.style.setProperty("--font-sans", font.stack);
      root.style.setProperty("--font-heading", font.stack);
    } else {
      root.style.removeProperty("--font-sans");
      root.style.removeProperty("--font-heading");
    }

    root.dataset.content = config.contentLayout;
  }, [config, configLoaded, resolvedTheme]);

  return children;
}

export function CustomizerButton() {
  const { setOpen } = useThemeConfig();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label="Customize theme"
      onClick={() => setOpen(true)}
    >
      <IconPalette className="size-5" />
    </Button>
  );
}
