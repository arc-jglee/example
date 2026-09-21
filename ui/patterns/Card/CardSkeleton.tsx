'use client';

import { Skeleton } from '../../components/Skeleton/Skeleton';

export function CardSkeleton() {
  return (
    <div className="w-96 space-y-4 rounded-[var(--radius-xl)] border border-[var(--color-border-default)] p-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-16" />
        <Skeleton className="h-10 w-16" />
      </div>
    </div>
  );
}
