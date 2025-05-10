import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';

interface EventStatsProps {
  totalEvents: number;
  activeEvents: number;
  upcomingEvents: number;
}

export function EventStats({ totalEvents, activeEvents, upcomingEvents }: EventStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Eventos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{activeEvents}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{upcomingEvents}</p>
        </CardContent>
      </Card>
    </div>
  );
}
