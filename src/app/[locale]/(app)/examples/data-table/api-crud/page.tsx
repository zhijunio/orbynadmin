import type { Metadata } from "next";
import { ApiCrudExample } from "./api-crud-example";

export const metadata: Metadata = { title: "API CRUD Example" };

export default function ApiCrudPage() {
  return <ApiCrudExample />;
}
