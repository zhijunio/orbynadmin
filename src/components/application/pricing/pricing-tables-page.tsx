"use client";

import { useLocale } from "next-intl";
import { IconCheck } from "@tabler/icons-react";

import { Badge } from "@/components/base/badges/badge";
import { Button } from "@/components/base/buttons/button";
import { Card, CardContent, CardHeader } from "@/components/base/card/card";

const tiers = [
  { name: "Basic", price: "$5", cadence: "/month", description: { en: "A focused start for solo work.", zh: "适合个人开始使用。" }, features: ["3 projects", "1 workspace", "Community support", "Basic reports"] },
  { name: "Standard", price: "$29", cadence: "/month", description: { en: "More room for a growing team.", zh: "为成长中的团队提供更多空间。" }, features: ["Unlimited projects", "10 team members", "Shared dashboards", "Priority support"] },
  { name: "Premium", price: "$49", cadence: "/month", description: { en: "Advanced controls for busy teams.", zh: "为高频协作团队提供进阶管理能力。" }, features: ["Everything in Standard", "Custom roles", "Advanced reports", "Audit history"] },
  { name: "Enterprise", price: "Custom", cadence: "", description: { en: "A tailored plan for your organization.", zh: "为组织定制的方案。" }, features: ["Flexible seats", "SAML SSO", "Dedicated support", "Custom onboarding"] },
];

export function PricingTablesPage() {
  const locale = useLocale() === "zh" ? "zh" : "en";

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{locale === "zh" ? "价格表" : "Pricing Tables"}</h1>
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">{locale === "zh" ? "适合不同阶段的方案" : "Plans for every stage"}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={index === 2
                ? "gap-0 rounded-2xl border-0 bg-primary/5 p-4 ring-1 ring-primary/30 sm:p-5"
                : "gap-0 rounded-2xl border-0 bg-muted/45 p-4 ring-0 sm:p-5"}
            >
              <CardHeader className="gap-4 px-0 pb-5 pt-0">
                <div className="flex min-h-5 items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{tier.name}</h3>
                  {index === 2 && (
                    <Badge>{locale === "zh" ? "推荐" : "Recommended"}</Badge>
                  )}
                </div>
                <div className="flex min-h-10 items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">{tier.price}</span>
                  {tier.cadence && <span className="text-sm text-muted-foreground">{tier.cadence}</span>}
                </div>
                <p className="min-h-10 text-sm leading-5 text-muted-foreground">{tier.description[locale]}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 px-0 pb-0">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm leading-5">
                    <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button className="w-full" variant={index === 2 ? "default" : "outline"}>
                  {tier.price === "Custom"
                    ? locale === "zh" ? "联系销售" : "Contact sales"
                    : locale === "zh" ? "选择方案" : "Choose plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
