"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Calendar, MapPin, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ReelItem {
    id: string;
    name: string;
    date: string;
    venue: string;
    description: string;
    imageId: string;
}

export function ReelCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    const reelItems: ReelItem[] = events.slice(0, 5);
    const currentItem = reelItems[currentIndex];
    const currentImage = PlaceHolderImages.find((img) => img.id === currentItem?.imageId);

    const DURATION = 5000; // 5 seconds per reel

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % reelItems.length);
    }, [reelItems.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + reelItems.length) % reelItems.length);
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        setIsContentVisible(false);
        setProgress(0);

        const contentTimer = setTimeout(() => {
            setIsContentVisible(true);
        }, 300);

        return () => clearTimeout(contentTimer);
    }, [currentIndex]);

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
    }, [isPlaying, currentIndex, goToNext]);

    return (
        <section className="w-full bg-background py-24">
            <div className="container px-4 md:px-6 mb-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline text-primary">
                        Featured Events
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
                        Don't miss out on the highlights of the season.
                    </p>
                </div>
            </div>

            <div className="container px-4 md:px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="relative w-full aspect-[9/16] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-black">
                        {/* Image with overlay */}
                        <div className="absolute inset-0">
                            {currentImage && (
                                <Image
                                    src={currentImage.imageUrl}
                                    alt={currentItem.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Progress bars */}
                        <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-20">
                            <div className="flex-1 flex gap-1">
                                {reelItems.map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden"
                                        onClick={() => goToIndex(index)}
                                    >
                                        <div
                                            className="h-full bg-white rounded-full transition-all"
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
                                className="p-2 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center flex-shrink-0"
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                            <div
                                className={`transition-all duration-500 ${isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Calendar className="w-5 h-5" />
                                        <span className="text-sm font-medium">
                                            {new Date(currentItem.date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <h2
                                        className={`text-3xl md:text-5xl font-bold text-white font-headline leading-tight transition-all duration-500 delay-100 ${isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                            }`}
                                    >
                                        {currentItem.name}
                                    </h2>

                                    <div
                                        className={`flex items-center gap-3 text-gray-200 transition-all duration-500 delay-150 ${isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                            }`}
                                    >
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-sm font-medium">{currentItem.venue}</span>
                                    </div>

                                    <p
                                        className={`text-white/90 text-sm md:text-base leading-relaxed line-clamp-3 transition-all duration-500 delay-200 ${isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                            }`}
                                    >
                                        {currentItem.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border-none text-white opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
