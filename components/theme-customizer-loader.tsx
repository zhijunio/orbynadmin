"use client";

import dynamic from "next/dynamic";
import { useThemeConfig } from "@/components/theme-customizer";

const ThemeCustomizerPanel = dynamic(
  () =>
    import("@/components/theme-customizer-panel").then(
      (module) => module.ThemeCustomizer,
    ),
  { ssr: false },
);

export function ThemeCustomizerLoader() {
  const { open } = useThemeConfig();

  return open ? <ThemeCustomizerPanel /> : null;
}
