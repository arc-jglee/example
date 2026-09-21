'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const switchVariants = cva(
  [
    'inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors outline-none',
    'data-[state=checked]:bg-[var(--color-bg-success)] data-[state=unchecked]:bg-[var(--color-border-default)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-success)] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-7 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/** thumb 크기·이동 거리도 트랙 크기에 맞춰 같이 줄여야 비율이 어색해지지 않는다. */
const SWITCH_THUMB_SIZE = {
  sm: 'size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  md: 'size-6 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
} as const satisfies Record<NonNullable<SwitchProps['size']>, string>;

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>;

export function Switch({ className, size, ...props }: SwitchProps) {
  const resolvedSize = size ?? 'md';

  return (
    <SwitchPrimitive.Root
      className={cn(switchVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-sm transition-transform',
          SWITCH_THUMB_SIZE[resolvedSize],
        )}
      />
    </SwitchPrimitive.Root>
  );
}
