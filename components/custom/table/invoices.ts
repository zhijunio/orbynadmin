export type Invoice = { id: string; name: string; status: "paid" | "pending" | "overdue"; amount: number };
export const invoices: Invoice[] = [
  { id: "INV-001", name: "Design audit", status: "paid", amount: 1250 },
  { id: "INV-002", name: "Cloud hosting", status: "pending", amount: 240 },
  { id: "INV-003", name: "Support plan", status: "overdue", amount: 480 },
  { id: "INV-004", name: "User research", status: "paid", amount: 920 },
  { id: "INV-005", name: "Cloud hosting", status: "paid", amount: 180 },
  { id: "INV-006", name: "Support plan", status: "pending", amount: 360 },
  { id: "INV-007", name: "Design audit", status: "paid", amount: 1500 },
  { id: "INV-008", name: "User research", status: "overdue", amount: 720 },
  { id: "INV-009", name: "Cloud hosting", status: "pending", amount: 300 },
  { id: "INV-010", name: "Support plan", status: "paid", amount: 600 },
  { id: "INV-011", name: "User research", status: "pending", amount: 850 },
  { id: "INV-012", name: "Design audit", status: "paid", amount: 1100 },
];
