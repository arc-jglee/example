'use client';

import { Menu } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { type AppHeaderVariant, headerTriggerClass } from '../shared';
import { useOptionalSidebarDisclosure } from '../sidebarDisclosure';
import {
  type HeaderNotification,
  HeaderNotifications,
} from './HeaderNotifications';
import {
  type HeaderUser,
  HeaderUserMenu,
  type HeaderUserMenuItem,
} from './HeaderUserMenu';

export type AppHeaderProps = Omit<ComponentProps<'header'>, 'children'> & {
  /**
   * 좌측 회사 로고.
   */
  logo?: ReactNode;
  /** 좌측 서비스명(혹은 회사명). */
  title?: ReactNode;
  /**
   * 가운데에 추가할 수 있는 기능. (예: 전역 검색)<br/>
   * 좁은 화면에서는 헤더가 로고+액션만으로도<br/>
   * 꽉 차므로 데스크탑 뷰에서만 노출한다.
   */
  center?: ReactNode;
  /**
   * 우측에 추가할 수 있는 앱 고유 액션.<br/>
   * (예: 테마 토글, 언어 선택, 앱 전용 버튼 등...)
   */
  actions?: ReactNode;
  /** 추가 시, 벨 아이콘 + 알림 팝오버가 나타난다. */
  notifications?: HeaderNotification[];
  /** 알림 항목 클릭 시 호출. */
  onNotificationSelect?: (id: string) => void;
  /** "모두 읽음" 클릭 시 호출. */
  onNotificationsReadAll?: () => void;
  /**
   * 알림 목록 아래 고정 영역. (예: "전체 알림 보기" 링크)<br/>
   * 목록의 읽음 상태는 셸이 갖지 않고 앱이 소유한다.
   */
  notificationsFooter?: ReactNode;
  /** 추가 시, 아바타 + 계정 드롭다운이 나타난다. */
  user?: HeaderUser;
  userMenuItems?: HeaderUserMenuItem[];
  /** 모바일 뷰 햄버거 버튼의 접근성 이름. */
  menuButtonLabel?: string;
  /**
   * `'brand'`(기본): 브랜드 색 배경.<br/>
   * `'clear'`: 투명한 배경으로 본문과 이어져 보임.
   *
   * 헤더가 소유한 부분만 자동으로 톤을 맞춘다.<br/>
   *
   * `logo`/`center`/`actions`로 넣는 앱 소유 콘텐츠는 색을 스스로 정하므로,
   * `variant`에 맞춰 앱이 직접 스타일링해야 한다.
   */
  variant?: AppHeaderVariant;
};

/**
 * 로고(좌) · 검색(중앙) · 알림/프로필(우)을 배치하는 앱 최상단 헤더.
 *
 * `notifications`/`user`를 주면 기본 벨·프로필 UI를 그려주고(데이터 주도),
 * `actions`/`center` 슬롯으로 앱 고유 요소를 끼울 수 있다(하이브리드).
 * `variant="brand"`(기본)는 배경이 `--color-bg-accent`라서 `data-brand`
 * 토글만으로 서비스별 색이 바뀌고, `variant="clear"`는 배경 대신
 * 텍스트/아이콘 토큰이 브랜드를 드러낸다.
 *
 * 반응형(`SHELL_BREAKPOINTS`)은 **오른쪽 액션은 압축하고, 왼쪽은 비운다**:
 * - `center`는 데스크탑에서만 노출 (좁은 화면에서는 헤더가 이미 꽉 찬다)
 * - `HeaderUserMenu`는 데스크탑 미만에서 이름·화살표를 떼고 아바타만 남긴다
 * - `logo`/`title`은 모바일에서 감춰진다 — 그 자리는 사이드바 드로어를 여는
 *   햄버거 몫이다. 태블릿부터 노출되며 크기가 한 단계씩 올라간다.
 *
 * 알림·계정을 햄버거+드로어로 몰지 않은 건 의도적이다. 헤더 왼쪽 햄버거는
 * 사이드바 드로어 몫이라, 오른쪽에 또 하나를 두면 같은 화면에 뜻이 다른
 * 햄버거가 둘이 된다. 드롭다운·팝오버 자체가 이미 오버레이라서 좁은 화면에서
 * 필요한 건 다른 패턴이 아니라 뷰포트에 맞춘 폭이다.
 *
 * ⚠️ 모바일에서 `title`이 접근성 트리에서도 사라진다. 앱 이름은 페이지의
 * `<h1>`이나 `document.title`이 책임져야 한다.
 */
export function AppHeader({
  logo,
  title,
  center,
  actions,
  notifications,
  onNotificationSelect,
  onNotificationsReadAll,
  notificationsFooter,
  user,
  userMenuItems,
  menuButtonLabel = '메뉴 열기',
  variant = 'brand',
  className,
  ...props
}: AppHeaderProps) {
  const sidebar = useOptionalSidebarDisclosure();
  const isClear = variant === 'clear';

  return (
    <header
      data-variant={variant}
      className={cn(
        'grid h-14 shrink-0 grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-4',
        isClear ? 'bg-transparent' : 'bg-[var(--color-bg-accent)]',
        // brand는 배경색 자체가 본문과의 경계를 말해주지만, clear는 배경이
        // 없어 그 경계가 사라진다 — 밑줄로 헤더가 끝나는 지점을 표시한다.
        isClear && 'border-b border-[var(--color-border-default)]',
        'px-4 md:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {/* 브랜드 슬롯은 모바일에서 비워둔다 — 그 자리는 사이드바 드로어를 여는
          햄버거 몫이다. 감추는 대상이 로고 "내용물"이지 이 div가 아닌 점이
          중요하다. div에 hidden을 걸면 아래 가운데 트랙과 똑같은 문제가 생긴다.

          로고까지 통째로 감추는 이유: logo는 불투명한 ReactNode라서 셸은 그게
          36px 심볼인지 200px 워드마크인지 알 수 없다. "모바일에서는 심볼만
          남긴다"를 셸이 판단할 수 없으니, 안전한 기본값은 전부 감추는 것이다.
          `variant="brand"`에서는 헤더 배경이 이미 브랜드를 색으로 말하고
          있다 — `clear`에서 로고를 앱이 넣고 싶다면 `data-variant`로
          직접 대응해야 한다(위 `variant` prop 문서 참고). */}
      <div className="flex min-w-0 items-center gap-2">
        {/* 사이드바 드로어를 여는 햄버거. 태블릿부터는 아이콘 레일이 보이므로
            모바일 전용이고, AppShell 밖에서는 열 대상이 없어 렌더하지 않는다. */}
        {sidebar && (
          <button
            type="button"
            onClick={() => sidebar.setOpen(true)}
            aria-label={menuButtonLabel}
            aria-expanded={sidebar.open}
            aria-haspopup="dialog"
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full',
              'transition-colors outline-none md:hidden',
              headerTriggerClass(variant),
            )}
          >
            <Menu className="size-5" />
          </button>
        )}

        {/* 로고 노드는 앱이 소유하므로 크기를 "지정"하지 않고 max-height로
            "상한"만 건다 — 앱이 h-6을 박아놨어도 태블릿에서는 상한이 이기고,
            상한보다 작은 로고는 그대로 둔다. */}
        {logo && (
          <span
            className={cn(
              'hidden shrink-0 items-center md:inline-flex',
              '[--shell-logo-h:1.5rem] lg:[--shell-logo-h:1.75rem]',
              '[&>img]:max-h-[var(--shell-logo-h)] [&>img]:w-auto',
              '[&>svg]:max-h-[var(--shell-logo-h)] [&>svg]:w-auto',
            )}
          >
            {logo}
          </span>
        )}
        {/* min-w-0(부모) + truncate가 짝이다. grid의 auto 트랙은 아이템의
            min-content 너비까지만 줄어들어서, min-w-0이 없으면 긴 타이틀이
            오른쪽 액션을 화면 밖으로 밀어낸다. */}
        {title && (
          <span
            className={cn(
              'hidden truncate text-[length:var(--text-heading-sm)] font-semibold tracking-wide md:inline lg:text-[length:var(--text-heading-md)]',
              isClear
                ? 'text-[var(--color-text-accent)]'
                : 'text-[var(--color-text-on-solid)]',
            )}
          >
            {title}
          </span>
        )}
      </div>

      {/* 가운데 트랙은 내용이 없어도 항상 grid 아이템으로 남겨둔다. 이 div에
          display:none을 걸면 아이템이 셋에서 둘로 줄어 액션이 3번 트랙 대신
          2번(1fr) 트랙에 배치되고, 결과적으로 오른쪽 정렬이 깨진다. */}
      <div className="flex justify-center">
        {center && (
          <div className="hidden w-full max-w-3xl lg:block">{center}</div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        {actions}
        {notifications && (
          <HeaderNotifications
            notifications={notifications}
            onSelect={onNotificationSelect}
            onReadAll={onNotificationsReadAll}
            footer={notificationsFooter}
            variant={variant}
          />
        )}
        {user && (
          <HeaderUserMenu user={user} items={userMenuItems} variant={variant} />
        )}
      </div>
    </header>
  );
}
