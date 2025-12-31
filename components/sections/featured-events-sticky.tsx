"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { events } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { PhysicsTitle } from "@/components/ui/physics-title";
import { useToast } from "@/hooks/use-toast";

export function FeaturedEventsSticky() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const featuredEvents = events.slice(0, 5);
  const currentEvent = featuredEvents[currentIndex];
  const currentImage = currentEvent
    ? PlaceHolderImages.find((img) => img.id === currentEvent.imageId)
    : undefined;

  const DURATION = 5000; // 5 seconds per story

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNext();
            return 0;
          }
          return prev + (100 / (DURATION / 50));
        });
      }, 50);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    setProgress(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
    setProgress(0);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const { toast } = useToast();

  if (!featuredEvents.length || !currentEvent) {
    return (
      <section id="events" className="relative z-10 bg-background py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline text-primary">
              Featured Events
            </h2>
            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
              No featured events are available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="relative z-10 bg-transparent h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="container px-4 md:px-6">
          {/* Headlines removed as per request */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 hidden">
            {/* Hidden to maintain layout structure if needed, or just remove content */}
          </div>

          <div className="flex flex-col items-center gap-12 py-10 md:py-20">
            <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl" style={{ width: '300px', height: '533px' }}>
              {/* Background Image */}
              <div className="absolute inset-0">
                {currentImage && (
                  <Image
                    src={currentImage.imageUrl}
                    alt={currentEvent.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-20">
                <div className="flex-1 flex gap-1">
                  {featuredEvents.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden"
                      onClick={() => goToIndex(index)}
                    >
                      <div
                        className="h-full bg-white rounded-full"
                        style={{
                          width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                          transition: index === currentIndex ? "none" : "width 0.3s ease",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center flex-shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="space-y-4">
                  <div className="text-sm text-gray-300 font-medium">
                    {new Date(currentEvent.date).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-headline leading-tight">
                    {currentEvent.name}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3">
                    {currentEvent.description}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Explicit Spacer */}
            <div className="h-12 w-px" />

            <LiquidGlassButton
              href="/events"
              className="mt-8"
              disabled
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Coming Soon!",
                  description: "All events will be released soon after events are finalised.",
                  variant: "destructive",
                });
              }}
            >
              View All Events
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
