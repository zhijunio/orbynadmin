import { notFound } from "next/navigation";

import { AuthPage } from "@/components/blocks/application/auth/auth-page";
import { authExamples } from "@/components/blocks/application/auth/auth-examples";
import { AuthFlowPage } from "@/components/blocks/application/auth/auth-flow-page";
import { authFlows } from "@/components/blocks/application/auth/auth-flows";

export function generateStaticParams() {
  return [
    ...authExamples.map(({ id }) => ({ slug: `auth-${id}` })),
    ...authFlows.map(({ slug }) => ({ slug })),
  ];
}

export default async function AuthExampleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const example = authExamples.find(({ id }) => `auth-${id}` === slug);
  if (example) return <AuthPage example={example} />;
  const flow = authFlows.find((item) => item.slug === slug);
  if (flow) return <AuthFlowPage flow={flow} />;
  notFound();
}
