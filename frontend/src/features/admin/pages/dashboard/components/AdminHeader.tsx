import { JSX } from 'react';

export function AdminHeader(): JSX.Element {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Panel de Administración</h1>
      </div>
    </header>
  );
} 