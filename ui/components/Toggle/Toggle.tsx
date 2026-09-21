'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)]',
    'text-sm font-medium whitespace-nowrap transition-colors',
    'text-[var(--color-text-primary)]',
    'data-[state=on]:bg-[var(--color-bg-accent-subtle)] data-[state=on]:text-[var(--color-text-accent)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-[var(--color-bg-muted)]',
        outline:
          'border border-[var(--color-border-strong)] bg-transparent hover:bg-[var(--color-bg-subtle)]',
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-10 px-3',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    /** 좋아요 수 등, children 옆에 표시할 숫자. 생략하면 숫자 영역이 렌더링되지 않는다. */
    count?: number;
  };

export function Toggle({
  className,
  variant,
  size,
  count,
  children,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className="tabular-nums">{count.toLocaleString()}</span>
      )}
    </TogglePrimitive.Root>
  );
}
