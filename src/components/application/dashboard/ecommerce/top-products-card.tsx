import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { topProducts } from "@/data";

const trends = [18.2, 12.4, 9.6, 6.1, 4.3];

export function EcommerceTopProductsCard() {
  const products = topProducts
    .map((product) => ({ ...product, revenue: product.price * product.sold }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <Card>
      <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
      <CardContent className="space-y-0.5">
        {products.map((product, index) => (
          <div key={product.id} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
            <span className="w-4 shrink-0 text-center text-sm font-medium text-muted-foreground tabular-nums">{index + 1}</span>
            <Image src={product.image} unoptimized alt={product.name} width={40} height={40} className="size-10 shrink-0 rounded-md border bg-muted object-cover" />
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{product.name}</p><p className="truncate text-xs text-muted-foreground">{product.category} · {product.sold.toLocaleString()} sold</p></div>
            <div className="shrink-0 text-right"><p className="text-sm font-medium tabular-nums">${product.revenue.toLocaleString()}</p><p className="text-xs font-medium text-emerald-600 tabular-nums dark:text-emerald-400">+{trends[index] ?? 3}%</p></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
