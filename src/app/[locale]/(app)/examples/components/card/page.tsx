import { Showcase } from "@/components/feature/example/Showcase";

import { ArrowRight as IconArrowRight, Check as IconCheck, Sparkles as IconSparkles } from "lucide-react";
import { ComponentPreview } from "@/components/feature/example/ComponentPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoAvatarUrl } from "@/lib/demo-avatar";
import { getInitials } from "@/lib/text";

function CardsExample() {
  return (
    <>
      <ComponentPreview title="Style 1" className="lg:col-span-2">
        <div className="flex w-full flex-wrap gap-5">{styleOne.map((item) => <Card key={item.title} className="w-full max-w-[21rem] gap-0 border-0 bg-transparent p-0 shadow-none ring-0"><div role="img" aria-label={item.title} className="aspect-video w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} /><CardHeader className="p-0 pt-3"><CardTitle className="mt-0 text-base leading-7 font-semibold tracking-[-0.2px]">{item.title}</CardTitle></CardHeader><CardContent className="px-0 pt-1 pb-0 text-sm leading-5 text-muted-foreground">{item.description}</CardContent></Card>)}</div>
      </ComponentPreview>
      <ComponentPreview title="Style 2" className="lg:col-span-2">
        <div className="flex w-full flex-wrap gap-5">{styleTwo.map((item) => <Card key={item.title} className="w-full max-w-[20rem] gap-0 border-0 bg-muted/50 p-2 shadow-none ring-0"><div role="img" aria-label={item.title} className="aspect-[16/10] w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} /><CardContent className="space-y-3 px-3 py-2"><p className="text-xs text-muted-foreground">{item.date}</p><h3 className="text-base leading-7 font-semibold tracking-[-0.2px]">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p><div className="flex items-center gap-2 text-xs text-muted-foreground"><Avatar size="sm"><AvatarImage src={item.avatar} alt={item.author} /><AvatarFallback>{getInitials(item.author)}</AvatarFallback></Avatar>{item.author}</div></CardContent></Card>)}</div>
      </ComponentPreview>
      <ComponentPreview title="Style 3" className="lg:col-span-2">
        <div className="flex w-full flex-wrap gap-5">{styleThree.map((item) => <Card key={item.title} className="w-full max-w-[20rem] gap-0 border-0 bg-transparent p-0 shadow-none ring-0"><div role="img" aria-label={item.title} className="h-24 w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} /><CardContent className="space-y-3 p-0 pt-3"><div className="flex items-center gap-2"><Badge variant="secondary">{item.category}</Badge><span aria-hidden="true" className="size-1 rounded-full bg-muted-foreground" /><span className="text-xs text-muted-foreground">{item.date}</span></div><CardTitle className="block text-base leading-7 font-semibold tracking-[-0.2px]">{item.title}</CardTitle><p className="text-sm text-muted-foreground">{item.description}</p><Button variant="link" className="h-auto shrink-0 gap-2 p-0 text-sm font-medium text-foreground">Learn More <IconArrowRight className="size-4" /></Button></CardContent></Card>)}</div>
      </ComponentPreview>
      <ComponentPreview title="Style 4" className="lg:col-span-2">
        <div className="flex w-full flex-wrap gap-5">
          {styleFour.map((item) => (
            <Card key={item.title} className="flex h-full w-full max-w-[20rem] flex-col gap-0 rounded-xl border-0 bg-muted/50 p-2 shadow-none ring-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-primary">{item.category}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <div className="mt-5 flex-1">
                <CardTitle className="text-lg leading-7 font-semibold tracking-[-0.2px]">{item.title}</CardTitle>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
              </div>
              <div className="mt-3 flex min-h-10 items-center justify-between gap-3 rounded-lg bg-background px-2 py-1.5">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-8 shrink-0"><AvatarImage src={item.avatar} alt={item.author} /><AvatarFallback>{getInitials(item.author)}</AvatarFallback></Avatar>
                  <span className="truncate text-sm text-muted-foreground">{item.author}</span>
                </div>
                <Button variant="link" className="h-auto shrink-0 gap-2 p-0 text-sm font-medium text-foreground">Read More <IconArrowRight className="size-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Horizontal Cards with Image" className="lg:col-span-2">
        <div className="grid w-full gap-4 lg:grid-cols-2">{styleOne.slice(0, 2).map((item) => <Card key={item.title} className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:flex-row"><div role="img" aria-label={item.title} className="aspect-[16/9] w-full shrink-0 bg-cover bg-center sm:aspect-auto sm:w-36" style={{ backgroundImage: `url(${item.image})` }} /><CardContent className="flex flex-1 flex-col justify-center gap-2 p-4"><CardTitle className="text-sm">{item.title}</CardTitle><p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p><Button variant="link" className="h-auto self-start p-0">Read more <IconArrowRight className="size-4" /></Button></CardContent></Card>)}</div>
      </ComponentPreview>
      <ComponentPreview title="Cards with Icon" className="lg:col-span-2">
        <div className="grid w-full gap-4 sm:grid-cols-2">{[{ title: "Workspace Health", icon: IconCheck, value: "All systems operational", tint: "bg-emerald-500/10 text-emerald-600" }, { title: "AI Insights", icon: IconSparkles, value: "3 recommendations ready", tint: "bg-primary/10 text-primary" }].map((item) => <Card key={item.title} className="w-full gap-4 p-5 shadow-none"><span className={`flex size-11 items-center justify-center rounded-xl ${item.tint}`}><item.icon className="size-5" /></span><div><CardTitle className="text-sm">{item.title}</CardTitle><p className="mt-1 text-sm text-muted-foreground">{item.value}</p></div><Button variant="link" className="h-auto self-start p-0">View details <IconArrowRight className="size-4" /></Button></Card>)}</div>
      </ComponentPreview>
    </>
  );
}

const styleOne = [
  { title: "Innovative renewable energy", image: "/images/models/building-model-1.jpg", description: "Exploring breakthrough technologies in solar and wind power to enhance global energy access." },
  { title: "Circular Economy Models", image: "/images/models/building-model-2.jpg", description: "Implementing strategies that promote product lifecycle extension and waste minimization." },
  { title: "Green Supply Chain Management", image: "/images/models/building-model-3.jpg", description: "Optimizing logistics and sourcing to lower environmental impact throughout production." },
];

const styleTwo = [
  { title: "Sustainability in Tech", date: "March 3, 2028", image: "/images/models/building-model-4.jpg", description: "Assessing eco-friendly practices to reduce carbon footprints in product development.", author: "John Doe", avatar: demoAvatarUrl("John Doe") },
  { title: "AI-Powered User Insights", date: "April 22, 2028", image: "/images/models/building-model-5.jpg", description: "Leveraging machine learning to predict customer preferences and tailor experiences.", author: "Emily Johnson", avatar: demoAvatarUrl("Emily Johnson") },
  { title: "Augmented Reality Interfaces", date: "June 11, 2028", image: "/images/models/building-model-6.jpg", description: "Designing immersive AR environments to elevate interactive product usability.", author: "Michael Smith", avatar: demoAvatarUrl("Michael Smith") },
];

const styleThree = [
  { title: "AI Ethics", category: "Analysis", date: "March 3, 2028", image: "/images/models/building-model-7.jpg", description: "Exploring the moral challenges and responsibilities in artificial intelligence deployment." },
  { title: "Quantum Computing Advances", category: "Update", date: "July 6, 2028", image: "/images/models/building-model-8.jpg", description: "Breaking down the latest breakthroughs and their potential impact on cybersecurity." },
  { title: "Remote Work Trends", category: "Feature", date: "July 1, 2028", image: "/images/models/building-model-9.jpg", description: "Evaluating how flexible work environments reshape team dynamics and productivity." },
];

const styleFour = [
  { title: "Quantum Computing", category: "Research", date: "July 6, 2028", description: "Breaking down the latest breakthroughs and their potential impact on cybersecurity.", author: "Michael Smith", avatar: demoAvatarUrl("Michael Smith") },
  { title: "AI Ethics", category: "Analysis", date: "March 3, 2028", description: "Exploring the moral challenges and responsibilities in artificial intelligence deployment.", author: "Aman Lee", avatar: demoAvatarUrl("Aman Lee") },
  { title: "Remote Work Trends", category: "Overview", date: "July 1, 2028", description: "Evaluating how flexible work environments reshape team dynamics and productivity.", author: "Michael Smith", avatar: demoAvatarUrl("Michael Smith") },
];

export const metadata = { title: "Cards" };

export default function CardsPage() {
  return <Showcase title="Cards"><CardsExample /></Showcase>;
}
