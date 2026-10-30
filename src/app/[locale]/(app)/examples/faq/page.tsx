"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/feature/layout/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard as IconCreditCard, Info as IconInfoCircle, Lock as IconLock, Users as IconUsers } from "lucide-react";

const faqGroups = [
  { title: "Getting started", icon: IconInfoCircle, questions: [["How do I create a workspace?", "Create a workspace from the workspace switcher, then invite your team and choose a plan."], ["How do I invite teammates?", "Open Workspace settings, select Members, and send an invitation to each teammate's work email."], ["Can I manage multiple workspaces?", "Yes. Use the workspace switcher in the sidebar to create and move between workspaces."]] },
  { title: "Billing and plans", icon: IconCreditCard, questions: [["Where can I view invoices?", "Open Profile and select Billing to review your recent invoices."], ["Can I change my plan?", "You can review your current plan in the Billing section of your Profile."], ["Which payment methods can I use?", "Workspace billing supports major credit and debit cards. Manage saved payment methods from billing settings."]] },
  { title: "Account and security", icon: IconLock, questions: [["How do I reset my password?", "Use Forgot password on the sign-in page. We will send a secure reset link to your account email."], ["How do I enable two-factor authentication?", "Open your Profile settings, go to Security, and turn on two-factor authentication."], ["How can I sign out of other devices?", "Use Active Sessions in Profile → Security to review and end sessions."]] },
  { title: "Teams and projects", icon: IconUsers, questions: [["How do I assign a task?", "Open Tasks, choose a task, and select a teammate in the assignee field."], ["Can I change project access?", "Project owners can update member roles and permissions from project settings."], ["Where can I find team activity?", "Open the project activity view to see recent changes, comments, and status updates."]] },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(() => faqGroups.map((group) => ({ ...group, questions: group.questions.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.questions.length), [query]);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Frequently Asked Questions"
        description="Quick answers about workspaces, billing, accounts, and projects."
      />

      <Card>
        <CardHeader className="mx-auto w-full max-w-2xl text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <IconInfoCircle className="size-6" />
          </span>
          <CardTitle className="text-2xl">How can we help?</CardTitle>
          <CardDescription>Search common questions or browse a topic below.</CardDescription>
          <Input
            aria-label="Search FAQ"
            placeholder="Search frequently asked questions..."
            className="mt-2 w-full"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </CardHeader>

        <CardContent className="grid gap-4 lg:grid-cols-2">
          {filteredGroups.map((group, groupIndex) => (
            <Card key={group.title} className="shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <group.icon className="size-4 text-primary" />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {group.questions.map(([question, answer], index) => (
                    <AccordionItem key={question} value={`${groupIndex}-${index}`}>
                      <AccordionTrigger>{question}</AccordionTrigger>
                      <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
          {filteredGroups.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No questions match your search.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
