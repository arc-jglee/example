'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';
import { buttonVariants } from '../Button/Button';

export type PaginationProps = ComponentProps<'nav'>;

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

export type PaginationContentProps = ComponentProps<'ul'>;

export function PaginationContent({
  className,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

export type PaginationItemProps = ComponentProps<'li'>;

export function PaginationItem(props: PaginationItemProps) {
  return <li {...props} />;
}

export type PaginationLinkProps = ComponentProps<'a'> & {
  isActive?: boolean;
};

export function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'primary' : 'ghost',
          size: 'sm',
        }),
        'size-8 p-0',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

export function PaginationPrevious({
  className,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="이전 페이지로 이동"
      className={cn('w-auto gap-1 px-2.5', className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:block">이전</span>
    </PaginationLink>
  );
}

export type PaginationNextProps = ComponentProps<typeof PaginationLink>;

export function PaginationNext({ className, ...props }: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="다음 페이지로 이동"
      className={cn('w-auto gap-1 px-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">다음</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

export type PaginationEllipsisProps = ComponentProps<'span'>;

export function PaginationEllipsis({
  className,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-8 items-center justify-center text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">더 많은 페이지</span>
    </span>
  );
}
