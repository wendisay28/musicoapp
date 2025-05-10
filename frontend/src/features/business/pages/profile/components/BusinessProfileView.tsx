import { JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/ui/tabs';
import { BusinessSpaces } from '@/features/business/pages/profile/components/BusinessSpaces';
import { BusinessEvents } from '@/features/business/pages/profile/components/BusinessEvents';
import { BusinessCalendar } from '@/features/business/pages/profile/components/BusinessCalendar';
import { BusinessSettings } from '@/features/business/pages/profile/components/BusinessSettings';

interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  // Agrega más campos según necesites
}

interface BusinessProfileViewProps {
  profile: BusinessProfile;
}

const TabsComponent = Tabs as any;
const TabsListComponent = TabsList as any;
const TabsTriggerComponent = TabsTrigger as any;
const TabsContentComponent = TabsContent as any;

export function BusinessProfileView({ profile }: BusinessProfileViewProps): JSX.Element {
  return (
    <div className="space-y-6">
      <TabsComponent defaultValue="spaces" className="w-full">
        <TabsListComponent>
          <TabsTriggerComponent value="spaces">Espacios</TabsTriggerComponent>
          <TabsTriggerComponent value="events">Eventos</TabsTriggerComponent>
          <TabsTriggerComponent value="calendar">Calendario</TabsTriggerComponent>
          <TabsTriggerComponent value="settings">Configuración</TabsTriggerComponent>
        </TabsListComponent>
        <TabsContentComponent value="spaces">
          <BusinessSpaces businessId={profile.id} />
        </TabsContentComponent>
        <TabsContentComponent value="events">
          <BusinessEvents businessId={profile.id} />
        </TabsContentComponent>
        <TabsContentComponent value="calendar">
          <BusinessCalendar businessId={profile.id} />
        </TabsContentComponent>
        <TabsContentComponent value="settings">
          <BusinessSettings businessId={profile.id} />
        </TabsContentComponent>
      </TabsComponent>
    </div>
  );
}
