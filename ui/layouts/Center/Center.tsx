'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type CenterProps = ComponentProps<'div'> & {
  /** inline-flex 사용. 기본값 `false`. */
  inline?: boolean;
};

/**
 * 자식 요소를 가로·세로 양축 중앙에 정렬한다.
 * 로딩·빈 상태·아이콘 정렬 등에 사용한다.
 */
export function Center({ inline = false, className, ...props }: CenterProps) {
  return (
    <div
      className={cn(
        inline ? 'inline-flex' : 'flex',
        'items-center justify-center',
        className,
      )}
      {...props}
    />
  );
}
