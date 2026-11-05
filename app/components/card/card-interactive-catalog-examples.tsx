"use client";

import { useState } from "react";
import { IconChevronDown, IconDotsVertical, IconExternalLink } from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu";

export function CardInteractiveCatalogExamples() {
  const [expanded, setExpanded] = useState(false);

  return (
    <CatalogGridItems>
      <ComponentPreview title="Header Actions" description="CardAction keeps a menu in the title row." layout="panel">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Deployment summary</CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" aria-label="Deployment actions">
                    <IconDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit details</DropdownMenuItem>
                  <DropdownMenuItem>Copy deployment link</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Archive deployment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-success" />
              Healthy
            </span>
            <span className="text-sm text-muted-foreground">Production · v3.4.2</span>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Expandable Footer" layout="panel">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Monthly usage</CardTitle>
            <p className="text-sm text-muted-foreground">Your plan resets in 8 days.</p>
            <CardAction>
              <Badge variant="secondary">Pro plan</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>API requests</span>
              <span>82,400 / 100,000</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
            {expanded && (
              <div className="grid gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                <p>Requests this month: 82,400</p>
                <p>Estimated overage: $0.00</p>
                <Button variant="link" className="h-auto justify-start p-0">
                  View usage details <IconExternalLink />
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show less" : "Show usage details"}
              <IconChevronDown className={expanded ? "rotate-180" : ""} />
            </Button>
          </CardFooter>
        </Card>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
