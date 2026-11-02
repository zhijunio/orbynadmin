import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Button } from "@/components/base/buttons/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { orders } from "@/data";

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Refunded: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Failed: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function StatusBadge({ status }: { status: string }) {
  return <Badge variant="secondary" className={statusStyles[status]}>{status}</Badge>;
}

export function EcommerceRecentOrdersCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardAction><Button variant="ghost" size="sm" asChild><Link href="/commerce/orders">View all <IconArrowUpRight className="size-4" /></Link></Button></CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader><TableRow><TableHead className="pl-6">Order</TableHead><TableHead>Customer</TableHead><TableHead>Status</TableHead><TableHead className="pr-6 text-right">Amount</TableHead></TableRow></TableHeader>
          <TableBody>
            {orders.slice(0, 7).map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-6 font-medium tabular-nums">{order.id}</TableCell>
                <TableCell><div className="flex items-center gap-2.5"><Avatar className="size-7"><AvatarImage src={order.avatar} alt={order.customer} /><AvatarFallback>{order.customer.slice(0, 2)}</AvatarFallback></Avatar><span className="text-muted-foreground">{order.customer}</span></div></TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                <TableCell className="pr-6 text-right font-medium tabular-nums">${order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
