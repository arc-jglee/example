import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../utils/cn';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  tags: ['autodocs'],
  args: {
    size: 'lg',
    padded: true,
    centered: true,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description:
        '최대 너비 프리셋\n' +
        '- **sm**: 768px\n' +
        '- **md**: 1024px\n' +
        '- **lg**: 1280px (기본)\n' +
        '- **xl**: 1536px\n' +
        '- **full**: 제한 없음',
    },
    padded: {
      control: 'boolean',
      description: '반응형 좌우 패딩<br/>px-4 → sm:px-6 → lg:px-8',
    },
    centered: { control: 'boolean', description: '가로 중앙 정렬(mx-auto)' },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

const Fill = () => (
  <div className="text-md rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] p-6 text-center text-[var(--color-text-accent)]">
    Container content
  </div>
);

export const Basic: Story = {
  render: (args) => (
    <div className="bg-[var(--color-bg-subtle)] py-6">
      <Container
        {...args}
        className={cn(
          args.className,
          'border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)]',
        )}
      >
        <Fill />
      </Container>
    </div>
  ),
};

const SIZE_PX = {
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1536px',
} as const;

export const Sizes: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex flex-col gap-4 bg-[var(--color-bg-subtle)] py-4">
  {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
    <Container
      key={size}
      size={size}
      className="border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)]"
    >
      <div className="text-md rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] p-3 text-center text-[var(--color-text-accent)]">
        size="{size}" ({SIZE_PX[size]})
      </div>
    </Container>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 bg-[var(--color-bg-subtle)] py-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Container
          key={size}
          size={size}
          className="border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)]"
        >
          <div className="text-md rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] p-3 text-center text-[var(--color-text-accent)]">
            size=&quot;{size}&quot; ({SIZE_PX[size]})
          </div>
        </Container>
      ))}
    </div>
  ),
};
