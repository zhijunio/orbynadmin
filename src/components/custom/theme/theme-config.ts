// ---------------------------------------------------------------------------
// Theme customizer config — presets + helpers shared by the customizer panel.
// ---------------------------------------------------------------------------

export type SidebarVariant = "inset" | "sidebar" | "floating";
export type SidebarCollapsible = "icon" | "offcanvas";
export type ContentLayout = "centered" | "full";

export type ThemeConfig = {
  accent: string;
  radius: number;
  font: string;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  contentLayout: ContentLayout;
};

export const defaultConfig: ThemeConfig = {
  accent: "blue",
  radius: 0.65,
  font: "geist",
  sidebarVariant: "floating",
  sidebarCollapsible: "icon",
  contentLayout: "full",
};

export type Accent = {
  key: string;
  label: string;
  swatch: string;
  primary: string;
  fg: string;
  darkPrimary?: string;
  darkFg?: string;
};

export const accents: Accent[] = [
  { key: "neutral", label: "Neutral", swatch: "oklch(0.205 0 0)", primary: "oklch(0.205 0 0)", fg: "oklch(0.985 0 0)", darkPrimary: "oklch(0.922 0 0)", darkFg: "oklch(0.205 0 0)" },
  { key: "pink", label: "Pink", swatch: "oklch(0.525 0.223 3.958)", primary: "oklch(0.525 0.223 3.958)", fg: "oklch(0.971 0.014 343.198)", darkPrimary: "oklch(0.459 0.187 3.815)", darkFg: "oklch(0.971 0.014 343.198)" },
  { key: "rose", label: "Rose", swatch: "oklch(0.514 0.222 16.935)", primary: "oklch(0.514 0.222 16.935)", fg: "oklch(0.969 0.015 12.422)", darkPrimary: "oklch(0.455 0.188 13.697)", darkFg: "oklch(0.969 0.015 12.422)" },
  { key: "red", label: "Red", swatch: "oklch(0.505 0.213 27.518)", primary: "oklch(0.505 0.213 27.518)", fg: "oklch(0.971 0.013 17.38)", darkPrimary: "oklch(0.444 0.177 26.899)", darkFg: "oklch(0.971 0.013 17.38)" },
  { key: "orange", label: "Orange", swatch: "oklch(0.553 0.195 38.402)", primary: "oklch(0.553 0.195 38.402)", fg: "oklch(0.98 0.016 73.684)", darkPrimary: "oklch(0.47 0.157 37.304)", darkFg: "oklch(0.98 0.016 73.684)" },
  { key: "amber", label: "Amber", swatch: "oklch(0.555 0.163 48.998)", primary: "oklch(0.555 0.163 48.998)", fg: "oklch(0.987 0.022 95.277)", darkPrimary: "oklch(0.473 0.137 46.201)", darkFg: "oklch(0.987 0.022 95.277)" },
  { key: "yellow", label: "Yellow", swatch: "oklch(0.852 0.199 91.936)", primary: "oklch(0.852 0.199 91.936)", fg: "oklch(0.421 0.095 57.708)", darkPrimary: "oklch(0.795 0.184 86.047)", darkFg: "oklch(0.421 0.095 57.708)" },
  { key: "lime", label: "Lime", swatch: "oklch(0.841 0.238 128.85)", primary: "oklch(0.841 0.238 128.85)", fg: "oklch(0.405 0.101 131.063)", darkPrimary: "oklch(0.768 0.233 130.85)", darkFg: "oklch(0.405 0.101 131.063)" },
  { key: "green", label: "Green", swatch: "oklch(0.527 0.154 150.069)", primary: "oklch(0.527 0.154 150.069)", fg: "oklch(0.982 0.018 155.826)", darkPrimary: "oklch(0.448 0.119 151.328)", darkFg: "oklch(0.982 0.018 155.826)" },
  { key: "emerald", label: "Emerald", swatch: "oklch(0.508 0.118 165.612)", primary: "oklch(0.508 0.118 165.612)", fg: "oklch(0.979 0.021 166.113)", darkPrimary: "oklch(0.432 0.095 166.913)", darkFg: "oklch(0.979 0.021 166.113)" },
  { key: "teal", label: "Teal", swatch: "oklch(0.511 0.096 186.391)", primary: "oklch(0.511 0.096 186.391)", fg: "oklch(0.984 0.014 180.72)", darkPrimary: "oklch(0.437 0.078 188.216)", darkFg: "oklch(0.984 0.014 180.72)" },
  { key: "cyan", label: "Cyan", swatch: "oklch(0.52 0.105 223.128)", primary: "oklch(0.52 0.105 223.128)", fg: "oklch(0.984 0.019 200.873)", darkPrimary: "oklch(0.45 0.085 224.283)", darkFg: "oklch(0.984 0.019 200.873)" },
  { key: "sky", label: "Sky", swatch: "oklch(0.5 0.134 242.749)", primary: "oklch(0.5 0.134 242.749)", fg: "oklch(0.977 0.013 236.62)", darkPrimary: "oklch(0.443 0.11 240.79)", darkFg: "oklch(0.977 0.013 236.62)" },
  { key: "blue", label: "Blue", swatch: "oklch(0.488 0.243 264.376)", primary: "oklch(0.488 0.243 264.376)", fg: "oklch(0.97 0.014 254.604)", darkPrimary: "oklch(0.424 0.199 265.638)", darkFg: "oklch(0.97 0.014 254.604)" },
  { key: "indigo", label: "Indigo", swatch: "oklch(0.457 0.24 277.023)", primary: "oklch(0.457 0.24 277.023)", fg: "oklch(0.962 0.018 272.314)", darkPrimary: "oklch(0.398 0.195 277.366)", darkFg: "oklch(0.962 0.018 272.314)" },
  { key: "violet", label: "Violet", swatch: "oklch(0.491 0.27 292.581)", primary: "oklch(0.491 0.27 292.581)", fg: "oklch(0.969 0.016 293.756)", darkPrimary: "oklch(0.432 0.232 292.759)", darkFg: "oklch(0.969 0.016 293.756)" },
  { key: "purple", label: "Purple", swatch: "oklch(0.496 0.265 301.924)", primary: "oklch(0.496 0.265 301.924)", fg: "oklch(0.977 0.014 308.299)", darkPrimary: "oklch(0.438 0.218 303.724)", darkFg: "oklch(0.977 0.014 308.299)" },
  { key: "fuchsia", label: "Fuchsia", swatch: "oklch(0.518 0.253 323.949)", primary: "oklch(0.518 0.253 323.949)", fg: "oklch(0.977 0.017 320.058)", darkPrimary: "oklch(0.452 0.211 324.591)", darkFg: "oklch(0.977 0.017 320.058)" },
];

export const radii = [
  { label: "0", value: 0 },
  { label: "0.3", value: 0.3 },
  { label: "0.5", value: 0.5 },
  { label: "0.65", value: 0.65 },
  { label: "0.75", value: 0.75 },
  { label: "1.0", value: 1 },
];

export type FontOption = { key: string; label: string; stack: string | null };

export const fonts: FontOption[] = [
  { key: "geist", label: "Geist", stack: null },
  {
    key: "system",
    label: "System",
    stack:
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  { key: "inter", label: "Inter", stack: '"Inter Variable", "Geist Variable", ui-sans-serif, system-ui, sans-serif' },
  { key: "roboto", label: "Roboto", stack: '"Roboto Variable", "Geist Variable", ui-sans-serif, system-ui, sans-serif' },
  { key: "figtree", label: "Figtree", stack: '"Figtree Variable", "Geist Variable", ui-sans-serif, system-ui, sans-serif' },
  { key: "source-sans-3", label: "Source Sans 3", stack: '"Source Sans 3 Variable", "Geist Variable", ui-sans-serif, system-ui, sans-serif' },
  {
    key: "serif",
    label: "Serif",
    stack: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
  },
  {
    key: "mono",
    label: "Mono",
    stack:
      '"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
];

export const sidebarVariants: { key: SidebarVariant; label: string }[] = [
  { key: "inset", label: "Inset" },
  { key: "sidebar", label: "Sidebar" },
  { key: "floating", label: "Floating" },
];

export const collapsibleModes: { key: SidebarCollapsible; label: string }[] = [
  { key: "icon", label: "Icon" },
  { key: "offcanvas", label: "Off-canvas" },
];

export const contentLayouts: { key: ContentLayout; label: string }[] = [
  { key: "full", label: "Full width" },
  { key: "centered", label: "Centered" },
];

/** Build a copy-pasteable CSS + notes snippet for the current config. */
export function buildThemeCss(config: ThemeConfig): string {
  const accent = accents.find((a) => a.key === config.accent);
  const font = fonts.find((f) => f.key === config.font);
  const lines: string[] = [];
  lines.push("/* OrbynAdmin theme — generated by the customizer. */");
  lines.push(":root {");
  lines.push(`  --radius: ${config.radius}rem;`);
  if (accent) {
    lines.push(`  --primary: ${accent.primary};`);
    lines.push(`  --primary-foreground: ${accent.fg};`);
    lines.push(`  --ring: ${accent.primary};`);
    lines.push(`  --sidebar-primary: ${accent.primary};`);
    lines.push(`  --sidebar-ring: ${accent.primary};`);
    lines.push(`  --chart-1: ${accent.primary};`);
    lines.push(`  --chart-2: color-mix(in oklch, var(--primary) 45%, oklch(0.7 0.16 162));`);
    lines.push(`  --chart-3: color-mix(in oklch, var(--primary) 45%, oklch(0.72 0.17 65));`);
    lines.push(`  --chart-4: color-mix(in oklch, var(--primary) 45%, oklch(0.65 0.24 16));`);
    lines.push(`  --chart-5: color-mix(in oklch, var(--primary) 45%, oklch(0.62 0.21 305));`);
  }
  if (font?.stack) {
    lines.push(`  --font-sans: ${font.stack};`);
    lines.push(`  --font-heading: ${font.stack};`);
  }
  lines.push("}");
  if (accent?.darkPrimary) {
    lines.push("", ".dark {");
    lines.push(`  --primary: ${accent.darkPrimary};`);
    lines.push(`  --primary-foreground: ${accent.darkFg ?? accent.fg};`);
    lines.push(`  --ring: ${accent.darkPrimary};`);
    lines.push(`  --sidebar-primary: ${accent.darkPrimary};`);
    lines.push(`  --sidebar-ring: ${accent.darkPrimary};`);
    lines.push(`  --chart-1: ${accent.darkPrimary};`);
    lines.push(`  --chart-2: color-mix(in oklch, var(--primary) 45%, oklch(0.72 0.15 162));`);
    lines.push(`  --chart-3: color-mix(in oklch, var(--primary) 45%, oklch(0.77 0.16 65));`);
    lines.push(`  --chart-4: color-mix(in oklch, var(--primary) 45%, oklch(0.68 0.22 16));`);
    lines.push(`  --chart-5: color-mix(in oklch, var(--primary) 45%, oklch(0.67 0.2 305));`);
    lines.push("}");
  }
  lines.push("");
  lines.push(
    `/* <Sidebar variant="${config.sidebarVariant}" collapsible="${config.sidebarCollapsible}" /> */`
  );
  lines.push(`/* content layout: ${config.contentLayout} */`);
  return lines.join("\n");
}
