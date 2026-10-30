import { Showcase } from "@/components/feature/example/Showcase";

import { ComponentPreview } from "@/components/feature/example/ComponentPreview";

const videoRatios = [
  { label: "16:9", className: "aspect-video" },
  { label: "4:3", className: "aspect-[4/3]" },
  { label: "21:9", className: "aspect-[21/9]" },
  { label: "1:1", className: "aspect-square" },
] as const;

function VideoRatio({ label, className }: (typeof videoRatios)[number]) {
  return <ComponentPreview title={`Video Ratio ${label}`}>
    <div className={`${className} w-full overflow-hidden rounded-lg bg-black`}>
      <video
        className="size-full object-cover"
        controls
        preload="none"
        poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        aria-label={`Responsive video example, ${label}`}
      />
    </div>
  </ComponentPreview>;
}

function VideosExample() {
  return <>
    <div className="space-y-5"><VideoRatio {...videoRatios[0]} /><VideoRatio {...videoRatios[1]} /></div>
    <div className="space-y-5"><VideoRatio {...videoRatios[2]} /><VideoRatio {...videoRatios[3]} /></div>
  </>;
}

export const metadata = { title: "Videos" };

export default function VideosPage() {
  return <Showcase title="Videos"><VideosExample /></Showcase>;
}
