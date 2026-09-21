import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../patterns/Card/Card';
import { AppHeader } from '../AppHeader/AppHeader';
import type { HeaderNotification } from '../AppHeader/HeaderNotifications';
import { AppSidebar } from '../AppSidebar/AppSidebar';
import type { SidebarNavEntry } from '../AppSidebar/SidebarNav';
import type { AppHeaderVariant } from '../shared';
import { AppShell, type AppShellContentVariant } from './AppShell';

const NAV: SidebarNavEntry[] = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  {
    label: '인사',
    items: [
      { id: 'employees', label: '직원', icon: Users },
      { id: 'attendance', label: '근태 관리', icon: Clock },
      { id: 'leave', label: '휴가 관리', icon: CalendarDays },
    ],
  },
  {
    label: '보상',
    items: [{ id: 'payroll', label: '급여', icon: Wallet }],
  },
];

const INITIAL_NOTIFICATIONS: HeaderNotification[] = [
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
    icon: Wallet,
    title: '8월 급여명세서가 발행되었습니다',
    time: '어제',
    unread: true,
  },
];

/**
 * 앱이 실제로 셸을 쓰는 방식을 보여주는 데모. 활성 메뉴와 알림 읽음 상태를
 * 앱(=이 컴포넌트)이 소유하고, 셸에는 데이터와 콜백만 내려준다.
 *
 * `headerVariant`(`AppHeader`의 `variant`)와 `contentVariant`(`AppShell`의
 * `variant`)는 서로 다른 타입의 별개 prop이다 — `AppShell`이 `header`를 완성된
 * `ReactNode`로 받아서 그 안의 `AppHeader`가 어떤 variant인지 스스로 알아낼 수
 * 없으므로 두 축을 각각 넘긴다. 자연스러운 조합은 `brand`+`separate`,
 * `clear`+`none`이라 두 컨트롤의 기본값도 그렇게 맞춰뒀다.
 */
function AppShellDemo({
  headerVariant = 'brand',
  contentVariant = 'separate',
}: {
  headerVariant?: AppHeaderVariant;
  contentVariant?: AppShellContentVariant;
}) {
  const [activeItemId, setActiveItemId] = useState('dashboard');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );

  const markAllRead = () =>
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false })),
    );

  return (
    <AppShell
      variant={contentVariant}
      header={
        <AppHeader
          variant={headerVariant}
          title="arcsquare"
          notifications={notifications}
          onNotificationSelect={markRead}
          onNotificationsReadAll={markAllRead}
          user={{ name: '이재건', email: 'jglee@arcsquare.ai', initials: 'JG' }}
          userMenuItems={[
            { label: '프로필', icon: User },
            { label: '설정', icon: Settings },
            {
              label: '로그아웃',
              icon: LogOut,
              variant: 'destructive',
              separatorBefore: true,
            },
          ]}
        />
      }
      sidebar={
        <AppSidebar
          items={NAV}
          activeItemId={activeItemId}
          onItemSelect={(item) => setActiveItemId(item.id)}
        />
      }
    >
      <div className="flex flex-col gap-6">
        <h1 className="heading-md font-bold text-[var(--color-text-primary)]">
          {activeItemId} 화면
        </h1>
        {/* 본문만 스크롤된다는 걸 보여주기 위해 카드를 여러 개 쌓는다. */}
        {Array.from({ length: 8 }, (_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>섹션 {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              스크롤해도 헤더와 사이드바는 화면에 고정되어 있습니다.
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

const meta: Meta<typeof AppShellDemo> = {
  title: 'Shell/AppShell',
  component: AppShellDemo,
  tags: ['autodocs'],
  args: {
    headerVariant: 'brand',
    contentVariant: 'separate',
  },
  argTypes: {
    headerVariant: { control: 'radio', options: ['brand', 'clear'] },
    contentVariant: { control: 'radio', options: ['none', 'separate'] },
  },
  parameters: {
    layout: 'fullscreen',
    // 셸이 쓰는 SHELL_BREAKPOINTS를 그대로 옮긴 항목. 각 단계의 "경계 위" 폭이라
    // 클래스가 실제로 전환되는 지점을 눈으로 확인할 수 있다.
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
          styles: { width: '1024px', height: '800px' },
        },
      },
    },
    docs: {
      description: {
        component:
          '헤더(상단) + 사이드바(좌측) + 본문을 배치하는 앱 골격. 뷰포트 높이를 채우고 **본문만 스크롤**하므로 헤더와 사이드바가 화면에 고정된다.<br/>' +
          '활성 메뉴와 알림 읽음 상태는 셸이 아니라 **앱이 소유**한다 — 셸(UI)은 라우터도, 서버 데이터도 모르기 때문이다.<br/>' +
          '`AppShell`은 헤더 햄버거와 사이드바 드로어를 잇는 **열림 상태**도 소유한다 — 모바일에서 사이드바를 열려면 이 컴포넌트가 필요하다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppShellDemo>;

export const Basic: Story = {};

export const Clear: Story = {
  args: { headerVariant: 'clear', contentVariant: 'none' },
  parameters: {
    docs: {
      description: {
        story:
          '`AppHeader`엔 `variant="clear"`, `AppShell`엔 `variant="none"`을 넘긴 형태.<br/>' +
          '두 prop은 타입이 다른 별개 값이다. 앱이 자연스러운 조합을 직접 맞춰줘야 한다.',
      },
    },
  },
};

/**
 * `globals.viewport`는 매니저가 미리보기 iframe 크기를 조절해서 만드는
 * 효과라 **사이드바에서 개별로 열었을 때만** 반응형 전환이 보인다. Docs
 * 페이지는 iframe 없이 여러 스토리를 한 문서에 인라인으로 모아 보여줘서
 * 조절할 대상이 없으므로, 이 셋은 `tags: ['!autodocs']`로 Docs 집계에서 뺐다.
 */
export const Desktop: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'shellDesktop' } },
  parameters: {
    docs: {
      description: {
        story:
          '기준이 되는 형태. 사이드바는 `w-60`으로 항상 펼쳐져 있고 드로어는 **마운트조차 되지 않는다**.',
      },
    },
  },
};

export const Tablet: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'shellTablet' } },
  parameters: {
    docs: {
      description: {
        story:
          '사이드바가 `w-16` 아이콘 레일이 된다. 항목은 그대로 눌러서 이동할 수 있고(레일이 곧 네비게이션이다), 라벨을 보려면 레일 상단의 펼치기 버튼으로 드로어를 연다.<br/>' +
          '아이콘만 남는 폭에서도 항목의 **접근 가능한 이름은 유지된다** — 라벨을 `hidden`이 아니라 `w-0 overflow-hidden`으로 접기 때문이다. `display:none`은 접근성 트리에서도 지워져서 아이콘 항목이 이름 없는 버튼이 되어버린다.<br/>' +
          '헤더 햄버거는 나오지 않는다. 레일이 이미 보이므로 메뉴가 한 번의 클릭 안에 있다.',
      },
    },
  },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  globals: { viewport: { value: 'shellMobile' } },
  parameters: {
    docs: {
      description: {
        story:
          '사이드바가 레이아웃에서 사라지고, 헤더 왼쪽 햄버거가 좌측 `Sheet` 드로어를 연다. 로고·타이틀이 모바일에서 감춰지는 이유가 이 햄버거 자리를 비워두기 위해서다.<br/>' +
          '드로어는 태블릿 펼치기와 **같은 `Sheet` 하나**다. 태블릿용 인플레이스 확장을 따로 만들면 오버레이·포커스 트랩·Escape·바깥 클릭을 다시 구현해야 하는데, 열렸을 때 결과물은 드로어와 똑같다.<br/>' +
          '항목을 고르면 드로어가 닫힌다 — 열어둔 채로 남기면 방금 이동한 화면이 오버레이에 가려진다.',
      },
    },
  },
};
