"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import Link from "next/link";
import { toast } from "sonner";
import { IconDownload, IconPlus } from "@tabler/icons-react";

import { orders, revenueByMonth, topProducts } from "@/data";
import { PageHeader } from "@/components/application/app-shell/page-header";
import { EcommerceStatCards } from "@/components/application/dashboard/ecommerce/stat-cards";
import { RevenueProfitCard } from "@/components/application/dashboard/ecommerce/revenue-profit-card";
import { SalesCategoryCard } from "@/components/application/dashboard/ecommerce/sales-category-card";
import { EcommerceRecentOrdersCard } from "@/components/application/dashboard/ecommerce/recent-orders-card";
import { EcommerceTopProductsCard } from "@/components/application/dashboard/ecommerce/top-products-card";
import { Button } from "@/components/base/buttons/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { escapeCsvCell } from "@/utils/csv";

type CsvValue = string | number;

function downloadCsv(filename: string, headers: string[], rows: CsvValue[][]) {
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  toast.success(`${filename} downloaded`);
}

export default function EcommerceDashboardPage() {
  function exportMonthlySummary() {
    downloadCsv(
      "ecommerce-monthly-summary.csv",
      ["Month", "Revenue", "Orders", "Profit"],
      revenueByMonth.map(({ month, revenue, orders: orderCount, profit }) => [month, revenue, orderCount, profit]),
    );
  }

  function exportOrders() {
    downloadCsv(
      "ecommerce-orders.csv",
      ["Order", "Customer", "Product", "Date", "Amount", "Status", "Payment Method"],
      orders.map(({ id, customer, product, date, amount, status, method }) => [id, customer, product, date, amount, status, method]),
    );
  }

  function exportTopProducts() {
    const products = topProducts
      .map((product) => ({ ...product, revenue: product.price * product.sold }))
      .sort((a, b) => b.revenue - a.revenue);
    downloadCsv(
      "ecommerce-top-products.csv",
      ["Product", "Category", "Price", "Units Sold", "Stock", "Status", "Revenue"],
      products.map(({ name, category, price, sold, stock, status, revenue }) => [name, category, price, sold, stock, status, revenue]),
    );
  }

  return <ConsoleLayout>{<div className="space-y-6">
      <PageHeader title="E-Commerce">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm"><IconDownload className="size-4" /> Export</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={exportMonthlySummary}>Monthly summary CSV</DropdownMenuItem>
            <DropdownMenuItem onSelect={exportOrders}>Orders CSV</DropdownMenuItem>
            <DropdownMenuItem onSelect={exportTopProducts}>Top products CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" asChild><Link href="/commerce/products/new"><IconPlus className="size-4" /> Add product</Link></Button>
      </PageHeader>

      <EcommerceStatCards />
      <div className="grid gap-4 lg:grid-cols-3"><RevenueProfitCard /><SalesCategoryCard /></div>
      <div className="grid gap-4 lg:grid-cols-3"><EcommerceRecentOrdersCard /><EcommerceTopProductsCard /></div>
    </div>}</ConsoleLayout>;
}
