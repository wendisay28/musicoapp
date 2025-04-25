import { useState, useEffect } from "react";
import { useLocation } from "@/context/location-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import GeoRecommendedArtists from "@/components/geo-recommended-artists";
import PageHeader from "./components/PageHeader";
import EmptyEventsMessage from "./components/EmptyEventsMessage";
import getLocationTitle from "./utils/getLocationTitle";

export default function GeoRecommendationsPage() {
  const { locationData } = useLocation();
  const [activeTab, setActiveTab] = useState("artists");
  const [locationTitle, setLocationTitle] = useState("Recomendaciones");

  useEffect(() => {
    setLocationTitle(getLocationTitle(locationData));
  }, [locationData]);

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title={locationTitle} address={locationData.address} showCoordinates={!!locationData.coordinates} />

      <Tabs defaultValue={activeTab} onChange={(event) => setActiveTab((event.target as HTMLDivElement).getAttribute('data-value') || '')}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="artists" className="flex-1">Artistas</TabsTrigger>
          <TabsTrigger value="events" className="flex-1 flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Eventos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          <GeoRecommendedArtists />
        </TabsContent>

        <TabsContent value="events">
          <EmptyEventsMessage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
