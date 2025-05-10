import { useState, JSX } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AdminHeader } from '@/features/admin/pages/dashboard/components/AdminHeader';
import { AdminSidebar } from '@/features/admin/pages/dashboard/components/AdminSidebar';
import { AdminStats } from '@/features/admin/pages/dashboard/components/AdminStats';
import { UserManagement } from '@/features/admin/pages/dashboard/components/UserManagement';
import { ContentModeration } from '@/features/admin/pages/dashboard/components/ContentModeration';
import { Reports } from '@/features/admin/pages/dashboard/components/Reports';
import { Settings } from '@/features/admin/pages/dashboard/components/Settings';

export function AdminDashboard(): JSX.Element {
    const { user } = useAuth({});
    const [activeSection, setActiveSection] = useState('dashboard');

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
                <p className="text-muted-foreground mb-6">
                    No tienes permisos para acceder a esta sección
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            <div className="flex-1 overflow-auto">
                <AdminHeader />
                <main className="p-6">
                    {activeSection === 'dashboard' && (
                        <div className="space-y-6">
                            <AdminStats />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <UserManagement />
                                <ContentModeration />
                            </div>
                        </div>
                    )}
                    {activeSection === 'users' && <UserManagement />}
                    {activeSection === 'moderation' && <ContentModeration />}
                    {activeSection === 'reports' && <Reports />}
                    {activeSection === 'settings' && <Settings />}
                </main>
            </div>
        </div>
    );
}
