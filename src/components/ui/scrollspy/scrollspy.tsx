"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from "react";

import { cn } from "@/utils/cn";

type ScrollspyProps = {
  children: ReactNode;
  targetRef?: RefObject<HTMLElement | null>;
  onUpdate?: (id: string) => void;
  offset?: number;
  smooth?: boolean;
  className?: string;
  dataAttribute?: string;
  history?: boolean;
};

function getScrollElement(target: HTMLElement | null): HTMLElement | Window {
  if (!target) return window;

  const viewport = target.matches('[data-slot="scroll-area-viewport"]')
    ? target
    : target.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]');

  return viewport ?? target;
}

function isWindowElement(element: HTMLElement | Window): element is Window {
  return element === window;
}

function Scrollspy({
  children,
  targetRef,
  onUpdate,
  offset = 0,
  smooth = true,
  className,
  dataAttribute = "scrollspy",
  history = true,
}: ScrollspyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorsRef = useRef<HTMLElement[]>([]);
  const activeIdRef = useRef<string | null>(null);

  const setActiveSection = useCallback((sectionId: string | null, force = false) => {
    if (!sectionId || (!force && activeIdRef.current === sectionId)) return;

    anchorsRef.current.forEach((anchor) => {
      const active = anchor.getAttribute(`data-${dataAttribute}-anchor`) === sectionId;
      if (active) {
        anchor.dataset.active = "true";
        anchor.setAttribute("aria-current", "location");
      } else {
        delete anchor.dataset.active;
        anchor.removeAttribute("aria-current");
      }
    });

    activeIdRef.current = sectionId;
    onUpdate?.(sectionId);

    if (history && (force || window.location.hash !== `#${sectionId}`)) {
      window.history.replaceState(window.history.state, "", `#${sectionId}`);
    }
  }, [dataAttribute, history, onUpdate]);

  const scrollToAnchor = useCallback((anchor: HTMLElement, event?: MouseEvent<HTMLDivElement>) => {
    event?.preventDefault();
    const sectionId = anchor.getAttribute(`data-${dataAttribute}-anchor`)?.replace(/^#/, "");
    const section = sectionId ? document.getElementById(sectionId) : null;
    if (!section) return;

    const scrollElement = getScrollElement(targetRef?.current ?? null);
    const isWindow = isWindowElement(scrollElement);
    const scrollTop = isWindow ? window.scrollY : scrollElement.scrollTop;
    const viewportTop = isWindow ? 0 : scrollElement.getBoundingClientRect().top;
    const dataOffset = Number.parseFloat(anchor.getAttribute(`data-${dataAttribute}-offset`) ?? "");
    const anchorOffset = Number.isFinite(dataOffset) ? dataOffset : offset;
    const top = Math.max(0, section.getBoundingClientRect().top - viewportTop + scrollTop - anchorOffset);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isWindow) {
      window.scrollTo({ top, behavior: smooth && !reducedMotion ? "smooth" : "auto" });
    } else {
      scrollElement.scrollTo({ top, behavior: smooth && !reducedMotion ? "smooth" : "auto" });
    }

    setActiveSection(sectionId ?? null, true);
  }, [dataAttribute, offset, smooth, targetRef, setActiveSection]);

  const handleScroll = useCallback(() => {
    if (anchorsRef.current.length === 0) return;

    const scrollElement = getScrollElement(targetRef?.current ?? null);
    const isWindow = isWindowElement(scrollElement);
    const scrollTop = isWindow ? window.scrollY : scrollElement.scrollTop;
    const viewportTop = isWindow ? 0 : scrollElement.getBoundingClientRect().top;
    const sectionPositions = anchorsRef.current.flatMap((anchor) => {
      const sectionId = anchor.getAttribute(`data-${dataAttribute}-anchor`);
      const section = sectionId ? document.getElementById(sectionId) : null;
      if (!sectionId || !section) return [];

      const dataOffset = Number.parseFloat(anchor.getAttribute(`data-${dataAttribute}-offset`) ?? "");
      const anchorOffset = Number.isFinite(dataOffset) ? dataOffset : offset;
      const top = section.getBoundingClientRect().top - viewportTop + scrollTop - anchorOffset;
      return [{ sectionId, top }];
    });

    if (sectionPositions.length === 0) return;

    const scrollHeight = isWindow ? document.documentElement.scrollHeight : scrollElement.scrollHeight;
    const clientHeight = isWindow ? window.innerHeight : scrollElement.clientHeight;
    const active = scrollTop + clientHeight >= scrollHeight - 2
      ? sectionPositions.at(-1)
      : sectionPositions.filter((section) => section.top <= scrollTop).at(-1) ?? sectionPositions[0];

    setActiveSection(active ? active.sectionId : null);
  }, [dataAttribute, offset, targetRef, setActiveSection]);

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLElement>(`[data-${dataAttribute}-anchor]`);
    if (anchor && rootRef.current?.contains(anchor)) scrollToAnchor(anchor, event);
  }, [dataAttribute, scrollToAnchor]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    anchorsRef.current = Array.from(root.querySelectorAll<HTMLElement>(`[data-${dataAttribute}-anchor]`));
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      const anchor = anchorsRef.current.find((item) => item.getAttribute(`data-${dataAttribute}-anchor`) === hash);
      if (anchor) scrollToAnchor(anchor);
      handleScroll();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [dataAttribute, handleScroll, scrollToAnchor]);

  return <div ref={rootRef} data-slot="scrollspy" className={cn(className)} onClickCapture={handleClick}>{children}</div>;
}

export { Scrollspy, type ScrollspyProps };
