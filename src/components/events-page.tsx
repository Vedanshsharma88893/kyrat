"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { clubs, events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Club, Event } from '@/types';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Clock, Users, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'club' | 'venue' | 'status' | 'time' | 'all';

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('all');

  const getImage = (imageId: string) => PlaceHolderImages.find((img) => img.id === imageId);
  const getClub = (clubId: string) => clubs.find((c) => c.id === clubId);

  const venues = useMemo(() => [...new Set(events.map(e => e.venue))], []);
  const statuses = useMemo(() => [...new Set(events.map(e => e.status))], []);
  const times = useMemo(() => ['Morning (6-12)', 'Afternoon (12-18)', 'Evening (18-24)', 'Night (0-6)'], []);
  
  const filteredEvents = useMemo(() => {
    let results = events;

    // Search filter
    if (searchTerm) {
      results = results.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getClub(event.clubId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Tabs filter
    if (selectedFilterValue !== 'all') {
      switch (activeFilter) {
        case 'club':
          results = results.filter(e => e.clubId === selectedFilterValue);
          break;
        case 'venue':
          results = results.filter(e => e.venue === selectedFilterValue);
          break;
        case 'status':
          results = results.filter(e => e.status === selectedFilterValue);
          break;
        case 'time':
            const [start, end] = selectedFilterValue.match(/\d+/g)?.map(Number) || [0,0];
            results = results.filter(e => {
                const eventStartHour = parseInt(e.startTime.split(':')[0]);
                return eventStartHour >= start && eventStartHour < end;
            });
            break;
      }
    }
    
    return results;
  }, [searchTerm, activeFilter, selectedFilterValue]);

  const groupedByClub = useMemo(() => {
    return filteredEvents.reduce((acc, event) => {
      const club = getClub(event.clubId);
      if (club) {
        if (!acc[club.id]) {
          acc[club.id] = { ...club, events: [] };
        }
        acc[club.id].events.push(event);
      }
      return acc;
    }, {} as Record<string, Club & { events: Event[] }>);
  }, [filteredEvents]);

  const handleFilterChange = (filterType: FilterType, value: string) => {
    setActiveFilter(filterType);
    setSelectedFilterValue(value);
  }

  const filters = {
    club: clubs.map(c => c.id),
    venue: venues,
    status: statuses,
    time: times
  };
  
  const filterNames = {
    club: clubs.reduce((acc, c) => ({...acc, [c.id]: c.name}), {} as Record<string, string>),
    venue: venues.reduce((acc, v) => ({...acc, [v]: v}), {}),
    status: statuses.reduce((acc, s) => ({...acc, [s]: s}), {}),
    time: times.reduce((acc, t) => ({...acc, [t]: t}), {})
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Festival Events</h1>
        <p className="text-muted-foreground mt-2 md:text-xl">
          Explore all the experiences our clubs have to offer.
        </p>
      </header>

      <div className="sticky top-16 bg-background/90 backdrop-blur-sm py-4 z-40 mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search events, clubs, or venues..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeFilter} onValueChange={(value) => handleFilterChange(value as FilterType, 'all')}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="all" className="h-10" onClick={() => handleFilterChange('all', 'all')}>All Events</TabsTrigger>
            <TabsTrigger value="club" className="h-10">By Club</TabsTrigger>
            <TabsTrigger value="venue" className="h-10">By Venue</TabsTrigger>
            <TabsTrigger value="status" className="h-10">By Status</TabsTrigger>
            <TabsTrigger value="time" className="h-10">By Time</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <AnimatePresence>
          {activeFilter !== 'all' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4">
              <Tabs value={selectedFilterValue} onValueChange={(value) => setSelectedFilterValue(value)}>
                <TabsList className="grid w-full h-auto" style={{gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`}}>
                  <TabsTrigger value="all">All</TabsTrigger>
                  {filters[activeFilter].map((value) => (
                    <TabsTrigger key={value} value={value}>
                      {filterNames[activeFilter][value]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + selectedFilterValue + searchTerm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {Object.values(groupedByClub).map(clubData => (
            <section key={clubData.id} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={getImage(clubData.logoId)?.imageUrl} alt={clubData.name} data-ai-hint={getImage(clubData.logoId)?.imageHint}/>
                  <AvatarFallback>{clubData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl md:text-3xl font-bold font-headline">{clubData.name}</h2>
                <Badge variant="secondary" className="text-base">{clubData.events.length}</Badge>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clubData.events.map(event => (
                  <Card key={event.id} className="overflow-hidden flex flex-col group">
                    <div className="relative">
                      <Image src={getImage(event.imageId)?.imageUrl || ''} alt={event.name} width={400} height={250} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={getImage(event.imageId)?.imageHint}/>
                       <Badge
                        variant={event.status === "Ongoing" ? "destructive" : "default"}
                        className="absolute top-2 right-2"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold font-headline mb-2 flex-grow">{event.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-2 mt-2">
                         <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4" />
                           <span>{event.startTime} - {event.endTime}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <MapPin className="w-4 h-4" />
                           <span>{event.venue}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <Users className="w-4 h-4" />
                           <span>{event.participants} participants</span>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
          {filteredEvents.length === 0 && (
             <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No events match your search.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
