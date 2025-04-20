import React from 'react';
import cn from 'classnames';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded bg-gray-300 dark:bg-gray-700',
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
