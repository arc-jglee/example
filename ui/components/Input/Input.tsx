'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type InputProps = ComponentProps<'input'>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full min-w-0 rounded-[var(--radius-lg)] border px-4 py-3 text-sm',
        'border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
        'placeholder:text-[var(--color-text-disabled)]',
        'transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:border-[var(--color-border-default)] disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-disabled)]',
        'aria-invalid:border-[var(--color-border-error)] aria-invalid:focus-visible:ring-[var(--color-border-error)]',
        className,
      )}
      {...props}
    />
  );
}
