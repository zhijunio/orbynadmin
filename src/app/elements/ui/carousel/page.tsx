import ConsoleLayout from "@/components/application/app-shell/console-layout";

export const metadata = { title: "Carousels" };




import Image from "next/image";

import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";
import { Carousel } from "@/components/base/carousel/carousel";

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
  return <ConsoleLayout>{<Showcase title="Carousels">
      <ComponentPreview title="Slides Only">
        <Gallery controls={false} indicators={false} />
      </ComponentPreview>
      <ComponentPreview title="With Controls">
        <Gallery indicators={false} />
      </ComponentPreview>
      <ComponentPreview title="With Indicators">
        <Gallery controls={false} />
      </ComponentPreview>
      <ComponentPreview title="Controls and Indicators">
        <Gallery />
      </ComponentPreview>
      <ComponentPreview title="Card Widths and Alignment">
        <Gallery align="center" itemClassName="w-[78%] sm:w-[58%]" autoPlay={false} />
      </ComponentPreview>
    </Showcase>}</ConsoleLayout>;
}
