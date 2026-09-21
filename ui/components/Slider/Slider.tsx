'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

const thumbVariants = cva(
  'block shrink-0 rounded-full border-2 border-[var(--color-bg-accent)] bg-[var(--color-bg-surface)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-2',
  {
    variants: {
      thumbSize: {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5',
      },
    },
    defaultVariants: {
      thumbSize: 'md',
    },
  },
);

export type SliderProps = ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof thumbVariants>;

export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbSize,
  ...props
}: SliderProps) {
  const thumbValues = value ?? defaultValue ?? [min];

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[var(--color-bg-muted)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[var(--color-bg-accent)]" />
      </SliderPrimitive.Track>
      {thumbValues.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={thumbVariants({ thumbSize })}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
