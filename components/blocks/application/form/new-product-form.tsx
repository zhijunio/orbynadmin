"use client";

import { useEffect, useRef, useState } from "react";
import { IconPackage, IconPlus, IconTrash } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Combobox } from "@/components/ui/combobox/combobox";
import { Input } from "@/components/ui/input/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { Switch } from "@/components/ui/switch/switch";
import { Textarea } from "@/components/ui/textarea/textarea";

type ProductImage = { id: string; name: string; src: string; local?: boolean };

const initialImages: ProductImage[] = [
  { id: "runner-front", name: "runner-front.jpg", src: "/images/products/runner-front.jpg" },
  { id: "runner-lifestyle", name: "runner-lifestyle.jpg", src: "/images/products/runner-lifestyle.jpg" },
];

const collectionOptions = [
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "running", label: "Running" },
  { value: "weather-ready", label: "Weather Ready" },
  { value: "clearance", label: "Clearance" },
];

function FieldRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return <div className="grid gap-3 border-b border-dashed py-4 sm:grid-cols-[minmax(0,38%)_minmax(0,1fr)] sm:gap-5"><div><p className="text-sm font-medium">{label}</p><p className="mt-1 text-sm text-muted-foreground">{description}</p></div><div className="min-w-0">{children}</div></div>;
}

function PriceField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid min-w-0 gap-1.5 text-sm"><span>{label}</span><InputGroup><InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon><InputGroupInput aria-label={label} type="number" min="0" step="0.01" value={value} onChange={(event) => onChange(event.target.value)} /></InputGroup></label>;
}

export function NewProductForm() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef(new Set<string>());
  const [images, setImages] = useState(initialImages);
  const [name, setName] = useState("AeroFlex Runner Shoe");
  const [description, setDescription] = useState("Responsive knit running shoe with a cushioned midsole, grippy road outsole, and reflective details for early training sessions.");
  const [category, setCategory] = useState("footwear");
  const [productType, setProductType] = useState("physical");
  const [price, setPrice] = useState("148.00");
  const [compareAt, setCompareAt] = useState("188.00");
  const [sku, setSku] = useState("ARS-2048-ST");
  const [quantity, setQuantity] = useState("126");
  const [trackInventory, setTrackInventory] = useState(true);
  const [chargeTax, setChargeTax] = useState(true);
  const [warehouse, setWarehouse] = useState("warehouse");
  const [collections, setCollections] = useState(["new-arrivals", "running", "weather-ready"]);
  const [status, setStatus] = useState("draft");
  const [notice, setNotice] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => () => objectUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  function addImages(files: FileList | null) {
    if (!files?.length) return;
    const candidates = Array.from(files);
    const remaining = 5 - images.length;
    if (candidates.some((file) => !file.type.startsWith("image/"))) {
      setImageError("Choose image files only.");
      return;
    }
    if (candidates.some((file) => file.size > 5 * 1024 * 1024)) {
      setImageError("Each image must be 5MB or smaller.");
      return;
    }
    const accepted = candidates.slice(0, Math.max(0, remaining));
    const added = accepted.map((file, index) => {
      const src = URL.createObjectURL(file);
      objectUrls.current.add(src);
      return { id: `${file.name}-${file.lastModified}-${index}`, name: file.name, src, local: true };
    });
    setImages((current) => [...current, ...added]);
    setImageError(candidates.length > remaining ? "A product can have up to 5 images." : "");
  }

  function removeImage(image: ProductImage) {
    if (image.local) {
      URL.revokeObjectURL(image.src);
      objectUrls.current.delete(image.src);
    }
    setImages((current) => current.filter((item) => item.id !== image.id));
  }

  function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(`${name || "Product"} created locally.`);
  }

  return <Card className="mx-auto w-full max-w-3xl gap-0 shadow-none">
    <CardHeader className="border-b px-5 py-4">
      <div className="flex items-start justify-between gap-4"><div><CardTitle className="text-base">Create Product</CardTitle><p className="mt-0.5 text-sm text-muted-foreground">Add catalog details, media, pricing, and fulfillment.</p></div><Badge variant="warning-light"><IconPackage />Draft</Badge></div>
    </CardHeader>
    <CardContent className="px-5 py-1">
      <form onSubmit={createProduct}>
        <FieldRow label="Product Media" description="Thumbnail gallery for listings.">
          <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-lg border border-dashed px-3 py-2">
            <input ref={uploadRef} type="file" accept="image/*" multiple className="sr-only" aria-label="Upload product thumbnails" onChange={(event) => { addImages(event.currentTarget.files); event.currentTarget.value = ""; }} />
            <Button type="button" size="sm" onClick={() => uploadRef.current?.click()}><IconPlus />Add Files</Button>
            {images.map((image) => <div key={image.id} className="group relative size-12 overflow-hidden rounded-lg border bg-muted"><div role="img" aria-label={image.name} className="size-full bg-cover bg-center" style={{ backgroundImage: `url("${image.src}")` }} /><Button type="button" variant="secondary" size="icon-xs" className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" aria-label={`Remove ${image.name}`} onClick={() => removeImage(image)}><IconTrash /></Button></div>)}
            <span className="ml-auto text-xs text-muted-foreground">{images.length}/5</span>
          </div>
          {imageError && <p role="alert" className="mt-1 text-xs text-destructive">{imageError}</p>}
        </FieldRow>
        <FieldRow label="Product Name" description="Storefront display name."><Input aria-label="Product name" value={name} onChange={(event) => setName(event.target.value)} /></FieldRow>
        <FieldRow label="Description" description="Short sales copy for the product page."><Textarea aria-label="Description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} /></FieldRow>
        <FieldRow label="Category" description="Primary merchandising group."><Select value={category} onValueChange={setCategory}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="footwear">Footwear</SelectItem><SelectItem value="apparel">Apparel</SelectItem><SelectItem value="accessories">Accessories</SelectItem><SelectItem value="equipment">Equipment</SelectItem></SelectContent></Select></FieldRow>
        <FieldRow label="Product Type" description="How checkout and delivery should work.">
          <RadioGroup value={productType} onValueChange={setProductType} className="gap-1.5">
            {[["physical", "Physical Product", "Ships from inventory and needs fulfillment rules."], ["digital", "Digital Download", "Delivers files, licenses, or access after purchase."], ["service", "Service", "Creates a bookable or managed service offer."]].map(([value, title, detail]) => <label key={value} className="flex items-start gap-2.5"><RadioGroupItem value={value} className="mt-0.5" /><span><span className="block text-sm font-medium leading-5">{title}</span><span className="text-sm text-muted-foreground">{detail}</span></span></label>)}
          </RadioGroup>
        </FieldRow>
        <FieldRow label="Pricing" description="Base and comparison price."><div className="grid gap-3 sm:grid-cols-2"><PriceField label="Price" value={price} onChange={setPrice} /><PriceField label="Compare At" value={compareAt} onChange={setCompareAt} /></div></FieldRow>
        <FieldRow label="Inventory" description="Stock keeping unit and quantity."><div className="grid gap-3 sm:grid-cols-2"><label className="grid min-w-0 gap-1.5 text-sm"><span>SKU</span><Input value={sku} onChange={(event) => setSku(event.target.value)} /></label><label className="grid min-w-0 gap-1.5 text-sm"><span>Quantity</span><Input type="number" min="0" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label></div></FieldRow>
        <FieldRow label="Commerce Rules" description="Tax and stock behavior."><div className="grid gap-3 sm:grid-cols-2"><div className="flex items-start gap-2"><Switch aria-label="Track Inventory" checked={trackInventory} onCheckedChange={setTrackInventory} /><div><p className="text-sm font-medium">Track Inventory</p><p className="text-sm text-muted-foreground">Reserve stock after purchase.</p></div></div><div className="flex items-start gap-2"><Switch aria-label="Charge Tax" checked={chargeTax} onCheckedChange={setChargeTax} /><div><p className="text-sm font-medium">Charge Tax</p><p className="text-sm text-muted-foreground">Apply regional tax rules.</p></div></div></div></FieldRow>
        <FieldRow label="Fulfillment" description="How orders are completed."><Select value={warehouse} onValueChange={setWarehouse}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="warehouse">Warehouse</SelectItem><SelectItem value="dropship">Dropship</SelectItem><SelectItem value="digital">Digital delivery</SelectItem></SelectContent></Select></FieldRow>
        <FieldRow label="Collections" description="Storefront groups and campaigns."><Combobox aria-label="Collections" className="w-full" multiple value={collections} onValueChange={(value) => setCollections(Array.isArray(value) ? value : [value])} options={collectionOptions} displayValue={<span className="flex min-w-0 items-center gap-1 overflow-hidden">{collections.map((value) => <Badge key={value} variant="secondary" size="sm">{collectionOptions.find((option) => option.value === value)?.label ?? value}</Badge>)}</span>} placeholder="Add collection" searchPlaceholder="Search collections..." /></FieldRow>
        <FieldRow label="Status" description="Controls storefront visibility."><Select value={status} onValueChange={setStatus}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select></FieldRow>
        <footer className="flex flex-wrap items-center justify-between gap-3 py-4"><p role="status" className="text-sm text-muted-foreground">{notice}</p><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setNotice("Draft saved locally.")}>Save Draft</Button><Button type="submit">Create Product</Button></div></footer>
      </form>
    </CardContent>
  </Card>;
}
