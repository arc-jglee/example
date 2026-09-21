import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../utils/cn';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
  args: {
    direction: 'column',
    gap: 4,
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['column', 'row'],
      description: '주축 방향(세로/가로 쌓기)',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8, 12],
      description: '아이템 사이 간격(spacing 토큰, 단위 4px)',
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'],
      description: '교차축 정렬(align-items)',
    },
    justify: {
      control: 'select',
      options: [
        undefined,
        'start',
        'center',
        'end',
        'between',
        'around',
        'evenly',
      ],
      description: '주축 정렬(justify-content)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] px-4 py-2 text-center text-sm text-[var(--color-text-accent)]">
    {children}
  </div>
);

const areaClassName =
  'rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)] p-4';

export const Basic: Story = {
  render: (args) => (
    <Stack {...args} className={cn(args.className, areaClassName)}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { direction: 'row', gap: 3 },
  render: (args) => (
    <Stack {...args} className={cn(args.className, areaClassName)}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};
