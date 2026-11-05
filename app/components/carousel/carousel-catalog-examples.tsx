




import Image from "next/image";

import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Carousel } from "@/components/ui/carousel/carousel";

const slides = [
  { src: "/images/carousel/carousel-01.png", alt: "Creative workspace with a painted mural" },
  { src: "/images/carousel/carousel-02.png", alt: "Desk calendar and accessories" },
  { src: "/images/carousel/carousel-03.png", alt: "Colleagues working together" },
  { src: "/images/carousel/carousel-04.png", alt: "Team collaborating around a table" },
];

function Gallery({
  controls = true,
  indicators = true,
  align = "start",
  itemClassName,
  autoPlay = true,
}: {
  controls?: boolean;
  indicators?: boolean;
  align?: "start" | "center";
  itemClassName?: string;
  autoPlay?: boolean;
}) {
  return <Carousel
      aria-label="Bicycle image gallery"
      showArrows={controls}
      showDots={indicators}
      align={align}
      itemClassName={itemClassName}
      autoPlay={autoPlay}
    >
      {slides.map((slide) => (
        <div key={slide.src} className="relative aspect-[487/297] overflow-hidden rounded-lg">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ))}
    </Carousel>;
}

export function CarouselCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Controls" layout="stack">
      <div className="min-w-0 w-full"><Gallery controls={false} indicators={false} /></div>
      <div className="min-w-0 w-full"><Gallery indicators={false} /></div>
      <div className="min-w-0 w-full"><Gallery controls={false} /></div>
      <div className="min-w-0 w-full"><Gallery /></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Platform release highlights" autoPlay={false} showArrows={false} showDots>
                {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute inset-x-5 bottom-10 text-white"><p className="text-xs font-medium uppercase tracking-wide">Update {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
              </Carousel></div>
      </ComponentPreview>
      <ComponentPreview title="Layout" layout="stack">
      <div className="min-w-0 w-full"><Gallery align="center" itemClassName="w-[78%] sm:w-[58%]" autoPlay={false} /></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Vertical project gallery" orientation="vertical" autoPlay={false} itemClassName="h-52 w-full">
                {slides.map((slide) => <div key={slide.src} className="relative h-full overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Responsive project cards" autoPlay={false} gap={24} itemClassName="w-[84%] sm:w-[47%] xl:w-[31%]">
                {slides.map((slide) => <div key={slide.src} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-[4/3]"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 80vw, 31vw" className="object-cover" /></div><p className="p-3 text-sm font-medium">{slide.alt}</p></div>)}
              </Carousel></div>
      </ComponentPreview>
      <ComponentPreview title="Media" span={2} layout="stack">
      <div className="min-w-0 w-full"><Carousel aria-label="Autoplay project gallery" autoPlay autoPlayInterval={3500} loop showDots>
                {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Release highlights" autoPlay={false} showDots={false} thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-12 sm:size-16"><Image src={slide.src} alt="" fill sizes="64px" className="object-cover" /></span>)}>
                {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute inset-x-4 bottom-4 text-white"><p className="text-xs font-medium uppercase tracking-wide">Release highlight {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Team showcase" autoPlay={false} showDots={false} thumbnailPosition="overlay" thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-10 sm:size-14"><Image src={slide.src} alt="" fill sizes="56px" className="object-cover" /></span>)}>
                {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
