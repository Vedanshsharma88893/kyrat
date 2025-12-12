import Image from "next/image";
import { events } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Events() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  const featuredEvents = events.slice(0, 3);

  return (
    <section id="events" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Featured Events
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover a world of music, art, and culinary delights. Our festival is packed with unique experiences.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
          {featuredEvents.map((event) => {
            const image = getImage(event.imageId);
            return (
              <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col">
                <CardHeader className="p-0">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={event.name}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                   <Badge
                    variant={event.status === "Ongoing" ? "destructive" : "secondary"}
                    className="mb-2 self-start"
                  >
                    {event.status}
                  </Badge>
                  <CardTitle className="font-headline text-xl mb-2">{event.name}</CardTitle>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
         <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
      </div>
    </section>
  );
}
