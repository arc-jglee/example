import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Components/Data Display/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    shape: 'circle',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'error'],
      description:
        '- **neutral**: `--color-text-tertiary` 배경\n' +
        '- **accent**: `--color-bg-accent` 배경\n' +
        '- **success**: `--color-bg-success` 배경\n' +
        '- **warning**: `--color-bg-warning` 배경\n' +
        '- **error**: `--color-bg-error` 배경\n\n',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description:
        '- **circle**: 상태 점(status dot)\n- **square**: 범례 스와치(legend swatch)',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusDot>;

export const Basic: Story = {
  args: {
    variant: 'success',
  },
};

const VARIANTS: NonNullable<Story['args']>['variant'][] = [
  'neutral',
  'accent',
  'success',
  'warning',
  'error',
];

export const Variants: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  {VARIANTS.map((variant) => (
    <StatusDot key={variant} variant={variant} />
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {VARIANTS.map((variant) => (
        <StatusDot key={variant} variant={variant} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  tags: ['!dev'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <StatusDot shape="circle" variant="accent" />
      <StatusDot shape="square" variant="accent" />
    </div>
  ),
};

export const StatusIndicatorExample: Story = {
  tags: ['!dev'],
  name: '상태 표시 예시',
  render: () => (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        listStyle: 'none',
        padding: 0,
      }}
    >
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot variant="success" aria-label="온라인" />
        <span>온라인</span>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot variant="warning" aria-label="대기 중" />
        <span>대기 중</span>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot variant="error" aria-label="오류" />
        <span>오류</span>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot variant="neutral" aria-label="오프라인" />
        <span>오프라인</span>
      </li>
    </ul>
  ),
};

export const LegendExample: Story = {
  tags: ['!dev'],
  name: 'Chart Legend 예시',
  render: () => (
    <ul style={{ display: 'flex', gap: 12, listStyle: 'none', padding: 0 }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot shape="square" variant="accent" />
        <span>매출</span>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot shape="square" variant="warning" />
        <span>비용</span>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusDot shape="square" variant="success" />
        <span>순이익</span>
      </li>
    </ul>
  ),
};
