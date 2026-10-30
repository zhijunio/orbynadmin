import Image from "next/image";
import { Showcase } from "@/components/feature/example/Showcase";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";

const images = [
  "/images/models/building-model-1.jpg",
  "/images/models/building-model-2.jpg",
  "/images/models/building-model-3.jpg",
  "/images/models/building-model-4.jpg",
  "/images/models/building-model-5.jpg",
  "/images/models/building-model-6.jpg",
];

export default function ImagesPage() {
  return <Showcase title="Images">
    <ComponentPreview title="Responsive image" className="xl:col-span-2"><div className="relative aspect-[1054/600] w-full overflow-hidden rounded-xl border"><Image src={images[0]} alt="Responsive image example" fill priority sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover" /></div></ComponentPreview>
    <ComponentPreview title="Image in 2 Grid" className="xl:col-span-2"><div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">{images.slice(1, 3).map((src, index) => <div key={src} className="relative aspect-[517/295] overflow-hidden rounded-xl border"><Image src={src} alt={`Two column image example ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>)}</div></ComponentPreview>
    <ComponentPreview title="Image in 3 Grid" className="xl:col-span-2"><div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{images.slice(3, 6).map((src, index) => <div key={src} className="relative aspect-[338/192] overflow-hidden rounded-xl border"><Image src={src} alt={`Three column image example ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" /></div>)}</div></ComponentPreview>
  </Showcase>;
}
