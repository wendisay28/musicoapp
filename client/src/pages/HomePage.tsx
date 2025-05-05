import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { SearchInput } from '../components/ui/SearchInput';
import { useFirebaseAuth } from '../hooks/use-firebase-auth';
import { auth } from '../firebase/config'; // Importa auth directamente desde Firebase

export default function HomePage() {
  const { isLoading } = useFirebaseAuth();
  const user = auth.currentUser; // Obtén el usuario directamente desde auth

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Conecta con los mejores artistas
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encuentra y contrata artistas para tus proyectos creativos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/artists">Explorar Artistas</Link>
              </Button>
              {!user && !isLoading && (
                <Button size="lg" variant="outline" asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resto del componente... */}
    </div>
  );
}