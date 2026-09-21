'use client';

import type { ComponentProps } from 'react';

import { cn } from '../../utils/cn';
import {
  type Align,
  ALIGN_CLASS,
  GAP_CLASS,
  GRID_COLS_CLASS,
  type GridColumns,
  type SpaceToken,
} from '../shared';

export type GridProps = ComponentProps<'div'> & {
  /** 열 개수(1~12). 기본값 `1`. */
  columns?: GridColumns;
  /** 셀 사이 간격(spacing 토큰). */
  gap?: SpaceToken;
  /** 셀의 교차축 정렬(align-items). */
  align?: Align;
};

/**
 * 균등 열 기반 CSS Grid 레이아웃 컴포넌트.
 *
 * `columns`로 열 개수를, `gap`으로 셀 간격을 지정한다.
 */
export function Grid({
  columns = 1,
  gap,
  align,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        GRID_COLS_CLASS[columns],
        gap !== undefined && GAP_CLASS[gap],
        align && ALIGN_CLASS[align],
        className,
      )}
      {...props}
    />
  );
}
