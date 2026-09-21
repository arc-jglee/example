import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/Button/Button';
import { ErrorShell } from './ErrorShell';

const meta: Meta<typeof ErrorShell> = {
  title: 'Shell/ErrorShell',
  component: ErrorShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '예기치 않은 오류(500 등) 전용 Shell. Next.js `error.tsx`/`global-error.tsx` 자리에 그대로 렌더한다.<br/>404처럼 사용자가 잘못된 주소로 온 명확한 상황에는 `NotFoundShell`을 쓴다.',
      },
    },
  },
  args: {
    title: '문제가 발생했습니다',
    description:
      '잠시 후 다시 시도해 주세요.\n문제가 계속되면 관리자에게 문의해 주세요.',
    className: 'min-h-screen',
  },
  argTypes: {
    action: {
      control: false,
      description: '다음 행동을 유도하는 버튼 등을 전달.<br/>(예: 다시 시도)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorShell>;

export const Basic: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    action: (
      <Button size="sm" variant="destructive">
        다시 시도
      </Button>
    ),
  },
};

export const WithoutAction: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    action: undefined,
  },
};
