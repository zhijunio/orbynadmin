


import type { Metadata } from "next";
import ConsoleLayout from "@/components/application/app-shell/console-layout";


export const metadata: Metadata = { title: "API CRUD Example" };

import { ApiCrudExample } from "@/app/blocks/data-table/api-crud/api-crud-example";



export default function ApiCrudPage() {
  return <ConsoleLayout><ApiCrudExample /></ConsoleLayout>;
}
