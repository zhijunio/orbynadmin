import AppShell from "@/components/blocks/application/app-shell/app-shell";

export const metadata = { title: "Carousel" };




import Image from "next/image";

import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";
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



export default function CarouselPage() {
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Carousel" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2">
      <ComponentPreview title="Slides Only">
        <Gallery controls={false} indicators={false} />
      </ComponentPreview>
      <ComponentPreview title="With Controls">
        <Gallery indicators={false} />
      </ComponentPreview>
      <ComponentPreview title="With Indicators">
        <Gallery controls={false} />
      </ComponentPreview>
      <ComponentPreview title="With Controls and Indicators">
        <Gallery />
      </ComponentPreview>
      <ComponentPreview title="Card Widths and Alignment">
        <Gallery align="center" itemClassName="w-[78%] sm:w-[58%]" autoPlay={false} />
      </ComponentPreview>
      <ComponentPreview title="Vertical orientation">
        <Carousel aria-label="Vertical project gallery" orientation="vertical" autoPlay={false} itemClassName="h-52 w-full">
          {slides.map((slide) => <div key={slide.src} className="relative h-full overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
        </Carousel>
      </ComponentPreview>
      <ComponentPreview title="Multiple items with responsive spacing">
        <Carousel aria-label="Responsive project cards" autoPlay={false} gap={24} itemClassName="w-[84%] sm:w-[47%] xl:w-[31%]">
          {slides.map((slide) => <div key={slide.src} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-[4/3]"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 80vw, 31vw" className="object-cover" /></div><p className="p-3 text-sm font-medium">{slide.alt}</p></div>)}
        </Carousel>
      </ComponentPreview>
      <ComponentPreview title="Autoplay with loop">
        <Carousel aria-label="Autoplay project gallery" autoPlay autoPlayInterval={3500} loop showDots>
          {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
        </Carousel>
      </ComponentPreview>
      <ComponentPreview title="Image overlays and thumbnail navigation">
        <Carousel aria-label="Release highlights" autoPlay={false} showDots={false} thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-12 sm:size-16"><Image src={slide.src} alt="" fill sizes="64px" className="object-cover" /></span>)}>
          {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute inset-x-4 bottom-4 text-white"><p className="text-xs font-medium uppercase tracking-wide">Release highlight {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
        </Carousel>
      </ComponentPreview>
      <ComponentPreview title="Overlay thumbnail navigation">
        <Carousel aria-label="Team showcase" autoPlay={false} showDots={false} thumbnailPosition="overlay" thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-10 sm:size-14"><Image src={slide.src} alt="" fill sizes="56px" className="object-cover" /></span>)}>
          {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
        </Carousel>
      </ComponentPreview>
      <ComponentPreview title="Dots navigation with content overlays">
        <Carousel aria-label="Platform release highlights" autoPlay={false} showArrows={false} showDots>
          {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute inset-x-5 bottom-10 text-white"><p className="text-xs font-medium uppercase tracking-wide">Update {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
        </Carousel>
      </ComponentPreview>
    </div></div>}</AppShell>;
}
