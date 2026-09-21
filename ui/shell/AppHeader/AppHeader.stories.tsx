import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CalendarCheck,
  FileSignature,
  LogOut,
  Search,
  Settings,
  User,
  UserPlus,
  Wallet,
} from 'lucide-react';

import { Input } from '../../components/Input/Input';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../components/ToggleGroup/ToggleGroup';
import { cn } from '../../utils/cn';
import { AppHeader } from './AppHeader';
import type { HeaderNotification } from './HeaderNotifications';
import type { HeaderUserMenuItem } from './HeaderUserMenu';

const NOTIFICATIONS: HeaderNotification[] = [
  {
    id: 'n1',
    icon: CalendarCheck,
    title: '연차 신청이 승인되었습니다',
    description: '8월 21일 · 이재건 (1일)',
    time: '5분 전',
    unread: true,
  },
  {
    id: 'n2',
    icon: UserPlus,
    title: '신입 직원이 등록되었습니다',
    description: '김인나님이 개발팀에 합류했습니다',
    time: '1시간 전',
    unread: true,
  },
  {
    id: 'n3',
    icon: FileSignature,
    title: '근로계약서 서명 요청',
    description: '전재영님의 서명이 필요합니다',
    time: '3시간 전',
    unread: true,
  },
  {
    id: 'n4',
    icon: Wallet,
    title: '8월 급여명세서가 발행되었습니다',
    description: '마이페이지에서 확인하세요',
    time: '어제',
  },
];

const USER_MENU_ITEMS: HeaderUserMenuItem[] = [
  { label: '프로필', icon: User },
  { label: '설정', icon: Settings },
  {
    label: '로그아웃',
    icon: LogOut,
    variant: 'destructive',
    separatorBefore: true,
  },
];

/**
 * 어떤 노드든 `logo`에 들어간다는 걸 보여주는 플레이스홀더. 실제 앱은
 * `next/image`를 쓰지만 라이브러리 안에서는 쓸 수 없어 인라인 SVG로 대체한다.
 *
 * `ArcsquareMark`처럼 이미지를 두 장 두는 대신, 배경/텍스트 색을 CSS 커스텀
 * 프로퍼티(`--ph-logo-bg`/`--ph-logo-text`)로 뽑아 `data-variant`에 따라
 * 값만 바꿔치기한다 — 로고 래퍼가 `--shell-logo-h`를 정의하는 것과 같은
 * 패턴이다. brand에서는 브랜드 배경 위 반투명 흰 배지, clear에서는
 * `--color-bg-accent-subtle` 배지 위 `--color-text-accent` 텍스트로 바뀐다.
 */
function PlaceholderLogo() {
  return (
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      role="img"
      aria-label="브랜드 로고"
      className={cn(
        '[--ph-logo-bg:rgb(255_255_255/25%)] [--ph-logo-text:var(--color-text-on-solid)]',
        '[[data-variant=clear]_&]:[--ph-logo-bg:var(--color-bg-accent-subtle)]',
        '[[data-variant=clear]_&]:[--ph-logo-text:var(--color-text-accent)]',
      )}
    >
      <rect width="36" height="24" rx="4" fill="var(--ph-logo-bg)" />
      <text
        x="18"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="var(--ph-logo-text)"
      >
        logo
      </text>
    </svg>
  );
}

/**
 * 정적 자산은 절대경로가 아니라 `import.meta.env.BASE_URL` 기준으로 참조한다 —
 * 배포 시 Storybook이 서브패스(`/arcsquare/ui-platform/`)로 서빙되기 때문이다.
 */
const assetUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`;

/**
 * 심볼 마크. 옆에 `title` 텍스트가 이름을 읽어주므로 이미지는 장식 처리한다.
 *
 * `variant`별로 다른 로고 파일을 쓴다 — brand 배경 위에서는 흰 로고
 * (`arc_only_white_logo.png`), clear 배경 위에서는 컬러 로고
 * (`arc_only_logo.png`). JS로 분기하지 않고 `<header>`가 실어주는
 * `data-variant`를 CSS에서 읽어(`[[data-variant=clear]_&]:`) 이미지
 * 하나를 토글하는 방식은 `Spacer.stories.tsx`의 `data-theme` 다크/라이트
 * 로고 전환과 같은 패턴이다.
 */
function ArcsquareMark() {
  return (
    <>
      <img
        src={assetUrl('arc_only_white_logo.png')}
        alt=""
        className="h-6 [[data-variant=clear]_&]:hidden"
      />
      <img
        src={assetUrl('arc_only_logo.png')}
        alt=""
        className="hidden h-6 [[data-variant=clear]_&]:block"
      />
    </>
  );
}

const meta: Meta<typeof AppHeader> = {
  title: 'Shell/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  args: {
    // Docs 표의 행 순서는 여기 args에 있는 키가 먼저, 그다음 나머지 props가
    // 타입 선언 순서로 붙는다. variant는 헤더 전체 톤을 바꾸는 핵심 prop이라
    // logo/title 바로 다음, 목록형 props(notifications/user 등)보다 위에
    // 오도록 여기 일찍 넣어뒀다.
    variant: 'brand',
    logo: 'mark',
    title: 'arcsquare',
    notifications: NOTIFICATIONS,
    user: {
      name: '이재건',
      email: 'jglee@arcsquare.ai',
      initials: 'JG',
      imageSrc: assetUrl('profile.jpg'),
    },
    userMenuItems: USER_MENU_ITEMS,
  },
  argTypes: {
    // logo는 ReactNode라 컨트롤로 직접 편집할 수 없다. options + mapping으로
    // "고를 수 있는 노드 목록"을 만들어주면 실제 로고와 플레이스홀더를 번갈아
    // 확인할 수 있다.
    logo: {
      control: 'select',
      options: ['mark', 'placeholder', 'none'],
      mapping: {
        mark: <ArcsquareMark />,
        placeholder: <PlaceholderLogo />,
        none: undefined,
      },
    },
    title: { control: 'text' },
    variant: { control: 'radio', options: ['brand', 'clear'] },
    center: { control: false },
    actions: { control: false },
    notifications: { control: false },
    user: { control: false },
    userMenuItems: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    // 기본 viewport 목록(mobile1/tablet 등)은 360·768·1024와 어긋나서, 셸이 쓰는
    // SHELL_BREAKPOINTS를 그대로 옮긴 항목을 직접 등록한다. 각 단계의 "경계 위"
    // 폭이라 클래스가 실제로 전환되는 지점을 눈으로 확인할 수 있다.
    viewport: {
      options: {
        shellMobile: {
          name: '모바일 360px',
          styles: { width: '360px', height: '720px' },
        },
        shellTablet: {
          name: '태블릿 768px',
          styles: { width: '768px', height: '1024px' },
        },
        shellDesktop: {
          name: '데스크탑 1024px',
          styles: { width: '1024px', height: '1024px' },
        },
      },
    },
    docs: {
      description: {
        component:
          '브랜드 색 배경 위에 로고(좌) · 알림/프로필(우)을 배치하는 앱 최상단 헤더.<br/>' +
          '배경이 `--color-bg-accent`라서 `data-brand` 토글만으로 서비스별 색이 바뀐다.<br/><br/>' +
          '**하이브리드 API**: 헤더에 선택적으로 적용할 수 있는 요소.<br/>' +
          '`notifications`: 기본 벨(알림) UI를 그려준다.<br/>`user`: 기본 프로필 UI를 그려준다.<br/>' +
          '`actions`: 우측에 고유 액션을 추가할 수 있다.(테마 토글, 언어 선택 등...)<br/>`center`: 가운데에 액션을 추가할 수 있다.(검색창, 메뉴 등...)<br/><br/>' +
          '알림의 읽음 상태는 셸이 갖지 않고 앱이 소유한다. → 서버에서 내려온 목록과 어긋나지 않게 하기 위해서다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Basic: Story = {};

/** 세 단계에서 각각 무엇이 줄어드는지 나란히 확인하는 스토리 묶음. */
const RESPONSIVE_ARGS = {
  center: (
    <div className="flex justify-center">
      <ToggleGroup type="single" defaultValue="team" aria-label="조회 범위">
        <ToggleGroupItem value="mine" size="sm">
          내 정보
        </ToggleGroupItem>
        <ToggleGroupItem value="team" size="sm">
          우리 팀
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/** `WithCenterAndActions`와 같은 검색창. 데스크탑 스토리의 `center`를 채운다. */
const CENTER_SEARCH = (
  <div className="relative mx-auto w-full max-w-md">
    <Search
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/60"
    />
    <Input
      type="search"
      placeholder="직원, 부서, 문서 검색"
      aria-label="전체 검색"
      className="h-9 border-white/20 bg-white/10 pl-9 text-[var(--color-text-on-solid)] placeholder:text-white/60 focus-visible:ring-white/60"
    />
  </div>
);

/**
 * `md:`/`lg:`는 Tailwind의 표준 미디어쿼리라서 실제 브라우징 컨텍스트의
 * 뷰포트 너비를 기준으로 평가된다. autodocs 페이지는 여러 스토리를 iframe
 * 하나 없이 한 문서에 인라인으로 렌더링하므로 조절할 뷰포트가 없고, 그래서
 * 아래 세 스토리는 `tags: ['!autodocs']`로 Docs 페이지 집계에서 뺐다 —
 * **사이드바에서 개별로 열어야** `globals.viewport`가 매니저의 미리보기
 * iframe 크기를 실제로 바꿔서 반응형 전환이 제대로 보인다.
 *
 * (한 번은 Docs 페이지용으로 이 스토리 자신을 iframe으로 중첩시켜 봤지만,
 * Tailwind v4의 전역 `box-sizing: border-box` 리셋 때문에 iframe에 준
 * `border` 1px가 콘텐츠 폭을 깎아 768px 경계값을 근소하게 놓치는 등 너무
 * 잘 깨졌다 — Docs에는 안 보여주는 지금 방식이 더 안전하다.)
 */
export const Desktop: Story = {
  tags: ['!autodocs'],
  args: { ...RESPONSIVE_ARGS, center: CENTER_SEARCH },
  globals: { viewport: { value: 'shellDesktop' } },
};

export const Tablet: Story = {
  tags: ['!autodocs'],
  args: RESPONSIVE_ARGS,
  globals: { viewport: { value: 'shellTablet' } },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  args: RESPONSIVE_ARGS,
  globals: { viewport: { value: 'shellMobile' } },
};

export const WithCenterAndActions: Story = {
  tags: ['!dev'],
  args: {
    center: CENTER_SEARCH,
    actions: (
      <button
        type="button"
        className="h-8 rounded-[var(--radius-md)] px-2 text-[length:var(--text-body-sm)] font-semibold text-[var(--color-text-on-solid)] hover:bg-white/10"
      >
        KOR
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          '`center`는 앱 전체를 대상으로 하는 전역 컨트롤(전역 검색, 테넌트 선택, 조회 범위 토글 등) 하나를 놓는 자리다.<br/>' +
          '데스크탑(`lg`: 1024px ~)에서만 노출되고, `actions`는 우측 상단의 벨·프로필 **왼쪽**에 놓인다.',
      },
    },
  },
};

export const NoNotifications: Story = {
  tags: ['!dev'],
  args: {
    notifications: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          '`notifications`가 빈 배열이면 벨은 뱃지 없이 표시되고, 팝오버에는 빈 상태 메시지가 나온다.<br/>prop 자체를 주지 않으면 벨이 아예 렌더링되지 않는다.',
      },
    },
  },
};

/**
 * `variant="clear"`에서 앱이 직접 넣는 `center`/`actions` 콘텐츠가 색을
 * 어떻게 맞춰야 하는지 보여주는 예시. 헤더가 소유한 부분(로고 제외 나머지)은
 * `variant`를 자동으로 따라가지만, 슬롯 콘텐츠는 색을 스스로 정하므로
 * `<header>`의 `data-variant` 속성을 `[[data-variant=clear]_&]:`로
 * 참고해 brand/clear 양쪽에서 다 읽히게 한다.
 */
const CLEAR_CENTER_SEARCH = (
  <div className="relative mx-auto w-full max-w-md">
    <Search
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/60 [[data-variant=clear]_&]:text-[var(--color-text-tertiary)]"
    />
    <Input
      type="search"
      placeholder="직원, 부서, 문서 검색"
      aria-label="전체 검색"
      className="h-9 border-white/20 bg-white/10 pl-9 text-[var(--color-text-on-solid)] placeholder:text-white/60 focus-visible:ring-white/60 [[data-variant=clear]_&]:border-[var(--color-border-default)] [[data-variant=clear]_&]:bg-[var(--color-bg-surface)] [[data-variant=clear]_&]:text-[var(--color-text-primary)] [[data-variant=clear]_&]:placeholder:text-[var(--color-text-tertiary)] [[data-variant=clear]_&]:focus-visible:ring-[var(--color-border-accent)]"
    />
  </div>
);

const CLEAR_ACTIONS = (
  <button
    type="button"
    className="h-8 rounded-[var(--radius-md)] px-2 text-[length:var(--text-body-sm)] font-semibold text-[var(--color-text-on-solid)] hover:bg-white/10 [[data-variant=clear]_&]:text-[var(--color-text-accent)] [[data-variant=clear]_&]:hover:bg-[var(--color-bg-accent-subtle)]"
  >
    KOR
  </button>
);

export const Clear: Story = {
  args: {
    variant: 'clear',
    center: CLEAR_CENTER_SEARCH,
    actions: CLEAR_ACTIONS,
  },
  parameters: {
    docs: {
      description: {
        story:
          '배경이 투명해져 본문과 이어져 보이고, 헤더가 소유한 타이틀·벨·계정 메뉴는 **브랜드 톤**으로 자동 전환된다.<br/>' +
          '`center`/`actions`처럼 앱이 **직접 채우는 슬롯은 색을 스스로 정해야 한다**.',
      },
    },
  },
};

export const LogoOnly: Story = {
  tags: ['!dev'],
  args: {
    notifications: undefined,
    user: undefined,
    userMenuItems: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          '로그인 전 화면처럼 알림·프로필이 필요 없을 때. 해당 prop을 생략하면 그 영역이 아예 렌더링되지 않는다.',
      },
    },
  },
};
