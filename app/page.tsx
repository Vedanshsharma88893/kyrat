"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from '@/components/ui/skeleton';
import { Hero } from '@/components/sections/hero';
import { FocusScroll } from "@/components/ui/focus-scroll";
import { ScrollOverlay } from "@/components/ui/scroll-overlay";
import { SideNav } from "@/components/side-nav";
import { CreativeGateway } from "@/components/ui/creative-gateway";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { LoadingScreen } from "@/components/LoadingScreen";

const FeaturedEventsSticky = dynamic(
  () => import('@/components/sections/featured-events-sticky').then((mod) => mod.FeaturedEventsSticky),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
import { ProShows } from "@/components/sections/pro-shows";
const Schedule = dynamic(() => import('@/components/schedule').then((mod) => mod.Schedule), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
import { FestivalMoments } from '@/components/sections/festival-moments';
const Sponsors = dynamic(
  () => import('@/components/sections/sponsors').then((mod) => mod.Sponsors),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
const Team = dynamic(() => import('@/components/team').then((mod) => mod.Team), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.muted = true; // Force muted property
      videoRef.current.play().catch((e) => {
        // Autoplay failed, likely due to interaction requirements or power saving.
        // We can't do much here except ensure it's muted.
        console.warn("Video autoplay blocked:", e);
      });
    }
  }, []);

  const handleImageClick = useCallback((src: string) => {
    setLightboxImage(src);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsPageLoaded(true);
  }, []);

  const handleHeroLoaded = useCallback(() => {
    setIsHeroLoaded(true);
  }, []);

  return (
    <>
      {/* Loading Screen - wait for both page load AND hero video frames */}
      <LoadingScreen
        onLoadComplete={handleLoadComplete}
        minDisplayTime={1500}
        isReady={isHeroLoaded}
      />

      <div className={`flex min-h-screen flex-col text-foreground transition-opacity duration-500 overflow-x-hidden ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Video Container */}
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-neutral-900/10">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          >
            <source src="/videos/bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay for contrast */}
        </div>
        <ScrollOverlay />
        <SideNav />
        {/* Header removed as per request */}
        <main className="flex-1 relative z-10">
          <div className="mb-24 md:mb-32">
            <Hero onLoaded={handleHeroLoaded} />
          </div>
          <div className="relative z-10 flex flex-col gap-24 md:gap-32">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <FocusScroll id="featured-events">
                <FeaturedEventsSticky />
              </FocusScroll>

              {/* Creative Gateway to Events Page */}
              <div className="relative h-32 w-full overflow-hidden pointer-events-none">
                <CreativeGateway
                  href="/events"
                  label="Explore All"
                  variant="sticker"
                  className="right-[20%] top-0 rotate-12"
                />
              </div>
            </Suspense>

            <div id="pro-shows" className="py-16 md:py-24 min-h-[80vh]">
              <ProShows />
            </div>

            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <FocusScroll id="schedule">
                <Schedule />
              </FocusScroll>
            </Suspense>

            {/* Creative Gateway to Campus Map */}
            {/* Creative Gateway to Campus Map */}
            <div className="relative w-full h-[100vh] z-40 my-24 border-y border-white/10 pointer-events-none">
              <div className="sticky top-0 h-full w-full flex items-center justify-start overflow-hidden">

                {/* Background Image Container */}
                <div
                  className="absolute left-[40px] bottom-10 z-10 -translate-x-1/2"
                  style={{ width: 'min(50vw, 400px)', height: 'min(50vw, 400px)' }}
                >
                  <Image
                    src="/images/assets/airplane.png"
                    alt="Airplane"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                </div>

                {/* Gateway Link */}
                <CreativeGateway
                  href="/campus-map"
                  label="Campus Map"
                  variant="glitch"
                  className="left-[40%] md:left-[30%] z-50 pointer-events-auto"
                />
              </div>
            </div>


            <div id="festival-moments">
              <FestivalMoments onImageClick={handleImageClick} />
            </div>

            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <FocusScroll id="sponsors">
                <Sponsors />
              </FocusScroll>
            </Suspense>

            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <FocusScroll id="team">
                <Team />
              </FocusScroll>
            </Suspense>
          </div>
        </main>

        <Footer />

        {/* Image Lightbox - Rendered at page level to avoid 3D transform issues */}
        <ImageLightbox src={lightboxImage} onClose={handleCloseLightbox} />
      </div>
    </>
  );
}
