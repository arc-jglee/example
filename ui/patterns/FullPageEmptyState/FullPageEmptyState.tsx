'use client';

import {
  EmptyState,
  type EmptyStateProps,
} from '../../components/EmptyState/EmptyState';
import { cn } from '../../utils/cn';

export type FullPageEmptyStateProps = EmptyStateProps;

/**
 * `EmptyState`를 화면 전체(또는 `AppShell`의 `main` 영역 전체)에 채워
 * 중앙 정렬하는 얇은 레이아웃 래퍼. 404·403·점검 안내처럼 화면 자체가
 * 하나의 상태인 경우에 쓴다 — 카드·표 안의 부분적인 빈 자리에는 `EmptyState`를
 * 직접 쓴다.
 *
 * `AppShell`의 `main`처럼 부모가 이미 높이를 가진 곳에서는 기본값(`min-h-full`)이
 * 그 영역을 채운다. `AppShell` 밖(최상위 `app/not-found.tsx` 등 부모 높이가
 * 없는 곳)에서 쓸 때는 `className="min-h-screen"`을 넘겨 뷰포트 기준으로 채운다.
 */
export function FullPageEmptyState({
  className,
  size = 'lg',
  ...emptyStateProps
}: FullPageEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-full flex-1 items-center justify-center',
        className,
      )}
    >
      <EmptyState size={size} {...emptyStateProps} />
    </div>
  );
}
