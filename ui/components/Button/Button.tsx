'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';
import { type Tone, TONE_INTERACTIVE_CLASS } from '../shared';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-bg-accent)] text-[var(--color-text-on-solid)] hover:bg-[var(--color-bg-accent-hover)]',
        /**
         * primary보다 무게가 낮은 액션. `tone`을 주지 않으면 중성(회색)이고,
         * `tone="green"`처럼 주면 ADS Secondary 팔레트의 해당 색으로 바뀐다.
         * solid가 아니라 톤(옅은 배경 + 진한 텍스트)인 이유: solid + 흰 텍스트는
         * 16색 중 8색(orange·yellow·lime·green·emerald·teal·cyan·sky)이 AA에
         * 못 미치고, primary와 무게도 구분되지 않는다.
         */
        secondary:
          'bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-default)]',
        outline:
          'border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]',
        ghost:
          'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]',
        destructive:
          'bg-[var(--color-bg-error)] text-[var(--color-text-on-solid)] hover:bg-[var(--color-bg-error-hover)]',
        success:
          'bg-[var(--color-bg-success)] text-[var(--color-text-on-solid)] hover:bg-[var(--color-bg-success-hover)]',
      },
      size: {
        sm: 'h-8 rounded-[var(--radius-md)] px-3 text-sm',
        md: 'h-10 rounded-[var(--radius-lg)] px-4 text-sm',
        lg: 'h-12 rounded-[var(--radius-lg)] px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /**
     * `variant="secondary"`일 때만 적용되는 구분용 색.
     *
     * primary(브랜드)/destructive/success는 의미가 고정이라 tone으로 덮지 않는다.
     */
    tone?: Tone;
  };

export function Button({
  className,
  variant,
  size,
  tone,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  // cn()이 tailwind-merge를 쓰므로 뒤에 오는 tone 클래스가 variant의
  // bg/text/hover를 덮는다.
  const toneClass =
    variant === 'secondary' && tone ? TONE_INTERACTIVE_CLASS[tone] : undefined;

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), toneClass, className)}
      {...props}
    />
  );
}
