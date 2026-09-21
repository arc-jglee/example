'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';
import {
  type Align,
  ALIGN_CLASS,
  GAP_CLASS,
  type Justify,
  JUSTIFY_CLASS,
  type SpaceToken,
} from '../shared';

export type StackProps = ComponentProps<'div'> & {
  /** 주축 방향. 기본값 `column`(세로 쌓기). */
  direction?: 'row' | 'column';
  /** 아이템 사이 간격(spacing 토큰). */
  gap?: SpaceToken;
  /** 교차축 정렬(align-items). */
  align?: Align;
  /** 주축 정렬(justify-content). */
  justify?: Justify;
};

/**
 * 자식 요소를 한 방향(세로/가로)으로 쌓고 일정 간격을 부여하는 1차원 레이아웃 컴포넌트.
 *
 * VStack/HStack을 `direction`으로 통합한다.
 */
export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        gap !== undefined && GAP_CLASS[gap],
        align && ALIGN_CLASS[align],
        justify && JUSTIFY_CLASS[justify],
        className,
      )}
      {...props}
    />
  );
}
