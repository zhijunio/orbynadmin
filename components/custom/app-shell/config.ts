import { IconActivity, IconBook2, IconBolt, IconComponents, IconHome2, IconSettings, IconShieldCheck, IconStack2, IconUsers, IconWorld, type Icon } from "@tabler/icons-react";
import { demoAvatarUrl } from "@/utils/demo-avatar";

type WorkspaceDetails = {
  name: string;
  plan: string;
};

export type Workspace = WorkspaceDetails & (
  | { kind: "brand" }
  | { kind: "workspace"; icon: Icon }
);

export const workspaces: Workspace[] = [
  { name: "NextRose", plan: "Enterprise", kind: "brand" },
  { name: "Vertex Labs", plan: "Startup", kind: "workspace", icon: IconBolt },
  { name: "Northwind", plan: "Free", kind: "workspace", icon: IconWorld },
];

export const currentUser = {
  name: "Admin",
  email: "admin@nextrose.io",
  avatar: demoAvatarUrl("Admin"),
};


export type AppShellMenuItem = {
  title: string;
  icon?: Icon;
  children?: string[];
  badge?: string;
  color?: string;
  tag?: string;
};

export type AppShellMenuSection = {
  title: string;
  collapsible?: boolean;
  items: AppShellMenuItem[];
};

export const appShellMenuSections: AppShellMenuSection[] = [
  {
    title: "Platform",
    items: [
      { title: "Overview", icon: IconHome2 },
      { title: "Pipelines", icon: IconBolt, children: ["Build Runs", "Deployments", "Release Gates"] },
      { title: "Infrastructure", icon: IconStack2, children: ["Compute", "Storage"] },
      { title: "Observability", icon: IconActivity, badge: "14" },
      { title: "Security", icon: IconShieldCheck },
    ],
  },
  {
    title: "Resources",
    collapsible: true,
    items: [
      { title: "API Gateway", color: "bg-emerald-500", tag: "Prod" },
      { title: "ML Pipeline", color: "bg-violet-500" },
      { title: "Database", color: "bg-blue-500", tag: "US-East" },
      { title: "CDN", color: "bg-amber-500" },
      { title: "Authentication", color: "bg-rose-500" },
    ],
  },
];

export const appShellFooterItems: AppShellMenuItem[] = [
  { title: "Settings", icon: IconSettings },
  { title: "Invite Team", icon: IconUsers },
  { title: "Documentation", icon: IconBook2 },
];

export const appShellPrimarySections = [
  { title: "Platform", icon: IconComponents, items: appShellMenuSections[0].items },
  { title: "Resources", icon: IconStack2, items: appShellMenuSections[1].items },
  { title: "Manage", icon: IconSettings, items: appShellFooterItems },
] as const;

export type ComponentNavItem = {
  title: string;
  url: string;
  badge?: string;
  icon?: Icon;
};

const componentNavDataItems: ComponentNavItem[] = [
  { title: "Data Grid", url: "/components/data-grid" },
  { title: "Event Calendar", url: "/components/event-calendar" },
  { title: "Filter", url: "/components/filter" },
  { title: "Gantt", url: "/components/gantt" },
  { title: "Kanban", url: "/components/kanban" },
  { title: "Pagination", url: "/components/pagination" },
  { title: "Sortable", url: "/components/sortable" },
  { title: "Table", url: "/components/table" },
  { title: "Trace", url: "/components/trace" },
  { title: "Tree", url: "/components/tree" },
];

const componentNavVisualizationItems: ComponentNavItem[] = [
  { title: "Chart", url: "/components/chart" },
  { title: "Meter", url: "/components/meter" },
  { title: "Progress", url: "/components/progress" },
  { title: "Timeline", url: "/components/timeline" },
];

const componentNavUiItems: ComponentNavItem[] = [
  { title: "Accordion", url: "/components/accordion" },
  { title: "Alert", url: "/components/alert" },
  { title: "Alert Dialog", url: "/components/alert-dialog" },
  { title: "Announcement", url: "/components/announcement" },
  { title: "Aspect Ratio", url: "/components/aspect-ratio" },
  { title: "Attachment", url: "/components/attachment" },
  { title: "Autocomplete", url: "/components/autocomplete" },
  { title: "Avatar", url: "/components/avatar" },
  { title: "Badge", url: "/components/badge" },
  { title: "Breadcrumb", url: "/components/breadcrumb" },
  { title: "Bubble", url: "/components/bubble" },
  { title: "Button", url: "/components/button" },
  { title: "Button Group", url: "/components/button-group" },
  { title: "Card", url: "/components/card" },
  { title: "Carousel", url: "/components/carousel" },
  { title: "Cascader", url: "/components/cascader" },
  { title: "Checkbox", url: "/components/checkbox" },
  { title: "Code Block", url: "/components/code-block" },
  { title: "Collapsible", url: "/components/collapsible" },
  { title: "Color Picker", url: "/components/color-picker" },
  { title: "Combobox", url: "/components/combobox" },
  { title: "Command", url: "/components/command" },
  { title: "Context Menu", url: "/components/context-menu" },
  { title: "Date Calendar", url: "/components/date-calendar" },
  { title: "Date Picker", url: "/components/date-picker" },
  { title: "Date Selector", url: "/components/date-selector" },
  { title: "Dialog", url: "/components/dialog" },
  { title: "Divider", url: "/components/divider" },
  { title: "Drawer", url: "/components/drawer" },
  { title: "Dropdown Menu", url: "/components/dropdown" },
  { title: "Emoji Picker", url: "/components/emoji-picker" },
  { title: "Empty State", url: "/components/empty" },
  { title: "Field", url: "/components/field" },
  { title: "File Type", url: "/components/file-type" },
  { title: "File Upload", url: "/components/file-upload" },
  { title: "Frame", url: "/components/frame" },
  { title: "Hover Card", url: "/components/hover-card" },
  { title: "Icon Stack", url: "/components/icon-stack" },
  { title: "Icon Tile", url: "/components/icon-tile" },
  { title: "Image", url: "/components/image" },
  { title: "Input", url: "/components/input" },
  { title: "Input Group", url: "/components/input-group" },
  { title: "Input OTP", url: "/components/input-otp" },
  { title: "Item", url: "/components/item" },
  { title: "Kbd", url: "/components/kbd" },
  { title: "Label", url: "/components/label" },
  { title: "Link", url: "/components/link" },
  { title: "List", url: "/components/list" },
  { title: "Marker", url: "/components/marker" },
  { title: "Menubar", url: "/components/menubar" },
  { title: "Message", url: "/components/message" },
  { title: "Message Scroller", url: "/components/message-scroller" },
  { title: "Native Select", url: "/components/native-select" },
  { title: "Navigation Menu", url: "/components/navigation-menu" },
  { title: "Notification", url: "/components/notification" },
  { title: "Number Field", url: "/components/number-field" },
  { title: "Phone Input", url: "/components/phone-input" },
  { title: "Popover", url: "/components/popover" },
  { title: "Questionnaire", url: "/components/questionnaire" },
  { title: "Radio", url: "/components/radio" },
  { title: "Rating", url: "/components/rating" },
  { title: "Resizable", url: "/components/resizable" },
  { title: "Ribbon", url: "/components/ribbon" },
  { title: "Scroll Area", url: "/components/scroll-area" },
  { title: "Scrollspy", url: "/components/scrollspy" },
  { title: "Search Field", url: "/components/search-field" },
  { title: "Segmented Control", url: "/components/segmented-control" },
  { title: "Select", url: "/components/select" },
  { title: "Signature Pad", url: "/components/signature-pad" },
  { title: "Skeleton", url: "/components/skeleton" },
  { title: "Slider", url: "/components/slider" },
  { title: "Social Button", url: "/components/social-button" },
  { title: "Spinner", url: "/components/spinner" },
  { title: "Stepper", url: "/components/stepper" },
  { title: "Switch", url: "/components/switch" },
  { title: "Tab", url: "/components/tab" },
  { title: "Tag", url: "/components/tag" },
  { title: "Tag Group", url: "/components/tag-group" },
  { title: "Textarea", url: "/components/textarea" },
  { title: "Time Field", url: "/components/time-field" },
  { title: "Time Picker", url: "/components/time-picker" },
  { title: "Toast", url: "/components/toast" },
  { title: "Toggle", url: "/components/toggle" },
  { title: "Toggle Group", url: "/components/toggle-group" },
  { title: "Tooltip", url: "/components/tooltip" },
  { title: "Video", url: "/components/video" },
];

export type ComponentNavSection = {
  title: "UI" | "Data" | "Visualization";
  items: ComponentNavItem[];
};

export const componentNavSections: ComponentNavSection[] = [
  { title: "UI", items: componentNavUiItems },
  { title: "Data", items: componentNavDataItems },
  { title: "Visualization", items: componentNavVisualizationItems },
];

export const componentNavItems: ComponentNavItem[] = componentNavSections.flatMap((section) => section.items).sort((left, right) => left.title.localeCompare(right.title, "en"));

export const aiAgentNavigationLinks = [
  { title: "AI Chat", category: "ai-chat", href: "/blocks/ai-agents/ai-chat" },
  { title: "Agent Activity", category: "agent-activity", href: "/blocks/ai-agents/agent-activity" },
  { title: "AI Usage", category: "ai-usage", href: "/blocks/ai-agents/ai-usage" },
].sort((left, right) => left.title.localeCompare(right.title, "en"));

export const solutionsNavigationLinks = [
  { title: "Users", href: "/blocks/solutions/users" },
] as const;

export const appShellExamples = [
  { number: 7, title: "Mail Inbox", url: "/blocks/application/app-shell/app-shell-7" },
  { number: 8, title: "Calendar Contacts Hub", url: "/blocks/application/app-shell/app-shell-8" },
  { number: 9, title: "Team Calendar Panel", url: "/blocks/application/app-shell/app-shell-9" },
  { number: 10, title: "Environment Switcher", url: "/blocks/application/app-shell/app-shell-10" },
  { number: 11, title: "Inventory Admin", url: "/blocks/application/app-shell/app-shell-11" },
  { number: 12, title: "Team Presence Workspace", url: "/blocks/application/app-shell/app-shell-12" },
  { number: 13, title: "AI Agents Console", url: "/blocks/application/app-shell/app-shell-13" },
  { number: 14, title: "Operations Workbench", url: "/blocks/application/app-shell/app-shell-14" },
  { number: 15, title: "Apps Grid Header", url: "/blocks/application/app-shell/app-shell-15" },
  { number: 16, title: "Community Feed App", url: "/blocks/application/app-shell/app-shell-16" },
  { number: 17, title: "View Toolbar Workspace", url: "/blocks/application/app-shell/app-shell-17" },
  { number: 18, title: "Pinnable Favorites Nav", url: "/blocks/application/app-shell/app-shell-18" },
  { number: 19, title: "Model Picker Chat", url: "/blocks/application/app-shell/app-shell-19" },
  { number: 20, title: "To-Do AI Assistant", url: "/blocks/application/app-shell/app-shell-20" },
  { number: 21, title: "Scheduling Planner", url: "/blocks/application/app-shell/app-shell-21" },
  { number: 22, title: "Webmail Client", url: "/blocks/application/app-shell/app-shell-22" },
  { number: 23, title: "Resizable AI Chat", url: "/blocks/application/app-shell/app-shell-23" },
  { number: 24, title: "Fleet Operator Console", url: "/blocks/application/app-shell/app-shell-24" },
  { number: 25, title: "Team Project Switcher", url: "/blocks/application/app-shell/app-shell-25" },
  { number: 26, title: "Ops Presence Console", url: "/blocks/application/app-shell/app-shell-26" },
  { number: 27, title: "Mission Control", url: "/blocks/application/app-shell/app-shell-27" },
  { number: 28, title: "Security Scope Console", url: "/blocks/application/app-shell/app-shell-28" },
  { number: 29, title: "Route Search Sidebar", url: "/blocks/application/app-shell/app-shell-29" },
  { number: 30, title: "Section Tile Rail", url: "/blocks/application/app-shell/app-shell-30" },
  { number: 31, title: "Folder Tab Workspace", url: "/blocks/application/app-shell/app-shell-31" },
  { number: 32, title: "Endpoint Protection", url: "/blocks/application/app-shell/app-shell-32" },
  { number: 33, title: "Fleet Center", url: "/blocks/application/app-shell/app-shell-33" },
  { number: 34, title: "Invoice Matching", url: "/blocks/application/app-shell/app-shell-34" },
  { number: 35, title: "Whiteboard Workspace", url: "/blocks/application/app-shell/app-shell-35" },
  { number: 36, title: "Observability Console", url: "/blocks/application/app-shell/app-shell-36" },
];

export const savedAppShellExamples = [
  { number: 1, title: "Icon Rail", url: "/blocks/application/app-shell/app-shell-1" },
  { number: 2, title: "Floating Sidebar", url: "/blocks/application/app-shell/app-shell-2" },
  { number: 3, title: "Project Tracker", url: "/blocks/application/app-shell/app-shell-3" },
  { number: 4, title: "Dual Sidebar Mail", url: "/blocks/application/app-shell/app-shell-4" },
  { number: 5, title: "Top Navigation", url: "/blocks/application/app-shell/app-shell-5" },
  { number: 6, title: "Top Navigation with Dropdown", url: "/blocks/application/app-shell/app-shell-6" },
];

export const blockNavItems: ComponentNavItem[] = [
  ...savedAppShellExamples,
  ...appShellExamples.map(({ title, url }) => ({ title, url })),
  { title: "Schedule", url: "/blocks/application/schedule" },
  { title: "Drawer", url: "/blocks/application/drawer" },
  { title: "Whiteboard", url: "/blocks/application/whiteboard" },
  { title: "Settings", url: "/blocks/application/settings" },
  { title: "Flow", url: "/blocks/application/flow" },
  { title: "Profile", url: "/blocks/application/profile" },
  { title: "Rich Text Editor", url: "/blocks/application/rich-text-editor" },
  { title: "Wizard", url: "/blocks/application/wizard" },
  { title: "Onboarding", url: "/blocks/application/onboarding" },
].sort((left, right) => left.title.localeCompare(right.title, "en"));

export const appNavItems = [...componentNavItems, ...blockNavItems];
