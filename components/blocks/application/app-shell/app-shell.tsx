import { AppSidebar } from "@/components/blocks/application/app-shell/app-sidebar";
import { AppHeader } from "@/components/blocks/application/app-shell/app-header";
import { ThemeCustomizerLoader } from "@/components/theme-customizer-loader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

export default function AppShell({
  children,
  preview = false,
  skip = false,
  fullBleed = false,
}: Readonly<{
  children: React.ReactNode;
  preview?: boolean;
  skip?: boolean;
  fullBleed?: boolean;
}>) {
  if (skip) return children;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider
        cookieName={preview ? "nextrose-app-shell-sidebar" : undefined}
        disableShortcut={preview}
        className={preview ? "relative isolate h-full min-h-0 transform-gpu overflow-hidden rounded-xl bg-background" : undefined}
      >
        <AppSidebar preview={preview} />
        <SidebarInset className="min-w-0">
          <AppHeader preview={preview} fullBleed={fullBleed} />
          <main className={`app-main min-w-0 flex-1 ${preview ? "flex min-h-0 flex-col p-4 md:p-6 xl:p-8" : fullBleed ? "flex min-h-0 flex-col overflow-hidden p-0" : "p-4 md:p-6 xl:p-8"}`}>{children}</main>
        </SidebarInset>
        {!preview && <ThemeCustomizerLoader />}
      </SidebarProvider>
    </TooltipProvider>
  );
}
