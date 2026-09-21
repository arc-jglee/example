import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../utils/cn';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Layouts/Flex',
  component: Flex,
  tags: ['autodocs'],
  args: {
    direction: 'row',
    gap: 3,
    wrap: false,
    inline: false,
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: '주축 방향',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8],
      description: '아이템 사이 간격(spacing 토큰)',
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
    wrap: { control: 'boolean', description: '줄바꿈 허용(flex-wrap)' },
    inline: { control: 'boolean', description: 'inline-flex 사용' },
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] px-4 py-2 text-sm text-[var(--color-text-accent)]">
    {children}
  </div>
);

const areaClassName =
  'rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)] p-4';

export const Basic: Story = {
  render: (args) => (
    <Flex {...args} className={cn(args.className, areaClassName)}>
      <Item>A</Item>
      <Item>B</Item>
      <Item>C</Item>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  args: { justify: 'between', align: 'center' },
  render: (args) => (
    <Flex {...args} className={cn(args.className, 'w-full', areaClassName)}>
      <Item>Left</Item>
      <Item>Right</Item>
    </Flex>
  ),
};
