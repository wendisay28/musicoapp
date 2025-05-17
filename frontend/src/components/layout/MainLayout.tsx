import { type ReactNode } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { user, logout } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold hover:text-primary transition-colors"
            aria-label="Go to homepage"
          >
            ArtConect
          </Link>
          
          <nav 
            className="flex items-center gap-4" 
            role="navigation" 
            aria-label="Main navigation"
          >
            {user ? (
              <>
                <span className="text-sm">
                  Welcome, <span className="font-medium">{user.name}</span>
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => void logout()}
                  aria-label="Logout from your account"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main 
        className="flex-1 container mx-auto px-4 py-8" 
        role="main"
      >
        {children}
      </main>

      <footer 
        className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
        role="contentinfo"
      >
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            {currentYear} ArtConect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
