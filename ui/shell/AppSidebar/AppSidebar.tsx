'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { ComponentProps, ElementType, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Sheet, SheetContent, SheetTitle } from '../../patterns/Sheet/Sheet';
import { cn } from '../../utils/cn';
import { useSidebarDisclosure } from '../sidebarDisclosure';
import { useIsDesktop } from '../useIsDesktop';
import {
  type SidebarNavEntry,
  type SidebarNavItem,
  SidebarNavList,
} from './SidebarNav';

export type AppSidebarProps = Omit<ComponentProps<'aside'>, 'children'> & {
  /** 메뉴 정의. 항목 단독 또는 `{ label, items }` 그룹을 섞어 넣는다. */
  items: SidebarNavEntry[];
  /** 활성 항목의 `id`. 앱이 현재 경로에서 계산해 넘긴다. */
  activeItemId?: string;
  /**
   * 항목 클릭 시 호출. 최하위 뎁스 항목에서만 호출된다.
   */
  onItemSelect?: (item: SidebarNavItem) => void;
  /** 메뉴 위 영역. 아이콘 모음에는 들어갈 자리가 없어 감춘다. */
  header?: ReactNode;
  /** 메뉴 아래 영역(버전 표기, 도움말 등). */
  footer?: ReactNode;
  /** 링크 렌더링에 쓸 컴포넌트. `next/link`의 `Link` 등을 넘긴다. */
  linkComponent?: ElementType;
  /** 접근성 이름. 한 화면에 사이드바가 둘 이상일 때 구분한다. */
  label?: string;
  /** 태블릿 레일에서 드로어를 여는 버튼의 접근성 이름. */
  expandLabel?: string;
  /** 데스크탑에서 사이드바를 레일로 접는 버튼의 접근성 이름. */
  collapseLabel?: string;
  /** 데스크탑에서 접힌 사이드바를 다시 펼치는 버튼의 접근성 이름. */
  expandCollapsedLabel?: string;
};

/**
 * 아이콘 + 라벨 메뉴를 세로로 쌓는 좌측 사이드바.
 *
 * 폭에 따라 세 형태가 된다(`SHELL_BREAKPOINTS`):
 * - **데스크탑** — `w-60` 확장 사이드바가 기본. 사용자가 직접 레일(`w-16`)로
 *   접을 수 있고, 접은 채로 계속 쓸 수 있다.
 * - **태블릿** — `w-16` 아이콘 레일. 상단 버튼을 누르면 라벨이 보이는 드로어가
 *   열린다. 레일 항목 자체는 그대로 눌러서 이동할 수 있다.
 * - **모바일** — 사이드바가 아예 없다. `AppHeader`의 햄버거가 같은 드로어를
 *   연다(`AppShell`이 두 컴포넌트의 상태를 잇는다).
 *
 * 데스크탑에서 접었을 때는 태블릿 레일과 **완전히 같은 시각·상호작용**을
 * 재사용한다(`isRail` 하나로 `SidebarNavList`에 넘긴다) — 아이콘만 남기고,
 * 하위 메뉴가 있는 항목을 누르면 인라인 토글 대신 라벨 있는 드로어를 연다.
 * 태블릿은 화면 폭이 좁아서 어쩔 수 없이 레일이고, 데스크탑은 폭이 있는데도
 * 사용자가 원해서 레일을 선택한 것뿐이라 같은 화면이어야 한다.
 *
 * 태블릿 확장과 모바일 드로어가 **같은 `Sheet` 하나**다. 태블릿용 인플레이스
 * 확장을 따로 만들면 오버레이·포커스 트랩·Escape·바깥 클릭을 전부 다시
 * 구현해야 하는데, 열렸을 때 보이는 결과물은 드로어와 똑같다.
 *
 * `items`는 그룹 → 항목 → 하위 항목(3뎁스)까지 표현할 수 있다(`SidebarNav`
 * 참고). 그룹·하위 항목이 있는 항목은 모두 아코디언이고, 레일(아이콘 전용)
 * 폭에서 하위 항목이 있는 항목을 누르면 인라인으로 펼치는 대신 이 드로어가
 * 열린다 — 레일에는 3뎁스를 펼쳐 보일 자리가 없기 때문이다.
 */
export function AppSidebar({
  items,
  activeItemId,
  onItemSelect,
  header,
  footer,
  linkComponent = 'a',
  label = 'arcsquare',
  expandLabel = '메뉴 펼치기',
  collapseLabel = '사이드바 접기',
  expandCollapsedLabel = '사이드바 펼치기',
  className,
  ...props
}: AppSidebarProps) {
  const { open, setOpen } = useSidebarDisclosure();
  const isDesktop = useIsDesktop();
  const [collapsed, setCollapsed] = useState(false);

  // 데스크탑에서는 사이드바가 이미 펼쳐져 있어 드로어가 의미 없다. 열린 상태를
  // 그대로 두면 태블릿으로 되돌아왔을 때 뜬금없이 펼쳐진 채로 나타난다.
  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop, setOpen]);

  // 태블릿 폭이라 어쩔 수 없이 좁거나, 데스크탑에서 사용자가 직접 접었으면
  // 레일이다. 이 하나의 불린이 시각(폭·아이콘)과 상호작용(드로어 여부)을
  // 전부 결정한다 — SidebarNavList는 둘을 구분할 필요가 없다.
  const isRail = !isDesktop || collapsed;

  return (
    <>
      {/* 모바일에서는 aside가 없다 — 헤더 햄버거가 아래 Sheet를 연다. */}
      <aside
        className={cn(
          'hidden shrink-0 flex-col border-r border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
          'md:flex',
          'transition-[width] duration-200 ease-in-out',
          isRail ? 'w-16' : 'w-60',
          className,
        )}
        {...props}
      >
        {/* 타이틀(header)과 접기/펼치기 버튼을 한 줄에 둔다 — 타이틀은 왼쪽,
            버튼은 오른쪽. 레일 폭에서는 타이틀을 넣을 자리가 없어 감추고
            버튼만 가운데 남긴다. header가 없어도 이 줄 자체는 버튼을 위해
            항상 렌더링된다. */}
        <div
          className={cn(
            'flex items-center gap-2 border-b border-[var(--color-border-default)]',
            isRail ? 'justify-center p-2' : 'justify-between px-4 py-2',
          )}
        >
          {/* header가 없어도 label을 기본 타이틀로 보여준다 — header가
              오면 그걸로 대체한다. 이 칸 자체는 header/label 둘 다 없어도
              남겨서, flex-1이 남는 폭을 다 먹어 버튼을 오른쪽 끝에 붙인다
              (없으면 justify-between이 버튼 하나만 왼쪽으로 밀어버린다). */}
          <div className={cn('min-w-0 flex-1', isRail && 'hidden')}>
            {header ?? (
              <span className="truncate text-lg font-semibold text-[var(--color-text-primary)]">
                {label}
              </span>
            )}
          </div>

          {/* 태블릿에서만 보인다 — 눌러서 라벨 있는 드로어를 연다. 데스크탑
              에서는 접기/펼치기 버튼이 같은 자리를 대신한다. */}
          {!isDesktop && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={expandLabel}
              aria-expanded={open}
              aria-haspopup="dialog"
              title={expandLabel}
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]',
                'text-[var(--color-text-secondary)] transition-colors outline-none',
                'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]',
                'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]',
              )}
            >
              <PanelLeftOpen className="size-5" />
            </button>
          )}

          {/* 데스크탑에서만 보인다 — 레일 ↔ 확장 사이드바를 직접 토글한다. */}
          {isDesktop && (
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? expandCollapsedLabel : collapseLabel}
              aria-expanded={!collapsed}
              title={collapsed ? expandCollapsedLabel : collapseLabel}
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]',
                'text-[var(--color-text-secondary)] transition-colors outline-none',
                'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]',
                'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]',
              )}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-5" />
              ) : (
                <PanelLeftClose className="size-5" />
              )}
            </button>
          )}
        </div>

        <nav
          aria-label={label}
          className={cn(
            'scrollbar-hidden flex-1 overflow-y-auto',
            isRail ? 'p-2' : 'p-4',
          )}
        >
          <SidebarNavList
            items={items}
            activeItemId={activeItemId}
            onItemSelect={onItemSelect}
            linkComponent={linkComponent}
            isRail={isRail}
            onRequestExpand={() => setOpen(true)}
          />
        </nav>

        {footer && (
          <div
            className={cn(
              'border-t border-[var(--color-border-default)] p-4',
              isRail && 'hidden',
            )}
          >
            {footer}
          </div>
        )}
      </aside>

      {/* 데스크탑에서는 마운트조차 하지 않는다 — 이유는 useIsDesktop 주석 참고. */}
      {!isDesktop && (
        <Sheet open={open} onOpenChange={setOpen}>
          {/* SheetContent의 side=left 기본 폭은 max-w-sm/md:max-w-md인데,
              네비게이션 드로어에는 너무 넓다. md: 단계까지 눌러줘야 한다. */}
          <SheetContent
            side="left"
            className="w-72 max-w-[85vw] gap-0 overflow-hidden p-0 md:max-w-[85vw]"
          >
            {/* SheetContent 내장 닫기 버튼은 top-4 right-4(absolute) + h-8이라
                세로 중심이 컨텐츠 맨 위에서 정확히 32px(16+16)이다. 이 줄이
                py-3(=세로 중심 24px)로 있으면 8px 어긋나 X가 타이틀보다 아래로
                처져 보인다. h-16 + items-center로 중심을 32px에 맞춘다
                (top-4 16px + 버튼 32px + 대칭 여백 16px = 64px = h-16).
                pr-14는 버튼이 차지하는 오른쪽 16~48px 구간에 8px 여유를 더한
                간격이다. */}
            {/* header가 있으면 닫기 버튼 옆에 그걸 보여주고, label은
                화면에서 감춘 채(sr-only) Radix가 요구하는 접근성 이름으로만
                쓴다. header가 없으면 예전처럼 label 자체를 타이틀로 보여준다
                (지금 hris/mlops가 label만 넘기는 실제 사용 방식). */}
            <div className="flex h-16 items-center gap-2 border-b border-[var(--color-border-default)] pr-14 pl-4">
              <SheetTitle
                className={cn(
                  'truncate text-[length:var(--text-body-lg)]',
                  header && 'sr-only',
                )}
              >
                {label}
              </SheetTitle>
              {header}
            </div>

            {/* aria-label을 일부러 비운다 — 이 영역의 이름은 위 SheetTitle이
                이미 맡는다. 태블릿에서 레일의 nav와 DOM에 공존하지만 충돌은
                없다: Radix Dialog가 모달 바깥 전체에 aria-hidden을 씌워서,
                열려 있는 동안 접근성 트리에 노출되는 nav는 이쪽 하나뿐이다. */}
            <nav className="scrollbar-hidden flex-1 overflow-y-auto p-4">
              <SidebarNavList
                items={items}
                activeItemId={activeItemId}
                onItemSelect={(item) => {
                  onItemSelect?.(item);
                  // 이동했으면 드로어는 닫혀야 한다. 열어둔 채로 남기면 방금
                  // 이동한 화면이 오버레이에 가려진다.
                  setOpen(false);
                }}
                linkComponent={linkComponent}
              />
            </nav>

            {footer && (
              <div className="border-t border-[var(--color-border-default)] p-4">
                {footer}
              </div>
            )}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
