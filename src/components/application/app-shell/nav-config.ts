import {
  IconLayoutDashboard,
  IconChartBar,
  IconShoppingCart,
  IconUsers,
  IconBox,
  IconMessageCircle,
  IconLayoutKanban,
  IconCalendarEvent,
  IconChecklist,
  IconMail,
  IconUserCircle,
  IconSettings,
  IconTag,
  IconLockAccess,
  IconHelpCircle,
  IconSparkles,
  IconFolders,
  IconUsersGroup,
  IconActivity,
  IconPuzzle,
  IconBell,
  IconNotes,
  IconFolder,
  IconTable,
  IconChartPie,
  IconForms,
  IconComponents,
  IconMoodEmpty,
  IconRocket,
  IconWorld,
  IconAlertTriangle,
  IconTruck,
  IconShieldLock,
  IconAddressBook,
  IconLifebuoy,
  IconArticle,
  IconCode,
  IconSearch,
  IconStethoscope,
  IconSpeakerphone,
  IconWallet,
  type Icon,
} from "@tabler/icons-react";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "OrbynAdmin", plan: "Enterprise", icon: IconSparkles },
  { name: "Vertex Labs", plan: "Startup", icon: IconRocket },
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
    label: "Dashboards",
    items: [
      { title: "Overview", url: "/dashboard", icon: IconLayoutDashboard },
      { title: "E-Commerce", url: "/dashboard/ecommerce", icon: IconShoppingCart },
      { title: "Health", url: "/dashboard/health", icon: IconStethoscope },
      { title: "Marketing", url: "/dashboard/marketing", icon: IconSpeakerphone },
      { title: "Finance", url: "/dashboard/finance", icon: IconWallet },
    ],
  },
  {
    label: "AI",
    items: [
      { title: "AI Assistant", url: "/apps/ai-chat", icon: IconSparkles, badge: "New" },
    ],
  },
  {
    label: "E-Commerce",
    items: [
      {
        title: "Catalog",
        icon: IconBox,
        items: [
          { title: "All Products", url: "/commerce/products" },
          { title: "Storefront", url: "/commerce/storefront" },
          { title: "Add Product", url: "/commerce/products/new" },
          { title: "Categories", url: "/commerce/categories" },
          { title: "Inventory", url: "/commerce/inventory" },
          { title: "Discounts", url: "/commerce/discounts" },
        ],
      },
      {
        title: "Sales",
        icon: IconShoppingCart,
        items: [
          { title: "All Orders", url: "/commerce/orders" },
          { title: "Create Order", url: "/commerce/orders/new" },
          { title: "All Invoices", url: "/commerce/invoices" },
          { title: "New Invoice", url: "/commerce/invoices/new" },
        ],
      },
      {
        title: "Customer Experience",
        icon: IconUsers,
        items: [
          { title: "All Customers", url: "/commerce/customers" },
          { title: "Add Customer", url: "/commerce/customers/new" },
          { title: "Reviews", url: "/commerce/reviews" },
        ],
      },
      {
        title: "Fulfillment",
        icon: IconTruck,
        items: [
          { title: "Shipping", url: "/commerce/shipping" },
          { title: "Cart", url: "/commerce/cart" },
          { title: "Checkout", url: "/commerce/checkout" },
        ],
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Projects", url: "/workspace/projects", icon: IconFolders, badge: "6" },
      { title: "Team", url: "/workspace/team", icon: IconUsersGroup },
      { title: "Roles & Permissions", url: "/workspace/roles", icon: IconShieldLock },
      { title: "Contacts", url: "/workspace/contacts", icon: IconAddressBook },
      { title: "Board", url: "/apps/kanban", icon: IconLayoutKanban },
      { title: "Tasks", url: "/apps/tasks", icon: IconChecklist },
      { title: "Calendar", url: "/blocks/calendar", icon: IconCalendarEvent },
      { title: "Activity", url: "/workspace/activity", icon: IconActivity },
    ],
  },
  {
    label: "Apps",
    items: [
      { title: "Chat", url: "/apps/chat", icon: IconMessageCircle },
      { title: "Mail", url: "/apps/mail", icon: IconMail, badge: "5" },
      { title: "Notes", url: "/apps/notes", icon: IconNotes },
      { title: "File Manager", url: "/apps/file-manager", icon: IconFolder },
      {
        title: "Blog",
        icon: IconArticle,
        items: [
          { title: "All Posts", url: "/apps/blog" },
          { title: "New Post", url: "/apps/blog/new" },
        ],
      },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/account/profile", icon: IconUserCircle },
      {
        title: "Settings",
        icon: IconSettings,
        items: [
          { title: "Account Settings", url: "/account/settings" },
          { title: "System Settings", url: "/account/system-settings", badge: "New" },
        ],
      },
      { title: "Notifications", url: "/account/notifications", icon: IconBell },
      { title: "Onboarding", url: "/onboarding", icon: IconRocket },
      { title: "Developers", url: "/account/developers", icon: IconCode },
      { title: "Integrations", url: "/account/integrations", icon: IconPuzzle },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        title: "Plans",
        icon: IconTag,
        items: [
          { title: "Pricing", url: "/account/billing/pricing" },
          { title: "Pricing Tables", url: "/blocks/pricing-tables" },
        ],
      },
      { title: "Search Results", url: "/workspace/search", icon: IconSearch },
      { title: "Support", url: "/account/support", icon: IconLifebuoy },
      { title: "Help Center", url: "/account/help", icon: IconHelpCircle },
      { title: "FAQ", url: "/blocks/faq", icon: IconHelpCircle, badge: "New" },
      { title: "Landing Page", url: "/landing", icon: IconWorld },
      {
        title: "Status Pages",
        icon: IconAlertTriangle,
        items: [
          { title: "404 · Not Found", url: "/errors/404" },
          { title: "403 · Forbidden", url: "/errors/403" },
          { title: "500 · Server Error", url: "/errors/500" },
          { title: "503 · Unavailable", url: "/errors/503" },
          { title: "Maintenance", url: "/status-pages/maintenance" },
          { title: "Coming Soon", url: "/status-pages/coming-soon" },
        ],
      },
    ],
  },
  {
    label: "Blocks",
    items: [
      { title: "Stat Cards", url: "/blocks/stat-cards", icon: IconChartBar, badge: "New" },
      {
        title: "Auth",
        url: "/blocks/auth",
        icon: IconLockAccess,
        badge: "New",
        items: [
          {
            title: "Account Flows",
            items: [
              { title: "Sign In", url: "/blocks/auth/sign-in", badge: "New" },
              { title: "Sign Up", url: "/blocks/auth/sign-up", badge: "New" },
              { title: "Invitation Sign Up", url: "/blocks/auth/invited-sign-up", badge: "New" },
              { title: "Accept Invitation", url: "/blocks/auth/accept-invitation", badge: "New" },
              { title: "Verify OTP", url: "/blocks/auth/verify", badge: "New" },
              { title: "Forgot Password", url: "/blocks/auth/forgot-password", badge: "New" },
              { title: "Reset Password", url: "/blocks/auth/reset-password", badge: "New" },
              { title: "Lock Screen", url: "/blocks/auth/lock-screen", badge: "New" },
            ],
          },
          {
            title: "Multi-factor Authentication",
            items: [
              { title: "Email Code", url: "/blocks/auth/mfa/email", badge: "New" },
              { title: "SMS Code", url: "/blocks/auth/mfa/sms", badge: "New" },
              { title: "Authenticator", url: "/blocks/auth/mfa/totp", badge: "New" },
              { title: "One-time Recovery Code", url: "/blocks/auth/mfa/recovery-code", badge: "New" },
              { title: "Recovery Phrase", url: "/blocks/auth/mfa/recovery-phrase", badge: "New" },
            ],
          },
        ],
      },
      { title: "Data Table", url: "/blocks/data-table", icon: IconTable, items: [
        { title: "Basic", url: "/blocks/data-table/basic", badge: "New" },
        { title: "Data", url: "/blocks/data-table/data", badge: "New" },
        { title: "API CRUD", url: "/blocks/data-table/api-crud", badge: "New" },
        { title: "Data Grid", url: "/blocks/data-grid", badge: "New" },
      ] },
      {
        title: "Chart Cards",
        icon: IconChartBar,
        items: [
          { title: "Bar List", url: "/blocks/chart-cards/bar-list", badge: "New" },
          { title: "Earnings", url: "/blocks/chart-cards/earnings", badge: "New" },
          { title: "Orders", url: "/blocks/chart-cards/orders", badge: "New" },
          { title: "Steps", url: "/blocks/chart-cards/steps", badge: "New" },
          { title: "Contributions", url: "/blocks/chart-cards/contributions", badge: "New" },
          { title: "Line", url: "/blocks/chart-cards/line", badge: "New" },
          { title: "Area", url: "/blocks/chart-cards/area", badge: "New" },
          { title: "Combo", url: "/blocks/chart-cards/combo", badge: "New" },
          { title: "Radial", url: "/blocks/chart-cards/radial", badge: "New" },
          { title: "Activity Rings", url: "/blocks/chart-cards/activity-rings", badge: "New" },
          { title: "Sleep Score", url: "/blocks/chart-cards/sleep-score", badge: "New" },
          { title: "Most Active Days", url: "/blocks/chart-cards/most-active-days", badge: "New" },
          { title: "Radar", url: "/blocks/chart-cards/radar", badge: "New" },
          { title: "Funnel", url: "/blocks/chart-cards/funnel", badge: "New" },
          { title: "Stage Bars", url: "/blocks/chart-cards/stage-bars", badge: "New" },
          { title: "Heatmap", url: "/blocks/chart-cards/heatmap", badge: "New" },
          { title: "Scatter", url: "/blocks/chart-cards/scatter", badge: "New" },
          { title: "Sankey", url: "/blocks/chart-cards/sankey", badge: "New" },
          { title: "Revenue", url: "/blocks/chart-cards/revenue", badge: "New" },
        ],
      },
      {
        title: "Forms",
        icon: IconForms,
        items: [
          { title: "Layout", url: "/blocks/forms/layout", badge: "New" },
          { title: "Elements", url: "/blocks/forms/element", badge: "New" },
        ],
      },
      {
        title: "UI States",
        icon: IconMoodEmpty,
        items: [
          { title: "Empty States", url: "/blocks/empty-states" },
          { title: "Loading States", url: "/blocks/loading-state", badge: "New" },
        ],
      },
      {
        title: "Layouts",
        icon: IconComponents,
        badge: "New",
        items: [
          { title: "Layout One", url: "/blocks/layouts/one", badge: "New" },
          { title: "Layout Two", url: "/blocks/layouts/two", badge: "New" },
          { title: "Layout Three", url: "/blocks/layouts/three", badge: "New" },
          { title: "Layout Four", url: "/blocks/layouts/four", badge: "New" },
          { title: "Layout Five", url: "/blocks/layouts/five", badge: "New" },
          { title: "Layout Six", url: "/blocks/layouts/six", badge: "New" },
        ],
      },
    ],
  },
  {
    label: "Components",
    items: [
      {
        title: "Charts",
        icon: IconChartPie,
        items: [
          { title: "Bar", url: "/elements/charts/bar", badge: "New" },
          { title: "Line Charts", url: "/elements/charts/line", badge: "New" },
          { title: "Pie", url: "/elements/charts/pie", badge: "New" },
          { title: "Radar Charts", url: "/elements/charts/radar", badge: "New" },
          { title: "Radial Charts", url: "/elements/charts/radial", badge: "New" },
        ],
      },
      { title: "Maps", url: "/elements/maps", icon: IconWorld, items: [{ title: "Vector Map", url: "/elements/maps/vector", badge: "New" }] },
      {
        title: "UI Elements",
        icon: IconComponents,
        items: [
          { title: "Accordion", url: "/elements/ui/accordion" },
          { title: "Announcement", url: "/elements/ui/announcement", badge: "New" },
          { title: "Alerts", url: "/elements/ui/alert" },
          { title: "Avatar", url: "/elements/ui/avatar" },
          { title: "Badge", url: "/elements/ui/badge" },
          { title: "Chip", url: "/elements/ui/chip", badge: "New" },
          { title: "Breadcrumb", url: "/elements/ui/breadcrumb" },
          { title: "Buttons", url: "/elements/ui/button" },
          { title: "Cards", url: "/elements/ui/card" },
          { title: "Carousel", url: "/elements/ui/carousel" },
          { title: "Checkbox", url: "/elements/ui/checkbox", badge: "New" },
          { title: "Color Picker", url: "/elements/ui/color-picker", badge: "New" },
          { title: "Collapsible", url: "/elements/ui/collapsible" },
          { title: "Command", url: "/elements/ui/command" },
          { title: "Combobox", url: "/elements/ui/combobox", badge: "New" },
          { title: "Context Menu", url: "/elements/ui/context-menu", badge: "New" },
          { title: "Date Calendar", url: "/elements/ui/date-calendar", badge: "New" },
          { title: "Date Picker", url: "/elements/ui/date-picker" },
          { title: "Drawer", url: "/elements/ui/drawer", badge: "New" },
          { title: "Divider", url: "/elements/ui/divider", badge: "New" },
          { title: "Modals", url: "/elements/ui/dialog" },
          { title: "Dropdowns", url: "/elements/ui/dropdown" },
          { title: "File Upload", url: "/elements/ui/file-upload" },
          { title: "Input", url: "/elements/ui/input" },
          { title: "Input OTP", url: "/elements/ui/input-otp", badge: "New" },
          { title: "Images", url: "/elements/ui/images" },
          { title: "Links", url: "/elements/ui/links" },
          { title: "List", url: "/elements/ui/list" },
          { title: "Meter", url: "/elements/ui/meter", badge: "New" },
          { title: "Notification", url: "/elements/ui/notification" },
          { title: "Number Field", url: "/elements/ui/number-field", badge: "New" },
          { title: "Pagination", url: "/elements/ui/pagination" },
          { title: "Popovers", url: "/elements/ui/popover" },
          { title: "Progressbar", url: "/elements/ui/progress" },
          { title: "Radio", url: "/elements/ui/radio", badge: "New" },
          { title: "Ribbons", url: "/elements/ui/ribbons" },
          { title: "Scroll Area", url: "/elements/ui/scroll-area" },
          { title: "Signature Pad", url: "/elements/ui/signature-pad", badge: "New" },
          { title: "Search Field", url: "/elements/ui/search-field", badge: "New" },
          { title: "Segmented Control", url: "/elements/ui/segmented-control", badge: "New" },
          { title: "Select", url: "/elements/ui/select", badge: "New" },
          { title: "Social Button", url: "/elements/ui/social-button", badge: "New" },
          { title: "Slider", url: "/elements/ui/slider", badge: "New" },
          { title: "Skeleton", url: "/elements/ui/skeleton" },
          { title: "Spinners", url: "/elements/ui/spinners" },
          { title: "Switch", url: "/elements/ui/switch", badge: "New" },
          { title: "Tabs", url: "/elements/ui/tab" },
          { title: "Tag Group", url: "/elements/ui/tag-group", badge: "New" },
          { title: "Time Field", url: "/elements/ui/time-field", badge: "New" },
          { title: "Tree View", url: "/elements/ui/tree-view", badge: "New" },
          { title: "Textarea", url: "/elements/ui/textarea", badge: "New" },
          { title: "Toast", url: "/elements/ui/toast", badge: "New" },
          { title: "Tooltips", url: "/elements/ui/tooltip" },
          { title: "Videos", url: "/elements/ui/video" },
        ],
      },
    ],
  },
];
