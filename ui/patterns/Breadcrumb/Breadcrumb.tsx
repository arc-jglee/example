'use client';

import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';

export type BreadcrumbProps = ComponentProps<'nav'>;

export function Breadcrumb({ ...props }: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export type BreadcrumbListProps = ComponentProps<'ol'>;

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-[length:var(--text-body-sm)] break-words text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type BreadcrumbItemProps = ComponentProps<'li'>;

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

export type BreadcrumbLinkProps = ComponentProps<'a'> & {
  asChild?: boolean;
};

export function BreadcrumbLink({
  asChild = false,
  className,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      className={cn(
        'transition-colors hover:text-[var(--color-text-primary)]',
        className,
      )}
      {...props}
    />
  );
}

export type BreadcrumbPageProps = ComponentProps<'span'>;

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn('font-medium text-[var(--color-text-primary)]', className)}
      {...props}
    />
  );
}

export type BreadcrumbSeparatorProps = ComponentProps<'li'> & {
  children?: ReactNode;
};

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export type BreadcrumbEllipsisProps = ComponentProps<'span'>;

export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}
