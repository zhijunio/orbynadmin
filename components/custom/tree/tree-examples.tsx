"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { IconBriefcase, IconBuilding, IconCode, IconFileText, IconFolder } from "@tabler/icons-react";
import { Tree, type TreeNode } from "@/components/ui/tree/tree";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";

function CheckPermission({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return <Checkbox checked={checked} aria-label={label} onCheckedChange={onToggle} onClick={event=>event.stopPropagation()} onKeyDown={event=>{if(event.key===" " || event.key==="Enter") event.stopPropagation();}} className="size-3.5" />;
}
export function TreeExtraExamples() {const [checked,setChecked]=useState<Set<string>>(()=>new Set(["view-project","view-user"]));
  const toggle=(id:string)=>setChecked(current=>{const next=new Set(current);if(next.has(id)) next.delete(id); else next.add(id);return next;});
  const explorer:TreeNode[]=[{id:"src",label:"src",icon:<IconFolder className="size-4 text-muted-foreground" />,children:[{id:"app",label:"app",icon:<IconFolder className="size-4 text-muted-foreground" />,children:[{id:"page",label:"page.tsx",icon:<IconCode className="size-4 text-muted-foreground" />},{id:"layout",label:"layout.tsx",icon:<IconCode className="size-4 text-muted-foreground" />}]},{id:"readme",label:"README.md",icon:<IconFileText className="size-4 text-muted-foreground" />}]}];
  const org:TreeNode[]=[{id:"company",label:"Company",icon:<IconBuilding className="size-4" />,children:[{id:"design",label:"Design lead",icon:<Avatar size="xs"><AvatarFallback>MC</AvatarFallback></Avatar>,trailingContent:"Lead",children:[{id:"designer",label:"Product designer",icon:<Avatar size="xs"><AvatarFallback>AR</AvatarFallback></Avatar>,trailingContent:"Member"} ]},{id:"engineering",label:"Engineering lead",icon:<Avatar size="xs"><AvatarFallback>SP</AvatarFallback></Avatar>,trailingContent:"Lead"}]}];
  const permissions:TreeNode[]=[{id:"workspace",label:"Workspace permissions",icon:<IconBriefcase className="size-4" />,children:[{id:"projects",label:"Projects",children:[{id:"view-project",label:"View projects",trailingContent:<CheckPermission label={"View projects"} checked={checked.has("view-project")} onToggle={()=>toggle("view-project")} />},{id:"edit-project",label:"Edit projects",trailingContent:<CheckPermission label={"Edit projects"} checked={checked.has("edit-project")} onToggle={()=>toggle("edit-project")} />} ]},{id:"users",label:"Users",children:[{id:"view-user",label:"View users",trailingContent:<CheckPermission label={"View users"} checked={checked.has("view-user")} onToggle={()=>toggle("view-user")} />},{id:"manage-user",label:"Manage users",trailingContent:<CheckPermission label={"Manage users"} checked={checked.has("manage-user")} onToggle={()=>toggle("manage-user")} />}]}]}];
  return <>
    <ComponentPreview title={"File Explorer"}><Tree aria-label={"Project files"} items={explorer} defaultExpandedIds={["src","app"]} defaultSelectedIds={["page"]} className="w-full rounded-lg border p-2" /></ComponentPreview>
    <ComponentPreview title={"Org Chart"}><Tree aria-label={"Organization"} items={org} defaultExpandedIds={["company","design"]} className="w-full rounded-lg border p-2" /></ComponentPreview>
    <ComponentPreview title={"Permissions"}><div className="w-full space-y-2"><Tree aria-label={"Permissions"} items={permissions} defaultExpandedIds={["workspace","projects","users"]} selectionMode="none" expanderStyle="plus-minus" className="rounded-lg border p-2" /><p className="text-xs text-muted-foreground">{`${checked.size} permissions selected`}</p></div></ComponentPreview>
  </>;
}
