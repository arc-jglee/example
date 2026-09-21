'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

export type SpacerProps = ComponentProps<'div'>;

/**
 * flex 컨테이너 안에서 남은 공간을 모두 차지하는 신축 여백(flex-1).
 *
 * 형제 요소를 양 끝으로 밀어낼 때 사용한다.
 */
export function Spacer({ className, ...props }: SpacerProps) {
  return (
    <div
      aria-hidden
      className={cn('flex-1 self-stretch', className)}
      {...props}
    />
  );
}
