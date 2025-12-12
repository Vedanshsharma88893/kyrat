"use client";
import Image from "next/image";
import { events } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Events() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  const featuredEvents = events.slice(0, 3);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section 
      id="events" 
      className="w-full py-16 md:py-24 lg:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Featured Events
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover a world of music, art, and culinary delights. Our festival is packed with unique experiences.
            </p>
          </div>
        </div>
        <motion.div 
          className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredEvents.map((event) => {
            const image = getImage(event.imageId);
            return (
              <motion.div key={event.id} variants={cardVariants}>
                <Card className="overflow-hidden transition-all duration-300 flex flex-col h-full group border-2 border-transparent hover:border-primary hover:shadow-2xl">
                  <CardHeader className="p-0 relative">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={event.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                     <Badge
                      variant={event.status === "Ongoing" ? "destructive" : "secondary"}
                      className="absolute top-3 right-3"
                    >
                      {event.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="font-headline text-xl mb-2 flex-grow font-bold">{event.name}</h3>
                    <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                       <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{event.venue}</span>
                      </div>
                       <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span>{event.participants} Participants</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
         <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
      </div>
    </motion.section>
  );
}
