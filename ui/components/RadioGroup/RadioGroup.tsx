'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
}

export const radioGroupItemVariants = cva(
  [
    'peer flex shrink-0 items-center justify-center rounded-full border transition-colors outline-none',
    'border-[var(--color-border-strong)] bg-[var(--color-bg-surface)]',
    'data-[state=checked]:border-[var(--color-bg-success)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-success)] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:border-[var(--color-border-default)] disabled:bg-[var(--color-bg-muted)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'size-5',
        md: 'size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/** 안쪽 점도 바깥 크기에 맞춰 같이 줄여야 비율이 어색해지지 않는다. */
const RADIO_DOT_SIZE = {
  sm: 'size-2.5',
  md: 'size-3',
} as const satisfies Record<NonNullable<RadioGroupItemProps['size']>, string>;

export type RadioGroupItemProps = ComponentProps<
  typeof RadioGroupPrimitive.Item
> &
  VariantProps<typeof radioGroupItemVariants>;

export function RadioGroupItem({
  className,
  size,
  ...props
}: RadioGroupItemProps) {
  const resolvedSize = size ?? 'md';

  return (
    <RadioGroupPrimitive.Item
      className={cn(radioGroupItemVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            RADIO_DOT_SIZE[resolvedSize],
            'rounded-full bg-[var(--color-bg-success)]',
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
