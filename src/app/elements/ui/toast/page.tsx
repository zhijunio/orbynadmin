"use client";

import ConsoleLayout from "@/components/application/app-shell/console-layout";
import { toast } from "sonner";
import { Button } from "@/components/base/buttons/button";
import { ComponentPreview } from "@/components/application/docs/component-preview";
import { Showcase } from "@/components/application/docs/showcase";

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
    <ConsoleLayout>
      <Showcase title="Toast" columns={1}>
        <ComponentPreview title="Anatomy">
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

        <ComponentPreview title="Position">
          <div className="flex flex-wrap gap-2">
            {positions.map(({ y, x, label }) => (
              <Button key={label} variant="outline" onClick={() => showPosition(y, x)}>{label}</Button>
            ))}
          </div>
        </ComponentPreview>

        <ComponentPreview title="Duration and limit">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Quick confirmation", { duration: 2000, className: "cn-toast-short" })}>Two seconds</Button>
            <Button variant="outline" onClick={() => toast("This stays until dismissed", { duration: Number.POSITIVE_INFINITY, className: "cn-toast-persistent" })}>Until dismissed</Button>
            <Button variant="outline" onClick={() => toast("Draft saved", { id: "toast-draft" })}>Reuse ID</Button>
            <Button variant="outline" onClick={() => toast.success("Draft updated", { id: "toast-draft" })}>Update ID</Button>
            <Button variant="outline" onClick={() => toast.dismiss("toast-draft")}>Dismiss ID</Button>
            <Button variant="outline" onClick={() => { toast.success("Changes saved"); toast("Project archived"); toast.info("Export started"); toast.error("Connection interrupted"); }}>Show four</Button>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Accessibility">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Announce status</Button>
            <Button variant="outline" onClick={() => toast.error("Could not save changes", { description: "Check your connection and try again." })}>Announce error</Button>
          </div>
        </ComponentPreview>
      </Showcase>
    </ConsoleLayout>
  );
}
