import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/Button/Button';
import { NotFoundShell } from './NotFoundShell';

const meta: Meta<typeof NotFoundShell> = {
  title: 'Shell/NotFoundShell',
  component: NotFoundShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '404 전용 Shell. 카드 리더기에 인식되지 않는 사원증을 형상화했다.<br/>일반적인 빈 상태에는 `EmptyState`/`FullPageEmptyState`를 쓰면 된다.',
      },
    },
  },
  args: {
    title: '페이지를 찾을 수 없습니다',
    description:
      '요청하신 페이지가 없거나 이동되었습니다.\n주소를 다시 확인해 주세요.',
    className: 'min-h-screen',
    companyLabel: 'arcsquare',
  },
  argTypes: {
    companyLabel: {
      control: 'text',
      description: '사원증 상단에 표시하는 회사명(브랜드명)',
    },
    action: {
      control: false,
      description: '다음 행동을 유도하는 버튼 등을 전달.<br/>(예: 홈으로 이동)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotFoundShell>;

export const Basic: Story = {
  parameters: {
    layout: 'fullscreen',
  },

  args: {
    action: (
      <Button size="sm" variant="primary">
        홈으로 이동
      </Button>
    ),
  },
};
