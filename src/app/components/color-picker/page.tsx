"use client";

import ConsoleLayout from "@/components/custom/app-shell/console-layout";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/app-shell/page-header";
import { ColorPicker, ColorWell } from "@/components/ui/color-picker/color-picker";

const palette = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626"];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#2563eb");
  const [hexValue, setHexValue] = useState("#2563eb");
  const [opacity, setOpacity] = useState(65);

  const updateColor = (next: string) => {
    setColor(next);
    setHexValue(next);
  };

  return <ConsoleLayout>{<div className="min-w-0 space-y-5"><PageHeader title="Color Picker" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Default Color Picker">
        <ColorPicker aria-label="Choose a color" />
      </ComponentPreview>
      <ComponentPreview title="Controlled Value and Presets">
        <div className="space-y-3">
          <ColorPicker aria-label="Choose brand color" value={color} onValueChange={updateColor} />
          <div className="flex flex-wrap gap-2" aria-label="Color presets">
            {palette.map((preset) => (
              <button key={preset} type="button" aria-label={`Set color ${preset}`} aria-pressed={preset === color} onClick={() => updateColor(preset)} className="size-7 rounded-full border border-foreground/15 ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:ring-2 aria-pressed:ring-ring" style={{ backgroundColor: preset }} />
            ))}
          </div>
          <div className="h-12 w-full max-w-xs rounded-lg border" style={{ backgroundColor: color }} />
        </div>
      </ComponentPreview>
      <ComponentPreview title="HEX Input and Validation">
        <div className="w-full max-w-xs space-y-2">
          <label htmlFor="brand-color-hex" className="text-sm font-medium">Hex color</label>
          <div className="flex items-center gap-3">
            <ColorPicker aria-label="Choose brand color" value={color} onValueChange={updateColor} />
            <input id="brand-color-hex" value={hexValue} onChange={(event) => { const next = event.currentTarget.value; setHexValue(next); if (/^#[\da-fA-F]{6}$/.test(next)) setColor(next.toLowerCase()); }} aria-invalid={!/^#[\da-fA-F]{6}$/.test(hexValue)} className="h-9 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 font-mono text-sm uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive" />
          </div>
          <p className="text-xs text-muted-foreground">Enter a six-digit HEX value, such as #2563EB.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Color Well with Swatches">
        <ColorWell label="Project color" value={color} onValueChange={updateColor} swatches={palette} />
      </ComponentPreview>
      <ComponentPreview title="Opacity Preview">
        <div className="w-full max-w-xs space-y-3">
          <ColorPicker aria-label="Choose overlay color" value={color} onValueChange={updateColor} />
          <label htmlFor="color-opacity" className="flex items-center justify-between text-sm font-medium">
            <span>Overlay opacity</span><output htmlFor="color-opacity">{opacity}%</output>
          </label>
          <input id="color-opacity" type="range" min="0" max="100" value={opacity} onChange={(event) => setOpacity(Number(event.currentTarget.value))} className="w-full accent-primary" />
          <div className="relative isolate h-16 overflow-hidden rounded-lg border" style={{ backgroundImage: "repeating-conic-gradient(#d4d4d8 0% 25%, #fff 0% 50%)", backgroundSize: "16px 16px" }}>
            <div aria-label={`Color overlay at ${opacity}% opacity`} className="absolute inset-0" style={{ backgroundColor: color, opacity: opacity / 100 }} />
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled Color Picker">
        <ColorPicker aria-label="Locked brand color" value="#64748b" disabled />
      </ComponentPreview>
      <ComponentPreview title="Disabled Color Well">
        <ColorWell label="Locked color" value="#64748b" disabled />
      </ComponentPreview>
    </div></div>}</ConsoleLayout>;
}
