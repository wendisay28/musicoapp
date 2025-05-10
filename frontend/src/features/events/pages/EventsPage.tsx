// src/features/events/pages/EventsPage.tsx

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { apiRequest } from "@/lib/api"
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  category: string
  date: string
  time: string
  location: string
  participants: number
  mediaUrl?: string
  currentParticipants?: string[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiRequest("/events", "GET")
        setEvents(response.data)
      } catch (error) {
        toast({
          title: "Error al cargar los eventos",
          description: "Inténtalo de nuevo más tarde",
          variant: "destructive",
        })
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200">
          {event.mediaUrl && (
            <div className="w-full h-48 overflow-hidden rounded-t-md">
              <video
                src={event.mediaUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardContent className="space-y-2">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <Badge variant="secondary">{event.category}</Badge>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span>{event.currentParticipants?.length ?? 0} / {event.participants} participantes</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
