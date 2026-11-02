"use client";

import { Chip } from "@/components/base/badges/chip";

export type TagGroupProps = {
  values: string[];
  onValuesChange?: (values: string[]) => void;
  removeLabel?: string;
  "aria-label": string;
};

export function TagGroup({ values, onValuesChange, removeLabel = "Remove", "aria-label": ariaLabel }: TagGroupProps) {
  return <div role="group" aria-label={ariaLabel} className="flex flex-wrap items-center gap-1.5">{values.map((value) => <Chip key={value} onRemove={onValuesChange ? () => onValuesChange(values.filter((item) => item !== value)) : undefined} removeLabel={removeLabel}>{value}</Chip>)}</div>;
}
