'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-sm leading-none font-medium text-[var(--color-text-primary)]',
        'select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
