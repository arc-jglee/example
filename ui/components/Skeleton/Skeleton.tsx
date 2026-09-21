'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type SkeletonProps = ComponentProps<'div'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-md)] bg-[var(--color-border-default)]',
        className,
      )}
      {...props}
    />
  );
}
