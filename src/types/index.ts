import { ReactNode } from "react";


export type Club = {
  id: string;
  name: string;
  logoId: string;
};

export type Event = {
  description: ReactNode;
  id: string;
  clubId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  status: 'Ongoing' | 'Upcoming';
  participants: number;
  imageId: string;
};

export type Venue = {
  id: string;
  name: string;
};

export type ScheduleItem = {
  id: string;
  eventId: string;
  startTime: string;
  endTime: string;
  stage: string;
  performer: string;
};

export type Schedule = {
  [key: string]: ScheduleItem[];
};

export type Sponsor = {
  id: string;
  name: string;
  logoId: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  website: string;
};

export type SponsorTier = {
  [key: string]: Sponsor[];
}

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageId: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
};
