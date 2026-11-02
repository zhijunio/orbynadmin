"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

const pad = (value: number) => value.toString().padStart(2, "0");

export default function ComingSoonPage() {
  const locale = useLocale() === "zh" ? "zh" : "en";
  const [email, setEmail] = useState("");
  const [time, setTime] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 4 * 86_400_000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    toast.success(locale === "zh" ? "已加入通知名单" : "You're on the list", {
      description: locale === "zh" ? `产品上线时会通知 ${value}。` : `We'll notify ${value} when we launch.`,
    });
    setEmail("");
  }

  const units = [
    { label: locale === "zh" ? "天" : "Days", value: time.days },
    { label: locale === "zh" ? "小时" : "Hours", value: time.hours },
    { label: locale === "zh" ? "分钟" : "Minutes", value: time.minutes },
    { label: locale === "zh" ? "秒" : "Seconds", value: time.seconds },
  ];

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,var(--primary)/10%,transparent_70%)]" />
      <div className="relative w-full max-w-2xl text-center">
        <Link href="/" aria-label="OrbynAdmin home" className="mx-auto flex w-fit items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><IconSparkles className="size-5" /></span>
          OrbynAdmin
        </Link>
        <h1 className="mt-12 text-4xl font-semibold tracking-tight sm:text-5xl">{locale === "zh" ? "即将推出" : "Coming Soon"}</h1>
        <p className="mx-auto mt-4 max-w-lg text-pretty leading-7 text-muted-foreground">
          {locale === "zh" ? "我们正在建设新网站。留下邮箱，获取上线进展与最新消息。" : "Our website is under construction. Leave your email to receive launch updates and announcements."}
        </p>

        <div className="mx-auto mt-9 grid max-w-lg grid-cols-4 divide-x rounded-xl border bg-card py-5 shadow-sm">
          {units.map(({ label, value }) => (
            <div key={label} className="px-2">
              <div className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">{pad(value)}</div>
              <div className="mt-1 text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubscribe} className="mx-auto mt-7 flex max-w-lg flex-col gap-2 sm:flex-row">
          <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" aria-label={locale === "zh" ? "邮箱地址" : "Email address"} className="h-11 flex-1" />
          <Button type="submit" className="h-11 gap-2 px-5">{locale === "zh" ? "订阅通知" : "Subscribe"}<IconArrowRight className="size-4" /></Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">{locale === "zh" ? "仅发送上线通知，不发送其他邮件。" : "Only launch updates. No other email."}</p>
        <footer className="mt-16 text-sm text-muted-foreground">© {new Date().getFullYear()} OrbynAdmin</footer>
      </div>
    </main>
  );
}
