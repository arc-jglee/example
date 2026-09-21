import type { Meta, StoryObj } from '@storybook/react-vite';
import { Compass, ShieldAlert, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '../../components/Button/Button';
import { FullPageEmptyState } from './FullPageEmptyState';

const ICON_OPTIONS = ['compass', 'shieldAlert', 'wrench', 'none'] as const;

const ICON_MAPPING: Record<(typeof ICON_OPTIONS)[number], ReactNode> = {
  compass: <Compass />,
  shieldAlert: <ShieldAlert />,
  wrench: <Wrench />,
  none: undefined,
};

const meta: Meta<typeof FullPageEmptyState> = {
  title: 'Patterns/FullPageEmptyState',
  component: FullPageEmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`EmptyState`를 화면 전체에 중앙 정렬하는 레이아웃 래퍼.<br/><b>404·403·점검 안내</b>처럼 화면 자체가 하나의 상태인 경우에 쓴다.',
      },
    },
  },
  args: {
    icon: 'compass',
    title: '페이지를 찾을 수 없습니다',
    description:
      '요청하신 페이지가 없거나 이동되었습니다. 주소를 다시 확인해 주세요.',
    className: 'min-h-screen',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      description: '임의의 ReactNode를 전달하여 아이콘을 나타냅니다.',
    },
    action: {
      control: false,
      description: '홈으로 이동 등 다음 행동을 유도하는 버튼을 전달합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FullPageEmptyState>;

export const NotFound: Story = {
  args: {
    action: (
      <Button size="sm" variant="primary">
        홈으로 이동
      </Button>
    ),
  },
};

export const Forbidden: Story = {
  args: {
    icon: 'shieldAlert',
    title: '접근 권한이 없습니다',
    description: '이 페이지를 볼 수 있는 권한이 없습니다.',
    action: (
      <Button size="sm" variant="outline">
        이전 화면으로
      </Button>
    ),
  },
};

export const Maintenance: Story = {
  args: {
    icon: 'wrench',
    title: '서비스 점검 중입니다',
    description:
      '더 나은 서비스를 위해 점검하고 있습니다. 잠시 후 다시 시도해주세요.',
    action: undefined,
  },
};
