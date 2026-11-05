"use client";

import { IconBuilding, IconCheck } from "@tabler/icons-react";
import type { CascaderNode } from "@/components/ui/cascader/cascader";

export const options: CascaderNode[] = [
  {
    value: "engineering",
    label: "Engineering",
    children: [
      {
        value: "platform",
        label: "Platform",
        children: [
          { value: "api", label: "API team" },
          { value: "infra", label: "Infrastructure" },
        ],
      },
      {
        value: "product",
        label: "Product",
        children: [
          { value: "web", label: "Web app" },
          { value: "mobile", label: "Mobile" },
        ],
      },
    ],
  },
  {
    value: "operations",
    label: "Operations",
    children: [
      { value: "support", label: "Customer support" },
      { value: "finance", label: "Finance" },
    ],
  },
  {
    value: "design",
    label: "Design",
    children: [
      { value: "brand", label: "Brand" },
      { value: "research", label: "Research" },
    ],
  },
];

export const roles: CascaderNode[] = [
  {
    value: "workspace",
    label: "Workspace",
    children: [
      {
        value: "admin",
        label: "Administrator",
        description: "Manage members and settings",
        badge: "Full access",
        tone: "success",
      },
      { value: "editor", label: "Editor", description: "Create and update content", badge: "Standard" },
      {
        value: "viewer",
        label: "Viewer",
        description: "Read-only access",
        disabled: true,
        badge: "Restricted",
      },
    ],
  },
];

export const flatOptions: CascaderNode[] = [
  { value: "north", label: "North America", parentId: null },
  { value: "us", label: "United States", parentId: "north" },
  { value: "ca", label: "Canada", parentId: "north" },
  { value: "west", label: "West", parentId: "us" },
  { value: "east", label: "East", parentId: "us" },
  { value: "ny", label: "New York", parentId: "east" },
  { value: "sf", label: "San Francisco", parentId: "west" },
];

export const statusOptions: CascaderNode[] = [
  { value: "active", label: "Production", badge: "Active", tone: "success" },
  { value: "review", label: "In review", badge: "Review", tone: "warning" },
  { value: "paused", label: "Paused", badge: "Blocked", tone: "destructive" },
];

export const healthOptions: CascaderNode[] = [
  {
    value: "healthy",
    label: "Healthy services",
    icon: <IconCheck className="size-4 text-primary" />,
    children: [
      { value: "api", label: "Public API", badge: "99.99%", tone: "success" },
      { value: "worker", label: "Workers", badge: "99.95%", tone: "success" },
    ],
  },
  {
    value: "watch",
    label: "Needs attention",
    icon: <IconBuilding className="size-4 text-muted-foreground" />,
    children: [{ value: "queue", label: "Job queue", badge: "Delayed", tone: "warning" }],
  },
];

