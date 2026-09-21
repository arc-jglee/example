import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

export const statusDotVariants = cva('inline-block shrink-0', {
  variants: {
    variant: {
      neutral: 'bg-[var(--color-text-tertiary)]',
      accent: 'bg-[var(--color-bg-accent)]',
      success: 'bg-[var(--color-bg-success)]',
      warning: 'bg-[var(--color-bg-warning)]',
      error: 'bg-[var(--color-bg-error)]',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-[2px]',
    },
    size: {
      sm: 'size-1.5',
      md: 'size-2',
      lg: 'size-2.5',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    shape: 'circle',
    size: 'md',
  },
});

export type StatusDotProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusDotVariants>;

export function StatusDot({
  className,
  variant,
  shape,
  size,
  ...props
}: StatusDotProps) {
  return (
    <span
      className={cn(statusDotVariants({ variant, shape, size }), className)}
      {...props}
    />
  );
}
