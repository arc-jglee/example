'use client';

import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/Avatar/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu/DropdownMenu';
import { cn } from '../../utils/cn';
import {
  type AppHeaderVariant,
  headerTriggerClass,
  type ShellIcon,
} from '../shared';

export type HeaderUser = {
  name: string;
  email?: string;
  /** 아바타 이니셜. 생략하면 이름의 첫 글자를 쓴다. */
  initials?: string;
  /** 프로필 이미지. 로드에 실패하면 이니셜로 폴백된다. */
  imageSrc?: string;
};

export type HeaderUserMenuItem = {
  id?: string;
  label: string;
  icon?: ShellIcon;
  /** `destructive`는 로그아웃·탈퇴처럼 되돌리기 어려운 항목에 쓴다. */
  variant?: 'default' | 'destructive';
  /** 이 항목 위에 구분선을 그린다. */
  separatorBefore?: boolean;
  onSelect?: () => void;
};

export type HeaderUserMenuProps = {
  user: HeaderUser;
  items?: HeaderUserMenuItem[];
  /**
   * `AppHeader`의 `variant`를 그대로 받아 트리거 색을 맞춘다. `items`의
   * `variant`(`'default' | 'destructive'`, 항목 강조용)와는 무관한 값이다.
   */
  variant?: AppHeaderVariant;
};

export function HeaderUserMenu({
  user,
  items = [],
  variant = 'brand',
}: HeaderUserMenuProps) {
  const initials = user.initials ?? user.name.trim().charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          // 모바일·태블릿은 아바타만 남긴 원형 타겟이다. 헤더 오른쪽에서 이름은
          // 가장 먼저 버려도 되는 정보다 — 아바타가 이미 "내 계정"을 가리키고,
          // 이름은 열린 메뉴 머리말에서 다시 읽을 수 있다.
          'flex size-9 items-center justify-center rounded-full',
          // 데스크탑에서만 이름+화살표가 붙으면서 알약 모양으로 늘어난다.
          'lg:h-8 lg:w-auto lg:max-w-40 lg:justify-start lg:gap-2 lg:rounded-[var(--radius-md)] lg:px-2',
          'text-[length:var(--text-body-sm)] font-semibold transition-colors outline-none',
          headerTriggerClass(variant),
        )}
        aria-label={`${user.name} 계정 메뉴`}
      >
        <Avatar size="sm">
          {user.imageSrc && <AvatarImage src={user.imageSrc} alt="" />}
          <AvatarFallback size="sm">{initials}</AvatarFallback>
        </Avatar>
        <span className="hidden truncate lg:inline">{user.name}</span>
        <ChevronDown className="hidden size-4 shrink-0 lg:block" />
      </DropdownMenuTrigger>

      {/* 360px 뷰포트에서도 좌우 여백이 남게 폭을 제한한다. */}
      <DropdownMenuContent
        align="end"
        collisionPadding={16}
        className="max-w-[calc(100vw-2rem)]"
      >
        {/* 이름은 좁은 화면에서 트리거가 감추므로 여기서 항상 보여준다. 넓은
            화면에서는 트리거와 중복되지만, 조건부로 감추면 email이 없는 계정에서
            머리말이 빈 채로 남는다. */}
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate text-[length:var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
            {user.name}
          </span>
          {user.email && <span className="truncate">{user.email}</span>}
        </DropdownMenuLabel>
        {items.length > 0 && <DropdownMenuSeparator />}

        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Fragment key={item.id ?? item.label}>
              {item.separatorBefore && index > 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem variant={item.variant} onSelect={item.onSelect}>
                {Icon && <Icon className="size-4" />}
                {item.label}
              </DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
