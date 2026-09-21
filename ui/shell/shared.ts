/**
 * 앱 셸(AppShell / AppHeader / AppSidebar) 공통 타입 · 반응형 기준점
 *
 * `components/`·`patterns/`가 페이지 "안"에 놓이는 UI 조각이라면, `shell/`은
 * 페이지를 "감싸는" 앱 골격이다. 앱당 하나만 존재하고 루트 레이아웃에 붙으며,
 * 라우팅/브랜딩 같은 앱 레벨 관심사와 맞닿아 있어 별도 계층으로 둔다.
 */

import type { ComponentType } from 'react';

/**
 * 아이콘 컴포넌트 타입. `lucide-react`의 `LucideIcon`이 그대로 들어맞고,
 * `className`만 받는 임의의 SVG 컴포넌트도 쓸 수 있다.
 *
 * 셸은 아이콘을 문자열 키로 받지 않는다 — 앱마다 필요한 아이콘이 다른데
 * 라이브러리가 매핑 테이블을 소유하면 새 아이콘마다 libs/ui를 고쳐야 한다.
 */
export type ShellIcon = ComponentType<{ className?: string }>;

/**
 * `AppHeader`의 배경 톤. `'brand'`(기본)는 브랜드 색 배경 위 on-solid
 * 텍스트/아이콘, `'clear'`는 배경이 본문과 이어지고 텍스트/아이콘이
 * accent 톤으로 브랜드를 드러낸다. `HeaderNotifications`/`HeaderUserMenu`도
 * 같은 타입을 받아 셋이 항상 같은 톤으로 맞춰진다.
 */
export type AppHeaderVariant = 'brand' | 'clear';

/**
 * 헤더 안의 원형 트리거(햄버거·벨·계정 메뉴) 셋이 공유하는 색 클래스.
 * 한 곳에 모아두지 않으면 토큰을 바꿀 때 셋 중 하나를 빠뜨리기 쉽다.
 */
export function headerTriggerClass(variant: AppHeaderVariant): string {
  return variant === 'clear'
    ? 'text-[var(--color-text-accent)] hover:bg-[var(--color-bg-accent-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--color-bg-accent)]'
    : 'text-[var(--color-text-on-solid)] hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--color-text-on-solid)]';
}

/**
 * 반응형 기준점(px). Tailwind v4 기본 브레이크포인트와 정확히 맞아떨어지므로
 * 커스텀 브레이크포인트를 추가하지 않고 기본 prefix를 그대로 쓴다.
 *
 * - 모바일 `<768px` — prefix 없음
 * - 태블릿 `768~1023px` — `md:`
 * - 데스크탑 `≥1024px` — `lg:`
 *
 * 세 컴포넌트 모두 세 단계에 대응한다.
 * - `AppHeader` — 로고·타이틀 크기, 아바타만 남는 계정 메뉴, 뷰포트에 맞춘
 *   오버레이 폭. 모바일에서는 왼쪽을 비워 햄버거 자리를 만든다.
 * - `AppSidebar` — 데스크탑 `w-60` 확장 / 태블릿 `w-16` 아이콘 레일 / 모바일
 *   없음(헤더 햄버거가 드로어를 연다).
 * - `AppShell` — 그 드로어의 열림 상태를 소유해 헤더 햄버거와 사이드바를 잇는다.
 *   둘을 잇는 상태가 여기 있어서 세 컴포넌트를 한 폴더에 뒀다.
 *
 * 햄버거는 헤더 **왼쪽**(로고 앞) 자리다. 오른쪽 알림·계정을 별도 햄버거+
 * 드로어로 접지 않은 이유이기도 하다 — 한 헤더에 뜻이 다른 햄버거가 둘이 되면
 * 어느 쪽이 네비게이션인지 알 수 없다.
 *
 * ⚠️ 코드가 실제로 읽는 값은 `desktop` 하나뿐이다(`useIsDesktop`). `tablet`은
 * Tailwind `md:`와 같은 값이라 참조용이고, `mobile`(360)은 브레이크포인트가
 * 아니라 스토리에서 쓰는 최소 폭 기준값이다 — 미디어쿼리 경계로 쓰지 않는다.
 */
export const SHELL_BREAKPOINTS = {
  mobile: 360,
  tablet: 768,
  desktop: 1024,
} as const;
