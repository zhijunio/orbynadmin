"use client";

import { useState } from "react";
import {
  IconClock,
  IconFilter,
  IconPlus,
  IconTicket,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type Ticket = {
  id: string;
  priority: string;
  title: string;
  customer: string;
  company: string;
  owner: string;
  sla: string;
};
type Queue = { id: string; title: string; tone: string; tickets: Ticket[] };

const initialQueues: Queue[] = [
  {
    id: "new",
    title: "New",
    tone: "text-info",
    tickets: [
      {
        id: "SUP-10482",
        priority: "High",
        title: "Export job stuck after regional data residency switch",
        customer: "Alicia Wong",
        company: "Northstar Bio",
        owner: "Maya Ito",
        sla: "1h 45m",
      },
      {
        id: "SUP-10483",
        priority: "Normal",
        title: "SSO group mapping not applying to new finance workspace",
        customer: "Jon Bell",
        company: "Meridian Works",
        owner: "Omar Haddad",
        sla: "3h 20m",
      },
    ],
  },
  {
    id: "needs-reply",
    title: "Needs Reply",
    tone: "text-warning",
    tickets: [
      {
        id: "SUP-10451",
        priority: "High",
        title: "Workspace audit stream missing approval events",
        customer: "Sofia Klein",
        company: "Aster Capital",
        owner: "Priya Shah",
        sla: "52m",
      },
      {
        id: "SUP-10459",
        priority: "Normal",
        title: "Billing contact cannot download April invoice bundle",
        customer: "Theo Martins",
        company: "Civic Cloud",
        owner: "Marcus Chen",
        sla: "4h 05m",
      },
      {
        id: "SUP-10466",
        priority: "Low",
        title: "Saved view permissions differ between parent and child teams",
        customer: "Nina Patel",
        company: "Harbor Grid",
        owner: "Elena Torres",
        sla: "7h 10m",
      },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    tone: "text-violet-500",
    tickets: [
      {
        id: "SUP-10392",
        priority: "Urgent",
        title: "Webhook retries duplicate seat change events",
        customer: "Iris Novak",
        company: "LedgerPoint",
        owner: "Priya Shah",
        sla: "36m",
      },
      {
        id: "SUP-10410",
        priority: "High",
        title: "EU shard search results omit recently migrated projects",
        customer: "Mateo Ruiz",
        company: "Atlas Legal",
        owner: "Omar Haddad",
        sla: "2h 15m",
      },
    ],
  },
  {
    id: "waiting-customer",
    title: "Waiting Customer",
    tone: "text-info",
    tickets: [
      {
        id: "SUP-10437",
        priority: "Normal",
        title: "Confirm SCIM token rotation window for APAC tenant",
        customer: "Grace Liu",
        company: "Quantix Bank",
        owner: "Maya Ito",
        sla: "Paused",
      },
      {
        id: "SUP-10444",
        priority: "Low",
        title: "Approve temporary allowlist for partner sandbox",
        customer: "Evan Brooks",
        company: "Fieldstone Labs",
        owner: "Elena Torres",
        sla: "Paused",
      },
    ],
  },
  {
    id: "sla-risk",
    title: "SLA Risk",
    tone: "text-destructive",
    tickets: [
      {
        id: "SUP-10472",
        priority: "Urgent",
        title: "Production admins locked out after enforced SAML change",
        customer: "Noah Grant",
        company: "Summit Health",
        owner: "Marcus Chen",
        sla: "18m",
      },
      {
        id: "SUP-10476",
        priority: "High",
        title: "Regional failover report not visible to compliance team",
        customer: "Leah Stern",
        company: "BluePeak Energy",
        owner: "Omar Haddad",
        sla: "41m",
      },
    ],
  },
  {
    id: "resolved",
    title: "Resolved",
    tone: "text-success",
    tickets: [
      {
        id: "SUP-10370",
        priority: "Normal",
        title: "Renewal dashboard showing stale workspace counts",
        customer: "Mira Stone",
        company: "Oakline Retail",
        owner: "Priya Shah",
        sla: "Met",
      },
      {
        id: "SUP-10381",
        priority: "Low",
        title: "Partner API key rotation reminder sent to wrong owner",
        customer: "Caleb Reed",
        company: "Orbit Systems",
        owner: "Maya Ito",
        sla: "Met",
      },
    ],
  },
];

const priorityTone: Record<string, string> = {
  Urgent: "border-destructive/40 bg-destructive/5 text-destructive",
  High: "border-warning/40 bg-warning/5 text-warning",
  Normal: "border-info/40 bg-info/5 text-info",
  Low: "border-muted-foreground/30 bg-muted text-muted-foreground",
};

export function SupportEscalationsKanban() {
  const [queues, setQueues] = useState(initialQueues);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function addTicket(queueId = "new") {
    if (!newTitle.trim()) return;
    const ticket: Ticket = {
      id: `SUP-${10500 + queues.reduce((sum, queue) => sum + queue.tickets.length, 0)}`,
      priority: "Normal",
      title: newTitle.trim(),
      customer: "New customer",
      company: "New account",
      owner: "Maya Ito",
      sla: "4h",
    };
    setQueues((current) =>
      current.map((queue) =>
        queue.id === queueId
          ? { ...queue, tickets: [...queue.tickets, ticket] }
          : queue,
      ),
    );
    setNewTitle("");
    setDialogOpen(false);
  }

  function moveTicket(ticketId: string, queueId: string) {
    setQueues((current) => {
      const source = current.find((queue) =>
        queue.tickets.some((ticket) => ticket.id === ticketId),
      );
      const target = current.find((queue) => queue.id === queueId);
      const ticket = source?.tickets.find((item) => item.id === ticketId);
      if (!source || !target || !ticket || source.id === target.id)
        return current;
      return current.map((queue) =>
        queue.id === source.id
          ? {
              ...queue,
              tickets: queue.tickets.filter((item) => item.id !== ticketId),
            }
          : queue.id === target.id
            ? { ...queue, tickets: [ticket, ...queue.tickets] }
            : queue,
      );
    });
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Support Escalations</h2>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <IconFilter />
            Filters
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setDialogOpen(true);
              setNewTitle("");
            }}
          >
            <IconPlus />
            Ticket
          </Button>
        </div>
      </header>
      {filterOpen && (
        <div className="rounded-lg border bg-card p-3">
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search tickets"
          />
        </div>
      )}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-3">
          {queues.map((queue) => (
            <section
              key={queue.id}
              data-support-queue={queue.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                moveTicket(event.dataTransfer.getData("text/plain"), queue.id);
              }}
              className="w-[250px] shrink-0 rounded-xl border bg-muted/20 p-2"
            >
              <header className="mb-2 flex items-center gap-2 px-1 py-1">
                <IconTicket className={`size-4 ${queue.tone}`} />
                <h3 className="text-sm font-semibold">{queue.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {queue.tickets.length}
                </span>
              </header>
              <div className="grid content-start gap-2">
                {queue.tickets
                  .filter((ticket) =>
                    `${ticket.id} ${ticket.title} ${ticket.customer} ${ticket.company} ${ticket.owner} ${ticket.priority}`
                      .toLowerCase()
                      .includes(filter.toLowerCase()),
                  )
                  .map((ticket) => (
                    <article
                      key={ticket.id}
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", ticket.id)
                      }
                      className={`rounded-xl border bg-card p-2.5 ${ticket.priority === "Urgent" ? "border-destructive/40" : ticket.priority === "High" ? "border-warning/40" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {ticket.id}
                        </span>
                        <span
                          className={`ml-auto rounded-md border px-1.5 py-0.5 text-[10px] ${priorityTone[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                      <h4 className="mt-2 text-xs font-semibold leading-4">
                        {ticket.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {ticket.customer} at {ticket.company}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <Avatar className="size-5">
                          <AvatarImage
                            src={demoAvatarUrl(ticket.owner)}
                            alt=""
                          />
                          <AvatarFallback className="text-[8px]">
                            {ticket.owner
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-[11px] font-medium">
                          {ticket.owner}
                        </span>
                        <span
                          className={`ml-auto flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] ${ticket.sla === "Paused" || ticket.sla === "Met" ? "text-muted-foreground" : ticket.sla.endsWith("m") ? "border-warning/40 bg-warning/5 text-warning" : "border-info/40 bg-info/5 text-info"}`}
                        >
                          <IconClock className="size-3" />
                          {ticket.sla}
                        </span>
                      </div>
                    </article>
                  ))}
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-md py-1.5 text-xs text-muted-foreground hover:bg-muted"
              >
                <IconPlus className="size-3.5" />
                Add ticket
              </button>
            </section>
          ))}
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New ticket</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="Ticket subject"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => addTicket()}>Create ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
