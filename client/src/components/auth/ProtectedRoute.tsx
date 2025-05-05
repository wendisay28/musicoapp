import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/use-firebase-auth';
import { auth } from '../../lib/firebase';

type UserRole = 'admin' | 'artist' | 'client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
  redirectPath?: string;
}

export function ProtectedRoute({ 
  children, 
  roles = [], 
  redirectPath = '/login' 
}: ProtectedRouteProps) {
  const { isLoading } = useFirebaseAuth();
  const user = auth.currentUser;
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (roles.length > 0) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 