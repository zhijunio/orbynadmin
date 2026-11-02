import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { CategoryBarChart } from "@/components/application/dashboard/charts/category-bar-chart";

export function SalesCategoryCard() {
  return <Card><CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader><CardContent><CategoryBarChart /></CardContent></Card>;
}
