'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE_CLASS: Record<ContainerSize, string> = {
  sm: 'max-w-3xl', // 768px
  md: 'max-w-5xl', // 1024px
  lg: 'max-w-7xl', // 1280px
  xl: 'max-w-[1536px]',
  full: 'max-w-full',
};

export type ContainerProps = ComponentProps<'div'> & {
  /** 최대 너비 프리셋. 기본값 `lg`(1280px). */
  size?: ContainerSize;
  /** 반응형 좌우 패딩(px-4 → sm:px-6 → lg:px-8) 적용. 기본값 `true`. */
  padded?: boolean;
  /** 가로 중앙 정렬(mx-auto). 기본값 `true`. */
  centered?: boolean;
};

/**
 * 페이지·섹션의 최대 너비를 제한하고 중앙 정렬하는 레이아웃 셸.
 * 반응형 좌우 패딩을 기본 제공한다.
 */
export function Container({
  size = 'lg',
  padded = true,
  centered = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        SIZE_CLASS[size],
        centered && 'mx-auto',
        padded && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    />
  );
}
