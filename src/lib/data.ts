import type { Club, Event, Schedule, SponsorTier, TeamMember, Venue } from "@/types";

export const clubs: Club[] = [
  { id: "club-1", name: "Groove Masters", logoId: "club-logo-1" },
  { id: "club-2", name: "Art Explorers", logoId: "club-logo-2" },
  { id: "club-3", name: "Culinary Crew", logoId: "club-logo-3" },
];

export const venues: Venue[] = [
  { id: "academic-block", name: "Academic Block" },
  { id: "science-block", name: "Science Block" },
  { id: "library", name: "Library" },
  { id: "auditorium", name: "Auditorium" },
  { id: "sports-complex", name: "Sports Complex" },
  { id: "student-center", name: "Student Center" },
  { id: "dining-hall", name: "Dining Hall" },
  { id: "boys-hostel", name: "Boys Hostel" },
  { id: "girls-hostel", name: "Girls Hostel" },
  { id: "medical-center", name: "Medical Center" },
  { id: "parking", name: "Parking" },
];

export const events: Event[] = [
  {
    description: "Start your day with high-energy beats and a fitness rave that gets your heart pumping.",
    id: "evt-001",
    clubId: "club-1",
    name: "Sunrise Beats",
    date: "2024-10-25",
    startTime: "06:00",
    endTime: "09:00",
    venue: "Sports Complex",
    status: "Upcoming",
    participants: 120,
    imageId: "event-music",
  },
  {
    description: "Experience the campus transformed by light and shadow in this immersive night walk.",
    id: "evt-002",
    clubId: "club-2",
    name: "Luminous Art Walk",
    date: "2024-10-25",
    startTime: "19:00",
    endTime: "22:00",
    venue: "Student Center",
    status: "Upcoming",
    participants: 85,
    imageId: "event-art",
  },
  {
    description: "Taste the world with our international food festival featuring cuisines from over 20 countries.",
    id: "evt-003",
    clubId: "club-3",
    name: "Global Food Village",
    date: "2024-10-25",
    startTime: "12:00",
    endTime: "21:00",
    venue: "Dining Hall",
    status: "Ongoing",
    participants: 250,
    imageId: "event-food",
  },
  {
    description: "Immerse yourself in a night of electronic soundscapes and visual projections.",
    id: "evt-004",
    clubId: "club-1",
    name: "Electronic Dreams",
    date: "2024-10-25",
    startTime: "22:00",
    endTime: "02:00",
    venue: "Auditorium",
    status: "Upcoming",
    participants: 300,
    imageId: "gallery-4",
  },
  {
    description: "Watch talented artists bring walls to life in real-time with vibrant spray paint and brushes.",
    id: "evt-005",
    clubId: "club-2",
    name: "Live Mural Painting",
    date: "2024-10-25",
    startTime: "14:00",
    endTime: "18:00",
    venue: "Academic Block",
    status: "Ongoing",
    participants: 40,
    imageId: "gallery-6"
  },
  {
    description: "Sample the finest local brews and learn from the masters of the craft beer industry.",
    id: "evt-006",
    clubId: "club-3",
    name: "Craft Beer Tasting",
    date: "2024-10-26",
    startTime: "16:00",
    endTime: "18:00",
    venue: "Student Center",
    status: "Upcoming",
    participants: 75,
    imageId: "event-food-2"
  },
  {
    description: "Chill vibes and acoustic tunes as the sun goes down, perfect for unwinding.",
    id: "evt-007",
    clubId: "club-1",
    name: "Acoustic Sunset",
    date: "2024-10-26",
    startTime: "18:00",
    endTime: "20:00",
    venue: "Sports Complex",
    status: "Upcoming",
    participants: 150,
    imageId: "gallery-5"
  },
  {
    description: "Touch, play, and interact with large-scale kinetic installations scattered across the garden.",
    id: "evt-008",
    clubId: "club-2",
    name: "Interactive Sculpture Garden",
    date: "2024-10-26",
    startTime: "11:00",
    endTime: "19:00",
    venue: "Science Block",
    status: "Upcoming",
    participants: 95,
    imageId: "event-art-2"
  },
];


export const schedule: Schedule = {
  day1: [
    { id: "sch-001", eventId: "evt-001", startTime: "18:00", endTime: "19:00", stage: "Tidal Stage", performer: "Oceanic Overtures" },
    { id: "sch-002", eventId: "evt-002", startTime: "19:30", endTime: "20:30", stage: "Reef Stage", performer: "Coral Collective" },
    { id: "sch-003", eventId: "evt-001", startTime: "21:00", endTime: "22:00", stage: "Tidal Stage", performer: "DJ Abyss" },
    { id: "sch-004", eventId: "evt-002", startTime: "22:30", endTime: "23:30", stage: "Reef Stage", performer: "The Aquanauts" },
    { id: "sch-005", eventId: "evt-001", startTime: "00:00", endTime: "01:00", stage: "Tidal Stage", performer: "Midnight Tides" },
  ],
  day2: [
    { id: "sch-006", eventId: "evt-001", startTime: "17:00", endTime: "18:00", stage: "Tidal Stage", performer: "Sunset Sirens" },
    { id: "sch-007", eventId: "evt-002", startTime: "18:30", endTime: "19:30", stage: "Reef Stage", performer: "Kelp Forest Funk" },
    { id: "sch-008", eventId: "evt-001", startTime: "20:00", endTime: "21:00", stage: "Tidal Stage", performer: "Marina & The Diamonds (Tribute)" },
    { id: "sch-009", eventId: "evt-002", startTime: "21:30", endTime: "22:30", stage: "Reef Stage", performer: "Deep Sea Dub" },
    { id: "sch-010", eventId: "evt-001", startTime: "23:00", endTime: "00:00", stage: "Tidal Stage", performer: "Closing Ceremony: Bioluminescence" },
  ],
};

export const sponsors: SponsorTier = {
  platinum: [
    { id: "spn-001", name: "Aurora Dynamics", logoId: "sponsor-aurora", tier: "Platinum", website: "#" },
    { id: "spn-002", name: "Solstice Corp", logoId: "sponsor-solstice", tier: "Platinum", website: "#" },
  ],
  gold: [
    { id: "spn-003", name: "Equinox Industries", logoId: "sponsor-equinox", tier: "Gold", website: "#" },
    { id: "spn-004", name: "Nebula Ventures", logoId: "sponsor-nebula", tier: "Gold", website: "#" },
    { id: "spn-005", name: "Nova Solutions", logoId: "sponsor-nova", tier: "Gold", website: "#" },
  ],
};

export const team: TeamMember[] = [
  {
    id: "tm-001",
    name: "Alex Rivera",
    title: "Festival Director",
    bio: "Visionary leader passionate about creating unforgettable experiences.",
    imageId: "team-1",
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: "tm-002",
    name: "Samira Khan",
    title: "Artistic Director",
    bio: "Curator of the festival's vibrant and diverse artistic lineup.",
    imageId: "team-2",
    social: { instagram: "#", linkedin: "#" }
  },
  {
    id: "tm-003",
    name: "Leo Chen",
    title: "Operations Manager",
    bio: "The organizational mastermind ensuring everything runs smoothly.",
    imageId: "team-3",
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: "tm-004",
    name: "Maya Singh",
    title: "Sponsorship Coordinator",
    bio: "Building strong partnerships to bring the festival to life.",
    imageId: "team-4",
    social: { linkedin: "#" }
  },
  {
    id: "tm-005",
    name: "Ben Carter",
    title: "Volunteer Captain",
    bio: "Leading our amazing team of dedicated festival volunteers.",
    imageId: "team-5",
    social: { instagram: "#" }
  },
  {
    id: "tm-006",
    name: "Olivia Reed",
    title: "Marketing Lead",
    bio: "Spreading the word and sharing the magic of the festival.",
    imageId: "team-6",
    social: { twitter: "#", instagram: "#" }
  },
];
