"use client";

import { toast } from "sonner";
import { IconDotsVertical, IconPhoto, IconRefresh, IconReportAnalytics } from "@tabler/icons-react";

import { RevenueAreaChart } from "@/components/application/dashboard/charts/revenue-area-chart";
import { Button } from "@/components/base/buttons/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";

function ChartMenu({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><IconDotsVertical className="size-4" /><span className="sr-only">{title} options</span></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => toast.success(`${title} refreshed`, { description: "Showing the latest available data." })}><IconRefresh className="size-4" /> Refresh</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.success("Chart exported", { description: `${title} was saved as a PNG image.` })}><IconPhoto className="size-4" /> Download PNG</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast("Opening full report", { description: `Preparing a detailed ${title.toLowerCase()} report.` })}><IconReportAnalytics className="size-4" /> View full report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RevenueProfitCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader><CardTitle>Revenue &amp; Profit</CardTitle><CardAction><ChartMenu title="Revenue & Profit" /></CardAction></CardHeader>
      <CardContent><RevenueAreaChart /></CardContent>
    </Card>
  );
}
