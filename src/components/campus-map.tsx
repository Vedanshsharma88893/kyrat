"use client";

import React, { useState, useMemo } from 'react';
import { clubs, events, venues } from '@/lib/data';
import type { Event } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

type VenueEvents = {
  ongoing: Event[];
  upcoming: Event[];
};

type VenueInfo = {
  id: string;
  name: string;
  path: string;
  labelX: string;
  labelY: string;
};

const venueDetails: VenueInfo[] = [
  { id: 'academic-block', name: 'Academic Block', path: 'M100,50 h200 v100 h-200z', labelX: '200', labelY: '105' },
  { id: 'science-block', name: 'Science Block', path: 'M350,50 h200 v100 h-200z', labelX: '450', labelY: '105' },
  { id: 'library', name: 'Library', path: 'M100,200 h100 v100 h-100z', labelX: '150', labelY: '255' },
  { id: 'auditorium', name: 'Auditorium', path: 'M250,200 h100 v100 h-100z', labelX: '300', labelY: '255' },
  { id: 'sports-complex', name: 'Sports Complex', path: 'M400,200 h200 v200 h-200z', labelX: '500', labelY: '305' },
  { id: 'student-center', name: 'Student Center', path: 'M100,350 h150 v100 h-150z', labelX: '175', labelY: '405' },
  { id: 'dining-hall', name: 'Dining Hall', path: 'M100,500 h200 v100 h-200z', labelX: '200', labelY: '555' },
  { id: 'boys-hostel', name: 'Boys Hostel', path: 'M650,50 h100 v200 h-100z', labelX: '700', labelY: '155' },
  { id: 'girls-hostel', name: 'Girls Hostel', path: 'M650,300 h100 v200 h-100z', labelX: '700', labelY: '405' },
  { id: 'medical-center', name: 'Medical Center', path: 'M350,500 h100 v50 h-100z', labelX: '400', labelY: '530' },
  { id: 'parking', name: 'Parking', path: 'M10,10 h50 v580 h-50z', labelX: '35', labelY: '300' },
];


export function CampusMap() {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'upcoming'>('all');
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const eventsByVenue = useMemo(() => {
    const grouped = venues.reduce((acc, venue) => {
      acc[venue.name] = { ongoing: [], upcoming: [] };
      return acc;
    }, {} as Record<string, VenueEvents>);

    events.forEach(event => {
      if (grouped[event.venue]) {
        if (event.status === 'Ongoing') {
          grouped[event.venue].ongoing.push(event);
        } else if (event.status === 'Upcoming') {
          grouped[event.venue].upcoming.push(event);
        }
      }
    });
    return grouped;
  }, []);

  const getClubName = (clubId: string) => clubs.find(c => c.id === clubId)?.name || 'N/A';

  const getMarkerColor = (venueName: string): string => {
    const venueEvents = eventsByVenue[venueName];
    if (venueEvents?.ongoing.length > 0) return 'hsl(var(--primary))';
    if (venueEvents?.upcoming.length > 0) return 'hsl(var(--accent))';
    return 'hsl(var(--muted-foreground))';
  };
  
  const isVenueVisible = (venueName: string) => {
    if (filter === 'all') return true;
    const venueEvents = eventsByVenue[venueName];
    if (!venueEvents) return false;
    return venueEvents[filter].length > 0;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
       <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Campus Map</h1>
        <p className="text-muted-foreground mt-2 md:text-xl">
          Explore venues and find events happening now.
        </p>
      </header>

      <div className="flex justify-center mb-8">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList>
                <TabsTrigger value="all">All Venues</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
        </Tabs>
      </div>
      
      <div className="relative w-full max-w-5xl mx-auto">
        <svg viewBox="0 0 800 650" className="w-full h-auto bg-card rounded-lg border">
          {venueDetails.map(venue => {
            const hasEvents = eventsByVenue[venue.name]?.ongoing.length > 0 || eventsByVenue[venue.name]?.upcoming.length > 0;
            const popoverId = `popover-${venue.id}`;

            return (
              <Popover key={venue.id} open={openPopover === popoverId} onOpenChange={(isOpen) => setOpenPopover(isOpen ? popoverId : null)}>
                <PopoverTrigger asChild>
                  <g 
                    className={`cursor-pointer transition-opacity duration-300 ${isVenueVisible(venue.name) ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}
                    >
                    <path d={venue.path} fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                     {hasEvents && (
                      <circle cx={venue.labelX} cy={Number(venue.labelY) - 30} r="10" fill={getMarkerColor(venue.name)} className="animate-pulse" />
                    )}
                    <text x={venue.labelX} y={venue.labelY} textAnchor="middle" fill="hsl(var(--foreground))" className="font-semibold text-sm sm:text-base">
                      {venue.name}
                    </text>
                  </g>
                </PopoverTrigger>
                {hasEvents && (
                    <PopoverContent className="w-80" onOpenAutoFocus={(e) => e.preventDefault()}>
                        <div className="flex justify-between items-center mb-4">
                           <h4 className="font-bold">{venue.name}</h4>
                            <button onClick={() => setOpenPopover(null)} className="p-1 rounded-full hover:bg-muted">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {eventsByVenue[venue.name].ongoing.length > 0 && (
                                <div>
                                <h5 className="font-semibold text-primary mb-2">Ongoing Events</h5>
                                {eventsByVenue[venue.name].ongoing.map(event => (
                                    <div key={event.id} className="p-2 rounded-md bg-muted/50 mb-2">
                                        <p className="font-bold">{event.name}</p>
                                        <p className="text-sm text-muted-foreground">{getClubName(event.clubId)}</p>
                                        <div className="flex items-center gap-4 text-xs mt-1">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {event.startTime}-{event.endTime}</span>
                                            <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {event.participants}</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            )}
                             {eventsByVenue[venue.name].upcoming.length > 0 && (
                                <div>
                                <h5 className="font-semibold text-accent mb-2">Upcoming Events</h5>
                                {eventsByVenue[venue.name].upcoming.map(event => (
                                     <div key={event.id} className="p-2 rounded-md bg-muted/50 mb-2">
                                        <p className="font-bold">{event.name}</p>
                                        <p className="text-sm text-muted-foreground">{getClubName(event.clubId)}</p>
                                        <div className="flex items-center gap-4 text-xs mt-1">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {event.startTime}-{event.endTime}</span>
                                            <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {event.participants}</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            )}
                        </div>
                    </PopoverContent>
                )}
              </Popover>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
