import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/auth-context";
import { LocationProvider } from "./context/location-context";
import { LoadingSpinner } from './components/ui/loading-spinner';
import BottomNavigation from "./components/bottom-navigation";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";

// Inicializamos Sentry (asegurate de que el archivo `sentry.ts` esté importado)
import "./sentry"; // Este archivo es el que configuramos en el paso anterior

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'));
const ExplorerPage = lazy(() => import('./pages/ExplorerPage'));
const ArtistProfilePage = lazy(() => import('./pages/artist/[id]/ArtistProfilePage'));
const EventDetailsPage = lazy(() => import('./pages/events/EventDetailsPage'));
const EventCreatePage = lazy(() => import('./pages/events/create/CreateEventPage'));
const FavoritesPage = lazy(() => import('./pages/favorites'));
const ChatPage = lazy(() => import('./pages/chat-page'));
const CreateArtistProfile = lazy(() => import('./pages/ProfileArt/create-artist-profile/create-artist-profile'));

ReactDOM.render(
  <Sentry.ErrorBoundary fallback={<p>Something went wrong!</p>}>
    <MainApp/>
  </Sentry.ErrorBoundary>,
  document.getElementById("root")
);

function MainApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorer" element={<ExplorerPage />} />
                <Route path="/artist/:id" element={<ArtistProfilePage />} />
                <Route path="/events/:id" element={<EventDetailsPage />} />
                <Route path="/events/create" element={<EventCreatePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/create-artist-profile" element={<CreateArtistProfile />} />
              </Routes>
            </Suspense>
            <BottomNavigation />
          </Router>
          <Toaster />
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MainApp;
