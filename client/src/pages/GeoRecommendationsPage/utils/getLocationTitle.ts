interface LocationData {
    address?: string;
    coordinates?: any;
  }
  
  export default function getLocationTitle(locationData: LocationData): string {
    if (locationData.address) {
      const parts = locationData.address.split(",");
      const city = parts.length > 2
        ? parts[parts.length - 3].trim()
        : parts[parts.length - 2]?.trim() || locationData.address;
      return `Cerca de ${city}`;
    }
  
    if (locationData.coordinates) {
      return "Cerca de tu ubicación";
    }
  
    return "Recomendaciones";
  }
  