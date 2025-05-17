import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { AvailabilityForm } from './form/AvailabilityForm';

interface AvailabilitySectionProps {
  defaultDates?: string[];
  onChange?: (dates: string[]) => void;
}

export function AvailabilitySection({
  defaultDates,
  onChange,
}: AvailabilitySectionProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidad</CardTitle>
      </CardHeader>
      <CardContent>
        <AvailabilityForm defaultDates={defaultDates} onChange={onChange} />
      </CardContent>
    </Card>
  );
}
