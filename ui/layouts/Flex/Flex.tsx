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

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const DIRECTION_CLASS: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
};

export type FlexProps = ComponentProps<'div'> & {
  /** 주축 방향. 기본값 `row`. */
  direction?: FlexDirection;
  /** 아이템 사이 간격(spacing 토큰). */
  gap?: SpaceToken;
  /** 교차축 정렬(align-items). */
  align?: Align;
  /** 주축 정렬(justify-content). */
  justify?: Justify;
  /** 줄바꿈 허용(flex-wrap). 기본값 `false`. */
  wrap?: boolean;
  /** inline-flex 사용. 기본값 `false`. */
  inline?: boolean;
};

/**
 * flexbox의 방향·정렬·줄바꿈을 세밀하게 제어하는 저수준 레이아웃 컴포넌트.
 *
 * 단순 쌓기에는 `Stack`을, 복합 정렬에는 `Flex`를 사용한다.
 */
export function Flex({
  direction = 'row',
  gap,
  align,
  justify,
  wrap = false,
  inline = false,
  className,
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        inline ? 'inline-flex' : 'flex',
        DIRECTION_CLASS[direction],
        wrap && 'flex-wrap',
        gap !== undefined && GAP_CLASS[gap],
        align && ALIGN_CLASS[align],
        justify && JUSTIFY_CLASS[justify],
        className,
      )}
      {...props}
    />
  );
}
