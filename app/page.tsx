"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from '@/components/ui/skeleton';
import { Hero } from '@/components/sections/hero';
import { FocusScroll } from "@/components/ui/focus-scroll";
import { ScrollOverlay } from "@/components/ui/scroll-overlay";

const FeaturedEventsSticky = dynamic(
  () => import('@/components/sections/featured-events-sticky').then((mod) => mod.FeaturedEventsSticky),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
const ProShows = dynamic(
  () => import('@/components/sections/pro-shows').then((mod) => mod.ProShows),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
const Schedule = dynamic(() => import('@/components/schedule').then((mod) => mod.Schedule), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const FestivalMoments = dynamic(() => import('@/components/sections/festival-moments').then((mod) => mod.FestivalMoments), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Sponsors = dynamic(
  () => import('@/components/sections/sponsors').then((mod) => mod.Sponsors),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);
const Team = dynamic(() => import('@/components/sections/team').then((mod) => mod.Team), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollOverlay />
      <Header />
      <main className="flex-1">
        <FocusScroll className="mb-24 md:mb-32">
          <Hero />
        </FocusScroll>
        <div className="relative z-10 flex flex-col gap-24 md:gap-32">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <FocusScroll>
              <FeaturedEventsSticky />
            </FocusScroll>
            <FocusScroll>
              <ProShows />
            </FocusScroll>
            <FocusScroll>
              <Schedule />
            </FocusScroll>
          </Suspense>

          <FestivalMoments />

          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <FocusScroll>
              <Sponsors />
            </FocusScroll>
            <FocusScroll>
              <Team />
            </FocusScroll>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
