import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs/tabs";

export function FlowTabs({
  label,
  firstLabel,
  secondLabel,
  first,
  second,
}: {
  label: string;
  firstLabel: string;
  secondLabel: string;
  first: ReactNode;
  second: ReactNode;
}) {
  return (
    <Tabs defaultValue="first" className="w-full">
      <TabsList aria-label={label}>
        <TabsTrigger value="first">{firstLabel}</TabsTrigger>
        <TabsTrigger value="second">{secondLabel}</TabsTrigger>
      </TabsList>
      <TabsContent value="first" forceMount className="pt-4 data-[state=inactive]:hidden">{first}</TabsContent>
      <TabsContent value="second" forceMount className="pt-4 data-[state=inactive]:hidden">{second}</TabsContent>
    </Tabs>
  );
}
