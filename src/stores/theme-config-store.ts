"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Dispatch, SetStateAction } from "react";
import { defaultConfig, type ThemeConfig } from "@/lib/theme-config";

type ThemeConfigStore = {
  config: ThemeConfig;
  open: boolean;
  hydrated: boolean;
  setConfig: Dispatch<SetStateAction<ThemeConfig>>;
  setOpen: (open: boolean) => void;
  reset: () => void;
  markHydrated: () => void;
};

export const useThemeConfigStore = create<ThemeConfigStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      open: false,
      hydrated: false,
      setConfig: (next) => set((state) => ({
        config: typeof next === "function" ? next(state.config) : next,
      })),
      setOpen: (open) => set({ open }),
      reset: () => set({ config: defaultConfig }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "orbynadmin-theme-config",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ config: state.config }),
      skipHydration: true,
      onRehydrateStorage: () => () => useThemeConfigStore.getState().markHydrated(),
    },
  ),
);
