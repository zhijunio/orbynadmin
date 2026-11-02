"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { useState } from "react";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { RangeSlider, Slider } from "@/components/base/slider/slider";

function SliderExamples() {
  const [volume, setVolume] = useState(42);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [opacity, setOpacity] = useState(64);

  return <>
      <ComponentPreview title="Single Value">
        <div className="w-full max-w-md space-y-3 px-2 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Volume</span>
            <span className="tabular-nums text-muted-foreground">{volume}</span>
          </div>
          <Slider
            label="Volume"
            value={volume}
            onChange={setVolume}
            onChangeEnd={(value) => setVolume(value)}
            aria-label="Volume"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Minimum and Maximum Range">
        <div className="w-full max-w-md space-y-3 px-2 pt-5">
          <p className="text-sm font-medium">Monthly budget</p>
          <RangeSlider
            label="Monthly budget"
            min={0}
            max={1000}
            step={50}
            value={priceRange}
            onChange={setPriceRange}
            formatValue={(value) => `$${value}`}
            aria-label="Monthly budget"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Value Without Bubble">
        <div className="w-full max-w-md space-y-3 px-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Opacity</span>
            <span className="tabular-nums text-muted-foreground">{opacity}%</span>
          </div>
          <Slider
            label="Opacity"
            value={opacity}
            onChange={setOpacity}
            formatValue={(value) => `${value}%`}
            showTooltip={false}
            aria-label="Opacity"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Range">
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
    </>;
}

export default function SliderPage() {
  return <ConsoleLayout>{<Showcase title="Slider">
      <SliderExamples />
    </Showcase>}</ConsoleLayout>;
}
