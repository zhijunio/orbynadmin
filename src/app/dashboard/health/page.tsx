import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { PageHeader } from "@/components/application/app-shell/page-header";
import MostActiveDaysCard from "@/components/application/dashboard/chart-cards/most-active-days-card";
import SleepScoreCard from "@/components/application/dashboard/chart-cards/sleep-score-card";
import StepsCard from "@/components/application/dashboard/chart-cards/steps-card";
import { StatCard, type StatCardData } from "@/components/application/dashboard/state-card/stat-card";
import { Avatar, AvatarFallback } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/base/card/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table/table";
import { IconCalendar, IconDroplet, IconFlask, IconHeartRateMonitor, IconMoonStars, IconPill, IconStethoscope, IconUser, IconWalk } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

const healthStats: StatCardData[] = [
  { label: "Sleep score", value: "98", change: 4.2, trend: "up", hint: "vs. last week", icon: IconMoonStars },
  { label: "Steps", value: "31,600", change: 12.5, trend: "up", hint: "today", icon: IconWalk },
  { label: "Resting heart rate", value: "62 bpm", change: 2.4, trend: "down", goodWhen: "down", hint: "vs. last week", icon: IconHeartRateMonitor },
];

const profileDetails: { label: string; value: string; icon: Icon }[] = [
  { label: "Date of birth", value: "28 July, 1997", icon: IconCalendar },
  { label: "Gender", value: "Male", icon: IconUser },
  { label: "Blood type", value: "O+", icon: IconDroplet },
  { label: "GP doctor", value: "Dr. Maya Chen", icon: IconStethoscope },
];

const alerts = [
  { title: "High heart rate", detail: "Above 120 BPM while inactive · 8:59 AM", date: "12 Jun", icon: IconHeartRateMonitor, tone: "text-rose-600 dark:text-rose-400" },
  { title: "Medical ID updated", detail: "Emergency contact and allergy information", date: "9 Jun", icon: IconUser, tone: "text-muted-foreground" },
  { title: "Lab results ready", detail: "Blood panel from Dr. Maya Chen", date: "9 Jun", icon: IconFlask, tone: "text-muted-foreground" },
  { title: "Medication reminder", detail: "Scheduled dose was missed at 9:00 AM", date: "8 Jun", icon: IconPill, tone: "text-amber-600 dark:text-amber-400" },
  { title: "Irregular sleep", detail: "Bedtime shifted by more than two hours", date: "6 Jun", icon: IconMoonStars, tone: "text-muted-foreground" },
];

const patients = [
  { name: "Jordan Lee", admission: "Outpatient", status: "Recovering", condition: "Post-op", appointment: "14 May, 2026" },
  { name: "Avery Chen", admission: "Inpatient", status: "In treatment", condition: "Hypertension", appointment: "15 Oct, 2026" },
  { name: "Sam Rivera", admission: "Emergency", status: "Under observation", condition: "Asthma", appointment: "25 Mar, 2026" },
  { name: "Morgan Patel", admission: "Inpatient", status: "Stable", condition: "Migraine", appointment: "3 Oct, 2026" },
];

const statusTone: Record<string, string> = {
  Recovering: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "In treatment": "bg-primary/10 text-primary dark:text-primary",
  "Under observation": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Stable: "bg-muted text-muted-foreground",
};

function MedicalProfileCard() {
  return (
    <Card className="flex h-[330px] flex-col rounded-[20px] border-0 bg-muted/45 p-4 ring-0">
      <CardContent className="flex min-h-0 flex-1 flex-col justify-between gap-5 p-0">
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="size-14 rounded-xl">
            <AvatarFallback className="rounded-xl text-base font-semibold">JM</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Jordan Morgan</h2>
            <p className="text-sm text-muted-foreground">Patient ID · PT-2048</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
          {profileDetails.map(({ label, value, icon: Icon }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon aria-hidden="true" className="size-3.5" />{label}</dt>
              <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

function ImportantAlertsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Important alerts</CardTitle>
        <CardAction><Badge variant="secondary">12 this week</Badge></CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        {alerts.map(({ title, detail, date, icon: Icon, tone }) => (
          <div key={title} className="flex items-start gap-3 rounded-lg px-2 py-2.5">
            <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${tone}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
            </div>
            <time className="shrink-0 pt-0.5 text-xs text-muted-foreground">{date}</time>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PatientsCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Patients</CardTitle><CardAction><span className="text-sm text-muted-foreground">540 patients</span></CardAction></CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader><TableRow><TableHead className="pl-5">Patient</TableHead><TableHead>Admission</TableHead><TableHead>Status</TableHead><TableHead>Condition</TableHead><TableHead className="pr-5">Next appointment</TableHead></TableRow></TableHeader>
          <TableBody>{patients.map((patient) => <TableRow key={patient.name}>
            <TableCell className="pl-5"><span className="flex items-center gap-2.5"><Avatar size="sm"><AvatarFallback>{patient.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback></Avatar><span className="font-medium">{patient.name}</span></span></TableCell>
            <TableCell>{patient.admission}</TableCell>
            <TableCell><Badge variant="secondary" className={statusTone[patient.status]}>{patient.status}</Badge></TableCell>
            <TableCell>{patient.condition}</TableCell>
            <TableCell className="pr-5 text-muted-foreground">{patient.appointment}</TableCell>
          </TableRow>)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function HealthDashboardPage() {
  return (
    <ConsoleLayout>
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        <PageHeader title="Medical Profile" />
        <div className="grid gap-4 sm:grid-cols-3">
          {healthStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-3">
          <MedicalProfileCard />
          <StepsCard />
          <SleepScoreCard />
        </div>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)]">
          <MostActiveDaysCard />
          <ImportantAlertsCard />
        </div>
        <PatientsCard />
      </div>
    </ConsoleLayout>
  );
}
