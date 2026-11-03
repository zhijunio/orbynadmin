"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconChevronLeft as ChevronLeft, IconChevronRight as ChevronRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/buttons/button";
import { cn } from "@/utils/cn";

export type CarouselProps = Omit<ComponentProps<"div">, "children"> & {
  children: ReactNode;
  "aria-label": string;
  align?: "start" | "center";
  gap?: number;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemClassName?: string;
};

export function Carousel({
  children,
  "aria-label": ariaLabel,
  align = "start",
  gap = 16,
  showArrows = true,
  showDots = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  itemClassName,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const itemNodes = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    const center = track.scrollLeft + track.clientWidth / 2;
    const nextIndex = itemNodes.reduce((closest, item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const closestItem = itemNodes[closest];
      const closestCenter = closestItem.offsetLeft + closestItem.offsetWidth / 2;
      return Math.abs(itemCenter - center) < Math.abs(closestCenter - center)
        ? index
        : closest;
    }, 0);

    setActiveIndex((current) => {
      if (current === nextIndex) return current;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = window.requestAnimationFrame(updateActiveIndex);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const item = track?.querySelectorAll<HTMLElement>("[data-carousel-item]")[index];
      if (!track || !item) return;
      const centerOffset =
        align === "center" ? (track.clientWidth - item.clientWidth) / 2 : 0;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      track.scrollTo({ left: item.offsetLeft - centerOffset, behavior });
    },
    [align],
  );

  useEffect(() => {
    if (
      !autoPlay ||
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timeout = window.setTimeout(() => {
      if (activeIndex < slides.length - 1) scrollToIndex(activeIndex + 1);
    }, autoPlayInterval);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, autoPlay, autoPlayInterval, scrollToIndex, slides.length]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(Math.min(activeIndex + 1, slides.length - 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(slides.length - 1);
    }
  }

  return (
    <div className={cn("relative w-full min-w-0 rounded-lg border border-border", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth rounded-lg outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:scroll-auto"
        style={{ gap }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            data-carousel-item
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className={cn(
              "min-w-0 shrink-0 snap-start",
              align === "center" && "snap-center",
              itemClassName,
            )}
            style={{ width: itemClassName ? undefined : "100%" }}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            aria-label="Previous slide"
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="!size-10 absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/90 text-gray-700 shadow-lg backdrop-blur-[10px] hover:bg-white disabled:bg-white/60 sm:left-4"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            aria-label="Next slide"
            disabled={activeIndex === slides.length - 1}
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="!size-10 absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/90 text-gray-700 shadow-lg backdrop-blur-[10px] hover:bg-white disabled:bg-white/60 sm:right-4"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-[40px] border border-white/10 bg-background/60 px-2 py-1.5 shadow-lg backdrop-blur-[10px] sm:bottom-5" aria-label="Slide selection">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "size-2.5 cursor-pointer rounded-full bg-white opacity-100 shadow-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                activeIndex === index
                  ? "w-6 rounded-xl"
                  : "hover:opacity-80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
