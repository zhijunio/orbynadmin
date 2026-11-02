"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const formatNumber = (value: number) => Math.round(value).toLocaleString();

export function CountUp({ value, format = formatNumber }: { value: number; format?: (value: number) => string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const currentValue = useRef(value);

  useEffect(() => {
    const start = currentValue.current;
    const duration = 650;
    let frame = 0;
    let startTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || start === value) {
      currentValue.current = value;
      setDisplayValue(value);
      return;
    }

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      const next = start + (value - start) * eased;
      currentValue.current = next;
      setDisplayValue(next);
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <>{format(displayValue)}</>;
}

export function DeltaChip({ children, positive = true, className }: { children: ReactNode; positive?: boolean; className?: string }) {
  return <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${positive ? "bg-lime-300/70 text-lime-950 dark:bg-lime-400/20 dark:text-lime-300" : "bg-destructive/10 text-destructive"} ${className ?? ""}`}>{children}</span>;
}
