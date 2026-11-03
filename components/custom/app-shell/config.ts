import { IconComponents, IconWorld, type Icon } from "@tabler/icons-react";
import { demoAvatarUrl } from "@/utils/demo-avatar";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "NextRose", plan: "Enterprise", icon: IconComponents },
  { name: "Vertex Labs", plan: "Startup", icon: IconComponents },
  { name: "Northwind", plan: "Free", icon: IconWorld },
];

export const currentUser = {
  name: "Alex Morgan",
  email: "alex.morgan@nextrose.dev",
  avatar: demoAvatarUrl("Alex Morgan"),
};

export type ComponentNavItem = {
  title: string;
  url: string;
  badge?: string;
};

export const componentNavItems: ComponentNavItem[] = [
  { title: "Accordion", url: "/components/accordion", badge: "New" },
  { title: "Attachment", url: "/components/attachment", badge: "New" },
  { title: "Aspect Ratio", url: "/components/aspect-ratio", badge: "New" },
  { title: "Announcement", url: "/components/announcement" },
  { title: "Alerts", url: "/components/alert" },
  { title: "Avatar", url: "/components/avatar" },
  { title: "Badge", url: "/components/badge" },
  { title: "Chip", url: "/components/chip" },
  { title: "Breadcrumb", url: "/components/breadcrumb" },
  { title: "Buttons", url: "/components/button" },
  { title: "Cards", url: "/components/card" },
  { title: "Carousel", url: "/components/carousel" },
  { title: "Checkbox", url: "/components/checkbox" },
  { title: "Color Picker", url: "/components/color-picker" },
  { title: "Collapsible", url: "/components/collapsible" },
  { title: "Command", url: "/components/command" },
  { title: "Combobox", url: "/components/combobox" },
  { title: "Context Menu", url: "/components/context-menu" },
  { title: "Date Calendar", url: "/components/date-calendar" },
  { title: "Date Picker", url: "/components/date-picker" },
  { title: "Drawer", url: "/components/drawer" },
  { title: "Divider", url: "/components/divider" },
  { title: "Modals", url: "/components/dialog" },
  { title: "Dropdowns", url: "/components/dropdown" },
  { title: "File Upload", url: "/components/file-upload" },
  { title: "Frame", url: "/components/frame", badge: "New" },
  { title: "Input", url: "/components/input" },
  { title: "Input OTP", url: "/components/input-otp" },
  { title: "Icon Stack", url: "/components/icon-stack", badge: "New" },
  { title: "Icon Tile", url: "/components/icon-tile", badge: "New" },
  { title: "Keyboard Shortcuts", url: "/components/kbd", badge: "New" },
  { title: "Images", url: "/components/images" },
  { title: "Links", url: "/components/links" },
  { title: "List", url: "/components/list" },
  { title: "Marker", url: "/components/marker", badge: "New" },
  { title: "Meter", url: "/components/meter" },
  { title: "Notification", url: "/components/notification" },
  { title: "Number Field", url: "/components/number-field" },
  { title: "Pagination", url: "/components/pagination" },
  { title: "Popovers", url: "/components/popover" },
  { title: "Progressbar", url: "/components/progress" },
  { title: "Rating", url: "/components/rating", badge: "New" },
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
  { title: "Skeleton", url: "/components/skeleton" },
  { title: "Spinners", url: "/components/spinners" },
  { title: "Switch", url: "/components/switch" },
  { title: "Tabs", url: "/components/tab" },
  { title: "Tag Group", url: "/components/tag-group" },
  { title: "Time Field", url: "/components/time-field" },
  { title: "Tree", url: "/components/tree" },
  { title: "Textarea", url: "/components/textarea" },
  { title: "Toast", url: "/components/toast" },
  { title: "Tooltips", url: "/components/tooltip" },
  { title: "Videos", url: "/components/video" },
];
