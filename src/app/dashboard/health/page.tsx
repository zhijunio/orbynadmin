"use client";

import { useMemo, useRef, useState } from "react";
import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PageHeader } from "@/components/application/app-shell/page-header";
import MedicalProfileCard from "./medical-profile-card";
import MostActiveDaysCard from "@/components/application/dashboard/chart-cards/most-active-days-card";
import SleepScoreCard from "@/components/application/dashboard/chart-cards/sleep-score-card";
import StepsCard from "@/components/application/dashboard/chart-cards/steps-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Button } from "@/components/base/buttons/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/base/dropdown/dropdown-menu";
import { Input } from "@/components/base/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { IconAdjustmentsHorizontal, IconChevronLeft, IconChevronRight, IconDots, IconFileUpload, IconFlask, IconHeartRateMonitor, IconMoonStars, IconPill, IconSearch, IconUser, IconDroplet } from "@tabler/icons-react";
import { demoAvatarUrl } from "@/utils/demo-avatar";
import { toast } from "sonner";

const alerts = [
  { title: "High Heart rate", detail: "Your heart rate rose above 120 BPM while you seemed to be inactive for 10 minutes starting at 8:59 AM, 12 June.", date: "June, 12", icon: IconHeartRateMonitor, tone: "text-rose-700 dark:text-rose-400" },
  { title: "Medical ID", detail: "Your emergency contact and allergy information was updated in your Medical ID.", date: "June, 9", icon: IconUser, tone: "text-muted-foreground" },
  { title: "Lab results ready", detail: "Your latest blood panel ordered by Dr. Mattheus Clarkson is back — cholesterol and glucose are within the normal range.", date: "June, 9", icon: IconFlask, tone: "text-muted-foreground" },
  { title: "Medication reminder", detail: "You missed your 9:00 AM dose of Metoprolol. Take it as soon as possible unless your next dose is near.", date: "June, 8", icon: IconPill, tone: "text-amber-700 dark:text-amber-400" },
  { title: "Irregular sleep", detail: "Your bedtime shifted by more than 2 hours on 3 of the last 7 nights, which can affect your sleep score.", date: "June, 6", icon: IconMoonStars, tone: "text-muted-foreground" },
  { title: "Low blood oxygen", detail: "Your blood oxygen dipped to 93% for a short period during sleep on the night of 4 June.", date: "June, 5", icon: IconDroplet, tone: "text-sky-700 dark:text-sky-400" },
];

const patients = [
  { name: "John Clarkson", admission: "Outpatient", status: "Recovering", condition: "Pregnancy, Post-op", appointment: "May 14, 2026" },
  { name: "Aspen Lubin", admission: "Inpatient", status: "In treatment", condition: "Hypertension", appointment: "Oct 15, 2026" },
  { name: "Michael Ekstrom", admission: "Inpatient", status: "Under observation", condition: "Asthma, Migraine", appointment: "Mar 25, 2026" },
  { name: "Kianna Vaccaro", admission: "Inpatient", status: "Stable", condition: "Post-op", appointment: "Oct 03, 2026" },
  { name: "Livia Saris", admission: "Emergency", status: "Critical", condition: "Migraine, Post-op", appointment: "Dec 24, 2026" },
  { name: "Jaydon Aminoff", admission: "Outpatient", status: "Stable", condition: "Diabetes", appointment: "Feb 22, 2026" },
  { name: "Maria Lubin", admission: "Inpatient", status: "Critical", condition: "Pregnancy", appointment: "Apr 10, 2026" },
  { name: "Ann Press", admission: "Discharged", status: "Stable", condition: "Hypertension", appointment: "Aug 10, 2026" },
  { name: "Terry Vaccaro", admission: "Discharged", status: "Recovering", condition: "Allergy, Pregnancy", appointment: "Dec 04, 2026" },
  { name: "Ruben Rosser", admission: "Outpatient", status: "In treatment", condition: "Migraine, Post-op", appointment: "Oct 01, 2026" },
  { name: "Ruben Curtis", admission: "Discharged", status: "Recovering", condition: "Allergy, Fracture", appointment: "Aug 21, 2026" },
  { name: "Wilson Vetrovs", admission: "Discharged", status: "Stable", condition: "Pregnancy, Diabetes", appointment: "Aug 17, 2026" },
];

const patientRecords = Array.from({ length: 540 }, (_, index) => {
  const example = patients[index % patients.length];
  if (index < patients.length) return { ...example, id: index + 1 };
  const sequence = index + 1;
  const date = new Date(Date.UTC(2026, index % 12, (index * 7) % 28 + 1));
  return {
    ...example,
    id: sequence,
    name: `Patient ${String(sequence).padStart(3, "0")}`,
    appointment: date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" }),
  };
});

const statusTone: Record<string, string> = {
  Recovering: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "In treatment": "bg-primary/10 text-primary dark:text-primary",
  "Under observation": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Stable: "bg-muted text-muted-foreground",
  Critical: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

function ImportantAlertsCard() {
  const periods = ["29 Jun - 5 Jul", "22 Jun - 28 Jun", "15 Jun - 21 Jun"];
  const [periodIndex, setPeriodIndex] = useState(0);
  return (
    <Card className="h-[330px] overflow-hidden rounded-[20px] border border-muted bg-muted px-2.5 pt-2.5 pb-0 ring-0">
      <CardHeader className="flex-row items-center justify-between gap-2 px-1.5 pt-1.5">
        <CardTitle>Important alerts</CardTitle>
        <CardAction className="flex items-center gap-1.5"><Badge variant="secondary">12</Badge><span className="text-xs text-muted-foreground">this week</span></CardAction>
      </CardHeader>
      <div className="flex h-8 shrink-0 items-center justify-end px-1.5">
        <div className="flex h-8 min-w-[151px] items-center justify-between gap-1 rounded-[10px] border bg-background px-1 py-1 shadow-xs">
          <Button variant="ghost" size="icon-xs" aria-label="Previous alert period" disabled={periodIndex === periods.length - 1} onClick={() => setPeriodIndex((index) => Math.min(periods.length - 1, index + 1))}><IconChevronLeft aria-hidden="true" /></Button>
          <span className="flex-1 text-center text-sm font-medium">{periods[periodIndex]}</span>
          <Button variant="ghost" size="icon-xs" aria-label="Next alert period" disabled={periodIndex === 0} onClick={() => setPeriodIndex((index) => Math.max(0, index - 1))}><IconChevronRight aria-hidden="true" /></Button>
        </div>
      </div>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pb-2.5">
        {alerts.map(({ title, detail, date, icon: Icon, tone }) => (
          <div key={title} className="flex shrink-0 items-start gap-2 rounded-[10px] bg-background p-2.5">
            <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${tone}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{title}</p>
              <p title={detail} className="mt-0.5 text-xs leading-4 text-muted-foreground">{detail}</p>
            </div>
            <time className="shrink-0 pt-0.5 text-xs text-muted-foreground">{date}</time>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PatientsCard() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [condition, setCondition] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const conditions = useMemo(() => Array.from(new Set(patientRecords.flatMap((patient) => patient.condition.split(", ")))), []);
  const filtered = useMemo(() => patientRecords.filter((patient) =>
    (status === "all" || patient.status === status) &&
    (condition === "all" || patient.condition.split(", ").includes(condition)) &&
    `${patient.name} ${patient.admission} ${patient.status} ${patient.condition}`.toLowerCase().includes(query.toLowerCase())), [query, status, condition]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageStart = Math.min(Math.max(0, currentPage - 2), Math.max(0, pageCount - 5));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => pageStart + index);
  const resetPage = () => setPage(0);
  return (
    <Card className="rounded-2xl border pt-2 pb-3 ring-0">
      <CardHeader className="flex-row items-center justify-between gap-3 py-1"><CardTitle className="text-sm font-medium">Total Results</CardTitle><span className="text-sm text-muted-foreground">{filtered.length} patients</span></CardHeader>
      <CardContent className="px-0 pb-0">
        <div id="patient-filters" className="flex scroll-mt-20 flex-col gap-3 px-5 py-2 sm:flex-row sm:items-center sm:justify-end">
          <Select value={status} onValueChange={(value) => { setStatus(value); resetPage(); }}><SelectTrigger aria-label="Filter by patient status" className="w-full sm:w-[150px]"><SelectValue>{status === "all" ? "All statuses" : status}</SelectValue></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{Object.keys(statusTone).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
          <Select value={condition} onValueChange={(value) => { setCondition(value); resetPage(); }}><SelectTrigger aria-label="Filter by patient condition" className="w-full sm:w-[160px]"><SelectValue>{condition === "all" ? "All conditions" : condition}</SelectValue></SelectTrigger><SelectContent><SelectItem value="all">All conditions</SelectItem>{conditions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
          <div className="relative w-full sm:max-w-[220px]"><IconSearch aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search patients" placeholder="Search" value={query} onChange={(event) => { setQuery(event.target.value); resetPage(); }} className="h-9 pl-8" /></div>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead className="pl-5">Patient</TableHead><TableHead>Admission</TableHead><TableHead>Status</TableHead><TableHead>Condition</TableHead><TableHead>Next appointment</TableHead><TableHead className="w-12 pr-5 text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>{visible.length ? visible.map((patient) => <TableRow key={patient.id}>
            <TableCell className="pl-5"><span className="flex items-center gap-2.5"><Avatar size="xs"><AvatarImage src={demoAvatarUrl(patient.name)} alt="" /><AvatarFallback>{patient.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><span className="font-medium">{patient.name}</span></span></TableCell>
            <TableCell>{patient.admission}</TableCell>
            <TableCell><Badge variant="secondary" className={statusTone[patient.status]}>{patient.status}</Badge></TableCell>
            <TableCell>{patient.condition}</TableCell>
            <TableCell className="text-muted-foreground">{patient.appointment}</TableCell>
            <TableCell className="pr-5 text-right"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-xs" aria-label={`Actions for ${patient.name}`}><IconDots aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => toast.info("Patient record", { description: patient.name })}>View patient</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
          </TableRow>) : <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No matching patients.</TableCell></TableRow>}</TableBody>
        </Table>
        <div className="flex flex-col gap-3 border-t px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="text-muted-foreground">Showing {filtered.length ? currentPage * pageSize + 1 : 0}–{Math.min((currentPage + 1) * pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-1"><Button variant="outline" size="sm" disabled={currentPage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>Previous</Button>{pages.map((index) => <Button key={index} variant={currentPage === index ? "secondary" : "ghost"} size="sm" aria-current={currentPage === index ? "page" : undefined} onClick={() => setPage(index)}>{index + 1}</Button>)}{pageCount > 5 && <><span className="px-1 text-muted-foreground">…</span><Button variant={currentPage === pageCount - 1 ? "secondary" : "ghost"} size="sm" aria-current={currentPage === pageCount - 1 ? "page" : undefined} onClick={() => setPage(pageCount - 1)}>{pageCount}</Button></>}<Button variant="outline" size="sm" disabled={currentPage >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>Next</Button></div></div>
      </CardContent>
    </Card>
  );
}

export default function HealthDashboardPage() {
  const reportInput = useRef<HTMLInputElement>(null);
  return (
    <ConsoleLayout>
      <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-2.5">
        <PageHeader title="Medical Profile">
          <Button variant="outline" onClick={() => document.getElementById("patient-filters")?.scrollIntoView({ behavior: "smooth", block: "center" })}><IconAdjustmentsHorizontal aria-hidden="true" />5 Filters</Button>
          <Button onClick={() => reportInput.current?.click()}><IconFileUpload aria-hidden="true" />File a report</Button>
          <input ref={reportInput} type="file" accept=".pdf,image/*" className="sr-only" aria-label="Choose a medical report" onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) toast.success("Report selected", { description: file.name });
            event.currentTarget.value = "";
          }} />
        </PageHeader>
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
            <MedicalProfileCard />
            <StepsCard />
            <SleepScoreCard />
          </div>
          <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="md:col-span-2"><MostActiveDaysCard /></div>
            <ImportantAlertsCard />
          </div>
          <PatientsCard />
        </div>
      </div>
    </ConsoleLayout>
  );
}
