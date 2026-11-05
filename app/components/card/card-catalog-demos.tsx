"use client";

import { IconArrowRight, IconCheck, IconSparkles } from "@tabler/icons-react";
import { CatalogGridItems } from "@/components/custom/docs/catalog-page-grid";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card/card";
import { demoAvatarUrl } from "@/utils/demo-avatar";


const styleOne = [
  {
    title: "Innovative renewable energy",
    image: "/images/models/building-model-1.jpg",
    description: "Exploring breakthrough technologies in solar and wind power to enhance global energy access.",
  },
  {
    title: "Circular Economy Models",
    image: "/images/models/building-model-2.jpg",
    description: "Implementing strategies that promote product lifecycle extension and waste minimization.",
  },
];

const styleTwo = {
  title: "Sustainability in Tech",
  date: "March 3, 2028",
  image: "/images/models/building-model-4.jpg",
  description: "Assessing eco-friendly practices to reduce carbon footprints in product development.",
  author: "John Doe",
  avatar: demoAvatarUrl("John Doe"),
};

const styleHorizontal = {
  title: "Material Library Refresh",
  image: "/images/models/building-model-4.jpg",
  description: "Keep surface samples and finish notes together for the next product review.",
};

const styleThree = {
  title: "AI Ethics",
  category: "Analysis",
  date: "March 3, 2028",
  image: "/images/models/building-model-7.jpg",
  description: "Exploring the moral challenges and responsibilities in artificial intelligence deployment.",
};

const styleFour = {
  title: "Product Launch Checklist",
  category: "Planning",
  date: "Aug 14, 2028",
  description: "Track launch readiness across product, support, and customer communications.",
  author: "Sofia Rossi",
  avatar: demoAvatarUrl("Sofia Rossi"),
};

export function CardsExample() {
  return (
    <CatalogGridItems>
      <ComponentPreview title="Default Card" description="Header, content, and footer." layout="panel">
        <Card className="w-full max-w-md gap-0">
          <CardHeader className="border-b">
            <CardTitle>API access</CardTitle>
            <p className="text-sm text-muted-foreground">Manage credentials for this workspace.</p>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-sm">
              Last rotated <time dateTime="2026-10-28">October 28, 2026</time>
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">1 active key</span>
            <Button size="sm" variant="outline">
              Manage keys
            </Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Stat Cards" description="Icon tile, metric, and link action." layout="panel">
        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
          {[
            { title: "Workspace Health", icon: IconCheck, value: "All systems operational", tint: "bg-success/10 text-success-foreground" },
            { title: "AI Insights", icon: IconSparkles, value: "3 recommendations ready", tint: "bg-muted text-foreground" },
          ].map((item) => (
            <Card key={item.title} className="w-full gap-4 p-5 shadow-none">
              <span className={`flex size-11 items-center justify-center rounded-xl ${item.tint}`}>
                <item.icon className="size-5" />
              </span>
              <div>
                <CardTitle className="text-sm">{item.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
              <Button variant="link" className="h-auto self-start p-0">
                View details <IconArrowRight className="size-4" />
              </Button>
            </Card>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Image on Top" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-transparent p-0 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleOne[0].title}
            className="aspect-video w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleOne[0].image})` }}
          />
          <CardHeader className="p-0 pt-3">
            <CardTitle className="mt-0 text-base leading-7 font-semibold tracking-[-0.2px]">{styleOne[0].title}</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pt-1 pb-0 text-sm leading-5 text-muted-foreground">{styleOne[0].description}</CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Horizontal Media" layout="panel">
        <Card className="flex w-full max-w-lg flex-col gap-0 overflow-hidden p-0 sm:flex-row">
          <div
            role="img"
            aria-label={styleHorizontal.title}
            className="aspect-[16/9] w-full shrink-0 bg-cover bg-center sm:aspect-auto sm:w-36"
            style={{ backgroundImage: `url(${styleHorizontal.image})` }}
          />
          <CardContent className="flex flex-1 flex-col justify-center gap-2 p-4">
            <CardTitle className="text-sm">{styleHorizontal.title}</CardTitle>
            <p className="line-clamp-2 text-sm text-muted-foreground">{styleHorizontal.description}</p>
            <Button variant="link" className="h-auto self-start p-0">
              Read more <IconArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Linked Media" layout="panel">
        <Card className="group/card w-full max-w-sm p-0">
          <div
            role="img"
            aria-label="Operations team reviewing a project dashboard"
            className="aspect-video rounded-t-xl bg-[url('/images/carousel/carousel-03.png')] bg-cover bg-center transition-transform duration-300 group-hover/card:scale-[1.03] motion-reduce:transition-none"
          />
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <CardTitle>Operations review</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">Project Atlas · Updated today</p>
            </div>
            <Button size="icon" variant="ghost" aria-label="Open operations review">
              <IconArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Overlay Hero" layout="panel">
        <Card className="relative min-h-52 w-full max-w-sm justify-end overflow-hidden border-0 p-0 text-white">
          <div role="img" aria-label="Abstract blue data visualization" className="absolute inset-0 bg-[url('/images/carousel/carousel-04.png')] bg-cover bg-center" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <CardContent className="relative z-10 space-y-2 p-5">
            <Badge variant="secondary">Release 3.4</Badge>
            <CardTitle className="text-white">Platform update</CardTitle>
            <p className="text-sm text-white/80">Reliability improvements are ready for review.</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Article Metadata" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-transparent p-0 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleThree.title}
            className="h-24 w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleThree.image})` }}
          />
          <CardContent className="space-y-3 p-0 pt-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{styleThree.category}</Badge>
              <span aria-hidden="true" className="size-1 rounded-full bg-muted-foreground" />
              <span className="text-xs text-muted-foreground">{styleThree.date}</span>
            </div>
            <CardTitle className="block text-base leading-7 font-semibold tracking-[-0.2px]">{styleThree.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{styleThree.description}</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Author Byline" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-muted/50 p-2 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleTwo.title}
            className="aspect-[16/10] w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleTwo.image})` }}
          />
          <CardContent className="space-y-3 px-3 py-2">
            <p className="text-xs text-muted-foreground">{styleTwo.date}</p>
            <h3 className="text-base leading-7 font-semibold tracking-[-0.2px]">{styleTwo.title}</h3>
            <p className="text-sm text-muted-foreground">{styleTwo.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Avatar size="xs">
                <AvatarImage src={styleTwo.avatar} alt={styleTwo.author} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {styleTwo.author}
            </div>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Author Footer" layout="panel">
        <Card className="flex w-full max-w-sm flex-col gap-0 rounded-xl border-0 bg-muted/50 p-2 shadow-none ring-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{styleFour.category}</p>
            <p className="text-sm text-muted-foreground">{styleFour.date}</p>
          </div>
          <div className="mt-5 flex-1">
            <CardTitle className="text-lg leading-7 font-semibold tracking-[-0.2px]">{styleFour.title}</CardTitle>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{styleFour.description}</p>
          </div>
          <div className="mt-3 flex min-h-10 items-center justify-between gap-3 rounded-lg bg-background px-2 py-1.5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={styleFour.avatar} alt={styleFour.author} />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <span className="truncate text-sm text-muted-foreground">{styleFour.author}</span>
            </div>
            <Button variant="link" className="h-auto shrink-0 gap-2 p-0 text-sm font-medium text-foreground">
              Read More <IconArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </ComponentPreview>
    </CatalogGridItems>
  );
}

