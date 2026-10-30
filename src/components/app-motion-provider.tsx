"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function AppMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
