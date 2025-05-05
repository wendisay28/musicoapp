import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Calendar } from "../../../../../components/ui/calendar";

interface AvailabilityCalendarProps {
  availableDates: Date[];
}

export function AvailabilityCalendar({ availableDates }: AvailabilityCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidad</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={availableDates}
          className="rounded-md border"
          disabled={(date) => !availableDates.some(d => d.getTime() === date.getTime())}
        />
      </CardContent>
    </Card>
  );
} 