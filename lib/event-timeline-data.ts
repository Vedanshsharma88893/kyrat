export type TimelineEvent = {
    id: string;
    date: string;  // e.g., "Day 0"
    time: string;  // e.g., "6:00 PM"
    name: string;  // event name
    venue: string; // e.g., "GH BBC"
};

export const timelineEvents: TimelineEvent[] = [
    // DAY 0
    {
        id: 'day0-marathon',
        date: 'Day 0',
        time: '9:00 PM - 1:00 AM',
        name: 'Marathon Film Screening',
        venue: 'Two 60 Seaters Ground Floor',
    },
    // DAY 1
    {
        id: 'day1-minuteverse',
        date: 'Day 1',
        time: '8:00 AM - 1:30 PM',
        name: 'MINUTEVERSE - Scene Recreation',
        venue: '150 Seater 1st Floor (1003)',
    },
    {
        id: 'day1-objectified',
        date: 'Day 1',
        time: '2:30 PM - 4:30 PM',
        name: 'Objectified',
        venue: '150 Seater 1st Floor (1003)',
    },
    {
        id: 'day1-amongus',
        date: 'Day 1',
        time: '9:30 AM - 12:30 PM',
        name: 'Among Us',
        venue: '3rd Floor 90 Seater (3003)',
    },
    {
        id: 'day1-lyriclabyrinth',
        date: 'Day 1',
        time: '1:00 PM - 5:00 PM',
        name: 'Lyric Labyrinth',
        venue: '150 Seater 2nd Floor (2003)',
    },
    {
        id: 'day1-queertrivia',
        date: 'Day 1',
        time: '10:00 AM - 12:00 PM',
        name: 'Queer Trivia',
        venue: '3rd Floor 90 Seater (3004)',
    },
    {
        id: 'day1-filmscreening',
        date: 'Day 1',
        time: '1:00 PM - 5:00 PM',
        name: 'Marathon Film Screening',
        venue: 'Two 60 Seaters Ground Floor',
    },
    // DAY 2
    {
        id: 'day2-pandora',
        date: 'Day 2',
        time: '10:30 AM - 5:00 PM',
        name: 'Project Pandora',
        venue: '150 Seater 2nd Floor (2003)',
    },
    {
        id: 'day2-amongus',
        date: 'Day 2',
        time: '8:00 AM - 11:00 AM',
        name: 'Among Us',
        venue: '3rd Floor 90 Seater (3003)',
    },
    {
        id: 'day2-cosplay',
        date: 'Day 2',
        time: '10:00 AM - 1:30 PM',
        name: 'Cosplay',
        venue: '3rd Floor 90 Seater (3004)',
    },
    {
        id: 'day2-filmquiz',
        date: 'Day 2',
        time: '2:00 PM - 5:30 PM',
        name: 'Film Music & Entertainment Quiz',
        venue: '150 Seater 1st Floor (1003)',
    },
    {
        id: 'day2-bridged',
        date: 'Day 2',
        time: '10:00 AM - 12:30 PM',
        name: 'Bridged by Brushes - Theme Twist',
        venue: 'BH Lobby',
    },
    {
        id: 'day2-dancebattle',
        date: 'Day 2',
        time: '1:30 PM - 5:00 PM',
        name: 'Dance Battle',
        venue: 'BH BBC',
    },
    {
        id: 'day2-proshows',
        date: 'Day 2',
        time: '7:30 PM',
        name: 'PRO SHOWS',
        venue: 'Main Stage',
    },
];
