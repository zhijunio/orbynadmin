"use client";
import { useState } from "react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Button } from "@/components/ui/button/button";
import { ColorPicker, ColorWell } from "@/components/ui/color-picker/color-picker";

const palette = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0f766e", "#db2777", "#475569"];

function rgb(hex: string) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
  const parsed = Number.parseInt(full, 16);
  return { r: (parsed >> 16) & 255, g: (parsed >> 8) & 255, b: parsed & 255 };
}

function luminance(hex: string) {
  const channel = (value: number) => { const scaled = value / 255; return scaled <= 0.04045 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4; };
  const { r, g, b } = rgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function ColorPickerCatalogExamples() {
const [color, setColor] = useState("#2563eb");
  const [hexValue, setHexValue] = useState("#2563eb");
  const [opacity, setOpacity] = useState(65);
  const [hue, setHue] = useState(220);
  const [lightness, setLightness] = useState(55);
  const [chroma, setChroma] = useState(20);
  const [recent, setRecent] = useState<string[]>(["#2563eb", "#059669", "#d97706"]);
  const [submitted, setSubmitted] = useState(false);
  const updateColor = (next: string) => {
    setColor(next.toLowerCase());
    setHexValue(next.toLowerCase());
    setRecent((items) => [next.toLowerCase(), ...items.filter((item) => item.toLowerCase() !== next.toLowerCase())].slice(0, 6));
  };
  const { r, g, b } = rgb(color);
  const setChannel = (channel: "r" | "g" | "b", next: number) => {
    const channels = { r, g, b, [channel]: next };
    updateColor(`#${[channels.r, channels.g, channels.b].map((item) => item.toString(16).padStart(2, "0")).join("")}`);
  };
  const contrast = (Math.max(luminance(color), luminance("#ffffff")) + 0.05) / (Math.min(luminance(color), luminance("#ffffff")) + 0.05);

  return (
    <CatalogGridItems>

          <ComponentPreview title="Inline Picker and Popover Well">
            <div className="flex flex-wrap items-start gap-4"><div className="grid gap-2"><span className="text-sm font-medium">Inline color input</span><ColorPicker aria-label="Choose an inline color" value={color} onValueChange={updateColor} /></div><ColorWell label="Open full color picker" value={color} onValueChange={updateColor} swatches={palette} /></div>
          </ComponentPreview>

          <ComponentPreview title="Color Input and Format Converter">
            <div className="grid w-full max-w-lg gap-3"><ColorPicker aria-label="Edit color value" value={color} onValueChange={updateColor} /><label className="grid gap-1 text-sm font-medium">HEX<input value={hexValue} onChange={(event) => { const next = event.currentTarget.value; setHexValue(next); if (/^#[\da-fA-F]{6}$/.test(next)) updateColor(next); }} aria-invalid={!/^#[\da-fA-F]{6}$/.test(hexValue)} className="h-9 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive" /></label><div className="grid grid-cols-2 gap-2 text-xs"><output className="rounded-md border p-2 font-mono">RGB {r}, {g}, {b}</output><output className="rounded-md border p-2 font-mono">HSL hue {hue}°</output><output className="rounded-md border p-2 font-mono">HSB {Math.round(Math.max(r, g, b) / 255 * 100)}%</output><button type="button" className="rounded-md border p-2 text-left font-mono hover:bg-accent" onClick={() => void navigator.clipboard?.writeText(`oklch(0.55 0.2 ${hue})`)}>OKLCH 0.55 0.2 {hue} · Copy</button></div></div>
          </ComponentPreview>

          <ComponentPreview title="Opacity and Overlay Preview">
            <div className="w-full max-w-lg space-y-3"><ColorPicker aria-label="Choose overlay color" value={color} onValueChange={updateColor} /><label htmlFor="color-opacity" className="flex items-center justify-between text-sm font-medium"><span>Overlay opacity</span><output htmlFor="color-opacity">{opacity}%</output></label><input id="color-opacity" type="range" min="0" max="100" value={opacity} onChange={(event) => setOpacity(Number(event.currentTarget.value))} className="w-full accent-primary" /><div className="relative isolate h-20 overflow-hidden rounded-lg border bg-muted"><div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-muted),var(--color-background))]" /><div aria-label={`Color overlay at ${opacity}% opacity`} className="absolute inset-0" style={{ backgroundColor: color, opacity: opacity / 100 }} /></div></div>
          </ComponentPreview>

          <ComponentPreview title="Preset Swatches and Recent Colors">
            <div className="grid w-full max-w-lg gap-3"><div className="flex flex-wrap gap-2">{palette.map((preset) => <button key={preset} type="button" aria-label={`Set color ${preset}`} aria-pressed={preset === color} onClick={() => updateColor(preset)} className="size-8 rounded-full border border-foreground/15 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring aria-pressed:ring-2 aria-pressed:ring-ring" style={{ backgroundColor: preset }} />)}<ColorWell label="Choose custom color" value={color} onValueChange={updateColor} /></div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">Recent</span>{recent.map((item, index) => <button key={`${item}-${index}`} type="button" aria-label={`Restore recent color ${item}`} onClick={() => updateColor(item)} className="size-6 rounded-md border" style={{ backgroundColor: item }} />)}</div><div className="flex items-center gap-2"><span className="size-5 rounded-full border" style={{ backgroundColor: color }} /><span className="text-sm">Deployment status label</span></div></div>
          </ComponentPreview>

          <ComponentPreview title="Hue Wheel and Channel Controls">
            <div className="grid w-full max-w-lg gap-3"><div className="flex items-center gap-4"><div aria-label={`Hue selector at ${hue} degrees`} className="size-20 shrink-0 rounded-full border-4 border-background shadow-sm" style={{ background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`, boxShadow: `inset 0 0 0 5px var(--color-background), 0 0 0 1px var(--color-border)` }} /><div className="min-w-0 flex-1"><label htmlFor="hue-channel" className="flex justify-between text-sm font-medium"><span>Hue</span><output>{hue}°</output></label><input id="hue-channel" type="range" min="0" max="360" value={hue} onChange={(event) => setHue(Number(event.currentTarget.value))} className="mt-2 w-full accent-primary" /></div></div><div className="grid gap-2">{([["Red", "r", r], ["Green", "g", g], ["Blue", "b", b]] as const).map(([label, channel, value]) => <label key={label} className="grid grid-cols-[3.5rem_1fr_2rem] items-center gap-2 text-xs text-muted-foreground">{label}<input aria-label={`${label} channel`} type="range" min="0" max="255" value={value} onChange={(event) => setChannel(channel, Number(event.currentTarget.value))} className="accent-primary" /><output className="text-right font-mono">{value}</output></label>)}</div><p className="text-xs text-muted-foreground">Hue wheel and RGB channels update the selected color.</p></div>
          </ComponentPreview>

          <ComponentPreview title="OKLCH Theme Token">
            <div className="grid w-full max-w-lg gap-3">{[["Lightness", lightness, setLightness, 0, 100], ["Chroma", chroma, setChroma, 0, 40], ["Hue", hue, setHue, 0, 360]].map(([label, value, setValue, min, max]) => <label key={label as string} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-2 text-xs font-medium">{label as string}<input type="range" min={min as number} max={max as number} value={value as number} onChange={(event) => (setValue as (value: number) => void)(Number(event.currentTarget.value))} className="accent-primary" /><output className="text-right tabular-nums">{value as number}</output></label>)}<code className="rounded-lg border bg-muted/30 p-3 text-sm">--primary: oklch({(lightness / 100).toFixed(2)} { (chroma / 100).toFixed(2) } {hue});</code><div className="flex items-center gap-2"><Button type="button" size="sm" onClick={() => void navigator.clipboard?.writeText(`--primary: oklch(${(lightness / 100).toFixed(2)} ${(chroma / 100).toFixed(2)} ${hue});`)}>Copy CSS token</Button><span className="size-8 rounded-md border" style={{ backgroundColor: `oklch(${(lightness / 100).toFixed(2)} ${(chroma / 100).toFixed(2)} ${hue})` }} /></div><p className="text-xs text-muted-foreground">Adjust lightness, chroma, and hue; high-chroma colors may be outside sRGB.</p></div>
          </ComponentPreview>

          <ComponentPreview title="Text and Highlight Colors">
            <div className="grid w-full max-w-lg gap-3"><div className="flex flex-wrap gap-2">{palette.slice(0, 6).map((item) => <button key={item} type="button" aria-label={`Set text color ${item}`} onClick={() => updateColor(item)} className="size-7 rounded-full border" style={{ backgroundColor: item }} />)}</div><div className="rounded-lg border p-4"><p style={{ color }}>Selected text color for dashboard labels</p><p className="mt-2"><mark className="rounded px-1" style={{ backgroundColor: `color-mix(in oklch, ${color} 24%, transparent)` }}>Highlighted matching value</mark></p></div></div>
          </ComponentPreview>

          <ComponentPreview title="Design Inspector and Brand Scale">
            <div className="grid w-full max-w-lg gap-3"><div className="rounded-lg border p-3"><div className="flex items-center justify-between"><span className="text-sm font-medium">Primary action</span><span className="text-xs text-muted-foreground">Button · brand primary</span></div><div className="mt-3 flex gap-2"><Button type="button" style={{ backgroundColor: color }}>Save changes</Button><Button type="button" variant="outline" style={{ color, borderColor: color }}>Secondary action</Button></div></div><div className="grid grid-cols-5 gap-1" aria-label="Brand color scale">{[90, 75, 60, 45, 30].map((amount) => <div key={amount} className="space-y-1"><div className="h-8 rounded-md border" style={{ backgroundColor: `color-mix(in oklch, ${color} ${amount}%, white)` }} /><span className="block text-center text-[10px] text-muted-foreground">{amount}</span></div>)}</div></div>
          </ComponentPreview>

          <ComponentPreview title="Contrast Checker">
            <div className="grid w-full max-w-lg gap-3"><label className="grid gap-1 text-sm font-medium">Text color<ColorPicker aria-label="Choose text color" value={color} onValueChange={updateColor} /></label><div className="flex items-center justify-between rounded-lg border p-4" style={{ backgroundColor: "#ffffff", color }}><span className="font-medium">Readable dashboard text</span><span className="font-mono text-sm">{contrast.toFixed(2)}:1</span></div><p role="status" className="text-xs text-muted-foreground">{contrast >= 4.5 ? "Meets WCAG AA for normal text." : "Below 4.5:1 for normal text; choose a darker color."}</p></div>
          </ComponentPreview>

          <ComponentPreview title="Required Color Field with Validation">
            <form className="grid w-full max-w-lg gap-3" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="grid gap-1 text-sm font-medium">Brand color<ColorPicker aria-label="Required brand color" value={color} onValueChange={updateColor} /><input aria-label="Brand color HEX value" value={hexValue} onChange={(event) => { setHexValue(event.currentTarget.value); if (/^#[\da-fA-F]{6}$/.test(event.currentTarget.value)) updateColor(event.currentTarget.value); }} required pattern="#[\da-fA-F]{6}" aria-invalid={!/^#[\da-fA-F]{6}$/.test(hexValue)} className="h-9 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive" /></label><p className="text-xs text-muted-foreground">Enter a valid six-digit HEX value for workspace labels and actions.</p><Button type="submit" className="w-fit">Save color</Button>{submitted && <p role="status" className="text-sm text-primary">Color saved: {color}</p>}</form>
          </ComponentPreview>
    </CatalogGridItems>
  );
}
