import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Activity,
  CalendarDays,
  Clock,
  FileBarChart,
  Folder,
  HandCoins,
  LayoutDashboard,
  Network,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
} from 'lucide-react';

import { Badge } from '../../components/Badge/Badge';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppShell } from '../AppShell/AppShell';
import { AppSidebar } from './AppSidebar';
import type { SidebarNavEntry } from './SidebarNav';

const FLAT_ITEMS: SidebarNavEntry[] = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'employees', label: '직원', icon: Users },
  { id: 'attendance', label: '근태 관리', icon: Clock },
  { id: 'leave', label: '휴가 관리', icon: CalendarDays },
  { id: 'payroll', label: '급여', icon: Wallet },
  { id: 'performance', label: '성과 관리', icon: TrendingUp },
  { id: 'org', label: '조직도', icon: Network },
  { id: 'documents', label: '문서함', icon: Folder },
  { id: 'reports', label: '보고서', icon: FileBarChart, disabled: true },
];

const GROUPED_ITEMS: SidebarNavEntry[] = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  {
    label: '인사',
    icon: UserCog,
    items: [
      { id: 'employees', label: '직원', icon: Users },
      { id: 'attendance', label: '근태 관리', icon: Clock },
      { id: 'leave', label: '휴가 관리', icon: CalendarDays },
    ],
  },
  {
    label: '보상',
    icon: HandCoins,
    items: [
      { id: 'payroll', label: '급여', icon: Wallet },
      {
        id: 'performance',
        label: '성과 관리',
        icon: TrendingUp,
        badge: <Badge variant="primary">신규</Badge>,
      },
    ],
  },
  {
    label: '운영',
    items: [
      {
        id: 'monitoring',
        label: '모니터링',
        icon: Activity,
        badge: <Badge variant="warning">3</Badge>,
      },
      { id: 'reports', label: '보고서', icon: FileBarChart, disabled: true },
    ],
  },
];

const NESTED_ITEMS: SidebarNavEntry[] = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  {
    label: '인사',
    icon: UserCog,
    items: [
      { id: 'employees', label: '직원', icon: Users },
      {
        id: 'attendance-group',
        label: '근태 관리',
        icon: Clock,
        // 3뎁스: 하위 항목이 있으면 이 행은 이동 대신 펼침/닫힘만 한다.
        children: [
          { id: 'attendance-status', label: '근태 현황' },
          { id: 'attendance-requests', label: '정정 요청', badge: 3 },
          { id: 'attendance-policy', label: '근태 정책' },
        ],
      },
      { id: 'leave', label: '휴가 관리', icon: CalendarDays },
    ],
  },
  {
    label: '보상',
    icon: HandCoins,
    items: [
      {
        id: 'payroll-group',
        label: '급여',
        icon: Wallet,
        children: [
          { id: 'payroll-run', label: '급여 지급' },
          { id: 'payroll-ledger', label: '급여 대장' },
        ],
      },
      { id: 'performance', label: '성과 관리', icon: TrendingUp },
    ],
  },
];

const meta: Meta<typeof AppSidebar> = {
  title: 'Shell/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  args: {
    items: FLAT_ITEMS,
    activeItemId: 'dashboard',
  },
  argTypes: {
    items: {
      control: false,
      description:
        '메뉴 정의 배열.<br/>항목에 `children`을 주면,<br/>3뎁스(그룹 → 항목 → 하위 항목)가 된다.',
    },
    activeItemId: {
      control: 'select',
      options: ['dashboard', 'employees', 'attendance', 'payroll', 'org'],
      description:
        '활성 항목의 `id`.<br/>앱이 현재 경로에서 계산해 넘긴다.<br/>⇒ 셸은 라우터를 모른다.',
    },
    linkComponent: {
      control: false,
      description:
        '링크 렌더링에 쓸 컴포넌트(기본 `a`). Next.js라면 `next/link`의 `Link`를 넘긴다.',
    },
    header: { control: false },
    footer: { control: false },
  },
  parameters: {
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
          styles: { width: '768px', height: '560px' },
        },
        shellDesktop: {
          name: '데스크탑 1024px',
          styles: { width: '1024px', height: '560px' },
        },
      },
    },
    docs: {
      description: {
        component:
          '아이콘 + 라벨 메뉴를 세로로 쌓는 좌측 사이드바. 메뉴는 **배열 데이터로 정의**한다.<br/>→ 앱마다 메뉴 구성이 다르고, 서버/권한에 따라 동적으로 바뀌기 때문이다.<br/><br/>' +
          '`href`가 있으면 `<a>`(또는 `linkComponent`)로, 없으면 `<button>`으로 렌더링된다.<br/>활성 항목에는 `aria-current="page"`가 자동으로 붙는다.',
      },
    },
  },
  decorators: [
    (Story, context) =>
      // Mobile 스토리는 AppShell 전체(h-screen)를 렌더한다. 고정 높이 상자에
      // 넣으면 안쪽에서 넘쳐 스크롤바가 두 겹 생기므로 래퍼를 건너뛴다.
      context.parameters.fullFrame ? (
        <Story />
      ) : (
        <div className="flex h-[560px]">
          <Story />
        </div>
      ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const Basic: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
        code: `<AppSidebar items={FLAT_ITEMS} activeItemId="dashboard" />`,
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
  args: { items: GROUPED_ITEMS, activeItemId: 'payroll' },
  globals: { viewport: { value: 'shellDesktop' } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
        code: `<AppSidebar items={GROUPED_ITEMS} activeItemId="payroll" />`,
      },
    },
  },
};

export const Tablet: Story = {
  tags: ['!autodocs'],
  args: { items: GROUPED_ITEMS, activeItemId: 'payroll' },
  globals: { viewport: { value: 'shellTablet' } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
        code: `<AppSidebar items={GROUPED_ITEMS} activeItemId="payroll" />`,
      },
    },
  },
};

export const Mobile: Story = {
  tags: ['!autodocs'],
  args: { items: GROUPED_ITEMS, activeItemId: 'payroll' },
  globals: { viewport: { value: 'shellMobile' } },
  parameters: {
    layout: 'fullscreen',
    fullFrame: true,
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<AppShell
  header={<AppHeader title="arcsquare" />}
  sidebar={<AppSidebar items={GROUPED_ITEMS} activeItemId="payroll" />}
>
  본문
</AppShell>`,
      },
    },
  },
  render: (args) => (
    <AppShell
      header={<AppHeader title="arcsquare" />}
      sidebar={<AppSidebar {...args} />}
    >
      <p className="text-[var(--color-text-secondary)]">
        햄버거를 눌러 메뉴를 열어보세요.
      </p>
    </AppShell>
  ),
};

export const Grouped: Story = {
  tags: ['!dev'],
  args: {
    items: GROUPED_ITEMS,
    activeItemId: 'payroll',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '그룹에 `label`을 주면 섹션 제목이 붙는다. 라벨 없는 항목을 배열 맨 앞에 두면 그룹에 속하지 않는 단독 메뉴가 된다(예: 대시보드).<br/>' +
          '`badge`에는 임의의 노드를 넣을 수 있어 개수·상태 표시에 쓴다.',
      },
      source: {
        type: 'code',
        code: `<AppSidebar items={GROUPED_ITEMS} activeItemId="payroll" />`,
      },
    },
  },
};

export const WithNestedMenu: Story = {
  tags: ['!dev'],
  args: {
    items: NESTED_ITEMS,
    activeItemId: 'attendance-requests',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '항목에 `children`을 주면 3뎁스(그룹 → 항목 → 하위 항목)가 된다.<br/>`activeItemId`가 하위 항목이면 조상이 자동으로 펼쳐진 채 시작한다.<br/><br/>' +
          '그룹도 아이콘을 가질 수 있고 똑같이 접고 펼 수 있다.<br/>단, 태블릿 뷰의 아이콘 모음에서는 하위 항목이 있는 항목을 눌러도 인라인으로 펼치는 대신 드로어가 열린다.',
      },
      source: {
        type: 'code',
        code: `<AppSidebar items={NESTED_ITEMS} activeItemId="attendance-requests" />`,
      },
    },
  },
};

export const WithHeaderAndFooter: Story = {
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`header`/`footer` 슬롯은 메뉴 위·아래에 고정된다. 프로젝트 선택기, 버전 표기, 도움말 링크 등을 넣는다.',
      },
      source: {
        type: 'code',
        code: `<AppSidebar
  items={GROUPED_ITEMS}
  activeItemId="employees"
  header={<span className="font-semibold">TSE 인사팀</span>}
  footer={<span className="text-[var(--color-text-tertiary)]">v1.4.0</span>}
/>`,
      },
    },
  },
  render: () => (
    <AppSidebar
      items={GROUPED_ITEMS}
      activeItemId="employees"
      header={
        <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-text-primary)]">
          TSE 인사팀
        </span>
      }
      footer={
        <span className="text-[length:var(--text-body-sm)] text-[var(--color-text-tertiary)]">
          v1.4.0
        </span>
      }
    />
  ),
};
