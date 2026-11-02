


import { notFound } from "next/navigation";

import { LayoutDemo } from "@/components/application/layouts/layout-demo";

const layoutIds = ["one", "two", "three", "four", "five", "six"] as const;
type LayoutId = (typeof layoutIds)[number];

export function generateStaticParams() {
  return layoutIds.map((layout) => ({ layout }));
}

export default async function LayoutPage({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const { layout } = await params;
  if (!layoutIds.includes(layout as LayoutId)) notFound();

  return <LayoutDemo key={layout} layout={layout as LayoutId} />;
}
