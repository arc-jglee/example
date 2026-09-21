'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-10',
    },
    variant: {
      default: 'text-[var(--color-text-disabled)]',
      primary: 'text-[var(--color-accent-muted)]',
      white: 'text-[var(--color-text-on-solid)]',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export type SpinnerProps = Omit<ComponentProps<typeof LoaderCircle>, 'size'> &
  VariantProps<typeof spinnerVariants>;

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  );
}
