import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'md',
    variant: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description:
        '- **sm**: `size-4`\n' +
        '- **md**: `size-6` (기본값)\n' +
        '- **lg**: `size-8`\n' +
        '- **xl**: `size-10`',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'white', 'current'],
      description:
        '- **default**: `--color-text-disabled` (기본값)\n' +
        '- **primary**: `--color-accent-muted`\n' +
        '- **white**: `--color-text-on-solid`\n' +
        '- **current**: 부모의 `color` 상속\n\n',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {};

const SIZES: NonNullable<Story['args']>['size'][] = ['sm', 'md', 'lg', 'xl'];

export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

const VARIANTS: NonNullable<Story['args']>['variant'][] = [
  'default',
  'primary',
  'white',
  'current',
];

export const Variants: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        borderRadius: 8,
        background: 'var(--color-gray-800)',
        padding: 16,
      }}
    >
      {VARIANTS.map((variant) => (
        <Spinner key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

export const InButton: Story = {
  tags: ['!dev'],
  render: (args) => (
    <button
      type="button"
      disabled
      className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-solid)] opacity-70"
    >
      <Spinner {...args} size="sm" variant="white" />
      로딩 중...
    </button>
  ),
};
