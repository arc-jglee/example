import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator';

type SeparatorDemoProps = {
  orientation?: 'horizontal' | 'vertical';
};

function SeparatorDemo({ orientation = 'horizontal' }: SeparatorDemoProps) {
  if (orientation === 'vertical') {
    return (
      <div className="flex h-5 items-center gap-4 text-sm text-[var(--color-text-secondary)]">
        <span>블로그</span>
        <Separator orientation="vertical" />
        <span>문서</span>
        <Separator orientation="vertical" />
        <span>소스</span>
      </div>
    );
  }

  return (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
          아크스퀘어 UI
        </h4>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          토큰 기반 디자인 시스템 컴포넌트 모음입니다.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm text-[var(--color-text-secondary)]">
        <span>블로그</span>
        <Separator orientation="vertical" />
        <span>문서</span>
        <Separator orientation="vertical" />
        <span>소스</span>
      </div>
    </div>
  );
}

const meta: Meta<typeof SeparatorDemo> = {
  title: 'Components/Data Display/Separator',
  component: SeparatorDemo,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '구분선의 방향',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SeparatorDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="w-80">
  <div className="space-y-1">
    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
      아크스퀘어 UI
    </h4>
    <p className="text-sm text-[var(--color-text-tertiary)]">
      토큰 기반 디자인 시스템 컴포넌트 모음입니다.
    </p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center gap-4 text-sm text-[var(--color-text-secondary)]">
    <span>블로그</span>
    <Separator orientation="vertical" />
    <span>문서</span>
    <Separator orientation="vertical" />
    <span>소스</span>
  </div>
</div>`,
      },
    },
  },
};

export const Vertical: Story = {
  tags: ['!dev'],
  args: {
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex h-5 items-center gap-4 text-sm text-[var(--color-text-secondary)]">
  <span>블로그</span>
  <Separator orientation="vertical" />
  <span>문서</span>
  <Separator orientation="vertical" />
  <span>소스</span>
</div>`,
      },
    },
  },
};
