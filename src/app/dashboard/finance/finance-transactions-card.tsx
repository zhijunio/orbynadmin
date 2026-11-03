"use client";

import { useMemo, useState } from "react";

import { IconDots, IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/base/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { Input } from "@/components/base/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";

export type FinanceTransaction = { name: string; account: string; category: string; date: string; amount: number };

export default function FinanceTransactionsCard({ initialTransactions, dialogOpen, onDialogOpenChange }: { initialTransactions: FinanceTransaction[]; dialogOpen: boolean; onDialogOpenChange: (open: boolean) => void }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("all");
  const [category, setCategory] = useState("all");
  const [amount, setAmount] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);
  const [newTransaction, setNewTransaction] = useState<FinanceTransaction>({ name: "", account: "Checking", category: "Other", date: "Nov 03, 2026", amount: 0 });
  const accounts = useMemo(() => Array.from(new Set(transactions.map((transaction) => transaction.account))), [transactions]);
  const categories = useMemo(() => Array.from(new Set(transactions.map((transaction) => transaction.category))), [transactions]);
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = `${transaction.name} ${transaction.account} ${transaction.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesAccount = account === "all" || transaction.account === account;
    const matchesCategory = category === "all" || transaction.category === category;
    const matchesAmount = amount === "all" || (amount === "income" ? transaction.amount > 0 : transaction.amount < 0);
    return matchesSearch && matchesAccount && matchesCategory && matchesAmount;
  });
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const currentPage = Math.min(pageIndex, pageCount - 1);
  const pageTransactions = filteredTransactions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  function addTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTransactions((items) => [{ ...newTransaction }, ...items]);
    setPageIndex(0);
    setNewTransaction({ name: "", account: "Checking", category: "Other", date: "Nov 03, 2026", amount: 0 });
    onDialogOpenChange(false);
  }

  return <Card className="rounded-2xl border pt-2 pb-3 ring-0">
    <CardHeader className="flex-row items-center justify-between gap-3 py-1"><CardTitle className="text-sm font-medium">Total Results</CardTitle><span className="text-sm text-muted-foreground">{filteredTransactions.length} transactions</span>
      <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add transaction</DialogTitle></DialogHeader>
          <form id="add-transaction-form" className="grid gap-3" onSubmit={addTransaction}>
            <label className="grid gap-1.5 text-sm font-medium">Transaction name<Input required autoFocus value={newTransaction.name} onChange={(event) => setNewTransaction((item) => ({ ...item, name: event.currentTarget.value }))} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1.5 text-sm font-medium">Account<Input required value={newTransaction.account} onChange={(event) => setNewTransaction((item) => ({ ...item, account: event.currentTarget.value }))} /></label>
              <label className="grid gap-1.5 text-sm font-medium">Category<Input required value={newTransaction.category} onChange={(event) => setNewTransaction((item) => ({ ...item, category: event.currentTarget.value }))} /></label>
              <label className="grid gap-1.5 text-sm font-medium">Date<Input required value={newTransaction.date} onChange={(event) => setNewTransaction((item) => ({ ...item, date: event.currentTarget.value }))} /></label>
              <label className="grid gap-1.5 text-sm font-medium">Amount<Input required type="number" step="0.01" value={newTransaction.amount} onChange={(event) => setNewTransaction((item) => ({ ...item, amount: Number(event.currentTarget.value) }))} /></label>
            </div>
          </form>
          <DialogFooter><DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose><Button type="submit" form="add-transaction-form">Save transaction</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </CardHeader>
    <CardContent className="space-y-4 px-0 pb-0">
      <div id="finance-filters" className="flex scroll-mt-20 flex-col gap-2 px-5 sm:flex-row sm:flex-wrap sm:items-center">
        <Select value={account} onValueChange={(value) => { setAccount(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by account" className="w-full sm:w-[150px]"><SelectValue>{account === "all" ? "All accounts" : account}</SelectValue></SelectTrigger><SelectContent><SelectItem value="all">All accounts</SelectItem>{accounts.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={category} onValueChange={(value) => { setCategory(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by category" className="w-full sm:w-[160px]"><SelectValue>{category === "all" ? "All categories" : category}</SelectValue></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={amount} onValueChange={(value) => { setAmount(value); setPageIndex(0); }}><SelectTrigger aria-label="Filter by amount" className="w-full sm:w-[140px]"><SelectValue>{amount === "all" ? "All amounts" : amount === "income" ? "Income" : "Expenses"}</SelectValue></SelectTrigger><SelectContent><SelectItem value="all">All amounts</SelectItem><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expenses</SelectItem></SelectContent></Select>
        <div className="relative min-w-40 flex-1 sm:ml-auto sm:max-w-xs"><IconSearch aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search transactions" placeholder="Search" value={search} onChange={(event) => { setSearch(event.currentTarget.value); setPageIndex(0); }} className="pl-8" /></div>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead className="pl-5">Transaction</TableHead><TableHead>Account</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead><TableHead className="pr-5 text-right">Amount</TableHead><TableHead className="w-12 pr-5"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
        <TableBody>{filteredTransactions.length ? pageTransactions.map((transaction, index) => <TableRow key={`${transaction.name}-${transaction.date}-${index}`}>
          <TableCell className="pl-5 font-medium">{transaction.name}</TableCell><TableCell>{transaction.account}</TableCell><TableCell>{transaction.category}</TableCell><TableCell className="text-muted-foreground">{transaction.date}</TableCell><TableCell className={`pr-5 text-right font-medium tabular-nums ${transaction.amount > 0 ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{transaction.amount > 0 ? "+" : transaction.amount < 0 ? "−" : ""}${Math.abs(transaction.amount).toLocaleString()}</TableCell><TableCell className="pr-5"><DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon-xs" aria-label={`Actions for ${transaction.name}`}><IconDots aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem variant="destructive" onSelect={() => setTransactions((items) => { const index = items.indexOf(transaction); return index < 0 ? items : items.filter((_, itemIndex) => itemIndex !== index); })}>Remove transaction</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
        </TableRow>) : <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No matching transactions.</TableCell></TableRow>}</TableBody>
      </Table>
      <div className="flex flex-col gap-3 border-t px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-muted-foreground">Showing {filteredTransactions.length ? currentPage * pageSize + 1 : 0}–{Math.min((currentPage + 1) * pageSize, filteredTransactions.length)} of {filteredTransactions.length}</span><div className="flex items-center gap-1"><Button variant="outline" size="sm" disabled={currentPage === 0} onClick={() => setPageIndex((page) => Math.max(0, page - 1))}>Previous</Button>{Array.from({ length: Math.min(5, pageCount) }, (_, index) => index).map((index) => <Button key={index} variant={currentPage === index ? "secondary" : "ghost"} size="sm" aria-current={currentPage === index ? "page" : undefined} onClick={() => setPageIndex(index)}>{index + 1}</Button>)}{pageCount > 5 && <><span className="px-1 text-muted-foreground">…</span><Button variant={currentPage === pageCount - 1 ? "secondary" : "ghost"} size="sm" aria-current={currentPage === pageCount - 1 ? "page" : undefined} onClick={() => setPageIndex(pageCount - 1)}>{pageCount}</Button></>}<Button variant="outline" size="sm" disabled={currentPage >= pageCount - 1} onClick={() => setPageIndex((page) => Math.min(pageCount - 1, page + 1))}>Next</Button></div></div>
    </CardContent>
  </Card>;
}
