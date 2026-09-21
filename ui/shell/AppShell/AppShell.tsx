'use client';

import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { SidebarDisclosureProvider } from '../sidebarDisclosure';

/**
 * `AppHeader`의 `variant`(`'brand' | 'clear'`)와는 별개 타입이다 — 헤더 톤과
 * 본문 분리 여부는 각자 원하는 조합으로 고를 수 있고, `AppShell`이 헤더
 * 내부까지 알 수 없어 강제로 동기화할 방법도 없다. 다만 시각적으로는
 * `header`가 `'clear'`(투명)일 때 본문도 `'none'`으로 이어 붙이고,
 * `'brand'`(불투명)일 때 `'separate'`로 대비를 주는 조합이 자연스럽다.
 */
export type AppShellContentVariant = 'none' | 'separate';

export type AppShellProps = ComponentProps<'div'> & {
  /** 최상단 헤더. 보통 `AppHeader`. */
  header?: ReactNode;
  /** 좌측 사이드바. 보통 `AppSidebar`. */
  sidebar?: ReactNode;
  children: ReactNode;
  /**
   * 본문 `main`에 붙는 클래스. 기본 패딩/최대 폭을 바꿀 때, 혹은
   * `variant="separate"`의 기본 배경(`--color-bg-subtle`)을 다른 톤으로
   * 덮어쓸 때 쓴다.
   */
  contentClassName?: string;
  /**
   * 본문(`main`)을 헤더·사이드바의 흰 배경과 시각적으로 분리할지 결정한다.
   *
   * `'none'`(기본): 배경 없음 — 최상위 컨테이너의 `--color-bg-base`가 그대로
   * 비쳐 보인다. `'separate'`: 본문에 `--color-bg-subtle`을 깔아, 그 안에
   * 놓인 흰 카드·테이블 같은 콘텐츠가 도드라져 보이게 한다.
   */
  variant?: AppShellContentVariant;
};

/**
 * 헤더(상단) + 사이드바(좌측) + 본문을 배치하는 앱 골격.
 *
 * 뷰포트 높이를 채우고 **본문만 스크롤**한다(`h-screen` + `overflow-y-auto`).
 * 페이지 전체가 스크롤되면 사이드바와 헤더가 함께 밀려 올라가는데, 상시
 * 네비게이션이 있는 앱에서는 둘이 화면에 고정돼 있는 편이 자연스럽다.
 *
 * 로고를 헤더에 두는 배치(헤더가 전체 폭을 차지하고 사이드바가 그 아래)라서,
 * 사이드바에 로고가 들어가는 배치와는 구조가 다르다. 후자가 필요하면 이
 * 컴포넌트를 쓰지 않고 `AppSidebar`의 `header` 슬롯에 로고를 넣어 직접 조합한다.
 *
 * 최상위 컨테이너는 `--color-bg-base`, 본문(`main`)은 `variant` prop으로
 * `--color-bg-subtle`을 켤지(`'separate'`) 끌지(`'none'`, 기본) 고른다.
 * `contentClassName`으로 둘 다 덮어쓸 수 있다.
 */
export function AppShell({
  header,
  sidebar,
  children,
  className,
  contentClassName,
  variant = 'none',
  ...props
}: AppShellProps) {
  return (
    // 헤더 햄버거와 사이드바 드로어가 같은 상태를 보게 잇는다. 이 provider가
    // 없으면 좁은 화면에서 사이드바를 열 방법이 없다.
    <SidebarDisclosureProvider>
      <div
        className={cn(
          'flex h-screen flex-col overflow-hidden bg-[var(--color-bg-base)]',
          className,
        )}
        {...props}
      >
        {header}
        {/* min-h-0: flex 자식의 기본 min-height는 auto라서, 이걸 0으로 낮추지
            않으면 본문이 넘칠 때 컨테이너가 늘어나 내부 스크롤이 안 생긴다. */}
        <div className="flex min-h-0 flex-1">
          {sidebar}
          <main
            className={cn(
              'min-w-0 flex-1 overflow-y-auto p-4 lg:p-8',
              variant === 'separate' && 'bg-[var(--color-bg-subtle)]',
              contentClassName,
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarDisclosureProvider>
  );
}
