import { IconChartPie, IconComponents, IconWorld, type Icon } from "@tabler/icons-react";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "OrbynAdmin", plan: "Enterprise", icon: IconComponents },
  { name: "Vertex Labs", plan: "Startup", icon: IconComponents },
  { name: "Northwind", plan: "Free", icon: IconWorld },
];

export type NavChild = { title: string; url?: string; badge?: string; items?: NavChild[] };

export type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  badge?: string;
  items?: NavChild[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Components",
    items: [
      { title: "All Components", url: "/components", icon: IconComponents },
      {
        title: "Charts",
        icon: IconChartPie,
        items: [
          { title: "Bar", url: "/components/charts/bar" },
          { title: "Line Charts", url: "/components/charts/line" },
          { title: "Pie", url: "/components/charts/pie" },
          { title: "Radar Charts", url: "/components/charts/radar" },
          { title: "Radial Charts", url: "/components/charts/radial" },
        ],
      },
      { title: "Maps", url: "/components/maps", icon: IconWorld, items: [{ title: "Vector Map", url: "/components/maps/vector" }] },
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
      { title: "Tree View", url: "/components/tree-view" },
      { title: "Textarea", url: "/components/textarea" },
      { title: "Toast", url: "/components/toast" },
      { title: "Tooltips", url: "/components/tooltip" },
      { title: "Videos", url: "/components/video" },
    ],
  },
];
