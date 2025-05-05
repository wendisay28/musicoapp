declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options?: MapOptions);
  }

  class Marker {
    constructor(options?: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    zoom: number;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map | null;
    title?: string;
  }

  interface LatLng {
    lat: number;
    lng: number;
  }
} 