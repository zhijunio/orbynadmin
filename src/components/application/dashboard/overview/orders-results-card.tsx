"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowUpRight, IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Button } from "@/components/base/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Input } from "@/components/base/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { orders, type Order } from "@/data";

const PAGE_SIZE = 8;

const statusStyles: Record<Order["status"], string> = {
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Refunded: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Failed: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const products = Array.from(new Set(orders.map((order) => order.product)));

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function OrdersResultsCard() {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState("all");
  const [product, setProduct] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery = !normalizedQuery || `${order.customer} ${order.product} ${order.id}`.toLowerCase().includes(normalizedQuery);
      const matchesPrice = price === "all" || (price === "low" ? order.amount < 100 : price === "mid" ? order.amount >= 100 && order.amount < 500 : order.amount >= 500);
      return matchesQuery && matchesPrice && (product === "all" || order.product === product) && (status === "all" || order.status === status);
    });
  }, [price, product, query, status]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageOrders = filteredOrders.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  const firstResult = filteredOrders.length === 0 ? 0 : currentPage * PAGE_SIZE + 1;
  const lastResult = Math.min((currentPage + 1) * PAGE_SIZE, filteredOrders.length);

  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(0);
  }

  return (
    <Card className="rounded-2xl border-0 bg-muted/45 p-0 ring-0">
      <CardHeader className="px-4 pt-4 sm:px-5">
        <CardTitle>Total Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="flex flex-col gap-3 px-4 sm:px-5 xl:flex-row xl:items-center">
          <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(132px,160px))]">
            <div className="relative sm:col-span-2 xl:col-span-1">
              <IconSearch aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => updateFilter(setQuery, event.target.value)} placeholder="Search customers or products" className="pl-9" aria-label="Search customers or products" />
            </div>
            <Select value={price} onValueChange={(value) => updateFilter(setPrice, value)}>
              <SelectTrigger aria-label="Filter by price"><SelectValue placeholder="All prices" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All prices</SelectItem>
                <SelectItem value="low">Under $100</SelectItem>
                <SelectItem value="mid">$100–$499</SelectItem>
                <SelectItem value="high">$500 and above</SelectItem>
              </SelectContent>
            </Select>
            <Select value={product} onValueChange={(value) => updateFilter(setProduct, value)}>
              <SelectTrigger aria-label="Filter by product"><SelectValue placeholder="All products" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All products</SelectItem>
                {products.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(value) => updateFilter(setStatus, value)}>
              <SelectTrigger aria-label="Filter by status"><SelectValue placeholder="All statuses" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="shrink-0 text-sm text-muted-foreground">{filteredOrders.length} orders</p>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Customer</TableHead>
                <TableHead>Purchase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="w-12 pr-5"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarImage src={order.avatar} alt={order.customer} /><AvatarFallback>{order.customer.slice(0, 2)}</AvatarFallback></Avatar>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.product}</TableCell>
                  <TableCell><Badge variant="secondary" className={statusStyles[order.status]}>{order.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{formatDate(order.date)}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">${order.amount.toLocaleString()}</TableCell>
                  <TableCell className="pr-5">
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`View order ${order.id}`} asChild>
                      <Link href={`/commerce/orders/${order.id.replace("#", "")}`}><IconArrowUpRight className="size-4" /></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {pageOrders.length === 0 && <TableRow><TableCell colSpan={6} className="py-12 text-center text-muted-foreground">No orders match these filters.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 pb-4 sm:px-5">
          <p className="text-sm text-muted-foreground">Showing {firstResult}–{lastResult} of {filteredOrders.length}</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" aria-label="Previous page" disabled={currentPage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}><IconChevronLeft className="size-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Next page" disabled={currentPage >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}><IconChevronRight className="size-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
