"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";

import { getInitials } from "@/utils/text";
import { demoAvatarUrl } from "@/utils/demo-avatar";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { IconArrowLeft as IconArrowLeft, IconSearch as IconSearch, IconSend as IconSend, IconPhone as IconPhone, IconVideo as IconVideo, IconDotsVertical as IconDotsVertical, IconPaperclip as IconPaperclip, IconMoodSmile as IconMoodSmile, IconUser as IconUser, IconBell as IconBell, IconBellOff as IconBellOff, IconEraser as IconEraser, IconBan as IconBan, IconArchive as IconArchive, IconUsers as IconUsers } from "@tabler/icons-react";

import { Card } from "@/components/base/card/card";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { ScrollArea } from "@/components/base/scroll-area/scroll-area";
import { Separator } from "@/components/base/divider/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown/dropdown-menu";
import { cn } from "@/utils/cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/base/dialog/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog/dialog";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

const snippets = [
  "Sounds great, let's ship it 🚀",
  "Can you review the latest mockups?",
  "The invoice has been sent over.",
  "Perfect, talk tomorrow!",
  "I pushed the fix to staging.",
  "Thanks for the quick turnaround.",
  "Let me check and get back to you.",
  "Meeting moved to 3pm — works?",
  "Loving the new dashboard design.",
  "Could we hop on a quick call?",
];

const times = ["9:41", "10:12", "11:03", "12:30", "1:15", "2:48", "3:22", "4:07", "Yesterday", "Mon"];
const chatNames = [
  "Emma Nguyen",
  "Noah Novak",
  "Sophia Fischer",
  "Lucas Bauer",
  "Product Launch Team",
  "Benjamin Novak",
  "Design Team",
  "Liam Bauer",
  "Mason Novak",
  "Ava Carter",
];

const conversations = chatNames.map((name, i) => {
  const group = i === 4 || i === 6;
  return {
    id: `conversation-${i + 1}`,
    name,
    avatar: demoAvatarUrl(name),
    snippet: snippets[i],
    time: times[i],
    unread: i === 1 ? 3 : i === 4 ? 1 : i === 6 ? 2 : 0,
    online: !group && i % 3 === 0,
    group,
    archived: i === 8,
    muted: false,
    blocked: false,
  };
});

type ChatFilter = "All" | "Unread" | "Group" | "Archive" | "Blocked";
const chatFilters: ChatFilter[] = ["All", "Unread", "Group", "Archive", "Blocked"];

const seedThreads: Record<string, Message[]> = {};
conversations.forEach((c, i) => {
  seedThreads[c.id] = [
    { id: `${c.id}-1`, from: "them", text: "Hey! Do you have a minute to chat?", time: "9:12" },
    { id: `${c.id}-2`, from: "me", text: "Sure, what's up?", time: "9:14" },
    {
      id: `${c.id}-3`,
      from: "them",
      text: "I was reviewing the Q3 numbers and wanted your take on the projections.",
      time: "9:15",
    },
    { id: `${c.id}-4`, from: "me", text: "Happy to help. Send them my way and I'll take a look this afternoon.", time: "9:16" },
    { id: `${c.id}-5`, from: "them", text: snippets[i], time: "9:18" },
  ];
});

export default function ChatPage() {
  // First conversation is open on load, so it starts read.
  const [convos, setConvos] = useState(() =>
    conversations.map((c, i) => (i === 0 ? { ...c, unread: 0 } : c))
  );
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [threads, setThreads] = useState<Record<string, Message[]>>(seedThreads);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ChatFilter>("All");
  const [pendingAction, setPendingAction] = useState<
    { type: "block" | "clear"; conversationId: string } | null
  >(null);
  const [profileOpen, setProfileOpen] = useState(false);
  // Mobile master-detail: show the list first, the thread after tapping one.
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const active = convos.find((c) => c.id === activeId)!;
  const messages = threads[activeId] ?? [];

  const filtered = convos.filter((c) => {
    if (!c.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter === "Blocked") return c.blocked;
    if (c.blocked) return false;
    if (filter === "Unread") return c.unread > 0 && !c.archived;
    if (filter === "Group") return c.group && !c.archived;
    if (filter === "Archive") return c.archived;
    return !c.archived;
  });

  // Opening a conversation marks it read (clears its unread badge).
  function openConversation(id: string) {
    setActiveId(id);
    setMobileThreadOpen(true);
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  }

  function send() {
    const text = draft.trim();
    if (!text || active.blocked) return;
    setThreads((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] ?? []),
        { id: `${activeId}-${Date.now()}`, from: "me", text, time: "now" },
      ],
    }));
    setDraft("");
  }

  function archiveChat() {
    setConvos((prev) => prev.map((c) => c.id === activeId ? { ...c, archived: true } : c));
    setFilter("Archive");
    toast.success("Conversation archived");
  }

  function toggleMute() {
    const muted = !active.muted;
    setConvos((prev) => prev.map((c) => c.id === activeId ? { ...c, muted } : c));
    toast.success(muted ? "Notifications muted" : "Notifications unmuted");
  }

  function confirmPendingAction() {
    if (!pendingAction) return;
    const target = convos.find((c) => c.id === pendingAction.conversationId);
    if (!target) return;

    if (pendingAction.type === "block") {
      setConvos((prev) => prev.map((c) => c.id === target.id ? { ...c, blocked: true, unread: 0 } : c));
      setFilter("Blocked");
      toast.success(`${target.name} blocked`);
    } else {
      setThreads((prev) => ({ ...prev, [target.id]: [] }));
      toast.success("Conversation cleared");
    }
    setPendingAction(null);
  }

  function unblockActive() {
    setConvos((prev) => prev.map((c) => c.id === activeId ? { ...c, blocked: false } : c));
    setFilter("All");
    toast.success(`${active.name} unblocked`);
  }

  return <ConsoleLayout>{<div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Chats</h1>

      <Card className="grid h-[calc(100dvh-13rem)] min-h-[420px] grid-cols-1 overflow-hidden p-0 lg:grid-cols-[minmax(320px,23%)_minmax(0,1fr)]">
        {/* Conversation list */}
        <div
          className={cn(
            "min-h-0 flex-col border-r lg:flex",
            mobileThreadOpen ? "hidden" : "flex"
          )}
        >
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Chats</p>
              <Badge variant="secondary">{convos.filter((c) => !c.archived && !c.blocked).length}</Badge>
            </div>
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {chatFilters.map((chatFilter) => (
                <Button
                  key={chatFilter}
                  size="sm"
                  variant={filter === chatFilter ? "secondary" : "ghost"}
                  className="h-8 px-2.5"
                  onClick={() => setFilter(chatFilter)}
                >
                  {chatFilter}
                </Button>
              ))}
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-medium">No chats found</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try another filter or search.</p>
                </div>
              ) : filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openConversation(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted/60",
                    c.id === activeId && "bg-muted",
                  )}
                >
                  <div className="relative">
                    <Avatar className="size-12">
                      <AvatarImage src={c.avatar} alt={c.name} />
                      <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
                    </Avatar>
                    {c.online && (
                      <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[15px] font-medium">{c.name}</span>
                      <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1 truncate text-xs text-muted-foreground">{c.group && <IconUsers className="size-3 shrink-0" />}{c.snippet}</span>
                      {c.unread > 0 && (
                        <Badge className="size-5 shrink-0 justify-center rounded-full p-0 text-[10px] tabular-nums">
                          {c.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Active conversation */}
        <div
          className={cn(
            "min-h-0 min-w-0 flex-col lg:flex",
            mobileThreadOpen ? "flex" : "hidden"
          )}
        >
          <div className="flex items-center gap-3 border-b p-4">
            <Button
              variant="ghost"
              size="icon"
              className="-ml-1 shrink-0 lg:hidden"
              onClick={() => setMobileThreadOpen(false)}
              aria-label="Back to conversations"
            >
              <IconArrowLeft className="size-5" />
            </Button>
            <div className="relative">
              <Avatar className="size-9">
                <AvatarImage src={active.avatar} alt={active.name} />
                <AvatarFallback>{getInitials(active.name)}</AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{active.name}</p>
              <p className="text-xs text-muted-foreground">
                {active.blocked
                  ? "Blocked"
                  : active.muted
                    ? "Notifications muted"
                    : active.group
                      ? "Group conversation"
                      : active.online
                        ? "Online"
                        : "Last seen recently"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast(`Calling ${active.name}…`, { description: "Voice calls aren't available in the demo." })}
              aria-label="Voice call"
              disabled={active.blocked}
            >
              <IconPhone className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast(`Starting video call with ${active.name}…`, { description: "Video calls aren't available in the demo." })}
              aria-label="Video call"
              disabled={active.blocked}
            >
              <IconVideo className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Conversation actions">
                  <IconDotsVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <IconUser className="size-4" /> View profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMute}>
                  {active.muted ? <IconBell className="size-4" /> : <IconBellOff className="size-4" />}
                  {active.muted ? "Unmute notifications" : "Mute notifications"}
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => setPendingAction({ type: "clear", conversationId: activeId })}>
                  <IconEraser className="size-4" /> Clear messages
                </DropdownMenuItem>
                {!active.archived && !active.blocked && <DropdownMenuItem onClick={archiveChat}>
                  <IconArchive className="size-4" /> Archive conversation
                </DropdownMenuItem>}
                <DropdownMenuSeparator />
                {!active.group && (active.blocked ? (
                  <DropdownMenuItem onClick={unblockActive}>
                    <IconBan className="size-4" /> Unblock user
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem variant="destructive" onClick={() => setPendingAction({ type: "block", conversationId: activeId })}>
                    <IconBan className="size-4" /> Block user
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ScrollArea className="min-h-0 flex-1 bg-muted/20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex flex-col gap-3 p-4"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn("flex items-end gap-2", m.from === "me" && "flex-row-reverse")}
                  >
                    {m.from === "them" && (
                      <Avatar className="size-7">
                        <AvatarImage src={active.avatar} alt={active.name} />
                        <AvatarFallback>{getInitials(active.name)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                        m.from === "me"
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : "rounded-bl-sm bg-muted",
                      )}
                    >
                      <p>{m.text}</p>
                      <p
                        className={cn(
                          "mt-1 text-right text-[10px]",
                          m.from === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>

          <div className="flex shrink-0 items-center gap-2 border-t bg-card p-3 sm:gap-3 sm:p-4">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-xl"
              onClick={() => toast("Attach a file", { description: "File sharing isn't available in the demo." })}
              aria-label="Attach file"
              disabled={active.blocked}
            >
              <IconPaperclip className="size-4" />
            </Button>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) send();
              }}
              placeholder={active.blocked ? "Unblock this user to reply" : "Type a message…"}
              className="h-11 rounded-xl px-4"
              disabled={active.blocked}
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-xl"
              onClick={() => setDraft((d) => d + " 🙂")}
              aria-label="Add emoji"
              disabled={active.blocked}
            >
              <IconMoodSmile className="size-4" />
            </Button>
            <Button size="icon" className="size-11 shrink-0 rounded-xl" onClick={send} aria-label="Send message" disabled={active.blocked}>
              <IconSend className="size-5" />
            </Button>
          </div>
        </div>
      </Card>
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarImage src={active.avatar} alt={active.name} />
                <AvatarFallback>{getInitials(active.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription>
                  {active.group ? "Group conversation" : active.online ? "Online" : "Last seen recently"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Type</dt>
            <dd>{active.group ? "Group" : "Direct message"}</dd>
            <dt className="text-muted-foreground">Notifications</dt>
            <dd>{active.muted ? "Muted" : "On"}</dd>
            <dt className="text-muted-foreground">Conversation</dt>
            <dd>{active.blocked ? "Blocked" : active.archived ? "Archived" : "Active"}</dd>
          </dl>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={pendingAction !== null} onOpenChange={(open) => !open && setPendingAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction?.type === "clear" ? "Clear messages" : "Block user"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.type === "clear"
                ? `This removes messages with ${convos.find((c) => c.id === pendingAction.conversationId)?.name ?? "this contact"} for this session.`
                : `This conversation with ${convos.find((c) => c.id === pendingAction?.conversationId)?.name ?? "this user"} will be read-only until you unblock them.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmPendingAction}>
              {pendingAction?.type === "clear" ? "Clear messages" : "Block user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>}</ConsoleLayout>;
}
