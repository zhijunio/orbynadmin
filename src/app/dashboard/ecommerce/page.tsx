"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import Link from "next/link";
import { toast } from "sonner";
import { IconDownload, IconPlus } from "@tabler/icons-react";

import { PageHeader } from "@/components/application/app-shell/page-header";
import { EcommerceStatCards } from "@/components/application/dashboard/ecommerce/stat-cards";
import { RevenueProfitCard } from "@/components/application/dashboard/ecommerce/revenue-profit-card";
import { SalesCategoryCard } from "@/components/application/dashboard/ecommerce/sales-category-card";
import { EcommerceRecentOrdersCard } from "@/components/application/dashboard/ecommerce/recent-orders-card";
import { EcommerceTopProductsCard } from "@/components/application/dashboard/ecommerce/top-products-card";
import { Button } from "@/components/base/buttons/button";

export default function EcommerceDashboardPage() {
  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader title="E-Commerce">
        <Button variant="outline" size="sm" onClick={() => toast.success("Exported to CSV", { description: "Your store report is downloading." })}><IconDownload className="size-4" /> Export</Button>
        <Button size="sm" asChild><Link href="/commerce/products/new"><IconPlus className="size-4" /> Add product</Link></Button>
      </PageHeader>

      <EcommerceStatCards />
      <div className="grid gap-4 lg:grid-cols-3"><RevenueProfitCard /><SalesCategoryCard /></div>
      <div className="grid gap-4 lg:grid-cols-3"><EcommerceRecentOrdersCard /><EcommerceTopProductsCard /></div>
    </div>}</ConsoleLayout>;
}
