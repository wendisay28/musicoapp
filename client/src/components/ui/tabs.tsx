import React from 'react';
import cn from 'classnames';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: '',
  setValue: () => {}
});

export function Tabs({ defaultValue, children, className, ...props }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue || '');

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn('tabs', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={cn('tabs-list flex', className)} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, disabled, children, className, ...props }: TabsTriggerProps) {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tab-content-${value}`}
      id={`tab-trigger-${value}`}
      disabled={disabled}
      className={cn(
        'tabs-trigger px-4 py-2 cursor-pointer',
        isSelected ? 'tabs-trigger-selected' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <div
      role="tabpanel"
      id={`tab-content-${value}`}
      aria-labelledby={`tab-trigger-${value}`}
      hidden={!isSelected}
      className={cn('tabs-content', className)}
      {...props}
    >
      {isSelected && children}
    </div>
  );
}
