"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Showcase } from "@/components/feature/example/Showcase";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Button } from "@/components/ui/button";

const slides = ["/images/cycles/cycle-1.jpg", "/images/cycles/cycle-2.jpg", "/images/cycles/cycle-3.jpg"];

function Carousel({ controls = false, indicators = false }: { controls?: boolean; indicators?: boolean }) {
  const [active, setActive] = useState(0);
  const change = (offset: number) => setActive((current) => (current + offset + slides.length) % slides.length);
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-xl">
      <div className="relative aspect-[16/10]">
        <Image src={slides[active]} alt={`Carousel image ${active + 1}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      {controls && <><Button type="button" variant="secondary" size="icon" aria-label="Previous slide" onClick={() => change(-1)} className="absolute top-1/2 left-3 -translate-y-1/2"><ChevronLeft /></Button><Button type="button" variant="secondary" size="icon" aria-label="Next slide" onClick={() => change(1)} className="absolute top-1/2 right-3 -translate-y-1/2"><ChevronRight /></Button></>}
      {indicators && <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">{slides.map((_, index) => <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)} className={`size-2.5 rounded-full ${active === index ? "bg-primary" : "bg-background/80"}`} />)}</div>}
    </div>
  );
}

export default function CarouselPage() {
  return <Showcase title="Carousels">
    <ComponentPreview title="Slides Only"><Carousel /></ComponentPreview>
    <ComponentPreview title="With Controls"><Carousel controls /></ComponentPreview>
    <ComponentPreview title="With Indicators"><Carousel indicators /></ComponentPreview>
    <ComponentPreview title="Controls and Indicators"><Carousel controls indicators /></ComponentPreview>
  </Showcase>;
}
