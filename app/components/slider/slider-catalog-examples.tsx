"use client";
import { useState } from "react";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { RangeSlider, Slider } from "@/components/ui/slider/slider";

function SliderExamples() {
  const [volume, setVolume] = useState(42);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [opacity, setOpacity] = useState(64);

  return <>
      <ComponentPreview title="Value">

        <div className="w-full max-w-md space-y-3 px-2 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Volume</span>
            <span className="tabular-nums text-muted-foreground">{volume}</span>
          </div>
          <Slider
            label="Volume"
            value={volume}
            onValueChange={setVolume}
            onValueCommit={(value) => setVolume(value)}
            aria-label="Volume"
          />
        </div>

<div className="w-full max-w-md px-2 pt-5"><Slider defaultValue={30} label="Progress" formatValue={(value) => `${value}%`} aria-label="Progress" /></div>

<div className="w-full max-w-md space-y-3 px-2"><Slider value={volume} onValueChange={setVolume} label="Volume" aria-label="Volume control" /><p aria-live="polite" className="text-xs text-muted-foreground">Current volume: {volume}</p></div>


        <div className="w-full max-w-md space-y-3 px-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Opacity</span>
            <span className="tabular-nums text-muted-foreground">{opacity}%</span>
          </div>
          <Slider
            label="Opacity"
            value={opacity}
            onValueChange={setOpacity}
            formatValue={(value) => `${value}%`}
            showTooltip={false}
            aria-label="Opacity"
          />
        </div>

<div className="w-full max-w-md px-2 pt-5"><Slider defaultValue={72} label="Threshold" formatValue={(value) => `${value}%`} showTooltip aria-label="Threshold"/></div>
</ComponentPreview>
    <ComponentPreview title="Range">

        <div className="w-full max-w-md space-y-3 px-2 pt-5">
          <p className="text-sm font-medium">Monthly budget</p>
          <RangeSlider
            label="Monthly budget"
            min={0}
            max={1000}
            step={50}
            value={priceRange}
            onValueChange={setPriceRange}
            formatValue={(value) => `$${value}`}
            aria-label="Monthly budget"
          />
        </div>

<div className="w-full max-w-md space-y-3 px-2"><RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={1000} step={10} label="Price range" formatValue={(value) => `$${value}`} aria-label="Filter by price range"/><p className="text-xs text-muted-foreground">${priceRange[0]} – ${priceRange[1]}</p></div>

<div className="w-full max-w-md px-2 pt-5"><RangeSlider defaultValue={[20, 80]} min={0} max={100} label="Selection" formatValue={(value) => `${value}%`} aria-label="Selected range" /></div>

<div className="flex h-52 items-center justify-center gap-12"><Slider defaultValue={50} max={100} step={1} orientation="vertical" className="h-40" label="Level" aria-label="Level"/><RangeSlider defaultValue={[25,75]} max={100} step={5} orientation="vertical" className="h-40" label="Selected range" aria-label="Selected range"/></div>
</ComponentPreview>
    <ComponentPreview title="States">

        <div className="w-full max-w-md space-y-3 px-2 pt-5">
          <RangeSlider
            label="Saved price range"
            min={0}
            max={100}
            defaultValue={[20, 70]}
            disabled
            formatValue={(value) => `$${value}`}
            aria-label="Saved price range"
          />
        </div>
</ComponentPreview>
    <ComponentPreview title="Field">
<div className="grid w-full max-w-md gap-3"><Slider value={opacity} onValueChange={setOpacity} label="Opacity" max={100} formatValue={(value) => `${value}%`} aria-label="Opacity"/><label className="grid max-w-32 gap-1 text-xs">Opacity (%)<input type="number" min="0" max="100" value={opacity} onChange={(event) => setOpacity(Number(event.currentTarget.value))} className="h-9 rounded-md border bg-background px-2 text-sm"/></label></div>
</ComponentPreview>
    <ComponentPreview title="Marks">
<div className="grid w-full max-w-md gap-1 px-2"><Slider defaultValue={50} label="Usage" aria-label="Usage"/><div className="flex justify-between text-xs text-muted-foreground"><span>Low</span><span>Typical</span><span>High</span></div></div>

<div className="grid w-full max-w-md gap-1 px-2"><Slider defaultValue={3} min={1} max={5} step={1} label="Priority" aria-label="Priority"/><div className="flex justify-between px-1 text-xs text-muted-foreground">{[1,2,3,4,5].map((value)=><span key={value}>|</span>)}</div></div>

<div className="grid w-full max-w-md gap-3"><div className="h-20 rounded-lg border" style={{background:`linear-gradient(90deg, hsl(${210 - opacity} 90% 70%), hsl(35 95% 70%))`}}/><Slider value={opacity} onValueChange={setOpacity} label="Color temperature" min={0} max={100} formatValue={(value) => `${Math.round(2500 + value * 55)}K`} aria-label="Color temperature"/></div>

<div className="grid w-full max-w-md gap-3 px-2"><Slider defaultValue={4} min={1} max={5} step={1} label="Satisfaction" showTooltip={false} aria-label="Satisfaction rating"/><div className="flex justify-between text-lg" aria-hidden="true"><span>😞</span><span>🙁</span><span>😐</span><span>🙂</span><span>😊</span></div></div>
</ComponentPreview>
    </>;
}

export function SliderCatalogExamples() {
  return (
    <CatalogGridItems>
      <SliderExamples />
    </CatalogGridItems>
  );
}
