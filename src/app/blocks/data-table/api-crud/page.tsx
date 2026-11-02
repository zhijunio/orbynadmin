


import type { Metadata } from "next";


export const metadata: Metadata = { title: "API CRUD Example" };

import { ApiCrudExample } from "@/app/blocks/data-table/api-crud/api-crud-example";



export default function ApiCrudPage() {
  return <ApiCrudExample />;
}
