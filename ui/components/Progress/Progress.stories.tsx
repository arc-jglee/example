import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { Progress, type ProgressProps } from './Progress';

type ProgressDemoProps = {
  value?: number;
  variant?: ProgressProps['variant'];
};

function ProgressDemo({ value = 60, variant }: ProgressDemoProps) {
  return (
    <div className="w-72 space-y-2">
      <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
        <span>업로드 중</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} variant={variant} />
    </div>
  );
}

function ProgressAnimatedDemo() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-72 space-y-2">
      <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
        <span>업로드 중</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="w-72" />
    </div>
  );
}

const meta: Meta<typeof ProgressDemo> = {
  title: 'Components/Feedback/Progress',
  component: ProgressDemo,
  tags: ['autodocs'],
  args: {
    value: 60,
    variant: 'success',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 (0~100)',
    },
    variant: {
      control: 'select',
      options: ['success', 'accent', 'warning'],
      description: 'Indicator 색상 변형.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="w-72 space-y-2">
  <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
    <span>업로드 중</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>`,
      },
    },
  },
};

export const Animated: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `const [value, setValue] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setValue((prev) => (prev >= 100 ? 0 : prev + 2));
  }, 100);
  return () => clearInterval(timer);
}, []);

<div className="w-72 space-y-2">
  <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
    <span>업로드 중</span>
    <span>{value}%</span>
  </div>
  <Progress value={value} className="w-72" />
</div>`,
      },
    },
  },
  render: () => <ProgressAnimatedDemo />,
};

export const Variants: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`success`(기본값)는 완료를 의미하는 진행 표시에,<br/>`accent`/`warning`은 완료 여부와 무관한 진행 표시에 쓴다.',
      },
      source: {
        type: 'code',
        code: `<Progress value={60} variant="success" />
<Progress value={60} variant="accent" />
<Progress value={60} variant="warning" />`,
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-4">
      {(['success', 'accent', 'warning'] as const).map((variant) => (
        <div key={variant} className="space-y-1">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {variant}
          </span>
          <Progress value={60} variant={variant} />
        </div>
      ))}
    </div>
  ),
};
