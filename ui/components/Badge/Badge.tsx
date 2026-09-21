'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';
import { type Tone, TONE_CLASS } from '../shared';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-accent-muted)] text-[var(--color-text-on-solid)]',
        /**
         * 갈래 구분용. `tone`을 주지 않으면 중성(회색)이고, `tone="green"`처럼
         * 주면 ADS Secondary 팔레트의 해당 색으로 바뀐다.
         */
        secondary:
          'bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]',
        destructive:
          'bg-[var(--color-bg-error)] text-[var(--color-text-on-solid)]',
        outline:
          'border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)]',
        success:
          'bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-strong)]',
        warning:
          'bg-[var(--color-bg-warning-subtle)] text-[var(--color-text-warning-strong)]',
        error:
          'bg-[var(--color-bg-error-subtle)] text-[var(--color-text-error-strong)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const DOT_VARIANTS = new Set(['success', 'warning', 'error']);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /**
     * `variant="secondary"`일 때만 적용되는 구분용 색. 상태색(success 등)은
     * 의미가 고정이라 tone으로 덮지 않는다.
     */
    tone?: Tone;
  };

export function Badge({
  className,
  variant,
  tone,
  children,
  ...props
}: BadgeProps) {
  const showDot = DOT_VARIANTS.has(variant ?? 'primary');
  // cn()이 tailwind-merge를 쓰므로 뒤에 오는 tone 클래스가 variant의 bg/text를
  // 덮는다. secondary가 아닐 때 tone을 무시하는 건 의미 축과 구분 축을 섞지
  // 않기 위해서다.
  const toneClass =
    variant === 'secondary' && tone ? TONE_CLASS[tone] : undefined;

  return (
    <span
      className={cn(badgeVariants({ variant }), toneClass, className)}
      {...props}
    >
      {showDot && (
        <span
          className="size-1.5 shrink-0 rounded-full bg-current"
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
