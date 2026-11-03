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
  orientation?: "horizontal" | "vertical";
  gap?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemClassName?: string;
  thumbnails?: ReactNode[];
  thumbnailPosition?: "below" | "overlay";
};

export function Carousel({
  children,
  "aria-label": ariaLabel,
  align = "start",
  orientation = "horizontal",
  gap = 16,
  loop = false,
  showArrows = true,
  showDots = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  itemClassName,
  thumbnails,
  thumbnailPosition = "below",
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
    const vertical = orientation === "vertical";
    const center = vertical ? track.scrollTop + track.clientHeight / 2 : track.scrollLeft + track.clientWidth / 2;
    const nextIndex = itemNodes.reduce((closest, item, index) => {
      const itemCenter = vertical ? item.offsetTop + item.offsetHeight / 2 : item.offsetLeft + item.offsetWidth / 2;
      const closestItem = itemNodes[closest];
      const closestCenter = vertical ? closestItem.offsetTop + closestItem.offsetHeight / 2 : closestItem.offsetLeft + closestItem.offsetWidth / 2;
      return Math.abs(itemCenter - center) < Math.abs(closestCenter - center)
        ? index
        : closest;
    }, 0);

    setActiveIndex((current) => {
      if (current === nextIndex) return current;
      return nextIndex;
    });
  }, [orientation]);

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
      const vertical = orientation === "vertical";
      const centerOffset = align === "center"
        ? (vertical ? (track.clientHeight - item.clientHeight) / 2 : (track.clientWidth - item.clientWidth) / 2)
        : 0;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      track.scrollTo(vertical
        ? { top: item.offsetTop - centerOffset, behavior }
        : { left: item.offsetLeft - centerOffset, behavior });
    },
    [align, orientation],
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
      else if (loop) scrollToIndex(0);
    }, autoPlayInterval);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, autoPlay, autoPlayInterval, loop, scrollToIndex, slides.length]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    if (event.key === nextKey) {
      event.preventDefault();
      scrollToIndex(activeIndex === slides.length - 1 && loop ? 0 : Math.min(activeIndex + 1, slides.length - 1));
    } else if (event.key === previousKey) {
      event.preventDefault();
      scrollToIndex(activeIndex === 0 && loop ? slides.length - 1 : Math.max(activeIndex - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(slides.length - 1);
    }
  }

  const vertical = orientation === "vertical";
  const previousIndex = activeIndex === 0 && loop ? slides.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === slides.length - 1 && loop ? 0 : activeIndex + 1;

  return (
    <div className={cn("relative w-full min-w-0 rounded-lg border border-border", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn("relative flex w-full snap-mandatory gap-4 overflow-auto overscroll-contain scroll-smooth rounded-lg outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:scroll-auto", vertical ? "h-[22rem] snap-y flex-col" : "snap-x")}
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
            style={vertical ? undefined : { width: itemClassName ? undefined : "100%" }}
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
            disabled={!loop && activeIndex === 0}
            onClick={() => scrollToIndex(previousIndex)}
            className={cn("!size-10 absolute z-10 rounded-full border border-white/10 bg-white/90 text-gray-700 shadow-lg backdrop-blur-[10px] hover:bg-white disabled:bg-white/60", vertical ? "top-3 left-1/2 -translate-x-1/2 rotate-90" : "top-1/2 left-3 -translate-y-1/2 sm:left-4")}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            aria-label="Next slide"
            disabled={!loop && activeIndex === slides.length - 1}
            onClick={() => scrollToIndex(nextIndex)}
            className={cn("!size-10 absolute z-10 rounded-full border border-white/10 bg-white/90 text-gray-700 shadow-lg backdrop-blur-[10px] hover:bg-white disabled:bg-white/60", vertical ? "bottom-3 left-1/2 -translate-x-1/2 rotate-90" : "top-1/2 right-3 -translate-y-1/2 sm:right-4")}
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

      {thumbnails && thumbnails.length === slides.length && (
        <div role="group" aria-label="Slide thumbnails" className={cn("flex gap-2 p-2", thumbnailPosition === "overlay" && "absolute right-2 bottom-2 left-2 z-10 justify-center rounded-lg bg-background/75 backdrop-blur", vertical ? "flex-col" : "flex-row")}>
          {thumbnails.map((thumbnail, index) => <button key={index} type="button" aria-label={`Show slide ${index + 1}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => scrollToIndex(index)} className={cn("overflow-hidden rounded-md border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeIndex === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>{thumbnail}</button>)}
        </div>
      )}
    </div>
  );
}
