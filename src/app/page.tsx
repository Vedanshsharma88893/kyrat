"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from '@/components/ui/skeleton';
import { Hero } from '@/components/sections/hero';

const Events = dynamic(() => import('@/components/sections/events').then(mod => mod.Events), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Schedule = dynamic(() => import('@/components/schedule').then(mod => mod.Schedule), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Gallery = dynamic(() => import('@/components/gallery').then(mod => mod.Gallery), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Sponsors = dynamic(() => import('@/components/sections/sponsors').then(mod => mod.Sponsors), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const Team = dynamic(() => import('@/components/sections/team').then(mod => mod.Team), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="relative z-10 bg-background">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <Events />
            <Schedule />
            <Gallery />
            <Sponsors />
            <Team />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
