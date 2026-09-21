'use client';

import { Bell } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '../../components/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/Popover/Popover';
import { cn } from '../../utils/cn';
import {
  type AppHeaderVariant,
  headerTriggerClass,
  type ShellIcon,
} from '../shared';

export type HeaderNotification = {
  id: string;
  title: string;
  description?: string;
  /** 상대 시각 문자열("5분 전"). 포맷은 앱이 정한다 — 셸은 로케일을 모른다. */
  time?: string;
  /** 안 읽음 표시. 벨의 뱃지 개수는 이 값으로 계산된다. */
  unread?: boolean;
  icon?: ShellIcon;
};

export type HeaderNotificationsProps = {
  notifications: HeaderNotification[];
  /**
   * 목록의 읽음 상태는 셸이 갖지 않고 앱이 소유한다(제어 컴포넌트). 셸이
   * 자체 상태로 복제하면 서버에서 내려온 목록과 어긋나기 때문이다.
   */
  onSelect?: (id: string) => void;
  onReadAll?: () => void;
  /** 목록 아래 고정 영역. "전체 알림 보기" 링크 등. */
  footer?: ReactNode;
  emptyMessage?: string;
  /** 팝오버 헤딩 + 트리거 aria-label */
  label?: string;
  /** `AppHeader`의 `variant`를 그대로 받아 벨 버튼 색을 맞춘다. */
  variant?: AppHeaderVariant;
};

export function HeaderNotifications({
  notifications,
  onSelect,
  onReadAll,
  footer,
  emptyMessage = '새로운 알림이 없습니다',
  label = '알림',
  variant = 'brand',
}: HeaderNotificationsProps) {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={
            unreadCount > 0 ? `${label} (안 읽음 ${unreadCount}건)` : label
          }
          className={cn(
            // 터치 화면에서는 44px 권장치에 가깝게 키우고, 포인터 환경인
            // 데스크탑에서만 32px로 줄여 헤더 밀도를 맞춘다.
            'relative size-9 rounded-full p-0 lg:size-8 lg:rounded-[var(--radius-md)]',
            headerTriggerClass(variant),
          )}
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--color-bg-error)] lg:top-1 lg:right-1" />
          )}
        </Button>
      </PopoverTrigger>

      {/* 고정 w-80(320px)은 360px 뷰포트를 거의 꽉 채워 화면 밖으로 삐져나갔다.
          뷰포트에서 좌우 16px을 뺀 값과 20rem 중 작은 쪽을 쓰고, 붙는 방향도
          collisionPadding으로 여백을 확보한다. */}
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={16}
        className="w-[min(20rem,calc(100vw-2rem))] p-0"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)] px-4 py-3">
          <span className="font-semibold text-[var(--color-text-primary)]">
            {label}
          </span>
          {unreadCount > 0 && onReadAll && (
            <button
              type="button"
              onClick={onReadAll}
              className="text-[length:var(--text-body-sm)] text-[var(--color-text-accent)] hover:underline"
            >
              모두 읽음으로 표시
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="px-4 py-8 text-center text-[length:var(--text-body-sm)] text-[var(--color-text-tertiary)]">
            {emptyMessage}
          </p>
        ) : (
          // max-h는 세로가 짧은 모바일에서 목록이 화면을 다 덮지 않게 60vh로도 제한한다.
          <div className="flex max-h-[min(20rem,60vh)] flex-col overflow-y-auto">
            {notifications.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item.id)}
                  className={cn(
                    'flex gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-muted)]',
                    index < notifications.length - 1 &&
                      'border-b border-[var(--color-border-default)]',
                  )}
                >
                  {Icon && (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-accent-subtle)] text-[var(--color-text-accent)]">
                      <Icon className="size-4" />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
                        {item.title}
                      </span>
                      {item.unread && (
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--color-bg-error)]" />
                      )}
                    </span>
                    {item.description && (
                      <span className="truncate text-[length:var(--text-body-sm)] text-[var(--color-text-tertiary)]">
                        {item.description}
                      </span>
                    )}
                    {item.time && (
                      <span className="text-[length:var(--text-body-sm)] text-[var(--color-text-disabled)]">
                        {item.time}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {footer && (
          <div className="border-t border-[var(--color-border-default)] px-4 py-2.5 text-center">
            {footer}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
