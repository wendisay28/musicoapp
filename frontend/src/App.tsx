import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '../src/components/ui/toaster';
import { AuthProvider, useAuth } from '../src/features/auth/hooks/useAuth';
import { MainLayout } from '../src/components/layout/MainLayout';
import { Home } from '../src/pages/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <div>Contenido protegido</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;