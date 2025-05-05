import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl">Página no encontrada</p>
      <Link 
        to="/" 
        className="mt-8 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}