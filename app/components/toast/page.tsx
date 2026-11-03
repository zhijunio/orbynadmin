"use client";

import AppShell from "@/components/blocks/application/app-shell/app-shell";
import { toast } from "sonner";
import { Button } from "@/components/ui/buttons/button";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { PageHeader } from "@/components/custom/docs/page-header";

const positions = [
  { y: "top", x: "start", label: "Top left" },
  { y: "top", x: "center", label: "Top center" },
  { y: "top", x: "end", label: "Top right" },
  { y: "bottom", x: "start", label: "Bottom left" },
  { y: "bottom", x: "center", label: "Bottom center" },
  { y: "bottom", x: "end", label: "Bottom right" },
] as const;

function showPosition(y: "top" | "bottom", x: "start" | "center" | "end") {
  const horizontal: "left" | "right" | "center" = x === "center" ? "center" : x === "start" ? "left" : "right";
  toast.info("Changes saved", { position: `${y}-${horizontal}` });
}

export default function ToastPage() {
  function showUpdatedToast() {
    const id = toast.info("Exporting customers", {
      description: "Preparing 1,284 rows.",
      duration: Number.POSITIVE_INFINITY,
    });
    window.setTimeout(() => {
      toast.success("Export ready", {
        description: "customers.csv is ready to download.",
        id,
        duration: 5000,
      });
    }, 1200);
  }

  return (
    <AppShell>
      <div className="min-w-0 space-y-5"><PageHeader title="Toast" /><div className="grid min-w-0 grid-cols-1 gap-5 [&>*]:min-w-0">
        <ComponentPreview title="Success, Information, and Undo Toasts">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Save changes</Button>
            <Button variant="outline" onClick={() => toast("Project archived", { description: "Acme Dashboard moved to the archive.", action: { label: "Undo", onClick: () => toast.success("Project restored") } })}>Archive project</Button>
            <Button variant="outline" onClick={() => toast.info("Upload complete", { description: "Quarterly report.pdf is ready." })}>Upload file</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Update a toast">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={showUpdatedToast}>Export CSV</Button>
            <Button variant="outline" onClick={() => toast.dismiss()}>Dismiss all</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Toast Positions">
          <div className="flex flex-wrap gap-2">
            {positions.map(({ y, x, label }) => (
              <Button key={label} variant="outline" onClick={() => showPosition(y, x)}>{label}</Button>
            ))}
          </div>
        </ComponentPreview>

        <ComponentPreview title="Toast Duration">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Quick confirmation", { duration: 2000, className: "cn-toast-short" })}>Two seconds</Button>
            <Button variant="outline" onClick={() => toast("This stays until dismissed", { duration: Number.POSITIVE_INFINITY, className: "cn-toast-persistent" })}>Until dismissed</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Toast IDs">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Draft saved", { id: "toast-draft" })}>Reuse ID</Button>
            <Button variant="outline" onClick={() => toast.success("Draft updated", { id: "toast-draft" })}>Update ID</Button>
            <Button variant="outline" onClick={() => toast.dismiss("toast-draft")}>Dismiss ID</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Visible Toast Limit">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { toast.success("Changes saved"); toast("Project archived"); toast.info("Export started"); toast.error("Connection interrupted"); }}>Show four notifications</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Success and Error Feedback">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Announce status</Button>
            <Button variant="outline" onClick={() => toast.error("Could not save changes", { description: "Check your connection and try again." })}>Announce error</Button>
          </div>
        </ComponentPreview>
      </div></div>
    </AppShell>
  );
}
