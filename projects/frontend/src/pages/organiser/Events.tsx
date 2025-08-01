import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useEventContext } from '@/context/EventContext';
import { formatDate, formatTime } from '@/utils/formatDateTime';

interface MockEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  instances: MockInstance[];
}

interface MockInstance {
  id: string;
  date: string;
  time: string;
  venue: string;
  artists: string[];
  ticketsSold: number;
  totalTickets: number;
}

const Events = () => {
  const { events, loading, calculateSeatTotals } = useEventContext();
  const [openEvents, setOpenEvents] = useState<string[]>([]);

  const toggleEvent = (event_id: string) => {
    setOpenEvents((prev) =>
      prev.includes(event_id)
        ? prev.filter((id) => id !== event_id)
        : [...prev, event_id]
    );
  };

  const mockEvents: MockEvent[] = [
    {
      id: '1',
      name: 'Summer Music Festival',
      description:
        'A spectacular outdoor music festival featuring top artists from around the world.',
      category: 'Music',
      instances: [
        {
          id: '1-1',
          date: 'July 15, 2024',
          time: '7:00 PM',
          venue: 'Central Park',
          artists: ['The Waves', 'Electric Dreams'],
          ticketsSold: 245,
          totalTickets: 500,
        },
        {
          id: '1-2',
          date: 'July 16, 2024',
          time: '7:00 PM',
          venue: 'Central Park',
          artists: ['Rock Legends', 'Jazz Collective'],
          ticketsSold: 189,
          totalTickets: 500,
        },
      ],
    },
    {
      id: '2',
      name: 'Tech Conference 2024',
      description:
        'Leading technology conference covering AI, blockchain, and future innovations.',
      category: 'Technology',
      instances: [
        {
          id: '2-1',
          date: 'July 22, 2024',
          time: '9:00 AM',
          venue: 'Convention Center',
          artists: ['Dr. Sarah Chen', 'Mike Rodriguez'],
          ticketsSold: 180,
          totalTickets: 300,
        },
      ],
    },
    {
      id: '3',
      name: 'Art Gallery Opening',
      description:
        'Exclusive preview of contemporary art from emerging local artists.',
      category: 'Arts',
      instances: [
        {
          id: '3-1',
          date: 'July 28, 2024',
          time: '6:00 PM',
          venue: 'Modern Art Museum',
          artists: ['Elena Rodriguez', 'Marcus Thompson'],
          ticketsSold: 67,
          totalTickets: 100,
        },
      ],
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: 'bg-blue-100 text-blue-800',
      Technology: 'bg-green-100 text-green-800',
      Art: 'bg-purple-100 text-purple-800',
      Food: 'bg-orange-100 text-orange-800',
    };
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage all your events and their instances
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const isOpen = openEvents.includes((event.event_id).toString());
          const totalInstances = event.EventInstances.length;
          // const { total_seats, available_seats } = calculateSeatTotals(event.);
          // const totalTicketsSold = event.instances.reduce(
          //   (sum, instance) => sum + instance.ticketsSold,
          //   0
          // );
          // const totalTicketsAvailable = event.instances.reduce(
          //   (sum, instance) => sum + instance.totalTickets,
          //   0
          // );

          return (
            <Card
              key={event.event_id}
              className="bg-gradient-card shadow-card border-0"
            >
              <Collapsible
                open={isOpen}
                onOpenChange={() => toggleEvent(event.event_id.toString())}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-accent/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div>
                          <CardTitle className="text-xl">
                            {event.name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={getCategoryColor(event.Category.name)}
                        >
                          {event.Category.name}
                        </Badge>
                        <div className="text-right text-sm">
                          <p className="font-medium">
                            {totalInstances} instances
                          </p>
                          {/* <p className="text-muted-foreground">
                            {totalTicketsSold}/{totalTicketsAvailable} tickets
                            sold
                          </p> */}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Event Instances
                      </h4>
                      {event.EventInstances.map((instance) => {
                        const { total_seats, available_seats } =
                          calculateSeatTotals(instance.instance_id);

                        return (
                          <div
                            key={instance.instance_id}
                            className="p-4 rounded-lg bg-background/60 border"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {formatDate(instance.date_time)} at{' '}
                                      {formatTime(instance.date_time)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{instance.Venue.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  {/* <span>Artists: {instance.artists.join(', ')}</span> */}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right text-sm">
                                  <p className="font-medium">
                                    {total_seats - available_seats} /{' '}
                                    {total_seats}
                                  </p>
                                  <p className="text-muted-foreground">
                                    tickets sold
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-3 w-3" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
