"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";



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

export function ToastCatalogExamples() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Variants">

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Save changes</Button>
                  <Button variant="outline" onClick={() => toast("Project archived", { description: "Acme Dashboard moved to the archive.", action: { label: "Undo", onClick: () => toast.success("Project restored") } })}>Archive project</Button>
                  <Button variant="outline" onClick={() => toast.info("Upload complete", { description: "Quarterly report.pdf is ready." })}>Upload file</Button>
                </div>

      <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => toast.info("Maintenance scheduled",{description:"Sunday at 02:00 UTC · expected downtime 10 minutes."})}>Show maintenance notice</Button><Button variant="outline" onClick={() => toast.warning("Storage is almost full",{description:"You have used 92% of the workspace quota."})}>Show warning</Button></div>


                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Announce status</Button>
                  <Button variant="outline" onClick={() => toast.error("Could not save changes", { description: "Check your connection and try again." })}>Announce error</Button>
                </div>

      <Button variant="outline" onClick={() => toast("Project copied",{icon:"📋",description:"A new draft is ready."})}>Copy project</Button>
      </ComponentPreview>
          <ComponentPreview title="Updates">

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={showUpdatedToast}>Export CSV</Button>
                  <Button variant="outline" onClick={() => toast.dismiss()}>Dismiss all</Button>
                </div>

      <Button variant="outline" onClick={() => toast.promise(new Promise((resolve) => window.setTimeout(() => resolve("Export ready"), 1000)), { loading: "Preparing export…", success: "Export completed", error: "Export failed" })}>Run export</Button>

      <Button variant="outline" onClick={() => {const id=toast.loading("Uploading design-assets.zip",{description:"0% complete"});let progress=0;const timer=window.setInterval(()=>{progress+=25;if(progress>=100){window.clearInterval(timer);toast.success("Upload complete",{id,description:"design-assets.zip is ready."});}else toast.loading("Uploading design-assets.zip",{id,description:`${progress}% complete`});},350);}}>Upload archive</Button>

      <Button variant="outline" onClick={() => toast.promise(new Promise((resolve) => window.setTimeout(() => resolve("Connected"),700)),{loading:"Connecting to calendar…",success:"Calendar connected",error:"Could not connect calendar"})}>Connect calendar</Button>
      </ComponentPreview>
          <ComponentPreview title="Placement">

                <div className="flex flex-wrap gap-2">
                  {positions.map(({ y, x, label }) => (
                    <Button key={label} variant="outline" onClick={() => showPosition(y, x)}>{label}</Button>
                  ))}
                </div>
      </ComponentPreview>
          <ComponentPreview title="Timing">

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast("Quick confirmation", { duration: 2000, className: "cn-toast-short" })}>Two seconds</Button>
                  <Button variant="outline" onClick={() => toast("This stays until dismissed", { duration: Number.POSITIVE_INFINITY, className: "cn-toast-persistent" })}>Until dismissed</Button>
                </div>


                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast("Draft saved", { id: "toast-draft" })}>Reuse ID</Button>
                  <Button variant="outline" onClick={() => toast.success("Draft updated", { id: "toast-draft" })}>Update ID</Button>
                  <Button variant="outline" onClick={() => toast.dismiss("toast-draft")}>Dismiss ID</Button>
                </div>


                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => { toast.success("Changes saved"); toast("Project archived"); toast.info("Export started"); toast.error("Connection interrupted"); }}>Show four notifications</Button>
                </div>
      </ComponentPreview>
          <ComponentPreview title="Actions">
      <Button variant="outline" onClick={() => toast("Remove this member?", { description: "Their existing activity remains in the workspace.", action: { label: "Remove", onClick: () => toast.success("Member removed") }, cancel: { label: "Cancel", onClick: () => toast.info("Removal cancelled") } })}>Remove member</Button>

      <Button variant="outline" onClick={() => toast("Import queued",{description:"You can safely leave this page while it runs."})}>Show dismissible toast</Button>
      </ComponentPreview>
          <ComponentPreview title="Content Variants">
      <Button variant="outline" onClick={() => toast("Weekly report is ready", { description: "12 projects · 84 updates · 3 action items" })}>Show report summary</Button>

      <Button variant="outline" onClick={() => toast("Team update",{description:"Maya, Alex, and 3 others joined the project.",invert:true})}>Show team update</Button>
      </ComponentPreview>
          <ComponentPreview title="Appearance">
      <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => toast.success("Deployment complete",{className:"border-l-4 border-l-primary"})}>Success accent</Button><Button variant="outline" onClick={() => toast.error("Deployment failed",{className:"border-l-4 border-l-destructive"})}>Error accent</Button></div>

      <Button variant="outline" onClick={() => toast.success("Workspace connected",{invert:true})}>Show inverted success</Button>

      <Button variant="outline" onClick={() => toast.error("Could not connect",{invert:true})}>Show inverted error</Button>

      <Button variant="outline" onClick={() => toast.info("New activity is available",{invert:true})}>Show inverted info</Button>

      <Button variant="outline" onClick={() => toast.warning("Review access settings",{invert:true})}>Show inverted warning</Button>
      </ComponentPreview>
    </CatalogGridItems>
  );
}
