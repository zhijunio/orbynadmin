import { customers as sharedCustomers, type Customer } from "@/data";
import { demoAvatarUrl } from "@/utils/demo-avatar";

export type { Customer } from "@/data";

export const customers: Customer[] = sharedCustomers.map((customer, index) => ({
  ...customer,
  avatar: demoAvatarUrl(index),
}));
