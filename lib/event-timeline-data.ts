export type TimelineEvent = {
    id: string;
    date: string;  // e.g., "13 Dec 2025"
    time: string;  // e.g., "09:30 AM"
    name: string;  // event name
    venue: string; // e.g., "Main Stage"
};

export const timelineEvents: TimelineEvent[] = [
    {
        id: 'inaug',
        date: '13 Dec 2025',
        time: '09:30 AM',
        name: 'Inauguration',
        venue: 'Main Stage',
    },
    {
        id: 'workshops',
        date: '13 Dec 2025',
        time: '11:00 AM',
        name: 'Workshops',
        venue: 'Seminar Hall',
    },
    {
        id: 'cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
    {
        id: '2cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
    {
        id: '3cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
    {
        id: '4cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
    {
        id: '5cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
    {
        id: '6cultural-night',
        date: '13 Dec 2025',
        time: '06:30 PM',
        name: 'Cultural Night',
        venue: 'Open Air Theatre',
    },
];
