import { IconActivity, IconBook2, IconBolt, IconComponents, IconHome2, IconSettings, IconShieldCheck, IconStack2, IconUsers, IconWorld, type Icon } from "@tabler/icons-react";
import { demoAvatarUrl } from "@/utils/demo-avatar";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "NextRose", plan: "Enterprise", icon: IconComponents },
  { name: "Vertex Labs", plan: "Startup", icon: IconBolt },
  { name: "Northwind", plan: "Free", icon: IconWorld },
];

export const currentUser = {
  name: "Admin",
  email: "admin@nextrose.dev",
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

export const componentNavItems: ComponentNavItem[] = [

  { title: "Accordion", url: "/components/accordion", badge: "New" },
  { title: "Attachment", url: "/components/attachment", badge: "New" },
  { title: "Aspect Ratio", url: "/components/aspect-ratio", badge: "New" },
  { title: "Announcement", url: "/components/announcement" },
  { title: "Alerts", url: "/components/alert" },
  { title: "Autocomplete", url: "/components/autocomplete", badge: "New" },
  { title: "Avatar", url: "/components/avatar" },
  { title: "Bubble", url: "/components/bubble", badge: "New" },
  { title: "Badge", url: "/components/badge" },
  { title: "Chip", url: "/components/chip" },
  { title: "Breadcrumb", url: "/components/breadcrumb" },
  { title: "Buttons", url: "/components/button" },
  { title: "Button Group", url: "/components/button-group", badge: "New" },
  { title: "Cards", url: "/components/card" },
  { title: "Carousel", url: "/components/carousel" },
  { title: "Cascader", url: "/components/cascader", badge: "New" },
  { title: "Chart", url: "/components/chart", badge: "New" },
  { title: "Checkbox", url: "/components/checkbox" },
  { title: "Code Block", url: "/components/code-block", badge: "New" },
  { title: "Color Picker", url: "/components/color-picker" },
  { title: "Collapsible", url: "/components/collapsible" },
  { title: "Command", url: "/components/command" },
  { title: "Combobox", url: "/components/combobox" },
  { title: "Context Menu", url: "/components/context-menu" },
  { title: "Data Grid", url: "/components/data-grid", badge: "New" },
  { title: "Date Calendar", url: "/components/date-calendar", badge: "New" },
  { title: "Date Picker", url: "/components/date-picker", badge: "New" },
  { title: "Date Selector", url: "/components/date-selector", badge: "New" },
  { title: "Drawer", url: "/components/drawer" },
  { title: "Divider", url: "/components/divider" },
  { title: "Modals", url: "/components/dialog" },
  { title: "Alert Dialog", url: "/components/alert-dialog", badge: "New" },
  { title: "Dropdowns", url: "/components/dropdown" },
  { title: "Emoji Picker", url: "/components/emoji-picker", badge: "New" },
  { title: "Empty State", url: "/components/empty", badge: "New" },
  { title: "Event Calendar", url: "/components/event-calendar", badge: "New" },
  { title: "Field", url: "/components/field", badge: "New" },
  { title: "File Upload", url: "/components/file-upload" },
  { title: "File Type", url: "/components/file-type", badge: "New" },
  { title: "Filters", url: "/components/filters", badge: "New" },
  { title: "Frame", url: "/components/frame", badge: "New" },
  { title: "Gantt", url: "/components/gantt", badge: "New" },
  { title: "Hover Cards", url: "/components/hover-card", badge: "New" },
  { title: "Input", url: "/components/input" },
  { title: "Input Group", url: "/components/input-group", badge: "New" },
  { title: "Input OTP", url: "/components/input-otp" },
  { title: "Item", url: "/components/item", badge: "New" },
  { title: "Icon Stack", url: "/components/icon-stack", badge: "New" },
  { title: "Icon Tile", url: "/components/icon-tile", badge: "New" },
  { title: "Kbd", url: "/components/kbd", badge: "New" },
  { title: "Kanban", url: "/components/kanban", badge: "New" },
  { title: "Images", url: "/components/images" },
  { title: "Label", url: "/components/label", badge: "New" },
  { title: "Links", url: "/components/links" },
  { title: "List", url: "/components/list" },
  { title: "Marker", url: "/components/marker", badge: "New" },
  { title: "Menubar", url: "/components/menubar", badge: "New" },
  { title: "Message", url: "/components/message", badge: "New" },
  { title: "Message Scroller", url: "/components/message-scroller", badge: "New" },
  { title: "Navigation Menu", url: "/components/navigation-menu", badge: "New" },
  { title: "Native Select", url: "/components/native-select", badge: "New" },
  { title: "Meter", url: "/components/meter" },
  { title: "Notification", url: "/components/notification" },
  { title: "Number Field", url: "/components/number-field" },
  { title: "Pagination", url: "/components/pagination" },
  { title: "Phone Input", url: "/components/phone-input", badge: "New" },
  { title: "Popovers", url: "/components/popover" },
  { title: "Progressbar", url: "/components/progress" },
  { title: "Questionnaire", url: "/components/questionnaire", badge: "New" },
  { title: "Rating", url: "/components/rating", badge: "New" },
  { title: "Resizable", url: "/components/resizable", badge: "New" },
  { title: "Radio", url: "/components/radio" },
  { title: "Ribbons", url: "/components/ribbons" },
  { title: "Scroll Area", url: "/components/scroll-area" },
  { title: "Scrollspy", url: "/components/scrollspy", badge: "New" },
  { title: "Signature Pad", url: "/components/signature-pad", badge: "New" },
  { title: "Search Field", url: "/components/search-field" },
  { title: "Segmented Control", url: "/components/segmented-control" },
  { title: "Select", url: "/components/select" },
  { title: "Social Button", url: "/components/social-button" },
  { title: "Slider", url: "/components/slider" },
  { title: "Sortable", url: "/components/sortable", badge: "New" },
  { title: "Skeleton", url: "/components/skeleton" },
  { title: "Spinners", url: "/components/spinners" },
  { title: "Stepper", url: "/components/stepper", badge: "New" },
  { title: "Switch", url: "/components/switch" },
  { title: "Tabs", url: "/components/tab" },
  { title: "Table", url: "/components/table", badge: "New" },
  { title: "Tag Group", url: "/components/tag-group" },
  { title: "Time Field", url: "/components/time-field" },
  { title: "Time Picker", url: "/components/time-picker", badge: "New" },
  { title: "Timeline", url: "/components/timeline", badge: "New" },
  { title: "Trace", url: "/components/trace", badge: "New" },
  { title: "Tree", url: "/components/tree" },
  { title: "Toggle Group", url: "/components/toggle-group", badge: "New" },
  { title: "Toggle", url: "/components/toggle", badge: "New" },
  { title: "Textarea", url: "/components/textarea" },
  { title: "Toast", url: "/components/toast" },
  { title: "Tooltips", url: "/components/tooltip" },
  { title: "Videos", url: "/components/video" },
];

export const blockNavItems: ComponentNavItem[] = [
  { title: "app-shell-1", url: "/blocks/application/app-shell/app-shell-1" },
  { title: "app-shell-2", url: "/blocks/application/app-shell/app-shell-2" },
  { title: "app-shell-3", url: "/blocks/application/app-shell/app-shell-3" },
  { title: "app-shell-4", url: "/blocks/application/app-shell/app-shell-4" },
  { title: "app-shell-5", url: "/blocks/application/app-shell/app-shell-5" },
  { title: "app-shell-6", url: "/blocks/application/app-shell/app-shell-6" },
  { title: "app-shell-7", url: "/blocks/application/app-shell/app-shell-7" },
  { title: "app-shell-8", url: "/blocks/application/app-shell/app-shell-8" },
];

export const appNavItems = [...componentNavItems, ...blockNavItems];
