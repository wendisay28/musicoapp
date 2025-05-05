import { cn } from "../../lib/utils.js";

interface GridListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  gridClassName?: string;
  emptyMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

export function GridList<T>({
  items,
  renderItem,
  className,
  gridClassName,
  emptyMessage = "No hay elementos para mostrar",
  loading = false,
  loadingComponent,
}: GridListProps<T>) {
  if (loading) {
    return loadingComponent || <div>Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className={cn("text-center text-muted-foreground py-8", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", gridClassName, className)}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
} 