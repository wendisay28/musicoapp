import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/features/auth/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Home } from '@/pages/Home';

const queryClient = new QueryClient();

const AuthProviderComponent = AuthProvider as any;
const MainLayoutComponent = MainLayout as any;
const RoutesComponent = Routes as any;
const RouteComponent = Route as any;

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderComponent>
        <Router>
          <MainLayoutComponent>
            <RoutesComponent>
              <RouteComponent path="/" element={<Home />} />
            </RoutesComponent>
          </MainLayoutComponent>
        </Router>
        <Toaster />
      </AuthProviderComponent>
    </QueryClientProvider>
  );
}
