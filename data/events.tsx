export interface Event {
  id: string;
  // image: string;
  title: string;
  description: string;
  department: string;
  date: string;
  time: string;
  location: string;
  created_by?: string;
}

export const events: Event[] = [
  {
    id: '1',
    image: '@/assets/images/events-bg.jpg',
    title: 'Tech Meetup',
    description: 'Join us for an exciting tech discussion',
    department: 'Computer Science',
    date: '2025-02-10',
    time: '14:00',
    location: 'Main Auditorium',
    created_by: 'admin1-uuid',
  },
  {
    id: '2',
    image: '@/assets/images/events-bg.jpg',
    title: 'AI Workshop',
    description: 'Hands-on workshop on artificial intelligence',
    department: 'Data Science',
    date: '2025-02-15',
    time: '10:00',
    location: 'Lab 201',
    created_by: 'admin2-uuid',
  },
  {
    id: '3',
    image: '@/assets/images/events-bg.jpg',
    title: 'Hackathon 2025',
    description: '24-hour coding competition',
    department: 'Engineering',
    date: '2025-02-20',
    time: '09:00',
    location: 'Innovation Hub',
    created_by: 'admin1-uuid',
  },
];
