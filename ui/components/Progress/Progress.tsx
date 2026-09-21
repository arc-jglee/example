'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-transform',
  {
    variants: {
      variant: {
        success: 'bg-[var(--color-bg-success)]',
        accent: 'bg-[var(--color-bg-accent)]',
        warning: 'bg-[var(--color-bg-warning)]',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressIndicatorVariants>;

export function Progress({
  className,
  value,
  variant,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-border-default)]',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={progressIndicatorVariants({ variant })}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
