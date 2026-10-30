import { notFound } from "next/navigation";
import { LayoutExamplePage } from "./_components/LayoutExamplePage";

const layoutIds = ["one", "two", "three", "four", "five", "six"] as const;
type LayoutId = (typeof layoutIds)[number];

export function generateStaticParams() {
  return layoutIds.map((layout) => ({ layout }));
}

export default async function LayoutPage({ params }: { params: Promise<{ layout: string }> }) {
  const { layout } = await params;
  if (!layoutIds.includes(layout as LayoutId)) notFound();
  return <LayoutExamplePage layout={layout as LayoutId} />;
}
