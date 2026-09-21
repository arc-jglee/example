'use client';

import { cva } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import type { ElementType, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/Tooltip/Tooltip';
import { cn } from '../../utils/cn';
import type { ShellIcon } from '../shared';

export type SidebarNavItem = {
  /** 활성 항목을 가리키는 키. `activeItemId`와 비교된다. */
  id: string;
  label: string;
  icon?: ShellIcon;
  /**
   * 있으면 링크(`<a>` 또는 `linkComponent`)로, 없으면 `<button>`으로
   * 렌더링된다. 둘 다 `onSelect`는 그대로 호출된다. `children`이 있는
   * 항목에는 적용되지 않는다 — 그 행은 펼침/닫힘 전용이다.
   */
  href?: string;
  /** 라벨 오른쪽 영역. 개수 뱃지, StatusDot 등. */
  badge?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
  /**
   * 하위 메뉴(3뎁스). 있으면 이 항목은 `href`/`onSelect`로 이동하지 않고
   * 펼침/닫힘만 토글하는 아코디언 행이 된다 — 이동과 펼침이 같은 행에서
   * 동시에 일어나면 클릭 의도가 모호해지고, 버튼 안에 링크를 또 두는
   * 접근성 문제도 생기기 때문이다.
   */
  children?: SidebarNavItem[];
};

export type SidebarNavGroup = {
  id?: string;
  /** 생략하면 구분선 없이 항목만 이어진다(그룹 없는 단독 묶음). */
  label?: string;
  /** `label`이 있을 때만 헤더 옆에 그려진다. 레일(아이콘만) 폭에서는 안 보인다. */
  icon?: ShellIcon;
  items: SidebarNavItem[];
};

/**
 * 항목과 그룹을 한 배열에 섞어 쓸 수 있다 — 실제 앱의 nav는 "그룹 없는 대시보드
 * 하나 + 라벨 있는 그룹 여러 개" 형태가 흔하기 때문이다.
 */
export type SidebarNavEntry = SidebarNavItem | SidebarNavGroup;

function isGroup(entry: SidebarNavEntry): entry is SidebarNavGroup {
  return 'items' in entry;
}

function getGroupKey(entry: SidebarNavGroup, index: number) {
  return entry.id ?? entry.label ?? `group-${index}`;
}

/** 그룹은 항상 이 키로 펼침 상태를 추적한다(라벨 없는 그룹은 애초에 접을 UI가 없다). */
function collectLabeledGroupKeys(entries: SidebarNavEntry[]): string[] {
  const keys: string[] = [];
  entries.forEach((entry, index) => {
    if (isGroup(entry) && entry.label) {
      keys.push(getGroupKey(entry, index));
    }
  });
  return keys;
}

/**
 * `activeItemId`를 감싸는 그룹/상위 항목의 키를 모은다. 이동한 화면이
 * 접힌 메뉴 뒤에 숨어버리지 않도록, 이 키들은 항상 펼침 상태에 병합된다.
 */
function collectActiveAncestorKeys(
  entries: SidebarNavEntry[],
  activeItemId?: string,
): string[] {
  if (!activeItemId) return [];
  const keys: string[] = [];

  const visit = (items: SidebarNavItem[]): boolean => {
    let hasActive = false;
    for (const item of items) {
      let itemHasActive = item.id === activeItemId;
      if (item.children?.length && visit(item.children)) {
        keys.push(item.id);
        itemHasActive = true;
      }
      if (itemHasActive) hasActive = true;
    }
    return hasActive;
  };

  entries.forEach((entry, index) => {
    const items = isGroup(entry) ? entry.items : [entry];
    if (visit(items) && isGroup(entry) && entry.label) {
      keys.push(getGroupKey(entry, index));
    }
  });

  return keys;
}

export const sidebarNavItemVariants = cva(
  [
    'relative flex w-full items-center rounded-[var(--radius-md)] py-2',
    'text-[length:var(--text-body-sm)] font-medium transition-colors outline-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      active: {
        true: 'bg-[var(--color-bg-accent-subtle)] text-[var(--color-text-accent)]',
        false:
          'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)]',
      },
      /**
       * 아이콘만 남는 레일 모드(태블릿 폭이거나 데스크탑에서 사용자가 직접
       * 접은 경우). 라벨이 폭 0으로 접히므로 gap도 같이 접어야 한다 — 안
       * 그러면 아이콘 오른쪽에 24px 죽은 공간이 남는다.
       */
      isRail: {
        true: 'justify-center gap-0 px-2',
        false: 'justify-start gap-3 px-3',
      },
    },
    defaultVariants: {
      active: false,
      isRail: false,
    },
  },
);

/** 아이콘, 없으면 레일 폭에서만 이니셜로 자리를 지킨다. */
function ItemIcon({
  item,
  isRail,
}: {
  item: Pick<SidebarNavItem, 'icon' | 'label'>;
  isRail: boolean;
}) {
  const Icon = item.icon;
  if (Icon) {
    return <Icon className={cn('shrink-0', isRail ? 'size-5' : 'size-4')} />;
  }
  if (!isRail) return null;
  return (
    <span aria-hidden className="font-semibold">
      {item.label.trim().charAt(0)}
    </span>
  );
}

/**
 * 레일에서 라벨을 감출 때 hidden(=display:none)을 쓰면 접근성 트리에서도
 * 지워져서, 아이콘만 남은 항목이 접근 가능한 이름을 완전히 잃는다.
 * w-0 + overflow-hidden은 시각적으로만 지우고 이름은 남겨둔다.
 */
function ItemLabel({ label, isRail }: { label: string; isRail: boolean }) {
  return (
    <span
      className={cn('truncate text-left', isRail ? 'w-0 flex-none' : 'flex-1')}
    >
      {label}
    </span>
  );
}

type SidebarNavItemButtonProps = {
  item: SidebarNavItem;
  active: boolean;
  onSelect?: (item: SidebarNavItem) => void;
  linkComponent: ElementType;
  isRail: boolean;
  /** 레일 폭에서만 네이티브 툴팁을 붙인다. */
  showTitle: boolean;
};

/** 자식이 없는 leaf 항목 — 링크 또는 버튼으로 이동한다. */
function SidebarNavItemButton({
  item,
  active,
  onSelect,
  linkComponent: Link,
  isRail,
  showTitle,
}: SidebarNavItemButtonProps) {
  const className = sidebarNavItemVariants({ active, isRail });

  const content = (
    <>
      <ItemIcon item={item} isRail={isRail} />
      <ItemLabel label={item.label} isRail={isRail} />

      {item.badge && (
        <>
          <span className={cn('shrink-0', isRail && 'w-0 overflow-hidden')}>
            {item.badge}
          </span>
          {isRail && (
            // 뱃지는 ReactNode라 레일 폭에 맞게 줄일 수 없다. 내용 대신 "여기
            // 뭔가 있다"만 점으로 알린다(이름은 위 span이 이미 전달한다).
            <span
              aria-hidden
              className="absolute top-1 right-1 size-1.5 rounded-full bg-[var(--color-bg-accent)]"
            />
          )}
        </>
      )}
    </>
  );

  const handleSelect = () => {
    item.onSelect?.();
    onSelect?.(item);
  };

  // disabled 링크는 HTML에 없다 — href를 떼고 button으로 떨어뜨려야 실제로
  // 클릭이 막힌다(aria-disabled만 붙인 <a>는 여전히 이동한다).
  const element =
    item.href && !item.disabled ? (
      <Link
        href={item.href}
        className={className}
        aria-current={active ? 'page' : undefined}
        onClick={handleSelect}
      >
        {content}
      </Link>
    ) : (
      <button
        type="button"
        className={className}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
        onClick={handleSelect}
      >
        {content}
      </button>
    );

  // 레일 폭에서는 라벨이 안 보이니, 호버·포커스 시 이름을 툴팁으로 띄운다.
  // 이름 자체는 이미 DOM에 있어(ItemLabel이 시각적으로만 폭 0) 접근성 트리에
  // 들어가므로, 이 툴팁은 어디까지나 마우스 사용자를 위한 시각 보조다.
  if (!showTitle) return element;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{element}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

/** 자식이 있는 항목의 행 — 이동하지 않고 펼침/닫힘만 토글한다. */
function SidebarNavParentButton({
  item,
  expanded,
  onToggle,
  isRail,
  showTitle,
}: {
  item: SidebarNavItem;
  expanded: boolean;
  onToggle: () => void;
  isRail: boolean;
  showTitle: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      title={showTitle ? item.label : undefined}
      className={cn(
        sidebarNavItemVariants({ active: false, isRail }),
        'justify-between',
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <ItemIcon item={item} isRail={isRail} />
        <ItemLabel label={item.label} isRail={isRail} />
      </span>
      <ChevronRight
        aria-hidden
        className={cn(
          'size-4 shrink-0 transition-transform',
          isRail && 'hidden',
          expanded && 'rotate-90',
        )}
      />
    </button>
  );
}

/**
 * 레일(아이콘 전용) 폭에서 자식이 있는 항목을 대신하는 행. 레일에는 하위
 * 메뉴를 펼쳐 보일 자리가 없어, 누르면 인라인 토글 대신 드로어를 연다
 * (`AppSidebar`의 태블릿 확장 Sheet — 거기서는 라벨이 있어 인라인 아코디언이
 * 정상 동작한다).
 */
function SidebarNavDrawerTriggerButton({
  item,
  onRequestExpand,
}: {
  item: SidebarNavItem;
  onRequestExpand?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={onRequestExpand}
          className={sidebarNavItemVariants({ active: false, isRail: true })}
        >
          <ItemIcon item={item} isRail />
          <ItemLabel label={item.label} isRail />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export type SidebarNavListProps = {
  items: SidebarNavEntry[];
  activeItemId?: string;
  onItemSelect?: (item: SidebarNavItem) => void;
  linkComponent: ElementType;
  /**
   * 지금 아이콘만 남는 레일 모드인지. 태블릿 레일과 데스크탑에서 사용자가
   * 직접 접은 상태 모두 `true`다 — 둘 다 같은 시각·상호작용을 재사용한다.
   * Sheet 안에서는 항상 라벨이 보여야 하므로 `false`.
   */
  isRail?: boolean;
  /**
   * 레일에서 자식이 있는 항목을 눌렀을 때 호출된다(드로어를 열어야 한다).
   * `isRail`이 `false`인 렌더(Sheet 내부)에서는 쓰이지 않는다.
   */
  onRequestExpand?: () => void;
};

/**
 * 항목·그룹 목록 렌더링. `AppSidebar`의 aside(레일/확장)와 Sheet가 **같은 이
 * 컴포넌트를 공유**한다.
 *
 * 레일 여부(`isRail`)는 호출한 쪽(`AppSidebar`)이 결정해서 넘긴다 — 태블릿
 * 폭인지, 데스크탑에서 사용자가 직접 접었는지를 이 컴포넌트가 알 필요는
 * 없고, "지금 아이콘만 보여줄지"만 알면 된다. 브레이크포인트별로 nav를
 * 따로 렌더하지 않는 이유는 같은 항목이 DOM에 둘씩 생기면
 * `getByRole('link', { name })`이 둘을 찾고, 스크린리더도 감춰진 쪽을
 * 어떻게 다룰지가 브라우저마다 갈리기 때문이다. 하나만 렌더하고 `isRail`로
 * 접는다.
 *
 * 펼침 상태(그룹 + 자식 있는 항목)는 이 컴포넌트가 내부에서 관리한다. 그룹은
 * 기존 동작을 유지하려 기본 펼침으로 시작하고, 자식 있는 항목은 기본 접힘으로
 * 시작한다 — `activeItemId`가 그 안에 있으면 둘 다 자동으로 펼쳐진다.
 */
export function SidebarNavList({
  items,
  activeItemId,
  onItemSelect,
  linkComponent,
  isRail = false,
  onRequestExpand,
}: SidebarNavListProps) {
  const showTitle = isRail;
  // 레일에는 하위 메뉴를 펼칠 자리가 없다. 대신 눌렀을 때 드로어를 연다.
  const openAsDrawer = isRail;

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () =>
      new Set([
        ...collectLabeledGroupKeys(items),
        ...collectActiveAncestorKeys(items, activeItemId),
      ]),
  );

  useEffect(() => {
    const required = collectActiveAncestorKeys(items, activeItemId);
    if (required.length === 0) return;
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const key of required) {
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [items, activeItemId]);

  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const renderItem = (item: SidebarNavItem): ReactNode => {
    if (!item.children?.length) {
      return (
        <SidebarNavItemButton
          key={item.id}
          item={item}
          active={item.id === activeItemId}
          onSelect={onItemSelect}
          linkComponent={linkComponent}
          isRail={isRail}
          showTitle={showTitle}
        />
      );
    }

    if (openAsDrawer) {
      return (
        <SidebarNavDrawerTriggerButton
          key={item.id}
          item={item}
          onRequestExpand={onRequestExpand}
        />
      );
    }

    const expanded = expandedKeys.has(item.id);

    return (
      <div key={item.id} className="flex flex-col gap-1">
        <SidebarNavParentButton
          item={item}
          expanded={expanded}
          onToggle={() => toggle(item.id)}
          isRail={isRail}
          showTitle={showTitle}
        />
        {/* 들여쓰기 안내선으로 3뎁스임을 표시한다. */}
        <div
          className={cn(
            'ml-3 flex flex-col gap-1 border-l border-[var(--color-border-default)] pl-3',
            !expanded && 'hidden',
          )}
        >
          {item.children.map(renderItem)}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className={cn('flex flex-col', isRail ? 'gap-1' : 'gap-4')}>
        {items.map((entry, index) => {
          if (!isGroup(entry)) {
            return renderItem(entry);
          }

          const groupKey = getGroupKey(entry, index);
          const groupExpanded = expandedKeys.has(groupKey);

          return (
            <div
              key={groupKey}
              className={cn(
                'flex flex-col gap-1',
                // 레일에서는 그룹 헤더가 사라지므로 경계가 안 보인다. 첫 그룹만
                // 빼고 얇은 선으로 대신한다.
                isRail &&
                  index > 0 &&
                  'mt-1 border-t border-[var(--color-border-default)] pt-1',
              )}
            >
              {entry.label && (
                <button
                  type="button"
                  onClick={() => toggle(groupKey)}
                  aria-expanded={groupExpanded}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-[var(--radius-md)] px-3 py-1.5 text-left',
                    // 2뎁스 항목(font-medium, text-secondary)보다 한 단계
                    // 진하게 — "이게 상위 카테고리"라는 걸 굳이 캡션 크기로
                    // 줄이지 않고 색으로 구분한다. 한글은 uppercase가 안
                    // 먹으므로 그 방식은 쓰지 않는다.
                    'text-[length:var(--text-body-sm)] text-[var(--color-text-primary)]',
                    'transition-colors outline-none hover:bg-[var(--color-bg-muted)]',
                    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]',
                    // 그룹 헤더(아이콘 포함)는 레일에는 자리가 없다. 레일에서의
                    // 그룹 항목 표시는 아래 wrapper가 펼침 상태와 무관하게 항상
                    // 보여주는 것으로 대신한다.
                    isRail && 'hidden',
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    {entry.icon && (
                      <entry.icon className="size-4 shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{entry.label}</span>
                  </span>
                  <ChevronRight
                    aria-hidden
                    className={cn(
                      'size-3.5 shrink-0 text-[var(--color-text-tertiary)] transition-transform',
                      groupExpanded && 'rotate-90',
                    )}
                  />
                </button>
              )}
              <div
                className={cn(
                  'flex flex-col gap-1',
                  // 헤더(아이콘 포함)가 있을 때만 그 아래로 들여쓴다 — 레일에는
                  // 들여쓸 기준이 되는 헤더 자체가 안 보이므로 아닐 때만 적용한다.
                  entry.label && !isRail && 'pl-3',
                  // 레일은 그룹 펼침 상태와 무관하게 항상 보여준다(레일에는
                  // 접었다는 걸 알려줄 헤더 자체가 없다).
                  !isRail && !groupExpanded && 'hidden',
                )}
              >
                {entry.items.map(renderItem)}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
