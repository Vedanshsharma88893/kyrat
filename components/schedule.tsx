'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const EventsTimeline = dynamic(
  () => import('@/components/EventsTimeline/EventsTimeline'),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  }
);

export function Schedule() {
  return (
    <section id="schedule" className="w-full py-12 md:py-24 lg:py-32 bg-transparent relative z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Event Timeline
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Scroll through our festival schedule
          </p>
        </div>
        <EventsTimeline />
      </div>
    </section>
  );
}
