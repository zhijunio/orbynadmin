"use client";

import { useTranslations } from "next-intl";
import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/base/buttons/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/base/dialog/dialog";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select/select";

export function AddWidgetDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const t = useTranslations("Dashboard.Overview");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{t("addWidget")}</DialogTitle>
            <DialogDescription>{t("widgetDescription")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="widget-name">{t("widgetName")}</Label>
              <Input id="widget-name" name="name" placeholder={t("widgetPlaceholder")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="widget-type">{t("type")}</Label>
              <Select name="type" defaultValue="metric">
                <SelectTrigger id="widget-type" className="w-full"><SelectValue placeholder={t("selectType")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">{t("metricCard")}</SelectItem>
                  <SelectItem value="line">{t("lineChart")}</SelectItem>
                  <SelectItem value="bar">{t("barChart")}</SelectItem>
                  <SelectItem value="table">{t("table")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">{t("cancel")}</Button></DialogClose>
            <Button type="submit"><IconPlus className="size-4" /> {t("addWidget")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
