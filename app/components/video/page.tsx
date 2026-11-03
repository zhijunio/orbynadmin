import AppShell from "@/components/blocks/application/app-shell/app-shell";

export const metadata = { title: "Videos" };




import { PageHeader } from "@/components/custom/docs/page-header";

import { ComponentPreview } from "@/components/custom/docs/component-preview";

const videoRatios = [
  { label: "16:9 Widescreen", ratio: "16:9", className: "aspect-video" },
  { label: "4:3 Standard", ratio: "4:3", className: "aspect-[4/3]" },
  { label: "21:9 Cinematic", ratio: "21:9", className: "aspect-[21/9]" },
  { label: "1:1 Square", ratio: "1:1", className: "aspect-square" },
] as const;

function VideoRatio({ label, ratio, className }: (typeof videoRatios)[number]) {
  return <ComponentPreview title={label}>
    <div className={`${className} w-full overflow-hidden rounded-lg bg-black`}>
      <video
        className="size-full object-cover"
        controls
        preload="none"
        poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        aria-label={`Responsive video example, ${ratio}`}
      />
    </div>
  </ComponentPreview>;
}

function VideosExample() {
  return videoRatios.map((ratio) => <VideoRatio key={ratio.label} {...ratio} />);
}



export default function VideosPage() {
  return <AppShell>{<div className="min-w-0 space-y-5"><PageHeader title="Videos" /><div className="grid min-w-0 gap-5 [&>*]:min-w-0 xl:grid-cols-2"><VideosExample /></div></div>}</AppShell>;
}
