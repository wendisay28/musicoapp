import { JSX } from 'react';
import { LayoutDashboard, Users, Shield, BarChart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { LucideIcon } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface Section {
  id: string;
  label: string;
  icon: LucideIcon;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps): JSX.Element {
  const { logout } = useAuth({});
  const sections: Section[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            id: 'users',
            label: 'Usuarios',
            icon: Users
        },
        {
            id: 'moderation',
            label: 'Moderación',
            icon: Shield
        },
        {
            id: 'reports',
            label: 'Reportes',
            icon: BarChart
        },
        {
            id: 'settings',
            label: 'Configuración',
            icon: Settings
        }
    ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>
      <nav className="p-4 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon as any;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeSection === section.id
                                ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {section.label}
            </button>
          );
        })}
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md mt-8"
        >
          {(LogOut as any)({ className: "mr-3 h-5 w-5" })}
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
