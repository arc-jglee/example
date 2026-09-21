'use client';

import type { ComponentProps, CSSProperties } from 'react';

import { cn } from '../../utils/cn';

export type AspectRatioProps = ComponentProps<'div'> & {
  /** 가로/세로 비율(width / height). 예: `16 / 9`, `1`. 기본값 `1`. */
  ratio?: number;
};

/**
 * 자식 콘텐츠의 가로세로 비율을 고정하는 래퍼.
 * CSS `aspect-ratio` 속성을 사용하며, 이미지/영상/썸네일에 쓴다.
 */
export function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatioProps) {
  const mergedStyle: CSSProperties = { aspectRatio: String(ratio), ...style };

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={mergedStyle}
      {...props}
    />
  );
}
