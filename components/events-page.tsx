"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { clubs, events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Club, Event } from '@/types';
import { MapPin, Clock, Search, X, Sparkles, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'all' | 'club' | 'venue' | 'status';

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedValue, setSelectedValue] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getImage = (imageId: string) => PlaceHolderImages.find((img) => img.id === imageId);
  const getClub = (clubId: string) => clubs.find((c) => c.id === clubId);

  const venues = useMemo(() => [...new Set(events.map(e => e.venue))], []);
  const statuses = useMemo(() => [...new Set(events.map(e => e.status))], []);

  const filteredEvents = useMemo(() => {
    let results = events;

    if (searchTerm) {
      results = results.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getClub(event.clubId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedValue !== 'all') {
      switch (activeFilter) {
        case 'club':
          results = results.filter(e => e.clubId === selectedValue);
          break;
        case 'venue':
          results = results.filter(e => e.venue === selectedValue);
          break;
        case 'status':
          results = results.filter(e => e.status === selectedValue);
          break;
      }
    }

    return results;
  }, [searchTerm, activeFilter, selectedValue]);

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

  const filterTabs = [
    { id: 'all' as FilterType, label: 'All Events' },
    { id: 'club' as FilterType, label: 'By Club' },
    { id: 'venue' as FilterType, label: 'By Venue' },
    { id: 'status' as FilterType, label: 'By Status' },
  ];

  const getFilterOptions = (filter: FilterType) => {
    switch (filter) {
      case 'club': return clubs.map(c => ({ id: c.id, name: c.name }));
      case 'venue': return venues.map(v => ({ id: v, name: v }));
      case 'status': return statuses.map(s => ({ id: s, name: s }));
      default: return [];
    }
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSelectedValue('all');
    setSearchTerm('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return { bg: 'rgba(239, 68, 68, 0.9)', glow: 'rgba(239, 68, 68, 0.4)' };
      case 'Upcoming': return { bg: 'rgba(34, 197, 94, 0.9)', glow: 'rgba(34, 197, 94, 0.4)' };
      case 'Completed': return { bg: 'rgba(100, 116, 139, 0.9)', glow: 'rgba(100, 116, 139, 0.4)' };
      default: return { bg: 'rgba(139, 92, 246, 0.9)', glow: 'rgba(139, 92, 246, 0.4)' };
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-8 pb-12 px-4 md:px-8 lg:px-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.25))',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              }}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Explore Amazing Experiences</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Discover Events
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Find and explore all the exciting events happening at Kyrat Festival
            </p>
          </motion.div>

          {/* Search & Filter Bar - Industry Standard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-30"
          >
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Search Input - Proper Height & Spacing */}
              <div className="relative">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  }}
                >
                  <Search className="h-5 w-5 text-violet-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search events, clubs, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-16 pl-[72px] pr-14 rounded-xl text-base text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:ring-2 focus:ring-violet-500/40"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-white/50" />
                  </button>
                )}
              </div>

              {/* Filter Tabs - Better Spacing */}
              <div className="flex flex-wrap gap-3 mt-5">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFilter(tab.id);
                      setSelectedValue('all');
                    }}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeFilter === tab.id
                        ? 'text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    style={activeFilter === tab.id ? {
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6))',
                      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                    } : {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}

                {/* Clear Button */}
                {(activeFilter !== 'all' || searchTerm) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearFilters}
                    className="px-5 py-3 rounded-xl text-sm text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </motion.button>
                )}
              </div>

              {/* Sub-filter Options */}
              <AnimatePresence>
                {activeFilter !== 'all' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/10">
                      <button
                        onClick={() => setSelectedValue('all')}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${selectedValue === 'all'
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        All
                      </button>
                      {getFilterOptions(activeFilter).map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedValue(option.id)}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${selectedValue === option.id
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Count */}
              <div className="mt-5 pt-4 border-t border-white/5 text-sm text-white/40">
                Showing <span className="text-white/70 font-medium">{filteredEvents.length}</span> of {events.length} events
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="px-4 md:px-8 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + selectedValue + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {Object.values(groupedByClub).map((clubData, clubIndex) => (
                <motion.section
                  key={clubData.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: clubIndex * 0.1 }}
                >
                  {/* Club Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="relative h-14 w-14 rounded-2xl overflow-hidden flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4))',
                        border: '2px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {getImage(clubData.logoId)?.imageUrl ? (
                        <Image
                          src={getImage(clubData.logoId)?.imageUrl || ''}
                          alt={clubData.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {clubData.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {clubData.name}
                      </h2>
                      <p className="text-white/40 text-sm mt-0.5">
                        {clubData.events.length} event{clubData.events.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Event Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubData.events.map((event, eventIndex) => {
                      const statusColor = getStatusColor(event.status);
                      const eventImage = getImage(event.imageId);

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: eventIndex * 0.08 }}
                          onMouseEnter={() => setHoveredCard(event.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className="group"
                        >
                          <div
                            className="relative rounded-2xl overflow-hidden h-full transition-all duration-500 cursor-pointer"
                            style={{
                              background: 'rgba(255, 255, 255, 0.06)',
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              boxShadow: hoveredCard === event.id
                                ? '0 24px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(139, 92, 246, 0.3)'
                                : '0 8px 32px rgba(0, 0, 0, 0.2)',
                              transform: hoveredCard === event.id ? 'translateY(-6px)' : 'translateY(0)',
                            }}
                          >
                            {/* Image Section */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                              {eventImage?.imageUrl ? (
                                <Image
                                  src={eventImage.imageUrl}
                                  alt={event.name}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div
                                  className="w-full h-full"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                                  }}
                                />
                              )}

                              {/* Gradient Overlays */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                              {/* Status Badge */}
                              <div
                                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                                style={{
                                  background: statusColor.bg,
                                  boxShadow: `0 4px 12px ${statusColor.glow}`,
                                }}
                              >
                                {event.status}
                              </div>

                              {/* Event Title on Image */}
                              <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                                  {event.name}
                                </h3>
                              </div>
                            </div>

                            {/* Info Section - Proper Spacing */}
                            <div className="p-5">
                              {/* Time & Venue Info */}
                              <div className="space-y-3 mb-5">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(139, 92, 246, 0.15)' }}
                                  >
                                    <Clock className="w-4 h-4 text-violet-400" />
                                  </div>
                                  <span className="text-white/70 text-sm">
                                    {event.startTime} - {event.endTime}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(236, 72, 153, 0.15)' }}
                                  >
                                    <MapPin className="w-4 h-4 text-pink-400" />
                                  </div>
                                  <span className="text-white/70 text-sm truncate">
                                    {event.venue}
                                  </span>
                                </div>
                              </div>

                              {/* View Button */}
                              <button
                                className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.25))',
                                  border: '1px solid rgba(139, 92, 246, 0.3)',
                                }}
                              >
                                <span className="text-white/90">View Details</span>
                                <ArrowRight className="w-4 h-4 text-violet-400 transition-transform duration-300 group-hover:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              ))}

              {/* Empty State */}
              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <div
                    className="p-10 rounded-3xl text-center max-w-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                      }}
                    >
                      <Calendar className="w-10 h-10 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">No events found</h3>
                    <p className="text-white/50 text-sm mb-6 leading-relaxed">
                      Try adjusting your search or filter to find what you&apos;re looking for.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-8 py-3.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6))',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
