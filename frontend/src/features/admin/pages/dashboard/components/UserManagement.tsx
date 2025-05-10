import { JSX, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/shared/components/ui/table';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/features/shared/components/ui/dropdown-menu';
import { MoreHorizontal, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const TableComponent = Table as any;
const TableHeaderComponent = TableHeader as any;
const TableBodyComponent = TableBody as any;
const TableRowComponent = TableRow as any;
const TableHeadComponent = TableHead as any;
const TableCellComponent = TableCell as any;
const ButtonComponent = Button as any;
const InputComponent = Input as any;
const DropdownMenuComponent = DropdownMenu as any;
const DropdownMenuTriggerComponent = DropdownMenuTrigger as any;
const DropdownMenuContentComponent = DropdownMenuContent as any;
const DropdownMenuItemComponent = DropdownMenuItem as any;
const SearchIconComponent = SearchIcon as any;
const MoreHorizontalComponent = MoreHorizontal as any;

export function UserManagement(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async (): Promise<void> => {
    // Aquí se implementaría la llamada a la API
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Usuario Ejemplo',
        email: 'usuario@ejemplo.com',
        type: 'Cliente',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
    setUsers(mockUsers);
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (query: string): void => {
        setSearchQuery(query);
    // Implementar búsqueda real aquí
    };

  const handleAction = (action: 'edit' | 'delete' | 'suspend', userId: string): void => {
        switch (action) {
            case 'edit':
        // lógica de edición
                break;
            case 'delete':
        // lógica de eliminación
                break;
            case 'suspend':
        // lógica de suspensión
                break;
        }
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIconComponent className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <InputComponent
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <ButtonComponent>Nuevo Usuario</ButtonComponent>
        </div>
      </div>

      <div className="border rounded-lg">
        <TableComponent>
          <TableHeaderComponent>
            <TableRowComponent>
              <TableHeadComponent>Usuario</TableHeadComponent>
              <TableHeadComponent>Email</TableHeadComponent>
              <TableHeadComponent>Tipo</TableHeadComponent>
              <TableHeadComponent>Estado</TableHeadComponent>
              <TableHeadComponent>Fecha de registro</TableHeadComponent>
              <TableHeadComponent className="w-[50px]" />
            </TableRowComponent>
          </TableHeaderComponent>
          <TableBodyComponent>
            {users.map((user) => (
              <TableRowComponent key={user.id}>
                <TableCellComponent className="font-medium">{user.name}</TableCellComponent>
                <TableCellComponent>{user.email}</TableCellComponent>
                <TableCellComponent>{user.type}</TableCellComponent>
                <TableCellComponent>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCellComponent>
                <TableCellComponent>{new Date(user.createdAt).toLocaleDateString()}</TableCellComponent>
                <TableCellComponent>
                  <DropdownMenuComponent>
                    <DropdownMenuTriggerComponent asChild>
                      <ButtonComponent variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontalComponent className="h-4 w-4" />
                      </ButtonComponent>
                    </DropdownMenuTriggerComponent>
                    <DropdownMenuContentComponent align="end">
                      <DropdownMenuItemComponent onClick={() => handleAction('edit', user.id)}>
                        Editar
                      </DropdownMenuItemComponent>
                      <DropdownMenuItemComponent onClick={() => handleAction('suspend', user.id)}>
                        Suspender
                      </DropdownMenuItemComponent>
                      <DropdownMenuItemComponent
                        onClick={() => handleAction('delete', user.id)}
                        className="text-red-600"
                      >
                        Eliminar
                      </DropdownMenuItemComponent>
                    </DropdownMenuContentComponent>
                  </DropdownMenuComponent>
                </TableCellComponent>
              </TableRowComponent>
            ))}
          </TableBodyComponent>
        </TableComponent>
      </div>
    </div>
  );
}
