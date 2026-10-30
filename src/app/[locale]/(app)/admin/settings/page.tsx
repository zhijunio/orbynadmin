"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IconBuilding, IconShieldLock } from "@tabler/icons-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

const passwordRules = ["uppercase", "lowercase", "number", "symbol"] as const;
type PasswordRule = (typeof passwordRules)[number];

export default function AdminSettingsPage() {
  const t = useTranslations("SystemSettings");
  const [applicationName, setApplicationName] = useState("OrbynAdmin");
  const [baseUrl, setBaseUrl] = useState("https://admin.example.com");
  const [mfaRequired, setMfaRequired] = useState(true);
  const [minimumLength, setMinimumLength] = useState("12");
  const [rules, setRules] = useState<Record<PasswordRule, boolean>>({
    uppercase: true,
    lowercase: true,
    number: true,
    symbol: false,
  });

  function save(message: string) {
    toast.success(t("saved", { section: message }), {
      description: t("demoNotice"),
    });
  }

  function toggleRule(rule: PasswordRule) {
    setRules((current) => ({ ...current, [rule]: !current[rule] }));
  }

  return (
    <div className="space-y-6">
      <PageHeader title="System Settings" />
      <p className="-mt-4 text-sm text-muted-foreground">{t("demoNotice")}</p>

      <Tabs defaultValue="general" className="space-y-5">
        <TabsList>
          <TabsTrigger value="general"><IconBuilding className="size-4" />{t("general.tab")}</TabsTrigger>
          <TabsTrigger value="security"><IconShieldLock className="size-4" />{t("security.tab")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("general.title")}</CardTitle>
              <CardDescription>{t("general.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="application-name">{t("general.applicationName")}</Label>
                <Input id="application-name" value={applicationName} onChange={(event) => setApplicationName(event.target.value)} maxLength={80} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base-url">{t("general.baseUrl")}</Label>
                <Input id="base-url" type="url" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://admin.example.com" />
                <p className="text-xs text-muted-foreground">{t("general.baseUrlHint")}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button onClick={() => save(t("general.tab"))}>{t("saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>{t("security.mfaTitle")}</CardTitle>
              <CardDescription>{t("security.mfaDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label htmlFor="mfa-required">{t("security.mfaLabel")}</Label>
                  <p className="text-sm text-muted-foreground">{t("security.mfaHint")}</p>
                </div>
                <Switch id="mfa-required" checked={mfaRequired} onCheckedChange={setMfaRequired} />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button onClick={() => save(t("security.tab"))}>{t("saveChanges")}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("security.passwordTitle")}</CardTitle>
              <CardDescription>{t("security.passwordDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="max-w-xs space-y-2">
                <Label htmlFor="minimum-password-length">{t("security.minimumLength")}</Label>
                <Input id="minimum-password-length" type="number" min={8} max={64} value={minimumLength} onChange={(event) => setMinimumLength(event.target.value)} />
              </div>
              <div className="divide-y rounded-lg border">
                {passwordRules.map((rule) => (
                  <div key={rule} className="flex items-center justify-between gap-4 px-3 py-2.5">
                    <Label htmlFor={`password-rule-${rule}`}>{t(`security.rules.${rule}`)}</Label>
                    <Switch id={`password-rule-${rule}`} checked={rules[rule]} onCheckedChange={() => toggleRule(rule)} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button onClick={() => save(t("security.tab"))}>{t("saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
