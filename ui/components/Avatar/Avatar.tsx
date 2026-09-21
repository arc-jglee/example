'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';
import { type Tone, TONE_CLASS } from '../shared';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
        xl: 'size-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center rounded-full font-medium',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-accent-muted)] text-[var(--color-text-on-solid)]',
        /**
         * 사람·조직을 색으로 구분할 때. `tone`을 주지 않으면 중성(회색)이고,
         * `tone="green"`처럼 주면 ADS Secondary 팔레트의 해당 색으로 바뀐다.
         */
        secondary:
          'bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]',
        success:
          'bg-[var(--color-bg-success)] text-[var(--color-text-on-solid)]',
        warning:
          'bg-[var(--color-bg-warning)] text-[var(--color-text-on-solid)]',
        error: 'bg-[var(--color-bg-error)] text-[var(--color-text-on-solid)]',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

export function Avatar({ className, size, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;

/**
 * `object-top`이 기본인 이유: 아바타에 들어오는 건 거의 항상 얼굴인데, 얼굴은
 * 세로 사진의 **위쪽**에 있다. `object-cover`의 기본값인 `center`로 자르면
 * 세로 사진이 들어올 때마다 머리가 잘리고 아래가 어깨·상의로 채워진다
 * (480x640 증명사진을 32px 원에 넣으면 원본 y 80~560만 남는다).
 *
 * 이미 정사각인 이미지에는 크롭이 일어나지 않으므로 아무 영향이 없고, 가로
 * 사진은 가로로만 잘려서 세로 정렬값이 무의미하다. 즉 세로 사진에서만
 * 동작하고 그때는 항상 더 낫다.
 */
export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        'aspect-square size-full object-cover object-top',
        className,
      )}
      {...props}
    />
  );
}

export type AvatarFallbackProps = ComponentProps<
  typeof AvatarPrimitive.Fallback
> &
  VariantProps<typeof avatarFallbackVariants> & {
    /**
     * `variant="secondary"`일 때만 적용되는 구분용 색. primary(브랜드)나
     * 상태색은 의미가 고정이라 tone으로 덮지 않는다.
     */
    tone?: Tone;
  };

export function AvatarFallback({
  className,
  variant,
  size,
  tone,
  ...props
}: AvatarFallbackProps) {
  const toneClass =
    variant === 'secondary' && tone ? TONE_CLASS[tone] : undefined;

  return (
    <AvatarPrimitive.Fallback
      className={cn(
        avatarFallbackVariants({ variant, size }),
        toneClass,
        className,
      )}
      {...props}
    />
  );
}
