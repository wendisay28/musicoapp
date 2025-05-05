import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative h-[600px] bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-6">
          Conecta con el Arte en tu Ciudad
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Descubre artistas locales, eventos culturales y experiencias únicas cerca de ti
        </p>
        <div className="flex gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/explorer')}
            className="bg-white text-purple-600 hover:bg-purple-100"
          >
            Explorar
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/create-artist-profile')}
            className="border-white text-white hover:bg-white/10"
          >
            Soy Artista
          </Button>
        </div>
      </div>
    </div>
  );
} 