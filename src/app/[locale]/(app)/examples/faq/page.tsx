"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard as IconCreditCard, Info as IconInfoCircle, Lock as IconLock, Users as IconUsers } from "lucide-react";

const faqGroups = [
  { key: "gettingStarted", icon: IconInfoCircle, questions: [["createWorkspace", "createWorkspaceAnswer"], ["inviteTeammates", "inviteTeammatesAnswer"], ["multipleWorkspaces", "multipleWorkspacesAnswer"]] },
  { key: "billingPlans", icon: IconCreditCard, questions: [["viewInvoices", "viewInvoicesAnswer"], ["changePlan", "changePlanAnswer"], ["paymentMethods", "paymentMethodsAnswer"]] },
  { key: "accountSecurity", icon: IconLock, questions: [["resetPassword", "resetPasswordAnswer"], ["enableTwoFactor", "enableTwoFactorAnswer"], ["signOutDevices", "signOutDevicesAnswer"]] },
  { key: "teamsProjects", icon: IconUsers, questions: [["assignTask", "assignTaskAnswer"], ["projectAccess", "projectAccessAnswer"], ["teamActivity", "teamActivityAnswer"]] },
] as const;

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const t = useTranslations("Examples.faq");
  const filteredGroups = useMemo(() => faqGroups.map((group) => ({
    ...group,
    title: t(`groups.${group.key}`),
    questions: group.questions.map(([questionKey, answerKey]) => ({
      question: t(`questions.${questionKey}`),
      answer: t(`questions.${answerKey}`),
    })).filter(({ question, answer }) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())),
  })).filter((group) => group.questions.length), [query, t]);

  return (
    <div className="space-y-6">
      <PageHeader title="Frequently Asked Questions" description="Quick answers about workspaces, billing, accounts, and projects." />
      <Card>
        <CardHeader className="mx-auto w-full max-w-2xl text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><IconInfoCircle className="size-6" /></span>
          <CardTitle className="text-2xl">{t("helpTitle")}</CardTitle>
          <CardDescription>{t("searchHint")}</CardDescription>
          <Input aria-label={t("searchLabel")} placeholder={t("searchPlaceholder")} className="mt-2 w-full" value={query} onChange={(event) => setQuery(event.target.value)} />
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {filteredGroups.map((group, groupIndex) => (
            <Card key={group.key} className="shadow-none">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><group.icon className="size-4 text-primary" />{group.title}</CardTitle></CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {group.questions.map(({ question, answer }, index) => (
                    <AccordionItem key={question} value={`${groupIndex}-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
          {filteredGroups.length === 0 && <p className="col-span-full py-10 text-center text-sm text-muted-foreground">{t("noResults")}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
