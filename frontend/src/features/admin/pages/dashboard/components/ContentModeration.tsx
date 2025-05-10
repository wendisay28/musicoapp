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

interface Report {
  id: string;
  content: string;
  type: string;
  status: 'pending' | 'resolved' | 'rejected';
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

export function ContentModeration(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<Report[]>([]);

  const loadReports = async (): Promise<void> => {
    // Aquí se implementaría la llamada a la API
    const mockReports: Report[] = [
      {
        id: '1',
        content: 'Contenido reportado',
        type: 'Spam',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];
    setReports(mockReports);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleSearch = (query: string): void => {
        setSearchQuery(query);
    // Implementar búsqueda real aquí
    };

  const handleAction = (action: 'approve' | 'reject' | 'delete', reportId: string): void => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        switch (action) {
            case 'approve':
            return { ...report, status: 'resolved' };
            case 'reject':
            return { ...report, status: 'rejected' };
          case 'delete':
            return null;
        }
      }
      return report;
    }).filter(Boolean) as Report[];
    
    setReports(updatedReports);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Moderación de Contenido</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIconComponent className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <InputComponent
              placeholder="Buscar reportes..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <TableComponent>
          <TableHeaderComponent>
            <TableRowComponent>
              <TableHeadComponent>Contenido</TableHeadComponent>
              <TableHeadComponent>Tipo</TableHeadComponent>
              <TableHeadComponent>Estado</TableHeadComponent>
              <TableHeadComponent>Fecha</TableHeadComponent>
              <TableHeadComponent className="w-[50px]" />
            </TableRowComponent>
          </TableHeaderComponent>
          <TableBodyComponent>
            {reports.map((report) => (
              <TableRowComponent key={report.id}>
                <TableCellComponent className="font-medium">{report.content}</TableCellComponent>
                <TableCellComponent>{report.type}</TableCellComponent>
                <TableCellComponent>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {report.status === 'pending'
                      ? 'Pendiente'
                      : report.status === 'resolved'
                      ? 'Resuelto'
                      : 'Rechazado'}
                  </span>
                </TableCellComponent>
                <TableCellComponent>{new Date(report.createdAt).toLocaleDateString()}</TableCellComponent>
                <TableCellComponent>
                  <DropdownMenuComponent>
                    <DropdownMenuTriggerComponent asChild>
                      <ButtonComponent variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontalComponent className="h-4 w-4" />
                      </ButtonComponent>
                    </DropdownMenuTriggerComponent>
                    <DropdownMenuContentComponent align="end">
                      <DropdownMenuItemComponent onClick={() => handleAction('approve', report.id)}>
                        Aprobar
                      </DropdownMenuItemComponent>
                      <DropdownMenuItemComponent onClick={() => handleAction('reject', report.id)}>
                        Rechazar
                      </DropdownMenuItemComponent>
                      <DropdownMenuItemComponent
                        onClick={() => handleAction('delete', report.id)}
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
