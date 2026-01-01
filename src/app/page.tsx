"use client";

import { Suspense, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from '@/components/ui/skeleton';
import { Hero } from '@/components/sections/hero';
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion, useScroll, useTransform } from 'framer-motion';
import { SideNav } from "@/components/side-nav";
import { ScrollOverlay } from "@/components/ui/scroll-overlay";

const Events = dynamic(() => import('@/src/components/sections/events').then(mod => mod.Events), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Schedule = dynamic(() => import('@/src/components/schedule').then(mod => mod.Schedule), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const FestivalMoments = dynamic(() => import('@/src/components/gallery').then(mod => mod.Gallery), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Sponsors = dynamic(() => import('@/src/components/sections/sponsors').then(mod => mod.Sponsors), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Team = dynamic(() => import('@/src/components/sections/team').then(mod => mod.Team), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Scroll-linked brightness for "diving deeper" effect - starts after 50% scroll
  // We start at 1.2 brightness and 0 overlay opacity for a "bright" surface feel.
  const { scrollYProgress } = useScroll();
  const brightness = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1.2, 1.2, 0.3, 0.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0, 0, 0.7, 0.7]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(console.warn);
    }
  }, []);

  return (
    <>
      <LoadingScreen onLoadComplete={() => setIsPageLoaded(true)} />

      <div className={`flex min-h-screen flex-col transition-opacity duration-700 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Video Container */}
        <motion.div
          className="fixed inset-0 w-screen h-screen z-0 overflow-hidden bg-[#030712] pointer-events-none"
        >
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-fill"
            style={{
              filter: useTransform(brightness, (v) => `brightness(${v})`),
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <source src="/videos/bg.mp4" type="video/mp4" />
          </motion.video>
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        <ScrollOverlay />
        <SideNav />

        <Header />

        <main className="flex-1 relative z-10 w-full">
          <Hero />

          <div className="relative z-10 flex flex-col gap-24 md:gap-40 pb-20">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <Events />
              <Schedule />
              <FestivalMoments />
              <Sponsors />
              <Team />
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
