'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export const checkboxVariants = cva(
  [
    'peer flex shrink-0 items-center justify-center rounded-[var(--radius-md)] border transition-colors outline-none',
    'border-[var(--color-border-strong)] bg-[var(--color-bg-surface)]',
    'data-[state=checked]:border-[var(--color-bg-success)] data-[state=checked]:bg-[var(--color-bg-success)] data-[state=checked]:text-[var(--color-text-on-solid)]',
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

/** 체크 아이콘도 박스 크기에 맞춰 같이 줄여야 비율이 어색해지지 않는다. */
const CHECK_ICON_SIZE = {
  sm: 'size-3',
  md: 'size-4',
} as const satisfies Record<NonNullable<CheckboxProps['size']>, string>;

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

export function Checkbox({ className, size, ...props }: CheckboxProps) {
  const resolvedSize = size ?? 'md';

  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className={CHECK_ICON_SIZE[resolvedSize]} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
