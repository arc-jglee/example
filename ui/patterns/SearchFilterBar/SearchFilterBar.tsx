'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Label } from '../../components/Label/Label';
import { cn } from '../../utils/cn';

export type SearchFilterBarProps = ComponentProps<'div'>;

/**
 * 검색어/기간/상태/부서 등 필터 필드들을 한 줄에 배치하는 순수 레이아웃
 * 컨테이너 (Card와 동일하게 Context/상태 공유 없음). 어떤 필터 컨트롤을
 * 쓸지는 소비자가 정한다 — Input/Select/Combobox/DateRangePicker 등 이미
 * 있는 컴포넌트를 SearchFilterBarField로 감싸 자유롭게 조합한다.
 */
export function SearchFilterBar({ className, ...props }: SearchFilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end gap-3 rounded-[var(--radius-xl)] border p-4',
        'border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
        className,
      )}
      {...props}
    />
  );
}

export type SearchFilterBarFieldProps = ComponentProps<'div'> & {
  label?: ReactNode;
  htmlFor?: string;
};

/**
 * 필터 컨트롤 하나(라벨 + 컨트롤)를 감싸는 단위. 필드 너비는 내부 컨트롤이
 * 이미 가진 기본 폭(Input의 w-full, Combobox의 min-w-[240px] 등)을 따르므로
 * 여기서 강제하지 않는다 — 필요하면 className으로 개별 조정한다.
 */
export function SearchFilterBarField({
  label,
  htmlFor,
  className,
  children,
  ...props
}: SearchFilterBarFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
    </div>
  );
}

export type SearchFilterBarActionsProps = ComponentProps<'div'>;

/**
 * 검색/초기화 등 액션 버튼을 배치하는 영역. 필드들과 함께 줄바꿈된다.
 * `Dialog`/`Sheet`/`Card`의 Footer와 동일하게, 좁은 화면(`sm` 미만,
 * `<640px`)에서는 버튼이 세로로 쌓이고 `sm` 이상에서는 가로로 정렬된다.
 */
export function SearchFilterBarActions({
  className,
  ...props
}: SearchFilterBarActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:items-center',
        className,
      )}
      {...props}
    />
  );
}
